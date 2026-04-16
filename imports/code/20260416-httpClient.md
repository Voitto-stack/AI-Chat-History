---
title: HttpClient
date: 2026-04-16T11:07:55+08:00
source: import
language: ts
original: HttpClient.ts
---

# HttpClient

```ts
import axios, { AxiosError, AxiosInstance } from "axios";
import type { DeepPartial, Exact } from "@heyhru/business-pwa-proto/baseType";
import type { HttpClientConfig, MessageFns, RequestOptions, CacheRecord, LoggerAdapter, MonitorAdapter } from "./types";

/* eslint-disable @typescript-eslint/no-explicit-any, complexity, max-params, sonarjs/cognitive-complexity, max-depth, sonarjs/no-nested-template-literals */

type AxiosMetadata = {
  requestTimestamp?: number;
  requestTime?: string;
  requestName?: string;
  protoId?: number | string;
  requestParams?: string;
};

/**
 * 默认日志适配器（控制台输出）
 */
class DefaultLogger implements LoggerAdapter {
  log(...args: any[]): void {
    console.log(...args);
  }
  error(...args: any[]): void {
    console.error(...args);
  }
  warn(...args: any[]): void {
    console.warn(...args);
  }
  info(...args: any[]): void {
    console.info(...args);
  }
}

/**
 * HTTP 客户端类
 * 提供基于 Protobuf 的 HTTP 请求功能
 */
export class HttpClient {
  private config: HttpClientConfig;
  private httpService: AxiosInstance;
  private logger: LoggerAdapter;
  private monitor?: MonitorAdapter;
  private memoryCache = new Map<string, CacheRecord<any>>();
  private defaultTtl = 5 * 60 * 1000; // 5 分钟

  constructor(config: HttpClientConfig) {
    this.config = {
      timeout: 45000,
      slowApiThreshold: 5000,
      businessErrorCodesToReport: [2, 4, 99, 120],
      athenaAllowedRequests: [],
      noLoginPaths: [],
      ...config,
    };

    this.logger = config.loggerAdapter || new DefaultLogger();
    this.monitor = config.monitorAdapter;

    // 创建 axios 实例
    this.httpService = axios.create({
      timeout: this.config.timeout,
      method: "post",
      headers: {
        "X-Requested-With": "XMLHttpRequest",
        "Content-Type": "application/octet-stream",
      },
      responseType: "arraybuffer",
    });

    // 添加请求拦截器
    this.setupRequestInterceptor();
    // 添加响应拦截器
    this.setupResponseInterceptor();
  }

  /**
   * 设置请求拦截器
   */
  private setupRequestInterceptor(): void {
    this.httpService.interceptors.request.use(
      (config) => {
        // 动态设置 Authorization header
        config.headers.Authorization = `Bearer ${this.config.getToken()}`;
        config.headers.params = JSON.stringify({
          os: this.config.getOs(),
          app_name: this.config.getAppName(),
          locale: this.config.getLocale(),
          app_version: this.config.getAppVersion(),
        });

        const configWithMetadata = config as { metadata?: AxiosMetadata };
        const currentMetadata = configWithMetadata.metadata || {};
        configWithMetadata.metadata = {
          ...currentMetadata,
          requestTimestamp: Date.now(),
          requestTime: new Date().toISOString(),
        };

        return config;
      },
      (error) => Promise.reject(error),
    );
  }

  /**
   * 设置响应拦截器
   */
  private setupResponseInterceptor(): void {
    this.httpService.interceptors.response.use(
      (response) => {
        const metadata = (response.config as { metadata?: AxiosMetadata })?.metadata || {};
        const requestTimestamp = metadata.requestTimestamp || Date.now();
        const duration = Date.now() - requestTimestamp;

        // 检查请求时长，超过阈值上报
        if (this.monitor && duration > (this.config.slowApiThreshold || 5000)) {
          const userInfo = this.monitor.getUserInfo();
          this.monitor.reportSlowApi({
            requestName: metadata.requestName || "unknown",
            protoId: metadata.protoId || "unknown",
            requestTime: metadata.requestTime || new Date().toISOString(),
            requestTimestamp,
            duration,
            requestParams: metadata.requestParams || "unavailable",
            userId: userInfo.userId,
            username: userInfo.username,
          });
        }

        return response;
      },
      async (error: AxiosError) => {
        const requestUrl = error.config?.url || "unknown";
        const requestMethod = error.config?.method || "unknown";
        const statusCode = error.response?.status || 0;
        const metadata = (error.config as { metadata?: AxiosMetadata } | undefined)?.metadata || {};
        const requestTimestamp = metadata.requestTimestamp || Date.now();
        const duration = Date.now() - requestTimestamp;

        // 解析返回数据
        let responseData = "unavailable";
        try {
          if (error.response?.data) {
            if (error.response.data instanceof ArrayBuffer) {
              const decoder = new TextDecoder();
              responseData = decoder.decode(error.response.data).substring(0, 500);
            } else {
              responseData = JSON.stringify(error.response.data).substring(0, 500);
            }
          }
        } catch {
          responseData = "parse_failed";
        }

        // 401 错误不上报（认证失败是预期行为）
        if (this.monitor && statusCode !== 401) {
          const userInfo = this.monitor.getUserInfo();
          this.monitor.reportApiError({
            error,
            requestUrl,
            requestMethod,
            statusCode,
            requestName: metadata.requestName || "unknown",
            protoId: metadata.protoId || "unknown",
            requestTime: metadata.requestTime || new Date().toISOString(),
            requestTimestamp,
            duration,
            requestParams: metadata.requestParams || "unavailable",
            responseData,
            userId: userInfo.userId,
            username: userInfo.username,
          });
        }

        // 401 错误处理
        if (statusCode === 401) {
          const pathname = typeof window !== "undefined" ? window.location.pathname || "" : "";
          const noLoginPaths = this.config.noLoginPaths || [];
          if (noLoginPaths.includes(pathname)) {
            return Promise.reject(error);
          }
          if (this.config.on401Error) {
            await this.config.on401Error();
          }
        }

        return Promise.reject(error);
      },
    );
  }

  /**
   * 构建客户端消息
   */
  private clientMessage(protoId: number, msgBuffer: Uint8Array): ArrayBuffer {
    const len = 4 + msgBuffer.length;
    const buffer = new ArrayBuffer(len);
    const view = new DataView(buffer);
    view.setInt32(0, protoId, false);
    msgBuffer.forEach((byte, index) => {
      view.setUint8(4 + index, byte);
    });
    return buffer;
  }

  /**
   * 从类型字符串中提取名称（点号后的部分）
   */
  private getTypeAfterDot(type: string): string {
    const dotIndex = type.lastIndexOf(".");
    return dotIndex === -1 ? type : type.substring(dotIndex + 1);
  }

  /**
   * 发送 POST 请求（基础方法）
   */
  async requestPost<T, U, I extends Exact<DeepPartial<T>, I>>(
    requestType: MessageFns<T>,
    requestData: I,
    responseType: MessageFns<U>,
    requestName: string,
    options?: RequestOptions,
  ): Promise<U> {
    const protoId = this.config.protoMap[requestName];
    if (!protoId) {
      throw new Error(`Proto ID not found for ${requestName}`);
    }

    this.logger.log("protoId", protoId);

    // 雅典娜环境过滤
    const isAthena = this.config.isAthenaEnv?.() || false;
    const athenaAllowed = this.config.athenaAllowedRequests || [];
    if (isAthena && !athenaAllowed.includes(requestName)) {
      return {} as U;
    }

    try {
      const requestMessage = requestType.create(requestData as any);
      const encodedMessage = requestType.encode(requestMessage).finish();
      const reqMessage = this.clientMessage(protoId, encodedMessage);

      // 序列化请求参数用于监控上报（限制大小）
      let requestParamsStr = "unavailable";
      try {
        requestParamsStr = JSON.stringify(requestData).substring(0, 1000);
      } catch {
        requestParamsStr = "serialize_failed";
      }

      const response = await this.httpService.post(this.config.apiHost, reqMessage, {
        signal: options?.signal,
        timeout: options?.timeout ?? this.config.timeout,
        metadata: {
          protoId,
          requestName,
          requestParams: requestParamsStr,
        },
      } as any);

      const buf = response.data as ArrayBuffer;
      const realProto = buf.slice(4);
      const uint8Array = new Uint8Array(realProto);
      const responseProto = responseType.decode(uint8Array);

      this.logger.log("HttpClient", requestName, requestData, responseProto);

      // 检查业务 code，非成功时上报
      if ((responseProto as any).code !== undefined) {
        const businessCode = (responseProto as any).code;
        const errorCodesToReport = this.config.businessErrorCodesToReport || [];

        // code === 1 是 Success，code === 0 是 None（通常也算正常）
        if (businessCode !== 1 && businessCode !== 0) {
          // 只上报白名单中的业务错误码
          if (this.monitor && errorCodesToReport.includes(businessCode)) {
            const errorMessage = (responseProto as any).message || (responseProto as any).msg || "unknown";

            // 序列化完整响应
            let responseStr = "unavailable";
            try {
              responseStr = JSON.stringify(responseProto).substring(0, 1000);
            } catch {
              responseStr = "serialize_failed";
            }

            const userInfo = this.monitor.getUserInfo();
            this.monitor.reportBusinessError({
              businessCode,
              requestName,
              protoId,
              requestParams: requestParamsStr,
              errorMessage,
              responseData: responseStr,
              userId: userInfo.userId,
              username: userInfo.username,
            });
          }
        }
      }

      return responseProto;
    } catch (e) {
      this.logger.error("HttpClient", `${requestName} request error:`, e);
      throw e;
    }
  }

  /**
   * 发送 POST 请求（自动提取请求名称）
   */
  async requestPost2<T, U, I extends Exact<DeepPartial<T>, I>>(
    requestType: MessageFns<T>,
    requestData: I,
    responseType: MessageFns<U>,
    options?: RequestOptions,
  ): Promise<U> {
    const requestName = this.getTypeAfterDot(requestType.$type);
    return this.requestPost(requestType, requestData, responseType, requestName, options);
  }

  /**
   * 设置缓存
   */
  setCache<T>(key: string, data: T, ttl = this.defaultTtl): void {
    this.memoryCache.set(key, { data, expiry: Date.now() + ttl });
  }

  /**
   * 获取缓存
   */
  getCache<T>(key: string): T | null {
    const record = this.memoryCache.get(key);
    if (!record) return null;
    if (Date.now() > record.expiry) {
      this.memoryCache.delete(key);
      return null;
    }
    return record.data as T;
  }

  /**
   * 清除缓存
   */
  clearCache(key?: string): void {
    if (key) {
      this.memoryCache.delete(key);
    } else {
      this.memoryCache.clear();
    }
  }

  /**
   * 构建缓存 key
   */
  private buildCacheKey<T, I extends Exact<DeepPartial<T>, I>>(requestType: MessageFns<T>, requestData: I): string {
    const typeName = this.getTypeAfterDot(requestType.$type);
    try {
      const message = requestType.create(requestData as any);
      const bytes: Uint8Array = requestType.encode(message).finish();
      const payloadKey = Array.from(bytes).join(",");
      return `${typeName}:${payloadKey}`;
    } catch {
      // 回退到稳定字符串化（按 key 排序）
      const stableStringify = (value: any): string => {
        if (value === null || typeof value !== "object") return JSON.stringify(value);
        if (Array.isArray(value)) return `[${value.map((v) => stableStringify(v)).join(",")}]`;
        const keys = Object.keys(value).sort();
        return `{${keys.map((k) => `${JSON.stringify(k)}:${stableStringify((value as any)[k])}`).join(",")}}`;
      };
      return `${typeName}:${stableStringify(requestData)}`;
    }
  }

  /**
   * 发送 POST 请求（带缓存）
   */
  async requestPostCache<T, U, I extends Exact<DeepPartial<T>, I>>(
    requestType: MessageFns<T>,
    requestData: I,
    responseType: MessageFns<U>,
    options?: RequestOptions,
  ): Promise<U> {
    const cacheKey = this.buildCacheKey(requestType, requestData);
    const cached = this.getCache<U>(cacheKey);

    if (cached) {
      this.logger.log("HttpClient", `requestPostCache hit: ${cacheKey}`);
      return cached;
    }

    const result = await this.requestPost2(requestType, requestData, responseType, options);
    this.setCache(cacheKey, result, this.defaultTtl);
    this.logger.log("HttpClient", `requestPostCache set: ${cacheKey}`);
    return result;
  }

  /**
   * 更新配置
   */
  updateConfig(config: Partial<HttpClientConfig>): void {
    this.config = { ...this.config, ...config };
  }

  /**
   * 获取当前配置
   */
  getConfig(): Readonly<HttpClientConfig> {
    return { ...this.config };
  }
}

```

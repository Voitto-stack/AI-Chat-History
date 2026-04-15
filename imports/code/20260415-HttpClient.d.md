---
title: HttpClient.d
date: 2026-04-15T17:04:48+08:00
source: import
language: ts
original: HttpClient.d.ts
---

# HttpClient.d

```ts
import type { HttpClientConfig, MessageFns, RequestOptions } from "./types";
/**
 * HTTP 客户端类
 * 提供基于 Protobuf 的 HTTP 请求功能
 */
export declare class HttpClient {
    private config;
    private httpService;
    private logger;
    private monitor?;
    private memoryCache;
    private defaultTtl;
    constructor(config: HttpClientConfig);
    /**
     * 设置请求拦截器
     */
    private setupRequestInterceptor;
    /**
     * 设置响应拦截器
     */
    private setupResponseInterceptor;
    /**
     * 构建客户端消息
     */
    private clientMessage;
    /**
     * 从类型字符串中提取名称（点号后的部分）
     */
    private getTypeAfterDot;
    /**
     * 发送 POST 请求（基础方法）
     */
    requestPost<T, U>(requestType: MessageFns<T>, requestData: T, responseType: MessageFns<U>, requestName: string, options?: RequestOptions): Promise<U>;
    /**
     * 发送 POST 请求（自动提取请求名称）
     */
    requestPost2<T, U>(requestType: MessageFns<T>, requestData: T, responseType: MessageFns<U>, options?: RequestOptions): Promise<U>;
    /**
     * 设置缓存
     */
    setCache<T>(key: string, data: T, ttl?: number): void;
    /**
     * 获取缓存
     */
    getCache<T>(key: string): T | null;
    /**
     * 清除缓存
     */
    clearCache(key?: string): void;
    /**
     * 构建缓存 key
     */
    private buildCacheKey;
    /**
     * 发送 POST 请求（带缓存）
     */
    requestPostCache<T, U>(requestType: MessageFns<T>, requestData: T, responseType: MessageFns<U>, options?: RequestOptions): Promise<U>;
    /**
     * 更新配置
     */
    updateConfig(config: Partial<HttpClientConfig>): void;
    /**
     * 获取当前配置
     */
    getConfig(): Readonly<HttpClientConfig>;
}
//# sourceMappingURL=HttpClient.d.ts.map
```

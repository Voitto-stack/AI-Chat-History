---
title: Regulations
date: 2026-04-15T17:04:47+08:00
source: import
original: Regulations.md
---

# 协议命名规范1

## 类名

使用三段驼峰式（Pascal Case / Upper Camel Case）命名

- 动词 + 名词 + 上下行

正例：

- GetAvatarAdminRequest
- UpdateUserAvatarRequest
- GetAvatarResponse
- UpdateAvatarAdminResponse

反例：

- AdminGetAvatarRequest

## 字段名

使用 snack case 命名。正例：

- update_time

反例：

- UpdateTime
- updateTime

## 可用类型

暂支持(如果有其他需要，请提出交客户端&服务端同事一起讨论确认)：

- repeat: list/array
- enum
- string
- int32
- int64
- bool


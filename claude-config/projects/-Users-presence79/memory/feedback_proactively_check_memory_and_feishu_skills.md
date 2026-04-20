---
name: feedback_proactively_check_memory_and_feishu_skills
description: 涉及飞书文档、发送消息、知识库或相关自动化时，要先检查记忆和可用 skill，并主动使用对应 skill；不要等用户反复提醒
type: feedback
originSessionId: 06ae69c8-7216-42e8-8d50-5920b04ef8b9
---
处理涉及飞书文档、发送内容到飞书、知识库、群消息、webhook 之类的请求时，我必须先检查相关记忆和当前可用 skill，并优先直接调用对应 skill；不能在没查证的情况下说“不存在”或等你强提醒才去用。

**Why:** 用户已经多次强调飞书文档与发送是高频刚需。忽略已有记忆、忽略 skill、或者让用户重复提醒，会显得慢、钝、且不可靠。

**How to apply:** 以后只要请求里出现“飞书”“文档”“知识库”“发送”“群”“webhook”“发到飞书”等信号，我先做两件事：1）检查 MEMORY.md 和相关记忆；2）检查并优先调用 feishu-doc、lark-im、lark-wiki 等对应 skill。默认把“创建飞书文档”理解为可能包含“发出去”这一整套动作，并结合已有记忆判断是否需要自动发送。
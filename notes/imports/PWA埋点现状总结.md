---
title: PWA埋点现状总结
date: 2026-04-16T11:07:54+08:00
source: import
original: PWA埋点现状总结.md
---

# PWA 埋点现状总结（2026-04-03）

## 一、总览

| 指标             | 数值         |
| ---------------- | ------------ |
| 事件总数         | 335          |
| PWA 已实现       | 266（79.4%） |
| PWA 已定义未调用 | 53（15.8%）  |
| 服务端事件       | 16（4.8%）   |
| PWA 缺失         | 0            |

> 经过两轮埋点对齐，haven 有调用而 PWA 缺失的事件已从 8 个降至 **0 个**，事件覆盖率达到 100%。

---

## 二、266 个已实现事件 — 参数对齐状态

| 分类                     | 数量 | 占比  | 处理策略               |
| ------------------------ | ---- | ----- | ---------------------- |
| ✅ 参数完全一致          | 35   | 13.2% | 无需处理               |
| 两端均无参数             | 100  | 37.6% | 无需处理               |
| ⚠️ 参数有差异            | 92   | 34.6% | 需逐个分析             |
| haven 未实现（无法比对） | 39   | 14.6% | PWA 独有事件，无需对齐 |

---

## 三、35 个参数完全一致的事件

| 事件名称                                             | 共同参数                                                             |
| ---------------------------------------------------- | -------------------------------------------------------------------- |
| pwa_onboarding_username_page_confirm                 | user_name                                                            |
| pwa_onboarding_age_page_confirm                      | user_age                                                             |
| pwa_onboarding_location_page_confirm                 | zipcode                                                              |
| pwa_reg_photo_save_success_click                     | avatar_index, photo_count                                            |
| pwa_onboarding_upload_photo_page_server_failure      | message, success                                                     |
| pwa_reg_photo_select                                 | is_cancel, selected_count                                            |
| pwa_reg_photo_audit_result                           | age_qualified, beauty_score, pass                                    |
| pwa_earnings_records_page_show                       | date                                                                 |
| pwa_earnings_detail_date_click                       | date                                                                 |
| pwa_earnings_apk_installation_install_button_clicked | apk_install_task_status                                              |
| pwa_ai_onboarding_reward_toast                       | reward_money                                                         |
| pwa_ai_avatar_afk_reward                             | afk_reward, afk_time, current_afk_reward                             |
| pwa_face_get_face_id_token                           | time                                                                 |
| pwa_liveness_detection_result                        | result                                                               |
| pwa_profile_task_interest_tag_continue               | tags                                                                 |
| pwa_profile_task_bio_continue                        | bio                                                                  |
| pwa_profile_task_profession_continue                 | profession                                                           |
| pwa_apk_install_task_status                          | apk_install_task_status                                              |
| pwa_live_start                                       | platform                                                             |
| pwa_live_earning_click                               | tabId                                                                |
| pwa_call_fullscreen_popup_click                      | result                                                               |
| pwa_chat_profile_card_click                          | earning_value, target_user_id, target_user_type, total_earning_value |
| pwa_jump_next_reward_click                           | target_user_id, target_user_type                                     |
| pwa_mock_subsidy_trigger                             | duration, price_per_min, reason                                      |
| pwa_cashout_method_click                             | type                                                                 |
| pwa_onboarding_phone_page_next_click                 | phone_number                                                         |
| pwa_onboarding_phone_confirm_modal_confirm_click     | phone_number                                                         |
| pwa_home_cash_guided_task_show                       | task_stage                                                           |
| pwa_home_cash_guided_task_click                      | task_name, task_stage                                                |
| pwa_settlement_popup_view                            | deducted_minutes, earnings                                           |
| pwa_revenue_window_show                              | count, source                                                        |
| pwa_conv_install_web_clickButton                     | scene                                                                |
| pwa_conv_google_login_success                        | success, userId                                                      |
| pwa_conv_google_login_fail                           | error, success                                                       |
| pwa_fake_call_back_popup_callback_click              | user_id                                                              |

---

## 四、100 个两端均无参数的事件

pwa_onboarding_username_page_show, pwa_onboarding_age_page_show, pwa_onboarding_location_page_show, pwa_onboarding_photo_page_show, pwa_onboarding_photo_page_confirm, pwa_onboarding_success, pwa_google_login_button_click, pwa_reg_photo_open_album, pwa_ad_cashout_click, pwa_ad_cashout_click_non_chrome, web_ads_link_page_show, web_ads_link_page_show_non_chrome, web_login_page_show, web_install_page_show, web_install_page_click, web_install_clip_show, web_install_clip_clicked, web_install_dismiss, web_install_timeout, web_install_success, web_install_failed, pwa_mepage_change_avatar_click, pwa_conv_lp_show, pwa_conv_live_stop_click, pwa_conv_live_stop_cancel, pwa_conv_call2_end_click, pwa_conv_call2_end_confirm, pwa_conv_verify_page_show, pwa_conv_final_apk_pop_show, pwa_conv_final_apk_download_click, pwa_conv_final_apk_pop_close, pwa_conv_settle_fail_quick_hangup_show, pwa_conv_settle_fail_no_face_show, pwa_earnings_page_show, pwa_earnings_page_tab_show, pwa_earnings_page_tab_click, pwa_earnings_finish_profile_click, pwa_earning_ins_task_complete, pwa_afk_sys_request_pop_up_show, pwa_face_liveness_detection_page_show, pwa_scan_face_result_page_show, pwa_verify_photo_page_show, pwa_verify_photo_page_verify_click, pwa_profile_task_interest_tag_show, pwa_profile_task_interest_tag_skip, pwa_profile_task_bio_show, pwa_profile_task_bio_skip, pwa_profile_task_profession_show, pwa_profile_task_finish_show, pwa_profile_create_post_click, pwa_live_keep_earning, pwa_stop_live, pwa_chats_list_show, pwa_waiting_detection_enter, pwa_waiting_detection_mock_sent, pwa_cashout_accountpage_show, pwa_cashout_animeflow_show, pwa_onboarding_phone_page_show, pwa_onboarding_phone_confirm_modal_show, pwa_onboarding_phone_confirm_modal_edit_click, pwa_onboarding_phone_page_confirm, pwa_home_page_tab_show, pwa_home_page_tab_click, pwa_open_in_apk_click, pwa_onboarding_avatar_upload_button_click, pwa_conv_install_web_show, pwa_conv_download_apk_pop_show, pwa_conv_download_apk_pop_clickButton, pwa_conv_set_age_show, pwa_conv_upload_photo_show, pwa_conv_upload_photo_album_click, pwa_conv_upload_photo_camera_click, pwa_conv_upload_photo_clickButton, pwa_conv_phone_page_show, pwa_conv_phone_pop_cancel, pwa_conv_cash_ready_pop_show, pwa_conv_cash_ready_pop_clickButton, pwa_conv_google_login_go, pwa_conv_link_pop_cancel, pwa_conv_link_pop_overwrite, pwa_conv_paypal_page_show, pwa_conv_paypal_page_clickButton, pwa_conv_cash_success_pop_show, pwa_conv_cash_success_page_show, pwa_conv_keep_earning_clickButton, pwa_conv_video_rules_pop_show, pwa_conv_video_rules_next1_click, pwa_conv_video_rules_next2_click, pwa_conv_call1_invited_page_show, pwa_conv_call1_cancel_click, pwa_conv_call1_video_click, pwa_conv_call1_play_success, pwa_conv_call1_settle_clickButton, pwa_conv_call1_end_click, pwa_conv_call1_end_confirm, pwa_conv_call2_invited_page_show, pwa_conv_call2_video_click, pwa_conv_call2_play_success, pwa_conv_settle_fail_no_voice_show, pwa_fake_call_back_popup_show

---

## 五、92 个参数有差异的事件 — 详细分类

### 5.1 仅 PWA 有多余参数（50 个）— 无需处理

PWA 多发参数不影响 haven 的数据分析，属于 PWA 端额外补充的上下文信息。

**代表性事件：**

- pwa_login_failed：PWA 多 `message`
- pwa_call_connected：PWA 多 `call_type, remote_user_id, room_id`
- pwa_chat_send_gift：PWA 多 `gift_category, gift_cost, gift_id, gift_level`
- pwa_live_state：PWA 多 `from_state, to_state`
- pwa_instagram_request_message_initiative/passive：PWA 多 `order_id`

### 5.2 仅 haven 有独有参数（13 个）— 需评估补充

其中 5 个经代码验证为 **CSV 解析误报**（代码实际已包含），实际仅剩 8 个。

| 事件名称                                              | haven 独有参数                                                  | 实际状态                                |
| ----------------------------------------------------- | --------------------------------------------------------------- | --------------------------------------- |
| pwa_live_close                                        | call_duration                                                   | ✅ 已有（代码已包含）                   |
| pwa_cashout_accountpage_confirm                       | email                                                           | ✅ 已有（代码已包含）                   |
| pwa_apk_install_show                                  | from                                                            | ✅ 已有（代码已包含）                   |
| pwa_apk_install_click                                 | from                                                            | ✅ 已有（代码已包含）                   |
| pwa_earnings_apk_installation_mission_brief_page_show | from                                                            | ✅ 已有（代码已包含）                   |
| pwa_earning_ins_task_page_one_click                   | ins_authorize_task_status                                       | ❌ 待补充（中等难度）                   |
| pwa_earning_ins_task_page_two_click                   | ins_authorize_task_status                                       | ❌ 待补充（中等难度）                   |
| pwa_withdraw_audit_apply                              | task_ids, withdraw_amount                                       | ❌ 待补充（中等难度）                   |
| pwa_home_cash_guided_task_result                      | dh_id, target_user_id, task_stage, total_earning_value          | ❌ 待补充（高难度，需扩展 task 上下文） |
| pwa_cashout_result                                    | total_cashout_value, total_income                               | ❌ 待补充（高难度，需累计数据）         |
| pwa_conv_lp_clickButton                               | trackConfig, user_plan                                          | ❌ 待补充（高难度，需 onboarding 配置） |
| pwa_conv_set_name_show                                | trackConfig, user_plan                                          | ❌ 待补充（高难度，需 onboarding 配置） |
| pwa_conv_call2_cancel_click                           | Pwa_live_sate, action_type, call_id, call_source, price_per_min | ❌ 待补充（高难度，需 mockCall 扩展）   |

### 5.3 双方都有独有参数（29 个）— 分类说明

#### A. 命名不同但语义相同（6 个）— 低优先级

| 事件名称                      | PWA 用         | haven 用                  | 说明           |
| ----------------------------- | -------------- | ------------------------- | -------------- |
| pwa_ins_authorize_task_status | status         | ins_authorize_task_status | 字段命名差异   |
| pwa_cashout_method_result     | result         | Result                    | 仅大小写差异   |
| pwa_native_call_end           | remote_user_id | peer_user_id              | 同义词         |
| pwa_cashout_paypal_fail       | error_type     | message                   | 都是错误描述   |
| pwa_paypal_login_success      | amount         | userinfo                  | 各补充不同维度 |
| pwa_test_video_result         | result         | test_result               | 同义字段       |

#### B. 两端架构差异导致的上下文不同（10 个）— 无法简单对齐

**语音转写系列（5 个）**：PWA 用 task_id + voice_type 标识；haven 用 room_id 标识

- pwa_voice_transcript_init
- pwa_voice_transcript_stop
- pwa_voice_transcript_upload_attempt
- pwa_voice_transcript_upload_success
- pwa_voice_transcript_upload_error

**Mock 通话系列（3 个）**：PWA 用 mock_type + video_id；haven 用 call_id + call_source

- pwa_mock_call_receive
- pwa_mock_call_answer
- pwa_mock_result

**违规弹窗系列（2 个）**：haven 多了通话维度的上下文

- pwa_call_real_time_violation_pop_up_show
- pwa_call_real_time_deduct_Earnings

#### C. PWA 信息更丰富，haven 有少量额外字段（7 个）— 部分可补

| 事件名称                       | haven 额外字段                              | 可否补充          |
| ------------------------------ | ------------------------------------------- | ----------------- |
| pwa_chat_send_message          | earning_value, reply_type                   | 需从父组件传入    |
| pwa_chat_conversation_click    | reward_type                                 | 需查对话奖励来源  |
| pwa_waiting_reward_show/click  | source, target_user_id, total_earning_value | 需扩展接口        |
| pwa_cashout_popover_show/click | source                                      | 需从调用方传入    |
| pwa_instagram_reward           | ins_reward_amount, target_user_id           | 需 INS 交换上下文 |

#### D. INS 交换弹窗字段差异（2 个）— 数据粒度不同

- pwa_ins_request_pop_up_show：PWA 用 `request_count`；haven 用 `request_ids, request_user_amount`
- pwa_ins_request_pop_up_click：同上

#### E. 各端独有特色参数（2 个）— 无需对齐

- pwa_login_success：PWA 发 `user_id`，haven 发 `error_reason`
- pwa_onboarding_photo_page_select_photo_success：各端关注不同维度

---

## 六、53 个已定义未调用事件

### 6.1 haven 有实现、PWA 无对应模块（21 个）

| 模块                   | 数量 | 代表性事件                                                    |
| ---------------------- | ---- | ------------------------------------------------------------- |
| 游戏                   | 5    | pwa_game_entry_click, pwa_game_round_start/end                |
| 通话推送               | 2    | pwa_call_push_show/click                                      |
| Onboarding 轮播/Banner | 6    | web*login_page_carousel*_, pwa_conv_banner_                   |
| Mock 通话检测          | 2    | pwa_waiting_detection_mock_state, pwa_fake_call               |
| 其他                   | 6    | pwa*verify_photo_beauty_score, pwa_searching_orde_popup*\* 等 |

### 6.2 两端都未调用 — 废弃事件（7 个）

- web_login_page_carousel_1/2/3_click
- pwa_conv_banner1/2/3_clickButton
- pwa_voice_call_received

### 6.3 haven 也缺失 — PWA 专属定义（25 个）

| 模块     | 数量 | 说明                                                     |
| -------- | ---- | -------------------------------------------------------- |
| 广告追踪 | 15   | ad_ClickButton, ad_WithdrawComplete_Stage1-7 等          |
| 语音转写 | 6    | pwa_voice_transcription_start/\_success/\_error 等       |
| 其他     | 4    | pwa_open_apk, pwa_video_call_poor_connection_detected 等 |

---

## 七、16 个服务端事件

pwa_server_fake_call_request, pwa_server_fake_call_success/failed, pwa_call_begin_from_native, pwa_native_voice_data_received, pwa_script_action, join_hatching_pool, join_the_racing_pool, the_racing_pool_settle_hour_wage, join_main_flow_pool, disuse_pool, generate_ins_message, ins_message_send, pwa_auto_call_task_disabled, pwa_start_foreground_service, gc_apk_ai_onboarding_reward_toast, 等

---

## 八、结论与建议

### 当前健康度：🟢 良好

- **事件覆盖率 100%**：haven 调用的事件 PWA 已全部覆盖
- **参数一致 + 无参数**：135/227 = 59.5%，无需处理
- **低风险差异**：79/227 = 34.8%（PWA 多余参数 + 命名/架构差异）
- **待处理缺口**：仅 8 个事件有 haven 独有参数需补充（占 3.5%）

### 后续建议

1. **高优先级**（8 个 haven 独有参数）：需改组件 props 接口或引入新数据源，建议专项处理
2. **中优先级**（7 个废弃事件）：建议从 events.ts 清理，减少代码噪音
3. **低优先级**（29 个双方差异）：多为架构差异或命名不同，不影响数据分析
4. **建议**：后续新增埋点时，两端同步定义参数规范，避免产生新的差异

---

## 九、本轮完成工作

| 轮次   | 内容                                             | 提交           |
| ------ | ------------------------------------------------ | -------------- |
| 第一轮 | 补充 8 个缺失事件 + 修复 10 个文件参数           | 已提交         |
| 第二轮 | 修复 8 个文件参数（Batch A+B）+ 修复 TS 编译错误 | commit 6e5ba51 |

**分支**：`personal/cjkun/tracking-phase1`


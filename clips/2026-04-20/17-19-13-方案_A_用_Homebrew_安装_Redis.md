---
date: 2026-04-20T17:19:13+08:00
source: clipboard
chars: 1124
---

方案 A：用 Homebrew 安装 Redis
  brew install redis                    
  brew services start redis                                                                                    
                           
  方案 B：用 Docker 运行 Redis                                                                                 
  docker run -d -p 6379:6379 redis:latest                                                                      
  
  但你的配置使用的是 rediss://（TLS 加密）连接到远程 Redis（10.226.1.x），需要通过 SSH 隧道转发。              
                  
  方案 C：建立 SSH 隧道连接远程 Redis
  # 只读实例隧道
  ssh -L 6378:10.226.1.5:6378 user@remote-server -N &
                                                     
  # 写入实例隧道
  ssh -L 6379:10.226.1.4:6378 user@remote-server -N &
                                                     
  你想用哪个方案？如果是方案 C，请提供远程服务器的 SSH 地址。                                                  
                                                               

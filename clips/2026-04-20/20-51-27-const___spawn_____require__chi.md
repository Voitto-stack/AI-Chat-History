---
date: 2026-04-20T20:51:27+08:00
source: clipboard
chars: 3803
---

const { spawn } = require("child_process");
const net = require("net");

// --- 配置信息 ---
const config = {
  ssh: {
    host: "34.85.120.249", // 跳板机 IP
    port: "12222", // 跳板机 SSH 端口
    user: "dev", // SSH 用户名
    keyPath: "~/.ssh/id_rsa", // 你的私钥路径
  },
  db: {
    remoteHost: "10.51.1.3", // 数据库内网 IP
    remotePort: "5432", // 数据库远程端口
    localPort: 5433, // 你本地映射的端口
  },
  redis: {
    remoteHost: "10.226.1.5", // Redis 只读实例内网 IP
    remotePort: "6378", // Redis 远程端口
    localPort: 6378, // 你本地映射的端口
  },
  redisWrite: {
    remoteHost: "10.226.1.4", // Redis 写入实例内网 IP
    remotePort: "6378", // Redis 远程端口
    localPort: 6379, // 你本地映射的端口
  },
  checkInterval: 5000, // 每5秒检测一次健康状况
};

// 日志助手
const log = (msg, type = "INFO") => {
  const color = type === "ERROR" ? "\x1b[31m" : type === "SUCCESS" ? "\x1b[32m" : "\x1b[36m";
  console.log(`${new Date().toLocaleTimeString()} [${color}${type}\x1b[0m] ${msg}`);
};

let sshProcess = null;

// 检测本地端口是否真正通畅
function checkTunnelHealth() {
  const client = new net.Socket();
  client.setTimeout(2000);

  client.connect(config.db.localPort, "127.0.0.1", () => {
    log(
      `DB 隧道健康状况: 正常 (127.0.0.1:${config.db.localPort} -> ${config.db.remoteHost}:${config.db.remotePort})`,
      "SUCCESS",
    );
    log(
      `Redis 隧道健康状况: 正常 (127.0.0.1:${config.redis.localPort} -> ${config.redis.remoteHost}:${config.redis.remotePort})`,
      "SUCCESS",
    );
    log(
      `Redis 写入隧道健康状况: 正常 (127.0.0.1:${config.redisWrite.localPort} -> ${config.redisWrite.remoteHost}:${config.redisWrite.remotePort})`,
      "SUCCESS",
    );
    client.destroy();
  });

  client.on("error", () => {
    log("隧道连接似乎已断开，正在尝试重启...", "ERROR");
    startTunnel();
    client.destroy();
  });

  client.on("timeout", () => {
    log("检测超时，隧道可能响应缓慢", "WARN");
    client.destroy();
  });
}

function startTunnel() {
  if (sshProcess) {
    sshProcess.kill();
  }

  const sshArgs = [
    "-L",
    `${config.db.localPort}:${config.db.remoteHost}:${config.db.remotePort}`,
    "-L",
    `${config.redis.localPort}:${config.redis.remoteHost}:${config.redis.remotePort}`,
    "-L",
    `${config.redisWrite.localPort}:${config.redisWrite.remoteHost}:${config.redisWrite.remotePort}`,
    "-p",
    config.ssh.port,
    "-i",
    config.ssh.keyPath.replace("~", process.env.HOME),
    `${config.ssh.user}@${config.ssh.host}`,
    "-N", // 不执行远程命令
    "-o",
    "ExitOnForwardFailure=yes",
    "-o",
    "ServerAliveInterval=60",
  ];

  log(
    `正在建立隧道: ${config.ssh.host}:${config.ssh.port} -> DB ${config.db.remoteHost}:${config.db.remotePort} + Redis(read) ${config.redis.remoteHost}:${config.redis.remotePort} + Redis(write) ${config.redisWrite.remoteHost}:${config.redisWrite.remotePort}...`,
  );

  sshProcess = spawn("ssh", sshArgs);

  sshProcess.stdout.on("data", (data) => log(`SSH: ${data}`));
  sshProcess.stderr.on("data", (data) => {
    const msg = data.toString();
    if (msg.includes("Permission denied")) {
      log("权限被拒绝！请确认公钥已被配置。", "ERROR");
    } else {
      log(`SSH 信息: ${msg.trim()}`);
    }
  });

  sshProcess.on("close", (code) => {
    log(`SSH 进程已退出，退出码: ${code}`, "ERROR");
  });
}

// 启动
startTunnel();

// 定时检测
setInterval(checkTunnelHealth, config.checkInterval);

// 进程退出时清理
process.on("SIGINT", () => {
  log("正在关闭隧道并退出...");
  if (sshProcess) sshProcess.kill();
  process.exit();
});


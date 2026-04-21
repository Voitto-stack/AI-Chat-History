---
date: 2026-04-21T20:19:14+08:00
source: clipboard
chars: 501
---

const { url } = await getFeishuUrl();
        if (cancelled) return;

        await loadScript(QR_SDK_URL);
        if (cancelled) return;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const QRLogin = (window as any).QRLogin;
        if (!QRLogin) throw new Error("QR SDK not loaded");

        const qrObj = QRLogin({
          id: "login-feishu-qr",
          goto: url,
          width: "300",
          height: "300",
          style: "border: none;",
        });

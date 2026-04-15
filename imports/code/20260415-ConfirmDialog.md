---
title: ConfirmDialog
date: 2026-04-15T17:05:30+08:00
source: import
language: tsx
original: ConfirmDialog.tsx
---

# ConfirmDialog

```tsx
import { createRoot } from "react-dom/client";
import { ReactNode } from "react";
import ModalContainer from "./ModalContainer";

type ModalVariant = "fullscreen" | "bottom-sheet" | "center";

export function showConfirmDialog(options: {
  title?: string;
  content?: string;
  confirmText?: string;
  cancelText?: string;
  variant?: ModalVariant;
  buttonLayout?: "horizontal" | "vertical";
  render?: () => ReactNode;
}): Promise<boolean> {
  const {
    title,
    content,
    confirmText = "Confirm",
    cancelText = "Cancel",
    variant = "center",
    buttonLayout = "horizontal",
    render,
  } = options;

  return new Promise((resolve) => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);

    const cleanup = () => {
      root.unmount();
      document.body.removeChild(container);
    };

    const handleConfirm = () => {
      cleanup();
      resolve(true);
    };

    const handleCancel = () => {
      cleanup();
      resolve(false);
    };

    root.render(
      <ModalContainer open={true} onClose={handleCancel} variant={variant}>
        <div
          className={`flex flex-col items-center p-4 bg-[#f8fcff] rounded-2xl ${buttonLayout === "vertical" ? "w-[320px] px-6 pt-6 pb-4" : "w-[292px]"}`}
        >
          {render ? (
            render()
          ) : title && content ? (
            <>
              <span className="mt-2 text-brand-dark font-bold text-[15px] leading-[22px] text-center">{title}</span>
              <span className="text-brand-dark font-light text-[15px] leading-[22px] text-center break-words">
                {content}
              </span>
            </>
          ) : null}
          {buttonLayout === "vertical" ? (
            <div className="flex flex-col items-center w-full mt-5 gap-1">
              <button
                type="button"
                className="w-full h-[48px] border-none rounded-full text-white font-semibold text-[17px] tracking-wide"
                style={{ background: "linear-gradient(to right, #8EC5FC, #2E8CF0)" }}
                onClick={handleConfirm}
              >
                {confirmText}
              </button>
              <button
                type="button"
                className="h-[40px] border-none bg-transparent text-black font-medium text-[15px]"
                onClick={handleCancel}
              >
                {cancelText}
              </button>
            </div>
          ) : (
            <div className="flex flex-row mt-5 gap-2">
              <button
                type="button"
                className="w-[126px] h-10 border-[0.5px] border-[#6bc4ff66] bg-transparent rounded-[20px] text-black font-medium text-[15px]"
                onClick={handleCancel}
              >
                {cancelText}
              </button>
              <button
                type="button"
                className="w-[126px] h-10 border-none rounded-[20px] bg-[#6bc4ff] text-black font-medium text-[15px]"
                onClick={handleConfirm}
              >
                {confirmText}
              </button>
            </div>
          )}
        </div>
      </ModalContainer>,
    );
  });
}

```

---
date: 2026-04-14T14:04:35+08:00
source: clipboard
chars: 485
---

index.tsx:79 ReferenceError: useTaskStore is not defined
    at DebugPage (index.tsx:126:32)
Caused by: React ErrorBoundary ReferenceError: useTaskStore is not defined
    at DebugPage (index.tsx:123:20)
    at AppContent (App.tsx:19:44)
    at FaceIdProvider (FaceIdContext.tsx:65:34)
    at App (App.tsx:60:20)


The above error occurred in the <DebugPage> component.

React will try to recreate this component tree from scratch using the error boundary you provided, ErrorBoundary.


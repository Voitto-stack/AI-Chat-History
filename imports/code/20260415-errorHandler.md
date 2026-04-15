---
title: errorHandler
date: 2026-04-15T17:04:52+08:00
source: import
language: ts
original: errorHandler.ts
---

# errorHandler

```ts
import type { Context, Next } from 'koa';
import { AppError } from '../utils/AppError.js';

export async function errorHandler(ctx: Context, next: Next) {
  try {
    await next();
  } catch (err) {
    const error = err as Error;

    // Handle known application errors
    if (error instanceof AppError) {
      ctx.status = error.statusCode;
      ctx.body = {
        success: false,
        error: {
          code: error.code,
          message: error.message,
        },
      };
      return;
    }

    // Handle Prisma errors
    if (error.name === 'PrismaClientKnownRequestError') {
      ctx.status = 400;
      ctx.body = {
        success: false,
        error: {
          code: 'DATABASE_ERROR',
          message: 'Database operation failed',
        },
      };
      console.error('Prisma Error:', error);
      return;
    }

    // Handle Zod validation errors
    if (error.name === 'ZodError') {
      ctx.status = 400;
      ctx.body = {
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Validation failed',
          details: JSON.parse(error.message),
        },
      };
      return;
    }

    // Handle unexpected errors
    console.error('Unexpected Error:', error);
    ctx.status = 500;
    ctx.body = {
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message:
          process.env.NODE_ENV === 'local'
            ? error.message
            : 'Internal server error',
      },
    };
  }
}

```

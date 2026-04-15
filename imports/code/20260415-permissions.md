---
title: permissions
date: 2026-04-15T17:04:52+08:00
source: import
language: ts
original: permissions.ts
---

# permissions

```ts
import Router from '@koa/router';
import {
  createPermissionRequestSchema,
  updatePermissionRequestSchema,
} from '@sitin/minerva-schemas';
import { prisma } from '../../utils/prisma.js';
import { success } from '../../utils/response.js';
import { AppError } from '../../utils/AppError.js';
import { authMiddleware, requirePermission } from '../../middlewares/auth.js';

export const permissionsRouter = new Router();

// Apply auth middleware to all routes
permissionsRouter.use(authMiddleware);

/**
 * GET /api/rbac/permissions
 * List all permissions
 */
permissionsRouter.get(
  '/',
  requirePermission('rbac.permission.read'),
  async (ctx) => {
    const permissions = await prisma.permission.findMany({
      include: {
        _count: {
          select: {
            rolePermissions: true,
          },
        },
      },
      orderBy: { key: 'asc' },
    });

    const result = permissions.map((perm) => ({
      id: perm.id,
      key: perm.key,
      description: perm.description,
      roleCount: perm._count.rolePermissions,
      createdAt: perm.createdAt,
    }));

    success(ctx, result);
  }
);

/**
 * GET /api/rbac/permissions/grouped
 * Get permissions grouped by domain (first part of key)
 * NOTE: This must be defined BEFORE /:id to avoid being matched as an id
 */
permissionsRouter.get(
  '/grouped',
  requirePermission('rbac.permission.read'),
  async (ctx) => {
    const permissions = await prisma.permission.findMany({
      orderBy: { key: 'asc' },
    });

    // Group by domain (first part of key)
    const grouped: Record<
      string,
      Array<{
        id: string;
        key: string;
        description: string | null;
      }>
    > = {};

    permissions.forEach((perm) => {
      const domain = perm.key.split('.')[0];
      if (!grouped[domain]) {
        grouped[domain] = [];
      }
      grouped[domain].push({
        id: perm.id,
        key: perm.key,
        description: perm.description,
      });
    });

    success(ctx, grouped);
  }
);

/**
 * GET /api/rbac/permissions/:id
 * Get permission by ID
 */
permissionsRouter.get(
  '/:id',
  requirePermission('rbac.permission.read'),
  async (ctx) => {
    const { id } = ctx.params;

    const permission = await prisma.permission.findUnique({
      where: { id },
      include: {
        rolePermissions: {
          include: {
            role: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    if (!permission) {
      throw AppError.notFound('Permission not found');
    }

    success(ctx, {
      id: permission.id,
      key: permission.key,
      description: permission.description,
      roles: permission.rolePermissions.map((rp) => rp.role),
      createdAt: permission.createdAt,
    });
  }
);

/**
 * POST /api/rbac/permissions
 * Create a new permission
 */
permissionsRouter.post(
  '/',
  requirePermission('rbac.permission.write'),
  async (ctx) => {
    const body = createPermissionRequestSchema.parse(ctx.request.body);

    // Check if permission key already exists
    const existing = await prisma.permission.findUnique({
      where: { key: body.key },
    });

    if (existing) {
      throw AppError.conflict(
        'Permission key already exists',
        'PERMISSION_EXISTS'
      );
    }

    const permission = await prisma.permission.create({
      data: {
        key: body.key,
        description: body.description,
      },
    });

    success(
      ctx,
      {
        id: permission.id,
        key: permission.key,
        description: permission.description,
      },
      201
    );
  }
);

/**
 * PATCH /api/rbac/permissions/:id
 * Update a permission (only description, key is immutable)
 */
permissionsRouter.patch(
  '/:id',
  requirePermission('rbac.permission.write'),
  async (ctx) => {
    const { id } = ctx.params;
    const body = updatePermissionRequestSchema.parse(ctx.request.body);

    const permission = await prisma.permission.update({
      where: { id },
      data: body,
    });

    success(ctx, {
      id: permission.id,
      key: permission.key,
      description: permission.description,
    });
  }
);

/**
 * DELETE /api/rbac/permissions/:id
 * Delete a permission
 */
permissionsRouter.delete(
  '/:id',
  requirePermission('rbac.permission.delete'),
  async (ctx) => {
    const { id } = ctx.params;

    // Check if permission is assigned to any roles
    const permissionWithRoles = await prisma.permission.findUnique({
      where: { id },
      include: {
        _count: {
          select: { rolePermissions: true },
        },
      },
    });

    if (!permissionWithRoles) {
      throw AppError.notFound('Permission not found');
    }

    if (permissionWithRoles._count.rolePermissions > 0) {
      throw AppError.badRequest(
        `Cannot delete permission assigned to ${permissionWithRoles._count.rolePermissions} roles. Remove from roles first.`
      );
    }

    await prisma.permission.delete({ where: { id } });

    success(ctx, { message: 'Permission deleted successfully' });
  }
);


```

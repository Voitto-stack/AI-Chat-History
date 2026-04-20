# Context

We are not migrating Minerva into an empty destination. `sitin-next` already contains migrated copies at `packages/app-minerva-web`, `packages/app-minerva-server`, and `packages/contract-minerva`, plus target-only work that must be preserved. This round is only a safe incremental sync from `sitin-monorepo` `release/migrate` into `sitin-next`; no package renaming or directory renaming.

# Recommended approach

1. Update docs first.
   - Add a short section to `docs/minerva-lint-alignment.md` describing this sync rule: `sitin-next` is the authority, source syncs are additive and file-level only, and target-only Minerva code must not be overwritten.
   - Update `packages/app-minerva-server/README.md` or `packages/app-minerva-web/README.md` only if startup paths or required assets change.

2. Build a source/target inventory before editing.
   - Compare these mapped directories:
     - source `apps/minerva` -> target `packages/app-minerva-web`
     - source `apps/minerva-server` -> target `packages/app-minerva-server`
     - source `packages/minerva-schemas` -> target `packages/contract-minerva`
   - Classify files as source-only, target-only, or divergent.

3. Merge `app-minerva-server` conservatively.
   - First import clearly missing source-only runtime assets under `apps/minerva-server/prompts/**` into `packages/app-minerva-server/prompts/**`.
   - Verify against `packages/app-minerva-server/src/services/guild/prompt-assembler.ts`, which resolves prompts from `process.cwd()/prompts`.
   - Review source-only helper scripts such as `apps/minerva-server/scripts/migrate-guild-short-links.ts`; only bring them over if they are still referenced or operationally useful.
   - For divergent server files, keep target behavior by default, especially target-only guild/template routes and related logic.

4. Merge `app-minerva-web` selectively.
   - Keep target routing and guild template UI as authoritative.
   - Do not overwrite target-only guild template pages or route wiring in `packages/app-minerva-web/.umirc.ts`.
   - Only port missing shared APIs, utilities, hooks, or non-guild pages from source when they are absent in target.

5. Merge `contract-minerva` semantically, not by overwrite.
   - Compare source schema exports with target exports in `packages/contract-minerva/src/index.ts`.
   - Add missing source contracts only when they do not replace newer target structures such as target template/message-template models.
   - Reconcile exports last.

# Critical files and existing code to preserve

- `packages/app-minerva-server/src/services/guild/prompt-assembler.ts`
- `packages/app-minerva-server/src/routes/index.ts`
- `packages/app-minerva-server/src/routes/guild/templates.ts`
- `packages/app-minerva-server/src/routes/guild/templates-review.ts`
- `packages/app-minerva-server/src/routes/guild/brain.ts`
- `packages/app-minerva-server/src/routes/guild/experiments.ts`
- `packages/app-minerva-web/.umirc.ts`
- `packages/app-minerva-web/src/pages/Guild/Templates/List/index.tsx`
- `packages/app-minerva-web/src/pages/Guild/Templates/Editor/index.tsx`
- `packages/contract-minerva/src/index.ts`
- source prompt assets under `sitin-monorepo/apps/minerva-server/prompts/**`

# Verification

1. Run targeted diffs to confirm the exact delta before copying.
2. Run package-level builds/lint for touched Minerva packages.
3. Run root `pnpm lint` to confirm the repo still passes.
4. Start Minerva Server and confirm prompt-loading paths work after sync.
5. Start Minerva Web and smoke test existing guild template pages plus any synced non-guild views.
6. Use browser-based verification for the Minerva UI before reporting completion.

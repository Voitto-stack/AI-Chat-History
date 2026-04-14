## Context
The BFF dashboard needs a top-right help/question icon that opens an informational "Event Rules" popup. The dashboard already uses a custom top nav in `apps/pwa/src/pages/BffDashboard/index.tsx`, and `apps/pwa` already has a shared modal system (`useModal` + `GlobalModal` + `ModalContainer`) that should be reused so the popup matches existing overlay/card behavior and stays consistent with current PWA modal patterns.

## Recommended approach
Use the existing global modal infrastructure to add a dedicated `EventRulesModal` component, then wire a right-top icon button in `apps/pwa/src/pages/BffDashboard/index.tsx` to open it.

### Files to modify
1. `apps/pwa/src/pages/BffDashboard/index.tsx`
2. `apps/pwa/src/components/EventRulesModal.tsx`

### Reuse these existing patterns
- `apps/pwa/src/hooks/useModal.ts`
- `apps/pwa/src/stores/modalStore.ts`
- `apps/pwa/src/components/GlobalModal.tsx`
- `apps/pwa/src/components/ModalContainer.tsx`
- `apps/pwa/src/components/EarningFailedModal.tsx`
- `apps/pwa/src/components/CallTooShortModal.tsx`

### Implementation steps
1. **Create `EventRulesModal.tsx`**
   - Add a small dedicated modal component using `useModal.getState().open(..., { variant: "center" })`.
   - Render a centered white rounded card over the existing dim overlay provided by `ModalContainer`.
   - Include:
     - title: `Event Rules`
     - body copy matching the provided screenshot
     - one CTA button (`Get`) that closes the modal
   - Optionally export `closeEventRulesModal()` if useful, but `showEventRulesModal()` is the required entrypoint.

2. **Update `BffDashboard/index.tsx` custom nav**
   - Import the provided help/question icon asset.
   - Import `showEventRulesModal`.
   - Add a semantic right-side icon button in the existing top nav row.
   - Keep the current centered title layout intact by preserving the left/back and right/button symmetry.
   - Wire `onClick` to `showEventRulesModal()`.

3. **Interaction details**
   - Use a real `button` element with `aria-label="Open event rules"`.
   - If any parent click area could interfere, stop propagation in the icon click handler.
   - Rely on the shared modal behavior for backdrop/Escape closing.

4. **Styling guidance**
   - Match the current `apps/pwa` modal language instead of inventing a new pattern.
   - Base the card spacing/radius/button treatment on `EarningFailedModal` or `CallTooShortModal`.
   - Keep the icon visually aligned to the top-right as shown in the screenshot.

## Verification
1. Open BFF dashboard and confirm the help icon renders in the top-right.
2. Click the icon and verify the popup appears centered with a dim background overlay.
3. Verify title/body/CTA text matches the design.
4. Verify the CTA closes the modal.
5. Verify backdrop click and Escape also close the modal.
6. Verify the icon click does not trigger any unintended parent navigation/click behavior.
7. Verify the layout still looks correct on mobile width and respects top safe-area spacing.

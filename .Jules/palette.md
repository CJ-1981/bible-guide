## 2026-08-18 - Timeline Card Keyboard Accessibility
**Learning:** Found that custom non-button components (like `Card`) used for expanding details lacked keyboard operability and semantics.
**Action:** Always verify custom interactive containers have `role="button"`, `tabIndex={0}`, `aria-expanded`, focus styles, and `onKeyDown` handlers for Space/Enter.

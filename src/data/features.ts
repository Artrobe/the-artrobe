// Feature flags for surfaces that are built but not ready to ship.
//
// SCAN_ENABLED — the "View on your wall" AR-style camera preview.
// Hidden 2026-08-22: the permission flow needs testing on real devices, and
// getUserMedia only works over HTTPS, so it cannot be verified on the local
// http:// dev address. The /scan route and its component are left intact —
// flip this back to true to bring the entry points back.
export const SCAN_ENABLED = false;

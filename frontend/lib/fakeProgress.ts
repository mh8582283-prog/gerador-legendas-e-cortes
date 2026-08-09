/** Bar fill 0..1 — mirrors backend/overlays.fake_progress */
export function fakeProgress(
  t: number,
  duration: number,
): number {
  if (duration <= 0) return 0;
  if (t >= duration) return 1;
  const ratio = Math.max(0, t / duration);
  // 7x through 30%, 4x through 50%, 1x through 80%, then 0.3x. The
  // normalized stages provide a striking start without ending too early.
  const total = 7 * 0.30 + 4 * 0.20 + 1 * 0.30 + 0.3 * 0.20;
  const first = (7 * 0.30) / total;
  const second = (7 * 0.30 + 4 * 0.20) / total;
  const third = (7 * 0.30 + 4 * 0.20 + 1 * 0.30) / total;
  if (ratio <= 0.30) return Math.min(1, (ratio / 0.30) * first);
  if (ratio <= 0.50) return Math.min(1, first + ((ratio - 0.30) / 0.20) * (second - first));
  if (ratio <= 0.80) return Math.min(1, second + ((ratio - 0.50) / 0.30) * (third - second));
  return Math.min(1, third + ((ratio - 0.80) / 0.20) * (1 - third));
}

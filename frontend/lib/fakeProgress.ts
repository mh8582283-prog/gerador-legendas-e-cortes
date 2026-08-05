export type FakeProgressOpts = {
  fastUntil?: number;
  fillAt?: number;
};

/** Bar fill 0..1 — mirrors backend/overlays.fake_progress */
export function fakeProgress(
  t: number,
  duration: number,
  opts: FakeProgressOpts = {},
): number {
  // 70% of the bar is reached at 70% of the video. The final 30% fills only
  // during the final 30% of playback, matching the exported video exactly.
  const fastUntil = opts.fastUntil ?? 0.7;
  const fillAt = opts.fillAt ?? 0.7;
  if (duration <= 0) return 0;
  if (t >= duration) return 1;
  const ratio = Math.max(0, t / duration);
  let val: number;
  if (ratio <= fastUntil) {
    val = fastUntil > 0 ? Math.min(fillAt, (ratio / fastUntil) * fillAt) : fillAt;
  } else {
    const rem = 1 - fastUntil;
    if (rem <= 0) return 1;
    val = fillAt + (1 - fillAt) * ((ratio - fastUntil) / rem);
  }
  return Math.min(1, val);
}

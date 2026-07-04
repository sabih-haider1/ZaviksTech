/**
 * Minimal in-memory fixed-window rate limiter. Suitable for a single-instance
 * deployment and basic abuse protection on public form submissions. For
 * multi-region scale this would be swapped for a shared store (e.g. Upstash).
 */
type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

interface RateLimitResult {
  success: boolean;
  remaining: number;
}

export function rateLimit(
  key: string,
  limit = 5,
  windowMs = 60_000,
): RateLimitResult {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt < now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { success: true, remaining: limit - 1 };
  }

  if (bucket.count >= limit) {
    return { success: false, remaining: 0 };
  }

  bucket.count += 1;
  return { success: true, remaining: limit - bucket.count };
}

// Periodically evict expired buckets to avoid unbounded growth.
if (typeof setInterval !== "undefined") {
  const timer = setInterval(() => {
    const now = Date.now();
    for (const [key, bucket] of buckets.entries()) {
      if (bucket.resetAt < now) buckets.delete(key);
    }
  }, 60_000);
  // Don't keep the event loop alive for cleanup.
  if (typeof timer === "object" && "unref" in timer) timer.unref();
}

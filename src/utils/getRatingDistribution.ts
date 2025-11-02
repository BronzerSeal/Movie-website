/**
 *
 * @param voteAverage
 * @returns
 */
export function getRatingDistribution(voteAverage: number): number[] {
  const avg = Math.min(Math.max(voteAverage / 2, 0), 5);

  const weights = [5, 4, 3, 2, 1];

  const raw = weights.map((star) => {
    const diff = Math.abs(avg - star);
    return 1 / (1 + diff * diff * 1.5);
  });

  const sum = raw.reduce((a, b) => a + b, 0);
  const normalized = raw.map((v) => Math.round((v / sum) * 100));

  const total = normalized.reduce((a, b) => a + b, 0);
  if (total !== 100) {
    const diff = 100 - total;
    normalized[0] += diff;
  }

  return normalized;
}

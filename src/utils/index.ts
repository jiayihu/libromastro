export function assertNever(_: never): never {
  throw new Error('Unreachable code');
}

export function roundDecimals(n: number): number {
  return Math.round((n + Number.EPSILON) * 100) / 100;
}

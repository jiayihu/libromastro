export function assertNever(_: never): never {
  throw new Error('Unreachable code');
}

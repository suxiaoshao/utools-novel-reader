export function getClassName(...argv: (string | undefined)[]): string {
  return argv.filter((value) => value !== undefined).join(' ');
}

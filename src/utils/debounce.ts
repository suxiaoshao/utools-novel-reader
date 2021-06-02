export function debounce<Args extends Array<never>>(
  fn: (...args: Args) => void,
  delay: number,
): (...args: Args) => void {
  let timer: number | null = null;
  return (...args: Args) => {
    if (timer !== null) {
      clearTimeout(timer);
    }
    timer = window.setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

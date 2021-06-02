export function throttle<Args extends Array<never>>(
  fn: (...args: Args) => void,
  delay: number,
): (...args: Args) => void {
  let timer: null | number = null;
  return (...args: Args) => {
    if (timer === null) {
      fn(...args);
      timer = window.setTimeout(() => {
        timer = null;
      }, delay);
    }
  };
}

export function debounce(func, timeout = 100) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this, args); }, timeout);
  };
}
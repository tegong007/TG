// 节流函数
function throttle(func, limit) {
  let inThrottle; // 定义一个标志变量，用于判断函数是否正在执行
  return function (...args) {
    const context = this; // 保存函数执行上下文对象
    if (!inThrottle) {
      func.apply(context, args); // 如果不在执行中，则调用函数
      inThrottle = true; // 设置标志变量为true
      setTimeout(() => (inThrottle = false), limit); // 设置延时，重置标志变量
    }
  };
}
export { throttle };

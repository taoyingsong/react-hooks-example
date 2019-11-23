import React, { useState, useEffect, useMemo } from 'react';

/**
 * const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
 * 1.
 * 把“创建”函数 --- () => computeExpensiveValue(a, b)和依赖项数组作为参数传入 useMemo，它仅会在某个依赖项改变时才重调用computeExpensiveValue计算memoizedValue。
 * 这种优化有助于避免在每次渲染时都进行高开销的计算。
 * 2.
 * 不要在“创建”函数执行副作用操作等。
 * 3.
 * 如果没有提供依赖项数组，useMemo 在每次渲染时都会计算新的值。
 * 4.
 * 你可以把 useMemo 作为性能优化的手段，但不要把它当成语义上的保证。
 * 先编写在没有 useMemo 的情况下也可以执行的代码 —— 之后再在你的代码中添加 useMemo，以达到优化性能的目的。
 */
function Child() {
}
export default ()=> {
  // 类似useCallback，useMemo可以让我们对复杂对象做类似的事情。
  // 除非颜色发生变化，否则style不变。
  const [color, setColor] = useState('pink');
  const style = useMemo(() => ({ color }), [color]);
  return <Child style={style} />;
}


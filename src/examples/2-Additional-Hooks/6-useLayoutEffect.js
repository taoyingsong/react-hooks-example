import React, { useEffect, useLayoutEffect, useState } from 'react';

// 1. useLayoutEffect 相比 useEffect，通过同步执行状态更新可解决一些特性场景下的页面闪烁问题。
// 2. useEffect不会阻塞渲染（【异步】） 可以满足99%的场景，而且 useLayoutEffect 会阻塞渲染（【同步】），请谨慎使用。

// 其函数签名与 useEffect 相同，【但它会在所有的 **DOM 变更之后** 同步调用 effect。可以使用它来读取 DOM 布局并同步触发重渲染。在 **浏览器执行绘制之前**，useLayoutEffect 内部的更新计划将被同步刷新】。
// 尽可能使用标准的 useEffect 以避免阻塞视觉更新。

// ps: 
// 1. 如果你正在将代码从 class 组件迁移到使用 Hook 的函数组件，则需要注意 useLayoutEffect 与 componentDidMount、componentDidUpdate 的调用阶段是一样的。但是，我们推荐你一开始先用 useEffect，只有当它出问题的时候再尝试使用 useLayoutEffect。
// 2. ssr时使用 useLayoutEffect 会有 warning: 
//   ● 放弃使用 useLayoutEffect，使用 useEffect 代替
//   ● 若要从服务端渲染的 HTML 中排除依赖布局 effect 的组件，可以通过使用 showChild && <Child /> 进行条件渲染，并使用 useEffect(() => { setShowChild(true); }, []) 延迟展示组件。这样，在客户端渲染完成之前，UI 就不会像之前那样显示错乱了。 或者这样写 export const useCustomLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export default () => {
  const [state, setState] = useState("hello world")

  // 从其他路由切换到这个页面时，可以看到页面内容先是hello world， 然后是world hello
  useEffect(() => {
    let i = 0;
    while(i <= 100000000) {
      i++;
    };
    setState("world hello");
  }, []);

// 从其他路由切换到这个页面时，可以看到页面内容始终是world hello
//   useLayoutEffect(() => {
//     let i = 0;
//     while(i <= 100000000) {
//       i++;
//     };
//     setState("world hello");
//   }, []);

  // prevCount为上次setCount的值
  return (
    <>
      <div>{state}</div>
    </>
  );
}
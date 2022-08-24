## 要点

[React 18 Concurrent 之 useDeferredValue <译>](https://zhuanlan.zhihu.com/p/425009300) -- 写的不咋地，多看看 useTransition.md
并发模式主要使用 React 的两个钩挂：useTransition 和 useDeferredValue

1. useDeferredValue 并不仅仅在获取数据的时候有用。
2. 它在更新组件树的工作量过大导致交互（例如：在输入框输入内容）卡顿的情况也是有用的

像 useDeferredValue（或 useTransition）这样的特性不论是在我们等待网络还是等待计算工作完成的情况都有用还是很有趣的。

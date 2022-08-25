## 要点

### [#129 discussion](https://github.com/reactwg/react-18/discussions/129)

当传递给 useDeferredValue 的值发生变化时，它将根据当前渲染的优先级返回先前的值或新的值。

**您可以将 useDeferredValue 视为调度两个渲染：**

1. 用前一个值进行紧急（Urgent）渲染
2. 用下一个值进行非紧急（Non-urgent）渲染（类似于 startTransition 的做法）。
   2.1 由于这个不是紧急的，React 防止显示 "existing" Suspense 边界的回退（fallback）。这与 startTransition 防止回退（fallback）显示的方式相似。（Since this one isn't urgent, React prevents fallbacks from showing for "existing" Suspense boundaries. This is similar to how startTransition prevents fallbacks from showing.）

这里使用基于@diegohaz React Conf 谈话的示例。
不使用 `useDeferredValue` 的 [示例](https://codesandbox.io/s/priceless-cannon-yhbqce?file=/src/App.js)（[fork](https://codesandbox.io/s/snowy-monad-23ykzr)） -- 当您在输入框中键入时，组合框结果不断变成“正在加载...”，然后又变成结果。
使用 `useDeferredValue` 的 [示例](https://codesandbox.io/s/romantic-tharp-wedx58?file=/src/App.js)（[fork](https://codesandbox.io/s/lingering-meadow-6ru8ym)） -- 当您在输入框中键入时，之前的组合框结果在我们重新获取 fetch 数据时会变暗。

从用户的角度来看，差异是更少的闪烁。从开发人员的角度来看，不同之处在于那一行。

现在这是如何工作的？我的**心智模型**是这样的：
假设开始 `combobox.value` 是`“darth”`，我们将其更改为`“obi”`。

- `useCombobox` Hook 中的状态变量会更新。
  - 这会触发一个紧急重新渲染 —— `combobox.value`变为`“obi”`。
  - 在这个紧急渲染中， `useDeferredValue(combobox.value)` 将返回已经提交的值。类似于 `useDebouncedValue()` 之类的 Hooks。所以即使 `combobox.value` 是`“obi”`它仍然返回`“darth”`
    - React 记得这个延迟值需要在以后的渲染中转换为“obi”。
  - React 渲染 `<Results query="darth" />`。容器的不透明度为 `0.5`，因为我们根据 `deferredValue === value` (即为 `false`) 设置不透明度。
  - 此紧急渲染已提交。
- 现在 React 无事可做了，延迟更新开始工作
  - 在这个非紧急渲染中，`useDeferredValue(combobox.value)` 将返回新值。所以它返回`“obi”`。
  - React 渲染 `<Results query="obi" />`。
    - 糟糕！在我们还没有得到渲染结果时，暂停了。
    - 在紧急渲染中暂停已经显示的 `<Suspense>` 边界会导致我们 commit a fallback。这将是一个糟糕的用户体验（当现有内容在你眼前消失时，这很烦人）。幸运的是，我们处于非紧急渲染中，这意味着 React 可以自由地简单地丢弃它。
    - React 完全丢弃了这个渲染
- 最后，the Promise pings, 所以 React 准备重试
  - 在这个非紧急渲染中，`useDeferredValue(combobox.value)` 将返回新值。所以它返回`“obi”`。
  - 我们现在获取到了数据。
  - React renders `<Results query="obi" />`.
  - React commits the result.

### [React 18 Concurrent 之 useDeferredValue <译>](https://zhuanlan.zhihu.com/p/425009300) -- 写的不咋地，多看看 useTransition.md

【并发特性】（concurrent features）主要使用 React 的两个钩挂：useTransition 和 useDeferredValue

1. useDeferredValue 并不仅仅在获取数据的时候有用。
2. 它在更新组件树的工作量过大导致交互（例如：在输入框输入内容）卡顿的情况也是有用的

像 useDeferredValue（或 useTransition）这样的特性不论是在我们等待网络还是等待计算工作完成的情况都有用，还是很有趣的。

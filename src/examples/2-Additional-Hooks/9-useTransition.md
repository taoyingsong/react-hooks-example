## 要点

### 解决了什么问题

startTransitions 可以让你在状态转换期间提供视觉反馈，并在转换发生时保持浏览器的响应性。  
**从概念上讲，其实我们需要两种更新机制:**

1. 一个更新是紧急更新，用于更新输入字段的值，以及引发的一些 UI 变更
2. 另一个是非紧急更新，用于更新列表的显示结果

```javascript
// 紧急更新 Urgent: Show what was typed,
setInputValue(input);

// 非紧急更新 Not urgent: Show the results
setSearchQuery(input);
```

在 React18 以前，所有的更新都是紧急更新。这意味着，上述两种情况会同时更新，极有可能会阻止用户看到输入的交互反馈。缺少一种方法来告诉 React 什么是【紧急更新】的方法。  
新的 API startTransition 通过给更新标记为“transitions”的方式解决了上述问题。

```javascript
import { startTransition } from "react";

// Urgent: Show what was typed
setInputValue(input);

// Mark any state updates inside as transitions
// 被startTransition包裹的更新为非紧急更新，如果出现更紧急的更新，这个更新将会被中断，被中断的更新将会被直接丢弃
startTransition(() => {
  // Transition: Show the results
  setSearchQuery(input);
});
```

**扩展**
前端 中断 无法自动识别：

1. 哪些代码是紧急中断产生的。比如 onClick 就一定是用户鼠标点击产生的吗？不一定，可能是 xxx.onClick 主动触发的，而非用户触发。
2. 用户触发的就一定是紧急中断吗？不一定，比如键盘输入后，setInputValue 是紧急的，而更新查询列表的 setSearchQuery 就是非紧急的。

我们要理解到前端场景对用户操作感知的局限性，才能理解为什么必须手动指定更新的紧急程度，而不能像操作系统一样，上层程序无需感知中断的存在。

### 和 setTimeout 的区别

使用 setTimeout 解决上边问题：（将 UI 变更延迟到下一个循环，类似的解决方案还有防抖和节流）

```javascript
// Show what you typed
setInputValue(input);

// Show the results
setTimeout(() => {
  setSearchQuery(input);
}, 0);
```

1. startTransition 不像 setTimeout 一样是安排在下一次循环执行。startTransition 中包裹的函数**同步执行**的，只是它内部的所有更新都会被标记为"transition"，**React 会在后面的 commit 阶段来判断何时执行更新操作**。这意味着，startTransition 会比 setTimeout【更早执行】，虽然在性能和网络比较好的设备上两者的差距很小，但在恶劣情况下，这种提升会非常显著

2. setTimeout 包裹的函数若有大量的执行，【仍然会阻塞页面交互】。但是用 startTransition 标记的状态更新是**可中断的**，所以它们【不会锁定页面】

3. setTimeout 只是延迟更新，显示 loading 需要【编写异步代码，这通常很脆弱】。通过 transition，**React 可以为你跟踪挂起状态**，根据转换的当前状态更新它，并让你能够在用户等待时显示加载反馈。

### 什么情况下使用 transition

通常，使用 transition 的更新分为两类：

1. Slow rendering：因为 React 需要执行大量工作来渲染 UI。这里是一个添加 startTransition 的[真实演示](https://github.com/reactwg/react-18/discussions/65)，以保持应用程序在昂贵的重新渲染中间的响应
2. Slow network：针对需要网络请求的数据来更新 UI 的情况

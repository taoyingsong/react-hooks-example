## [React 18 Concurrent 之 startTransition<译>](https://zhuanlan.zhihu.com/p/425007915)

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

3. setTimeout 只是延迟更新，显示 loading 【需要编写异步代码，这通常很脆弱】。通过 transition，**React 可以为你跟踪挂起状态**，根据转换的当前状态更新它，并让你能够在用户等待时显示加载反馈。

### 什么情况下使用 transition

通常，使用 transition 的更新分为两类：

1. **Slow rendering**：因为 React 需要执行大量工作来渲染 UI。这里是一个添加 startTransition 的[真实演示](https://github.com/reactwg/react-18/discussions/65)，以保持应用程序在昂贵的重新渲染中间的响应
2. **Slow network**：针对需要网络请求的数据来更新 UI 的情况

### 和 useDeferredValue 的区别

1. startTransition 在事件处理程序中触发更新（即 setState）时使用（比如 useTransition.js 中的案例）。
2. useDeferredValue 用于接收来自父组件（或同一组件中的早期钩子）的新数据。-- 8-useDefferredValue.js 中的 query 就是

## [Real world example: adding startTransition for slow renders #65](https://github.com/reactwg/react-18/discussions/65)

```javascript
import { startTransition } from "react";
startTransition(() => {
  setMinScore(val);
});
```

### 加了 startTransition 后

在这里你可以看到，一开始没有太多更新时，React 立即渲染结果。但是，随着 slider 移动得更多，结果渲染成本越来越高，它们开始延迟。但即使结果正在被渲染，slider 也永远不会锁定。结果正在呈现的时候，slider 也总是在响应的。
(Here you can see that at the beginning, there are not many updates and React renders the results immediately. But, as the slider moves more, and the results get more and more expensive to render, they start to delay. But even when they’re rendered, the slider never locks up. It always feels responsive, while the results are rendering.)

### 它是如何工作的？

在这里我们可以看到，在整个交互过程中，React 一直在工作。我们在鼠标移动发生时处理它们，以更新滑块状态，当我们不在滑块上工作时，我们正在做渲染工作。
（Here we can see that throughout the entire interaction, React is always working. We handle mouse moves as they happen, to update the slider state, and when we’re not working on the slider we’re doing rendering work.）

【并发渲染】，React 将做三件新的事情：

- **Yielding**： 每 5 毫秒，React 将停止工作以允许浏览器执行其他工作，例如运行 Promise 或触发事件。这就是为什么前面示例中的大块工作现在被分割成更小的部分的原因。React 已经将它需要做的所有事情分解成更小的工作，并且足够聪明，可以暂停并让浏览器处理待处理的事件（这被称为“yielding”）。在我们的例子中，yielding 允许浏览器从 Slider 中触发更多的 mousemove 事件，以告诉 React 鼠标仍在移动。
  （Yielding: every 5 ms, React will stop working to allow the browser to do other work, like run promises or fire events. This is the reason why the big chunk of work from the previous examples is now chopped up into smaller pieces. React has split up everything that it needs to do into smaller pieces of work, and is smart enough to pause and let the browser handle pending events (this is called “yielding”). In our case, yielding allows the browser to fire more mousemove events from the Slider to tell React that the mouse is still moving.）
- **Interrupting（中断）**：当第二个鼠标移动事件出现时，我们为滑块安排另一次更新来移动它。但是，如果我们已经在渲染上次更新的结果（内容区的结果），React 如何渲染这个更新呢？答案是，当 React 再次开始工作时，它将看到在鼠标移动过程中安排了一个新的紧急更新，并停止处理（内容区）待定的结果（因为它们已经过时了）。React 切换到渲染紧急的 Slider 更新，而当这个紧急工作完成后，它又回到渲染（内容区）结果。我们称这为 "中断"，因为渲染结果被 "中断 "以渲染 Slider。
  （When a second mouse move event comes in, we schedule another update for the Slider to move it. But how does React render that update, if we’re already in the middle of rendering the results from the last update? The answer is that when React starts working again, it will see that a new urgent update was scheduled during the mouse move and stop working on the pending results (since they’re out of date anyway). React switches to rendering the urgent Slider update, and when that urgent work is done, it goes back to rendering the results. We call this “interrupting” because rendering the results are “interrupted” to render the Slider.）
- **Skipping old results（跳过旧结果）**：如果 React 刚刚开始渲染它正在处理的第一个结果，那么它将开始建立一个要渲染的结果队列，这将花费太多时间（如上面的 setTimeout 示例）。**所以 React 所做的就是跳过旧的工作。当它从中断中恢复时，它将从头开始渲染最新的值。这意味着 React 只对用户实际需要看到的 UI 进行渲染，而不是旧的状态**。
  （If React just started rendering the first results it was working on, then it would start to build up a queue of results to render, which would take too much time (like the setTimeout example above). So what React does instead is skips the old work. When it resumes from an interruption, it will start rendering the newest value from the beginning. This means React is only working on the UI that the user will actually need to see rendered, and never an old state.）

总之，这意味着您可以随意移动滑块，React 将能够同时更新滑块和结果，针对用户实际需要查看的工作进行优化。

这是【并发渲染】，只有在 React 18 中才有可能。

### 使用 isPending 添加视觉反馈

到目前为止，我们已经展示了如何使用新功能来解决现有的使用并发渲染的问题，但新功能还允许我们用以前根本不可能实现的模式来改善用户体验。

分割所有的工作有助于我们确保我们的应用程序对用户的响应，但我们仍然必须实际完成所有工作才能在屏幕上呈现内容。在这一过程中，用户会想知道结果在哪里。

在 React 18 之前，这不是什么大问题。**用户知道有东西在加载，因为页面在渲染的时候被锁住了。有了 React 18，当我们在后台渲染时，用户能够与页面互动，所以我们需要一些方法来告诉用户他们所看的信息是陈旧的，正在更新。**

我们需要的是一种方法，在 React 渲染他们看不到的内容时，向用户显示一个待定状态。React 18 通过新的 useTransition 钩子提供了这能力，这个钩子同时返回一个 startTransition 函数来启动过渡，以及一个 isPending 值，当过渡正在渲染时为 true。这意味着你可以告诉用户一些事情正在后台发生，而他们仍然能够与页面互动。

这种变暗的待定视觉状态只在渲染开始花费太长时间时才会显示出来。在没有 4 倍减速的高端设备上，渲染通常足够快，我们不会显示加载状态。

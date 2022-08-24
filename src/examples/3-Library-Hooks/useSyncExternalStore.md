useSyncExternalStore, 这个新的 api 将会对 React 的各种状态管理库产生非常大的影响

### 背景

react fiber 的设计使得 render 这个过程能够切分成以 fiber 为最小单位的多次任务。

问题就出在过程中对外部状态的读取（这里还不谈订阅），假设我们的渲染任务被分成了两部分（注意不是 render 两次，而是一次 render 渲染分成两部分），两部分都读取了外部状态 A。如果两部分任务之间，浏览器处理了一个事件使得外部状态 A 发生了变化，那前半部分的任务读取到的是旧值，后半部分读取到的却是新值，这就造成了渲染结果的不一致性（被称作为 tearing）

**这个 API 不是给用户使用的**，因为用户只会用到 React 的 API，而 React 的 API 已经原生的解决的并发特性下的撕裂(tear)问题。但是对于框架开发者，比如 Redux，它在控制状态时可能并非直接使用的 React 的 API(useState)，而是自己在外部维护了一个 store 对象，脱离了 React 的管理，也就无法依靠 React 自动解决撕裂问题。因此，React 对外提供了这样一个 API，帮助这类框架开发者(有外部 store 需求的)解决撕裂问题。

### React 状态管理库的核心命题

对于 React 的状态管理库来说，它的首要问题不是如何改变状态，而是如何触发更新。
不管是 Mobx 的 observable，还是 Redux 的单向数据流，它们本身并不会绑定使用的框架或场景，因此不能直接用在 React 或其他 MV\*框架上。于是有了 mobx-react 和 react-redux，将数据管理方案与 react 相结合。不管是那种数据管理方案，都一定会提供数据变更的观测方式，而观测到数据变更后如何更新，是这些 react 状态管理的核心命题。

可以看到 react-redux5 中，可以看到它为了触发更新，创建了一个 dumb state（一个空对象{}）。而 React18 对这个命题给出一个官方答案：useSyncExternalStore

### 解决的问题

新的 API useSyncExternalStore， 它解决的问题就是防止 tearing 的出现：通过通知 react 之前读取过的外部状态发生了变化。这样 react 就能得知之前渲染的部分结果已经过期了，并立刻触发一个同步的更新（以保证最终结果一致性）。

> 反映在 api 上，第一个参数接收一个 subscribe 函数，该函数 -- 【接收一个回掉函数用于通知 react 外部状态发生变更】，【返回一个函数在订阅将被回收时调用】。第二个参数接受一个函数，该函数返回外部状态的最新快照值(使 react 能确认到更改)。两个参数都需要稳定的引用。
> [具体的实例可以看这篇文章](https://milkmidi.medium.com/react-18-usesyncexternalstore-a427bf82c198)

参考：
[官方文档](https://zh-hans.reactjs.org/docs/hooks-reference.html#usesyncexternalstore)
[知乎文章](https://www.zhihu.com/question/50291786)
[博文](https://andyyou.github.io/2022/01/05/use-sync-external-store-with-solving-problem/)

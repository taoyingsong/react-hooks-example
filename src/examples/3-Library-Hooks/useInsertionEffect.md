### 为什么不使用 useLayoutEffect？

useLayoutEffect hook 被用来从 DOM 中读取布局，并同步地重新渲染。

假设我们有一些插入样式的组件和一些读取布局的组件。如果我们使用 useLayoutEffect hook 来插入样式，它会导致在单遍中多次计算布局。此外，如果一个钩子试图在插入 CSS 之前读取布局，它将读取不正确的布局。

因此，为了处理这种使用情况，我们引入了一个新的钩子--useInsertionEffect。

### 关于 useInsertionEffect。

> useInsertionEffect(didUpdate);

useInsertionEffect 的签名与 useEffect 相同。但它会在所有 DOM 突变之前同步触发。
它应该用于在 useLayoutEffect 中读取布局之前插入全局 DOM 节点，如 `<style>` 或 `SVG <defs>`。除了这些 CSS 库之外，它并没有真正被其他任何东西使用。
这个钩子的范围是有限的，所以它不能访问 refs 并且不能安排更新。

```javascript
//Source code - https://github.com/reactwg/react-18/discussions/110

function useCSS(rule) {
  useInsertionEffect(() => {
    if (!isInserted.has(rule)) {
      isInserted.add(rule);
      document.head.appendChild(getStyleForRule(rule));
    }
  });
  return rule;
}
function App() {
  let className = useCSS(rule);
  return <div className={className} />;
}
```

注意：useInsertionEffect 效果不会在服务器上触发。
To know more about the hook check out the [PR](https://github.com/facebook/react/pull/21913) and more [discussion](https://github.com/reactwg/react-18/discussions/110) here.

参考：
[官方文档](https://zh-hans.reactjs.org/docs/hooks-reference.html#useinsertioneffect)
[博客](https://blog.saeloun.com/2022/06/02/react-18-useinsertioneffect)
[讨论 id](https://segmentfault.com/a/1190000040966821)

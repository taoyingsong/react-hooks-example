import React, { useDeferredValue } from 'react';

// useDeferredValue 接受一个值，并返回该值的新副本，该副本将推迟到更紧急地更新之后。(比如：如果当前渲染是一个紧急更新的结果，比如用户输入，React 将返回之前的值，然后在紧急渲染完成后渲染新的值。)
// 使用 useDeferredValue 的好处是，React 将在其他工作完成（而不是等待任意时间）后立即进行更新，并且像 startTransition 一样，延迟值可以暂停，而不会触发现有内容的意外降级。（该 hook 与使用防抖和节流去延迟更新的用户空间 hooks 类似。）

export default () => {
  const query = useSearchQuery('');
  const deferredQuery = useDeferredValue(query);
  
  // Memoizing 告诉 React 仅当 deferredQuery 改变，而不是 query 改变的时候才重新渲染。
  // useDeferredValue 仅延迟你传递给它的值。如果你想要在紧急更新期间防止子组件重新渲染，则还必须使用 React.memo 或 React.useMemo 记忆该子组件
  const suggestions = useMemo(() =>
    <SearchSuggestions query={deferredQuery} />,
    [deferredQuery]
  );

  return (
    <>
      <SearchInput query={query} />
      <Suspense fallback="Loading results...">
        {suggestions}
      </Suspense>
    </>
  );
}
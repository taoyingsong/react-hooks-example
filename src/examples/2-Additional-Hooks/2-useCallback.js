import React, { useState, useEffect, useCallback } from 'react';

/**
 * 问题：getFetchUrl每次渲染都在变，依赖数组会变得无用。
 *
 * 1.
 * 使用useCallback，函数完全可以参与到数据流中。我们可以说如果一个函数的输入改变了，这个函数就改变了。
 * 如果没有，函数也不会改变。
 * 2.
 * class中的函数没参与到数据流中，不会因为内部状态的改变而不同。
 *
 *
 * @returns {*}
 */

// function SearchResults() {
//   // 在函数组件内定义的函数每一次渲染都在变。（class中的函数不会因为内部状态的改变而不同。）
//   function getFetchUrl(query) {
//     return 'https://test/search?query=' + query;
//   }
//
//   useEffect(() => {
//     const url = getFetchUrl('react');
//     // ... 处理逻辑 ...
//   }, [getFetchUrl]); // getFetchUrl每次渲染都在变，太频繁了
//
//   useEffect(() => {
//     const url = getFetchUrl('redux');
//     // ... 处理逻辑 ...
//   }, [getFetchUrl]); // getFetchUrl每次渲染都在变，太频繁了
//
//   // ...
// }
export default ()=> {
  // getFetchUrl仅在某个依赖项改变时才会更新，这样下边依赖数组就有意义了。
  // useCallback(fn, deps) 相当于 useMemo(() => fn, deps)。
  const getFetchUrl = useCallback((query) => {
    return 'https://test/search?query=' + query;
  }, []);

  useEffect(() => {
    const url = getFetchUrl('react');
    // ... 处理逻辑 ...
  }, [getFetchUrl]);

  useEffect(() => {
    const url = getFetchUrl('redux');
    // ... 处理逻辑 ...
  }, [getFetchUrl]);


  return <h1>useCallback test</h1>;
}


/**
 * 1.
 * 以往class中因为函数不是数据流的一部分，我们会硬着头皮把query本身传入 Child 组件。
 * Child 虽然实际并没有直接使用这个query的值，但能在它改变的时候触。
 *
 * 2.
 * 有了useCallback之后就完全不用了。
 * 到处使用useCallback是件挺笨拙的事（可以提取到父中用）
 */
// // 老得方法：
// // parent
// <Child fetchData={this.fetchData} query={this.state.query} />;
//
// // child
// componentDidUpdate(prevProps) {
//   if (this.props.query !== prevProps.query) {
//     this.props.fetchData();
//   }
// }


// // 对于通过属性从父组件传入的函数这个方法也适用
// function Parent() {
//   const [query, setQuery] = useState('react');
//   const fetchData = useCallback(() => {
//     const url = 'https://test/search?query=' + query;
//     // ...
//   }, [query]);
//
//   return <Child fetchData={fetchData} />
// }
//
// function Child({ fetchData }) {
//   let [data, setData] = useState(null);
//
//   useEffect(() => {
//     fetchData().then(setData);
//   }, [fetchData]);
//
//   // ...
// }



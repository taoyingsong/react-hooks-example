import React, {useState, useEffect, useRef} from 'react'
import _isEqual from 'lodash/isEqual'
const usePrevious = value => {
  console.log('value: ', value)
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
};

// const useExample = apiOptions => {
//   const myPreviousState = usePrevious(apiOptions);
//   const [data, updateData] = useState([]);
//   useEffect(() => {
//     if (myPreviousState && !_isEqual(myPreviousState, apiOptions)) {
//       console.log("effect triggered");
//       updateData(apiOptions);
//     }
//   }, [apiOptions,  myPreviousState]);
//   return { data };
// };

/**
 * const refContainer = useRef(initialValue);
 * 解释：
 * useRef 返回一个可变的 ref 对象，其 .current 属性被初始化为传入的参数（initialValue）。
 * 返回的 ref 对象在组件的整个生命周期内保持不变。（可以理解为组件的全局变量）
 * @returns {*}
 */
export default () => {
  const [count, setCount] = useState(0) ;
  const latestCount = useRef(count);
  console.log('useRef initialValue: ', latestCount.current)
  useEffect(() => {
    latestCount.current = count; // 因为：返回的 ref 对象在组件的整个生命周期内保持不变。所以：。。。
    setTimeout(() => {
      console.log(`读取useState中你点击的次数：${count} 次`);
      console.log(`读取useRef中你点击的次数： ${latestCount.current} 次`);
    }, 3000);
  });
  return (
    <div>
      <div>你点击了{count}次</div>
      <button
        onClick={() => {
          setCount(prevCount=> prevCount + 1); //  prevCount为上次setCount的值
        }}
      >
        点击我
      </button>
    </div>
  );

  /**
   * 官方示例：TextInputWithFocusButton
   * ref 这一种访问 DOM 的主要方式见：https://zh-hans.reactjs.org/docs/refs-and-the-dom.html
   *
   * 扩展：
   * 变更 .current 属性不会引发组件重新渲染。
   * 如果想要在 React 绑定或解绑 DOM 节点的 ref 时运行某些代码，则需要使用回调 ref 来实现。
   */
  // const inputEl = useRef(null);
  // const onButtonClick = () => {
  //   // `current` 指向已挂载到 DOM 上的文本输入元素
  //   inputEl.current.focus();
  // };
  // return (
  //   <>
  //     <input ref={inputEl} type="text" />
  //     <button onClick={onButtonClick}>Focus the input</button>
  //   </>
  // );

  /**

   */
}

// function TextInputWithFocusButton() {
//   const inputEl = useRef(null);
//   const onButtonClick = () => {
//     // `current` 指向已挂载到 DOM 上的文本输入元素
//     inputEl.current.focus();
//   };
//   return (
//     <>
//       <input ref={inputEl} type="text" />
//       <button onClick={onButtonClick}>Focus the input</button>
//     </>
//   );
// }


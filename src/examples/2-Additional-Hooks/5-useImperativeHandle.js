import React, { useRef, forwardRef, useImperativeHandle } from 'react';

function FancyInput(props, ref) {
  const inputRef = useRef();
  useImperativeHandle(ref, () => ({ // 在使用 ref 时自定义暴露给父组件的实例值
    focus: (value) => {
      inputRef.current.focus();
    },
    showValue: value => {
      alert(111 + value.toString())
    }
  }));
  return <input ref={inputRef} />;
}

// 在大多数情况下，应当避免使用 ref 这样的命令式代码。useImperativeHandle 应当与 forwardRef 一起使用
// forwardRef文档见：https://zh-hans.reactjs.org/docs/react-api.html#reactforwardref
const NewFancyInput = forwardRef(FancyInput);

export default () => {
  const fancyInputRef = useRef();
  return (
    <>
      <button onClick={
        () => {
          fancyInputRef.current.showValue(true);
          fancyInputRef.current.focus();
        }
      }>点我focus</button>
      <NewFancyInput ref={fancyInputRef}></NewFancyInput>
    </>
   )
};


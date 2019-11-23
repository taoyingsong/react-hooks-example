import React, { useState, useEffect, useReducer } from 'react';

const initialState = {
  count: 0,
  step: 1,
};
export default ()=> {
  /**
   * 假如我们不想在step改变后重启定时器，我们该如何从effect中移除对step的依赖呢？
   * 当你想更新一个状态，并且这个状态更新依赖于另一个状态的值时，你可能需要用useReducer去替换它们。useReducer是Hooks的“作弊模式”。它可以把更新逻辑和描述发生了什么分开。
   * React会保证dispatch在组件的声明周期内保持不变。
   */

    // const [count, setCount] = useState(0);
    // const [step, setStep] = useState(1);
    //
    // useEffect(() => {
    //   const id = setInterval(() => {
    //     setCount(c => c + step);
    //   }, 1000);
    //   return () => clearInterval(id);
    // }, [step]);
    //
    // return (
    //   <>
    //     <h1>{count}</h1>
    //     <input value={step} onChange={e => setStep(Number(e.target.value))} />
    //   </>
    // );

  const [state, dispatch] = useReducer(reducer, initialState);
  const { count, step } = state;

  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: 'tick' });
    }, 1000);
    return () => clearInterval(id);
  }, [dispatch]);

  return (
    <>
      <h1>{count}</h1>
      <input value={step} onChange={e => {
        dispatch({
          type: 'step',
          step: Number(e.target.value)
        });
      }} />
    </>
  );
}

function reducer(state, action) {
  const { count, step } = state;
  if (action.type === 'tick') {
    return { count: count + step, step };
  } else if (action.type === 'step') {
    return { count, step: action.step };
  } else {
    throw new Error();
  }
}

/**
 * <Counter step={1} />
 * 但假如我们需要依赖props去计算下一个状态, 我们可以避免依赖props.step吗？
 * 可以：我们可以把reducer函数放到组件内去读取prop。这种模式需要的话可以使用，但会使一些优化失效，所以你应该避免滥用它。
 * 本例中React也保证dispatch在每次渲染中都是一样的。
 * */

// function Counter({ step }) {
//   const [count, dispatch] = useReducer(reducer, 0);
//
//   function reducer(state, action) {
//     if (action.type === 'tick') {
//       return state + step;
//     } else {
//       throw new Error();
//     }
//   }
//
//   useEffect(() => {
//     const id = setInterval(() => {
//       dispatch({ type: 'tick' });
//     }, 1000);
//     return () => clearInterval(id);
//   }, [dispatch]);
//
//   return <h1>{count}</h1>;
// }
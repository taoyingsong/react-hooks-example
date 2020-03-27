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

  const [state, dispatch] = useReducer(reducer, []);
  console.log('reducer state is: ', state)
  // const { count, step } = state;

  // useEffect(() => {
  //   const id = setInterval(() => {
  //     dispatch({ type: 'tick' });
  //   }, 1000);
  //   return () => clearInterval(id);
  // }, [dispatch]);

  useEffect(() => {
    console.log('in1 useEffect @useDataFetch.ts..........', state)
    const fetchData = async () => {
      dispatch({ type: 'FETCH_INIT' });
      console.log('in2 useEffect fetchData @useDataFetch.ts...', state)
      try {
        // Note: 这里要重写
        setTimeout(()=> {
          dispatch({ type: 'FETCH_SUCCESS', payload: [1, 2, 3] });
        }, 1000)
        console.log('in3 useEffect fetchData @useDataFetch.ts...', state)
      } catch (error) {
        dispatch({ type: 'FETCH_FAILURE' });
      }
    };
    fetchData()
  }, [])

  return 1
  // return (
  //   <>
  //     <h1>{count}</h1>
  //     <input value={step} onChange={e => {
  //       dispatch({
  //         type: 'step',
  //         step: Number(e.target.value)
  //       });
  //     }} />
  //   </>
  // );
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_INIT':
      console.log('FETCH_INIT')
      return { ...state, isLoading: true, isError: false }
    case 'FETCH_SUCCESS':
      console.log('FETCH_SUCCESS')
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case 'FETCH_FAILURE':
      console.log('FETCH_FAILURE')
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      console.log('dataFetchReducer ERROR')
      throw new Error();
  }
};
//
// function reducer(state, action) {
//   const { count, step } = state;
//   switch (action.type) {
//     case 'tick':
//       console.log('tick action......')
//       return { count: count + step, step };
//     case 'step':
//       console.log('step action......')
//       return { count, step: action.step };
//     default:
//       throw new Error();
//   }
// }

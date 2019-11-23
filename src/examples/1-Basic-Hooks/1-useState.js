import React, { useState, useEffect } from 'react';

export default ()=> {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);
  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  // prevCount为上次setCount的值
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
      <button onClick={() => setCount(preCount => preCount + 1)}>
        Click me 1
      </button>
    </div>
  );
}

/**
 * 1. 通常，当函数退出时变量就会“销毁”，但 React 会保留 state(状态) 变量。
 * 2. 如下：函数式组件中的非state变量每次都会被初始化，不会像state一样保留住，下边在第二个useEffect中赋值的常量不生效，读取时还是初始值。解决方案：1）需要用useState存储 2）disabled、newInstanceList提取到函数外边
 */

// import * as React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { bindActionCreators } from '@tencent/qcloud-lib';
// import { Justify } from '@tea/component';
// import { t, Trans } from '@tencent/tea-app/lib/i18n';
//
// import { allActions } from '../actions';
// import { Select } from '@tea/component';
//
// const { useState, useEffect } = React;
//
// export const ProjectHeadPanel = props => {
//   const state = useSelector(state => state);
//   const dispatch = useDispatch();
//   const { actions } = bindActionCreators({ actions: allActions }, dispatch);
//
//   const { instanceList } = state;
//   const [selectedInstance, setSelectedInstance] = useState(null);
//   // const [newInstanceList, setNewInstanceList] = useState([]);
//   // const [disabled, setDisabled] = useState(true);
//
//   let disabled = true;
//   let newInstanceList = [];
//   useEffect(() => {
//     actions.instance.applyFilter({});
//   }, []);
//   useEffect(() => {
//     if (instanceList.list.data.recordCount > 0) {
//       newInstanceList = instanceList.list.data.records.map(item => ({
//         value: item.RegistryId,
//         text: item.RegistryName
//       }));
//       // setNewInstanceList(newInstanceList);
//       setSelectedInstance(newInstanceList[0].value);
//       // setDisabled(false);
//       disabled = false;
//     }
//   }, [instanceList.list.data.recordCount]);
//
//   console.log('before render: ', newInstanceList, disabled, selectedInstance);
//   return (
//     <Justify
//       left={
//         <React.Fragment>
//           <h2>{t('命名空间')}</h2>
//           <Select
//             type="simulate"
//             appearence="button"
//             disabled={disabled}
//             options={newInstanceList}
//             value={selectedInstance}
//             onChange={value => setSelectedInstance(value)}
//             placeholder="无实例"
//           />
//         </React.Fragment>
//       }
//     />
//   );
//   // }
// };

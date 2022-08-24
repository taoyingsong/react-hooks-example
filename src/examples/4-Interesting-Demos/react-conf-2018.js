// /******************************************** begin *********************************
//  * 简单的功能用class组件和函数组件实现对比
//  */
// import React from 'react';
// import Row from './Row';
//
// export default class Greeting extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       name: 'Mary',
//       surname: 'Poppins',
//     }
//     this.handleNameChange = this.handleNameChange.bind(this);
//     this.handleSurnameChange = this.handleSurnameChange.bind(this);
//   }
//
//   handleNameChange(e) {
//     this.setState({
//       name: e.target.value
//     })
//   }
//
//   handleSurnameChange(e) {
//     this.setState({
//       surname: e.target.value
//     })
//   }
//
//   render() {
//     return (
//       <section>
//         <Row label="Name">
//           <input
//             value={this.state.name}
//             onChange={this.handleNameChange}
//           />
//         </Row>
//         <Row label="Surname">
//           <input
//             value={this.state.surname}
//             onChange={this.handleSurnameChange}
//           />
//         </Row>
//       </section>
//     );
//   }
// }
//
//
// import React, { useState } from 'react';
// import Row from './Row';
//
// export default function Greeting(props) {
//   const [name, setName] = useState('Mary');
//   const [surname, setSurname] = useState('Poppins');
//
//   function handleNameChange(e) {
//     setName(e.target.value);
//   }
//
//   function handleSurameChange(e) {
//     setSurname(e.target.value);
//   }
//
//   return (
//     <section>
//       <Row label="Name">
//         <input
//           value={name}
//           onChange={handleNameChange}
//         />
//       </Row>
//       <Row label="Surname">
//         <input
//           value={surname}
//           onChange={handleSurnameChange}
//         />
//       </Row>
//     </section>
//   );
// }
//
// /**
//  * 比较：
//  * class组件:
//  *
//  * 使用hooks的函数组件：
//  *
//  */
// /******************************************** end **********************************/
//
//
// /******************************************** begin **********************************
//  * 用 class 和 hook 两种方式使用 React context
//  */
// import React from 'react';
// import Row from './Row';
// import { ThemeContext, LocaleContext } from './context';
//
// export default class Greeting extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       name: 'Mary',
//       surname: 'Poppins',
//     }
//     this.handleNameChange = this.handleNameChange.bind(this);
//     this.handleSurnameChange = this.handleSurnameChange.bind(this);
//   }
//
//   handleNameChange(e) {
//     this.setState({
//       name: e.target.value
//     })
//   }
//
//   handleSurnameChange(e) {
//     this.setState({
//       surname: e.target.value
//     })
//   }
//
//   render() {
//     return (
//       <ThemeContext.Consumer>
//         {theme => (
//           <section className={theme}>
//             <Row label="Name">
//               <input
//                 value={this.state.name}
//                 onChange={this.handleNameChange}
//               />
//             </Row>
//             <Row label="Surname">
//               <input
//                 value={this.state.surname}
//                 onChange={this.handleSurnameChange}
//               />
//             </Row>
//             <LocaleContext.Consumer>
//               {locale => (
//                 <Row label="Language">
//                   {locale}
//                 </Row>
//               )}
//             </LocaleContext.Consumer>
//           </section>
//         )}
//       </ThemeContext.Consumer>
//
//     );
//   }
// }
//
//
// import React, { useState, useContext } from 'react';
// import Row from './Row';
// import { ThemeContext, LocaleContext } from './context';
//
// export default function Greeting(props) {
//   const [name, setName] = useState('Mary');
//   const [surname, setSurname] = useState('Poppins');
//   const theme = useContext(ThemeContext);
//   const locale = useContext(LocaleContext);
//
//
//   function handleNameChange(e) {
//     setName(e.target.value);
//   }
//
//   function handleSurameChange(e) {
//     setSurname(e.target.value);
//   }
//
//   return (
//     <section className={theme}>
//       <Row label="Name">
//         <input
//           value={name}
//           onChange={handleNameChange}
//         />
//       </Row>
//       <Row label="Surname">
//         <input
//           value={surname}
//           onChange={handleSurnameChange}
//         />
//       </Row>
//       <Row label="Language">
//         {locale}
//       </Row>
//     </section>
//   );
// }
// /**
//  * 比较：
//  * 同样功能的实现hook的实现代码更加扁平
//  * class组件:
//  *
//  * 使用hooks的函数组件：
//  *
//  */
// /******************************************** end **********************************/
//
// /******************************************** begin **********************************
//  * 副作用及订阅
//  * 不想因为保留订阅造成内存泄漏，所以要取消订阅
//  *
//  * 在 React 中可以通过 高阶组件 和 Render Props 来实现抽象和可重用性。还有 React Context及其Provider和消费者组件 所提供的另一个层次的抽象。React 中的所有这些高级模式都使用了所谓的包装组件。
//  *
//  * 比较：
//  * class组件:
//  * 1. 我们将逻辑分开到不同名称的生命周期方法中（componentDidMount、componentDitUpdate），它们在不同的时间上被触发。我们有时候会在它们之间重复一些逻辑。虽然可以把这些逻辑放进一个函数里，但是我们仍然不得不在两个地方调用它，而且要记得保持一致。
//  * 2. 我们有一些副作用，一些相关的逻辑是分开的：我们可以看到文档的标题在这里被设置，但是它在这也被设置了。并且我们在这订阅 effect，抱歉，在这订阅这个事件，但是我们在这里取消订阅。所以这些事情需要相互保持同步。而且这个方法包含了两个不相关的方法，在这不相关的两行。因此，我在未来有点难以单独测试它们。
//  *
//  * 使用hooks的函数组件：
//  * 1. 而使用 effect hook，默认具有一致性。（需要注意的是，在 class 中我们需要访问 this.state， 所以需要一个特殊的 API 来实现。但是在这个 effect 例子中，实际上不需要一个特殊的 API 去访问这个 state 变量。因为它已经在这个函数的作用域里，在上文中已经声明。？？？和hook的实现一样，class也需要一些额外的内部实现）
//  * 2. 我们分离代码不是基于生命周期函数的名字，而是基于这段代码要做什么。
//  */
// import React from 'react';
// import Row from './Row';
// import { ThemeContext, LocaleContext } from './context';
//
// export default class Greeting extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       name: 'Mary',
//       surname: 'Poppins',
//       width: window.innerWidth,
//     }
//     this.handleNameChange = this.handleNameChange.bind(this);
//     this.handleSurnameChange = this.handleSurnameChange.bind(this);
//     this.handleResize = this.handleResize.bind(this);
//   }
//
//   componentDidMount() {
//     document.title = this.state.name + ' ' + this.state.surname;
//     window.addEventListener('resize', handleResize);
//   }
//
//   componentDidUpdate() {
//     document.title = this.state.name + ' ' + this.state.surname;
//   }
//
//   componentWillUnmount() {
//     window.removeEventListener('resize', handleResize);
//   }
//
//   handleResize() {
//     this.setState({
//        width: window.innerWidth
//     });
//   }
//
//   handleNameChange(e) {
//     this.setState({
//       name: e.target.value
//     })
//   }
//
//   handleSurnameChange(e) {
//     this.setState({
//       surname: e.target.value
//     })
//   }
//
//   render() {
//     return (
//       <ThemeContext.Consumer>
//         {theme => (
//           <section className={theme}>
//             <Row label="Name">
//               <input
//                 value={this.state.name}
//                 onChange={this.handleNameChange}
//               />
//             </Row>
//             <Row label="Surname">
//               <input
//                 value={this.state.surname}
//                 onChange={this.handleSurnameChange}
//               />
//             </Row>
//             <LocaleContext.Consumer>
//               {locale => (
//                 <Row label="Language">
//                   {locale}
//                 </Row>
//               )}
//             </LocaleContext.Consumer>
//             <Row label="Width">
//               {this.state.width}
//             </Row>
//           </section>
//         )}
//       </ThemeContext.Consumer>
//     );
//   }
// }
//
//
//
// import React, { useState, useContext, useEffect } from 'react';
// import Row from './Row';
// import { ThemeContext, LocaleContext } from './context';
//
// export default function Greeting(props) {
//   const [name, setName] = useState('Mary');
//   const [surname, setSurname] = useState('Poppins');
//   const theme = useContext(ThemeContext);
//   const locale = useContext(LocaleContext);
//
//   useEffect(() => {
//     document.title = name + ' ' + surname;
//   })
//
//   const [width, setWidth] = useState(window.innerWidth);
//   useEffect(() => {
//     const handleResize = () => setWidth(window.innerWidth);
//     window.addEventListener('resize', handleResize);
//     return () => {
//       window.removeEventListener('resize', handleResize);
//     };
//   })
//
//   function handleNameChange(e) {
//     setName(e.target.value);
//   }
//
//   function handleSurameChange(e) {
//     setSurname(e.target.value);
//   }
//
//   return (
//     <section className={theme}>
//       <Row label="Name">
//         <input
//           value={name}
//           onChange={handleNameChange}
//         />
//       </Row>
//       <Row label="Surname">
//         <input
//           value={surname}
//           onChange={handleSurnameChange}
//         />
//       </Row>
//       <Row label="Language">
//         {locale}
//       </Row>
//       <Row label="Width">
//         {width}
//       </Row>
//     </section>
//   );
// }
// /******************************************** end **********************************/
//
// /******************************************** begin **********************************
//  * Custom Hook
//  * 仅仅是将逻辑提取到了一个遵循约定的函数（以use开头来命名）里面就可以。
//  * 约定的原因：
//  * 1. 可以让我们自动检测是否违反了我之前说过的第一条规则：不能在条件判断里面使用 hook。因为如果我们无法得知哪些函数是 hook，我们就无法做到自动检测。
//  * 2. 如果你查看组件的代码，你可能会想要知道某个函数里面是否含有 state。因此这样的约定很重要，好的，以 use 开头的函数表示这个函数是有状态的。
//  *
//  * 你有可能想要复用其他组件里面到一些逻辑，或者是想要将公用的逻辑抽取出来，或者是想要分别测试。
//  */
// import React, { useState, useContext, useEffect } from 'react';
// import Row from './Row';
// import { ThemeContext, LocaleContext } from './context';
//
// export default function Greeting(props) {
//   const [name, setName] = useState('Mary');
//   const [surname, setSurname] = useState('Poppins');
//   const theme = useContext(ThemeContext);
//   const locale = useContext(LocaleContext);
//   const width = useWindowWidth();
//
//   useEffect(() => {
//     document.title = name + ' ' + surname;
//   })
//
//   function handleNameChange(e) {
//     setName(e.target.value);
//   }
//
//   function handleSurameChange(e) {
//     setSurname(e.target.value);
//   }
//
//   return (
//     <section className={theme}>
//       <Row label="Name">
//         <input
//           value={name}
//           onChange={handleNameChange}
//         />
//       </Row>
//       <Row label="Surname">
//         <input
//           value={surname}
//           onChange={handleSurnameChange}
//         />
//       </Row>
//       <Row label="Language">
//         {locale}
//       </Row>
//       <Row label="Width">
//         {width}
//       </Row>
//     </section>
//   );
// }
//
// function useWindowWidth() {
//   const [width, setWidth] = useState(window.innerWidth);
//   useEffect(() => {
//     const handleResize = () => setWidth(window.innerWidth);
//     window.addEventListener('resize', handleResize);
//     return () => {
//       window.removeEventListener('resize', handleResize);
//     };
//   })
//   return width;
// }
//
//
// /**
//  * 每次我们调用 hook(eg. useFormInput)，其状态都是完全独立的。这是因为我们依赖调用 hook 的顺序，而不是通过名称或其他方式来实现的。
//  */
// import React, { useState, useContext, useEffect } from 'react';
// import Row from './Row';
// import { ThemeContext, LocaleContext } from './context';
//
// export default function Greeting(props) {
//   const name = useFormInput('Mary');
//   const surname = useFormInput('Poppins');
//   const theme = useContext(ThemeContext);
//   const locale = useContext(LocaleContext);
//   const width = useWindowWidth();
//   useDocumentTitle(name.value + ' ' + surname.value);
//
//   return (
//     <section className={theme}>
//       <Row label="Name">
//         <input {...name} />
//       </Row>
//       <Row label="Surname">
//         <input {...surname} />
//       </Row>
//       <Row label="Language">
//         {locale}
//       </Row>
//       <Row label="Width">
//         {width}
//       </Row>
//     </section>
//   );
// }
//
// function useFormInput(initialValue) {
//   const [value, setValue] = useState(initialValue);
//   function handleChange(e) {
//     setValue(e.target.value);
//   }
//   return {
//     value,
//     onChange: handleChange
//   };
// }
//
// function useDocumentTitle(title) {
//   useEffect(() => {
//     document.title = title;
//   })
// }
//
// function useWindowWidth() {
//   const [width, setWidth] = useState(window.innerWidth);
//   useEffect(() => {
//     const handleResize = () => setWidth(window.innerWidth);
//     window.addEventListener('resize', handleResize);
//     return () => {
//       window.removeEventListener('resize', handleResize);
//     };
//   })
//   return width;
// }
// /******************************************** end **********************************/
//
//
//
//
//
//
//
//
//
//

// import * as React from 'react';
// /*************************Why React Hooks? begin*************************************/
// /**
//  * Why React Hooks?
//  * https://tylermcginnis.com/why-react-hooks/
//  *
//  * Why does this thing exist? -- 为什么存在hooks？
//  * What problems does this thing solve? -- hooks解决了什么问题？
//  */
//
// /**
//  * createClass -- 创建React组件的原始方式。最初使用createClass API的原因是，当时JavaScript没有内置的类系统。
//  */
// const ReposGrid = React.createClass({
//   getInitialState () {
//     return {
//       repos: [],
//       loading: true
//     }
//   },
//   componentDidMount () {
//     this.updateRepos(this.props.id)
//   },
//   componentDidUpdate (prevProps) {
//     if (prevProps.id !== this.props.id) {
//       this.updateRepos(this.props.id)
//     }
//   },
//   updateRepos (id) {
//     this.setState({ loading: true })
//
//     fetchRepos(id)
//       .then((repos) => this.setState({
//         repos,
//         loading: false
//       }))
//   },
//   render() {
//     const { loading, repos } = this.state
//
//     if (loading === true) {
//       return <Loading />
//     }
//
//     return (
//       <ul>
//         {repos.map(({ name, handle, stars, url }) => (
//           <li key={name}>
//             <ul>
//               <li><a href={url}>{name}</a></li>
//               <li>@{handle}</li>
//               <li>{stars} stars</li>
//             </ul>
//           </li>
//         ))}
//       </ul>
//     )
//   }
// })
//
//
// /**
//  * React.Component
//  * 在ES6中，JavaScript引入了class关键字，并以一种原生方式在JavaScript中创建类。
//  * 如下我们通过class创建组件，使React更符合EcmaScript标准
//  */
// class ReposGrid extends React.Component {
//
//   // 在构造函数方法内部将组件的状态初始化为实例上的state属性
//   constructor (props) {
//     // 根据ECMAScript规范，如果要扩展子类，则必须先调用super，并传递prop。
//     super(props)
//
//     this.state = {
//       repos: [],
//       loading: true
//     }
//
//     // 使用createClass时，React会自动将所有方法绑定到组件的实例上。
//     // 使用React.Component时，则需要记住在类的构造函数中手动调用.bind方法，否则你会收到常见的“Cannot read property setState of undefined” 错误
//     this.updateRepos = this.updateRepos.bind(this)
//   }
//   componentDidMount () {
//     this.updateRepos(this.props.id)
//   }
//   componentDidUpdate (prevProps) {
//     if (prevProps.id !== this.props.id) {
//       this.updateRepos(this.props.id)
//     }
//   }
//
//   // 在新版本的 ES 中，有 Public Class Fields Syntax(https://babeljs.io/docs/en/babel-plugin-proposal-class-properties) 可以解决上边的手动bind问题
//   // updateRepos = (id) => {...}
//   updateRepos (id) {
//     this.setState({ loading: true })
//
//     fetchRepos(id)
//       .then((repos) => this.setState({
//         repos,
//         loading: false
//       }))
//   }
//   render() {
//     if (this.state.loading === true) {
//       return <Loading />
//     }
//
//     return (
//       <ul>
//         {this.state.repos.map(({ name, handle, stars, url }) => (
//           <li key={name}>
//             <ul>
//               <li><a href={url}>{name}</a></li>
//               <li>@{handle}</li>
//               <li>{stars} stars</li>
//             </ul>
//           </li>
//         ))}
//       </ul>
//     )
//   }
// }
//
// /**
//  * Class Fields -- 允许你直接将实例属性添加为类的属性，而不必使用构造函数。
//  * 解决了上边2个问题：
//  * 1. 不再需要使用构造函数来设置组件的初始状态
//  * 2. 不再需要在构造函数中使用.bind（因为我们可以将箭头函数用于我们的方法 ？？class中不行吗？也可以不过需要语法支持，上边安装插件后就可以了）
//  */
// class ReposGrid extends React.Component {
//   state = {
//     repos: [],
//     loading: true
//   }
//   componentDidMount () {
//     this.updateRepos(this.props.id)
//   }
//   componentDidUpdate (prevProps) {
//     if (prevProps.id !== this.props.id) {
//       this.updateRepos(this.props.id)
//     }
//   }
//   updateRepos = (id) => {
//     this.setState({ loading: true })
//
//     fetchRepos(id)
//       .then((repos) => this.setState({
//         repos,
//         loading: false
//       }))
//   }
//   render() {
//     const { loading, repos } = this.state
//
//     if (loading === true) {
//       return <Loading />
//     }
//
//     return (
//       <ul>
//         {repos.map(({ name, handle, stars, url }) => (
//           <li key={name}>
//             <ul>
//               <li><a href={url}>{name}</a></li>
//               <li>@{handle}</li>
//               <li>{stars} stars</li>
//             </ul>
//           </li>
//         ))}
//       </ul>
//     )
//   }
// }
//
//
// /**********
//  *
//  * React的整体思想是，通过将应用程序分解成可以组合在一起的独立组件，可以更好地管理应用程序的复杂性。这个组件模型使React变得如此优雅。这就是使React产生的原因。但是，问题不在于组件模型，而在于如何实现组件模型。
//  *
//  ***********/
//
//
// /**
//  * 我们将React组件的结构方式与该组件的生命周期结合在一起，自然迫使我们在整个组件中散布相关的逻辑。
//  * 如下，我们可以清楚地看到这一点。我们需要三种单独的方法（componentDidMount，componentDidUpdate和updateRepos）来完成同一件事 -- 使仓库与props.id保持同步。
//  */
// componentDidMount () {
//   this.updateRepos(this.props.id)
// }
// componentDidUpdate (prevProps) {
//   if (prevProps.id !== this.props.id) {
//     this.updateRepos(this.props.id)
//   }
// }
// updateRepos = (id) => {
//   this.setState({ loading: true })
//
//   fetchRepos(id)
//     .then((repos) => this.setState({
//       repos,
//       loading: false
//     }))
// }
//
//
// /**
//  *
//  * React擅长的是我们直观看到的UI的组合重用，非可视逻辑的重用并不擅长，但实际上非可视逻辑并不少见。
//  * 如下假设我们要重用updateRepos的逻辑，我们就需要创建一个HOC（Higher-Order Component ）
//  *
//  * 一直以来HOC（以及 Render Props）是共享非可视逻辑的推荐解决方案。
//  * 但如果你不熟悉（即便是熟悉）这些HOC，这是容易让人迷惑的逻辑 -- 有了withRepos HOC，我们有了一个函数，该函数接受要包装的组件作为参数，返回一个新的class组件，新的class组件中做一些共享逻辑处理，多么复杂的过程。
//  */
// function withRepos (Component) {
//   return class WithRepos extends React.Component {
//     state = {
//       repos: [],
//       loading: true
//     }
//     componentDidMount () {
//       this.updateRepos(this.props.id)
//     }
//     componentDidUpdate (prevProps) {
//       if (prevProps.id !== this.props.id) {
//         this.updateRepos(this.props.id)
//       }
//     }
//     updateRepos = (id) => {
//       this.setState({ loading: true })
//
//       fetchRepos(id)
//         .then((repos) => this.setState({
//           repos,
//           loading: false
//         }))
//     }
//     render () {
//       return (
//         <Component
//           {...this.props}
//           {...this.state}
//         />
//       )
//     }
//   }
// }
//
// // ReposGrid.js
// function ReposGrid ({ loading, repos }) {
// ...
// }
//
// export default withRepos(ReposGrid)
// // Profile.js
// function Profile ({ loading, repos }) {
// ...
// }
//
// export default withRepos(Profile)
//
//
// /**
//  * 当我们要消费多个HOC（render props）时，逻辑会变得更加难以理解，最终可能导致"回调地狱"（？？什么意思）的出现
//  */
// // <WithHover>
// //   <WithTheme hovering={false}>
// //     <WithAuth hovering={false} theme='dark'>
// //       <WithRepos hovering={false} theme='dark' authed={true}>
// //         <Profile
// //           id='JavaScript'
// //           loading={true}
// //           repos={[]}
// //           authed={true}
// //           theme='dark'
// //           hovering={false}
// //         />
// //       </WithRepos>
// //     </WithAuth>
// //   <WithTheme>
// // </WithHover>
//
// /**
//  *
//  * 总结上边问题：
//  * 1. 调用super(props)很烦人
//  * 2. 调用bind很烦人, 理解this的工作原理这对某些人来说是不必要的障碍
//  * 3. 通过生命周期方法组织组件会迫使我们在整个组件中散布相关的逻辑
//  * 4. React没有很好的方式来共享非可视逻辑
//  *
//  *
//  * 新的React Hooks API 可以让我们摆脱React.Component，构造函数，super，我们不再在整个组件中散布（和复制）效果逻辑，解决上边所有这些问题，改善了代码的重用性、组合（？？）等。使代码简单，可组合，灵活，可扩展。
//  * 相对于传统React生命周期方法的思维方式，React Hooks是一种新的思维方式。
//  *
//  * 另外我们可以通过自定义Hooks共享非可视逻辑（React对共享非可视逻辑没有很好的答案的原因是“React将UI耦合到了组件”。这会导致复杂的模式，例如HOC（高阶组件）或Render props），如下自定义 useRepos Hook
//  */
// function useRepos (id) {
//   const [ repos, setRepos ] = React.useState([])
//   const [ loading, setLoading ] = React.useState(true)
//
//   React.useEffect(() => {
//     setLoading(true)
//
//     fetchRepos(id)
//       .then((repos) => {
//         setRepos(repos)
//         setLoading(false)
//       })
//   }, [id])
//
//   return [ loading, repos ]
// }
//
// function ReposGrid ({ id }) {
//   const [ loading, repos ] = useRepos(id)
//   ...
// }
//
// function Profile ({ user }) {
//   const [ loading, repos ] = useRepos(user.id)
//   ...
// }
// /*************************Why React Hooks? end*************************************/
//
//
/*************************Why React Hooks? begin*************************************/


// export default class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       name: 'Mary',
//     }
//     this.handleNameChange = this.handleNameChange.bind(this);
//   }
//
//   handleNameChange(e) {
//     this.setState({
//       name: e.target.value
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
//       </section>
//     );
//   }
// }
//
// import React, { useState } from 'react';
// import Row from './Row';
//
// export default function Greeting(props) {
//   const [name, setName] = useState('Mary');
//
//   function handleNameChange(e) {
//     setName(e.target.value);
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
//     </section>
//   );
// }

// // 下面是两个最简单的 function component 和 class component 的对比，首先从行数上来看，3 << 7。
// /**
//  * SFC（Stateless Function Component）:
//  *
//  */
// const App = (props) => (
//   <div>Hello, {props.name}</div>
// )
//
//
// /**
//  * Class Component:
//  */
// class App extends React.Component {
//   render() {
//     return (
//       <div>Hello, {this.props.name}</div>
//     )
//   }
// }
//
//
// // 上边程序用 babel 编译成 es2015 后：
// /**
//  * Function Component: 仅仅是一个普通的 JS 函数
//  * 因为 Function Component 的特殊性，React 底层或许可以做 更多的性能优化。https://reactjs.org/blog/2015/10/07/react-v0.14.html#stateless-function-components
//  */
// "use strict";
//
// var App = function App(props) {
//   return React.createElement("div", null, "Hello, ", props.name);
// };
//
//
// /**
//  * Class Component: 因为 ES2015 不支持 class 的原因，会编译出很多和 class 相关的代码。
//  */
//
// "use strict";
//
// function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }
//
// function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }
//
// function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
//
// function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
//
// function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }
//
// function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }
//
// function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
//
// function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
//
// function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }
//
// function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
//
// function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
//
// function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
//
// var App = /*#__PURE__*/function (_React$Component) {
//   _inherits(App, _React$Component);
//
//   var _super = _createSuper(App);
//
//   function App() {
//     _classCallCheck(this, App);
//
//     return _super.apply(this, arguments);
//   }
//
//   _createClass(App, [{
//     key: "render",
//     value: function render() {
//       return /*#__PURE__*/React.createElement("div", null, "Hello, ", this.props.name);
//     }
//   }]);
//
//   return App;
// }(React.Component);
//
// // 去除一堆 babel helper 函数后：
// "use strict";
//
// var App =
//   /*#__PURE__*/
//   function (_React$Component) {
//     _inherits(App, _React$Component);
//
//     function App() {
//       _classCallCheck(this, App);
//
//       return _possibleConstructorReturn(this, _getPrototypeOf(App).apply(this, arguments));
//     }
//
//     _createClass(App, [{
//       key: "render",
//       value: function render() {
//         return React.createElement("div", null, "Hello, ", this.props.name);
//       }
//     }]);
//
//     return App;
//   }(React.Component);
//
// /**
//  * 总结函数组件:
//  * 1. 更容易阅读和单测
//  * 2. 写更少的代码，编译出更加精简的代码
//  * 3. React Team 可对这种组件做更佳的性能优化
//  */
//


/*************************Why React Hooks? end*************************************/





import React from 'react';

export default class RepoPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: [],
      width: window.innerWidth,
    }
    this.updateRepos = this.updateRepos.bind(this);
    this.handleResize = this.handleResize.bind(this);
  }

  componentDidMount() {
    this.updateRepos('didMount')
    window.addEventListener('resize', this.handleResize);
  }

  componentDidUpdate(prevProps) {
    // if (prevProps.id !== this.props.id) {
    //   this.updateRepos(this.props.id)
    // }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize() {
    this.setState({
      width: window.innerWidth
    });
  }

  updateRepos (id) {
    // fetchRepos(id)
    //   .then((repos) => this.setState({
    //     repos,
    //   }))
  }

  render() {
    return (
      <div>{this.state.width}</div>
    );
  }
}


// import React from 'react';
// import Profile from './Profile';
// import { WithHover, WithTheme, WithAuth, WithRepos } from './HOC';
// import { fetchRepos } from './WebAPI';
//
// export default class RepoPanel extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       repos: [],
//       width: window.innerWidth,
//     }
//     this.updateRepos = this.updateRepos.bind(this);
//     this.handleResize = this.handleResize.bind(this);
//   }
//
//   componentDidMount() {
//     this.updateRepos(this.props.id)
//     window.addEventListener('resize', this.handleResize);
//   }
//
//   componentDidUpdate(prevProps) {
//     if (prevProps.id !== this.props.id) {
//       this.updateRepos(this.props.id)
//     }
//   }
//
//   componentWillUnmount() {
//     window.removeEventListener('resize', this.handleResize);
//   }
//
//   handleResize() {
//     this.setState({
//       width: window.innerWidth
//     });
//   }
//
//   updateRepos (id) {
//     fetchRepos(id)
//       .then((repos) => this.setState({
//         repos,
//       }))
//   }
//
//   render() {
//     return (
//       <WithHover>
//         <WithTheme hovering={false}>
//           <WithAuth hovering={false} theme='dark'>
//             <WithRepos hovering={false} theme='dark' authed={true}>
//               <div>{this.state.width}</div>
//               <Profile
//                 repos={this.state.repos}
//                 hovering={false}
//                 theme='dark'
//                 authed={true}
//               />
//             </WithRepos>
//           </WithAuth>
//         </WithTheme>
//       </WithHover>
//     );
//   }
// }

//
// import React, { useState, useEffect } from 'react';
// import Profile from './Profile';
// import { useHover, useTheme, useAuth, useRepos } from './CustomHooks';
// import { fetchRepos } from './WebAPI';
//
// export default function RepoPanel(props) {
//   const { hovering } = useHover();
//   const { theme } = useTheme();
//   const { authed } = useAuth();
//
//   useEffect(() => {
//     useRepos(hovering, theme, authed)
//   }, [hovering, theme, authed])
//
//   const [repos, setRepos] = useState([]);
//   useEffect(() => {
//     fetchRepos(id)
//       .then((repos) => {
//         setRepos(repos)
//       })
//   }, [id])
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
//   return (
//     <>
//       <div>{width}</div>
//       <Profile
//         repos={repos}
//         authed={authed}
//         theme={theme}
//         hovering={hovering}
//       />
//     </>
//   );
// }

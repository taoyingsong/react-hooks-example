import React, {useContext } from 'react';

const themes = {
  light: {
    foreground: "#000000",
    background: "#eeeeee"
  },
  dark: {
    foreground: "#ffffff",
    background: "#222222"
  }
};

const ThemeContext = React.createContext(themes.light);

export default () => {
  return (
    <ThemeContext.Provider value={themes.dark}>
      <Toolbar />
    </ThemeContext.Provider>
  );
}

function Toolbar(props) {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

function ThemedButton() {
  /**
   * 1.
   * 接收一个 context 对象（React.createContext 的返回值）并返回该 context 的当前值。
   * 当前的 context 值由上层组件中距离当前组件最近的 <MyContext.Provider> 的 value prop 决定。
   *
   * 2.
   * 当组件上层最近的 <MyContext.Provider> 更新时，该 Hook 会触发重渲染，并使用最新的context value
   *
   * 3.
   * 只能是 useContext(MyContext)
   * 不能是 useContext(MyContext.Consumer) 或 useContext(MyContext.Provider)
   */
  const theme = useContext(ThemeContext);

  return (
    <button style={{ background: theme.background, color: theme.foreground }}>
      I am styled by theme context!
    </button>
  );
}


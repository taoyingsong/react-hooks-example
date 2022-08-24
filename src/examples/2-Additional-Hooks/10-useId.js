import React, { useId } from 'react';

// useId 是一个用于生成横跨服务端和客户端的稳定的唯一 ID 的同时避免 hydration 不匹配的 hook。
// (hydrate 是React 中提供在初次渲染的时候，去复用原本已经存在的DOM 节点，减少重新生成节点以及删除原本DOM 节点的开销，来加速初次渲染的功能。 主要使用场景是服务端渲染或者像 prerender 等情况。https://segmentfault.com/a/1190000041020566 可以随便看看)

/**
 * 注意：
 * useId 生成一个包含 : 的字符串 token。这有助于确保 token 是唯一的，但在 CSS 选择器或 querySelectorAll 等 API 中不受支持。
 * useId 支持 identifierPrefix 以防止在多个根应用的程序中发生冲突。 要进行配置，请参阅 hydrateRoot 和 ReactDOMServer 的选项。（看官方文档有链接）
 * 
 * 1. 我们只使用 useId 挂钩来连接两个 HTML 元素。2. 如果您认为可以将其用于 id 生成，那么它是完美的，3. 但请确保您不要在 CSS 直接使用 id，因为每次都会为您生成不同的 唯一id。
 */
export default () => {
    const id1 = useId();
    const id2 = useId();
    return (
        <>
          <div>
            <label htmlFor={id1}>Do you like React?</label>
            <input id={id1} type="checkbox" name="react"/>
          </div>
          <div>
            <label htmlFor={id2 + '-firstName'}>First Name</label>
            <div>
                <input id={id2 + '-firstName'} type="text" />
            </div>
            <label htmlFor={id2 + '-lastName'}>Last Name</label>
            <div>
                <input id={id2 + '-lastName'} type="text" />
            </div>
          </div>
        </>
      );
}
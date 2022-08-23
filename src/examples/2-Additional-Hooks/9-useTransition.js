import React, { useState, useTransition } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import ReactMarkdown from 'react-markdown'
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

export default () => {
  // 返回 【状态，启动该过渡任务的函数】
  const [isPending, startTransition] = useTransition();
  const [count, setCount] = useState(0);
  
  function handleClick() {
      // 将回调函数作为过渡任务。
      // 过渡任务中触发的更新会让更紧急地更新先进行，比如点击。并允许用户在 React 渲染更新的时候继续与当前内容进行交互。
      startTransition(() => {
          setCount(c => c + 1);
      })
  }

  return (
    <>
        <section>
        <h2>使用：</h2>
        <div>点击的时候注意闪烁的 'loading...' 的出现。</div>
        <div>{isPending && 'loading...'}</div>
        <button onClick={handleClick}>{count}点击我</button>
        </section>
        <br />
        <section>
            <div><a target="_blank" href="https://zhuanlan.zhihu.com/p/425007915">文章</a> -- 看markdown文件，9-useTransition.md</div>
        </section>
    </>
  );
}
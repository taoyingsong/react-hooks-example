import React, { useState, useTransition } from 'react';

export default () => {
  // 返回 【状态，启动该过渡任务的函数】
  const [isPending, startTransition] = useTransition();
  const [count, setCount] = useState(0);
  
  function handleClick() {
      // 将回调函数作为过渡任务。
      // 【过渡任务中触发的更新会让更紧急地更新先进行，比如点击。并允许用户在 React 渲染更新的时候继续与当前内容进行交互】。
      // 自己总结：非紧急更新【让步于】紧急更新；非紧急更新不会【阻塞】用户交互；非紧急更新可被紧急更新【中断】，被中断的更新会被直接【丢弃】 而 不会触发现有内容的意外降级。
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
           看markdown文件，9-useTransition.md
        </section>
    </>
  );
}
import React, { useState, useEffect } from 'react';

export default () => {

  return (
    <section>
      <a target="_blank" href="https://github.com/puxiao/react-hook-tutorial/blob/master/15%20useDebugValue%E5%9F%BA%E7%A1%80%E7%94%A8%E6%B3%95.md">基本用法</a> <br/>
      <a target="_blank" href="https://www.youtube.com/watch?v=pTF86K8JZBQ">相关视频</a>
      <h2>摘要</h2>
      <section>
      <h3>补充说明：</h3>
1、react官网文档中明确表示，在普通项目开发中不推荐使用useDebugValue，默认的调试输出已经很清晰可用了。<br />
2、除非你的自定义 hook 是作为共享库中的一部分才有价值。这样其他人更容易注意到你自定义的hook状态变化。
      </section>
      <section>
      <h3>请注意：</h3>
1、useDebugValue应该在自定义hook中使用，如果直接在组件内使用是无效的，不会报错也不会有任何额外信息展示。<br />
1、一般调试不需要使用useDebugValue，除非你编写的hook是公共库中的一部分，实在是想凸显额外信息，引起别人注意。<br />
2、如果使用useDebugValue，最好设置第2个参数，向react开发调试工具讲清楚如何格式化展示第1个参数。因为格式化值的显示可能是一项开销很大的操作。该函数只有在 Hook 被检查时才会被调用。它接受 debug 值作为参数，并且会返回一个格式化的显示值。


      </section>
      <h2>其他</h2>
      <code>
            useDebugValue(key); <br />
            useDebugValue(value); <br />
            // 等同于 <br />
            useDebugValue([key, value]) <br />
            <br />
            useDebugValue('test'); <br />
            useDebugValue([ key, value ]); <br />
            // 等同于 （这里的数组换成对象一样可以）<br /> 
            useDebugValue(['test', [ key, value ]]) <br />
      </code>
    </section>
  );
}
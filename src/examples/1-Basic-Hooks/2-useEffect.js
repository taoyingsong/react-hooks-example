import React, { useState, useEffect } from "react";

export default () => {
  const [count, setCount] = useState(0);

  // 既然我们设置了[]依赖，effect不会再重新运行（return部分也不会，除非卸载时），它后面每一秒都会调用setCount(0 + 1)
  // 在第一次渲染中，count是0。因此，setCount(count + 1)在每次执行中等价于setCount(0 + 1)。
  useEffect(() => {
    const id = setInterval(() => {
      console.log("before setCount count 是：", count);
      setCount(count + 1);
      console.log("after setCount count 是：", count);
    }, 1000);
    return () => {
      console.log("执行到了吗");
      clearInterval(id);
    };
  }, []);

  return <h1>{count}</h1>;
};

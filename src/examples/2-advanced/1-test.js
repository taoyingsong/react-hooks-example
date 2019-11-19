import React, {useState} from 'react'

export default () => {
  const [count, setCount] = useState(0)
  const [count1, setCount1] = useState(0)

  console.log('render')
  return <div>
    测试1
  </div>
}
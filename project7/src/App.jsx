import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import './App.css'
import Navbar from './components/Navbar'
import { increment, decrement, multiply, incrementByAmount } from './redux/counter/counterSlice'

function App() {
  const count = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()
  return (
    <>
      <Navbar />
      <div className='counter'>
        <button onClick={() => dispatch(decrement())}>-</button>
        <div>
          {count}
        </div>
        <button onClick={() => dispatch(incrementByAmount(2))}>+</button>
        <button onClick={() => dispatch(multiply())}>*</button>
      </div>
    </>
  )
}

export default App

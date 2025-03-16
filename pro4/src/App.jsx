import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [step, setStep] = useState(1)
  const min = 0
  const handleIncrease = () => {
    setCount(prevCount => prevCount + step)
  }
  const handleDecrease = () => {
    if (count - step >= min) {
      setCount(prevCount => prevCount - step)
    }
  }
  const handleReset = () => {
    setCount(prevCount => prevCount * 0)
  }
  const handleStep = (e) => {
    setStep(Number(e.target.value))
  }
  return (
    <>
      <div className="counter">
        <h1>{count}</h1>
        <div className="buttons">
          <button onClick={handleIncrease}>Increase by {step}</button>
          <button onClick={handleDecrease}>Decrease by {step}</button>
          <button onClick={handleReset}>Reset</button>

        </div>
        <input type="text" value={step} onChange={handleStep} />
      </div>
    </>
  )
}

export default App

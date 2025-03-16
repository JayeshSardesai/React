import { useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Body from './components/Body'
import { counterContext } from './Conuter'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  return (
    <>
      <counterContext.Provider value={{ count, setCount }}>
        <div className="Containor">
          <Header />
          <Body />
          <Footer />

        </div>
      </counterContext.Provider >
    </>
  )
}

export default App

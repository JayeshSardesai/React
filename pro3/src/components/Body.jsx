import React from 'react'
import { useContext } from 'react'
import { counterContext } from '../Conuter'
function Body() {
    const counter = useContext(counterContext)
    return (
        <div className='body'>
            {counter.count}
            <button onClick={() => counter.setCount = counter.count + 1}>Button</button>
        </div>
    )
}

export default Body

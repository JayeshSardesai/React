import React from 'react'
import { memo } from 'react'
function Navbar({ adjective, getAdjective }) {
    console.log("Navber")
    return (
        <div>
            This is {adjective} Navbar
            <button onClick={() => { getAdjective() }}>{getAdjective()}</button>
        </div>
    )
}

export default memo(Navbar)

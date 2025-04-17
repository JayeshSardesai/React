import React from 'react'

const Navbar = () => {
    return (
        <nav className='bg-slate-900 text-white'>
            <div className=" flex justify-between items-center h-14 px-4 py-5 mycontainor">
                <div className="logo font-bold">
                    <span className='text-green-700'>&lt;</span>
                    Pass
                    <span className='text-green-700'>Op/&gt;</span>
                </div>
                <ul>
                    <li className='flex justify-around items-center gap-4'>
                        <a className="hover:font-bold" href="">Home</a>
                        <a className="hover:font-bold" href="">About</a>
                        <a className="hover:font-bold" href="">Contact</a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar

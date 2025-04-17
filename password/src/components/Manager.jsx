import React, { useEffect } from 'react'
import { useRef, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const ref = useRef();
    const passwordRef = useRef();
    const [form, setForm] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setPasswordArray] = useState([])

    useEffect(() => {
        let passwords = localStorage.getItem("passwords")
        if (passwords) {
            setPasswordArray(JSON.parse(passwords))
        }
    }, [])
    const copyText = (text) => {
        toast('Text copied', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark"
        });
        navigator.clipboard.writeText(text)
    }
    const showPassword = () => {
        passwordRef.current.type = "text"
        console.log(ref.current.src)
        if (ref.current.src.includes("icons/Eye.png")) {
            ref.current.src = "icons/eyeSlash.svg"
            passwordRef.current.type = "password"
        } else {
            ref.current.src = "icons/Eye.png"
            passwordRef.current.type = "text"
        }
    }
    const savePassword = () => {
        if (form.password.length >= 3 && form.site.length >= 3 && form.username.length >= 3) {
            setPasswordArray([...passwordArray, { ...form, id: uuidv4() }])
            localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
            console.log(passwordArray)
            setForm({ site: "", username: "", password: "" })
            toast('Password Saved', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark"
            });
        } else {
            toast('Password Not Saved', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark"
            });
        }
    }
    const deletePassword = (id) => {
        let c = confirm("Do you realy want to Delete?")
        if (c) {
            setPasswordArray(passwordArray.filter(item => item.id !== id))
            localStorage.setItem("passwords", JSON.stringify(...passwordArray))
            toast('Password Deleted', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark"
            });
        }
    }
    const editPassword = (id) => {
        setForm(passwordArray.filter(i => i.id === id)[0])
        setPasswordArray(passwordArray.filter(item => item.id !== id))
    }
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }
    return (
        <div className='bg-slate-200 max-w-4xl px-2 md:px-10 mycontainor'>
            <div>
                <h1 className='text-4xl text font-bold text-center'>
                    <span className='text-green-700'>&lt;</span>
                    Pass
                    <span className='text-green-700'>Op/&gt;</span>
                </h1>
                <p className='text-green-600 text-lg text-center'>Your own Password Manager</p>
                <div className="text-white flex flex-col p-4 text-black gap-5">
                    <input value={form.site} name="site" onChange={handleChange} type="text" placeholder='Enter Website URL' className='rounded-full border border-green-500 w-full px-2 py-1 text-black' />
                    <div className="flex gap-1 justify-center">
                        <input value={form.username} name="username" onChange={handleChange} type="text" placeholder='Enter UserName' className='rounded-full border border-green-500 w-full px-2 py-1 text-black' />
                        <div className="relative">
                            <input ref={passwordRef} value={form.password} name="password" onChange={handleChange} type="text" placeholder='Enter Password' className='rounded-full border border-green-500 w-full px-2 py-1 text-black' />
                            <span className='absolute right-0 top-1 cursor-pointer' onClick={showPassword}>
                                <img ref={ref} src="icons/Eye.png" className='p-1' width={30} alt="Eye" />
                            </span>
                        </div>
                    </div>
                    <div className='flex justify-center'>
                        <button onClick={savePassword} className='hover:bg-green-600 rounded-full bg-green-400 py-1 px-4 font-bold w-fit text-black flex items-center border border-black'>
                            <lord-icon className="text-black"
                                src="https://cdn.lordicon.com/sbnjyzil.json"
                                trigger="hover"
                                stroke="bold"
                                colors="primary:#000000,secondary:#08a88a">
                            </lord-icon>
                            Save Password</button>
                    </div>
                </div>
            </div>
            <div className='passwords'>
                <h2 className='text-2xl font-bold'>Your Passwords</h2>
                {passwordArray.length === 0 && <div>No passwords to show</div>}
                {passwordArray.length != 0 && <table className="table-auto w-full rounded-md overflow-hidden border border-white">
                    <thead className='bg-green-800 text-white'>
                        <tr className="border border-white">
                            <th className='py-2 border border-white'>Site</th>
                            <th className='py-2 border border-white'>UserName</th>
                            <th className='py-2 border border-white'>Password</th>
                            <th className='py-2 border border-white'>Actions</th>
                        </tr>
                    </thead>
                    <tbody className='bg-green-200'>
                        {passwordArray.map((item, index) => (
                            <tr key={index} className="border border-white">
                                <td className='text-center border border-white'>
                                    <div className='flex justify-between items-center px-2'>
                                        <a href={item.site} className='truncate'>{item.site}</a>
                                        <img className='w-5 cursor-pointer' onClick={() => copyText(item.site)} src="icons/copy.svg" alt="Copy" />
                                    </div>
                                </td>
                                <td className='text-center border border-white'>
                                    <div className='flex justify-between items-center px-2'>
                                        <span>{item.username}</span>
                                        <img className='w-5 cursor-pointer' onClick={() => copyText(item.username)} src="icons/copy.svg" alt="Copy" />
                                    </div>
                                </td>
                                <td className='text-center border border-white'>
                                    <div className='flex justify-between items-center px-2'>
                                        <span>{item.password}</span>
                                        <img className='w-5 cursor-pointer' onClick={() => copyText(item.password)} src="icons/copy.svg" alt="Copy" />
                                    </div>
                                </td>
                                <td className='text-center border border-white'>
                                    <div className='flex justify-around items-center px-2'>
                                        <img className='w-5 cursor-pointer' onClick={() => editPassword(item.id)} src="icons/edit.png" alt="Edit" />
                                        <img className='w-5 cursor-pointer' onClick={() => deletePassword(item.id)} src="icons/trash.png" alt="Delete" />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>}
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </div>
    )
}

export default Manager

"use client"
import React, { useEffect, useState } from 'react'
import { useSession } from "next-auth/react"
import { useRouter } from 'next/navigation'

const Page = () => {
    const { data: session, status } = useSession()
    const router = useRouter()

    const [form, setForm] = useState({
        name: '',
        email: '',
        username: '',
        publicPicture: '',
        coverPicture: '',
        razorpayId: '',
        razorpaySecret: ''
    })

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login")
        }
    }, [status, router])

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm(prevForm => ({ ...prevForm, [name]: value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("Form submitted:", form)
    }

    if (status === "loading") {
        return <div className="text-center m-10 text-xl">Loading...</div>
    }

    return (
        <div className='flex flex-col justify-center items-center gap-5 m-5'>
            <h1 className='text-2xl'>Welcome to your dashBoard</h1>
            <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center gap-5'>
                <div>
                    <h2>Name</h2>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        value={form.name}
                        onChange={handleChange}
                        className='bg-white h-10 w-80 text-black p-2 rounded-full'
                    />
                </div>
                <div>
                    <h2>Email</h2>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        className='bg-white h-10 w-80 text-black p-2 rounded-full'
                    />
                </div>
                <div>
                    <h2>Username</h2>
                    <input
                        id="username"
                        name="username"
                        type="text"
                        value={form.username}
                        onChange={handleChange}
                        className='bg-white h-10 w-80 text-black p-2 rounded-full'
                    />
                </div>
                <div>
                    <h2>Public Picture</h2>
                    <input
                        id="publicPicture"
                        name="publicPicture"
                        type="text"
                        value={form.publicPicture}
                        onChange={handleChange}
                        className='bg-white h-10 w-80 text-black p-2 rounded-full'
                    />
                </div>
                <div>
                    <h2>Cover Picture</h2>
                    <input
                        id="coverPicture"
                        name="coverPicture"
                        type="text"
                        value={form.coverPicture}
                        onChange={handleChange}
                        className='bg-white h-10 w-80 text-black p-2 rounded-full'
                    />
                </div>
                <div>
                    <h2>Razorpay Id</h2>
                    <input
                        id="razorpayId"
                        name="razorpayId"
                        type="text"
                        value={form.razorpayId}
                        onChange={handleChange}
                        className='bg-white h-10 w-80 text-black p-2 rounded-full'
                    />
                </div>
                <div>
                    <h2>Razorpay Secret</h2>
                    <input
                        id="razorpaySecret"
                        name="razorpaySecret"
                        type="text"
                        value={form.razorpaySecret}
                        onChange={handleChange}
                        className='bg-white h-10 w-80 text-black p-2 rounded-full'
                    />
                </div>
                <button type="submit" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                    Save
                </button>
            </form>
        </div>
    )
}

export default Page

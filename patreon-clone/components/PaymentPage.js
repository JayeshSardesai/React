"use client"
import React, { useEffect, useState } from 'react'
import Script from 'next/script'
import { useSession } from 'next-auth/react';

const PaymentPage = ({ username }) => {
    const { data: session } = useSession()
    const [paymentForm, setPaymentForm] = useState({
        name: '',
        message: '',
        amount: ''
    })
    const [supporters, setSupporters] = useState([]);
    const handleChange = (e) => {
        setPaymentForm({ ...paymentForm, [e.target.name]: e.target.value })
    }
    const loadRazorpay = async (amount) => {
        try {
            const res = await fetch('/api/create-order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount, to_username: username, paymentform: paymentForm })
            });
            if (!res.ok) throw new Error('Failed to create order');
            const order = await res.json();
            const orderId = order.id;
            const options = {
                key: process.env.NEXT_PUBLIC_KEY_ID,
                amount: amount,
                currency: "INR",
                name: "FundLELE",
                description: "Test Transaction",
                image: "https://example.com/your_logo",
                order_id: orderId,
                callback_url: `${process.env.NEXT_PUBLIC_URL}/api/razorpay`, // exposed to client
                handler: function (response) {
                    window.location.href = `/${username}?paymentDone=true`;
                },
                notes: {
                    address: "Razorpay Corporate Office",
                    user_note: paymentForm.note || "", // Optional: custom note from form
                },
                prefill: {
                    name: username,
                    email: "test@example.com",
                    contact: "9999999999",
                },
                theme: {
                    color: "#3399cc"
                }
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error) {
            console.error("Error loading Razorpay:", error);
        }
    };
    useEffect(() => {
        async function fetchSupporters() {
            try {
                const res = await fetch(`/api/supporters?username=${username}`);
                if (res.ok) {
                    const data = await res.json();
                    setSupporters(data.payments || []);
                }
            } catch (e) {
                // handle error
            }
        }
        fetchSupporters();
    }, [username]);
    return (
        <>
            <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
            <div>
                <div className='cover-w-full bg-red-50 relative'>
                    <img className='object-cover w-full h-[350]' src="https://c10.patreonusercontent.com/4/patreon-media/p/campaign/4842667/452146dcfeb04f38853368f554aadde1/eyJ3Ijo2MjAsIndlIjoxfQ%3D%3D/18.gif?token-time=1746316800&token-hash=KnMoajgv2gOdDLOekxfnmuTxY1f1ljfsXHJuVMjhgGg%3D" alt="" />
                    <div className='absolute -bottom-10 right-[46%] border-3 border-white rounded-full'>
                        <img className='rounded-full' width={70} height={70} src="data:image/jpeg;base64,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" alt="" />
                    </div>
                </div>
                <div className='info flex justify-center items-center my-14 flex-col gap-2'>
                    <div className='font-bold text-lg'>
                        @{username}
                    </div>
                    <div className='text-slate-400'>
                        Creating Animated art for VTT&apos;s
                    </div>
                    <div className='text-slate-400'>
                        9,719 members. 82 post. $15,450/release
                    </div>
                    <div className="payment flex gap-3 w-[80%]">
                        <div className='supporters w-1/2 bg-slate-900 rounded-lg p-5'>
                            <h2 className=' p-5'>Supporters messages</h2>
                            <ul>
                                {supporters.length === 0 && <li className='text-slate-400'>No supporters yet.</li>}
                                {supporters.map((s, i) => (
                                    <li key={s._id || i} className='flex gap-3'>
                                        <img width={20} className='invert-80' src="user.svg" alt="Avatar" />
                                        <span>{s.name || 'Anonymous'} Donated <span>₹{s.amount}</span> {s.message ? `with message: ${s.message}` : ''}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="makePayment w-1/2 bg-slate-900 rounded-lg p-5">
                            <h2 className=' p-5'>Make a payment</h2>
                            <div className='flex flex-col gap-3'>
                                <input onChange={handleChange} value={paymentForm.name || ''} type="text" name="name" placeholder='Enter Name' className='bg-slate-800 rounded-lg p-3' />
                                <input onChange={handleChange} value={paymentForm.message || ''} name="message" type="text" placeholder='Enter message' className='bg-slate-800 rounded-lg p-3' />
                                <input onChange={handleChange} name="amount" value={paymentForm.amount || ''} type="text" placeholder='Enter amount' className='bg-slate-800 rounded-lg p-3' />
                                <button className='bg-blue-500 rounded-lg p-3' onClick={() => loadRazorpay(paymentForm.amount)}>Pay</button>
                            </div>
                            <div className='buttons flex gap-3 mt-5'>
                                <button className='bg-blue-900 rounded-lg p-3' onClick={() => loadRazorpay(10)}>₹10</button>
                                <button className='bg-blue-900 rounded-lg p-3' onClick={() => loadRazorpay(100)}>₹100</button>
                                <button className='bg-blue-900 rounded-lg p-3' onClick={() => loadRazorpay(1000)}>₹1000</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PaymentPage

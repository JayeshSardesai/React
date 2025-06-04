"use server"

import Razorpay from "razorpay"
import Payment from "@/models/Payment"
import connectdb from "@/db/connectdb"
import User from "@/models/User"

export const initiate = async (amount, to_username, paymentform) => {
    try {
        console.log(paymentform)
        await connectdb()
        if (!process.env.NEXT_PUBLIC_KEY_ID || !process.env.KEY_SECRET) {
            throw new Error("Missing Razorpay credentials.")
        }

        const user = await User.findOne({ username: to_username })
        if (!user) {
            throw new Error("Recipient user not found.")
        }

        const instance = new Razorpay({
            key_id: process.env.NEXT_PUBLIC_KEY_ID,
            key_secret: process.env.KEY_SECRET
        })

        const options = {
            amount: Math.round(Number(amount) * 100), // convert rupees to paise safely
            currency: "INR",
            receipt: "order_rcptid_" + Date.now(),
            notes: {
                key1: "value3",
                key2: "value2"
            }
        }

        const x = await instance.orders.create(options)

        if (!x || !x.id) {
            throw new Error("Failed to create Razorpay order.")
        }

        await Payment.create({
            orderId: x.id,
            amount: amount,
            to_user: user._id.toString(), // Use the correct ID
            name: paymentform.name,
            message: paymentform.message,
        });

        return x
    } catch (error) {
        console.error("Payment initiation error:", error)
        throw error
    }
}


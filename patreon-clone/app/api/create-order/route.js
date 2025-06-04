import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import Payment from "@/models/Payment";
import connectdb from "@/db/connectdb";
import User from "@/models/User";

export async function POST(req) {
    try {
        await connectdb();
        const body = await req.json();
        const { amount, to_username, paymentform } = body;
        if (!process.env.NEXT_PUBLIC_KEY_ID || !process.env.KEY_SECRET) {
            return NextResponse.json({ error: "Missing Razorpay credentials." }, { status: 500 });
        }
        const user = await User.findOne({ username: to_username });
        if (!user) {
            return NextResponse.json({ error: "Recipient user not found." }, { status: 404 });
        }
        const instance = new Razorpay({
            key_id: process.env.NEXT_PUBLIC_KEY_ID,
            key_secret: process.env.KEY_SECRET
        });
        const options = {
            amount: Math.round(Number(amount) * 100),
            currency: "INR",
            receipt: "order_rcptid_" + Date.now(),
            notes: {
                key1: "value3",
                key2: "value2"
            }
        };
        const x = await instance.orders.create(options);
        if (!x || !x.id) {
            return NextResponse.json({ error: "Failed to create Razorpay order." }, { status: 500 });
        }
        await Payment.create({
            orderId: x.id,
            amount: amount,
            to_user: user._id.toString(),
            name: paymentform.name,
            message: paymentform.message,
            done: false
        });
        return NextResponse.json(x);
    } catch (error) {
        console.error("Payment initiation error:", error);
        return NextResponse.json({ error: error.message || "Unknown error" }, { status: 500 });
    }
} 
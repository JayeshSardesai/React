import { NextResponse } from "next/server";
import Payment from "@/models/Payment";
import User from "@/models/User";
import connectDB from "@/db/connectdb";

export async function GET(req) {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const username = searchParams.get("username");
    if (!username) {
        return NextResponse.json({ payments: [] });
    }
    const user = await User.findOne({ username });
    if (!user) {
        return NextResponse.json({ payments: [] });
    }
    const payments = await Payment.find({ to_user: user._id, done: true })
        .sort({ createdAt: -1 })
        .select("name amount message createdAt");
    return NextResponse.json({ payments });
} 
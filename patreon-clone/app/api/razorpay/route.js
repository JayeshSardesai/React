import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import Payment from "@/models/Payment";
import connectDB from "@/utils/connectDB";

export const POST = async (req) => {
    console.log("💥 Razorpay callback HIT");
    await connectDB();
    const bodyText = await req.text();
    const params = new URLSearchParams(bodyText);
    const body = Object.fromEntries(params.entries());
    console.log("Incoming Razorpay POST:", body);

    let payment = await Payment.findOne({ orderId: body.razorpay_order_id });
    if (!payment) {
        return NextResponse.json({ success: false, message: "Order Id not Found" });
    }

    let isValid = validatePaymentVerification(
        {
            order_id: body.razorpay_order_id,
            payment_id: body.razorpay_payment_id,
        },
        body.razorpay_signature,
        process.env.KEY_SECRET
    );

    if (isValid) {
        const updatePayment = await Payment.findOneAndUpdate(
            { orderId: body.razorpay_order_id },
            { done: true },
            { new: true }
        );
        if (!updatePayment) {
            console.log("Update failed: order not found");
        } else {
            console.log("Update success:", updatePayment.done);
        }
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/${updatePayment.to_user}?paymentDone=true`);
    } else {
        return NextResponse.json({ success: false, message: "Payment Verification Failed" });
    }
};

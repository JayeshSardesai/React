import mongoose from "mongoose";
const { Schema, model } = mongoose;

const PaymentSchema = new Schema({
    orderId: { type: String, required: true },
    amount: { type: Number, required: true },
    to_user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // ✅ correctly set to String
    name: { type: String },
    message: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    done: { type: Boolean, default: false },
});

// ✅ Force-refresh model in development
delete mongoose.models.Payment;
const Payment = mongoose.models.Payment || model('Payment', PaymentSchema);

export default Payment;

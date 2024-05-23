import { model, models, Schema } from 'mongoose';

const otpSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    otp: {
        type: Number,
        required: true,
        min: 100000,
        max: 999999,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    expiresAt: {
        type: Date,
        default: () => Date.now() + 2 * 60 * 1000,
    },
});

const OTP = models.OTP || model('OTP', otpSchema);
export default OTP;
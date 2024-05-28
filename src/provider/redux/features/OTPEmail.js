import { createSlice } from "@reduxjs/toolkit";

export const OTPEmail = createSlice({
    name: "OTP Email",
    initialState:{
        email: null
    },
    reducers: {
        setOTPEmail: (state, action) => {
            state.email = action.payload;
        },
        removeOTPEmail: (state) => {
            state.email = null;
        }
    }
})

export const { setOTPEmail, removeOTPEmail } = OTPEmail.actions;

export default OTPEmail.reducer;
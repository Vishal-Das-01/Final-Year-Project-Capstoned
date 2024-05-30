"use client";
import { useState, useEffect } from "react";
import SubmitBtn from "@/app/(Unauthenticated)/(common_auth_pages)/_components/SubmitBtn/SubmitBtn";
import LoadingBtn from "@/app/(Unauthenticated)/(common_auth_pages)/_components/LoadingBtn/LoadingBtn";
import { FRONTEND_ROUTES } from "@/utils/routes/frontend_routes";
import { BACKEND_ROUTES } from "@/utils/routes/backend_routes";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import OTPInputField from "../OTPInputField/OTPInputField";
import { useSelector } from "react-redux";

export default function OTPVerificationForm() {
  const router = useRouter();

  const [isPending, setIsPending] = useState(false);
  const [otpValues, setOTPValues] = useState(Array(6).fill(''));
  const [resendTimer, setResendTimer] = useState(10);
  const [isTimerRunning, setIsTimerRunning] = useState(true);

  const otpEmail = useSelector((state) => state.OTPEmail.email);

  const handleOTPChange = (values) => {
    setOTPValues(values);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsPending(true);
      const response = await fetch(BACKEND_ROUTES.verifyOTP, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: otpEmail.email,
          otp: otpValues.join("")
        }),
      })
      const responseData = await response.json();

      if(response.status === 200) {
        toast.success(responseData.message);
        router.replace(FRONTEND_ROUTES.otp_verification_page);
      }
      else if(response.status === 403) {
        toast.error(responseData.message);
        router.replace(FRONTEND_ROUTES.login_page);
      }
      else {
        toast.error(responseData.message);
      }
    } catch (error) {
      toast.error("Unable to verify otp");
    } finally {
      setIsPending(false);
    }
  };

  const handleResend = async (e) => {
    e.preventDefault();
    try {
      setIsPending(true);
      const response = await fetch(BACKEND_ROUTES.sendOTP, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: otpEmail.email,
        }),
      })
      const responseData = await response.json();

      if(response.status === 200) {
        setResendTimer(10);
        setIsTimerRunning(true);

        toast.success(responseData.message);
      }
      else {
        toast.error(responseData.message);
      }
    } catch (error) {
      toast.error("Unable to resend otp");
    } finally {
      setIsPending(false);
    }
  };

  useEffect(() => {
    if (isTimerRunning && resendTimer > 0) {
      const timer = setTimeout(() => {
        setResendTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (resendTimer === 0) {
      setIsTimerRunning(false);
    }
  }, [isTimerRunning, resendTimer]);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-full items-center justify-center mt-3"
    >
      <p className="text-[#565656] mb-5">OTP has been sent to your email.</p>

      <OTPInputField otpValues={otpValues} onOTPChange={handleOTPChange} />

      {isPending ? <LoadingBtn /> : <SubmitBtn btnText="Verify OTP" />}

      {isTimerRunning ? (
        <p className="text-[#565656]">Resend in {Math.floor(resendTimer / 60)}:{("0" + (resendTimer % 60)).slice(-2)}</p>
      ) : (
        <div className="flex items-center">
          <p className="text-[#565656] mr-1">{"Didn't receive code?"}</p>
          <button onClick={handleResend} disabled={isPending} className="text-[#2563eb] hover:underline">
            Resend
          </button>
        </div>
      )}

    </form>
  );
}

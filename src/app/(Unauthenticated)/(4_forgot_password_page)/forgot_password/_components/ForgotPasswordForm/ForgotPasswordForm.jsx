"use client";
import { useState } from "react";
import ForgotPasswordInput from "../ForgotPasswordInput/ForgotPasswordInput";
import ForgotPasswordSubmitBtn from "../ForgotPasswordSubmitBtn/ForgotPasswordSubmitBtn";
import { FRONTEND_ROUTES } from "@/utils/routes/frontend_routes";
import { BACKEND_ROUTES } from "@/utils/routes/backend_routes";
import ForgotPasswordLoadingBtn from "../ForgotPasswordLoadingBtn/ForgotPasswordLoadingBtn";
import styles from "./ForgotPasswordForm.module.css";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function ForgotPasswordForm() {
  const router = useRouter();

  const [isPending, setIsPending] = useState(false);
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (email === "") {
        setErrorMsg("Please enter your registered email.");
        return;
      }
      setErrorMsg("");

      setIsPending(true);
      const response = await fetch(BACKEND_ROUTES.sendOTP, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
        }),
      })
      const responseData = await response.json();

      if(response.status === 200) {
        toast.success(responseData.message);
        router.replace(FRONTEND_ROUTES.otp_verification_page);
      }
      else {
        toast.error(responseData.message);
      }
    } catch (error) {
      toast.error("Unable to send otp");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-full items-center justify-center mt-3"
    >
      <ForgotPasswordInput
        label="Email"
        inputType="email"
        inputPlaceholder="Enter Email"
        value={email}
        setValue={setEmail}
      />

      {isPending ? <ForgotPasswordLoadingBtn /> : <ForgotPasswordSubmitBtn btnText="Send OTP" />}

      <div
        className={`${styles.errorMsgContainer} w-full flex items-center justify-center h-8`}
      >
        <p className={`font-montserrat font-base text-red-600 text-lg`}>
          {errorMsg}
        </p>
      </div>
    </form>
  );
}

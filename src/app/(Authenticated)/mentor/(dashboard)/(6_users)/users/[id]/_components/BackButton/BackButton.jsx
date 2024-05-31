"use client";
import React from "react";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { useRouter } from 'next/navigation'

function BackButton() {
  const router = useRouter();

  return (
    <div className="flex items-center flex-row">
    <IoArrowBackCircleSharp
      onClick={() => router.back()}
      className="text-2xl text-black hover:text-gray-300 cursor-pointer"
    />
    <p className="ml-2">Back</p>
    </div>
  );
}

export default BackButton;

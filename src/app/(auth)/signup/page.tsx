"use client";
import useRegister from "@/app/_hooks/useRegister";
import React, { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Metadata } from "next";
import SignInButton from "@/app/_components/SignInButton";
import { registerUser } from "@/app/_utils/actions";
// export const metadata: Metadata = {
//   title: "Sign up",
// };
function SignUp() {
  return (
    <div className="bg-rainbow-gradient text-center space-y-5">
      <h1 className="text-lg text-green-300">Sign up for Echo</h1>
      <SignInButton />
      <form className="flex flex-col" action={registerUser}>
        <label htmlFor="name">
          Your full name
          <input type="text" id="name" name="name" />
        </label>
        <label htmlFor="email">
          Your email address
          <input type="email" id="email" name="email" />
        </label>
        <label htmlFor="password">
          A secret password
          <input type="password" id="password" name="password" />
        </label>
        <button type="submit">Create a Echo account</button>
      </form>
    </div>
  );
}
export default SignUp;

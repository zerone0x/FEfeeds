"use client";
import { Metadata } from "next";
import SignInButton from "@/app/_components/SignInButton";
import { loginUser } from "@/app/_utils/actions";
import { useFormStatus } from "react-dom";

// export const metadata: Metadata = {
//   title: "Login",
// };

function Button() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending}>
      {pending ? "Loading..." : "Let's go →"}
    </button>
  );
}

function Login() {
  return (
    <div className="flex flex-col gap-10 mt-10 items-center">
      <h2 className="text-3xl font-semibold">Come on in!</h2>
      <SignInButton />
      <form className="flex flex-col" action={loginUser}>
        <label htmlFor="email">
          Email
          <input type="email" id="email" name="email" required />
        </label>
        <label htmlFor="password">
          Password
          <input type="password" id="password" name="password" required />
        </label>
        {/* <Button /> */}
        <button type="submit">Let's go →</button>
      </form>
    </div>
  );
}
export default Login;

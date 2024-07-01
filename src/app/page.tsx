import Link from "next/link";
import { redirect } from "next/navigation";

export default async function App() {
  return (
    <>
      <Link href="/login">Login</Link>
      <Link href="/signup">Register</Link>
      <Link href="/logOut">Log out</Link>
    </>
  );
}

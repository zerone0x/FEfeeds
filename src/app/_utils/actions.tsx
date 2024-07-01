import { redirect } from "next/navigation";
import {
  authUserLogin,
  authUserSignUp,
  loginWithGoogle,
} from "../_services/fetchDataAPI";

export async function loginUser(formData) {
  const email = formData.get("email");
  const password = formData.get("password");
  const user = await authUserLogin(email, password);
  if (user) {
    localStorage.setItem("username", user.name);
    localStorage.setItem("userId", user._id);
    redirect("/home");
  }
}

export async function registerUser(formData) {
  const email = formData.get("email");
  const password = formData.get("password");
  const name = formData.get("name");
  const user = await authUserSignUp(email, password, name);
  if (user) {
    localStorage.setItem("username", user.name);
    localStorage.setItem("userId", user._id);
    redirect("/home");
  }
}

export async function googleLogin(formData) {
  const user = await loginWithGoogle();
  if (user) {
    localStorage.setItem("username", user.name);
    localStorage.setItem("userId", user.userId);
    redirect("/home");
  }
}

export async function logOutUser() {
  localStorage.removeItem("username");
  localStorage.removeItem("userId");
}

import { Metadata } from "next";
import Login from "./login";

export const metadata: Metadata = {
  title: "ログイン",
  description: "ログインページ",
};

export default function LoginPage() {
  return <Login />;
}

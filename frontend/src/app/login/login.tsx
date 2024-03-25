"use client";

import { useState } from "react";
import { useRecoilState } from "recoil";
import { jwtState } from "../state/state";
import { useRouter, useSearchParams } from "next/navigation";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [, setJwt] = useRecoilState(jwtState);
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const res = await fetch("https://localhost:3001/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username, password: password }),
    });

    if (res.status === 500) {
      setErrorMessage("サーバーエラーが発生しました");
      setError(true);
      return;
    }

    if (res.status !== 200) {
      setErrorMessage("ユーザー名またはパスワードが間違っています");
      setError(true);
      return;
    }

    const data = await res.json();
    setJwt(data.access_token);

    const redirect = searchParams.get("redirect");
    router.push(redirect || "/");
  };

  return (
    <>
      <div className="flex h-full flex-col justify-center px-6 py-12 bg-white">
        <h2 className="text-center text-2xl font-bold">ログイン</h2>

        <div className="mt-10 mx-auto w-full max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username" className="text-sm text-black">
                ユーザー名
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="px-2 w-full rounded-md py-1.5 text-black shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  パスワード
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                ログイン
              </button>
            </div>
            <div
              className={`text-sm text-red-600 text-center ${
                error ? "visible" : "hidden"
              }`}
            >
              {errorMessage}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

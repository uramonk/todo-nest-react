"use client";

import { redirect, usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { RecoilRoot, useRecoilState } from "recoil";
import { jwtState } from "./state/state";

export default function MyApp({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const pathname = usePathname();
  const router = useRouter();
  const [jwt] = useRecoilState(jwtState);

  useEffect(() => {
    (async () => {
      // 未ログインの場合のリダイレクト処理
      if (pathname === "/login") {
        return;
      }

      const res = await fetch("https://localhost:3001/users/profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      });

      const data = await res.json();
      if (data?.statusCode === 401) {
        router.push(`/login?redirect=${pathname}`);
      }
    })();
  }, [router, pathname, jwt]);

  return <>{children}</>;
}

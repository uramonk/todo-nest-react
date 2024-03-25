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
      const res = await fetch("https://localhost:3001/users/profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      });

      if (res.status === 401) {
        router.push(`/login?redirect=${pathname}`);
      } else if (pathname === "/login" && res.status === 200) {
        router.push(`/`);
      }
    })();
  }, [router, pathname, jwt]);

  return <>{children}</>;
}

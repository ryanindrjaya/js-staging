import React, { useEffect } from "react";
import { useRouter } from "next/router";
import nookies from "nookies";

function Middleware({ children }) {
  const cookies = nookies.get(null);
  const token = cookies.token;
  const router = useRouter();

  useEffect(() => {
    const firstPath = router.pathname.split("/")[1];

    if (firstPath === "dashboard" && !token) {
      router.push("/");
    } else {
      if (token && firstPath === "") {
        router.push("/dashboard");
      }
    }
  }, []);

  return <>{children}</>;
}

export default Middleware;

import React, { useEffect } from "react";
import { useRouter } from "next/router";
import nookies from "nookies";

function Middleware({ children }) {
  const cookies = nookies.get(null);
  const token = cookies.token;
  const router = useRouter();

  useEffect(async () => {
    const firstPath = router.pathname.split("/")[1];

    // let isValid = await istokenValid(token);

    // if (!isValid) {
    //   router.push("/");
    // } else {
    // }

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

const istokenValid = async (token) => {
  const endpoint = process.env.NEXT_PUBLIC_URL + `/products`;
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };

  const req = await fetch(endpoint, options);
  const res = await req.json();
  if (req.status === 401) {
    return false;
  } else {
    return true;
  }
};

export default Middleware;

import React, { useEffect } from "react";
import { useRouter } from "next/router";
import nookies from "nookies";
import { useDispatch } from "react-redux";

function Middleware({ children }) {
  const cookies = nookies.get(null);
  const token = cookies.token;
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const firstPath = router.pathname.split("/")[1];

    const istokenValid = async () => {
      const endpoint = process.env.NEXT_PUBLIC_URL + `/products?pagination[limit]=1`;
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };

      const req = await fetch(endpoint, options);

      if (req.status === 401) {
        dispatch({ type: "SET_SESSION", message: "Sesi anda telah berakhir, harap login kembali" });
        router.push("/");
      }
    };

    if (firstPath === "dashboard" && !token) {
      dispatch({ type: "SET_SESSION", message: "Sesi anda telah berakhir, harap login kembali" });
      router.push("/");
    } else {
      if (token && firstPath === "") {
        router.push("/dashboard");
        return;
      }

      istokenValid();
    }
  }, []);

  return <>{children}</>;
}

export default Middleware;

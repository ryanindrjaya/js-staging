import React, { useEffect } from "react";
import { useRouter } from "next/router";
import nookies, { destroyCookie } from "nookies";
import { useDispatch, useSelector } from "react-redux";
import { notification } from "antd";
import { loadState } from "../library/helpers/localStorage";

function Middleware({ children }) {
  const moduls = loadState("_mod") || [];
  const cookies = nookies.get(null);
  const token = cookies.token;
  const router = useRouter();

  useEffect(() => {
    const pathnames = router.pathname.split("/");
    const usersModuls = moduls.map((modul) => modul.uri);
    const firstPath = pathnames[1];
    const modulUri = pathnames[2];

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
        destroyCookie(null, "token", { path: "/" });
        destroyCookie(null, "role", { path: "/" });

        router.push("/");
      }
    };

    if (firstPath === "dashboard" && !token) {
      router.push("/");
    } else {
      if (token && firstPath === "") {
        router.push("/dashboard");
        return;
      }

      if (modulUri) {
        if (!usersModuls.includes(modulUri)) {
          notification.error({
            message: "Akses Ditolak",
            description: "Anda tidak memiliki akses ke halaman ini, mengalihkan anda ke halaman dashboard",
          });

          router.replace(`/dashboard`);
          return;
        }
      }

      istokenValid();
    }
  }, [router.pathname]);

  return <>{children}</>;
}

export default Middleware;

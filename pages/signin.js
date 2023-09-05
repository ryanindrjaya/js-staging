import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Input from "@iso/components/uielements/input";
import Button from "@iso/components/uielements/button";
import IntlMessages from "@iso/components/utility/intlMessages";
import authActions from "../authentication/actions";
import SignInStyleWrapper from "../styled/SignIn.styles";
import { Spin, Alert } from "antd";
import nookies from "nookies";
import { saveState } from "../library/helpers/localStorage";
import Head from "next/dist/shared/lib/head";

const { login } = authActions;

export default function SignInPage(props) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [failedLogin, setFailedLogin] = useState(false);
  const [failedLoginMsg, setfailedLoginMsg] = useState("Username atau Password salah");
  const [field, setField] = useState({});
  const message = useSelector((state) => state.session.sessionMessage);

  const handleLogin = async (e) => {
    e.preventDefault();
    setFailedLogin(false);
    setLoading(true);

    const credentials = {
      identifier: field.username,
      password: field.password,
    };

    const JSONdata = JSON.stringify(credentials);
    const endpoint = process.env.NEXT_PUBLIC_URL + "/auth/local";

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSONdata,
    };

    try {
      const req = await fetch(endpoint, options);
      const res = await req.json();

      if (res.jwt) {
        // set new token
        nookies.set(null, "token", res.jwt, {
          maxAge: 30 * 24 * 60 * 60,
          path: "/",
          secure: process.env.NEXT_PUBLIC_URL !== "development",
          sameSite: "strict",
        });

        const user = await getUserInformation(res.jwt);
        const moduls = await getModuls(user.role.id);

        console.log("moduls", moduls);

        // set role token
        nookies.set(null, "role", user.role.name, {
          maxAge: 30 * 24 * 60 * 60,
          path: "/",
          secure: process.env.NEXT_PUBLIC_URL !== "development",
          sameSite: "strict",
        });

        saveState("_mod", moduls);

        // redirect
        router.replace("/dashboard");
      } else {
        setFailedLogin(true);
      }
    } catch (error) {
      console.log(error);
      setFailedLogin(true);
      setfailedLoginMsg("Kesalahan Pada Server. Silahkan cek kembali");
    }

    setLoading(false);
  };

  const getUserInformation = async (jwt) => {
    const endpoint = process.env.NEXT_PUBLIC_URL + "/users/me?populate[0]=role&populate[1]=moduls";

    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwt,
      },
    };

    const req = await fetch(endpoint, options);
    const res = await req.json();
    console.log(res);
    return res;
  };

  const getModuls = async (id) => {
    const endpoint = process.env.NEXT_PUBLIC_URL + "/moduls/roles/" + id;

    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const req = await fetch(endpoint, options);
    const res = await req.json();

    console.log("res", res);

    let order = 0;

    // group by parent_modul
    const groupBy = (array, key) => {
      return array.reduce((result, currentValue, idx) => {
        console.log("result", result);
        if (!currentValue[key]) {
          result[currentValue.uid] = {
            ...currentValue,
            order: order,
          };

          order++;

          return result;
        } else {
          if (!result[currentValue[key]]) {
            result[currentValue[key]] = {
              order: order,
              child: [],
            };
            order++;
          }

          (result[currentValue[key]] = result[currentValue[key]] || { child: [] }).child.push(currentValue);

          return result;
        }
      }, {});
    };

    const grouped = groupBy(res?.moduls, "parent_modul");

    return grouped || {};
  };

  const onClose = (e) => {
    console.log(e, "I was closed.");
  };

  function setValue(e) {
    const target = e.target;
    const name = target.name;
    const value = target.value;

    setField({
      ...field,
      [name]: value,
    });
  }

  // =========================== UI ===========================

  return (
    <>
      <Head>
        <title>Jaya Sehat | Login</title>
      </Head>
      <SignInStyleWrapper className="isoSignInPage">
        <div className="isoLoginContentWrapper">
          <div className="isoLoginContent">
            <div className="isoLogoWrapper">JAYA SEHAT</div>

            <div className="isoSignInForm">
              <div className="isoInputWrapper">
                <Input onChange={setValue} name="username" id="inputUserName" size="large" placeholder="Username" />
              </div>

              <div className="isoInputWrapper">
                <Input
                  onChange={setValue}
                  id="inpuPassword"
                  size="large"
                  name="password"
                  type="password"
                  placeholder="Password"
                />
              </div>

              <div className="isoInputWrapper isoLeftRightComponent">
                {loading ? (
                  <div className="center">
                    <Spin />
                  </div>
                ) : (
                  <div className="flex flex-col">
                    {message ? (
                      <p className={`text-sm ${message === "success" ? "text-green-500" : "text-red-500"}`}>
                        {message}
                      </p>
                    ) : (
                      ""
                    )}
                    <Button block type="primary" onClick={handleLogin}>
                      <IntlMessages id="page.signInButton" />
                    </Button>
                  </div>
                )}
              </div>
              {failedLogin ? (
                <Alert
                  message="Login Error"
                  description="Username atau Password salah"
                  type="error"
                  closable
                  onClose={onClose}
                />
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </div>
      </SignInStyleWrapper>
    </>
  );
}

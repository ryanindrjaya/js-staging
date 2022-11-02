import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Input from "@iso/components/uielements/input";
import Button from "@iso/components/uielements/button";
import IntlMessages from "@iso/components/utility/intlMessages";
import authActions from "../authentication/actions";
import SignInStyleWrapper from "../styled/SignIn.styles";
import { Spin, Alert, Form } from "antd";
import nookies from "nookies";

const { login } = authActions;

export default function SignInPage(props) {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [failedLogin, setFailedLogin] = useState(false);
  const [failedLoginMsg, setfailedLoginMsg] = useState("Username atau Password salah");
  const [field, setField] = useState({});

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
      console.log(res);

      if (res.jwt) {
        // set new token
        nookies.set(null, "token", res.jwt, {
          maxAge: 30 * 24 * 60 * 60,
          path: "/",
          secure: process.env.NEXT_PUBLIC_URL !== "development",
          sameSite: "strict",
        });

        const role = await getUserInformation(res.jwt);
        // set role token
        nookies.set(null, "role", role, {
          maxAge: 30 * 24 * 60 * 60,
          path: "/",
          secure: process.env.NEXT_PUBLIC_URL !== "development",
          sameSite: "strict",
        });

        // redirect
        router.replace("/dashboard");
      } else {
        setFailedLogin(true);
      }
    } catch (error) {
      setFailedLogin(true);
      setfailedLoginMsg("Kesalahan Pada Server. Silahkan cek kembali");
    }

    setLoading(false);
  };

  const getUserInformation = async (jwt) => {
    const endpoint = process.env.NEXT_PUBLIC_URL + "/users/me?populate=role";

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

    return res.role.name;
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
    <Form
      form={form}
      name="add_order"
      initialValues={{
        remember: true,
      }}
      onFinish={handleLogin}
    >
      <SignInStyleWrapper className="isoSignInPage">
        <div className="isoLoginContentWrapper">
          <div className="isoLoginContent">
            <div className="isoSignInForm">
              <div className="font-bold text-lg p-3">
                <center>LOGIN</center>
              </div>
              <div className="isoInputWrapper">
                <Input onChange={setValue} name="username" id="inputUserName" size="large" placeholder="Username" />
              </div>

              <div className="isoInputWrapper">
                <Input onChange={setValue} id="inpuPassword" size="large" name="password" type="password" placeholder="Password" />
              </div>

              <div className="isoInputWrapper isoLeftRightComponent">
                {loading ? (
                  <div className="center">
                    <Spin />
                  </div>
                ) : (
                  <Button htmlType="submit" className="bg-blue-400 text-white w-full hover:bg-blue-600" onClick={handleLogin}>
                    <IntlMessages id="page.signInButton" />
                  </Button>
                )}
              </div>
              {failedLogin ? (
                <Alert message="Login Error" description="Username atau Password salah" type="error" closable onClose={onClose} />
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </div>
      </SignInStyleWrapper>
    </Form>
  );
}

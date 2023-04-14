import { Button, Form, InputNumber, notification } from "antd";
import Head from "next/dist/shared/lib/head";
import React, { useState } from "react";
import DashboardLayout from "../../../../containers/DashboardLayout/DashboardLayout";
import LayoutWrapper from "@iso/components/utility/layoutWrapper.js";
import LayoutContent from "@iso/components/utility/layoutContent";
import nookies from "nookies";
import DateTimeComponent from "../../../../components/DateTime/dateTime";
import { useRouter } from "next/router";

Kasir.getInitialProps = async (context) => {
  const cookies = nookies.get(context);
  const req = await fetchData(cookies);
  const user = await req.json();

  return {
    props: {
      user,
    },
  };
};

const fetchData = async (cookies) => {
  const endpoint = process.env.NEXT_PUBLIC_URL + "/users/me?populate=*";
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + cookies.token,
    },
  };

  const req = await fetch(endpoint, options);
  return req;
};

function Kasir({ props }) {
  const [form] = Form.useForm();
  const user = props.user;
  const [isLoading, setIsLoading] = useState(false);
  const cookies = nookies.get(null, "token");
  const router = useRouter();

  const isUserAlreadyCheckIn = async (cookies) => {
    const today = new Date()
      .toLocaleDateString("en-GB")
      .split("/")
      .reverse()
      .join("-");
    const tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
      .toLocaleDateString("en-GB")
      .split("/")
      .reverse()
      .join("-");

    const endpoint =
      process.env.NEXT_PUBLIC_URL +
      `/cashiers?filters[cashier_name][id][$eq]=${user.id}&populate=*&filters[createdAt][$gte]=${today}&filters[createdAt][$lte]=${tomorrow}`;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookies.token,
      },
    };

    const req = await fetch(endpoint, options);
    const res = await req.json();

    if (res.data.length > 0) {
      return true;
    }

    return false;
  };

  const onFinish = async (values) => {
    setIsLoading(true);

    const isCheckIn = await isUserAlreadyCheckIn(cookies);
    if (isCheckIn) {
      openNotification("error", "Gagal", "Anda sudah melakukan check in");
      setIsLoading(false);
      return;
    }

    const endpoint = process.env.NEXT_PUBLIC_URL + "/cashiers";
    values.cash_in_hand = values.cash_in_hand ?? 0;
    const data = {
      data: {
        ...values,
        cashier_name: user,
        type: "CHECK IN",
      },
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookies.token,
      },
      body: JSON.stringify(data),
    };

    const req = await fetch(endpoint, options);
    const res = await req.json();

    if (req.status === 200) {
      console.log("response cashiers", res);
      form.resetFields();

      openNotification("success", "Berhasil", "Kasir berhasil dibuka");
      router.replace("/dashboard/penjualan/toko/pembayaran");
    } else {
      console.log("error cashiers", res);
      openNotification(
        "error",
        "Gagal",
        "Terdapat kesalahan saat akan mengirimkan data"
      );
    }

    setIsLoading(false);
  };

  const onFinishFailed = (errorInfo) => {};

  // show antd notification
  const openNotification = (type, message, description) => {
    notification[type]({
      message: message,
      description: description,
    });
  };

  return (
    <>
      <Head>
        <title>Penjualan Toko</title>
      </Head>
      <DashboardLayout>
        <LayoutWrapper style={{}}>
          <LayoutContent>
            <Form
              form={form}
              name="add"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <div className="flex justify-center items-center h-screen">
                <div className="text-center">
                  <h5 className="text-xl font-bold">BUKA KASIR</h5>
                  <p className="text-lg">{user?.name ?? "-"}</p>
                  <DateTimeComponent />
                  <Form.Item name="cash_in_hand" noStyle>
                    <InputNumber
                      onKeyDown={(e) =>
                        e.key == "Enter" ? e.preventDefault() : ""
                      }
                      formatter={(value) =>
                        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                      size="large"
                      style={{
                        width: "50%",
                      }}
                    />
                  </Form.Item>

                  <p className="text-cyan-700 text-xs mt-3 max-w-lg">
                    SILAHKAN MEMASUKAN NOMINAL KAS ON HAND ANDA SEBELUM MEMBUKA
                    KASIR PEMBAYARAN JIKA ANDA TIDAK MEMILIKI KAS ON HAND
                    SILAHKAN KLIK BUKA
                  </p>

                  <Button
                    className="mt-3 rounded-md px-5"
                    loading={isLoading}
                    htmlType="submit"
                  >
                    BUKA
                  </Button>
                </div>
              </div>
            </Form>
          </LayoutContent>
        </LayoutWrapper>
      </DashboardLayout>
    </>
  );
}

export default Kasir;

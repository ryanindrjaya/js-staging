import Head from "next/head";
import React, { useState } from "react";
import LayoutContent from "@iso/components/utility/layoutContent";
import DashboardLayout from "../../../../containers/DashboardLayout/DashboardLayout";
import LayoutWrapper from "@iso/components/utility/layoutWrapper.js";
import TitlePage from "../../../../components/TitlePage/TitlePage";
import nookies from "nookies";
import { Form, Input, DatePicker, Row } from "antd";

Retur.getInitialProps = async (context) => {
  const cookies = nookies.get(context);
  const id = context.query.id;

  const req = await fetchData(cookies, id);
  const data = await req.json();

  return {
    props: {
      data,
    },
  };
};

const fetchData = async (cookies, id) => {
  const endpoint =
    process.env.NEXT_PUBLIC_URL + "/purchasings/" + id + "?populate=deep";
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

function Retur({ props }) {
  console.log(props);
  const data = props.data.data.attributes;
  const noLPB = data.no_purchasing;
  const notaSupplier = data.no_nota_suppplier;
  const datePurchasing = data.date_purchasing;
  const supplierName = data.supplier.data.attributes.name;
  const supplierAddress = data.supplier.data.attributes.address;

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();

  const onFinish = () => {};

  const onFinishFailed = () => {};

  return (
    <>
      <Head>
        <title>Retur Pembelian LPB</title>
      </Head>
      <DashboardLayout>
        <LayoutWrapper style={{}}>
          <TitlePage titleText={"Retur Pembelian LPB"} />
          <LayoutContent>
            <div className="flex flex-wrap -mx-3 mb-3">
              <div className="w-full md:w-1/4 px-3 mb-2 md:mb-0">
                <Form.Item
                  name="no_retur"
                  initialValue={`RB/ET/${dd}/${mm}/${yyyy}`}
                  rules={[
                    {
                      required: true,
                      message: "Nomor Retur tidak boleh kosong!",
                    },
                  ]}
                >
                  <Input style={{ height: "40px" }} placeholder="No Retur" />
                </Form.Item>
              </div>
              <div className="w-full md:w-1/4 px-3 mb-2 md:mb-0">
                <Form.Item
                  name="retur_date"
                  rules={[
                    {
                      required: true,
                      message: "Tanggal tidak boleh kosong!",
                    },
                  ]}
                >
                  <DatePicker
                    placeholder="Tanggal Retur"
                    size="large"
                    format={"DD/MM/YYYY"}
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </div>
              <div className="w-full md:w-1/4 px-3 mb-2 md:mb-0"></div>
              <div className="w-full md:w-1/4 px-3 mb-2 md:mb-0">
                <Row justify="start">
                  <p className="text-sm font-bold p-0 m-0">NO LPB : {noLPB} </p>
                  <p className="text-sm font-bold p-0 m-0">
                    NO NOTA SUPPLIER : {notaSupplier}{" "}
                  </p>
                  <p className="text-sm font-bold">
                    TANGGAL PEMBELIAN : {datePurchasing}{" "}
                  </p>
                </Row>
              </div>
              <div className="w-full md:w-1/4 px-3 mb-2 md:mb-0">
                <p className="font-bold text-sm p-0 m-0">SUPPLIER : </p>
                <p className="p-0 m-0">{supplierName}</p>
                <p>{supplierAddress}</p>
              </div>
            </div>
          </LayoutContent>
        </LayoutWrapper>
      </DashboardLayout>
    </>
  );
}

export default Retur;

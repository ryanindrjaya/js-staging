import Head from "next/head";
import React, { useState } from "react";
import LayoutContent from "@iso/components/utility/layoutContent";
import DashboardLayout from "../../../../containers/DashboardLayout/DashboardLayout";
import LayoutWrapper from "@iso/components/utility/layoutWrapper.js";
import { useRouter } from "next/router";
import { Row, Form, Input, InputNumber, Select, Button } from "antd";
import TitlePage from "../../../../components/TitlePage/TitlePage";
import PurchasingTable from "../../../../components/ReactDataTable/Purchases/PurchasingTable";
import nookies from "nookies";

Toko.getInitialProps = async (context) => {
  const cookies = nookies.get(context);

  const req = await fetchData(cookies);
  const user = await req.json();

  const reqLocation = await fetchLocation(cookies);
  const locations = await reqLocation.json();

  return {
    props: {
      user,
      locations,
    },
  };
};

const fetchData = async (cookies) => {
  const endpoint = process.env.NEXT_PUBLIC_URL + "/users/me";
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

const fetchLocation = async (cookies) => {
  const endpoint = process.env.NEXT_PUBLIC_URL + "/locations";
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

function Toko({ props }) {
  const user = props.user;
  const locations = props.locations.data;
  const [form] = Form.useForm();
  const [selectedCategory, setSelectedCategory] = useState("BEBAS");
  const { TextArea } = Input;

  const handleAdd = () => {
    console.log("tambah");
  };

  const onFinish = () => {};

  return (
    <>
      <Head>
        <title>Penjualan Toko</title>
      </Head>
      <DashboardLayout>
        <LayoutWrapper style={{}}>
          <TitlePage titleText={"Penjualan Toko"} />
          <LayoutContent>
            <Form
              form={form}
              name="add"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
            >
              <Row justify="space-between">
                <button disabled className="bg-yellow-500 rounded-md">
                  <p className="px-3 py-2 m-0 font-bold text-white uppercase">
                    {selectedCategory}
                  </p>
                </button>
                <div>
                  {selectedCategory === "BEBAS" ? (
                    <button
                      onClick={() => setSelectedCategory("BEBAS")}
                      className="bg-white rounded-md border border-cyan-700 m-1 text-sm"
                    >
                      <p className="px-4 py-2 m-0 text-cyan-700">BEBAS</p>
                    </button>
                  ) : (
                    <button
                      onClick={() => setSelectedCategory("BEBAS")}
                      className="bg-cyan-700 rounded-md m-1 text-sm"
                    >
                      <p className="px-4 py-2 m-0 text-white">BEBAS</p>
                    </button>
                  )}

                  {selectedCategory === "RESEP" ? (
                    <button
                      onClick={() => setSelectedCategory("RESEP")}
                      className="bg-white rounded-md border border-cyan-700 m-1 text-sm"
                    >
                      <p className="px-4 py-2 m-0 text-cyan-700">RESEP</p>
                    </button>
                  ) : (
                    <button
                      onClick={() => setSelectedCategory("RESEP")}
                      className="bg-cyan-700 rounded-md m-1 text-sm"
                    >
                      <p className="px-4 py-2 m-0 text-white">RESEP</p>
                    </button>
                  )}
                  <button className="bg-cyan-700 rounded-md m-1 text-sm">
                    <p className="px-4 py-2 m-0 text-white">
                      Laporan Penjualan
                    </p>
                  </button>
                </div>
                <div>
                  <p>{user.name}</p>
                </div>
              </Row>

              <div className="w-full flex flex-wrap justify-start -mx-3 mb-6 mt-5">
                <div className="w-full md:w-1/4 px-3 mb-2 md:mb-0">
                  <Form.Item
                    name="customer_name"
                    rules={[
                      {
                        required: true,
                        message: "Nama Pelanggan tidak boleh kosong!",
                      },
                    ]}
                  >
                    <Input
                      style={{ height: "40px" }}
                      placeholder="Nama Pelanggan"
                    />
                  </Form.Item>
                </div>
                <div className="w-full md:w-1/4 px-3 mb-2">
                  <Form.Item name="address">
                    <Input style={{ height: "40px" }} placeholder="Alamat" />
                  </Form.Item>
                </div>
                <div className="w-full md:w-1/4 px-3 mb-2">
                  <Form.Item name="phone">
                    <Input style={{ height: "40px" }} placeholder="No. Telp" />
                  </Form.Item>
                </div>
                <div className="w-full md:w-1/4 px-3 mb-2">
                  <Form.Item name="faktur">
                    <Input style={{ height: "40px" }} placeholder="Faktur" />
                  </Form.Item>
                </div>

                <div className="w-full md:w-1/4 px-3 mb-2">
                  <Form.Item name="tempo_days" initialValue={0} noStyle>
                    <Input
                      size="large"
                      style={{
                        width: "50%",
                      }}
                    />
                  </Form.Item>
                  <Form.Item name="tempo_time" initialValue={"Hari"} noStyle>
                    <Select
                      size="large"
                      style={{
                        width: "50%",
                      }}
                    >
                      <Select.Option value="Hari" key="Hari">
                        Hari
                      </Select.Option>
                      <Select.Option value="Bulan" key="Bulan">
                        Bulan
                      </Select.Option>
                    </Select>
                  </Form.Item>
                </div>
                <div className="w-full md:w-1/4 px-3 mb-2 md:mb-0">
                  <Form.Item
                    name="location"
                    rules={[
                      {
                        required: true,
                        message: "Lokasi tidak boleh kosong!",
                      },
                    ]}
                  >
                    <Select
                      placeholder="Pilih Lokasi"
                      size="large"
                      style={{
                        width: "100%",
                      }}
                    >
                      {locations.map((element) => {
                        return (
                          <Select.Option
                            value={element.id}
                            key={element.attributes.name}
                          >
                            {element.attributes.name}
                          </Select.Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                </div>
              </div>

              <div className="w-full flex flex-wrap -mx-3 mb-3">
                <div className="w-full md:w-1/3 px-3 mt-5 md:mb-0">
                  <Form.Item name="disc_type">
                    <Select
                      //disabled={products.productList.length === 0}
                      //onChange={setDiscType}
                      placeholder="Pilih Jenis Diskon"
                      size="large"
                      style={{
                        width: "100%",
                      }}
                    >
                      <Select.Option value="Tetap" key={"Tetap"}>
                        Tetap
                      </Select.Option>
                      <Select.Option value="Persentase" key={"Persentase"}>
                        Persentase
                      </Select.Option>
                    </Select>
                  </Form.Item>
                </div>
                <div className="w-full md:w-1/3 px-3 mt-5 md:mb-0">
                  <Form.Item name="disc_value" noStyle>
                    <InputNumber
                      //disabled={products.productList.length === 0}
                      //onChange={setTotalWithDisc}
                      size="large"
                      min={0}
                      placeholder="Diskon"
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </div>
                {/*<div className="w-full md:w-1/3 px-3 mt-5 md:mb-0">*/}
                {/*  <Form.Item name="delivery_fee" noStyle>*/}
                {/*    <InputNumber onChange={(e) => setBiayaPengiriman(e)} size="large" placeholder="Biaya Pengiriman" style={{ width: "100%" }} />*/}
                {/*  </Form.Item>*/}
                {/*</div>*/}

                <div className="w-full md:w-1/4 px-3 mb-2">

                  <Form.Item name="delivery_fee" initialValue={0} noStyle>
                    <Input
                      size="large"
                      style={{
                        width: "50%",
                      }}
                    />
                  </Form.Item>
                </div>

                <div className="w-full md:w-1/3 px-3 mt-5 md:mb-0">
                  <Form.Item name="DPP_active">
                    <Select
                      //disabled={products.productList.length === 0}
                      placeholder="Pakai DPP"
                      //onChange={setDPPActive}
                      size="large"
                      style={{
                        width: "100%",
                      }}
                    >
                      <Select.Option value="DPP" key={"DPP"}>
                        DPP
                      </Select.Option>
                    </Select>
                  </Form.Item>
                </div>
                <div className="w-full md:w-1/3 px-3 mt-5 md:mb-0">
                  <Form.Item name="PPN_active">
                    <Select
                      disabled={true}
                      placeholder="Pakai PPN"
                      size="large"
                      style={{
                        width: "100%",
                      }}
                    >
                      <Select.Option value="PPN" key={"PPN"}>
                        PPN
                      </Select.Option>
                    </Select>
                  </Form.Item>
                </div>
              </div>

              <div className="w-full flex md:w-3/4 justify-end mb-2">
                <p className="mb-4 font-bold text-center">Biaya Tambahan Lain Lain</p>
              </div>
              <div className="w-full flex flex-wrap justify-end mb-3">
                <div className="w-full md:w-1/3 px-3 mb-2 text-center md:mb-0">
                  <p className="mb-4 font-bold">Keterangan</p>
                  <Form.Item name="additional_fee_1_desc">
                    <Input size="large" style={{ width: "100%" }} />
                  </Form.Item>
                  <Form.Item name="additional_fee_2_desc">
                    <Input size="large" style={{ width: "100%" }} />
                  </Form.Item>
                  <Form.Item name="additional_fee_3_desc">
                    <Input size="large" style={{ width: "100%" }} />
                  </Form.Item>
                </div>

                <div className="w-full md:w-1/3 px-3 mb-2 text-center md:mb-0">
                  <p className="mb-4 font-bold">Jumlah</p>
                  <Form.Item name="additional_fee_1_sub">
                    <InputNumber
                      size="large"
                      style={{ width: "100%" }}
                      onChange={(e) =>
                        setAdditionalFee({
                          ...additionalFee,
                          additional_fee_1_sub: e,
                        })
                      }
                    />
                  </Form.Item>
                  <Form.Item name="additional_fee_2_sub">
                    <InputNumber
                      size="large"
                      style={{ width: "100%" }}
                      onChange={(e) =>
                        setAdditionalFee({
                          ...additionalFee,
                          additional_fee_2_sub: e,
                        })
                      }
                    />
                  </Form.Item>
                  <Form.Item name="additional_fee_3_sub">
                    <InputNumber
                      size="large"
                      style={{ width: "100%" }}
                      onChange={(e) =>
                        setAdditionalFee({
                          ...additionalFee,
                          additional_fee_3_sub: e,
                        })
                      }
                    />
                  </Form.Item>
                </div>
              </div>

              <div className="w-full flex flex-wrap justify-end mb-3">
                <Form.Item name="dpp" className="w-full h-2 md:w-1/2 mx-2">
                  DPP
                </Form.Item>
                <Form.Item name="ppn" className="w-full h-2 md:w-1/2 mx-2">
                  PPN
                </Form.Item>
                <Form.Item name="total" className="w-full h-2 md:w-1/2 mx-2">
                  Total
                </Form.Item>
                <Form.Item name="biayaPengiriman" className="w-full h-2 md:w-1/2 mx-2">
                  Biaya Pengiriman
                </Form.Item>
                <Form.Item name="biayaTambahan" className="w-full h-2 md:w-1/2 mx-2">
                  Biaya Tambahan
                </Form.Item>

                <Form.Item name="total" className="w-full h-2 md:w-1/2 mx-2 mt-3 text-lg">
                  Total
                </Form.Item>
              </div>

              <div className="w-full flex justify-between">
                <Form.Item name="catatanPenjualan" className="w-full md:w-1/2 mx-2">
                  <TextArea rows={4} placeholder="Catatan Penjualan" />
                </Form.Item>
                <Form.Item name="catatanStaff" className="w-full md:w-1/2 mx-2">
                  <TextArea rows={4} placeholder="Catatan Staff" />
                </Form.Item>
              </div>

              <div  className="w-full flex justify-between">
                <Button
                htmlType="submit"
                className=" hover:text-white hover:bg-cyan-700 border border-cyan-700 ml-1"
                >
                Tambah
                </Button>
              </div>
            </Form>
          </LayoutContent>
        </LayoutWrapper>
      </DashboardLayout>
    </>
  );
}

export default Toko;

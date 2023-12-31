import Head from "next/head";
import React, { useEffect, useState } from "react";
import LayoutContent from "@iso/components/utility/layoutContent";
import DashboardLayout from "../../../../containers/DashboardLayout/DashboardLayout";
import LayoutWrapper from "@iso/components/utility/layoutWrapper.js";
import { useRouter } from "next/router";
import { Input, notification, Select, DatePicker, Modal, Descriptions, Button, Tag } from "antd";
import TitlePage from "../../../../components/TitlePage/TitlePage";
import PurchasesReturTable from "../../../../components/ReactDataTable/Purchases/PurchasesReturTable";
import nookies from "nookies";
import { PrinterOutlined } from "@ant-design/icons";
import createInventoryRetur from "../utility/createInventoryRetur";
import updateJurnal from "../utility/updateJurnal";

Retur.getInitialProps = async (context) => {
  const cookies = nookies.get(context);
  let data;

  const req = await fetchData(cookies);
  data = await req.json();

  const reqUser = await fetchUser(cookies);
  const user = await reqUser.json();

  return {
    props: {
      data,
      user,
    },
  };
};

const fetchData = async (cookies) => {
  const endpoint = process.env.NEXT_PUBLIC_URL + "/returs?populate=*&sort[0]=id:desc";
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

const fetchUser = async (cookies) => {
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

function Retur({ props }) {
  const data = props.data;
  const user = props.user;
  const [retur, setRetur] = useState(data);
  const [selectedRetur, setSelectedRetur] = useState();
  const [openModal, setOpenModal] = useState(false);
  const router = useRouter();
  const cookies = nookies.get(null, "token");

  const handleAdd = () => {
    router.push("/dashboard/pembelian/retur/tambah");
  };

  const handleUpdate = (id) => {
    // router.push("/dashboard/pembelian/order_pembelian/edit/" + id);
    openNotificationWithIcon(
      "info",
      "Work In Progress",
      "Hai, Fitur ini sedang dikerjakan. Silahkan tunggu pembaruan selanjutnya"
    );
  };

  const handleDelete = async (id) => {
    const endpoint = process.env.NEXT_PUBLIC_URL + "/returs/" + id;
    const cookies = nookies.get(null, "token");

    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookies.token,
      },
      body: JSON.stringify({
        data: {
          status: "Dibatalkan",
        },
      }),
    };

    const req = await fetch(endpoint, options);
    const res = await req.json();
    if (res) {
      const newDataReq = await fetchData(cookies);
      const newData = await newDataReq.json();
      openNotificationWithIcon("success", "Retur dibatalakan", "Retur pembelian berhasil dibatalkan");
      setRetur(newData);
    }
  };

  const handlePageChange = async (page) => {
    const cookies = nookies.get(null, "token");
    const endpoint = process.env.NEXT_PUBLIC_URL + "/returs?pagination[page]=" + page;

    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookies.token,
      },
    };

    try {
      const req = await fetch(endpoint, options);
      const res = await req.json();
      if (res) {
        setRetur((prevData) => ({
          data: filterDuplicateData(prevData.data.concat(res.data)),
          meta: prevData.meta,
        }));
      } else {
        console.log("something is wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const filterDuplicateData = (arr) => {
    const seen = new Set();

    const filteredArr = arr.filter((el) => {
      const duplicate = seen.has(el.id);
      seen.add(el.id);
      return !duplicate;
    });

    return filteredArr;
  };

  const handleCancel = async (id, row) => {
    onChangeStatus("Dibatalkan", row);
  };

  const onChangeStatus = (status, row) => {
    row.attributes.status = status;
  };

  const openNotificationWithIcon = (type, title, message) => {
    notification[type]({
      message: title,
      description: message,
    });
  };

  // search query
  useEffect(() => {
    async function getReturById(id) {
      const endpoint = process.env.NEXT_PUBLIC_URL + `/returs/${id}?populate=deep`;
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + cookies.token,
        },
      };
      const req = await fetch(endpoint, options);
      const res = await req.json();

      setSelectedRetur(res?.data);
    }

    if (router?.query?.id) {
      const id = router.query.id;
      getReturById(id);
    }
  }, [router.query]);

  useEffect(() => {
    if (selectedRetur) {
      setOpenModal(true);
    }
  }, [selectedRetur]);

  var formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });

  const getTagColor = (type) => {
    switch (type) {
      case "Draft":
        return "orange";
      case "Selesai":
        return "green";
      default:
        return "default";
    }
  };

  const print = () => {
    router.replace(
      {
        pathname: "/dashboard/pembelian/retur",
      },
      undefined,
      { shallow: true }
    );
    router.push("retur/print/" + selectedRetur.id);
  };

  return (
    <>
      <Head>
        <title>Retur Pembelian</title>
      </Head>
      <DashboardLayout>
        <LayoutWrapper style={{}}>
          <TitlePage titleText={"Daftar Retur Pembelian"} />
          <LayoutContent>
            <Modal
              open={openModal}
              onClose={() => {
                router.replace(
                  {
                    pathname: "/dashboard/pembelian/retur",
                  },
                  undefined,
                  { shallow: true }
                );
                setOpenModal(false);
                setSelectedRetur();
              }}
              onCancel={() => {
                router.replace(
                  {
                    pathname: "/dashboard/pembelian/retur",
                  },
                  undefined,
                  { shallow: true }
                );
                setOpenModal(false);
                setSelectedRetur();
              }}
              width={1000}
              okButtonProps={{ style: { display: "none" } }}
              cancelText="Close"
            >
              {selectedRetur && (
                <>
                  <Descriptions
                    extra={
                      <Button onClick={print} className="bg-cyan-700 hover:bg-cyan-800 mr-7 border-none" type="primary">
                        <PrinterOutlined className="mr-2 mt-0.5 float float-left" /> Cetak
                      </Button>
                    }
                    size="middle"
                    title="INFORMASI RETUR BARANG"
                    bordered
                  >
                    <Descriptions.Item label="Tanggal Retur" span={4}>
                      {selectedRetur?.attributes?.tanggal_retur}
                    </Descriptions.Item>
                    <Descriptions.Item label="NO RETUR" span={2}>
                      {selectedRetur?.attributes?.no_retur}
                    </Descriptions.Item>
                    <Descriptions.Item label="Supplier">
                      {selectedRetur?.attributes?.supplier?.data?.attributes?.name}
                    </Descriptions.Item>
                    <Descriptions.Item label="Status" span={2}>
                      <Tag color={getTagColor(selectedRetur?.attributes?.status)}>
                        {selectedRetur?.attributes?.status}
                      </Tag>
                    </Descriptions.Item>
                    <Descriptions.Item label="Lokasi" span={2}>
                      {selectedRetur?.attributes?.location?.data?.attributes?.name}
                    </Descriptions.Item>
                  </Descriptions>

                  <Descriptions size="middle" title="DETAIL RETUR BARANG" className="mt-5" bordered>
                    {selectedRetur?.attributes?.retur_details?.data?.map((data) => {
                      return (
                        <>
                          <Descriptions.Item label={"Nama"} span={4}>
                            {data?.attributes?.products?.data?.[0]?.attributes?.name}
                          </Descriptions.Item>
                          <Descriptions.Item label={"Unit Retur"} span={1}>
                            {data?.attributes?.qty} {data?.attributes?.unit}
                          </Descriptions.Item>
                          <Descriptions.Item label={"Disc"} span={1}>
                            {formatter.format(data?.attributes?.disc)}
                          </Descriptions.Item>
                          <Descriptions.Item label={"Harga Satuan"} span={1}>
                            {formatter.format(data?.attributes?.harga_satuan)}
                          </Descriptions.Item>
                          <Descriptions.Item label={"Subtotal"} span={4}>
                            {formatter.format(data?.attributes?.sub_total)}
                          </Descriptions.Item>
                          <Descriptions.Item
                            span={4}
                            className=""
                            style={{
                              height: "50px",
                            }}
                          ></Descriptions.Item>
                        </>
                      );
                    })}

                    <Descriptions.Item label="Total Maksimal Retur" span={2} className="mt-5 font-bold">
                      {formatter.format(selectedRetur?.attributes.total_price)}
                    </Descriptions.Item>
                  </Descriptions>
                </>
              )}
            </Modal>

            <div className="w-full flex justify-start">
              <div className="w-full md:w-1/4 px-3">
                <Select
                  placeholder="Pilih Supplier"
                  size="large"
                  style={{
                    width: "100%",
                    marginRight: "10px",
                  }}
                >
                  <Select.Option>data</Select.Option>
                </Select>
              </div>
              <div className="w-full md:w-1/4 px-3">
                <Select
                  placeholder="Lokasi Gudang"
                  size="large"
                  style={{
                    width: "100%",
                    marginRight: "10px",
                  }}
                >
                  <Select.Option>data</Select.Option>
                </Select>
              </div>
              <div className="w-full md:w-1/4 px-3">
                <DatePicker placeholder="Tanggal Retur" size="large" style={{ width: "100%" }} />
              </div>
            </div>
            <div className="w-full flex justify-between">
              <div class="mt-4 text-black text-md font-bold ml-1">Daftar Retur</div>
              <button
                onClick={handleAdd}
                type="button"
                className="bg-cyan-700 rounded px-5 py-2 hover:bg-cyan-800  shadow-sm flex float-right mb-4"
              >
                <div className="text-white text-center text-sm font-bold">
                  <a className="text-white no-underline text-xs sm:text-xs">+ Tambah Retur</a>
                </div>
              </button>
            </div>
            <div className="w-full flex justify-between mb-4">
              <button
                onClick={handleUpdate}
                type="button"
                className="w-full md:w-1/4 mx-3 bg-cyan-700 rounded px-20 py-2 hover:bg-cyan-800  shadow-sm float-right mb-2"
              >
                <div className="text-white text-center text-sm font-bold">
                  <a className="text-white no-underline text-xs sm:text-xs">Print PDF</a>
                </div>
              </button>
              <button
                onClick={handleUpdate}
                type="button"
                className="w-full md:w-1/4 mx-3 bg-cyan-700 rounded px-20 py-2 hover:bg-cyan-800  shadow-sm float-right mb-2"
              >
                <div className="text-white text-center text-sm font-bold">
                  <a className="text-white no-underline text-xs sm:text-xs">Print CSV</a>
                </div>
              </button>
              <button
                onClick={handleUpdate}
                type="button"
                className="w-full md:w-1/4 mx-3 bg-cyan-700 rounded px-20 py-2 hover:bg-cyan-800  shadow-sm float-right mb-2"
              >
                <div className="text-white text-center text-sm font-bold">
                  <a className="text-white no-underline text-xs sm:text-xs">Print XLS</a>
                </div>
              </button>
              <button
                onClick={handleUpdate}
                type="button"
                className="w-full md:w-1/4 mx-3 bg-cyan-700 rounded px-20 py-2 hover:bg-cyan-800  shadow-sm float-right mb-2"
              >
                <div className="text-white text-center text-sm font-bold">
                  <a className="text-white no-underline text-xs sm:text-xs">Kolom Tampak</a>
                </div>
              </button>
            </div>

            <PurchasesReturTable
              data={retur}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
              onPageChange={handlePageChange}
              onChangeStatus={onChangeStatus}
              updateJurnal={updateJurnal}
              user={user}
            />
          </LayoutContent>
        </LayoutWrapper>
      </DashboardLayout>
    </>
  );
}

export default Retur;

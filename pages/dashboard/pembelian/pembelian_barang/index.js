import Head from "next/head";
import React, { useEffect, useState } from "react";
import LayoutContent from "@iso/components/utility/layoutContent";
import DashboardLayout from "../../../../containers/DashboardLayout/DashboardLayout";
import LayoutWrapper from "@iso/components/utility/layoutWrapper.js";
import { useRouter } from "next/router";
import { Button, Descriptions, Input, Modal, notification, Tag } from "antd";
import TitlePage from "../../../../components/TitlePage/TitlePage";
import PurchasingTable from "../../../../components/ReactDataTable/Purchases/PurchasingTable";
import nookies from "nookies";
import { PrinterOutlined } from "@ant-design/icons";
import createInventory from "../utility/createInventory";
import updateProductFromTable from "../utility/updateProductFromTable";
import updateJurnal from "../utility/updateJurnal";

Pembelian.getInitialProps = async (context) => {
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
  const endpoint = process.env.NEXT_PUBLIC_URL + "/purchasings?populate=*&sort[0]=id:desc";
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

function Pembelian({ props }) {
  const data = props.data;
  const user = props.user;
  const [selectedLPB, setSelectedLPB] = useState();
  const [purchase, setPurchase] = useState(data);
  const [openModal, setOpenModal] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const cookies = nookies.get(null, "token");

  const { Search } = Input;
  const router = useRouter();

  const handleAdd = () => {
    router.push("/dashboard/pembelian/pembelian_barang/tambah");
  };

  const handleUpdate = (id) => {
    router.push("/dashboard/pembelian/pembelian_barang/edit/" + id);
    //openNotificationWithIcon(
    //  "info",
    //  "Work In Progress",
    //  "Hai, Fitur ini sedang dikerjakan. Silahkan tunggu pembaruan selanjutnya"
    //);
  };

  const handlePageChange = async (page) => {
    const cookies = nookies.get(null, "token");
    const endpoint = process.env.NEXT_PUBLIC_URL + "/purchases?pagination[page]=" + page;

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
        setPurchase((prevData) => ({
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

  const onSearch = async (e) => {
    // if (e.target.value.length >= 2) {
    //   setIsSearching(true);
    //   const req = await searchQuery(e.target.value);
    //   const res = await req.json();
    //   setPurchase(res);
    //   setIsSearching(false);
    // } else {
    //   setPurchase(data);
    //   setIsSearching(false);
    // }
  };

  const searchQuery = async (keywords) => {
    // const endpoint =
    //   process.env.NEXT_PUBLIC_URL +
    //   "/purchases?filters[$or][0][added_by][$contains]=" +
    //   keywords +
    //   "&filters[$or][1][no_po][$contains]=" +
    //   keywords +
    //   "&populate=*";
    // const cookies = nookies.get(null, "token");
    // const options = {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: "Bearer " + cookies.token,
    //   },
    // };
    // const req = await fetch(endpoint, options);
    // return req;
  };

  const handleCancel = async (id, row) => {
    onChangeStatus("Dibatalkan", row);
  };

  const updateProductHarga = async (values) => {
    var index = 0;
    values.productList.forEach((element) => {
      // updateProduct(element, values.productInfo[index]);
      index++;
    });
  };

  const onChangeStatus = async (status, row) => {
    row.attributes.status = status;
    // const dataStatus = row;

    if (status === "Diterima") {
      // invetory handle
      await createInventory(row);

      await updateProductFromTable(row);

      //jurnal handle and coa
      updateJurnal(row, user, "lpb");
    }

    const poData = row?.attributes?.purchase?.data;
    const res = await changeStatusPO(poData?.id, status);
    if (res.data) {
      await changeStatusLPB(status, row.id);
    }
  };

  const changeStatusPO = async (poId, status) => {
    try {
      const updateStatus = {
        data: {
          status,
        },
      };

      const JSONdata = JSON.stringify(updateStatus);
      const cookies = nookies.get(null, "token");
      const endpoint = process.env.NEXT_PUBLIC_URL + "/purchases/" + poId;
      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + cookies.token,
        },
        body: JSONdata,
      };

      const req = await fetch(endpoint, options);
      const res = await req.json();
      if (req.status === 200) {
        openNotificationWithIcon(
          "success",
          "Status PO berhasil dirubah",
          "Status PO berhasil dirubah. Silahkan cek tabel PO"
        );
      } else {
        openNotificationWithIcon(
          "error",
          "Status PO gagal dirubah",
          "Status PO gagal dirubah. Silahkan cek log untuk error detail"
        );
      }

      return res;
    } catch (error) {
      console.log(error);
      openNotificationWithIcon(
        "error",
        "Status PO gagal dirubah",
        "Status PO gagal dirubah. Silahkan cek log untuk error detail"
      );

      return null;
    }
  };

  const changeStatusLPB = async (status, id) => {
    try {
      const newValues = {
        data: {
          status,
        },
      };

      const JSONdata = JSON.stringify(newValues);
      const cookies = nookies.get(null, "token");
      const endpoint = process.env.NEXT_PUBLIC_URL + "/purchasings/" + id;

      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + cookies.token,
        },
        body: JSONdata,
      };

      const req = await fetch(endpoint, options);
      const res = await req.json();

      if (req.status === 200) {
        const response = await fetchData(cookies);

        if (res.data.attributes.status === "Dibatalkan") {
          router.reload();
        } else {
          setPurchase(response);
        }

        openNotificationWithIcon(
          "success",
          "Status LPB berhasil dirubah",
          "Status LPB berhasil dirubah. Silahkan cek LPB"
        );
      } else {
        console.log("error", res);
        openNotificationWithIcon(
          "error",
          "Status LPB gagal dirubah",
          "Tedapat kesalahan yang menyebabkan status tidak dapat dirubah"
        );
      }
    } catch (error) {
      console.log("error", error);
      openNotificationWithIcon(
        "error",
        "Status LPB gagal dirubah",
        "Tedapat kesalahan yang menyebabkan status tidak dapat dirubah"
      );
    }
  };

  const fetchData = async (cookies) => {
    const endpoint = process.env.NEXT_PUBLIC_URL + "/purchasings?populate=*&sort[0]=id:desc";
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookies.token,
      },
    };

    const req = await fetch(endpoint, options);
    const res = req.json();

    return res;
  };

  const openNotificationWithIcon = (type, title, message) => {
    notification[type]({
      message: title,
      description: message,
    });
  };

  // search query
  useEffect(() => {
    async function getLPBById(id) {
      const endpoint = process.env.NEXT_PUBLIC_URL + `/purchasings/${id}?populate=*`;
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + cookies.token,
        },
      };
      const req = await fetch(endpoint, options);
      const res = await req.json();

      setSelectedLPB(res?.data);
    }

    if (router?.query?.id) {
      const id = router.query.id;
      getLPBById(id);
    }
  }, [router.query]);

  useEffect(() => {
    if (selectedLPB) {
      setOpenModal(true);
    }
  }, [selectedLPB]);

  var formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });

  const getTagColor = (type) => {
    switch (type) {
      case "Terkirim":
        return "green";
      case "Diterima":
        return "GREEN";
      case "Sebagian Diterima":
        return "orange";
      case "Diproses":
        return "default";
      default:
        return "default";
    }
  };

  const print = () => {
    router.replace(
      {
        pathname: "/dashboard/pembelian/pembelian_barang",
      },
      undefined,
      { shallow: true }
    );
    router.push("pembelian_barang/print/" + selectedLPB.id);
  };

  return (
    <>
      <Head>
        <title>Pembelian Barang</title>
      </Head>
      <DashboardLayout>
        <LayoutWrapper style={{}}>
          <TitlePage titleText={"Lembar Pembelian Barang"} />
          <LayoutContent>
            <Modal
              open={openModal}
              onClose={() => {
                router.replace(
                  {
                    pathname: "/dashboard/pembelian/pembelian_barang",
                  },
                  undefined,
                  { shallow: true }
                );
                setOpenModal(false);
                setSelectedLPB();
              }}
              onCancel={() => {
                router.replace(
                  {
                    pathname: "/dashboard/pembelian/pembelian_barang",
                  },
                  undefined,
                  { shallow: true }
                );
                setOpenModal(false);
                setSelectedLPB();
              }}
              width={1000}
              okButtonProps={{ style: { display: "none" } }}
              cancelText="Close"
            >
              {selectedLPB && (
                <>
                  <Descriptions
                    extra={
                      <Button onClick={print} className="bg-cyan-700 hover:bg-cyan-800 mr-7 border-none" type="primary">
                        <PrinterOutlined className="mr-2 mt-0.5 float float-left" /> Cetak
                      </Button>
                    }
                    size="middle"
                    title="INFORMASI PEMBELIAN BARANG"
                    bordered
                  >
                    <Descriptions.Item label="Tanggal Pembelian" span={4}>
                      {selectedLPB?.attributes?.date_purchasing}
                    </Descriptions.Item>
                    <Descriptions.Item label="NO LPB" span={2}>
                      {selectedLPB?.attributes?.no_purchasing}
                    </Descriptions.Item>
                    <Descriptions.Item label="Supplier">
                      {selectedLPB?.attributes?.supplier?.data?.attributes?.name}
                    </Descriptions.Item>
                    <Descriptions.Item label="Status" span={2}>
                      <Tag color={getTagColor(selectedLPB?.attributes?.status)}>{selectedLPB?.attributes?.status}</Tag>
                    </Descriptions.Item>
                    <Descriptions.Item label="Lokasi" span={2}>
                      {selectedLPB?.attributes?.location?.data?.attributes?.name}
                    </Descriptions.Item>
                  </Descriptions>

                  <Descriptions className="my-3" size="middle" title="PEMBAYARAN" bordered>
                    <Descriptions.Item label="Termin Pembayaran" span={2}>
                      {selectedLPB?.attributes?.tempo_days} {selectedLPB?.attributes?.tempo_time}
                    </Descriptions.Item>
                    <Descriptions.Item label="Total" className="font-bold">
                      {formatter.format(selectedLPB?.attributes?.total_purchasing)}
                    </Descriptions.Item>
                  </Descriptions>
                </>
              )}
            </Modal>

            <div className="w-full flex justify-between">
              <Search
                className=""
                loading={isSearching}
                onChange={(e) => onSearch(e)}
                placeholder="Cari Pembelian"
                style={{
                  width: 200,
                }}
              />
              <button
                onClick={handleAdd}
                type="button"
                className="bg-cyan-700 rounded px-5 py-2 hover:bg-cyan-800  shadow-sm flex float-right mb-5"
              >
                <div className="text-white text-center text-sm font-bold">
                  <a className="text-white no-underline text-xs sm:text-xs">+ Tambah</a>
                </div>
              </button>
            </div>

            <PurchasingTable
              data={purchase}
              onUpdate={handleUpdate}
              onDelete={handleCancel}
              onPageChange={handlePageChange}
              onChangeStatus={onChangeStatus}
            />
          </LayoutContent>
        </LayoutWrapper>
      </DashboardLayout>
    </>
  );
}

export default Pembelian;

import Head from "next/head";
import React, { useState, useEffect } from "react";
import LayoutContent from "@iso/components/utility/layoutContent";
import DashboardLayout from "@iso/containers/DashboardLayout/DashboardLayout";
import LayoutWrapper from "@iso/components/utility/layoutWrapper.js";
import router, { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { Button, Descriptions, Input, notification, Select, DatePicker, Modal } from "antd";
import TitlePage from "@iso/components/TitlePage/TitlePage";
import DebtTable from "@iso/components/ReactDataTable/Cost/DebtTable";
import Supplier from "@iso/components/Form/AddCost/SupplierForm";
import updateJurnal from "../utility/updateJurnal";
import nookies from "nookies";
import { PrinterOutlined } from "@ant-design/icons";
import tokenVerify from "../../../../authentication/tokenVerify";

Hutang.getInitialProps = async (context) => {
  const cookies = nookies.get(context);

  const req = await fetchData(cookies);
  const user = await req.json();

  const reqLocation = await fetchLocation(cookies);
  const locations = await reqLocation.json();

  const reqHutang = await fetchHutang(cookies);
  const hutang = await reqHutang.json();

  const reqAkunHutang = await fetchAkunHutang(cookies);
  const akunHutang = await reqAkunHutang.json();

  //if (req.status !== 200) {
  //    context.res.writeHead(302, {
  //        Location: "/signin?session=false",
  //        "Content-Type": "text/html; charset=utf-8",
  //    });
  //    context?.res?.end();

  //    return {};
  //}

  return {
    props: {
      user,
      locations,
      hutang,
      akunHutang,
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

const fetchHutang = async (cookies) => {
  const endpoint = process.env.NEXT_PUBLIC_URL + "/debts?populate=*";
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

const fetchAkunHutang = async (cookies) => {
  const endpoint = process.env.NEXT_PUBLIC_URL + "/debt-accounts?populate=*&filters[setting][$eq]=true";
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

function Hutang({ props }) {
  const user = props.user;
  const locations = props.locations.data;
  const data = props.hutang;
  const akunHutang = props.akunHutang;
  const router = useRouter();
  const [hutang, setHutang] = useState(data);
  const [supplier, setSupplier] = useState();
  const dispatch = useDispatch();
  const [searchParameters, setSearchParameters] = useState({});
  const cookies = nookies.get(null, "token");

  // Range Picker
  const { RangePicker } = DatePicker;
  const [rangePicker, setRangePicker] = useState();

  // Selected id
  const [selected, setSelected] = useState();
  const [openModal, setOpenModal] = useState(false);

  const handleSetting = () => {
    router.push("/dashboard/keuangan/hutang/setting");
  };

  const handleAdd = () => {
    router.push("/dashboard/keuangan/hutang/tambah");
  };

  const handleUpdate = (id) => {
    // router.push("/dashboard/pembelian/order_pembelian/edit/" + id);
    openNotificationWithIcon(
      "info",
      "Work In Progress",
      "Hai, Fitur ini sedang dikerjakan. Silahkan tunggu pembaruan selanjutnya"
    );
  };

  const handleEdit = (id) => {
    router.push("/dashboard/keuangan/hutang/edit/" + id);
  };

  const handleDelete = async (data) => {
    handleDeleteRelation(data);

    const endpoint = process.env.NEXT_PUBLIC_URL + "/debts/" + data.id;
    const cookies = nookies.get(null, "token");

    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookies.token,
      },
    };

    const req = await fetch(endpoint, options);
    const res = await req.json();
    if (res) {
      const res = await fetchData(cookies);
      openNotificationWithIcon(
        "success",
        "Berhasil menghapus data",
        "Hutang yang dipilih telah berhasil dihapus. Silahkan cek kembali hutang"
      );
      setHutang(res);
    }
  };

  const handleDeleteRelation = async (data) => {
    var id = 0;
    data.attributes.debt_details.data.forEach((element) => {
      id = element.id;

      const endpoint = process.env.NEXT_PUBLIC_URL + "/debt-details/" + id;
      const cookies = nookies.get(null, "token");

      const options = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + cookies.token,
        },
      };

      const req = fetch(endpoint, options);
      //const res = req.json();
      if (req) {
        console.log("relation deleted");
      }
    });
  };

  const onChangeStatus = async (status, row) => {
    //cek akun
    var cekAkunMaster = false;
    var data = row;

    var akunTunai = false;
    var akunTransfer = false;
    var akunGiro = false;
    akunHutang.data.forEach((item) => {
      if (item.attributes.setting == true) {
        if (row.attributes.bayar1 != 0 && item.attributes.type == "Tunai") {
          if (item.attributes.chart_of_account.data.attributes.saldo < row.attributes.bayar1) {
            notification["error"]({
              message: "Gagal menambahkan data",
              description: "Data gagal ditambahkan, saldo untuk akun tunai kurang untuk melakukan pembayaran.",
            });
            status = "Draft";
          }
        } else if (row.attributes.bayar2 != 0 && item.attributes.type == "Transfer") {
          if (item.attributes.chart_of_account.data.attributes.saldo < row.attributes.bayar2) {
            notification["error"]({
              message: "Gagal menambahkan data",
              description: "Data gagal ditambahkan, saldo untuk akun transfer kurang untuk melakukan pembayaran.",
            });
            status = "Draft";
          }
        } else if (row.attributes.bayar3 != 0 && item.attributes.type == "Giro") {
          if (item.attributes.chart_of_account.data.attributes.saldo < row.attributes.bayar3) {
            notification["error"]({
              message: "Gagal menambahkan data",
              description: "Data gagal ditambahkan, saldo untuk akun giro kurang untuk melakukan pembayaran.",
            });
            status = "Draft";
          }
        } else if (cekAkunMaster === false && item.attributes.type == "Master") {
          if (item.attributes.chart_of_account.data.attributes.saldo < data.attributes.total_pembayaran) {
            notification["error"]({
              message: "Gagal menambahkan data",
              description: "Data gagal ditambahkan, saldo untuk akun master kurang untuk melakukan pembayaran.",
            });
            status = "Draft";
          } else cekAkunMaster = true;
        }
      } else {
        if (row.attributes.tunai != 0 && akunTunai != true) {
          notification["error"]({
            message: "Gagal menambahkan data",
            description: "Data gagal ditambahkan, silahkan pilih akun tunai untuk diaktifkan.",
          });
          status = "Draft";
        } else if (row.attributes.transfer != 0 && akunTransfer != true) {
          notification["error"]({
            message: "Gagal menambahkan data",
            description: "Data gagal ditambahkan, silahkan pilih akun transfer untuk diaktifkan.",
          });
          status = "Draft";
        } else if (row.attributes.giro != 0 && akunGiro != true) {
          notification["error"]({
            message: "Gagal menambahkan data",
            description: "Data gagal ditambahkan, silahkan pilih akun giro untuk diaktifkan.",
          });
          status = "Draft";
        } else if (cekAkunMaster != true) {
          notification["error"]({
            message: "Gagal menambahkan data",
            description: "Data gagal ditambahkan, silahkan pilih akun master untuk diaktifkan.",
          });
          status = "Draft";
        }
      }
    });

    //Post for publish
    if (status == "Publish") {
      const dataHutang = await changeStatusHutang(status, row.id);

      if (dataHutang.attributes.document == "Publish") {
        dataHutang.attributes.debt_details.data.forEach((item) => {
          const sisa_hutang = item.attributes.sisa_hutang;

          if (sisa_hutang == 0) editPenjualanDB("Lunas", item.attributes.purchasing.data.id);
          else editPenjualanDB("Dibayar Sebagian", item.attributes.purchasing.data.id);
        });
      } else console.log("Not update lpb, karena draft");

      // untuk memotong ke akun coa
      console.log("data", row, akunHutang, dataHutang);
      var akunMaster = false;
      akunHutang.data.forEach((item) => {
        if (item.attributes.setting == true) {
          if (row.attributes.bayar1 != 0 && item.attributes.type == "Tunai") {
            putAkun(item.attributes.chart_of_account.data, row.attributes.bayar1, dataHutang.attributes.no_hutang);
          } else if (row.attributes.bayar2 != 0 && item.attributes.type == "Transfer") {
            putAkun(item.attributes.chart_of_account.data, row.attributes.bayar2, dataHutang.attributes.no_hutang);
          } else if (row.attributes.bayar3 != 0 && item.attributes.type == "Giro") {
            putAkun(item.attributes.chart_of_account.data, row.attributes.bayar3, dataHutang.attributes.no_hutang);
          } else if (akunMaster === false && item.attributes.type == "Master") {
            putAkun(
              item.attributes.chart_of_account.data,
              row.attributes.total_pembayaran,
              dataHutang.attributes.no_hutang,
              "Master"
            );

            akunMaster = true;
          }
        }
      });
      //await putAkun(dataHutang.attributes.chart_of_account.data, dataHutang.attributes.total_pembayaran);
    } else console.log("Not update all, karena draft");
  };

  const putAkun = async (akun, pembayaran, noHutang, tipe) => {
    try {
      const endpoint = process.env.NEXT_PUBLIC_URL + "/chart-of-accounts/" + akun.id;
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + cookies.token,
        },
        //body: JSONdata,
      };

      const req = await fetch(endpoint, options);
      const res = await req.json();

      if (req.status === 200) {
        if (tipe === "Master") updateJurnal(res.data, "hutang", noHutang, null, pembayaran, user, tipe);
        else updateJurnal(res.data, "hutang", noHutang, null, pembayaran, user);
      } else {
        console.log("akun error atau tidak ada");
      }
    } catch (error) {
      console.log("errorr", error);
    }
  };

  const editPenjualanDB = async (value, id) => {
    try {
      const data = {
        data: {
          status_pembayaran: value,
        },
      };

      const JSONdata = JSON.stringify(data);
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
      console.log("res", res);
      if (req.status === 200) {
        console.log("status di penjualan sukses diupdate");
      } else {
        console.log("status di penjualan error atau tidak ada");
      }
    } catch (error) {
      console.log("errorr", error);
    }
  };

  const changeStatusHutang = async (status, id) => {
    try {
      const newValues = {
        data: {
          document: status,
          status: "Dibayar",
        },
      };

      const JSONdata = JSON.stringify(newValues);
      const cookies = nookies.get(null, "token");
      const endpoint = process.env.NEXT_PUBLIC_URL + "/debts/" + id + "?populate=deep";

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

        if (res.data.attributes.document === "Draft") {
          router.reload();
        } else {
          setHutang(response);
          return res.data;
        }

        openNotificationWithIcon(
          "success",
          "Status hutang berhasil dirubah",
          "Status hutang berhasil dirubah. Silahkan cek hutang"
        );
      } else {
        console.log("error", res);
        openNotificationWithIcon(
          "error",
          "Status hutang gagal dirubah",
          "Tedapat kesalahan yang menyebabkan status tidak dapat dirubah"
        );
      }
    } catch (error) {
      console.log("error", error);
      openNotificationWithIcon(
        "error",
        "Status hutang gagal dirubah",
        "Tedapat kesalahan yang menyebabkan status tidak dapat dirubah"
      );
    }
  };

  const openNotificationWithIcon = (type, title, message) => {
    notification[type]({
      message: title,
      description: message,
    });
  };

  const fetchData = async (cookies) => {
    const endpoint = process.env.NEXT_PUBLIC_URL + "/debts?populate=*";
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

  const logOut = () => {
    dispatch(logout());
  };

  useEffect(() => {
    const searchQuery = async () => {
      let query = "";
      let startDate = "";
      let endDate = "";

      for (const key in searchParameters) {
        if (key === "supplier" && searchParameters[key] !== null) {
          query += `filters[${key}\][id]=${searchParameters[key].id}&`;
        } else {
          query += "";
        }

        if (key === "no_hutang" || key === "status_pembayaran") {
          if (searchParameters[key] !== undefined) {
            query += `filters[${key}]=${searchParameters[key]}&`;
          } else {
            query += "";
          }
        } else {
          query += "";
        }

        if (key == "range" && searchParameters[key] !== null) {
          startDate = searchParameters?.range[0]?.format("YYYY-MM-DD");
          endDate = searchParameters?.range[1]?.format("YYYY-MM-DD");

          query += `filters[tanggal_pembayaran][$gte]=${startDate}&filters[tanggal_pembayaran][$lte]=${endDate}`;
        } else {
          query += "";
        }
      }

      const endpoint = process.env.NEXT_PUBLIC_URL + "/debts?populate=*&" + query;

      const cookies = nookies.get(null, "token");
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + cookies.token,
        },
      };

      const req = await fetch(endpoint, options);
      const res = await req.json();

      setHutang(res);
      console.log("endpoint", endpoint, res);
    };

    searchQuery();
  }, [searchParameters]);

  // search query
  useEffect(() => {
    async function getById(id) {
      const endpoint = process.env.NEXT_PUBLIC_URL + `/debts/${id}?populate=*`;
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + cookies.token,
        },
      };
      const req = await fetch(endpoint, options);
      const res = await req.json();

      setSelected(res?.data);
    }

    if (router?.query?.id) {
      const id = router.query.id;
      getById(id);
    }
  }, [router.query]);

  useEffect(() => {
    if (selected) {
      setOpenModal(true);
    }
  }, [selected]);

  function formatMyDate(value, locale = "id-ID") {
    return new Date(value).toLocaleDateString(locale);
  }

  var formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });

  const print = () => {
    router.replace(
      {
        pathname: "/dashboard/keuangan/hutang",
      },
      undefined,
      { shallow: true }
    );
    router.push("/dashboard/keuangan/hutang/print/" + selected.id);
  };

  return (
    <>
      <Head>
        <title>Pembayaran Pembelian</title>
      </Head>
      <DashboardLayout>
        <LayoutWrapper style={{}}>
          <TitlePage titleText={"Daftar Pembayaran Pembelian"} />
          <LayoutContent>
            <Modal
              open={openModal}
              onClose={() => {
                router.replace(
                  {
                    pathname: "/dashboard/keuangan/hutang",
                  },
                  undefined,
                  { shallow: true }
                );
                setOpenModal(false);
                setSelected();
              }}
              onCancel={() => {
                router.replace(
                  {
                    pathname: "/dashboard/keuangan/hutang",
                  },
                  undefined,
                  { shallow: true }
                );
                setOpenModal(false);
                setSelected();
              }}
              width={1000}
              okButtonProps={{ style: { display: "none" } }}
              cancelText="Close"
            >
              {selected && (
                <>
                  <Descriptions
                    extra={
                      <Button onClick={print} className="bg-cyan-700 hover:bg-cyan-800 mr-7 border-none" type="primary">
                        <PrinterOutlined className="mr-2 mt-0.5 float float-left" /> Cetak
                      </Button>
                    }
                    size="middle"
                    title="INFORMASI HUTANG"
                    bordered
                  >
                    <Descriptions.Item label="Tanggal Pembayaran" span={4}>
                      {formatMyDate(selected?.attributes?.tanggal_pembayaran)}
                    </Descriptions.Item>
                    <Descriptions.Item label="No Hutang" span={2}>
                      {selected?.attributes?.no_hutang}
                    </Descriptions.Item>
                    <Descriptions.Item label="Supplier">
                      {selected?.attributes?.supplier?.data?.attributes?.name}
                    </Descriptions.Item>
                  </Descriptions>

                  <Descriptions className="my-3" size="middle" title="PEMBAYARAN" bordered>
                    <Descriptions.Item label="Total Pembayaran" className="font-bold" span={2}>
                      {formatter.format(selected?.attributes?.total_pembayaran)}
                    </Descriptions.Item>
                    <Descriptions.Item label="Sisa Hutang" className="font-bold" span={2}>
                      {formatter.format(selected?.attributes?.sisa_hutang_jatuh_tempo)}
                    </Descriptions.Item>
                    <Descriptions.Item label="Tunai" span={4}>
                      {formatter.format(selected?.attributes?.bayar1)}
                    </Descriptions.Item>
                    <Descriptions.Item label="Transfer" span={4}>
                      {formatter.format(selected?.attributes?.bayar2)}
                    </Descriptions.Item>
                    <Descriptions.Item label="Giro" span={4}>
                      {formatter.format(selected?.attributes?.bayar3)}
                    </Descriptions.Item>
                  </Descriptions>
                </>
              )}
            </Modal>

            <div className="w-full flex justify-start">
              <div className="w-full md:w-1/4 px-3 mb-2 md:mb-0">
                <Supplier onChangeSupplier={(e) => setSearchParameters({ ...searchParameters, supplier: e })} />
              </div>
              <div className="w-full md:w-1/4 px-3">
                <Select
                  placeholder="No Pembayaran"
                  size="large"
                  style={{
                    width: "100%",
                    marginRight: "10px",
                  }}
                  allowClear
                  onChange={(e) => setSearchParameters({ ...searchParameters, no_hutang: e })}
                >
                  {data.data?.map((element) => {
                    return (
                      <Select.Option value={element.attributes.no_hutang} key={element.id}>
                        {element.attributes.no_hutang}
                      </Select.Option>
                    );
                  })}
                </Select>
              </div>
              <div className="w-full md:w-1/4 px-3">
                <Select
                  placeholder="Status Pembayaran"
                  size="large"
                  style={{
                    width: "100%",
                    marginRight: "10px",
                  }}
                  allowClear
                  onChange={(e) => setSearchParameters({ ...searchParameters, status_pembayaran: e })}
                  //onChange={value => onSearch(value, "pembayaran")}
                >
                  <Select.Option value="Dibayar">Dibayar</Select.Option>
                  <Select.Option value="Belum Dibayar">Belum Dibayar</Select.Option>
                </Select>
              </div>
              <div className="w-full md:w-1/4 px-3">
                <RangePicker size="large" onChange={(e) => setSearchParameters({ ...searchParameters, range: e })} />
              </div>
            </div>

            <div className="w-full flex justify-between mt-0 mb-2">
              <span className="text-black text-md font-bold ml-1 mt-5">Semua Penjualan</span>
              <div className="float-right">
                <button
                  onClick={handleSetting}
                  type="button"
                  className="bg-cyan-700 rounded px-5 py-2 hover:bg-cyan-800  shadow-sm mb-5 mx-2"
                >
                  <div className="text-white text-center text-sm font-bold">
                    <a className="text-white no-underline text-xs sm:text-xs">Setting</a>
                  </div>
                </button>
                <button
                  onClick={handleAdd}
                  type="button"
                  className="bg-cyan-700 rounded px-5 py-2 hover:bg-cyan-800  shadow-sm mb-5 mx-2"
                >
                  <div className="text-white text-center text-sm font-bold">
                    <a className="text-white no-underline text-xs sm:text-xs">+ Tambah</a>
                  </div>
                </button>
              </div>
            </div>

            <div className="w-full flex justify-between">
              <button
                onClick={handleUpdate}
                type="button"
                className="w-full md:w-1/4 mx-3 bg-cyan-700 rounded px-20 py-2 hover:bg-cyan-800  shadow-sm float-right mb-5"
              >
                <div className="text-white text-center text-sm font-bold">
                  <a className="text-white no-underline text-xs sm:text-xs">Print PDF</a>
                </div>
              </button>
              <button
                onClick={handleUpdate}
                type="button"
                className="w-full md:w-1/4 mx-3 bg-cyan-700 rounded px-20 py-2 hover:bg-cyan-800  shadow-sm float-right mb-5"
              >
                <div className="text-white text-center text-sm font-bold">
                  <a className="text-white no-underline text-xs sm:text-xs">Print CSV</a>
                </div>
              </button>
              <button
                onClick={handleUpdate}
                type="button"
                className="w-full md:w-1/4 mx-3 bg-cyan-700 rounded px-20 py-2 hover:bg-cyan-800  shadow-sm float-right mb-5"
              >
                <div className="text-white text-center text-sm font-bold">
                  <a className="text-white no-underline text-xs sm:text-xs">Print XLS</a>
                </div>
              </button>
              <button
                onClick={handleUpdate}
                type="button"
                className="w-full md:w-1/4 mx-3 bg-cyan-700 rounded px-20 py-2 hover:bg-cyan-800  shadow-sm float-right mb-5"
              >
                <div className="text-white text-center text-sm font-bold">
                  <a className="text-white no-underline text-xs sm:text-xs">Kolom Tampak</a>
                </div>
              </button>
            </div>

            <DebtTable
              data={hutang}
              onUpdate={handleEdit}
              onDelete={handleDelete}
              //onPageChange={handlePageChange}
              onChangeStatus={onChangeStatus}
              user={user}
            />

            <tokenVerify logOut={logOut} />
          </LayoutContent>
        </LayoutWrapper>
      </DashboardLayout>
    </>
  );
}

export default Hutang;

import Head from "next/head";
import React, { useState, useEffect } from "react";
import LayoutContent from "@iso/components/utility/layoutContent";
import DashboardLayout from "@iso/containers/DashboardLayout/DashboardLayout";
import LayoutWrapper from "@iso/components/utility/layoutWrapper.js";
import router, { useRouter } from "next/router";
import { Input, notification, Select, DatePicker, Modal, Button, Descriptions } from "antd";
import TitlePage from "@iso/components/TitlePage/TitlePage";
import CreditTable from "@iso/components/ReactDataTable/Cost/CreditTable";
import Supplier from "@iso/components/Form/AddCost/SupplierForm";
import Customer from "@iso/components/Form/AddCost/CustomerForm";
import Area from "@iso/components/Form/AddCost/AreaForm";
import Wilayah from "@iso/components/Form/AddCost/WilayahForm";
import nookies from "nookies";
import { PrinterOutlined } from "@ant-design/icons";

Piutang.getInitialProps = async (context) => {
  const cookies = nookies.get(context);

  const req = await fetchData(cookies);
  const user = await req.json();

  const reqDataUserSales = await fetchUserSales(cookies);
  const dataUserSales = await reqDataUserSales.json();

  const reqLocation = await fetchLocation(cookies);
  const locations = await reqLocation.json();

  const reqPiutang = await fetchPiutang(cookies);
  const piutang = await reqPiutang.json();

  const reqAkunPiutang = await fetchAkunPiutang(cookies);
  const akunPiutang = await reqAkunPiutang.json();

  return {
    props: {
      user,
      dataUserSales,
      locations,
      piutang,
      akunPiutang
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

const fetchUserSales = async (cookies) => {
  const endpoint =
    process.env.NEXT_PUBLIC_URL +
    "/users?populate=*&filters[role][name][$eq]=Sales&?filters[role][type][$eq]=Sales";
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

const fetchPiutang = async (cookies) => {
  const endpoint = process.env.NEXT_PUBLIC_URL + "/credits?populate=*";
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

const fetchAkunPiutang = async (cookies) => {
  const endpoint = process.env.NEXT_PUBLIC_URL + "/credit-accounts?populate=*&filters[setting][$eq]=true";
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

function Piutang({ props }) {
  const user = props.user;
  const locations = props.locations.data;
  const data = props.piutang;
  const dataUserSales = props.dataUserSales;
  const akunPiutang = props.akunPiutang;
  const router = useRouter();
  const [piutang, setPiutang] = useState(data); console.log("Piutang", piutang.data);
  const [supplier, setSupplier] = useState();
  const [searchParameters, setSearchParameters] = useState({});
  const cookies = nookies.get(null, "token");

  // Selected id
  const [selected, setSelected] = useState();
  const [openModal, setOpenModal] = useState(false);

  // Range Picker
  const { RangePicker } = DatePicker;

  const handleSetting = () => {
    router.push("/dashboard/keuangan/piutang/setting");
  };

  const handleAdd = () => {
    router.push("/dashboard/keuangan/piutang/tambah");
  };

  const handleUpdate = (id) => {
    router.push("/dashboard/keuangan/piutang/edit/" + id);
    // openNotificationWithIcon(
    //   "info",
    //   "Work In Progress",
    //   "Hai, Fitur ini sedang dikerjakan. Silahkan tunggu pembaruan selanjutnya"
    // );
  };

  const handleDelete = async (data) => {
    handleDeleteRelation(data);

    const endpoint = process.env.NEXT_PUBLIC_URL + "/credits/" + data.id;
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
        "Piutang yang dipilih telah berhasil dihapus. Silahkan cek kembali piutang"
      );
      setPiutang(res);
    }
  };

  const handleDeleteRelation = async (data) => {
    var id = 0;
    data.attributes.credit_details.data.forEach((element) => {
      id = element.id;

      const endpoint = process.env.NEXT_PUBLIC_URL + "/credit-details/" + id;
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

  const fetchDataCredit = async (cookies) => {
    const endpoint = process.env.NEXT_PUBLIC_URL + "/credits?populate=*";
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

  const onChangeStatus = async (status, row) => {
        
    if(status == "Publish"){
        const dataPiutang = await changeStatusPiutang(status, row.id);

        if(dataPiutang.attributes.document == "Publish"){
            dataPiutang.attributes.credit_details.data.forEach((item) => {
              const sisa_piutang = item.attributes.sisa_piutang;
    
              // if (sisa_piutang == 0) editPenjualanDB("Lunas", item.attributes.purchasing.data.id);
              // else editPenjualanDB("Dibayar Sebagian", item.attributes.purchasing.data.id);

              const saleTypes = ["non_panel_sale", "panel_sale", "sales_sale"];
              for (const saleType of saleTypes) {
                const sale = item.attributes[saleType].data;
                if (sale != null) {
                  let url = `/${saleType}s/${sale.id}`;
                  url = url.replaceAll("_", "-");
                  const data = sale;
                  console.log("link url", url);
                  const pembayaran =
                    item.attributes.giro +
                    item.attributes.transfer +
                    item.attributes.tunai;
                  const total =
                    pembayaran +
                    item.attributes.total_retur +
                    item.attributes.sisa_piutang;
                  const floatTotal = parseFloat(total.toFixed(2));
                  const floatDataTotal = parseFloat(data.attributes.total.toFixed(2));

                  if (
                    floatTotal == floatDataTotal &&
                    item.attributes.sisa_piutang == 0
                  ) {
                    data.attributes.status = "Dibayar";
                  } else if (
                    floatTotal == floatDataTotal &&
                    item.attributes.sisa_piutang > 0
                  ) {
                    data.attributes.status = "Dibayar Sebagian";
                  } else {
                    console.log("error update status pembayaran di penjualan");
                  }

                  data.attributes[`${saleType}_details`] = data.attributes[
                    `${saleType}_details`
                  ].data.map((detail) => detail.id);
                  data.attributes[`retur_${saleType}s`] = data.attributes[
                    `retur_${saleType}s`
                  ].data.map((retur) => retur.id);

                  data.attributes.area = data.attributes.area.data.id;
                  data.attributes.customer = data.attributes.customer.data.id;
                  data.attributes.location = data.attributes.location.data.id;
                  data.attributes.wilayah = data.attributes.wilayah.data.id;

                  //if (data && url) editPenjualanDB(data.attributes, url);
                  if (data && url){
                    //editPenjualanDB(data.attributes, url);
                    if (sisa_piutang == 0) editPenjualanDB(data.attributes.status, url);
                    else editPenjualanDB(data.attributes.status, url);
                  }
                }
              }
              
            });
        } else console.log("Not update lpb, karena draft");

        // untuk memotong ke akun coa
        console.log("data", row, akunPiutang);
        var akunTunai = false;
        var akunTransfer = false;
        var akunGiro = false;

        dataPiutang.attributes.credit_details.data.forEach((row) => {
          akunPiutang.data.forEach((item) => {
            if(item.attributes.setting == true){
              if(row.attributes.tunai > 0 && item.attributes.type == "Tunai"){
                
                putAkun(item.attributes.chart_of_account.data, row.attributes.tunai);
    
                akunTunai = true;
              } else if(row.attributes.transfer > 0 && item.attributes.type == "Transfer"){
                
                putAkun(item.attributes.chart_of_account.data, row.attributes.transfer);
    
                akunTransfer = true;;
              } else if(row.attributes.giro > 0 && item.attributes.type == "Giro"){

                putAkun(item.attributes.chart_of_account.data, row.attributes.giro);
    
                akunGiro = true;;
              }
            }
          });
          
          if(row.attributes.tunai != 0 && akunTunai != true){
              notification["error"]({
                message: "Gagal menambahkan data",
                description: "Data gagal ditambahkan, silahkan pilih akun tunai untuk diaktifkan.",
              });
              
          } else if(row.attributes.transfer != 0 && akunTunai != true){
              notification["error"]({
                message: "Gagal menambahkan data",
                description: "Data gagal ditambahkan, silahkan pilih akun transfer untuk diaktifkan.",
              });
              
          } else if(row.attributes.giro  != 0 && akunTunai != true){
              notification["error"]({
                message: "Gagal menambahkan data",
                description: "Data gagal ditambahkan, silahkan pilih akun giro untuk diaktifkan.",
              });    
          }

          akunTunai = false;
          akunTransfer = false;
          akunGiro = false;
        });


    } else console.log("Not update all, karena draft");
};

const putAkun = async (akun, pembayaran) => { console.log("put akun", akun, pembayaran);
  try {
    var saldo = parseFloat((akun.attributes.saldo ?? 0) + pembayaran);

      const data = {
        data: {
          saldo: saldo,
        },
      };
  
      const JSONdata = JSON.stringify(data);
      const endpoint = process.env.NEXT_PUBLIC_URL + "/chart-of-accounts/" + akun.id;
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
          console.log("akun sukses diupdate");
      } else {
          console.log("akun error atau tidak ada");
      }
    } catch (error) {
       console.log("errorr", error);
    }
};

const editPenjualanDB = async (value, url) => {
    try {
      const data = {
        data: {
          status: value,
        },
      };

      const JSONdata = JSON.stringify(data);
      const endpoint = process.env.NEXT_PUBLIC_URL + url;
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
        console.log("status di pembelian sukses diupdate");
      } else {
        console.log("status di pembelian error atau tidak ada");
      }
    } catch (error) {
      console.log("errorr", error);
    }
};

const changeStatusPiutang = async (status, id) => {
    try {
      const newValues = {
        data: {
            document: status,
        },
      };

      const JSONdata = JSON.stringify(newValues);
      const cookies = nookies.get(null, "token");
      const endpoint = process.env.NEXT_PUBLIC_URL + "/credits/" + id + "?populate=deep";

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
        const response = await fetchDataCredit(cookies);

        if (res.data.attributes.document === "Draft") {
          router.reload();
        } else {
          setPiutang(response);
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

  useEffect(() => {
    const searchQuery = async () => {
      let query = "";
      let startDate = "";
      let endDate = "";

      for (const key in searchParameters) {
        if (key === "customer" && searchParameters[key] !== null) {
          query += `filters[credit_details][customer][id]=${searchParameters[key].id}&`;
        } else {
          query += "";
        }

        if (key === "status_pembayaran") {
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

          query += `filters[tanggal][$gte]=${startDate}&filters[tanggal][$lte]=${endDate}`;
        } else {
          query += "";
        }

        if (key === "sales" && searchParameters[key] !== undefined) {
          query += `filters[credit_details][customer][sales_name]=${searchParameters[key]}&`;
        } else {
          query += "";
        }

        if (key === "area" || key === "wilayah") {
          if (searchParameters[key] !== null) {
            query += `filters[credit_details][customer][${key}][id]=${searchParameters[key].id}&`;
          } else {
            query += "";
          }
        } else {
          query += "";
        }
      }

      const endpoint = process.env.NEXT_PUBLIC_URL + "/credits?populate=*, credit_details.customer.area, credit_details.customer.wilayah&" + query;

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

      setPiutang(res);
      //console.log("endpoint", endpoint, res);
    };

    searchQuery();
  }, [searchParameters]);

  // search query
  useEffect(() => {
    async function getById(id) {
    const endpoint = process.env.NEXT_PUBLIC_URL + `/credits/${id}?populate=*`;
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
      pathname: "/dashboard/keuangan/piutang",
  },
  undefined,
  { shallow: true }
  );
  router.push("/dashboard/keuangan/piutang/print/" + selected.id);
};

  return (
    <>
      <Head>
        <title>Daftar Penagihan Piutang Penjualan</title>
      </Head>
      <DashboardLayout>
        <LayoutWrapper style={{}}>
          <TitlePage titleText={"Daftar Penagihan Piutang Penjualan"} />
          <LayoutContent>
          <Modal
            open={openModal}
            onClose={() => {
                router.replace(
                {
                    pathname: "/dashboard/keuangan/piutang",
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
                    pathname: "/dashboard/keuangan/piutang",
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
                    <Button
                        onClick={print}
                        className="bg-cyan-700 hover:bg-cyan-800 mr-7 border-none"
                        type="primary"
                    >
                        <PrinterOutlined className="mr-2 mt-0.5 float float-left" /> Cetak
                    </Button>
                    }
                    size="middle"
                    title="INFORMASI PIUTANG"
                    bordered
                >
                    <Descriptions.Item label="Tanggal Pembayaran" span={2}>
                    {formatMyDate(selected?.attributes?.tanggal ?? selected?.attributes?.updatedAt)}
                    {console.log(selected,"selected")}
                    </Descriptions.Item>
                    <Descriptions.Item label="No Piutang" span={2}>
                    {selected?.attributes?.no_piutang}
                    </Descriptions.Item>
                </Descriptions>

                <Descriptions className="my-3" size="middle" title="PEMBAYARAN" bordered>
                    <Descriptions.Item label="Total Pembayaran" className="font-bold" span={2}>
                    {formatter.format(selected?.attributes?.total_pembayaran)}
                    </Descriptions.Item>
                    <Descriptions.Item label="Sisa Piutang" className="font-bold" span={2}>
                    {formatter.format(selected?.attributes?.sisa_piutang_jatuh_tempo)}
                    </Descriptions.Item>
                    <Descriptions.Item label="Tunai" span={4}>
                    {formatter.format(
                      selected?.attributes?.credit_details?.data.reduce((accumulator, item) => {
                        return accumulator + item.attributes.tunai;
                      }, 0)
                    )}
                    </Descriptions.Item>
                    <Descriptions.Item label="Transfer" span={4}>
                    {formatter.format(
                      selected?.attributes?.credit_details?.data.reduce((accumulator, item) => {
                        return accumulator + item.attributes.transfer;
                      }, 0)
                    )}
                    </Descriptions.Item>
                    <Descriptions.Item label="Giro" span={4}>
                    {formatter.format(
                      selected?.attributes?.credit_details?.data.reduce((accumulator, item) => {
                        return accumulator + item.attributes.giro;
                      }, 0)
                    )}
                    </Descriptions.Item>
                </Descriptions>
                </>
            )}
            </Modal>

            <div className="w-full flex justify-start">
              <div className="w-full md:w-1/4 px-3 mb-2 md:mb-0">
                <Customer
                  onChangeCustomer={(e) =>
                    setSearchParameters({ ...searchParameters, customer: e })
                  }
                />
              </div>
              <div className="w-full md:w-1/4 px-3">
                <Select
                  placeholder="Status Penagihan"
                  size="large"
                  style={{
                    width: "100%",
                    marginRight: "10px",
                  }}
                  allowClear
                  onChange={(e) =>
                    setSearchParameters({
                      ...searchParameters,
                      status_pembayaran: e,
                    })
                  }
                >
                  <Select.Option value="Dibayar">Dibayar</Select.Option>
                  <Select.Option value="Belum Dibayar">
                    Belum Dibayar
                  </Select.Option>
                </Select>
              </div>
              <div className="w-full md:w-1/4 px-3">
                <RangePicker
                  size="large"
                  onChange={(e) =>
                    setSearchParameters({ ...searchParameters, range: e })
                  }
                />
              </div>
              <div className="w-full md:w-1/4 mt-0 mb-2">
                <div className="float-right">
                  <button
                    onClick={handleAdd}
                    type="button"
                    className="bg-cyan-700 rounded px-5 py-2 hover:bg-cyan-800  shadow-sm mb-5 mx-2"
                  >
                    <div className="text-white text-center text-sm font-bold">
                      <a className="text-white no-underline text-xs sm:text-xs">
                        + Tambah
                      </a>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            <div className="w-full flex justify-start -mt-6">
              <div className="w-full md:w-1/4 px-3">
                <Select
                  size="large"
                  style={{
                    width: "100%",
                  }}
                  placeholder="Sales"
                  allowClear
                  onChange={(e) =>
                    setSearchParameters({ ...searchParameters, sales: e })
                  }
                >
                  {dataUserSales?.map((element) => {
                    return (
                      <Select.Option value={element.name} key={element.id}>
                        {element.name}
                      </Select.Option>
                    );
                  })}
                </Select>
              </div>
              <div className="w-full md:w-1/4 px-3">
                <Area
                  onChangeArea={(e) =>
                    setSearchParameters({ ...searchParameters, area: e })
                  }
                />
              </div>
              <div className="w-full md:w-1/4 px-3">
                <Wilayah
                  onChangeWilayah={(e) =>
                    setSearchParameters({ ...searchParameters, wilayah: e })
                  }
                />
              </div>
              <div className="w-full md:w-1/4 mt-0 mb-2">
                <div className="float-right">
                  <button
                    onClick={handleSetting}
                    type="button"
                    className="bg-cyan-700 rounded px-5 py-2 hover:bg-cyan-800  shadow-sm mx-2"
                  >
                    <div className="text-white text-center text-sm font-bold">
                      <a className="text-white no-underline text-xs sm:text-xs">
                        Setting
                      </a>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            <div className="w-full flex justify-start -mt-6">
              <span className="text-black text-md font-bold ml-1 mt-5">
                Semua Penagihan
              </span>
            </div>

            <div className="w-full flex justify-between">
              <button
                onClick={handleUpdate}
                type="button"
                className="w-full md:w-1/4 mx-3 bg-cyan-700 rounded px-20 py-2 hover:bg-cyan-800  shadow-sm float-right mb-5"
              >
                <div className="text-white text-center text-sm font-bold">
                  <a className="text-white no-underline text-xs sm:text-xs">
                    Print PDF
                  </a>
                </div>
              </button>
              <button
                onClick={handleUpdate}
                type="button"
                className="w-full md:w-1/4 mx-3 bg-cyan-700 rounded px-20 py-2 hover:bg-cyan-800  shadow-sm float-right mb-5"
              >
                <div className="text-white text-center text-sm font-bold">
                  <a className="text-white no-underline text-xs sm:text-xs">
                    Print CSV
                  </a>
                </div>
              </button>
              <button
                onClick={handleUpdate}
                type="button"
                className="w-full md:w-1/4 mx-3 bg-cyan-700 rounded px-20 py-2 hover:bg-cyan-800  shadow-sm float-right mb-5"
              >
                <div className="text-white text-center text-sm font-bold">
                  <a className="text-white no-underline text-xs sm:text-xs">
                    Print XLS
                  </a>
                </div>
              </button>
              <button
                onClick={handleUpdate}
                type="button"
                className="w-full md:w-1/4 mx-3 bg-cyan-700 rounded px-20 py-2 hover:bg-cyan-800  shadow-sm float-right mb-5"
              >
                <div className="text-white text-center text-sm font-bold">
                  <a className="text-white no-underline text-xs sm:text-xs">
                    Kolom Tampak
                  </a>
                </div>
              </button>
            </div>

            <CreditTable
              data={piutang}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
              //onPageChange={handlePageChange}
              onChangeStatus={onChangeStatus}
              //user={user}
            />
          </LayoutContent>
        </LayoutWrapper>
      </DashboardLayout>
    </>
  );
}

export default Piutang;

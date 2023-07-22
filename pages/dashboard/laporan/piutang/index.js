import Head from "next/head";
import React, { useState, useEffect } from "react";
import LayoutContent from "@iso/components/utility/layoutContent";
import DashboardLayout from "@iso/containers/DashboardLayout/DashboardLayout";
import LayoutWrapper from "@iso/components/utility/layoutWrapper.js";
import router, { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { Input, notification, Select, DatePicker } from "antd";
import TitlePage from "@iso/components/TitlePage/TitlePage";
import Table from "@iso/components/ReactDataTable/Report/CreditTable";
import SearchCustomer from "@iso/components/Form/AddReport/SearchCustomer";
import SearchArea from "@iso/components/Form/AddReport/SearchArea";
import SearchSales from "@iso/components/Form/AddReport/SearchSales";
import SearchWilayah from "@iso/components/Form/AddReport/SearchWilayah";
import nookies from "nookies";
import tokenVerify from "../../../../authentication/tokenVerify";
import { prop } from "styled-tools";
import moment from "moment";

Laporan.getInitialProps = async (context) => {
  const cookies = nookies.get(context);

  const req = await fetchData(cookies);
  const user = await req.json();

  const reqDataUser = await fetchUser(cookies);
  const dataUser = await reqDataUser.json();

  const reqCredit = await fetchCredit(cookies);
  const credit = await reqCredit.json();

  const reqCustomer = await fetchCustomer(cookies);
  const customer = await reqCustomer.json();

  return {
    props: {
      user,
      dataUser,
      credit,
      customer
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

const fetchUser = async (cookies) => {
  const endpoint = process.env.NEXT_PUBLIC_URL + "/users?populate=*";
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

const fetchCredit = async (cookies) => {
  const endpoint = process.env.NEXT_PUBLIC_URL + 
  "/credits?populate[0]=supplier&populate[1]=credit_details.sales_sale&populate[2]=credit_details.customer&"+
  "populate[3]=credit_details.panel_sale.retur_panel_sales&"+
  "populate[4]=credit_details.non_panel_sale.retur_non_panel_sales";
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

const fetchCustomer = async (cookies) => {
  const endpoint = process.env.NEXT_PUBLIC_URL + "/customers?populate=*";
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

function Laporan({ props }) {
  const user = props.user;
  const dataUser = props?.dataUser;
  //const credit = props?.credit;
  const [data, setData] = useState(props?.credit);
  const [customer, setCustomer] = useState(props.customer.data); console.log("customer", customer, data);
  const router = useRouter();
  const [supplier, setSupplier] = useState();
  const [searchParameters, setSearchParameters] = useState({}); console.log("searchParameters", searchParameters);
  const dispatch = useDispatch();

  // Range Picker
  const { RangePicker } = DatePicker;

  const handlePrint = () => {
    //router.push("/dashboard/laporan/pembayaranhutang/print");
  };

  // const handleAdd = () => {
  //   router.push("/dashboard/keuangan/jurnal/tambah");
  // };

  const handleUpdate = (id) => {
    // router.push("/dashboard/pembelian/order_pembelian/edit/" + id);
    openNotificationWithIcon(
      "info",
      "Work In Progress",
      "Hai, Fitur ini sedang dikerjakan. Silahkan tunggu pembaruan selanjutnya"
    );
  };

  // const handleDelete = async (data) => {

  //   const endpoint = process.env.NEXT_PUBLIC_URL + "/jurnals/" + data.id;
  //   const cookies = nookies.get(null, "token");

  //   const options = {
  //     method: "DELETE",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer " + cookies.token,
  //     },
  //   };

  //   const req = await fetch(endpoint, options);
  //   const res = await req.json();
  //   if (res) {
  //     const res = await fetchData(cookies);
  //     openNotificationWithIcon(
  //       "success",
  //       "Berhasil menghapus data",
  //       "Jurnal yang dipilih telah berhasil dihapus. Silahkan cek kembali jurnal"
  //     );
  //     setJurnal(res);
  //   }
  // };

  // const openNotificationWithIcon = (type, title, message) => {
  //   notification[type]({
  //     message: title,
  //     description: message,
  //   });
  // };

  // const fetchData = async (cookies) => {
  //   const endpoint = process.env.NEXT_PUBLIC_URL + "/jurnals?populate=deep";
  //   const options = {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer " + cookies.token,
  //     },
  //   };

  //   const req = await fetch(endpoint, options);
  //   const res = req.json();

  //   return res;
  // };

  const logOut = () => {
    dispatch(logout());
  };

  useEffect(() => {
    const searchQuery = async () => {
      let query = "";
      let startDate = "";
      let endDate = "";

      for (const key in searchParameters) {
        // if (key === "user" && searchParameters[key] !== null) {
        //   console.log("search", searchParameters);
        //   //query += `filters[credit_details][customer][id]=${searchParameters[key].id}&`;
        // } else {
        //   query += "";
        // }

        if (key === "status_pembayaran") {
          if (searchParameters[key] !== undefined) {
            query += `filters[${key}]=${searchParameters[key]}&`;
          } else {
            query += "";
          }
        } else {
          query += "";
        }

        if (key === "customer") {
          if (searchParameters[key] !== undefined && searchParameters[key] !== null) {
            console.log(searchParameters[key]);
            query += `filters[${key}]=${searchParameters[key].id}&`;
          } else {
            query += "";
          }
        } else {
          query += "";
        }

        if (key == "range" && searchParameters[key] !== null) {
          startDate = searchParameters?.range[0]?.format("YYYY-MM-DD");
          endDate = searchParameters?.range[1]?.format("YYYY-MM-DD");
          query += `filters[tanggal][$gte]=${startDate}&filters[tanggal][$lte]=${endDate}&`;
        } else {
          query += "";
        }

        // if (key === "area" || key === "wilayah") {
        //   if (searchParameters[key] !== null) {
        //     query += `filters[credit_details][customer][${key}][id]=${searchParameters[key].id}&`;
        //   } else {
        //     query += "";
        //   }
        // } else {
        //   query += "";
        // }
      }

      const endpoint = process.env.NEXT_PUBLIC_URL + 
      "/credits?populate[0]=supplier&populate[1]=credit_details.sales_sale&"+
      "populate[2]=credit_details.customer&"+
      "populate[3]=credit_details.panel_sale.retur_panel_sales&"+
      "populate[4]=credit_details.non_panel_sale.retur_non_panel_sales"+
      query;

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

      setData(res);
      //console.log("endpoint", endpoint, res);
    };

    searchQuery();
  }, [searchParameters]);

  useEffect(() => {
    //setSearchParameters({tipeLaporan : "Detail", customer: null, range: moment()});
    setSearchParameters({tipeLaporan : "Detail", customer: null});
  }, []);

  function formatMyDate(value, locale = "id-ID") {
    return new Date(value).toLocaleDateString(locale);
  }

  return (
    <>
      <Head>
        <title>Laporan piutang penjualan</title>
      </Head>
      <DashboardLayout>
        <LayoutWrapper style={{}}>
          <TitlePage titleText={"LAPORAN PIUTANG PENJUALAN"} />
          <LayoutContent>
            <div className="w-full flex justify-start">
              <div className="w-full md:w-1/4 px-3">
                 <SearchCustomer
                   onChangeCustomer={(e) =>
                     setSearchParameters({ ...searchParameters, customer: e })
                   }
                 />
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
                  onChange={(e) =>
                    setSearchParameters({ ...searchParameters, status_pembayaran: e })
                  }
                >
                  <Select.Option value="Dibayar">Dibayar</Select.Option>
                  <Select.Option value="Dibayar Sebagian">Dibayar Sebagian</Select.Option>
                  <Select.Option value="Belum Dibayar">Belum Dibayar</Select.Option>
                </Select>
              </div>
              <div className="w-full md:w-1/4 px-3">
                <Select
                  placeholder="Tipe Laporan"
                  size="large"
                  defaultValue={"Detail"}
                  style={{
                    width: "100%",
                    marginRight: "10px",
                  }}
                  allowClear
                  onChange={(e) =>
                    setSearchParameters({ ...searchParameters, tipeLaporan: e })
                  }
                >
                  <Select.Option value="Detail">Detail</Select.Option>
                  <Select.Option value="Rekap">Rekap</Select.Option>
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
            </div>

            <div className="w-full flex justify-start">
              <div className="w-full md:w-1/4 px-3">
                {/* <Select
                  allowClear
                  // value={filter.sales}
                  // onClear={() => setFilter({ ...filter, sales: null })}
                  // onSelect={(value) => setFilter({ ...filter, sales: value })}
                  placeholder="Sales"
                  size="large"
                  style={{
                    width: "100%",
                    marginRight: "10px",
                  }}
                  options={dataUser}
                /> */}
                  <SearchSales
                   onChangeSales={(e) =>
                     setSearchParameters({ ...searchParameters, sales: e })
                   }
                 />
              </div>
              <div className="w-full md:w-1/4 px-3">
                  <SearchArea
                   onChangeArea={(e) =>
                     setSearchParameters({ ...searchParameters, area: e })
                   }
                 />
              </div>
              <div className="w-full md:w-1/4 px-3">
                  <SearchWilayah
                   onChangeWilayah={(e) =>
                     setSearchParameters({ ...searchParameters, wilayah: e })
                   }
                 />
              </div>
            </div>

            <div className="w-full flex justify-between mt-3">
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
            
            {/* <Table
              data={data}
              onUpdate={handleUpdate}
              //onDelete={handleDelete}
              //onPageChange={handlePageChange}
              //onChangeStatus={onChangeStatus}
              tipeLaporan={searchParameters["tipeLaporan"]}
              user={user}
            /> */}

          <div className="justify-between">
            {searchParameters.tipeLaporan === "Detail" ? (
            <div> Detail
              <table name="pembelian" className="w-full text-xs" >
              <thead>
                <tr className="p-2">
                  <th className="border-2 p-1">No Penagihan</th>
                  <th className="border-2 p-1">Tgl Tagih</th>
                  <th className="border-2 p-1">No invoice</th>
                  <th className="border-2 p-1">Tgl invoice</th>
                  <th className="border-2 p-1">Nilai invoice</th>
                  <th className="border-2 p-1">Nilai retur jual</th>
                  <th className="border-2 p-1">Tunai</th>
                  <th className="border-2 p-1">Transfer</th>
                  <th className="border-2 p-1">Giro</th>
                  <th className="border-2 p-1">Saldo Piutang</th>
                  <th className="border-2 p-1">CN</th>
                  <th className="border-2 p-1">DN</th>
                </tr>
              </thead>
              <tbody>
                {customer.map((item) => {

                  if(searchParameters?.customer?.id === item.id || searchParameters?.customer === null){
                    return(
                      <React.Fragment key={item.id}>
                      <tr>
                        <td className="border-2 p-1 align-top" colSpan={4}>Customer : {item.attributes.name}</td>
                        <td className="border-2 p-1 align-top" colSpan={3}>Sales : {item.attributes.sales_name}</td>
                        <td className="border-2 p-1 align-top" colSpan={5}>Tempo : {item.attributes.credit_limit_duration} {item.attributes.credit_limit_duration_type}</td>
                      </tr>
  
                      {data.data.map((row) => {
                        return(
                          <React.Fragment key={row.attributes?.no_piutang}>
                              <tr>
                                <td className="border-2 p-1 align-top ">{row.attributes?.no_piutang}</td>
                                <td className="border-2 p-1 align-top ">
                                  {formatMyDate(row.attributes?.tanggal)}
                                </td>
                                <td className="border-2 p-1">
                                  {row.attributes.credit_details.data.map((element, index) => {
                                    if (item.id === element.attributes?.customer?.data?.id) {
                                      if(element.attributes.non_panel_sale.data === null && element.attributes.panel_sale.data === null){
                                        return(
                                          <React.Fragment key={index}>
                                            <tr>{element.attributes.sales_sale.data.attributes.no_sales_sale}</tr>
                                          </React.Fragment>
                                        );
                                      } else if(element.attributes.sales_sale.data === null && element.attributes.panel_sale.data === null){
                                        return(
                                          <React.Fragment key={index}>
                                            <tr>{element.attributes.non_panel_sale.data.attributes.no_non_panel_sale}</tr>
                                          </React.Fragment>
                                        );
                                      } else if(element.attributes.non_panel_sale.data === null && element.attributes.sales_sale.data === null){
                                        return(
                                          <React.Fragment key={index}>
                                            <tr>{element.attributes.panel_sale.data.attributes.no_panel_sale}</tr>
                                          </React.Fragment>
                                        );
                                      }

                                    }
                                  }
                                  )}
                                </td>
                              </tr>
                            </React.Fragment>
                        );
                      })}

                      {/* {data.data.map((row) => {
                        // var totalTunai = 0;
                        if (item.id === row.attributes?.supplier?.data?.id) {
                          var sumRetur = row.attributes.debt_details.data.reduce((total, row) => {
                            if (row.attributes.purchasing?.data?.attributes?.returs) {
                              var totalRetur = row.attributes.purchasing.data.attributes.returs.data.reduce(
                                (sum, item) => (sum + item.attributes.total_price),
                                0
                              );
                              return total + totalRetur;
                            } else {
                              return total + 0;
                            }
                          }, 0);
                          
                          totalRetur = sumRetur;

                          var sumTunai = row.attributes.debt_details.data.reduce(
                            (total, row) => (total += row.attributes.tunai),
                            0
                          );
                          totalTunai += sumTunai;
                          var sumTransfer = row.attributes.debt_details.data.reduce(
                            (total, row) => (total += row.attributes.transfer),
                            0
                          );
                          totalTransfer += sumTransfer;
                          var sumGiro = row.attributes.debt_details.data.reduce(
                            (total, row) => (total += row.attributes.giro),
                            0
                          );
                          totalGiro += sumGiro;
    
                          row.attributes.debt_details.data.forEach((row) => {
                            if (idPurchasing !== row.attributes?.purchasing?.data?.id) {
                              idPurchasing = row.attributes?.purchasing?.data?.id;
                              totalSisaHutang += row.attributes.sisa_hutang;
                              totalNilaiLPB += row.attributes?.purchasing?.data?.attributes?.total_purchasing;
                            } else if (idPurchasing === row.attributes?.purchasing?.data?.id) {
                              var sisa =
                                row.attributes.tunai +
                                row.attributes.transfer +
                                row.attributes.giro +
                                row.attributes.sisa_hutang;
                              totalSisaHutang = (totalSisaHutang - sisa) + row.attributes.sisa_hutang;
                            }
                          });
    
                          return (
                            <React.Fragment key={row.attributes?.no_hutang}>
                              <tr>
                                <td className="border-2 p-1 align-top ">{row.attributes?.no_hutang}</td>
                                <td className="border-2 p-1 align-top ">
                                  {formatMyDate(row.attributes?.tanggal_pembayaran)}
                                </td>
                                <td className="border-2 p-1">
                                  {row.attributes.debt_details.data.map((element, index) => (
                                    <React.Fragment key={index}>
                                      <tr>{element.attributes.purchasing.data.attributes.no_nota_suppplier}</tr>
                                    </React.Fragment>
                                  ))}
                                </td>
                                <td className="border-2 p-1">
                                  {row.attributes.debt_details.data.map((element, index) => (
                                    <React.Fragment key={index}>
                                      <tr>{element.attributes.purchasing.data.attributes.no_purchasing}</tr>
                                    </React.Fragment>
                                  ))}
                                </td>
                                <td className="border-2 p-1">
                                  {row.attributes.debt_details.data.map((element, index) => (
                                    <React.Fragment key={index}>
                                      <tr>{formatMyDate(element.attributes.purchasing.data.attributes.date_purchasing)}</tr>
                                    </React.Fragment>
                                  ))}
                                </td>
                                <td className="border-2 p-1">
                                  {row.attributes.debt_details.data.map((element, index) => (
                                    <React.Fragment key={index}>
                                      <tr className="text-right">
                                        {formatter.format(element.attributes.purchasing.data.attributes.total_purchasing)}
                                      </tr>
                                    </React.Fragment>
                                  ))}
                                </td>
                                <td className="border-2 p-1">
                                  {row.attributes.debt_details.data.map((row, index) => {
                                    var totalRetur = 0;
                                    if(row.attributes.purchasing?.data?.attributes?.returs){
                                      row.attributes.purchasing.data.attributes.returs.data.forEach((item) => {
                                        totalRetur += item.attributes.total_price;
                                      });
                                    }
                                    return (
                                      <React.Fragment key={index}>
                                        <tr className="text-right">{formatter.format(totalRetur)}</tr>
                                      </React.Fragment>
                                    );
                                  }
                                  )}
                                </td>
                                <td className="border-2 p-1">
                                  {row.attributes.debt_details.data.map((element, index) => (
                                    <React.Fragment key={index}>
                                      <tr className="text-right">{formatter.format(element.attributes.tunai)}</tr>
                                    </React.Fragment>
                                  ))}
                                </td>
                                <td className="border-2 p-1">
                                  {row.attributes.debt_details.data.map((element, index) => (
                                    <React.Fragment key={index}>
                                      <tr className="text-right">{formatter.format(element.attributes.transfer)}</tr>
                                    </React.Fragment>
                                  ))}
                                </td>
                                <td className="border-2 p-1">
                                  {row.attributes.debt_details.data.map((element, index) => (
                                    <React.Fragment key={index}>
                                      <tr className="text-right">{formatter.format(element.attributes.giro)}</tr>
                                    </React.Fragment>
                                  ))}
                                </td>
                                <td className="border-2 p-1">
                                  {row.attributes.debt_details.data.map((element, index) => {
                                    var totalRetur = 0;
                                    if(element.attributes.purchasing?.data?.attributes?.returs){
                                      element.attributes.purchasing.data.attributes.returs.data.forEach((item) => {
                                        totalRetur += item.attributes.total_price;
                                      });
                                    }
                                    return (
                                      <React.Fragment key={index}>
                                        <tr className="text-right">{formatter.format(element.attributes.sisa_hutang - totalRetur)}</tr>
                                      </React.Fragment>
                                    );
                                  })}
                                </td>
                                <td className="border-2 p-1"/>
                                <td className="border-2 p-1"/>
                              </tr>
                            </React.Fragment>
                          );
                        }
                        return null;
                      })} */}
  
                      <tr>
                        <td className="border-2 p-1" colSpan={4}></td>
                        
                        <td className="border-2 p-1">Subtotal :</td>
                        {/* <td className="border-2 p-1">{formatter.format(totalNilaiLPB)}</td>
                        <td className="border-2 p-1">{formatter.format(totalRetur)}</td>
                        <td className="border-2 p-1">{formatter.format(totalTunai)}</td>
                        <td className="border-2 p-1">{formatter.format(totalTransfer)}</td>
                        <td className="border-2 p-1">{formatter.format(totalGiro)}</td>
                        <td className="border-2 p-1">{formatter.format(totalSisaHutang)}</td> */}
                        <td className="border-2 p-1"/>
                        <td className="border-2 p-1"/>
                      </tr>
                      <tr hidden>
                      {/* {totalNilaiLPB = 0}
                      {totalRetur = 0}
                      {totalTunai = 0}
                      {totalTransfer = 0}
                      {totalGiro = 0}
                      {totalSisaHutang = 0} */}
                      </tr>
  
                      </React.Fragment>
                    );
                  }

                })}
              </tbody>
              </table>
            </div>
              ) : (
              <div hidden></div>
            )}  

            </div>

            <div className="w-full flex justify-between mt-3">
                <button
                  onClick={handlePrint}
                  type="button"
                  className="bg-cyan-700 rounded px-5 py-2 hover:bg-cyan-800  shadow-sm mb-5 mx-2"
                >
                  <div className="text-white text-center text-sm font-bold">
                    <a className="text-white no-underline text-xs sm:text-xs">Print</a>
                  </div>
                </button>
            </div>
            <tokenVerify logOut={logOut} />
          </LayoutContent>
        </LayoutWrapper>
      </DashboardLayout>
    </>
  );
}

export default Laporan;

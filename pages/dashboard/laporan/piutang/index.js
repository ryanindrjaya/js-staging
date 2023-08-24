import Head from "next/head";
import React, { useState, useEffect, useRef } from "react";
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
import * as XLSX from 'xlsx';

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
  const [customer, setCustomer] = useState(props.customer.data);
  const router = useRouter();
  const [supplier, setSupplier] = useState();
  const [searchParameters, setSearchParameters] = useState({customer: null});
  const defaultRange = [moment().startOf('month'), moment().endOf('month')];
  const dispatch = useDispatch();

  const tableRef = useRef(null);

  // Range Picker
  const { RangePicker } = DatePicker;

  const handlePrintXLS = () => {
    console.log("handlePrintXLS", tableRef, tableRef.current);
    
    const contentDiv = document.querySelector('[name="content"]');
  
    if (contentDiv) {
      const workbook = XLSX.utils.book_new();
      
      // Create the worksheet and add the content to it
      const worksheet = XLSX.utils.table_to_sheet(contentDiv);
      
      // Add the worksheet to the workbook
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
      
      // Save the workbook as an XLSX file
      XLSX.writeFile(workbook, 'Laporan Piutang.xlsx');
    }
  };

  const handlePrint = () => {
    const table = tableRef.current;
    if (table) {
      const printWindow = window.open('', '_blank');
      const printDocument = printWindow.document;

      // Write the table content to the print window
      printDocument.write(`
        <html>
          <head>
            <style>
              table {
                border-collapse: collapse;
                width: 100%;
                border: 2px solid #000; /* Add additional border styling as needed */
              }
              th, td {
                border: 1px solid #000; /* Add additional border styling as needed */
                padding: 8px;
              }
            </style>
          </head>
          <body>
            ${table.outerHTML}
          </body>
        </html>
      `);
      printDocument.close();

      // Use the window.print() method to show the print preview
      const isPrintSuccessful = printWindow.print();

      // Close the print window if the print dialog was canceled
      if (!isPrintSuccessful) {
        printWindow.close();
      }
    }
  };

  const handleUpdate = (id) => {
    // router.push("/dashboard/pembelian/order_pembelian/edit/" + id);
    openNotificationWithIcon(
      "info",
      "Work In Progress",
      "Hai, Fitur ini sedang dikerjakan. Silahkan tunggu pembaruan selanjutnya"
    );
  };

  const cekFaktur = async (tempFaktur, detailIdFaktur, attributes, keterangan, totalInvoice) => {
    //console.log("faktur", tempFaktur, detailIdFaktur);
    var newData = null;
    if(keterangan === "sisa") newData = {id: detailIdFaktur, total: attributes.sisa_piutang}; //sisa piutang
    else if(keterangan === "total") newData = {id: detailIdFaktur, total: totalInvoice}; //total invoice
    else if(keterangan === "retur") newData = {id: detailIdFaktur, total: attributes.total_retur}; //total invoice
    
    var addNewData = true;

    if(tempFaktur.length === 0){
      tempFaktur.push(newData);
    } else if (tempFaktur.length !== 0) {
      tempFaktur.map((item, index) => {
        // if(item.id !== detailIdFaktur) {
        //   tempFaktur.push(newData);
        // } 
        if(item.id === detailIdFaktur) {
          tempFaktur[index] = newData;
          addNewData = false;
        }
      });

      if (addNewData) {
        tempFaktur.push(newData);
      }
    } 

  };

  const openNotificationWithIcon = (type, title, message) => {
    notification[type]({
      message: title,
      description: message,
    });
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

        if (key === "sales") {
          console.log("search", searchParameters);
          query += `filters[credit_details][customer][sales_name]=${searchParameters[key].name}&`;
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

        if (key === "range") {
          startDate = searchParameters?.range[0]?.format("YYYY-MM-DD");
          endDate = searchParameters?.range[1]?.format("YYYY-MM-DD");
          query += `filters[tanggal][$gte]=${startDate}&filters[tanggal][$lte]=${endDate}&`;
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

      const endpoint = process.env.NEXT_PUBLIC_URL + 
      "/credits?populate[0]=supplier&populate[1]=credit_details.sales_sale&"+
      "populate[2]=credit_details.customer&"+
      "populate[3]=credit_details.panel_sale.retur_panel_sales&"+
      "populate[4]=credit_details.non_panel_sale.retur_non_panel_sales&"+
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
    setSearchParameters({tipeLaporan : "Detail", customer: null, status_pembayaran: undefined, range: defaultRange});
  }, []);

  function formatMyDate(value, locale = "id-ID") {
    return new Date(value).toLocaleDateString(locale);
  }

  var formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 2,
  });

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
                  defaultValue={defaultRange}
                  onChange={(e) =>
                    setSearchParameters({ ...searchParameters, range: e })
                  }
                  allowClear={false}
                />
              </div>
            </div>

            <div className="w-full flex justify-start">
              <div className="w-full md:w-1/4 px-3">
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
                onClick={handlePrintXLS}
                type="button"
                className="w-full md:w-1/4 mx-3 bg-cyan-700 rounded px-20 py-2 hover:bg-cyan-800  shadow-sm float-right mb-5"
              >
                <div className="text-white text-center text-sm font-bold">
                  <a className="text-white no-underline text-xs sm:text-xs">Print XLS</a>
                </div>
              </button>
              <button
                onClick={handlePrint}
                type="button"
                className="w-full md:w-1/4 mx-3 bg-cyan-700 rounded px-20 py-2 hover:bg-cyan-800  shadow-sm float-right mb-5"
              >
                <div className="text-white text-center text-sm font-bold">
                  <a className="text-white no-underline text-xs sm:text-xs">Print</a>
                </div>
              </button>
            </div>

          <div className="justify-between">
            {searchParameters.tipeLaporan === "Detail" ? (
            <div name="content" ref={tableRef}> Detail
              <table name="pembelian" className="w-full text-xs">
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
                {
                  customer.map((item) => {
                    var tempTotalPiutang = [];
                    var tempTotalInvoice = [];
                    var tempRetur = [];

                    var totalTunai = 0;
                    var totalTransfer = 0;
                    var totalGiro = 0;
                    var totalInvoice = 0;
                    var totalRetur = 0;
                    var totalPiutang = 0;

                    if(searchParameters?.customer?.id === item.id || searchParameters?.customer === null){
                    return(
                      <React.Fragment key={item.id}>
                        <tr>
                          <td className="border-2 p-1 align-top" colSpan={3}>Customer : {item.attributes.name}</td>
                          <td className="border-2 p-1 align-top" colSpan={4}>Sales : {item.attributes.sales_name}</td>
                          <td className="border-2 p-1 align-top" colSpan={5}>Tempo : {item.attributes.credit_limit_duration} {item.attributes.credit_limit_duration_type}</td>
                        </tr>
                        {data.data.map((row) => {

                          return(
                            <React.Fragment key={row.id}>
                              {/* <tr>
                                <td className="border-2 p-1 align-top">{row.attributes?.no_piutang}</td>
                              </tr> */}
                              {row.attributes.credit_details.data.map((detail) => {
                                if(item.id === detail.attributes.customer.data.id) {
                                  return(
                                    <React.Fragment key={detail.id}>
                                      <tr>
                                        <td className="border-2 p-1 align-top">{row.attributes?.no_piutang}</td>
                                        <td className="border-2 p-1 align-top">{formatMyDate(row.attributes?.tanggal)}</td>
                                        <td className="border-2 p-1 align-top">
                                          {(() => {
                                            if(detail?.attributes?.sales_sale?.data !== null) {
                                              cekFaktur(tempTotalPiutang, detail.attributes.sales_sale.data.attributes.no_sales_sale, detail.attributes, "sisa");
                                              
                                              return detail.attributes.sales_sale.data.attributes.no_sales_sale;
                                            } else if (detail?.attributes?.panel_sale?.data !== null) {
                                              cekFaktur(tempTotalPiutang, detail.attributes.panel_sale.data.attributes.no_panel_sale, detail.attributes, "sisa");

                                              return detail.attributes.panel_sale.data.attributes.no_panel_sale;
                                            } else if (detail?.attributes?.non_panel_sale?.data !== null) {
                                              cekFaktur(tempTotalPiutang, detail.attributes.non_panel_sale.data.attributes.no_non_panel_sale, detail.attributes, "sisa");
                                              
                                              return detail.attributes.non_panel_sale.data.attributes.no_non_panel_sale;
                                            }
                                            
                                          })
                                          ()
                                          }
                                        </td>
                                        <td className="border-2 p-1 align-top">
                                          {(() => {
                                            if(detail?.attributes?.sales_sale?.data !== null) {
                                              return formatMyDate(detail.attributes.sales_sale.data.attributes.sale_date);
                                            } else if (detail?.attributes?.panel_sale?.data !== null) {
                                              return formatMyDate(detail.attributes.panel_sale.data.attributes.sale_date);
                                            } else if (detail?.attributes?.non_panel_sale?.data !== null) {
                                              return formatMyDate(detail.attributes.non_panel_sale.data.attributes.sale_date);
                                            }
                                          })
                                          ()
                                          }
                                        </td>
                                        <td className="border-2 p-1 align-top">
                                          {(() => {
                                            if(detail?.attributes?.sales_sale?.data !== null) {
                                              cekFaktur(tempTotalInvoice, detail.attributes.sales_sale.data.attributes.no_sales_sale, detail.attributes, "total",
                                              detail.attributes.sales_sale.data.attributes.total);
                                              //totalInvoice += detail.attributes.sales_sale.data.attributes.total;
                                              return formatter.format(detail.attributes.sales_sale.data.attributes.total);
                                            } else if (detail?.attributes?.panel_sale?.data !== null) {
                                              cekFaktur(tempTotalInvoice, detail.attributes.panel_sale.data.attributes.no_panel_sale, detail.attributes, "total",
                                              detail.attributes.panel_sale.data.attributes.total);
                                              //totalInvoice += detail.attributes.panel_sale.data.attributes.total;
                                              return formatter.format(detail.attributes.panel_sale.data.attributes.total);
                                            } else if (detail?.attributes?.non_panel_sale?.data !== null) {
                                              cekFaktur(tempTotalInvoice, detail.attributes.non_panel_sale.data.attributes.no_non_panel_sale, detail.attributes, "total",
                                              detail.attributes.non_panel_sale.data.attributes.total);
                                              //totalInvoice += detail.attributes.non_panel_sale.data.attributes.total;
                                              return formatter.format(detail.attributes.non_panel_sale.data.attributes.total);
                                            }
                                          })
                                          ()
                                          }
                                        </td>
                                        <td className="border-2 p-1 align-top">
                                          {(() => {
                                              //totalRetur += detail.attributes.total_retur;
                                              if(detail?.attributes?.sales_sale?.data !== null) {
                                                cekFaktur(tempRetur, detail.attributes.sales_sale.data.attributes.no_sales_sale, detail.attributes, "retur");
                                              } else if (detail?.attributes?.panel_sale?.data !== null) {
                                                cekFaktur(tempRetur, detail.attributes.panel_sale.data.attributes.no_panel_sale, detail.attributes, "retur");
                                              } else if (detail?.attributes?.non_panel_sale?.data !== null) {
                                                cekFaktur(tempRetur, detail.attributes.non_panel_sale.data.attributes.no_non_panel_sale, detail.attributes, "retur");
                                              }
                                              return formatter.format(detail.attributes.total_retur);
                                            }) () 
                                          }
                                        </td>
                                        <td className="border-2 p-1 align-top">
                                          {
                                            (() => {
                                              totalTunai += detail.attributes.tunai;
                                              return formatter.format(detail.attributes.tunai);
                                            }) () 
                                          }
                                        </td>
                                        <td className="border-2 p-1 align-top">
                                          {
                                            (() => {
                                              totalTransfer += detail.attributes.transfer;
                                              return formatter.format(detail.attributes.transfer);
                                            }) () 
                                          }
                                        </td>
                                        <td className="border-2 p-1 align-top">
                                          {
                                            (() => {
                                              totalGiro += detail.attributes.giro;
                                              return formatter.format(detail.attributes.giro);
                                            }) () 
                                          }
                                        </td>
                                        <td className="border-2 p-1 align-top">
                                          {formatter.format(detail.attributes.sisa_piutang)}
                                        </td>
                                        <td className="border-2 p-1 align-top">{
                                        //console.log("detail dan row", detail, row)
                                        }</td>
                                        <td className="border-2 p-1 align-top">{}</td>
                                      </tr>
                                    </React.Fragment>
                                  );
                                }
                              })}
                            </React.Fragment>
                          );

                        })}

                        <tr>
                          <td className="border-2 p-1 align-top" colSpan={3}/>
                          <td className="border-2 p-1 align-top">Subtotal :</td>
                          <td className="border-2 p-1 align-top">
                            {
                              (() => {
                                tempTotalInvoice.map((data) => {
                                  totalInvoice += data.total;
                                });
                                
                                return formatter.format(totalInvoice);
                              }) ()
                            }
                          </td>
                          <td className="border-2 p-1 align-top">
                            {
                              (() => {
                                tempRetur.map((data) => {
                                  totalRetur += data.total;
                                });
                                
                                return formatter.format(totalRetur);
                              }) ()
                            }
                          </td>
                          <td className="border-2 p-1 align-top">{formatter.format(totalTunai)}</td>
                          <td className="border-2 p-1 align-top">{formatter.format(totalTransfer)}</td>
                          <td className="border-2 p-1 align-top">{formatter.format(totalGiro)}</td>
                          <td className="border-2 p-1 align-top">
                            {
                              (() => {
                                tempTotalPiutang.map((data) => {
                                  totalPiutang += data.total;
                                });
                                
                                return formatter.format(totalPiutang);
                              }) ()
                            }
                          </td>
                          <td className="border-2 p-1 align-top" />
                          <td className="border-2 p-1 align-top" />
                        </tr>
                      </React.Fragment>
                      );
                      }
                  })
                }
              </tbody>
              </table>
            </div>
              ) : (
              <div hidden></div>
            )}  

            {searchParameters.tipeLaporan === "Rekap" ? (
            <div name="content" ref={tableRef}> Detail
              <table name="pembelian" className="w-full text-xs">
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
                {
                  customer.map((item) => {
                    var tempTotalPiutang = [];
                    var tempTotalInvoice = [];
                    var tempRetur = [];

                    var totalTunai = 0;
                    var totalTransfer = 0;
                    var totalGiro = 0;
                    var totalInvoice = 0;
                    var totalRetur = 0;
                    var totalPiutang = 0;

                    if(searchParameters?.customer?.id === item.id || searchParameters?.customer === null){
                    return(
                      <React.Fragment key={item.id}>
                        <tr>
                          <td className="border-2 p-1 align-top" colSpan={3}>Customer : {item.attributes.name}</td>
                          <td className="border-2 p-1 align-top" colSpan={4}>Sales : {item.attributes.sales_name}</td>
                          <td className="border-2 p-1 align-top" colSpan={5}>Tempo : {item.attributes.credit_limit_duration} {item.attributes.credit_limit_duration_type}</td>
                        </tr>
                        {data.data.map((row) => {

                          return(
                            <React.Fragment key={row.id}>
                              {/* <tr>
                                <td className="border-2 p-1 align-top">{row.attributes?.no_piutang}</td>
                              </tr> */}
                              {row.attributes.credit_details.data.map((detail) => {
                                if(item.id === detail.attributes.customer.data.id) {
                                  return(
                                    <React.Fragment key={detail.id}>
                                      <tr hidden>
                                        <td className="border-2 p-1 align-top">{row.attributes?.no_piutang}</td>
                                        <td className="border-2 p-1 align-top">{formatMyDate(row.attributes?.tanggal)}</td>
                                        <td className="border-2 p-1 align-top">
                                          {(() => {
                                            if(detail?.attributes?.sales_sale?.data !== null) {
                                              cekFaktur(tempTotalPiutang, detail.attributes.sales_sale.data.attributes.no_sales_sale, detail.attributes, "sisa");
                                            
                                            } else if (detail?.attributes?.panel_sale?.data !== null) {
                                              cekFaktur(tempTotalPiutang, detail.attributes.panel_sale.data.attributes.no_panel_sale, detail.attributes, "sisa");

                                            } else if (detail?.attributes?.non_panel_sale?.data !== null) {
                                              cekFaktur(tempTotalPiutang, detail.attributes.non_panel_sale.data.attributes.no_non_panel_sale, detail.attributes, "sisa");
                                              
                                            }
                                            
                                          })
                                          ()
                                          }
                                        </td>
                                        <td className="border-2 p-1 align-top">
                                          {(() => {
                                            if(detail?.attributes?.sales_sale?.data !== null) {
                                              return formatMyDate(detail.attributes.sales_sale.data.attributes.sale_date);
                                            } else if (detail?.attributes?.panel_sale?.data !== null) {
                                              return formatMyDate(detail.attributes.panel_sale.data.attributes.sale_date);
                                            } else if (detail?.attributes?.non_panel_sale?.data !== null) {
                                              return formatMyDate(detail.attributes.non_panel_sale.data.attributes.sale_date);
                                            }
                                          })
                                          ()
                                          }
                                        </td>
                                        <td className="border-2 p-1 align-top">
                                          {(() => {
                                            if(detail?.attributes?.sales_sale?.data !== null) {
                                              cekFaktur(tempTotalInvoice, detail.attributes.sales_sale.data.attributes.no_sales_sale, detail.attributes, "total",
                                              detail.attributes.sales_sale.data.attributes.total);
                                              //totalInvoice += detail.attributes.sales_sale.data.attributes.total;
                                              return formatter.format(detail.attributes.sales_sale.data.attributes.total);
                                            } else if (detail?.attributes?.panel_sale?.data !== null) {
                                              cekFaktur(tempTotalInvoice, detail.attributes.panel_sale.data.attributes.no_panel_sale, detail.attributes, "total",
                                              detail.attributes.panel_sale.data.attributes.total);
                                              //totalInvoice += detail.attributes.panel_sale.data.attributes.total;
                                              return formatter.format(detail.attributes.panel_sale.data.attributes.total);
                                            } else if (detail?.attributes?.non_panel_sale?.data !== null) {
                                              cekFaktur(tempTotalInvoice, detail.attributes.non_panel_sale.data.attributes.no_non_panel_sale, detail.attributes, "total",
                                              detail.attributes.non_panel_sale.data.attributes.total);
                                              //totalInvoice += detail.attributes.non_panel_sale.data.attributes.total;
                                              return formatter.format(detail.attributes.non_panel_sale.data.attributes.total);
                                            }
                                          })
                                          ()
                                          }
                                        </td>
                                        <td className="border-2 p-1 align-top">
                                          {(() => {
                                              //totalRetur += detail.attributes.total_retur;
                                              if(detail?.attributes?.sales_sale?.data !== null) {
                                                cekFaktur(tempRetur, detail.attributes.sales_sale.data.attributes.no_sales_sale, detail.attributes, "retur");
                                              } else if (detail?.attributes?.panel_sale?.data !== null) {
                                                cekFaktur(tempRetur, detail.attributes.panel_sale.data.attributes.no_panel_sale, detail.attributes, "retur");
                                              } else if (detail?.attributes?.non_panel_sale?.data !== null) {
                                                cekFaktur(tempRetur, detail.attributes.non_panel_sale.data.attributes.no_non_panel_sale, detail.attributes, "retur");
                                              }
                                              return formatter.format(detail.attributes.total_retur);
                                            }) () 
                                          }
                                        </td>
                                        <td className="border-2 p-1 align-top">
                                          {
                                            (() => {
                                              totalTunai += detail.attributes.tunai;
                                              return formatter.format(detail.attributes.tunai);
                                            }) () 
                                          }
                                        </td>
                                        <td className="border-2 p-1 align-top">
                                          {
                                            (() => {
                                              totalTransfer += detail.attributes.transfer;
                                              return formatter.format(detail.attributes.transfer);
                                            }) () 
                                          }
                                        </td>
                                        <td className="border-2 p-1 align-top">
                                          {
                                            (() => {
                                              totalGiro += detail.attributes.giro;
                                              return formatter.format(detail.attributes.giro);
                                            }) () 
                                          }
                                        </td>
                                        <td className="border-2 p-1 align-top">
                                          {formatter.format(detail.attributes.sisa_piutang)}
                                        </td>
                                        <td className="border-2 p-1 align-top">{
                                        //console.log("detail dan row", detail, row)
                                        }</td>
                                        <td className="border-2 p-1 align-top">{}</td>
                                      </tr>
                                    </React.Fragment>
                                  );
                                }
                              })}
                            </React.Fragment>
                          );

                        })}

                        <tr>
                          <td className="border-2 p-1 align-top" colSpan={3}/>
                          <td className="border-2 p-1 align-top">Subtotal :</td>
                          <td className="border-2 p-1 align-top">
                            {
                              (() => {
                                tempTotalInvoice.map((data) => {
                                  totalInvoice += data.total;
                                });
                                
                                return formatter.format(totalInvoice);
                              }) ()
                            }
                          </td>
                          <td className="border-2 p-1 align-top">
                            {
                              (() => {
                                tempRetur.map((data) => {
                                  totalRetur += data.total;
                                });
                                
                                return formatter.format(totalRetur);
                              }) ()
                            }
                          </td>
                          <td className="border-2 p-1 align-top">{formatter.format(totalTunai)}</td>
                          <td className="border-2 p-1 align-top">{formatter.format(totalTransfer)}</td>
                          <td className="border-2 p-1 align-top">{formatter.format(totalGiro)}</td>
                          <td className="border-2 p-1 align-top">
                            {
                              (() => {
                                tempTotalPiutang.map((data) => {
                                  totalPiutang += data.total;
                                });
                                
                                return formatter.format(totalPiutang);
                              }) ()
                            }
                          </td>
                          <td className="border-2 p-1 align-top" />
                          <td className="border-2 p-1 align-top" />
                        </tr>
                      </React.Fragment>
                      );
                      }
                  })
                }
              </tbody>
              </table>
            </div>
              ) : (
              <div hidden></div>
            )}  

            </div>

            <tokenVerify logOut={logOut} />
          </LayoutContent>
        </LayoutWrapper>
      </DashboardLayout>
    </>
  );
}

export default Laporan;

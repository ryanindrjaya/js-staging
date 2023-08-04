import Head from "next/head";
import React, { useState, useEffect } from "react";
import LayoutContent from "@iso/components/utility/layoutContent";
import DashboardLayout from "@iso/containers/DashboardLayout/DashboardLayout";
import LayoutWrapper from "@iso/components/utility/layoutWrapper.js";
import router, { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { Input, notification, Select, DatePicker } from "antd";
import TitlePage from "@iso/components/TitlePage/TitlePage";
import Table from "@iso/components/ReactDataTable/Report/PurchaseDebtTable";
import SearchSupplier from "@iso/components/Form/AddReport/SearchSupplier";
import SearchLocations from "@iso/components/Form/AddReport/SearchLocations";
//import TableExportToExcel from "../utility/TableExportToExcel"; 
import nookies from "nookies";
import tokenVerify from "../../../../authentication/tokenVerify";
import moment from "moment";
import * as XLSX from 'xlsx';

Laporan.getInitialProps = async (context) => {
  const cookies = nookies.get(context);

  const req = await fetchData(cookies);
  const user = await req.json();

  const reqDataUser = await fetchUser(cookies);
  const dataUser = await reqDataUser.json();

  const reqDebt = await fetchDebt(cookies);
  const debt = await reqDebt.json();

  const reqLPB = await fetchLPB(cookies);
  const lpb = await reqLPB.json();

  const reqSupplier = await fetchSupplier(cookies);
  const supplier = await reqSupplier.json();

  return {
    props: {
      user,
      dataUser,
      debt,
      lpb,
      supplier
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

const fetchDebt = async (cookies) => {
  const endpoint = process.env.NEXT_PUBLIC_URL + "/debts?populate[0]=supplier&populate[1]=debt_details.purchasing.returs&filters[document][$eq]=Publish";
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

const fetchLPB = async (cookies) => {
  const endpoint = process.env.NEXT_PUBLIC_URL + "/purchasings?populate=*";
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

const fetchSupplier = async (cookies) => {
  const endpoint = process.env.NEXT_PUBLIC_URL + "/suppliers?populate=*";
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

// Function to export the table to XLSX
const exportTableToXLSX = (tableData) => {
  const data = [];
  const headers = [];

  // Extract headers from the first row of the table
  const headerRow = tableData.querySelector('thead tr');
  headerRow.querySelectorAll('th').forEach((th) => {
    headers.push(th.innerText);
  });

  // Extract data from the table rows
  const bodyRows = tableData.querySelectorAll('tbody tr');
  bodyRows.forEach((row) => {
    const rowData = [];
    row.querySelectorAll('td').forEach((td) => {
      rowData.push(td.innerText);
    });
    if (rowData.length !== 0) data.push(rowData);
    if (rowData[1] === "Subtotal :") {
      const space = "";
    
      // Insert the three values before index 1 in the rowData array
      rowData.splice(1, 0, space, space, space);
    }
  });

  // Create the Excel workbook and worksheet
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.aoa_to_sheet([headers, ...data]);
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

  // Generate the Excel file
  XLSX.writeFile(workbook, 'Laporan Hutang.xlsx');
};

function Laporan({ props }) {
  const user = props.user;
  const dataUser = props?.dataUser;
  const debt = props.debt;
  const lpb = props.lpb;
  const [data, setData] = useState(debt);
  const router = useRouter();
  const [supplier, setSupplier] = useState(props.supplier.data);
  const [searchParameters, setSearchParameters] = useState({}); 
  const dispatch = useDispatch();

  var dataSupplier = [];
  var totalHarga = [];
  var totalNilaiLPB = 0;
  var totalRetur = 0;
  var totalTunai = 0;
  var totalTransfer = 0;
  var totalGiro = 0;
  var totalSisaHutang = 0;
  var idPurchasing = null;
  var tempData = debt;

  // Range Picker
  const { RangePicker } = DatePicker;
  const defaultRange = [moment().startOf('month'), moment().endOf('month')];

  const handlePrint = () => {
    router.push("/dashboard/laporan/pembayaranhutang/print/" + searchParameters?.tipeLaporan);
    
    data.data.forEach(element => {
      dispatch({ type: 'ADD_LIST', list: element });
    });
    supplier.forEach(element => {
      dispatch({ type: 'ADD_SUPPLIER', supplier: element });
    });

    dispatch({ type: 'ADD_PARAMETER', supplier: searchParameters?.supplier, range: searchParameters?.range, debt: debt });
  };

  // const handleAdd = () => {
  //   router.push("/dashboard/keuangan/jurnal/tambah");
  // };

  var formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 2,
  });

  function formatMyDate(value, locale = "id-ID") {
    return new Date(value).toLocaleDateString(locale);
  }

  const handleUpdate = (id) => {
    // router.push("/dashboard/pembelian/order_pembelian/edit/" + id);
    openNotificationWithIcon(
      "info",
      "Work In Progress",
      "Hai, Fitur ini sedang dikerjakan. Silahkan tunggu pembaruan selanjutnya"
    );
  };

  const tableRef = React.useRef(null);
  const handlePrintXLS = () => {
    console.log("handlePrintXLS", tableRef, tableRef.current);
    if (tableRef.current) {
      exportTableToXLSX(tableRef.current);
    }
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

  const rekapSaldoHutang = (item, data) => {
    var totalSaldoHutang = 0;
    var idPurchasing = 0;
      //totalSaldoHutang = 0;
      
      if(searchParameters?.supplier?.id === item.id || searchParameters?.supplier === null){
        
        data.data.map((row) => {
            var rowDate = moment(row.attributes.tanggal_pembayaran);
            var startDate = moment(searchParameters?.range[0]).subtract(1, 'month').startOf('month');;
            var endDate = moment(searchParameters?.range[1]).subtract(1, 'month').endOf('month');

            if (item.id === row.attributes?.supplier?.data?.id) {

              row.attributes.debt_details.data.forEach((row) => {
                if (
                  idPurchasing !== row.attributes?.purchasing?.data?.id &&
                  rowDate.isSameOrAfter(startDate, 'day') &&
                  rowDate.isSameOrBefore(endDate, 'day')
                  ) {
                  idPurchasing = row.attributes?.purchasing?.data?.id;
                  totalSaldoHutang += row.attributes.sisa_hutang;
                
                } else if (
                  idPurchasing === row.attributes?.purchasing?.data?.id &&
                  rowDate.isSameOrAfter(startDate, 'day') &&
                  rowDate.isSameOrBefore(endDate, 'day')
                  ) {
                  var sisa =
                    row.attributes.tunai +
                    row.attributes.transfer +
                    row.attributes.giro +
                    row.attributes.sisa_hutang;
                  totalSaldoHutang = (totalSaldoHutang - sisa) + row.attributes.sisa_hutang;
                }
              });

            }    
        })
      }
        
    return (formatter.format(totalSaldoHutang));
  }

  const rekapTanggal = (search) => {
    var currentDate = search.range[0];
    const defaultEndDate = currentDate.clone().subtract(1, 'month').endOf('month'); // Get the end of the previous month
    return formatMyDate(defaultEndDate);
  }

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

        if (key === "supplier") {
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
          console.log(searchParameters[key], "range");
          startDate = searchParameters?.range[0]?.format("YYYY-MM-DD");
          endDate = searchParameters?.range[1]?.format("YYYY-MM-DD");
          query += `filters[tanggal_pembayaran][$gte]=${startDate}&filters[tanggal_pembayaran][$lte]=${endDate}&`;
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

      const endpoint = process.env.NEXT_PUBLIC_URL + "/debts?populate[0]=supplier&populate[1]=debt_details.purchasing.returs&filters[document][$eq]=Publish&" + query;

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
    setSearchParameters({tipeLaporan : "Detail", supplier: null, range: defaultRange});
  }, []);

  return (
    <>
      <Head>
        <title>Laporan pembayaran hutang pembelian </title>
      </Head>
      <DashboardLayout>
        <LayoutWrapper style={{}}>
          <TitlePage titleText={"LAPORAN PEMBAYARAN HUTANG PEMBELIAN"} />
          <LayoutContent>
            <div className="w-full flex justify-start">
              <div className="w-full md:w-1/4 px-3">
                 <SearchSupplier 
                   onChangeSupplier={(e) =>
                    setSearchParameters({ ...searchParameters, supplier: e })
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
                  defaultValue={defaultRange}
                  onChange={(e) =>
                    setSearchParameters({ ...searchParameters, range: e })
                  }
                  allowClear={false} 
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
            <div ref={tableRef}> Detail
              <table name="pembelian" className="w-full text-xs" >
              <thead>
                <tr className="p-2">
                  <th className="border-2 p-1">No Pembayaran</th>
                  <th className="border-2 p-1">Tgl Bayar</th>
                  <th className="border-2 p-1">Nota Supplier</th>
                  <th className="border-2 p-1">No LPB</th>
                  <th className="border-2 p-1">Tgl LPB</th>
                  <th className="border-2 p-1">Nilai LPB</th>
                  <th className="border-2 p-1">Total Nilai RB</th>
                  <th className="border-2 p-1">Tunai</th>
                  <th className="border-2 p-1">Transfer</th>
                  <th className="border-2 p-1">Giro</th>
                  <th className="border-2 p-1">Saldo Hutang</th>
                  <th className="border-2 p-1">CN</th>
                  <th className="border-2 p-1">DN</th>
                </tr>
              </thead>
              <tbody>
                {supplier.map((item) => {

                  if(searchParameters?.supplier?.id === item.id || searchParameters?.supplier === null){
                    return(
                      <React.Fragment key={item.id}>
                      <tr>
                        <td className="border-2 p-1 align-top" colSpan={4}>Supplier : {item.attributes.name}</td>
                        <td className="border-2 p-1 align-top" colSpan={2}>Tempo : 0</td>
                        <td className="border-2 p-1 align-top" >Saldo Per : </td>
                        <td className="border-2 p-1 align-top" >{rekapTanggal(searchParameters)}</td>
                        <td className="border-2 p-1 align-top align-left" colSpan={3}>{rekapSaldoHutang(item, tempData)}</td>
                        <td className="border-2 p-1 align-top align-left" />
                        <td className="border-2 p-1 align-top align-left" />
                      </tr>
  
                      {data.data.map((row) => {
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
                        //return null;
                      })}
  
                      <tr>
                        <td className="border-2 p-1" colSpan={4}></td>
                        
                        <td className="border-2 p-1">Subtotal :</td>
                        <td className="border-2 p-1">{formatter.format(totalNilaiLPB)}</td>
                        <td className="border-2 p-1">{formatter.format(totalRetur)}</td>
                        <td className="border-2 p-1">{formatter.format(totalTunai)}</td>
                        <td className="border-2 p-1">{formatter.format(totalTransfer)}</td>
                        <td className="border-2 p-1">{formatter.format(totalGiro)}</td>
                        <td className="border-2 p-1">{formatter.format(totalSisaHutang)}</td>
                        <td className="border-2 p-1"/>
                        <td className="border-2 p-1"/>
                      </tr>
                      <tr hidden>
                      {totalNilaiLPB = 0}
                      {totalRetur = 0}
                      {totalTunai = 0}
                      {totalTransfer = 0}
                      {totalGiro = 0}
                      {totalSisaHutang = 0}
                      </tr>
  
                      </React.Fragment>
                    );
                  } else {
                    return false;
                  }
                })}
              </tbody>
              </table>
            </div>
              ) : (
              <div hidden></div>
            )}    

            {searchParameters.tipeLaporan === "Rekap" ? (
            <div ref={tableRef}> Rekap
              <table name="pembelian" className="w-full text-xs" >
              <thead>
                <tr className="p-2">
                  <th className="border-2 p-1">No Pembayaran</th>
                  <th className="border-2 p-1">Tgl Bayar</th>
                  <th className="border-2 p-1">Nota Supplier</th>
                  <th className="border-2 p-1">No LPB</th>
                  <th className="border-2 p-1">Tgl LPB</th>
                  <th className="border-2 p-1">Nilai LPB</th>
                  <th className="border-2 p-1">Total Nilai RB</th>
                  <th className="border-2 p-1">Tunai</th>
                  <th className="border-2 p-1">Transfer</th>
                  <th className="border-2 p-1">Giro</th>
                  <th className="border-2 p-1">Saldo Hutang</th>
                  <th className="border-2 p-1">CN</th>
                  <th className="border-2 p-1">DN</th>
                </tr>
              </thead>
              <tbody>
                {supplier.map((item) => {

                  if(searchParameters?.supplier?.id === item.id || searchParameters?.supplier === null){
                    return(
                      <React.Fragment key={item.id}>
                      <tr>
                        <td className="border-2 p-1 align-top" colSpan={4}>Supplier : {item.attributes.name}</td>
                        <td className="border-2 p-1 align-top" colSpan={2}>Tempo : 0</td>
                        <td className="border-2 p-1 align-top" >Saldo Per : </td>
                        <td className="border-2 p-1 align-top" >{rekapTanggal(searchParameters)}</td>
                        <td className="border-2 p-1 align-top align-left" colSpan={3}>{rekapSaldoHutang(item, tempData)}</td>
                        <td className="border-2 p-1 align-top align-left" />
                        <td className="border-2 p-1 align-top align-left" />
                      </tr>

                      {data.data.map((row) => {
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
  
                        }
                        
                      })}

                      <tr>
                        <td className="border-2 p-1" colSpan={4}></td>
                        
                        <td className="border-2 p-1">Subtotal :</td>
                        <td className="border-2 p-1">{formatter.format(totalNilaiLPB)}</td>
                        <td className="border-2 p-1">{formatter.format(totalRetur)}</td>
                        <td className="border-2 p-1">{formatter.format(totalTunai)}</td>
                        <td className="border-2 p-1">{formatter.format(totalTransfer)}</td>
                        <td className="border-2 p-1">{formatter.format(totalGiro)}</td>
                        <td className="border-2 p-1">{formatter.format(totalSisaHutang)}</td>
                        <td className="border-2 p-1"/>
                        <td className="border-2 p-1"/>
                      </tr>
                      <tr hidden>
                      {totalNilaiLPB = 0}
                      {totalRetur = 0}
                      {totalTunai = 0}
                      {totalTransfer = 0}
                      {totalGiro = 0}
                      {totalSisaHutang = 0}
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

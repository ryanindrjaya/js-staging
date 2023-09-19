import Head from "next/head";
import React, { useState, useEffect } from "react";
import LayoutContent from "@iso/components/utility/layoutContent";
import DashboardLayout from "@iso/containers/DashboardLayout/DashboardLayout";
import LayoutWrapper from "@iso/components/utility/layoutWrapper.js";
import router, { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { Input, notification, Select, DatePicker } from "antd";
import TitlePage from "@iso/components/TitlePage/TitlePage";
import Table from "@iso/components/ReactDataTable/Report/PurchaseReturSaleTable";
import SearchSupplier from "@iso/components/Form/AddReport/SearchSupplier";
import SearchLocations from "@iso/components/Form/AddReport/SearchLocations";
import nookies from "nookies";
import tokenVerify from "../../../../authentication/tokenVerify";
import * as XLSX from "xlsx";

Laporan.getInitialProps = async (context) => {
  const cookies = nookies.get(context);

  const req = await fetchData(cookies);
  const user = await req.json();

  const reqDataUser = await fetchUser(cookies);
  const dataUser = await reqDataUser.json();

  const reqLocation = await fetchLocation(cookies);
  const locations = await reqLocation.json();

  const reqPurchasing = await fetchPurchasing(cookies);
  const purchasing = await reqPurchasing.json();

  return {
    props: {
      user,
      dataUser,
      locations,
      purchasing,
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

const fetchPurchasing = async (cookies) => {
  const endpoint =
    process.env.NEXT_PUBLIC_URL +
    "/purchasings?populate[0]=supplier&populate[1]=purchasing_details.product&populate[2]=returs.retur_details.products&filters[status]=Diterima";
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
  const laporan = useSelector((state) => state.Report);
  console.log("data laporan", laporan);
  const user = props.user;
  const dataUser = props?.dataUser;
  const locations = props.locations;
  const purchasing = props.purchasing;
  const [data, setData] = useState(purchasing);
  const router = useRouter();
  const [queryPrint, setQueryPrint] = useState(
    "/purchasings?populate[0]=supplier&populate[1]=purchasing_details.product&populate[2]=returs.retur_details.products"
  );
  const [searchParameters, setSearchParameters] = useState({});
  const dispatch = useDispatch();
  var index = 0;

  // Range Picker
  const { RangePicker } = DatePicker;

  const tableRef = React.useRef(null);
  const handlePrintXLS = () => {
    console.log("handlePrintXLS", tableRef, tableRef.current);
    if (tableRef.current) {
      exportTableToXLSX(tableRef.current);
    }
  };

  // Function to export the table to XLSX
  const exportTableToXLSX = (tableData) => {
    const data = [];
    const headers = [];

    // Extract headers from the first row of the table
    const headerRow = tableData.querySelector("thead tr");
    headerRow.querySelectorAll("th").forEach((th) => {
      headers.push(th.innerText);
    });

    // Extract data from the table rows
    const bodyRows = tableData.querySelectorAll("tbody tr");
    bodyRows.forEach((row) => {
      const rowData = [];
      row.querySelectorAll("td").forEach((td) => {
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
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    // Generate the Excel file
    XLSX.writeFile(workbook, "Laporan Pembelian dan Retur.xlsx");
  };

  const handlePrint = () => {
    // // console.log("data", data.data);
    // router.push("/dashboard/laporan/pembeliandanretur/print/" + searchParameters?.tipeTransaksi);
    // //router.query.data = searchParameters;
    // data.data.forEach(element => {
    //   dispatch({ type: 'ADD_LIST', list: element });
    // });
    const table = tableRef.current;
    if (table) {
      const printWindow = window.open("", "_blank");
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

  const openNotificationWithIcon = (type, title, message) => {
    notification[type]({
      message: title,
      description: message,
    });
  };

  var formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 2,
  });

  function formatMyDate(value, locale = "id-ID") {
    return new Date(value).toLocaleDateString(locale);
  }

  const logOut = () => {
    dispatch(logout());
  };

  useEffect(() => {
    const searchQuery = async () => {
      let query = "";
      let startDate = "";
      let endDate = "";
      let queryTransaksi =
        "/purchasings?populate[0]=supplier&populate[1]=purchasing_details.product&populate[2]=returs.retur_details.products&";

      for (const key in searchParameters) {
        if (key === "tipeTransaksi" && searchParameters[key] !== undefined) {
          if (searchParameters[key] == "Pembelian") {
            queryTransaksi = "/purchasings?populate[0]=supplier&populate[1]=purchasing_details.product&";
          } else if (searchParameters[key] == "Retur") {
            queryTransaksi = "/purchasings?populate[0]=supplier&populate[1]=returs.retur_details.products&";
          } else {
            queryTransaksi =
              "/purchasings?populate[0]=supplier&populate[1]=purchasing_details.product&populate[2]=returs.retur_details.products&";
          }
        } else {
          queryTransaksi =
            "/purchasings?populate[0]=supplier&populate[1]=purchasing_details.product&populate[2]=returs.retur_details.products&";
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

        if (key === "supplier" || key === "location") {
          if (searchParameters[key] !== undefined && searchParameters[key] !== null) {
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

          query += `filters[date_purchasing][$gte]=${startDate}&filters[date_purchasing][$lte]=${endDate}&`;
        } else {
          query += "";
        }
      }

      const endpoint = process.env.NEXT_PUBLIC_URL + queryTransaksi + query;

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

      var allQuery = queryTransaksi + query;
      setQueryPrint(allQuery);
      setData(res);
    };

    if (searchParameters.tipeTransaksi == undefined) {
      searchParameters.tipeTransaksi = "undefined";
    }
    searchQuery();
  }, [searchParameters]);

  useEffect(() => {
    setSearchParameters({ tipeTransaksi: "undefined" });
  }, []);

  return (
    <>
      <Head>
        <title>Laporan pembelian dan retur beli barang </title>
      </Head>
      <DashboardLayout>
        <LayoutWrapper style={{}}>
          <TitlePage titleText={"LAPORAN PEMBELIAN DAN RETUR BELI BARANG"} />
          <LayoutContent>
            <div className="w-full flex justify-start">
              <div className="w-full md:w-1/4 px-3 mb-2">
                <SearchLocations onChangeLocations={(e) => setSearchParameters({ ...searchParameters, location: e })} />
              </div>
              <div className="w-full md:w-1/4 px-3">
                <SearchSupplier onChangeSupplier={(e) => setSearchParameters({ ...searchParameters, supplier: e })} />
              </div>
              <div className="w-full md:w-1/4 px-3">
                <Select
                  placeholder="Tipe Transaksi"
                  size="large"
                  style={{
                    width: "100%",
                    marginRight: "10px",
                  }}
                  allowClear
                  onChange={(e) => setSearchParameters({ ...searchParameters, tipeTransaksi: e })}
                >
                  <Select.Option value="Pembelian">Pembelian</Select.Option>
                  <Select.Option value="Retur">Retur</Select.Option>
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
                >
                  <Select.Option value="Lunas">Lunas</Select.Option>
                  <Select.Option value="Dibayar Sebagian">Dibayar Sebagian</Select.Option>
                  <Select.Option value="Belum Lunas">Belum Lunas</Select.Option>
                </Select>
              </div>
            </div>

            <div className="w-full flex justify-end -mt-4">
              <div className="w-full md:w-1/4 px-3">
                <RangePicker size="large" onChange={(e) => setSearchParameters({ ...searchParameters, range: e })} />
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

            {searchParameters.tipeTransaksi === "Pembelian" ? (
              <div className="justify-between mt-10" ref={tableRef}>
                <div>
                  <h5 className="-mt-10">Laporan Pembelian</h5>
                  <table name="pembelian" className="w-full text-xs">
                    <thead>
                      <tr className="p-2">
                        <th className="border-2 p-1">NO</th>
                        <th className="border-2 p-1">NAMA PRODUK</th>
                        <th className="border-2 p-1">JUMLAH</th>
                        <th className="border-2 p-1">HARGA SATUAN</th>
                        <th className="border-2 p-1">DISC</th>
                        <th className="border-2 p-1">HARGA SATUAN STLH DISKON</th>
                        <th className="border-2 p-1">SUBTOTAL</th>
                      </tr>
                    </thead>
                    {data.data.map((row) => {
                      index++;
                      return (
                        <tbody>
                          <tr>
                            <td className="border-2 p-1 w-fit align-text-top">{index}</td>
                            <td className="border-2 p-1 w-fit">
                              Supplier : {row?.attributes?.supplier?.data?.attributes?.name}
                            </td>
                            <td className="border-2 p-1 w-fit">
                              Tanggal : {formatMyDate(row?.attributes?.date_purchasing)}
                            </td>
                            <td className="border-2 p-1 w-fit">No : {row?.attributes?.no_purchasing}</td>
                            <td className="border-2 p-1 w-fit">No Supplier : {row?.attributes?.no_nota_suppplier}</td>
                            <td className="border-2 p-1 w-fit">
                              Tempo : {row?.attributes?.tempo_days} {row?.attributes?.tempo_time}
                            </td>
                            <td className="border-2 p-1 w-fit"></td>
                          </tr>
                          {row.attributes?.purchasing_details?.data?.map((element, index) => (
                            <tr>
                              <td key={index} className="border-2 p-1 w-fit"></td>
                              <td key={index} className="border-2 p-1 w-fit">
                                {element?.attributes?.product?.data?.attributes?.name}
                              </td>
                              <td key={index} className="border-2 p-1 w-fit">
                                {element?.attributes?.total_order} {element?.attributes?.unit_order}
                              </td>
                              <td key={index} className="border-2 p-1 w-fit">
                                {formatter.format(element?.attributes?.unit_price)}
                              </td>
                              <td key={index} className="border-2 p-1 w-fit">
                                {formatter.format(element?.attributes?.disc ?? 0)}
                                {element?.attributes?.dp1 ?? 0}%{element?.attributes?.dp2 ?? 0}%
                                {element?.attributes?.dp3 ?? 0}%
                              </td>
                              <td key={index} className="border-2 p-1 w-fit">
                                {formatter.format(element?.attributes?.unit_price_after_disc)}
                              </td>
                              <td key={index} className="border-2 p-1 w-fit">
                                {formatter.format(element?.attributes?.sub_total)}
                              </td>
                            </tr>
                          ))}
                          <tr>
                            <td hidden></td>
                            <td hidden></td>
                            <td hidden></td>
                            <td hidden></td>
                            <td hidden></td>
                            <td className="border-2 p-1 text-right mr-2" colspan="6">
                              Subtotal :{" "}
                            </td>
                            <td className="border-2 p-1">
                              {formatter.format(
                                row.attributes?.purchasing_details?.data?.reduce(
                                  (total, row) => (total += row.attributes.sub_total),
                                  0
                                )
                              )}
                            </td>
                          </tr>
                        </tbody>
                      );
                    })}
                  </table>
                </div>
              </div>
            ) : (
              <div hidden></div>
            )}

            {searchParameters.tipeTransaksi === "Retur" ? (
              <div className="justify-between -mt-3" ref={tableRef}>
                <div>
                  <h5 className="mt-3">Laporan Return</h5>
                  <table name="retur" className="w-full text-xs">
                    <thead>
                      <tr className="p-2">
                        <th className="border-2 p-1">NO</th>
                        <th className="border-2 p-1">NAMA PRODUK</th>
                        <th className="border-2 p-1">JUMLAH</th>
                        <th className="border-2 p-1">HARGA SATUAN</th>
                        <th className="border-2 p-1">DISC</th>
                        <th className="border-2 p-1">HARGA SATUAN STLH DISKON</th>
                        <th className="border-2 p-1">SUBTOTAL</th>
                      </tr>
                    </thead>
                    {data.data.map((row) => {
                      return row.attributes?.returs?.data?.length != 0 ? (
                        row.attributes?.returs?.data?.map((element, index) => {
                          index++;
                          return (
                            <tbody>
                              <tr>
                                <td className="border-2 p-1 align-text-top w-fit">{index}</td>
                                <td className="border-2 p-1 w-fit">
                                  Supplier : {row.attributes.supplier.data.attributes.name}
                                </td>
                                <td className="border-2 p-1 w-fit">
                                  Tanggal : {formatMyDate(row.attributes.date_purchasing)}
                                </td>
                                <td className="border-2 p-1 w-fit">No : {element.attributes.no_retur}</td>
                                <td className="border-2 p-1 w-fit">
                                  Nota Supp : {element.attributes.no_nota_suppplier ?? "tidak ada"}
                                </td>
                                <td className="border-2 p-1 w-fit">
                                  Tempo : {row?.attributes?.tempo_days} {row?.attributes?.tempo_time} | No Pembelian :{" "}
                                  {row.attributes.no_purchasing}
                                </td>
                                <td className="border-2 p-1 w-fit"></td>
                              </tr>
                              {element.attributes.retur_details.data.map((item, idx) => (
                                <tr>
                                  <td className="border-2 p-1 w-fit" key={idx}></td>
                                  <td className="border-2 p-1 w-fit" key={idx}>
                                    {item.attributes.products.data[0].attributes.name}
                                  </td>
                                  <td className="border-2 p-1 w-fit">
                                    {item.attributes.qty} {item.attributes.unit}
                                  </td>
                                  <td className="border-2 p-1 w-fit">
                                    {formatter.format(item.attributes.harga_satuan)}
                                  </td>
                                  <td className="border-2 p-1 w-fit" colSpan={2}></td>
                                  <td hidden></td>
                                  <td className="border-2 p-1 w-fit">{formatter.format(item.attributes.sub_total)}</td>
                                </tr>
                              ))}
                              <tr>
                                <td hidden></td>
                                <td hidden></td>
                                <td hidden></td>
                                <td hidden></td>
                                <td hidden></td>
                                <td className="border-2 p-1 text-right mr-2 w-fit" colspan="6">
                                  Subtotal :{" "}
                                </td>
                                <td className="border-2 p-1 w-fit">
                                  {formatter.format(
                                    element.attributes.retur_details.data.reduce(
                                      (total, row) => (total += row.attributes.sub_total),
                                      0
                                    )
                                  )}
                                </td>
                              </tr>
                            </tbody>
                          );
                        })
                      ) : (
                        <tr hidden></tr>
                      );
                    })}
                  </table>
                </div>
              </div>
            ) : (
              <div hidden></div>
            )}

            {searchParameters.tipeTransaksi === "undefined" ? (
              <div className="mt-10" ref={tableRef}>
                <h5 className="-mt-10">Laporan Pembelian</h5>
                <table name="pembelian" className="w-full text-xs">
                  <thead>
                    <tr className="p-2">
                      <th className="border-2 p-1">NO</th>
                      <th className="border-2 p-1">NAMA PRODUK</th>
                      <th className="border-2 p-1">JUMLAH</th>
                      <th className="border-2 p-1">HARGA SATUAN</th>
                      <th className="border-2 p-1">DISC</th>
                      <th className="border-2 p-1">HARGA SATUAN STLH DISKON</th>
                      <th className="border-2 p-1">SUBTOTAL</th>
                    </tr>
                  </thead>
                  {data.data.map((row) => {
                    index++;
                    return (
                      <tbody>
                        <tr>
                          <td className="border-2 p-1 w-fit align-text-top">{index}</td>
                          <td className="border-2 p-1 w-fit">
                            Supplier : {row?.attributes?.supplier?.data?.attributes?.name}
                          </td>
                          <td className="border-2 p-1 w-fit">
                            Tanggal : {formatMyDate(row?.attributes?.date_purchasing)}
                          </td>
                          <td className="border-2 p-1 w-fit">No : {row?.attributes?.no_purchasing}</td>
                          <td className="border-2 p-1 w-fit">No Supplier : {row?.attributes?.no_nota_suppplier}</td>
                          <td className="border-2 p-1 w-fit">
                            Tempo : {row?.attributes?.tempo_days} {row?.attributes?.tempo_time}
                          </td>
                          <td className="border-2 p-1 w-fit"></td>
                        </tr>

                        {row.attributes?.purchasing_details?.data?.map((element, index) => (
                          <tr>
                            <td key={index} className="border-2 p-1 w-fit"></td>
                            <td key={index} className="border-2 p-1 w-fit">
                              {element?.attributes?.product?.data?.attributes?.name}
                            </td>
                            <td key={index} className="border-2 p-1 w-fit">
                              {element?.attributes?.total_order} {element?.attributes?.unit_order}
                            </td>
                            <td key={index} className="border-2 p-1 w-fit">
                              {formatter.format(element?.attributes?.unit_price)}
                            </td>
                            <td key={index} className="border-2 p-1 w-fit">
                              {formatter.format(element?.attributes?.disc ?? 0)}
                              {element?.attributes?.dp1 ?? 0}%{element?.attributes?.dp2 ?? 0}%
                              {element?.attributes?.dp3 ?? 0}%
                            </td>
                            <td key={index} className="border-2 p-1 w-fit">
                              {formatter.format(element?.attributes?.unit_price_after_disc)}
                            </td>
                            <td key={index} className="border-2 p-1 w-fit">
                              {formatter.format(element?.attributes?.sub_total)}
                            </td>
                          </tr>
                        ))}
                        <tr>
                          <td hidden></td>
                          <td hidden></td>
                          <td hidden></td>
                          <td hidden></td>
                          <td hidden></td>
                          <td className="border-2 p-1 text-right mr-2" colspan="6">
                            Subtotal :{" "}
                          </td>
                          <td className="border-2 p-1">
                            {formatter.format(
                              row.attributes?.purchasing_details?.data?.reduce(
                                (total, row) => (total += row.attributes.sub_total),
                                0
                              )
                            )}
                          </td>
                        </tr>
                      </tbody>
                    );
                  })}
                </table>

                <h5 className="mt-3">Laporan Return</h5>
                <table name="retur" className="w-full text-xs">
                  <thead>
                    <tr className="p-2">
                      <th className="border-2 p-1">NO</th>
                      <th className="border-2 p-1">NAMA PRODUK</th>
                      <th className="border-2 p-1">JUMLAH</th>
                      <th className="border-2 p-1">HARGA SATUAN</th>
                      <th className="border-2 p-1">DISC</th>
                      <th className="border-2 p-1">HARGA SATUAN STLH DISKON</th>
                      <th className="border-2 p-1">SUBTOTAL</th>
                    </tr>
                  </thead>
                  {data.data.map((row) => {
                    return row.attributes?.returs?.data?.map((element, index) => {
                      index++;
                      return (
                        <tbody>
                          <tr>
                            <td className="border-2 p-1 align-text-top w-fit">{index}</td>
                            <td className="border-2 p-1 w-fit">
                              Supplier : {row.attributes.supplier.data.attributes.name}
                            </td>
                            <td className="border-2 p-1 w-fit">
                              Tanggal : {formatMyDate(row.attributes.date_purchasing)}
                            </td>
                            <td className="border-2 p-1 w-fit">No : {element.attributes.no_retur}</td>
                            <td className="border-2 p-1 w-fit">
                              Nota Supp : {element.attributes.no_nota_suppplier ?? "tidak ada"}
                            </td>
                            <td className="border-2 p-1 w-fit">
                              Tempo : {row?.attributes?.tempo_days} {row?.attributes?.tempo_time} | No Pembelian :{" "}
                              {row.attributes.no_purchasing}
                            </td>
                            <td className="border-2 p-1 w-fit"></td>
                          </tr>
                          {element.attributes.retur_details.data.map((item, idx) => (
                            <tr>
                              <td className="border-2 p-1 w-fit" key={idx}></td>
                              <td className="border-2 p-1 w-fit" key={idx}>
                                {item.attributes.products.data[0].attributes.name}
                              </td>
                              <td className="border-2 p-1 w-fit">
                                {item.attributes.qty} {item.attributes.unit}
                              </td>
                              <td className="border-2 p-1 w-fit">{formatter.format(item.attributes.harga_satuan)}</td>
                              <td className="border-2 p-1 w-fit" colSpan={2}></td>
                              <td hidden></td>
                              <td className="border-2 p-1 w-fit">{formatter.format(item.attributes.sub_total)}</td>
                            </tr>
                          ))}
                          <tr>
                            <td hidden></td>
                            <td hidden></td>
                            <td hidden></td>
                            <td hidden></td>
                            <td hidden></td>
                            <td className="border-2 p-1 text-right mr-2 w-fit" colspan="6">
                              Subtotal :{" "}
                            </td>
                            <td className="border-2 p-1 w-fit">
                              {formatter.format(
                                element.attributes.retur_details.data.reduce(
                                  (total, row) => (total += row.attributes.sub_total),
                                  0
                                )
                              )}
                            </td>
                          </tr>
                        </tbody>
                      );
                    });
                  })}
                </table>
              </div>
            ) : (
              <div hidden></div>
            )}

            <tokenVerify logOut={logOut} />
          </LayoutContent>
        </LayoutWrapper>
      </DashboardLayout>
    </>
  );
}

export default Laporan;

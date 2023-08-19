import Head from "next/head";
import React, { useState, useEffect, useRef } from "react";
import LayoutContent from "@iso/components/utility/layoutContent";
import DashboardLayout from "@iso/containers/DashboardLayout/DashboardLayout";
import LayoutWrapper from "@iso/components/utility/layoutWrapper.js";
import router, { useRouter } from "next/router";
import { Input, notification, Select, DatePicker, Form, Spin } from "antd";
import TitlePage from "@iso/components/TitlePage/TitlePage";
import Supplier from "@iso/components/Form/AddCost/SupplierForm";
import COATable from "@iso/components/ReactDataTable/Cost/ChartOfAccountTable";
import nookies from "nookies";
import { toast } from "react-toastify";
import moment from "moment";
import cookies from "next-cookies";
import * as XLSX from 'xlsx';

BukuBesar.getInitialProps = async (context) => {
  const cookies = nookies.get(context);

  //const req = await fetchData(cookies);
  //const user = await req.json();

  const reqAkun = await fetchAkun(cookies);
  const akun = await reqAkun.json();

  const reqJurnal = await fetchJurnal(cookies);
  const jurnal = await reqJurnal.json();

  return {
    props: {
      //user,
      akun,
      jurnal
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

const fetchAkun = async (cookies) => {
  const endpoint = process.env.NEXT_PUBLIC_URL + "/chart-of-accounts";
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

const fetchJurnal = async (cookies) => {
  const endpoint = process.env.NEXT_PUBLIC_URL + "/jurnals?populate=*";
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

function BukuBesar({ props }) {
  const user = props.user;
  const akunData = props.akun;
  const [jurnal, setJurnal] = useState(props.jurnal);
  const [defaultDate, setDefaultDate] = useState([moment(), moment()]);

  const tableRef = useRef(null);

  const [saldoAwal, setSaldoAwal] = useState(0);
  const [debitAkhir, setDebitAkhir] = useState(0);
  const [kreditAkhir, setKreditAkhir] = useState(0);
  const [saldoAkhir, setSaldoAkhir] = useState(0);

  const [startDate, setStartDate] = useState(moment());
  const [endDate, setEndDate] = useState(moment());

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
      XLSX.writeFile(workbook, 'Laporan Buku Besar.xlsx');
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
                margin-top: 3%; 
                border: 2px solid #000; /* Add additional border styling as needed */
              }
              th, td {
                border: 1px solid #000; /* Add additional border styling as needed */
                padding: 8px;
              }
              .text-center {
                text-align: center;
              }
              .text-right {
                text-align: right;
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

  const handleDateChange = async (date) => {
    console.log("handleDateChange", date);
    if (date !== null) {
      var startDate = date[0].format('YYYY-MM-DD');
      var endDate = date[1].format('YYYY-MM-DD');

      setStartDate(date[0]);
      setEndDate(date[1]);
  
      const req = await getJurnal(startDate, endDate);
      const res = await req.json();
      
      setDefaultDate(date);
      setJurnal(res);

    } else {
      var startDate = moment().format('YYYY-MM-DD');
      var endDate = moment().format('YYYY-MM-DD');
  
      setStartDate(moment());
      setEndDate(moment());

      const req = await getJurnal(startDate, endDate);
      const res = await req.json();
      
      setDefaultDate([moment(), moment()]);
      setJurnal(res);
    }

  };

  const handleClear = async () => {
    console.log("LOL");
  };
  
  const getJurnal = async (startDate, endDate) => { 

  const cookies = nookies.get(null, "token");
  var query = `&filters[tanggal][$gte]=${startDate}&filters[tanggal][$lte]=${endDate}`;

  const endpoint = process.env.NEXT_PUBLIC_URL + "/jurnals?populate=*" + query;
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + cookies.token,
    },
  };

  const req = await fetch(endpoint, options);
  return req;

  }

  useEffect(() => {
    console.log("jurnal item", jurnal);
    var saldo = 0;
    setSaldoAwal(saldo);
    setDebitAkhir(0);
    setKreditAkhir(0);
    setSaldoAkhir(saldo);

    jurnal?.data?.map((item) => {
      const coaData = item.attributes.chart_of_account.data;
      saldo = item.attributes.chart_of_account.data.attributes.saldo;

      if(coaData.attributes.kode === "111.00.01"){
        setSaldoAwal(saldo);
        setDebitAkhir(parseFloat(item.attributes.debit));
        setKreditAkhir(parseFloat(item.attributes.kredit));
        setSaldoAkhir(saldo += parseFloat(item.attributes.debit) - parseFloat(item.attributes.kredit));
      }
    });

  }, [jurnal]);


  var formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 2,
  });
  
  return (
    <>
      <Head>
        <title>Buku Besar</title>
      </Head>
      <DashboardLayout>
        <LayoutWrapper style={{}}>
          <TitlePage titleText={"Buku Besar"} />
          <LayoutContent>

            <div className="w-full flex justify-between">
              <div>
                <button
                  onClick={handlePrintXLS}
                  type="button"
                  className="bg-cyan-700 rounded px-5 py-2 hover:bg-cyan-800  shadow-sm mb-5 mx-2"
                >
                  <div className="text-white text-center text-sm font-bold">
                    <a className="text-white no-underline text-xs sm:text-xs">Print XLS</a>
                  </div>
                </button>
              </div>
              <div className="w-full md:w-1/2 px-3 mb-2 md:mb-0">
                <DatePicker.RangePicker
                  size="large"
                  defaultValue= {defaultDate}
                  value={defaultDate}
                  onChange= {handleDateChange}
                  renderExtraFooter= {() => 'Pilih tanggal.'}
                />
              </div>
            </div>

            <div className="w-full flex justify-end mb-1">
              <div>
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
            </div>

            {/* Content */}
            <div name="content" ref={tableRef}>
              <div name="title">
                <div className="text-center">BUKU BESAR</div>
                <div className="text-center">Periode tanggal {startDate.format('DD/MM/YYYY')} - {endDate.format('DD/MM/YYYY')}</div>
              </div>

              <table className="w-full mt-5">
                <thead className="text-center">
                  <th className="border-2 p-1">Tanggal</th>
                  <th className="border-2 p-1">No Bukti</th>
                  <th className="border-2 p-1">Cost Center</th>
                  <th className="border-2 p-1">Keterangan</th>
                  <th className="border-2 p-1">Debet</th>
                  <th className="border-2 p-1">Kredit</th>
                  <th className="border-2 p-1">Saldo</th>
                </thead>
                <tbody>
                  <tr>
                    <td className="border-2 text-center"> {startDate.format('DD/MM/YYYY')} - {endDate.format('DD/MM/YYYY')} </td>
                    <td className="border-2 text-center"> - </td>
                    <td className="border-2 text-center"> - </td>
                    <td className="border-2 pl-3 text-left"> Saldo Awal </td>
                    <td className="border-2 pr-3 text-right"> {formatter.format(0)} </td>
                    <td className="border-2 pr-3 text-right"> {formatter.format(0)} </td>
                    <td className="border-2 pr-3 text-right"> {formatter.format(saldoAwal)} </td>
                  </tr>
                  <tr>
                    <td className="border-2 text-center"> {startDate.format('DD/MM/YYYY')} - {endDate.format('DD/MM/YYYY')} </td>
                    <td className="border-2 text-center"> - </td>
                    <td className="border-2 text-center"> - </td>
                    <td className="border-2 pl-3 text-left"> Saldo Akhir </td>
                    <td className="border-2 pr-3 text-right"> {formatter.format(debitAkhir)} </td>
                    <td className="border-2 pr-3 text-right"> {formatter.format(kreditAkhir)} </td>
                    <td className="border-2 pr-3 text-right"> {formatter.format(saldoAkhir)} </td>
                  </tr>
                </tbody>
              </table>
              
            </div>
            
          </LayoutContent>
        </LayoutWrapper>
      </DashboardLayout>
    </>
  );
}

export default BukuBesar;

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

RugiLaba.getInitialProps = async (context) => {
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

function RugiLaba({ props }) {
  const user = props.user;
  const akunData = props.akun;
  const [jurnal, setJurnal] = useState(props.jurnal);
  const [defaultDate, setDefaultDate] = useState(moment());
  const [beforeDate, setBeforelDate] = useState(moment());
  const [untilDate, setUntilDate] = useState(moment());
  const router = useRouter();
  const [akun, setAkun] = useState(akunData);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState();

  // for this month
  const [pendapatan, setPendapatan] = useState([0,0,0]);
  const [bebanPokokPenjualan, setBebanPokokPenjualan] = useState([0,0,0]);
  const [bebanPenjualan, setBebanPenjualan] = useState([0,0,0]);
  const [bebanUmum, setBebanUmum] = useState([0,0,0]);
  const [pendapatanLain, setPendapatanLain] = useState([0,0,0]);
  const [biayaLain, setBiayaLain] = useState([0,0,0]);
  const [labaBruto, setLabaBruto] = useState([0,0,0]);
  const [labaOperasional, setLabaOperasional] = useState([0,0,0]);
  const [labaBelumPajak, setLabaBelumPajak] = useState([0,0,0]);

  //specific data
  const [spec, setSpec] = useState();

  const tableRef = useRef(null);
  const [titleDate, setTitleDate] = useState(null);

  const calculatePrice = (saldo, akun) =>{
    var debit = 0;
    var kredit = 0;
    if(akun.attributes.jenis_akun === true){
      debit = parseFloat(akun.attributes.debit);
      kredit = parseFloat(akun.attributes.kredit);
    }

  }

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
      XLSX.writeFile(workbook, 'Laporan Rugi Laba.xlsx');
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

  const handleDateChange = async (date, dateString) => {
    
    if(date === null){
      setDefaultDate(moment());
      
    } else {
      setPendapatan([0,0,0]);
      setBebanPokokPenjualan([0,0,0]);
      setBebanPenjualan([0,0,0]);
      setBebanUmum([0,0,0]);
      setPendapatanLain([0,0,0]);
      setBiayaLain([0,0,0]);
      setLabaBruto([0,0,0]);
      setLabaOperasional([0,0,0]);
      setLabaBelumPajak([0,0,0]);
      setDefaultDate(date);
      setBeforelDate(date);
      setUntilDate(date);
      
    }
    
  };
  
  const getDataThisMonth = async (date) => {
    var startDate = date.startOf('month').format('YYYY-MM-DD');
    var endDate = date.endOf('month').format('YYYY-MM-DD');
    setTitleDate(date.endOf('month').format('DD-MM-YYYY'));
    
    const req = await getJurnal(startDate, endDate);
    const res = await req.json();
    
    console.log("getDataThisMonth startDate endDate", startDate, endDate);
    setSpec("month");
    setJurnal(res);
  }
  
  const getDataMonthBefore = async (date) => {
    var startDate = date.subtract(1, 'months').startOf('month').format('YYYY-MM-DD');
    var endDate = date.subtract(0, 'months').endOf('month').format('YYYY-MM-DD');
    
    const req = await getJurnal(startDate, endDate);
    const res = await req.json();
    
    console.log("getDataMonthBefore startDate endDate", startDate, endDate);
    setSpec("before");
    setJurnal(res);
  }

  const getDataUntilThisMonth = async (date) => {
    var endDate = date.add(1, 'months').endOf('month').format('YYYY-MM-DD');
    var startDate = date.startOf('year').format('YYYY-MM-DD');
    
    const req = await getJurnal(startDate, endDate);
    const res = await req.json();
    
    console.log("getDataUntilThisMonth startDate endDate", startDate, endDate);
    setSpec("until");
    setJurnal(res);
  }

  const handleClear = async () => {
    setDefaultDate(moment());

    var startDate = moment().startOf('month').format('YYYY-MM-DD');
    var endDate = moment().endOf('month').format('YYYY-MM-DD'); 

    var query = `&filters[tanggal][$gte]=${startDate}&filters[tanggal][$lte]=${endDate}`;
    var endpoint = process.env.NEXT_PUBLIC_URL + `/jurnals?populate=*` + query;
    await getJurnal(cookies, endpoint);
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
    getDataThisMonth(defaultDate);
  }, [defaultDate]);

  useEffect(() => {
    getDataMonthBefore(beforeDate);
  }, [beforeDate]);

  useEffect(() => {
    console.log("until date nich", untilDate);
    getDataUntilThisMonth(untilDate);
  }, [untilDate]);

  var indexEffect = 0;
  useEffect(() => {
    console.log("jurnal item", jurnal, spec);
    
    jurnal?.data?.map((item) => {
      const coaData = item.attributes.chart_of_account.data;
      var saldo = item.attributes.chart_of_account.data.attributes.saldo;
  
      //Pendapatan
      if(coaData.attributes.kode === "400.00.00" || coaData.attributes.kode === "400.01.00"){
        const newData = [...pendapatan];
        if(spec === "month"){
          if (newData[0] === 0) newData[0] = saldo;
          newData[0] += parseFloat(item.attributes.kredit) - parseFloat(item.attributes.debit);
        } else if (spec === "before"){
          if (newData[1] === 0) newData[1] = saldo;
          newData[1] += parseFloat(item.attributes.kredit) - parseFloat(item.attributes.debit);
        } else if (spec === "until"){
          if (newData[2] === 0) newData[2] = saldo;
          newData[2] += parseFloat(item.attributes.kredit) - parseFloat(item.attributes.debit);
        }

        setPendapatan(newData);
  
      } else if(coaData.attributes.kode === "401.01.00" || coaData.attributes.kode === "402.01.00"){
        const newData = [...pendapatan];
        if(spec === "month"){
          if (newData[0] === 0) newData[0] = saldo;
          newData[0] += parseFloat(item.attributes.debit) - parseFloat(item.attributes.kredit);
        } else if (spec === "before"){
          if (newData[1] === 0) newData[1] = saldo;
          newData[1] += parseFloat(item.attributes.debit) - parseFloat(item.attributes.kredit);
        } else if (spec === "until"){
          if (newData[2] === 0) newData[2] = saldo;
          newData[2] += parseFloat(item.attributes.debit) - parseFloat(item.attributes.kredit);
        }
        
        setPendapatan(newData);
      }
  
      // HPP
      if(coaData.attributes.kode === "500.00.00" || coaData.attributes.kode === "500.00.01"
      ){
        const newData = [...bebanPokokPenjualan];
        if(spec === "month"){
          if (newData[0] === 0) newData[0] = saldo;
          newData[0] += parseFloat(item.attributes.debit) - parseFloat(item.attributes.kredit);
        } else if (spec === "before"){
          if (newData[1] === 0) newData[1] = saldo;
          newData[1] += parseFloat(item.attributes.debit) - parseFloat(item.attributes.kredit);
        } else if (spec === "until"){
          if (newData[2] === 0) newData[2] = saldo;
          newData[2] += parseFloat(item.attributes.debit) - parseFloat(item.attributes.kredit);
        }

        setBebanPokokPenjualan(newData);
      }
  
      //Beban Penjualan dan Administrasi
      if(coaData.attributes.kode === "610.00.00" || coaData.attributes.kode === "610.00.01" ||
        coaData.attributes.kode === "610.00.02" || coaData.attributes.kode === "610.00.03" ||
        coaData.attributes.kode === "610.00.04" || coaData.attributes.kode === "610.00.05" ||
        coaData.attributes.kode === "610.00.06"
      ){
        const newData = [...bebanPenjualan];
        if(spec === "month"){
          if (newData[0] === 0) newData[0] = saldo;
          newData[0] += parseFloat(item.attributes.debit) - parseFloat(item.attributes.kredit);
        } else if (spec === "before"){
          if (newData[1] === 0) newData[1] = saldo;
          newData[1] += parseFloat(item.attributes.debit) - parseFloat(item.attributes.kredit);
        } else if (spec === "until"){
          if (newData[2] === 0) newData[2] = saldo;
          newData[2] += parseFloat(item.attributes.debit) - parseFloat(item.attributes.kredit);
        }

        setBebanPenjualan(newData);
      }
  
      if(coaData.attributes.kode === "710.00.00" || coaData.attributes.kode === "710.00.01" || coaData.attributes.kode === "710.00.02" ||
        coaData.attributes.kode === "710.00.03" || coaData.attributes.kode === "710.00.04" || coaData.attributes.kode === "710.00.05" ||
        coaData.attributes.kode === "710.00.06" || coaData.attributes.kode === "710.00.07" || coaData.attributes.kode === "710.00.08" ||
        coaData.attributes.kode === "710.00.09" || coaData.attributes.kode === "710.00.10" || coaData.attributes.kode === "710.00.11" ||
        coaData.attributes.kode === "710.00.12" || coaData.attributes.kode === "710.00.13" || coaData.attributes.kode === "710.00.14" ||
        coaData.attributes.kode === "710.00.15" || coaData.attributes.kode === "710.00.16" || coaData.attributes.kode === "710.00.17" ||
        coaData.attributes.kode === "710.00.18" || coaData.attributes.kode === "710.00.19" || coaData.attributes.kode === "710.00.20" ||
        coaData.attributes.kode === "710.00.21" || coaData.attributes.kode === "710.00.22" || coaData.attributes.kode === "710.00.23" ||
        coaData.attributes.kode === "710.00.24" || coaData.attributes.kode === "710.00.25" || coaData.attributes.kode === "710.00.26" ||
        coaData.attributes.kode === "710.00.27" || coaData.attributes.kode === "710.00.28" || coaData.attributes.kode === "710.00.29" ||
        coaData.attributes.kode === "710.00.30" || coaData.attributes.kode === "710.00.31" || coaData.attributes.kode === "710.00.32" ||
        coaData.attributes.kode === "710.00.33" || coaData.attributes.kode === "710.00.34" || coaData.attributes.kode === "710.00.35" ||
        coaData.attributes.kode === "710.00.36" || coaData.attributes.kode === "710.00.37" || coaData.attributes.kode === "710.00.38" ||
        coaData.attributes.kode === "710.00.39" || coaData.attributes.kode === "710.00.40" || coaData.attributes.kode === "710.00.41"
      ){
        const newData = [...bebanUmum];
        if(spec === "month"){
          if (newData[0] === 0) newData[0] = saldo;
          newData[0] += parseFloat(item.attributes.debit) - parseFloat(item.attributes.kredit);
        } else if (spec === "before"){
          if (newData[1] === 0) newData[1] = saldo;
          newData[1] += parseFloat(item.attributes.debit) - parseFloat(item.attributes.kredit);
        } else if (spec === "until"){
          if (newData[2] === 0) newData[2] = saldo;
          newData[2] += parseFloat(item.attributes.debit) - parseFloat(item.attributes.kredit);
        }

        setBebanUmum(newData);
      }
  
      //Pendapatan dan Biaya lain - lain
      if(coaData.attributes.kode === "811.01.00" || coaData.attributes.kode === "811.01.01" || coaData.attributes.kode === "811.01.02" ||
        coaData.attributes.kode === "811.01.03" || coaData.attributes.kode === "811.01.04" || coaData.attributes.kode === "811.01.05" ||
        coaData.attributes.kode === "811.01.06" || coaData.attributes.kode === "811.01.07"
      ){
        const newData = [...pendapatanLain];
        if(spec === "month"){
          if (newData[0] === 0) newData[0] = saldo;
          newData[0] += parseFloat(item.attributes.kredit) - parseFloat(item.attributes.debit);
        } else if (spec === "before"){
          if (newData[1] === 0) newData[1] = saldo;
          newData[1] += parseFloat(item.attributes.kredit) - parseFloat(item.attributes.debit);
        } else if (spec === "until"){
          if (newData[2] === 0) newData[2] = saldo;
          newData[2] += parseFloat(item.attributes.kredit) - parseFloat(item.attributes.debit);
        }

        setPendapatanLain(newData); console.log(newData, "newData");
      }
      
      if(coaData.attributes.kode === "822.01.02" || coaData.attributes.kode === "822.01.03" || coaData.attributes.kode === "822.01.08" ||
         coaData.attributes.kode === "822.01.09" || coaData.attributes.kode === "822.01.99" || coaData.attributes.kode === "123.00.00"
      ){
        const newData = [...biayaLain];
        if(spec === "month"){
          if (newData[0] === 0) newData[0] = saldo;
          newData[0] += parseFloat(item.attributes.debit) - parseFloat(item.attributes.kredit);
        } else if (spec === "before"){
          if (newData[1] === 0) newData[1] = saldo;
          newData[1] += parseFloat(item.attributes.debit) - parseFloat(item.attributes.kredit);
        } else if (spec === "until"){
          if (newData[2] === 0) newData[2] = saldo;
          newData[2] += parseFloat(item.attributes.debit) - parseFloat(item.attributes.kredit);
        }

        setBiayaLain(newData);
      }
      
      if(coaData.attributes.kode === "822.01.01"){
        var data = biayaLain;
        setBiayaLain(data += parseFloat(item.attributes.kredit) - parseFloat(item.attributes.debit));
      }
  
    });

    if(indexEffect === 3){
      indexEffect = 0;
      setDefaultDate(defaultDate);
    } else {
      setDefaultDate(defaultDate);
      indexEffect++;
    }

  }, [jurnal]);


  var formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 2,
  });
  
  return (
    <>
      <Head>
        <title>Rugi Laba</title>
      </Head>
      <DashboardLayout>
        <LayoutWrapper style={{}}>
          <TitlePage titleText={"Rugi Laba"} />
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
              <div>
                <DatePicker.MonthPicker
                  placeholder="Pilih Bulan dan Tahun"
                  format="MMMM YYYY"
                  size="large"
                  defaultValue= {defaultDate}
                  value={defaultDate}
                  allowClear
                  onChange= {handleDateChange}
                  onClear={handleClear}
                  renderExtraFooter= {() => 'Pilih bulan dan tahun'}
                  style= {{ width: '200px' }}
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
                <div className="text-center">KEELOLA</div>
                <div className="text-center">Laporan Rugi Laba</div>
                <div className="text-center">Untuk Periode Yang Berakhir {titleDate}</div>
              </div>

              <table className="w-full mt-5">
                <thead className="text-center">
                  <th className="border-2 p-1" colSpan={2}>Keterangan</th>
                  <th className="border-2 p-1">Bulan Ini</th>
                  <th className="border-2 p-1">Bulan Lalu</th>
                  <th className="border-2 p-1">s/d Bulan Ini</th>
                </thead>
                <tbody>
                  <tr>
                    <td className="border-2 p-1" colSpan={5}>Pendapatan</td>
                  </tr>
                  <tr>
                    <td className="border-2 p-1"></td>
                    <td className="border-2 p-1">Penjualan Obat dan Alkes</td>
                    <td className="border-2 pr-3 text-right">{formatter.format(pendapatan[0])}</td>
                    <td className="border-2 pr-3 text-right">{formatter.format(pendapatan[1])}</td>
                    <td className="border-2 pr-3 text-right">{formatter.format(pendapatan[2])}</td>
                  </tr>
                  <tr>
                    <td className="border-2 p-1"></td>
                    <td className="border-2 p-1">Total Pendapatan</td>
                    <td className="border-2 pr-3 text-right">-</td>
                    <td className="border-2 pr-3 text-right">{formatter.format(pendapatan[1])}</td>
                    <td className="border-2 pr-3 text-right">{formatter.format(pendapatan[2])}</td>
                  </tr>
                  <tr>
                    <td className="border-2 p-1" colSpan={5}>Beban Pokok Penjualan</td>
                  </tr>
                  <tr>
                    <td className="border-2 p-1"></td>
                    <td className="border-2 p-1">Harga Pokok Penjualan Obat dan Alkes</td>
                    <td className="border-2 pr-3 text-right">{formatter.format(bebanPokokPenjualan[0])}</td>
                    <td className="border-2 pr-3 text-right">{formatter.format(bebanPokokPenjualan[1])}</td>
                    <td className="border-2 pr-3 text-right">{formatter.format(bebanPokokPenjualan[2])}</td>
                  </tr>
                  <tr>
                    <td className="border-2 p-1"></td>
                    <td className="border-2 p-1">Total Beban Pokok Pendapatan</td>
                    <td className="border-2 pr-3 text-right">-</td>
                    <td className="border-2 pr-3 text-right">{formatter.format(bebanPokokPenjualan[1])}</td>
                    <td className="border-2 pr-3 text-right">{formatter.format(bebanPokokPenjualan[2])}</td>
                  </tr>
                  <tr>
                    <td className="border-2 p-2" colSpan={5}/> 
                  </tr>
                  <tr>
                    <td className="border-2 p-1" colSpan={2}>Laba Bruto</td>
                    <td className="border-2 pr-3 text-right">-</td>
                    <td className="border-2 pr-3 text-right">{formatter.format(pendapatan[1] - bebanPokokPenjualan[1])}</td>
                    <td className="border-2 pr-3 text-right">{formatter.format(pendapatan[2] - bebanPokokPenjualan[2])}</td>
                  </tr>
                  <tr>
                    <td className="border-2 p-2" colSpan={5}/> 
                  </tr>
                  <tr>
                    <td className="border-2 p-1" colSpan={5}>Beban Penjualan dan Administrasi</td>
                  </tr>
                  <tr>
                    <td className="border-2 p-1"></td>
                    <td className="border-2 p-1">Beban Penjualan</td>
                    <td className="border-2 pr-3 text-right">{formatter.format(bebanPenjualan[0])}</td>
                    <td className="border-2 pr-3 text-right">{formatter.format(bebanPenjualan[1])}</td>
                    <td className="border-2 pr-3 text-right">{formatter.format(bebanPenjualan[2])}</td>
                  </tr>
                  <tr>
                    <td className="border-2 p-1"></td>
                    <td className="border-2 p-1">Beban Umum dan Administrasi</td>
                    <td className="border-2 pr-3 text-right">{formatter.format(bebanUmum[0])}</td>
                    <td className="border-2 pr-3 text-right">{formatter.format(bebanUmum[1])}</td>
                    <td className="border-2 pr-3 text-right">{formatter.format(bebanUmum[2])}</td>
                  </tr>
                  <tr>
                    <td className="border-2 p-1"></td>
                    <td className="border-2 p-1">Total Beban Penjualan dan Administrasi</td>
                    <td className="border-2 pr-3 text-right">{formatter.format(bebanPenjualan[0] + bebanUmum[0])}</td>
                    <td className="border-2 pr-3 text-right">{formatter.format(bebanPenjualan[1] + bebanUmum[1])}</td>
                    <td className="border-2 pr-3 text-right">{formatter.format(bebanPenjualan[2] + bebanUmum[2])}</td>
                  </tr>
                  <tr>
                    <td className="border-2 p-2" colSpan={5}/> 
                  </tr>
                  <tr>
                    <td className="border-2 p-1" colSpan={2}>Laba Operasional</td>
                    <td className="border-2 pr-3 text-right">
                      {formatter.format((pendapatan[0] - bebanPokokPenjualan[0]) - (bebanPenjualan[0] + bebanUmum[0]))}
                    </td>
                    <td className="border-2 pr-3 text-right">
                      {formatter.format((pendapatan[1] - bebanPokokPenjualan[1]) - (bebanPenjualan[1] + bebanUmum[1]))}
                    </td>
                    <td className="border-2 pr-3 text-right">
                      {formatter.format((pendapatan[2] - bebanPokokPenjualan[2]) - (bebanPenjualan[2] + bebanUmum[2]))}
                    </td>
                  </tr>
                  <tr>
                    <td className="border-2 p-2" colSpan={5}/> 
                  </tr>
                  <tr>
                    <td className="border-2 p-1" colSpan={5}>Pendapatan dan Biaya lain - lain</td>
                  </tr>
                  <tr>
                    <td className="border-2 p-1"></td>
                    <td className="border-2 p-1">Pendapatan lain - lain</td>
                    <td className="border-2 pr-3 text-right">{formatter.format(pendapatanLain[0])}</td>
                    <td className="border-2 pr-3 text-right">{formatter.format(pendapatanLain[1])}</td>
                    <td className="border-2 pr-3 text-right">{formatter.format(pendapatanLain[2])}</td>
                  </tr>
                  <tr>
                    <td className="border-2 p-1"></td>
                    <td className="border-2 p-1">Biaya lain - lain</td>
                    <td className="border-2 pr-3 text-right">{formatter.format(biayaLain[0])}</td>
                    <td className="border-2 pr-3 text-right">{formatter.format(biayaLain[1])}</td>
                    <td className="border-2 pr-3 text-right">{formatter.format(biayaLain[2])}</td>
                  </tr>
                  <tr>
                    <td className="border-2 p-1"></td>
                    <td className="border-2 p-1">Total Pendapatan (Biaya lain - lain)</td>
                    <td className="border-2 pr-3 text-right">{formatter.format(pendapatanLain[0] - biayaLain[0])}</td>
                    <td className="border-2 pr-3 text-right">{formatter.format(pendapatanLain[1] - biayaLain[1])}</td>
                    <td className="border-2 pr-3 text-right">{formatter.format(pendapatanLain[2] - biayaLain[2])}</td>
                  </tr>
                  <tr>
                    <td className="border-2 p-2" colSpan={5}/> 
                  </tr>
                  <tr>
                    <td className="border-2 p-1" colSpan={2}>Laba Sebelum Pajak</td>
                    <td className="border-2 pr-3 text-right">
                      {formatter.format((pendapatan[0] - bebanPokokPenjualan[0]) - (bebanPenjualan[0] + bebanUmum[0]) + (pendapatanLain[0] - biayaLain[0]))}
                    </td>
                    <td className="border-2 pr-3 text-right">
                      {formatter.format((pendapatan[1] - bebanPokokPenjualan[1]) - (bebanPenjualan[1] + bebanUmum[1]) + (pendapatanLain[1] - biayaLain[1]))}
                    </td>
                    <td className="border-2 pr-3 text-right">
                      {formatter.format((pendapatan[2] - bebanPokokPenjualan[2]) - (bebanPenjualan[2] + bebanUmum[2]) + (pendapatanLain[2] - biayaLain[2]))}
                    </td>
                  </tr>
                  <tr>
                    <td className="border-2 p-2" colSpan={5}/> 
                  </tr>
                  <tr>
                    <td className="border-2 p-1" colSpan={2}>Pajak Penghasilan</td>
                    <td className="border-2 pr-3 text-right">{formatter.format(0)}</td>
                    <td className="border-2 pr-3 text-right">{formatter.format(0)}</td>
                    <td className="border-2 pr-3 text-right">{formatter.format(0)}</td>
                  </tr>
                  <tr>
                    <td className="border-2 p-2" colSpan={5}/> 
                  </tr>
                  <tr>
                    <td className="border-2 p-1" colSpan={2}>Laba Setelah Pajak</td>
                    <td className="border-2 pr-3 text-right">
                      {formatter.format((pendapatan[0] - bebanPokokPenjualan[0]) - (bebanPenjualan[0] + bebanUmum[0]) + (pendapatanLain[0] - biayaLain[0]) - 0)}
                    </td>
                    <td className="border-2 pr-3 text-right">
                      {formatter.format((pendapatan[1] - bebanPokokPenjualan[1]) - (bebanPenjualan[1] + bebanUmum[1]) + (pendapatanLain[1] - biayaLain[1]) - 0)}
                    </td>
                    <td className="border-2 pr-3 text-right">
                      {formatter.format((pendapatan[2] - bebanPokokPenjualan[2]) - (bebanPenjualan[2] + bebanUmum[2]) + (pendapatanLain[2] - biayaLain[2]) - 0)}
                    </td>
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

export default RugiLaba;

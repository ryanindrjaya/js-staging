import Head from "next/head";
import React, { useState, useEffect, useRef } from "react";
import LayoutContent from "@iso/components/utility/layoutContent";
import DashboardLayout from "@iso/containers/DashboardLayout/DashboardLayout";
import LayoutWrapper from "@iso/components/utility/layoutWrapper.js";
import router, { useRouter } from "next/router";
import { Input, notification, Select, DatePicker, Form, Spin, Pagination, Table } from "antd";
import TitlePage from "@iso/components/TitlePage/TitlePage";
import SearchCOA from "@iso/components/Form/AddReport/SearchCOA";
import COATable from "@iso/components/ReactDataTable/Cost/ChartOfAccountTable";
import nookies from "nookies";
import { LoadingOutlined } from "@ant-design/icons";
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

  const reqSaldo = await fetchSaldo(cookies);
  const saldo = await reqSaldo.json();

  return {
    props: {
      //user,
      akun,
      jurnal,
      saldo
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

const fetchSaldo = async (cookies, coa = null, startDate = moment(), endDate = moment()) => {
  const endpoint = new URL(process.env.NEXT_PUBLIC_URL + "/neraca-detail");
  endpoint.searchParams.append("coa", coa ?? null);
  endpoint.searchParams.append("startDate", startDate);
  endpoint.searchParams.append("endDate", endDate);
  endpoint.searchParams.append("periode", startDate);
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
  const [jurnal, setJurnal] = useState();
  const [defaultDate, setDefaultDate] = useState([moment(), moment()]);

  const tableRef = useRef(null);

  const [debitAwal, setDebitAwal] = useState(0);
  const [kreditAwal, setKreditAwal] = useState(0);
  const [saldoAwal, setSaldoAwal] = useState(0);
  const [debitAkhir, setDebitAkhir] = useState(0);
  const [kreditAkhir, setKreditAkhir] = useState(0);
  const [saldoAkhir, setSaldoAkhir] = useState(0);
  const [tempSaldo, setTempSaldo] = useState(0);

  const [startDate, setStartDate] = useState(moment());
  const [endDate, setEndDate] = useState(moment());

  //Akun COA
  const [akunCOA, setAkunCOA] = useState();

  //Data Before
  const [dataBefore, setDataBefore] = useState();

  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  // Calculate the start and end indices for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = jurnal?.meta?.pagination?.total;
  // Get the data to display for the current page
  const pageData = jurnal?.data?.slice(startIndex, endIndex);

  //untuk Table
  const { Column, Summary } = Table;

  const [isLoading, setIsLoading] = useState(false);
  var saldoForData = 0;

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
      XLSX.writeFile(workbook, 'Laporan '+ akunCOA?.attributes?.kode +' - '+ akunCOA?.attributes?.nama +'.xlsx');
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
    setIsLoading(true);

    
    if (date !== null) {
      var startDate = date[0].format('YYYY-MM-DD');
      var endDate = date[1].format('YYYY-MM-DD');

      setStartDate(date[0]);
      setEndDate(date[1]);
      
      const req = await getJurnal(startDate, endDate, null, currentPage);
      const res = await req.json();
      
      setDefaultDate(date);
      if (akunCOA !== undefined) setJurnal(res);
      else setJurnal();

    } else {
      var startDate = moment().format('YYYY-MM-DD');
      var endDate = moment().format('YYYY-MM-DD');
  
      setStartDate(moment());
      setEndDate(moment());

      const req = await getJurnal(startDate, endDate, null, currentPage);
      const res = await req.json();
      
      setDefaultDate([moment(), moment()]);
      if (akunCOA !== undefined) setJurnal(res);
      else setJurnal();
    }

    setIsLoading(false);
  };

  const handlePage = async (page) => {
    setIsLoading(true);
      setCurrentPage(page);
    setIsLoading(false);
  };

  // const handlePageChange = async (page) => {
  //   try {
  //     setCurrentPage(page);

  //     var startDate = moment(startDate).format('YYYY-MM-DD');
  //     var endDate = moment(endDate).format('YYYY-MM-DD');

  //     const req = await getJurnal(startDate, endDate, null, page);
  //     const res = await req.json(); console.log(page, req, res.data);
  //     if (res) {
  //       setJurnal(res.data);
  //       // setJurnal((prevData) => ({
  //       //   data: filterDuplicateData(prevData.data.concat(res.data)),
  //       //   meta: prevData.meta,
  //       // }));
  //     } else {
  //       console.log("something is wrong");
  //     }
      
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleClear = async () => {
    console.log("LOL");
  };
  
  const getJurnal = async (startDate, endDate, data, page) => {

    const cookies = nookies.get(null, "token");
    var query = `&filters[tanggal][$gte]=${startDate}&filters[tanggal][$lte]=${endDate}`;

    if (data === true){
      query = `&filters[tanggal][$lte]=${endDate}`;
    } 

    if(akunCOA){
      query += "&filters[chart_of_account][id][$eq]="+ akunCOA.id;
    }

    const endpoint = process.env.NEXT_PUBLIC_URL + "/jurnals?populate=*" + query; console.log("query", endpoint);
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

  const getSaldoAwal = async (date) => { console.log("getSaldoAwal");

    const cookies = nookies.get();
    const reqSaldo = await fetchSaldo(cookies, akunCOA?.attributes?.kode, moment(date[0]), moment(date[1]));
    const response = await reqSaldo.json(); console.log("response saldos", response, akunCOA);

    var saldo = 0;
    var debit = 0;
    var kredit = 0;

    
    saldo = response?.saldoAwal?.hasil?.saldo;
    debit = response?.saldoAwal?.hasil?.debit;
    kredit = response?.saldoAwal?.hasil?.kredit;
    console.log("response saldos", saldo, debit, kredit);
    

    setDebitAwal(debit);
    setKreditAwal(kredit);
    
    console.log("responses", saldo, debit, kredit);
    if(akunCOA.attributes.jenis_akun === true){
      setSaldoAwal(saldo + (debit - kredit));
    } else if(akunCOA.attributes.jenis_akun === false){
      setSaldoAwal(saldo + (kredit - debit));
    } 
    
    if(saldo === null && debit === null && kredit === null){
      setDebitAwal(0);
      setKreditAwal(0);
      setSaldoAwal(akunCOA?.attributes?.saldo);
    }
  
    if(saldo === undefined && debit === undefined && kredit === undefined){
    setDebitAwal(0);
    setKreditAwal(0);
    setSaldoAwal(akunCOA?.attributes?.saldo);
    }


  }

  const calculateBefore = async () => {
    const minusOneDay = startDate.clone().subtract(1, 'day');
    const req = await getJurnal(null, minusOneDay.format('YYYY-MM-DD'), true);
    const res = await req.json();

    //if (akunCOA) setSaldoAwal(akunCOA.attributes.saldo);
    setDataBefore(res);
  };

  useEffect(() => { console.log(jurnal, "jurnal data");
    setIsLoading(true);

    var saldo = 0;
    var debitawal = 0;
    var kreditawal = 0;
    var debitakhir = 0;
    var kreditakhir = 0;
    
    if(akunCOA !== undefined && startDate && endDate && akunCOA){

      saldo = akunCOA.attributes.saldo;
      saldo = saldoAwal;

      if (akunCOA.attributes.jenis_akun === true) {
        saldo = (saldo + debitawal) - kreditawal;
        //setSaldoAwal(saldo);
      }
      else if (akunCOA.attributes.jenis_akun === false) {
        saldo = (saldo + kreditawal) - debitawal;
        //setSaldoAwal(saldo);
      }

      jurnal?.data?.map((item) => {
        const coaData = item.attributes.chart_of_account.data;
        //saldo = item.attributes.chart_of_account.data.attributes.saldo;

          if(coaData.attributes.kode === akunCOA.attributes.kode){
            //setSaldoAwal(saldo);
            debitakhir += parseFloat(item.attributes.debit);
            kreditakhir += parseFloat(item.attributes.kredit);
          }
        
      });

      if (jurnal?.data?.length > 0){
        setDebitAkhir(debitakhir);
        setKreditAkhir(kreditakhir);
      } else {
        setDebitAkhir(0);
        setKreditAkhir(0);
      }

      if(akunCOA.attributes.jenis_akun === true) {
        saldo = (saldo + debitakhir) - kreditakhir;
        setSaldoAkhir(saldo);
      } else if (akunCOA.attributes.jenis_akun === false){
        saldo = (saldo + kreditakhir) - debitakhir;
        setSaldoAkhir(saldo);
      }

    } else {
      // setSaldoAwal(0);
      // setSaldoAkhir(0);
    }
    
    if (akunCOA === undefined){
      setSaldoAwal(0);
      setSaldoAkhir(0);
      setDebitAwal(0);
      setKreditAwal(0);
      setDebitAkhir(0);
      setKreditAkhir(0);
    }

    setIsLoading(false);
  }, [jurnal]);

  // useEffect(() => {
  //   setIsLoading(true);
  //   const handlePageChange = async () => {

  //   const cookies = nookies.get(null, "token");
  //   const endpoint = process.env.NEXT_PUBLIC_URL + 
  //   `&filters[tanggal][$gte]=${startDate}&filters[tanggal][$lte]=${endDate}` +
  //   "&filters[chart_of_account][id][$eq]="+ akunCOA?.id +
  //   "&pagination[page]=" + page +
  //   "/jurnals?populate=*&pagination[page]=" + currentPage;

  //   const options = {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer " + cookies.token,
  //     },
  //   };

  //   try {
  //     const req = await fetch(endpoint, options);
  //     const res = await req.json(); console.log(currentPage, req, res, "res change");
  //     if (res && jurnal) {
  //       setJurnal((prevData) => ({
  //         data: filterDuplicateData(prevData.data.concat(res.data)),
  //         meta: prevData.meta,
  //       }));
  //     } else {
  //       console.log("something is wrong");
  //     }
      
  //   } catch (error) {
  //     console.log(error);
  //   }

  //     // try {
  
  //     //   var startDate = moment(startDate).format('YYYY-MM-DD');
  //     //   var endDate = moment(endDate).format('YYYY-MM-DD');
  
  //     //   const req = await getJurnal(startDate, endDate, null, currentPage);
  //     //   const res = await req.json(); console.log(currentPage, req, res, "res data");
  //     //   if (res) {
  //     //     const newData = res.data;
  //     //     if (jurnal) setJurnal(prevData => [...prevData, ...newData]);
  //     //     // setJurnal(res.data);
  //     //     // setJurnal((prevData) => ({
  //     //     //   data: filterDuplicateData(prevData.data.concat(res.data)),
  //     //     //   meta: prevData.meta,
  //     //     // }));
  //     //   } else {
  //     //     console.log("something is wrong");
  //     //   }
        
  //     // } catch (error) {
  //     //   console.log(error);
  //     // }
  //   };

  //   handlePageChange();

  //   const filterDuplicateData = (arr) => {
  //     const seen = new Set();
  
  //     const filteredArr = arr.filter((el) => {
  //       const duplicate = seen.has(el.id);
  //       seen.add(el.id);
  //       return !duplicate;
  //     });
  
  //     return filteredArr;
  //   };
  //   setIsLoading(false);
  // }, [currentPage]);

  useEffect(() => {
    setIsLoading(true);
    handleDateChange([startDate, endDate]);
    if (akunCOA) {
      //setSaldoAwal(akunCOA.attributes.saldo);
      getSaldoAwal([startDate, endDate]);
    } 
    //calculateBefore();
    setIsLoading(false);
  }, [startDate, endDate, akunCOA]);

  useEffect(() => {
    if (debitAkhir && kreditAkhir) setSaldoAkhir(akunCOA?.attributes?.saldo + (debitAkhir - kreditAkhir));
    else setSaldoAkhir(0);
  }, [debitAkhir, kreditAkhir]);

  useEffect(() => {
    handleDateChange(defaultDate);
  }, []);


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
              <div className="w-1/3">
                <SearchCOA onChange={setAkunCOA} selectedAkun={akunCOA}/>
              </div>
              <div>
                <DatePicker.RangePicker
                  size="large"
                  defaultValue= {defaultDate}
                  value={defaultDate}
                  onChange= {handleDateChange}
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
            {isLoading ? (
              <div className="flex w-full justify-center mt-20">
                <LoadingOutlined style={{ fontSize: "50px" }} />
              </div>
            ) : (
            <div name="content" ref={tableRef}>
              <div name="title">
                <div className="text-center">{akunCOA?.attributes?.kode} - {akunCOA?.attributes?.nama} (PT SEJATI)</div>
                <div className="text-center">Periode tanggal {startDate.format('DD/MM/YYYY')} - {endDate.format('DD/MM/YYYY')}</div>
                {/* <div className="text-center">{akunCOA?.attributes?.nama}</div> */}
              </div>

              <table className="w-full mt-3">
                {/* <thead className="text-center">
                </thead> */}
                <tbody>
                  <tr className="text-center">
                    <th className="border-2 p-1">Tanggal</th>
                    <th className="border-2 p-1">Nomor Referensi</th>
                    <th className="border-2 p-1">Jenis</th>
                    <th className="border-2 p-1">Pembuat</th>
                    <th className="border-2 p-1">Keterangan</th>
                    <th className="border-2 p-1">Debet</th>
                    <th className="border-2 p-1">Kredit</th>
                    <th className="border-2 p-1">Saldo</th>
                  </tr>
                  <tr>
                    <td className="border-2 p-2 text-center"> {startDate.format('DD/MM/YYYY')} </td>
                    <td className="border-2 text-center"> - </td>
                    <td className="border-2 text-center"> - </td>
                    <td className="border-2 text-center"> - </td>
                    <td className="border-2 p-1 text-left"> Saldo Awal </td>
                    <td className="border-2 p-2 text-right"> {formatter.format(debitAwal)} </td>
                    <td className="border-2 p-2 text-right"> {formatter.format(kreditAwal)} </td>
                    <td className="border-2 p-2 text-right"> {formatter.format(saldoAwal)} </td>
                  </tr>

                  {jurnal?.data?.map((item, index) => {
                    var dateBaru = moment(item.attributes.publishedAt);
                    if (index === 0) item.saldoAwal = saldoAwal;
                    else item.saldoAwal = saldoForData;

                    if (akunCOA?.attributes?.jenis_akun === true) {
                      item.saldoAwal += item?.attributes?.debit - item?.attributes?.kredit;
                      saldoForData = item.saldoAwal;
                    }
                    else if (akunCOA?.attributes?.jenis_akun === false) {
                      item.saldoAwal += item?.attributes?.kredit - item?.attributes?.debit;
                      saldoForData = item.saldoAwal;
                    } 

                    // Example input string
                    //const inputString = "Store Transaction with Code AM/001/01/2023";
                    const inputString = item.attributes.catatan;
                    

                    // Use a regular expression to match the pattern after "Code "
                    const regex = /kode (\S+)/;
                    const regexBetween = /Transaksi (.*?) dengan/;

                    // Use the exec method to find the pattern in the string
                    const match = regex.exec(inputString);
                    const matchBetween = regexBetween.exec(inputString);
                    var codeValue = "-";
                    var codeBetween = "-";

                    // Check if a match was found
                    if (match) {
                      codeValue = match[1];
                      //console.log(codeValue); 
                    } else {
                      if (item.attributes.no_jurnal.includes("JM")) {
                        codeValue = item.attributes.no_jurnal;
                      } else {
                        console.log("The string does not contain 'JM'");
                      }
                    }

                    // Check if a matchBetween was found
                    if (matchBetween) {
                      codeBetween = matchBetween[1];
                      //console.log(codeBetween);
                    } else {
                      if (item.attributes.no_jurnal.includes("JM")) {
                        codeBetween = "jurnal memo";
                      } else {
                        console.log("The string does not contain 'JM'");
                      }
                    }

                    return (
                      <tr>
                        <td className="border-2 text-center">{dateBaru.format('DD/MM/YYYY')}</td>
                        <td className="border-2 p-2 text-center"> {codeValue} </td>
                        <td className="border-2 p-2 text-center"> {codeBetween} </td>
                        <td className="border-2 text-center"> {item.attributes.added_by} </td>
                        <td className="border-2 p-2 text-center"> {item.attributes.catatan} </td>
                        <td className="border-2 p-2 text-right"> {formatter.format(item?.attributes?.debit)} </td>
                        <td className="border-2 p-2 text-right"> {formatter.format(item?.attributes?.kredit)} </td>
                        <td className="border-2 p-2 text-right"> {formatter.format(item?.saldoAwal)} </td>
                      </tr>
                    );
                  })}

                  <tr>
                    <td className="border-2 p-2 text-center"> {endDate.format('DD/MM/YYYY')} </td>
                    <td className="border-2 text-center"> - </td>
                    <td className="border-2 text-center"> - </td>
                    <td className="border-2 text-center"> - </td>
                    <td className="border-2 p-1 text-left"> Saldo Akhir </td>
                    <td className="border-2 p-2 text-right"> {formatter.format(debitAkhir)} </td>
                    <td className="border-2 p-2 text-right"> {formatter.format(kreditAkhir)} </td>
                    <td className="border-2 p-2 text-right"> {formatter.format(saldoAkhir)} </td>
                  </tr>
                </tbody>
              </table>
              
            </div>
            )}

            {/* <div className="flex justify-center items-center w-full h-full mt-2 ">
              <Pagination
                defaultCurrent={1}
                current={currentPage}
                total={jurnal?.meta?.pagination?.total}
                pageSize={itemsPerPage}
                onChange={handlePage}
              />
            </div> */}

          </LayoutContent>
        </LayoutWrapper>
      </DashboardLayout>
    </>
  );
}

export default BukuBesar;

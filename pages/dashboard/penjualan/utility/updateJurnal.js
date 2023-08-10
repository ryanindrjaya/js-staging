import React from "react";
import nookies from "nookies";
import { notification } from "antd";
import moment from "moment";

const cookies = nookies.get(null, "token");

const UpdateJurnal = async (
  data,
  user,
  page,
  insidePage,
) => {
  
  
  // CLEANING DATA
  var today = new Date();
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();
  var jurnal = await getJurnal();
  var noJurnal = String(jurnal?.meta?.pagination?.total + 1).padStart(3, "0");
  console.log("get jurnal", jurnal);
  
  var values = data;
  delete values.id;
  values.no_jurnal = "";
  values.catatan = "";
  values.debit = 0;
  values.kredit = 0;
  values.chart_of_account = null;
  values.added_by = user.name;
  values.tanggal = moment();
  
  if(page === "penjualan"){
    var akunPiutang = null;
    if(insidePage === "non panel" || insidePage === "panel") akunPiutang = "114.01.01";
    else if (insidePage === "sales") akunPiutang = "114.01.03";

    const reqCOA = await fetchAkunCOA(cookies, akunPiutang, "212.01.07", "400.01.00", "500.00.01", "115.10.00");
    const akunCOA = await reqCOA.json();

    console.log("get akunCOA", akunCOA);

    akunCOA.data.map((item) => {
      values.debit = 0;
      values.kredit = 0;
      if (insidePage === "non panel"){
        values.catatan = "Transaksi non panel dengan kode " + values?.attributes?.no_non_panel_sale;
        values.no_jurnal = `JPNP/${user.id}/${noJurnal}/${mm}/${yyyy}`;
        noJurnal++;
        noJurnal = String(noJurnal).padStart(3, "0");
      } else if (insidePage === "panel"){
        values.catatan = "Transaksi non panel dengan kode " + values?.attributes?.no_panel_sale;
        values.no_jurnal = `JPP/${user.id}/${noJurnal}/${mm}/${yyyy}`;
        noJurnal++;
        noJurnal = String(noJurnal).padStart(3, "0");
      } else if (insidePage === "sales"){
        values.catatan = "Transaksi non panel dengan kode " + values?.attributes?.no_sales_sale;
        values.no_jurnal = `JPS/${user.id}/${noJurnal}/${mm}/${yyyy}`;
        noJurnal++;
        noJurnal = String(noJurnal).padStart(3, "0");
      }


      if(item.attributes.kode === "114.01.01" || item.attributes.kode === "114.01.03") {
        //true
        values.debit = values.attributes.total;
        putAkun(item, values.attributes.total, page);
      } else if (item.attributes.kode === "212.01.07") {
        //false
        values.kredit = values.attributes.ppn;
        putAkun(item, values.attributes.ppn, page);
      } else if (item.attributes.kode === "400.01.00") {
        //false
        values.kredit = values.attributes.dpp;
        putAkun(item, values.attributes.dpp, page);
      } else if (item.attributes.kode === "500.00.01") {
        //true
        values.debit = values.attributes.total;
        putAkun(item, values.attributes.total, page);
      } else if (item.attributes.kode === "115.10.00") {
        //true
        values.kredit = values.attributes.total;
        putAkun(item, values.attributes.total);
      }
      values.chart_of_account = item.id;

      var data = {
        data: values,
      };

      postJurnal(data);
    });

  } else if (page === "retur") {
    var akunReturPiutang = null;
    if(insidePage === "retur non panel" || insidePage === "retur panel") akunReturPiutang = "114.01.01";
    else if (insidePage === "retur sales") akunReturPiutang = "114.01.03";

    const reqCOA = await fetchAkunCOA(cookies, akunReturPiutang, "212.01.07", "401.01.00", "500.00.01", "115.10.00");
    var akunCOA = await reqCOA.json();

    akunCOA.data[5] = akunCOA.data[4];
    akunCOA.data[6] = akunCOA.data[0];

    console.log("get akunCOA", akunCOA);
    var cekRetur = 0;
    var cekPiutang = 0;
    var saldoRetur = 0;
    var saldoPiutang = 0;

    akunCOA.data.map((item) => {
      values.debit = 0;
      values.kredit = 0;

      if (insidePage === "retur non panel"){
        values.catatan = "Transaksi retur non panel dengan kode " + values?.attributes?.no_retur_non_panel_sale;
        values.no_jurnal = `JRPNP/${user.id}/${noJurnal}/${mm}/${yyyy}`;
        noJurnal++;
        noJurnal = String(noJurnal).padStart(3, "0");
      } else if (insidePage === "retur panel"){
        values.catatan = "Transaksi retur panel dengan kode " + values?.attributes?.no_retur_panel_sale;
        values.no_jurnal = `JRPP/${user.id}/${noJurnal}/${mm}/${yyyy}`;
        noJurnal++;
        noJurnal = String(noJurnal).padStart(3, "0");
      } else if (insidePage === "retur sales"){
        values.catatan = "Transaksi retur sales dengan kode " + values?.attributes?.no_retur_sales_sale;
        values.no_jurnal = `JRPS/${user.id}/${noJurnal}/${mm}/${yyyy}`;
        noJurnal++;
        noJurnal = String(noJurnal).padStart(3, "0");
      }

      if(item.attributes.kode === "114.01.01" || item.attributes.kode === "114.01.03") {
        //true
        if (cekRetur === 0) {
          values.kredit = values.attributes.total;
          putAkun(item, values.attributes.total);
          saldoPiutang = item.attributes.saldo - values.attributes.total;
          cekRetur++;
        } else {
          item.attributes.saldo = saldoPiutang;
          values.kredit = values.attributes.total;
          putAkun(item, values.attributes.total);
        }
      } else if (item.attributes.kode === "212.01.07") {
        //false
        values.debit = values.attributes.ppn;
        putAkun(item, values.attributes.ppn);
      } else if (item.attributes.kode === "401.01.00") {
        //true
        if (cekPiutang === 0) {
          values.debit = values.attributes.dpp;
          putAkun(item, values.attributes.dpp, page);
          saldoRetur = item.attributes.saldo + values.attributes.dpp;
          cekPiutang++;
        }
        else{
          item.attributes.saldo = saldoRetur;
          values.debit = values.attributes.total;
          putAkun(item, values.attributes.total, page);
        }
      } else if (item.attributes.kode === "500.00.01") {
        //true
        values.kredit = values.attributes.total;
        putAkun(item, values.attributes.total);
      } else if (item.attributes.kode === "115.10.00") {
        //true
        values.debit = values.attributes.total;
        putAkun(item, values.attributes.total, page);
      }
      values.chart_of_account = item.id;

      var data = {
        data: values,
      }; console.log("get data post", data, akunReturPiutang, insidePage, page);

      postJurnal(data);
    });

  }
  
};

const openNotificationWithIcon = (type, req) => {
  if (type === "error") {
    notification[type]({
      message: "Gagal menambahkan data",
      description: "Jurnal gagal ditambahkan." + req.statusText,
    });
  } else if (type === "success") {
    notification[type]({
      message: "Berhasil menambahkan data",
      description: "Jurnal berhasil ditambahkan.",
    });
  }
};


const getJurnal = async () => {
  const endpoint = process.env.NEXT_PUBLIC_URL + "/jurnals?populate=*";
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + cookies.token,
    },
  };

  const req = await fetch(endpoint, options);
  const res = await req.json();
  
  return res;
};

const postJurnal = async (data) => {
  const endpoint = process.env.NEXT_PUBLIC_URL + "/jurnals/";
  const JSONdata = JSON.stringify(data);

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + cookies.token,
    },
    body: JSONdata,
  };

  const req = await fetch(endpoint, options);
  const res = await req.json();
    console.log("req create", req, res);

    if (req.status === 200) {
      console.log("suksess jurnal");
      //openNotificationWithIcon("success");
    } else {
      openNotificationWithIcon("error", req);
    }
}

const fetchAkunCOA = async (cookies, kode1, kode2, kode3, kode4, kode5) => {
  const endpoint = process.env.NEXT_PUBLIC_URL + "/chart-of-accounts?populate=*&filters[kode][$eq][0]="+ kode1 +
  "&filters[kode][$eq][1]="+ kode2 +
  "&filters[kode][$eq][2]="+ kode3 +
  "&filters[kode][$eq][3]="+ kode4 +
  "&filters[kode][$eq][4]="+ kode5;
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

const putAkun = async (akun, pembayaran, page, insidePage) => {
  try {
    var saldo = parseFloat(akun.attributes.saldo - pembayaran);
    if(page === "penjualan" || page === "retur") saldo = parseFloat(akun.attributes.saldo + pembayaran);

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
          // notification["success"]({
          //   message: "Sukses mengubah saldo",
          //   description: "COA yang dilakukan sukses.",
          // });
          
      } else {
          console.log("akun error atau tidak ada");
          notification["error"]({
            message: "Gagal mengubah saldo",
            description: "COA yang dilakukan gagal.",
          });
      }
    } catch (error) {
       console.log("errorr", error);
    }
};

export default UpdateJurnal;
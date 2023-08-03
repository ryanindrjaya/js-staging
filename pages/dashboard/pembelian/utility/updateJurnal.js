import React from "react";
import nookies from "nookies";
import { notification } from "antd";
import moment from "moment";

const cookies = nookies.get(null, "token");
var tempProductListId = [];
var tempSupplierId = 0;
var tempLocationId;

const UpdateJurnal = async (
  data,
  user,
  page
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
  
  if(page === "lpb"){
    
    const reqCOA = await fetchAkunCOA(cookies, "115.10.00", "116.20.07", "211.01.01");
    const akunCOA = await reqCOA.json();

    console.log("get akunCOA", akunCOA);

    akunCOA.data.map((item) => {
      values.debit = 0;
      values.kredit = 0;
      values.no_jurnal = `JPB/${user.id}/${noJurnal}/${mm}/${yyyy}`;
      values.catatan = "Transaksi lpb dengan kode " + values?.attributes?.no_purchasing;
      if(item.attributes.jenis_akun === true && item.attributes.kode === "115.10.00") {
        values.debit = values.attributes.dpp_value;
        putAkun(item, values.attributes.dpp_value);
      }
      else if(item.attributes.jenis_akun === true && item.attributes.kode === "116.20.07"){
        values.debit = values.attributes.ppn_value;
        putAkun(item, values.attributes.ppn_value);
      }
      else if(item.attributes.jenis_akun === false && item.attributes.kode === "211.01.01"){
        if(values.attributes.price_after_disc === 0){
          values.kredit = values.attributes.total_purchasing;
          putAkun(item, values.attributes.total_purchasing);
        } else {
          values.kredit = values.attributes.price_after_disc;
          putAkun(item, values.attributes.price_after_disc);
        }
      }
      values.chart_of_account = item.id;

      var data = {
        data: values,
      };

      postJurnal(data);
    });

  } else if(page === "retur"){
    
    const reqCOA = await fetchAkunCOA(cookies, "115.10.00", "116.20.07", "211.01.02");
    const akunCOA = await reqCOA.json();

    console.log("get akunCOA", akunCOA);

    var totalPrice = values.attributes.total_price; console.log(values, "retur values");
    var dpp = 0;
    var ppn = 0;

    if(values.attributes.DPP_PPN_active === true){
      dpp = totalPrice / 1.11;
      ppn = dpp * 0.11;
    }

    akunCOA.data.map((item) => {
      values.debit = 0;
      values.kredit = 0;
      values.no_jurnal = `JRPB/${user.id}/${noJurnal}/${mm}/${yyyy}`;
      values.catatan = "Transaksi retur lpb dengan kode " + values?.attributes?.no_retur;
      if(item.attributes.jenis_akun === true && item.attributes.kode === "115.10.00") {
        values.kredit = dpp;
        putAkun(item, dpp);
      }
      else if(item.attributes.jenis_akun === true && item.attributes.kode === "116.20.07"){
        values.kredit = ppn;
        putAkun(item, ppn);
      }
      else if(item.attributes.jenis_akun === true && item.attributes.kode === "211.01.02"){
        values.debit = totalPrice;
        putAkun(item, totalPrice);
      }
      values.chart_of_account = item.id;

      var data = {
        data: values,
      };

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

const fetchAkunCOA = async (cookies, kode1, kode2, kode3) => {
  const endpoint = process.env.NEXT_PUBLIC_URL + "/chart-of-accounts?populate=*&filters[kode][$in][0]="+ kode1 +"&filters[kode][$in][1]="+ kode2 +"&filters[kode][$in][2]="+ kode3;
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

const putAkun = async (akun, pembayaran, page) => {
  try {
    var saldo = parseFloat(akun.attributes.saldo - pembayaran);
    if(akun.attributes.jenis_akun === false) saldo = parseFloat((akun.attributes.saldo ?? 0) + pembayaran);

    if(page === "retur"){
      if(akun.attributes.kode === false) saldo = parseFloat(akun.attributes.saldo + pembayaran);
      else saldo = parseFloat(akun.attributes.saldo - pembayaran);
    }

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
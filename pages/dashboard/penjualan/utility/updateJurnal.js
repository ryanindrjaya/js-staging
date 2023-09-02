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
  kode,
  indexMultiPay,
  multi,
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
    else if (insidePage === "toko"){
      akunPiutang = kode;
    }
    
    var reqCOA = await fetchAkunCOA(cookies, akunPiutang, "212.01.07", "400.01.00", "500.00.01", "115.10.00");
    var akunCOA = await reqCOA.json();

    var kodeDelivery = null;
    if (insidePage === "toko" && values.attributes.delivery_fee !== 0){
      var reqToko = await fetchAkunToko(cookies);
      var akunToko = await reqToko.json(); console.log("get akunToko", akunToko);
      var kodeData = akunToko.data[0].attributes.chart_of_account.data.attributes.kode;
      reqCOA = await fetchAkunCOA(cookies, akunPiutang, "212.01.07", "400.01.00", "500.00.01", "115.10.00", kodeData);
      akunCOA = await reqCOA.json();
      kodeDelivery = kodeData;
    }

    if (indexMultiPay > 0) {
      reqCOA = await fetchAkunCOA(cookies, akunPiutang);
      akunCOA = await reqCOA.json();
    }

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
        values.catatan = "Transaksi panel dengan kode " + values?.attributes?.no_panel_sale;
        values.no_jurnal = `JPP/${user.id}/${noJurnal}/${mm}/${yyyy}`;
        noJurnal++;
        noJurnal = String(noJurnal).padStart(3, "0");
      } else if (insidePage === "sales"){
        values.catatan = "Transaksi sales dengan kode " + values?.attributes?.no_sales_sale;
        values.no_jurnal = `JPS/${user.id}/${noJurnal}/${mm}/${yyyy}`;
        noJurnal++;
        noJurnal = String(noJurnal).padStart(3, "0");
      } else if (insidePage === "toko"){
        values.catatan = "Transaksi toko dengan kode " + values?.attributes?.no_store_sale;
        values.no_jurnal = `JPT/${user.id}/${noJurnal}/${mm}/${yyyy}`;
        noJurnal++;
        noJurnal = String(noJurnal).padStart(3, "0");
      }

      //if(item.attributes.kode === "114.01.01" || item.attributes.kode === "114.01.03" || item.attributes.kode === akunPiutang) {
      if(item.attributes.kode === akunPiutang) {
        //true
        values.debit = values.attributes.total;
        if (insidePage === "toko" && multi === "Multi") {
          var detail = values.attributes.store_payments.data[indexMultiPay]; 
          const charge = detail.attributes.charge;
          const oth = isNaN(parseFloat(detail.attributes.oth)) ? 0 : parseFloat(detail.attributes.oth);
          if (indexMultiPay === 0) values.debit = detail.attributes.payment;
          else values.debit = (detail.attributes.payment - charge ) + oth;
          console.log("get detail jurnal", detail.attributes.payment, charge, oth);
        }
        
      } else if (item.attributes.kode === "212.01.07") {
        //false
        values.kredit = values.attributes.ppn;
        
      } else if (item.attributes.kode === "400.01.00") {
        //false
        values.kredit = values.attributes.dpp;
        
      } else if (item.attributes.kode === "500.00.01") {
        //true
        values.debit = values.attributes.total;
        
      } else if (item.attributes.kode === "115.10.00") {
        //true
        values.kredit = values.attributes.total;
        
      } else if (kodeDelivery !== null) {
        //false
        values.kredit = values.attributes.delivery_fee;
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
    else if (insidePage === "retur toko"){
      akunReturPiutang = kode;
    }

    var reqCOA = await fetchAkunCOA(cookies, akunReturPiutang, "212.01.07", "401.01.00", "500.00.01", "115.10.00");
    var akunCOA = await reqCOA.json();

    akunCOA.data[5] = akunCOA.data[4];
    akunCOA.data[6] = akunCOA.data[0];

    if (insidePage === "retur toko") {
      akunCOA.data.splice(6, 1);
      akunCOA.data.splice(5, 1);
    } 
    
    if (indexMultiPay > 0) {
      reqCOA = await fetchAkunCOA(cookies, akunReturPiutang);
      akunCOA = await reqCOA.json();
    }

    console.log("get akunCOA", akunCOA, indexMultiPay);
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
      } else if (insidePage === "retur toko"){
        values.catatan = "Transaksi retur toko dengan kode " + values?.attributes?.no_retur_store_sale;
        values.no_jurnal = `JRPT/${user.id}/${noJurnal}/${mm}/${yyyy}`;
        noJurnal++;
        noJurnal = String(noJurnal).padStart(3, "0");
      }

      //if(item.attributes.kode === "114.01.01" || item.attributes.kode === "114.01.03") {
      if(item.attributes.kode === akunReturPiutang) {
        //true
        if (cekRetur === 0) {
          values.kredit = values.attributes.total;
          saldoPiutang = item.attributes.saldo - values.attributes.total;

          //values.kredit = values.attributes.total; console.log(indexMultiPay, "indexMultiPay");
          if (insidePage === "retur toko" && multi === "Multi") {
            var detail = values.attributes.store_payments.data[indexMultiPay];
            const charge = detail.attributes.charge;
            //const oth = isNaN(parseFloat(detail.attributes.oth)) ? 0 : parseFloat(detail.attributes.oth);
            if (indexMultiPay === 0) values.kredit = detail.attributes.payment;
            else values.kredit = detail.attributes.payment + charge;
          }
          //console.log("get detail jurnal", detail.attributes.payment, charge, oth, saldoPiutang);

          cekRetur++;
        } else {
          item.attributes.saldo = saldoPiutang;
          values.kredit = values.attributes.total;

          if (insidePage === "retur toko" && multi === "Multi") {
            var detail = values.attributes.store_payments.data[indexMultiPay]; 
            const charge = detail.attributes.charge;
            const oth = isNaN(parseFloat(detail.attributes.oth)) ? 0 : parseFloat(detail.attributes.oth);
            if (indexMultiPay === 0) values.kredit = detail.attributes.payment;
            else values.kredit = (detail.attributes.payment - charge ) + oth;
          }
          //console.log("get detail jurnal", detail.attributes.payment, charge, oth, saldoPiutang);

        }

      } else if (item.attributes.kode === "212.01.07") {
        //false
        values.debit = values.attributes.ppn;
        
      } else if (item.attributes.kode === "401.01.00") {
        //true
        if (cekPiutang === 0) {
          values.debit = values.attributes.dpp;
          
          saldoRetur = item.attributes.saldo + values.attributes.dpp;
          cekPiutang++;
        }
        else{
          item.attributes.saldo = saldoRetur;
          values.debit = values.attributes.total;
          
        }
      } else if (item.attributes.kode === "500.00.01") {
        //true
        values.kredit = values.attributes.total;
        
      } else if (item.attributes.kode === "115.10.00") {
        //true
        values.debit = values.attributes.total;
        
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
      openNotificationWithIcon("success");
    } else {
      openNotificationWithIcon("error", req);
    }
}

const fetchAkunCOA = async (cookies, kode1, kode2, kode3, kode4, kode5, kode6) => {
  const endpoint = process.env.NEXT_PUBLIC_URL + "/chart-of-accounts?populate=*&filters[kode][$eq][0]="+ kode1 +
  "&filters[kode][$eq][1]="+ kode2 +
  "&filters[kode][$eq][2]="+ kode3 +
  "&filters[kode][$eq][3]="+ kode4 +
  "&filters[kode][$eq][4]="+ kode5 +
  "&filters[kode][$eq][5]="+ kode6;
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

const fetchAkunToko = async (cookies) => {
  const endpoint = process.env.NEXT_PUBLIC_URL + "/store-accounts?populate=*&filters[type][$eq]=ONGKIR&filters[setting][$eq]=true";
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

export default UpdateJurnal;
import React from "react";
import nookies from "nookies";
import { notification } from "antd";
import moment from "moment";

const cookies = nookies.get(null, "token");
var tempProductListId = [];
var tempSupplierId = 0;
var tempLocationId;

const UpdateJurnal = async (
  akun,
  page,
  noHutang, 
  noPiutang,
  saldo,
  user,
  tipe
) => {
  // CLEANING DATA
  
  var today = new Date();
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();
  var jurnal = await getJurnal();
  var noJurnal = String(jurnal?.meta?.pagination?.total + 1).padStart(3, "0");
  console.log("get jurnal", jurnal);

  var values = { ...akun };
  delete values.id;
  values.no_jurnal = "";
  values.catatan = "";
  values.debit = 0;
  values.kredit = 0;
  values.chart_of_account = akun.id;
  values.added_by = user.name;
  values.tanggal = moment();

  if(page == "hutang"){
    if (tipe !== "Master") values.kredit = saldo;
    else if (tipe === "Master") values.debit = saldo;
    values.catatan = "Transaksi hutang dengan kode " + noHutang;
    values.no_jurnal = `JH/${user.id}/${noJurnal}/${mm}/${yyyy}`;
    // noJurnal++;
    // noJurnal = String(noJurnal).padStart(3, "0");
  } else if (page == "piutang") { 
    if (tipe !== "Master") values.debit = saldo;
    else if (tipe === "Master") values.kredit = saldo;
    values.catatan = "Transaksi piutang dengan kode " + noPiutang;
    values.no_jurnal = `JP/${user.id}/${noJurnal}/${mm}/${yyyy}`;
    // noJurnal++;
    // noJurnal = String(noJurnal).padStart(3, "0");
  } 
  
  noJurnal++;
  noJurnal = String(noJurnal).padStart(3, "0");

  var data = {
    data: values,
  };

  console.log("req create data", data);

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
      console.log("suksess");
      openNotificationWithIcon("success");
    } else {
      openNotificationWithIcon("error", req);
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

export default UpdateJurnal;
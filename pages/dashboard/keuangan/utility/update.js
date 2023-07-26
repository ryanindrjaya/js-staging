import React from "react";
import nookies from "nookies";
import { notification } from "antd";
import updateJurnal from "../utility/updateJurnal";

const cookies = nookies.get(null, "token");
var tempProductListId = [];
var tempSupplierId = 0;
var tempLocationId;

const Update = async (
  sisaHutang,
  values,
  listId,
  form,
  router,
  url,
  page,
  akun,
  dataEdit,
  setCreateId,
  akunHutang
  //locations
) => {
  // CLEANING DATA
  listId.forEach((element) => {
    tempProductListId.push({ id: element });
  });

  var totalTunai = values.bayar1;
  var totalTransfer = values.bayar2;
  var totalGiro = values.bayar3;
  var total = 0;

  values.chart_of_account = values.akun;
  values.status = "Dibayar";
  total = values.bayar1 + values.bayar2 + values.bayar3;

  if(page == "hutang"){
    values.bayar1 = parseFloat( values.bayar1 );
    values.bayar2 = parseFloat( values.bayar2 );
    values.bayar3 = parseFloat( values.bayar3 );
    if (values.metode_bayar1 == "tunai") totalTunai = values.bayar1;
    else if (values.metode_bayar2 == "tunai") totalTunai = values.bayar2;
    else if (values.metode_bayar3 == "tunai") totalTunai = values.bayar3;
    else totalTunai = 0;
    if (values.metode_bayar1 == "transfer") totalTransfer = values.bayar1;
    else if (values.metode_bayar2 == "transfer") totalTransfer = values.bayar2;
    else if (values.metode_bayar3 == "transfer") totalTransfer = values.bayar3;
    else totalTransfer = 0;
    if (values.metode_bayar1 == "giro") totalGiro = values.bayar1;
    else if (values.metode_bayar2 == "giro") totalGiro = values.bayar2;
    else if (values.metode_bayar3 == "giro") totalGiro = values.bayar3;
    else totalGiro = 0;
  }

  const putRelation = await putRelationDetail(dataEdit?.id, values, form, router, url, page, setCreateId);
  console.log(putRelation, "put relation");
  if (putRelation.status === 200) {
    if (values.document == "Publish") {

      var akunTunai = false;
      var akunTransfer = false;
      var akunGiro = false;
      var akunMaster = false;

      akunHutang.forEach((item) => {
        if(item.attributes.setting == true){
          if(totalTunai != 0 && item.attributes.type == "Tunai"){
              putAkun(item.attributes.chart_of_account.data.id, item.attributes.chart_of_account.data.attributes, form, totalTunai, page, values?.no_hutang, values?.no_piutang);

            akunTunai = true;
          } else if(totalTransfer != 0 && item.attributes.type == "Transfer"){
              putAkun(item.attributes.chart_of_account.data.id, item.attributes.chart_of_account.data.attributes, form, totalTransfer, page, values?.no_hutang, values?.no_piutang);

            akunTransfer = true;;
          } else if(totalGiro != 0 && item.attributes.type == "Giro"){
              putAkun(item.attributes.chart_of_account.data.id, item.attributes.chart_of_account.data.attributes, form, totalGiro, page, values?.no_hutang, values?.no_piutang);

            akunGiro = true;;
          } else if(akunMaster === false && item.attributes.type == "Master"){
            putAkun(item.attributes.chart_of_account.data.id, item.attributes.chart_of_account.data.attributes, form, values.total_pembayaran, page, values?.no_hutang, values?.no_piutang, "Master");
            //putAkun(item.attributes.chart_of_account.data.id, dataPiutang.attributes.total_pembayaran, dataPiutang.attributes.no_piutang, "Master");
            akunMaster = true;
          }
        }
      });

    }
    
  } else {
    openNotificationWithIcon("error", page);
  }

};

const putAkun = async (id, value, form, total, page, noHutang, noPiutang, tipe) => {
  const user = await getUserMe();

  id = parseInt(id);
  var saldo = parseFloat(value.saldo);
    var url = null;
    if (page === "hutang" && tipe !== "Master") {
      //url = "/debt-accounts/";
      url = "/chart-of-accounts/";
      saldo = saldo - total;
    } else if (page === "hutang" && tipe === "Master") {
      //url = "/debt-accounts/";
      url = "/chart-of-accounts/";
      saldo = saldo + total;
    }
    if (page === "piutang" && tipe !== "Master") {
      //url = "/credit-accounts/";
      url = "/chart-of-accounts/";
      saldo = saldo + total;
    } else if (page === "piutang" && tipe === "Master") {
      //url = "/debt-accounts/";
      url = "/chart-of-accounts/";
      saldo = saldo - total;
    }

    value.saldo = saldo;
    
    const data = {
        data: value,
    };

    // clean object
    for (var key in data) {
        if (data[key] === null || data[key] === undefined) {
            delete data[key];
        }
    }

    const JSONdata = JSON.stringify(data);
    const endpoint = process.env.NEXT_PUBLIC_URL + url + id;
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
        //updateJurnal(res.data, page, noHutang, noPiutang, total, user);
        if(tipe === "Master") updateJurnal(res.data, page, noHutang, noPiutang, total, user, tipe);
        else updateJurnal(res.data, page, noHutang, noPiutang, total, user);
    } else {
        console.log("akun error atau tidak ada");
    }
};

const putRelationDetail = async (id, value, form, router, url, page, setCreateId) => {
  const user = await getUserMe();
  const data = {
    data: value,
  };

  data.data.debt_details = tempProductListId;
  data.data.credit_details = tempProductListId;

  // clean object
  for (var key in data) {
    if (data[key] === null || data[key] === undefined) {
      delete data[key];
    }
  }

  const JSONdata = JSON.stringify(data);
  const endpoint = process.env.NEXT_PUBLIC_URL + url + id;
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
    form.resetFields();
    if(page == "hutang") router.push("/dashboard/keuangan/hutang");
    if(page == "piutang") router.push("/dashboard/keuangan/piutang");
    openNotificationWithIcon("success", page);
    console.log("res.data", res.data);
    setCreateId(res.data);
  } else {
    openNotificationWithIcon("error", page);
  }

  return req;
};

const getUserMe = async () => {
  const endpoint = process.env.NEXT_PUBLIC_URL + "/users/me";
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

const openNotificationWithIcon = (type, page) => {
  var descrip = null;
  var descripError = null;
  if(page == "hutang"){
    descrip = "Data yg dipilih berhasil ditambahkan. Silahkan cek pada halaman Hutang";
    descripError = "Data yg dipilih gagal ditambahkan. Silahkan cek NO hutang atau kelengkapan data lainnya";
  } else if (page == "piutang"){
    descrip = "Data yg dipilih berhasil ditambahkan. Silahkan cek pada halaman Hutang";
    descripError = "Data yg dipilih gagal ditambahkan. Silahkan cek NO piutang atau kelengkapan data lainnya";
  }

  if (type === "error") {
    notification[type]({
      message: "Gagal menambahkan data",
      description: descripError,
    });
  } else if (type === "success") {
    notification[type]({
      message: "Berhasil menambahkan data",
      description: descrip ,
    });
  }
};

export default Update;

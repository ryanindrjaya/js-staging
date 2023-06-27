import React from "react";
import nookies from "nookies";
import { notification } from "antd";

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

  var totalTunai = 0;
  var totalTransfer = 0;
  var totalGiro = 0;
  var total = 0;

  values.chart_of_account = values.akun;
  values.status = "Dibayar";
  total = values.bayar1 + values.bayar2 + values.bayar3;

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

  const putRelation = await putRelationDetail(dataEdit?.id, values, form, router, url, page, setCreateId);
  console.log(putRelation, "put relation");
  if (putRelation.status === 200) {
    if (values.document == "Publish") {
      akunHutang.forEach((item) => {
        if(item.attributes.setting == true){
          if(totalTunai != 0 && item.attributes.type == "Tunai"){
            if(item.attributes.chart_of_account.data.attributes.saldo < totalTunai){
              notification["error"]({
                message: "Gagal menambahkan data",
                description: "Data gagal ditambahkan, saldo untuk akun tunai kurang untuk melakukan pembayaran.",
              });

            } else {
              putAkun(item.attributes.chart_of_account.data.id, item.attributes.chart_of_account.data.attributes, form, totalTunai, page);
            }
          } else if(totalTransfer != 0 && item.attributes.type == "Transfer"){
            if(item.attributes.chart_of_account.data.attributes.saldo < totalTransfer){
              notification["error"]({
                message: "Gagal menambahkan data",
                description: "Data gagal ditambahkan, saldo untuk akun transfer kurang untuk melakukan pembayaran.",
              });

            } else {
              putAkun(item.attributes.chart_of_account.data.id, item.attributes.chart_of_account.data.attributes, form, totalTransfer, page);
            }
          } else if(totalGiro != 0 && item.attributes.type == "Giro"){
            if(item.attributes.chart_of_account.data.attributes.saldo < totalGiro){
              notification["error"]({
                message: "Gagal menambahkan data",
                description: "Data gagal ditambahkan, saldo untuk akun giro kurang untuk melakukan pembayaran.",
              });
              
            } else {
              putAkun(item.attributes.chart_of_account.data.id, item.attributes.chart_of_account.data.attributes, form, totalGiro, page);
            }
          }
        } else {
          if(item.attributes.type == "Tunai"){
              notification["error"]({
                message: "Gagal menambahkan data",
                description: "Data gagal ditambahkan, silahkan pilih akun tunai untuk diaktifkan.",
              });
              
          } else if(totalTransfer != 0 && item.attributes.type == "Transfer"){
              notification["error"]({
                message: "Gagal menambahkan data",
                description: "Data gagal ditambahkan, silahkan pilih akun transfer untuk diaktifkan.",
              });
              
          } else if(totalGiro != 0 && item.attributes.type == "Giro"){
              notification["error"]({
                message: "Gagal menambahkan data",
                description: "Data gagal ditambahkan, silahkan pilih akun giro untuk diaktifkan.",
              });
              
          }
        }
      });
    }
    
  } else {
    openNotificationWithIcon("error");
  }

};

const putAkun = async (id, value, form, total, page) => {
  id = parseInt(id);
  var saldo = parseFloat(value.saldo);
    var url = null;
    if (page == "hutang") {
      //url = "/debt-accounts/";
      url = "/chart-of-accounts/";
      saldo = saldo - total;
    }
    if (page == "piutang") {
      //url = "/credit-accounts/";
      url = "/chart-of-accounts/";
      saldo = saldo + total;
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
    openNotificationWithIcon("success");

    setCreateId(res.data);
  } else {
    openNotificationWithIcon("error");
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

const openNotificationWithIcon = (type) => {
  if (type === "error") {
    notification[type]({
      message: "Gagal menambahkan data",
      description:
        "Data lpb yg dipilih gagal ditambahkan. Silahkan cek NO hutang atau kelengkapan data lainnya",
    });
  } else if (type === "success") {
    notification[type]({
      message: "Berhasil menambahkan data",
      description:
        "Data lpb yg dipilih berhasil ditambahkan. Silahkan cek pada halaman Hutang",
    });
  }
};

export default Update;

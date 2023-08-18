import React from "react";
import nookies from "nookies";
import { notification } from "antd";
import updateJurnal from "../utility/updateJurnal";

const cookies = nookies.get(null, "token");
var tempProductListId = [];
var tempSupplierId = 0;
var tempLocationId;

const Create = async (
  sisaHutang,
  values,
  listId,
  form,
  router,
  url,
  page,
  akun,
  setCreateId,
  akunSetting,
  //locations
) => {
  // CLEANING DATA
  tempProductListId = [];

  listId.forEach((element) => {
    tempProductListId.push({ id: element });
  });

  var totalTunai = 0;
  var totalTransfer = 0;
  var totalGiro = 0;
  var totalCN = 0;
  var totalOTH = 0;
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

  var data = {
    data: values,
  };

  const req = await createData(data, url);
  const res = await req.json();

  if (req.status === 200) {
    if (values.document == "Publish") {

      var akunTunai = false;
      var akunTransfer = false;
      var akunGiro = false;
      var akunMaster = false;

      akunSetting.forEach((item) => {
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
              
              akunMaster = true;
          }
        }
      });

    }
    
    await putRelationDetail(res.data.id, res.data.attributes, form, router, url, page, setCreateId);
  } else {
    openNotificationWithIcon("error");
  }
};

const createData = async (data, url) => {
  const endpoint = process.env.NEXT_PUBLIC_URL + url;
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

  return req;
};

const putAkun = async (id, value, form, total, page, noHutang, noPiutang, tipe) => {
  const user = await getUserMe();
  
    const endpoint = process.env.NEXT_PUBLIC_URL + "/chart-of-accounts/" + id;
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + cookies.token,
        },
        //body: JSONdata,
    };

    const req = await fetch(endpoint, options);
    const res = await req.json();

    if (req.status === 200) {
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
    if(page == "hutang") router.replace("/dashboard/keuangan/hutang");
    if(page == "piutang") router.replace("/dashboard/keuangan/piutang");
    openNotificationWithIcon("success");

    setCreateId(res.data);
  } else {
    openNotificationWithIcon("error");
  }
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
        "Data penjualan yg dipilih gagal ditambahkan. Silahkan cek NO atau kelengkapan data lainnya",
    });
  } else if (type === "success") {
    notification[type]({
      message: "Berhasil menambahkan data",
      description:
        "Data penjualan yg dipilih berhasil ditambahkan.",
    });
  }
};

export default Create;

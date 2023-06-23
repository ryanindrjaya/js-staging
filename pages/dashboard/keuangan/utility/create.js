import React from "react";
import nookies from "nookies";
import { notification } from "antd";

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
  setCreateId
  //locations
) => {
  // CLEANING DATA
  listId.forEach((element) => {
    tempProductListId.push({ id: element });
  });

  var totalTunai = 0;
  var totalTransfer = 0;
  var totalGiro = 0;
  var totalCN = 0;
  var totalOTH = 0;
  var total = 0;

  values.chart_of_account = values.akunCOA;
  values.status = "Dibayar";
  total = values.bayar1 + values.bayar2 + values.bayar3;

  var data = {
    data: values,
  };

  const req = await createData(data, url);
  const res = await req.json();

  if (req.status === 200) {
    if (values.document == "Publish") {
      akun.forEach((element) => {
        putAkun(values.akunCOA, element.attributes, form, total, page);
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

const putAkun = async (id, value, form, total, page) => {
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
        //form.resetFields();
        //openNotificationWithIcon("success");
        console.log("akun sukses diupdate");
    } else {
        //openNotificationWithIcon("error");
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

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
  dataEdit
  //locations
) => { console.log("data edit",dataEdit, values, tempProductListId);
  // CLEANING DATA
  listId.forEach((element) => {
    tempProductListId.push({ id: element });
  });

  var totalTunai = 0;
  var totalTransfer = 0;
  var totalGiro = 0;
  var totalCN = 0;
  var totalOTH = 0;

  values.status = "Dibayar";

  values.bayar1 = parseInt( values.bayar1 );
  values.bayar2 = parseInt( values.bayar2 );
  values.bayar3 = parseInt( values.bayar3 );
  values.bayar4 = parseInt( values.bayar4 );
  values.bayar5 = parseInt( values.bayar5 );

  if (values.metode_bayar1 == "tunai") totalTunai = values.bayar1;
  else if (values.metode_bayar2 == "tunai") totalTunai = values.bayar2;
  else if (values.metode_bayar3 == "tunai") totalTunai = values.bayar3;
  else if (values.metode_bayar4 == "tunai") totalTunai = values.bayar4;
  else if (values.metode_bayar5 == "tunai") totalTunai = values.bayar5;
  else totalTunai = 0;

  if (values.metode_bayar1 == "transfer") totalTransfer = values.bayar1;
  else if (values.metode_bayar2 == "transfer") totalTransfer = values.bayar2;
  else if (values.metode_bayar3 == "transfer") totalTransfer = values.bayar3;
  else if (values.metode_bayar4 == "transfer") totalTransfer = values.bayar4;
  else if (values.metode_bayar5 == "transfer") totalTransfer = values.bayar5;
  else totalTransfer = 0;

  if (values.metode_bayar1 == "giro") totalGiro = values.bayar1;
  else if (values.metode_bayar2 == "giro") totalGiro = values.bayar2;
  else if (values.metode_bayar3 == "giro") totalGiro = values.bayar3;
  else if (values.metode_bayar4 == "giro") totalGiro = values.bayar4;
  else if (values.metode_bayar5 == "giro") totalGiro = values.bayar5;
  else totalGiro = 0;

  if (values.metode_bayar1 == "cn") totalCN = values.bayar1;
  else if (values.metode_bayar2 == "cn") totalCN = values.bayar2;
  else if (values.metode_bayar3 == "cn") totalCN = values.bayar3;
  else if (values.metode_bayar4 == "cn") totalCN = values.bayar4;
  else if (values.metode_bayar5 == "cn") totalCN = values.bayar5;
  else totalCN = 0;

  if (values.metode_bayar1 == "oth") totalOTH = values.bayar1;
  else if (values.metode_bayar2 == "oth") totalOTH = values.bayar2;
  else if (values.metode_bayar3 == "oth") totalOTH = values.bayar3;
  else if (values.metode_bayar4 == "oth") totalOTH = values.bayar4;
  else if (values.metode_bayar5 == "oth") totalOTH = values.bayar5;
  else totalOTH = 0;

  //var data = {
  //  data: values,
  //};

  //const req = await createData(data, url);
  //const res = await req.json();

  if (values.document == "Publish") {
    akun.forEach((element) => {
        if (element.attributes.type == "Tunai" && element.attributes.setting == true) {
        putAkun(element.id, element.attributes, form, totalTunai, page);
        }
        else if (element.attributes.type == "Transfer" && element.attributes.setting == true) {
        putAkun(element.id, element.attributes, form, totalTransfer, page);
        }
        else if (element.attributes.type == "Giro" && element.attributes.setting == true) {
        putAkun(element.id, element.attributes, form, totalGiro, page);
        }
        else if (element.attributes.type == "CN" && element.attributes.setting == true) {
        putAkun(element.id, element.attributes, form, totalCN, page);
        }
        else if (element.attributes.type == "OTH" && element.attributes.setting == true) {
        putAkun(element.id, element.attributes, form, totalOTH, page);
        }
    });
  }

  await putRelationDetail(dataEdit?.id, values, form, router, url, page);

};

//const createData = async (data, url) => {
//  const endpoint = process.env.NEXT_PUBLIC_URL + url;
//  const JSONdata = JSON.stringify(data);

//  const options = {
//    method: "POST",
//    headers: {
//      "Content-Type": "application/json",
//      Authorization: "Bearer " + cookies.token,
//    },
//    body: JSONdata,
//  };

//  const req = await fetch(endpoint, options);

//  return req;
//};

const putAkun = async (id, value, form, total, page) => {
    var saldo = parseInt(value.saldo);
    saldo = saldo - total;

    value.saldo = saldo;
    value.attributes.supplier = value.attributes.supplier.data.id;

    const data = {
        data: value,
    };

    var url = null;
    if (page == "hutang") url = "/debt-accounts/";
    if (page == "piutang") url = "/credit-accounts/";

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

const putRelationDetail = async (id, value, form, router, url, page) => {
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
    if(page == "hutang") router.push("/dashboard/biaya/hutang");
    if(page == "piutang") router.push("/dashboard/biaya/piutang");
    openNotificationWithIcon("success");
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

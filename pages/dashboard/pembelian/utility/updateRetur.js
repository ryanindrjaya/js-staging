import React from "react";
import nookies from "nookies";
import * as moment from "moment";
import router from "next/router";
import { notification } from "antd";

var tempListId = [];
const cookies = nookies.get(null, "token");
var index = 0;

const getUnitPrice = (data, unit) => {
  var unitIndex = 1;
  for (let index = 1; index < 6; index++) {
    if (data.attributes[`unit_${index}`] === unit) {
      unitIndex = index;
    }
  }

  var selectedUnit = data.attributes[`buy_price_${unitIndex}`];
  return selectedUnit;
};

const updateRetur = (
  products,
  productTotalPrice,
  productSubTotal,
  setListId,
  url,
  value,
  returData
) => {

  products.productList.forEach((element) => {
    // value detail 
    tempListId = [];
    const id = index;
    var qty = products?.productInfo[id]?.qty ?? 1;
    var unit = products?.productInfo[id]?.unit ?? element.attributes.unit_1;
    var unitPrice = products?.productInfo[id]?.priceUnit;
    var unitPriceAfterDisc = productTotalPrice[id] ?? element.attributes.buy_price_1;
    var subTotal = unitPriceAfterDisc * qty;
    var batch = value?.batch[id];
    var expired_date = value?.expired_date[id];
    //var location = value?.product_location[id];
    var location = null;

    var idDetail = returData?.data[0]?.attributes.retur_details?.data[index].id;
    console.log("detail", element, returData, idDetail, value);

    PUTReturDetail(
    qty,
    unit,
    unitPrice,
    subTotal,
    batch,
    expired_date,
    location,
    url,
    element.id,
    setListId,
    products,
    idDetail,
    );

    index++;
  });
  index = 0;

  var idRetur = returData.data[0].id;
  var no_retur = value?.no_retur ?? returData?.data[0]?.attributes?.no_retur;
  var catatan = value?.catatan ?? returData?.data[0]?.attributes?.catatan;
  var pajak = value?.pajak ?? returData?.data[0]?.attributes?.pajak;
  var status = value?.status ?? returData?.data[0]?.attributes?.status;
  //var status = "lol";
  var tanggal_pembelian = returData?.data[0]?.attributes?.tanggal_pembelian;
  var tanggal_retur = value?.tanggal_retur ?? returData?.data[0]?.attributes?.tanggal_retur;
  var no_nota_supplier = returData?.data[0]?.attributes?.no_nota_supplier;

  //var location = value?.location ?? returData?.data[0]?.attributes?.location?.data?.attributes?.id;
  var location = value?.location?.value;
  if(value.location.value != null){
    location = value.location.value;
  } else if(value.location != null){
    location = value.location;
  } else { location = returData?.data[0]?.attributes?.location?.data?.id }

  var purchasing = value?.purchasing?.value;
  if(value.purchasing.value != null){
    purchasing = value.purchasing.value;
  } else if (value.purchasing != null) {
    purchasing = value.purchasing;
  } else { purchasing = returData?.data[0]?.attributes?.purchasing?.data?.id }

  var supplier = value?.supplier_id?.value;
  if(value.supplier_id.value != null){
    supplier = value.supplier_id.value;
  } else if (value.supplier_id != null) {
    supplier = value.supplier_id;
  } else { supplier = returData?.data[0]?.attributes?.supplier?.data?.id }

  var retur_details = [];
  returData?.data[0]?.attributes?.retur_details.data.forEach(
    (element) => { 
      retur_details[index] =  element.id;
      index++;
    }
  );
  index = 0;

  PUTRetur(
    idRetur,
    no_retur,
    catatan,
    pajak,
    status,
    tanggal_pembelian,
    tanggal_retur,
    no_nota_supplier,
    location,
    purchasing,
    supplier,
    retur_details,
  );
};

const PUTReturDetail = async (
  qty,
  unit,
  unitPrice,
  subTotal,
  batch,
  expired_date,
  location,
  url,
  id,
  setListId,
  products,
  idDetail,
) => {
  var data = {
    data: {
      qty: qty,
      unit: unit,
      harga_satuan: unitPrice,
      sub_total: parseInt(subTotal),
      batch: batch,
      expired_date: expired_date,
      location: location,
      products: { id: id },
    },
  };

  const endpoint = process.env.NEXT_PUBLIC_URL + "/retur-details/" + idDetail;
  const JSONdata = JSON.stringify(data);
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
    tempListId.push(res.data?.id);
    if (tempListId.length === products.productList.length) {
      setListId(tempListId);
    }
  }
};

const PUTRetur = async (
    idRetur,
    no_retur,
    catatan,
    pajak,
    status,
    tanggal_pembelian,
    tanggal_retur,
    no_nota_supplier,
    location,
    purchasing,
    supplier,
    retur_details,
) => {
    var data = {
      data: {
        no_retur: no_retur,
        catatan: catatan,
        pajak: pajak,
        status: status,
        tanggal_pembelian: tanggal_pembelian,
        tanggal_retur: tanggal_retur,
        no_nota_supplier: no_nota_supplier,
        location: location,
        purchasing: purchasing,
        supplier: supplier,
        retur_details: retur_details,
      },
    };

    const endpoint = process.env.NEXT_PUBLIC_URL + "/returs/" + idRetur;
    const JSONdata = JSON.stringify(data);
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
        openNotificationWithIcon("success");
        router.replace("/dashboard/pembelian/retur");
    } else {
        openNotificationWithIcon("error");
    }
};

const openNotificationWithIcon = (type) => {
    if (type === "error") {
        notification[type]({
            message: "Gagal menambahkan data",
            description: "Retur pembelian gagal diupdate. Silahkan cek kelengkapan data lainnya",
        });
    } else if (type === "success") {
        notification[type]({
            message: "Berhasil menambahkan data",
            description: "Retur pembelian berhasil diupdate. Silahkan cek pada halaman Retur Pembelian",
        });
    }
};

export default updateRetur;

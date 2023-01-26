import React from "react";
import nookies from "nookies";
import * as moment from "moment";

var tempListId = [];
const cookies = nookies.get(null, "token");

var id = 0;

const createDetailHutang = (
  values,
  biaya,
  sisaHutang,
  setListId,
  url
) => {
  biaya.list.forEach((element) => { console.log("sisaHutang", sisaHutang);
    if(biaya.info[id] != null){ 
      if(biaya.info[id].pilihData == "pilih"){
        //default value
        console.log("element", element);
        var tunai = biaya.info[id]?.tunai ?? 0;
        var transfer = biaya.info[id]?.transfer ?? 0;
        var giro = biaya.info[id]?.giro ?? 0;
        var cn = biaya.info[id]?.cn ?? 0;
        var oth = biaya.info[id]?.oth ?? 0;
        var sisa_hutang = biaya.info[id]?.sisa_hutang ?? 0;
        var lpb = element;
      }
    }
    //default value
    //var qty = 1;
    //var unit = element.attributes.unit_1;
    //var unitPrice = element.attributes.buy_price_1;
    //var elementId = element.id;
    //tempListId = [];

    //qty = products.productInfo[id]?.qty ?? 1;
    //unit = products.productInfo[id]?.unit ?? element.attributes.unit_1;
    //unitPrice = products.productInfo?.[id]?.unit_price ?? element.attributes.buy_price_1;

    //var d1 = products.productInfo[id]?.d1;
    //var d2 = products.productInfo[id]?.d2;

    //POSTDetail(
    //  qty,
    //  unit,
    //  unitPrice,
    //  id,
    //  setListId,
    //  biaya,
    //  url
    //);
    id++;
  });
};

const POSTDetail = async (
  qty,
  unit,
  unitPrice,
  id,
  setListId,
  biaya,
  elementId,
  d1,
  d2,
  url
) => {
  var data = {
    data: {
      qty : qty,
      unit : unit,
      unit_price : unitPrice,
      product: { id: elementId },
      disc1: d1,
      disc2: d2,
    },
  };

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
  const res = await req.json();

  if (req.status === 200) {
    tempListId.push(res.data?.id);
    //if (tempListId.length === biaya.List.length) {
    //  setListId(tempListId);
    //}
  }
};

export default createDetailHutang;

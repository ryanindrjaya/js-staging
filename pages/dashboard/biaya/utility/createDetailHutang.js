import React from "react";
import nookies from "nookies";
import * as moment from "moment";

var tempListId = [];
const cookies = nookies.get(null, "token");

var id = 0;
var length = 1;

const createDetailHutang = (
  values,
  biaya,
  sisaHutang,
  setListId,
  url
) => {
  tempListId = [];

  biaya.list.forEach((element) => {
    //tempListId = [];

    if(biaya.info[id] != null){ 
      if(biaya.info[id].pilihData == "pilih"){
        //default value

        //tempListId = [];

        var tunai = biaya.info[id]?.tunai ?? 0;
        var transfer = biaya.info[id]?.transfer ?? 0;
        var giro = biaya.info[id]?.giro ?? 0;
        var cn = biaya.info[id]?.cn ?? 0;
        var oth = biaya.info[id]?.oth ?? 0;
        var sisa_hutang = sisaHutang[id] ?? 0;
        var lpb = element;

        POSTDetail(
            tunai,
            transfer,
            giro,
            cn,
            oth,
            sisa_hutang,
            lpb,
            setListId,
            biaya,
            length,
            url
        );

        length++;
      }
    }

    id++;
  });
};

const POSTDetail = async (
  tunai,
  transfer,
  giro,
  cn,
  oth,
  sisa_hutang,
  lpb,
  setListId,
  biaya,
  length,
  url
) => {
  var data = {
    data: {
      tunai : tunai,
      transfer : transfer,
      giro : giro,
      cn : cn,
      oth : oth,
      sisa_hutang : sisa_hutang,
      purchasing: { id: lpb.id },
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
    tempListId.push(res.data?.id); console.log("tempListId", tempListId)
    if (tempListId.length == length) {
      setListId(tempListId);
    }
  }
};

export default createDetailHutang;

import React from "react";
import nookies from "nookies";
import * as moment from "moment";

var tempListId = [];
const cookies = nookies.get(null, "token");

var id = 0;
var length = 0;

const createDetail = (
  values,
  data,
  biaya,
  sisaHutang,
  setListId,
  url,
  tipe
) => {
  tempListId = [];

  //get length choosen data
  biaya.list.forEach((element) => {
    if(biaya.info[id] != null){ 
      if(biaya.info[id].pilihData == "pilih"){
        length++;
      }
    }
    id++;
  });

  id = 0;
  biaya.list.forEach((element) => {
    //tempListId = [];

    if(biaya.info[id] != null){ 
      if(biaya.info[id].pilihData == "pilih"){ console.log("biaya create detail", biaya);
        //default value

        //tempListId = [];

        var tunai = biaya.info[id]?.tunai ?? 0;
        var transfer = biaya.info[id]?.transfer ?? 0;
        var giro = biaya.info[id]?.giro ?? 0;
        //var cn = biaya.info[id]?.cn ?? 0;
        var noGiro = biaya.info[id]?.oth ?? null;
        var sisa_hutang = sisaHutang[id] ?? 0;
        var lpb = element;
        var total_retur = data[id].subtotal;
        var customer = biaya.list[id]?.attributes?.customer?.data?.id;

        if(sisaHutang[id] == undefined || sisaHutang[id] < 0) sisa_hutang = 0 ;

        var tipeJual = null;
        if(element.attributes.no_sales_sale){
          tipeJual = "sales";
        }
        if(element.attributes.no_panel_sale){
          tipeJual = "panel";
        }
        if(element.attributes.no_non_panel_sale){
          tipeJual = "nonpanel";
        }
        POSTDetail(
            tunai,
            transfer,
            giro,
            // cn,
            // oth,
            noGiro,
            total_retur,
            sisa_hutang,
            lpb,
            setListId,
            biaya,
            length,
            url,
            tipe,
            tipeJual,
            customer
        );
      }
    }

    id++;
  });
};

const POSTDetail = async (
    tunai,
    transfer,
    giro,
    // cn,
    // oth,
    noGiro,
    total_retur,
    sisa_hutang,
    lpb,
    setListId,
    biaya,
    length,
    url,
    tipe,
    tipeJual,
    customer
) => {
  var data = null;

  if (tipe == "hutang") {
    data = {
      data: {
        tunai: tunai,
        transfer: transfer,
        giro: giro,
        // cn: cn,
        // oth: oth,
        no_giro: noGiro,
        total_retur: total_retur,
        sisa_hutang: sisa_hutang,
        purchasing: { id: lpb.id },
      },
    };
  }

  if (tipe == "piutang") {

    if(tipeJual == "sales"){
      data = {
        data: {
          tunai: tunai,
          transfer: transfer,
          giro: giro,
          // cn: cn,
          // oth: oth,
          no_giro: noGiro,
          total_retur: total_retur,
          sisa_piutang: sisa_hutang,
          sales_sale: { id: lpb.id },
          customer: customer
        },
      };
    }

    if(tipeJual == "panel"){
      data = {
        data: {
          tunai: tunai,
          transfer: transfer,
          giro: giro,
          // cn: cn,
          // oth: oth,
          no_giro: noGiro,
          total_retur: total_retur,
          sisa_piutang: sisa_hutang,
          panel_sale: { id: lpb.id },
          customer: customer
        },
      };
    }

    if(tipeJual == "nonpanel"){
      data = {
        data: {
          tunai: tunai,
          transfer: transfer,
          giro: giro,
          // cn: cn,
          // oth: oth,
          no_giro: noGiro,
          total_retur: total_retur,
          sisa_piutang: sisa_hutang,
          non_panel_sale: { id: lpb.id },
          customer: customer
        },
      };
    }

  }

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
    if (tempListId.length == length) {
      setListId(tempListId);
    }
  }
};

export default createDetail;

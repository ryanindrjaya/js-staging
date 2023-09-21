import React from "react";

export default function calculatePrice(
    row,
    biaya,
    sisaHutangTotal,
    //products,
    //productTotalPrice,
    //productSubTotal,
    //setTotalPrice,
    index) {

    var sisaHutang = row?.attributes?.total ?? row?.attributes?.total_purchasing;
    var tunai = 0;
    var transfer = 0;
    var giro = 0;
    // var cn = 0;
    // var oth = 0;

    if (row.sisaHutang) sisaHutang = row?.sisaHutang - row?.dibayar;
    // sisaHutang = sisaHutang - row?.dibayar;
    // sisaHutang = sisaHutang - row?.subtotal;

    if (biaya.info[index]?.tunai) {
      tunai = biaya.info[index].tunai;
    } else if (biaya.info[index]?.tunai == 0 || biaya.info[index]?.tunai == null) {
      tunai = 0;
    } else {
      tunai = 0;
    }

    if (biaya.info[index]?.transfer) {
      transfer = biaya.info[index].transfer;
    } else if (biaya.info[index]?.transfer == 0 || biaya.info[index]?.transfer == null) {
      transfer = 0;
    } else {
      transfer = 0;
    }

    if (biaya.info[index]?.giro) {
      giro = biaya.info[index].giro;
    } else if (biaya.info[index]?.giro == 0 || biaya.info[index]?.giro == null) {
      giro = 0;
    } else {
      giro = 0;
    }

    // if (biaya.info[index]?.cn) {
    //   cn = biaya.info[index].cn;
    // } else if (biaya.info[index]?.cn == 0 || biaya.info[index]?.cn == null) {
    //   cn = 0;
    // } else {
    //   cn = 0;
    // }

    // if (biaya.info[index]?.oth) {
    //   oth = biaya.info[index].oth;
    // } else if (biaya.info[index]?.oth == 0 || biaya.info[index]?.oth == null) {
    //   oth = 0;
    // } else {
    //   oth = 0;
    // }
    
    sisaHutang = sisaHutang - (tunai + transfer + giro);
    sisaHutangTotal[index] = sisaHutang;

  return sisaHutangTotal[index];
}
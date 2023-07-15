import React from "react";
import nookies from "nookies";
import { message, notification } from "antd";

const cookies = nookies.get(null, "token");

export const CreateStorePayment = async (
  nominal,
  charge,
  payment,
  paymentMethod,
  storeTrxId,
  returTrxId,
  paymentType,
  reloadPage,
  oth = 0
) => {
  //   create payment
  try {
    const data = {
      data: {
        nominal: nominal,
        charge: charge - oth,
        payment: payment,
        payment_method: paymentMethod,
        type: paymentType,
        oth: String(oth),
      },
    };

    const endpoint = `${process.env.NEXT_PUBLIC_URL}/store-payments`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.token}`,
      },
      body: JSON.stringify(data),
    };

    const response = await fetch(endpoint, options);
    const result = await response.json();

    console.log("create store payment", result);

    if (paymentType === "Pembayaran") {
      await updateTransaction(storeTrxId, result.data.id, reloadPage);
    } else {
      await updateReturTransaction(storeTrxId, returTrxId, result.data.id, reloadPage);
    }
  } catch (error) {
    console.log("create payment error", error);
    message.error("Pembayaran Gagal", 2);
  }
};

export const CreateStorePaymenWithoutUpdate = async (nominal, charge, payment, paymentMethod, paymentType, oth) => {
  //   create payment
  try {
    const data = {
      data: {
        nominal: nominal,
        charge: charge,
        payment: payment,
        payment_method: paymentMethod,
        type: paymentType,
        oth: String(oth),
      },
    };

    const endpoint = `${process.env.NEXT_PUBLIC_URL}/store-payments`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.token}`,
      },
      body: JSON.stringify(data),
    };

    console.log(endpoint, `Bearer ${cookies.token}`);

    const response = await fetch(endpoint, options);
    const result = await response.json();

    return result;
  } catch (error) {
    console.log("create payment error", error);
    message.error("Pembayaran Gagal", 2);
  }
};

// * ====================== UPDATE TRANSACTION ======================

export const updateTransaction = async (storeTrxId, paymentId, reloadPage) => {
  try {
    const data = {
      data: {
        status: "Dibayar",
        store_payments: paymentId,
      },
    };
    const endpoint = `${process.env.NEXT_PUBLIC_URL}/store-sales/${storeTrxId}`;
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.token}`,
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(endpoint, options);
    const result = await response.json();

    message.success("Transaksi Lunas", 2);

    if (reloadPage) {
      reloadPage();
    }
  } catch (error) {
    console.log("update transaction error", error);
    message.error("Transaksi Gagal", 2);
  }
};

// ! ====================== UPDATE RETUR TRANSACTION ======================

export const updateReturTransaction = async (storeTrxId, returTrxId, paymentId, reloadPage) => {
  console.log("update retur transaction", storeTrxId, returTrxId, paymentId);

  try {
    const data = {
      data: {
        status: "Dibayar",
        store_payments: paymentId,
      },
    };
    const endpoint = `${process.env.NEXT_PUBLIC_URL}/retur-store-sales/${returTrxId}`;
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.token}`,
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(endpoint, options);
    const result = await response.json();
    console.log(endpoint, JSON.stringify(data), result);

    // update master transaction
    // await updateMasterTransaction(storeTrxId);

    message.success("Transaksi Retur Lunas", 2);
    if (reloadPage) {
      reloadPage();
    }
  } catch (error) {
    console.log("update transaction error", error);
    message.error("Transaksi Gagal", 2);
  }
};

// ? ====================== UPDATE MASTER TRANSACTION ======================

const updateMasterTransaction = async (storeTrxId) => {
  try {
    const data = {
      data: {
        status: "Diretur",
      },
    };
    const endpoint = `${process.env.NEXT_PUBLIC_URL}/store-sales/${storeTrxId}`;
    console.log("endpoint untuk update master transaction", endpoint);
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.token}`,
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(endpoint, options);
    const result = await response.json();
    console.log("result master transaction", result);
  } catch (error) {
    console.log("update transaction error", error);
    message.error("Transaksi Gagal", 2);
  }
};

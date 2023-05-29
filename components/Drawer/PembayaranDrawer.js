import { Button, Drawer, InputNumber, Popconfirm, Select } from "antd";
import { CreateStorePaymenWithoutUpdate, updateTransaction } from "../../library/functions/createStorePayment";
import React, { useState } from "react";
import { createInventoryFromPenjualan } from "../../library/functions/createInventory";

function PembayaranDrawer({ openDrawer, onCloseDrawer, record, reloadPage }) {
  const data = record?.attributes;

  const confirm = async () => {
    // extract values from object
    const {
      attributes: { total },
      id,
    } = record;
    const selectOptions = values.map(({ option }) => option);
    const selectValues = values.map(({ nominal }) => nominal);
    const listPaymentId = [];

    // create payment requests asynchronously
    await Promise.all(
      values.map(async ({ option, nominal }) => {
        if (option && nominal) {
          const {
            data: { id },
          } = await CreateStorePaymenWithoutUpdate(total, totalCharge, nominal, option, "Pembayaran", id);
          console.log("response api", id);
          listPaymentId.push(id);
        }
      })
    );

    // update transaction
    await updateTransaction(id, listPaymentId);

    // update inventory
    await createInventoryFromPenjualan(record);

    reloadPage();
  };

  const cancel = (data) => {};

  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 2,
  });

  const [values, setValues] = useState([
    {
      option: "CASH",
      nominal: 0,
    },
    {
      option: "TRANSFER BANK",
      nominal: 0,
    },
    {
      option: "KARTU KREDIT",
      nominal: 0,
    },
  ]);

  const handleDrawerClose = () => {
    setValues(
      Array.from({ length: 3 }, () => ({
        option: "",
        nominal: 0,
      }))
    );
    onCloseDrawer();
  };

  const renderInput = (index) => {
    const handleChangeOption = (value) => {
      const newValues = [...values];
      newValues[index].option = value;
      setValues(newValues);
    };

    const handleChangeNominal = (value) => {
      const newValues = [...values];
      newValues[index].nominal = value;
      setValues(newValues);
    };

    return (
      <div key={index} className="mt-5">
        <Select style={{ width: 120 }} className="mr-2" value={values[index].option} onChange={handleChangeOption}>
          <Option value="CASH">Cash</Option>
          <Option value="TRANSFER BANK">Transfer Bank</Option>
          <Option value="KARTU KREDIT">Kartu Kredit</Option>
        </Select>
        <InputNumber
          placeholder="Masukan Nominal"
          min={0}
          formatter={(value) => `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          parser={(value) => value.replace(/Rp\s?|(,*)/g, "")}
          style={{ width: 150 }}
          value={values[index].nominal}
          onChange={handleChangeNominal}
          key={index}
        />
      </div>
    );
  };

  const totalInputValue = values.reduce((acc, cur) => acc + cur.nominal, 0);
  const totalAfterInput = data?.total - totalInputValue; // sisa pembayaran
  const totalCharge = totalAfterInput <= 0 ? (data?.total - totalInputValue) * -1 : 0;
  return (
    <Drawer title={`Pembayaran Lainnya`} placement="right" size="default" onClose={handleDrawerClose} open={openDrawer}>
      <p>No.Faktur : {data?.faktur ?? ""}</p>
      <p>Nama Customer : {data?.customer_name ?? ""}</p>
      <p>Total Harga : {formatter.format(data?.total ?? 0)}</p>

      {Array.from({ length: 3 }, (_, i) => renderInput(i))}

      <p className="mt-5">Sisa Pembayaran : {formatter.format(totalAfterInput < 0 ? 0 : totalAfterInput)}</p>
      <p className="mt-2 font-medium text-red-400">Pengembalian : {formatter.format(totalCharge)}</p>

      <Popconfirm
        title={"Pembayaran akan dilakukan sebesar " + formatter.format(totalInputValue) + ". Lanjutkan?"}
        onConfirm={() => confirm()}
        onCancel={cancel}
        okButtonProps={{
          style: { backgroundColor: "#00b894" },
        }}
        okText="Bayar"
        cancelText="Batalkan"
      >
        <Button className="rounded-md mr-2 hover:text-white hover:bg-cyan-700 border border-cyan-700 ml-1">
          Bayar
        </Button>
      </Popconfirm>
    </Drawer>
  );
}

export default PembayaranDrawer;

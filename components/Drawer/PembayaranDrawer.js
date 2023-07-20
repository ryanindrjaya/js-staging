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
          } = await CreateStorePaymenWithoutUpdate(total, totalCharge, nominal, option, "Pembayaran", oth);
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

  const [oth, setOth] = useState(0);

  const handleDrawerClose = () => {
    setValues([
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
    onCloseDrawer();
  };

  const handleChangeOption = (value, index) => {
    const newValues = [...values];
    newValues[index].option = value;
    setValues(newValues);
  };

  const handleChangeNominal = (value, index) => {
    const newValues = [...values];
    newValues[index].nominal = value;
    setValues(newValues);
  };

  const totalInputValue = values.reduce((acc, cur) => acc + cur.nominal, 0);
  const totalAfterInput = data?.total - (totalInputValue - oth); // sisa pembayaran
  const totalCharge = totalAfterInput <= 0 ? Math.abs(data?.total - totalInputValue + oth) : 0;
  return (
    <Drawer title={`Pembayaran Lainnya`} placement="right" size="default" onClose={handleDrawerClose} open={openDrawer}>
      <p>No.Faktur : {data?.faktur ?? ""}</p>
      <p>Nama Customer : {data?.customer_name ?? ""}</p>
      <p>Total Harga : {formatter.format(data?.total ?? 0)}</p>

      <div className="mt-4 grid grid-cols-2">
        <Select className="mr-2" value={values[0]?.option} onChange={(v) => handleChangeOption(v, 0)}>
          <Select.Option value="CASH">Cash</Select.Option>
          <Select.Option value="TRANSFER BANK">Transfer Bank</Select.Option>
          <Select.Option value="KARTU KREDIT">Kartu Kredit</Select.Option>
        </Select>
        <InputNumber
          onFocus={(e) => e.target.select()}
          placeholder="Masukan Nominal"
          min={0}
          className="w-full"
          formatter={(value) => `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          parser={(value) => value.replace(/Rp\s?|(,*)/g, "")}
          value={values[0]?.nominal}
          onChange={(v) => handleChangeNominal(v, 0)}
        />
      </div>

      <div className="mt-4 grid grid-cols-2">
        <Select className="mr-2" value={values[1]?.option} onChange={(v) => handleChangeOption(v, 1)}>
          <Select.Option value="CASH">Cash</Select.Option>
          <Select.Option value="TRANSFER BANK">Transfer Bank</Select.Option>
          <Select.Option value="KARTU KREDIT">Kartu Kredit</Select.Option>
        </Select>
        <InputNumber
          onFocus={(e) => e.target.select()}
          placeholder="Masukan Nominal"
          min={0}
          className="w-full"
          formatter={(value) => `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          parser={(value) => value.replace(/Rp\s?|(,*)/g, "")}
          value={values[1]?.nominal}
          onChange={(v) => handleChangeNominal(v, 1)}
        />
      </div>

      <div className="mt-4 grid grid-cols-2">
        <Select className="mr-2" value={values[2]?.option} onChange={(v) => handleChangeOption(v, 2)}>
          <Select.Option value="CASH">Cash</Select.Option>
          <Select.Option value="TRANSFER BANK">Transfer Bank</Select.Option>
          <Select.Option value="KARTU KREDIT">Kartu Kredit</Select.Option>
        </Select>
        <InputNumber
          onFocus={(e) => e.target.select()}
          placeholder="Masukan Nominal"
          min={0}
          className="w-full"
          formatter={(value) => `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          parser={(value) => value.replace(/Rp\s?|(,*)/g, "")}
          value={values[2]?.nominal}
          onChange={(v) => handleChangeNominal(v, 2)}
        />
      </div>

      <div className="grid items-center grid-cols-2 mt-4">
        <p className="m-0">OTH</p>
        <InputNumber
          onFocus={(e) => e.target.select()}
          className={`w-full ${oth < 0 ? "text-red-500" : ""}`}
          value={oth}
          formatter={(value) => `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          parser={(value) => value.replace(/Rp\s?|(,*)/g, "")}
          onChange={setOth}
        />
      </div>

      <div className="grid items-center grid-cols-2 mt-4">
        <p className="m-0">Pengembalian</p>
        <InputNumber
          aria-readonly
          className="w-full pointer-events-none"
          value={totalCharge}
          min={0}
          formatter={(value) => `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          parser={(value) => value.replace(/Rp\s?|(,*)/g, "")}
        />
      </div>

      <div className="grid items-center grid-cols-2 mt-4">
        <p className="m-0">Sisa Pembayaran</p>

        <p className="m-0">{formatter.format(totalAfterInput < 0 ? 0 : totalAfterInput)}</p>
      </div>

      <Popconfirm
        title={"Pembayaran akan dilakukan sebesar " + formatter.format(totalInputValue) + ". Lanjutkan?"}
        onConfirm={() => confirm()}
        onCancel={cancel}
        okButtonProps={{
          style: { backgroundColor: "#00b894" },
        }}
        placement="topLeft"
        okText="Bayar"
        cancelText="Batalkan"
      >
        <Button className="rounded-md mt-4 hover:text-white hover:bg-cyan-700 border border-cyan-700" block>
          Bayar
        </Button>
      </Popconfirm>
    </Drawer>
  );
}

export default PembayaranDrawer;

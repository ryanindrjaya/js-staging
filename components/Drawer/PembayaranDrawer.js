import { Button, Drawer, InputNumber, Popconfirm, Select } from "antd";
import { CreateStorePaymenWithoutUpdate, updateTransaction } from "../../library/functions/createStorePayment";
import React, { useEffect, useState } from "react";
import { createInventoryFromPenjualan } from "../../library/functions/createInventory";

function PembayaranDrawer({ openDrawer, onCloseDrawer, record, reloadPage, storeAccount, userMe, updateJurnal }) {
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
          } = await CreateStorePaymenWithoutUpdate(
            total,
            totalCharge ?? totalChargeAuto ?? 0,
            nominal,
            option,
            "Pembayaran",
            oth,
            userMe.name
          );
          console.log("response api", id);
          listPaymentId.push(id);
        }
      })
    );

    // update transaction
    const createStoreData = await updateTransaction(id, listPaymentId);
    console.log(createStoreData, "createStoreData");
    if (createStoreData.data?.id) {
      // action to update pembayaran jurnal
      if (createStoreData.data.attributes.store_payments.data.length === 1) {
        storeAccount.data.map((item) => {
          if (
            item.attributes.type === createStoreData.data.attributes.store_payments.data[0].attributes.payment_method
          ) {
            updateJurnal(
              createStoreData.data,
              userMe,
              "penjualan",
              "toko",
              item.attributes.chart_of_account.data.attributes.kode
            );
          }
        });
      } else if (createStoreData.data.attributes.store_payments.data.length > 1) {
        createStoreData.data.attributes.store_payments.data.map((data, index) => {
          storeAccount.data.map((item) => {
            if (item.attributes.type === data.attributes.payment_method) {
              updateJurnal(
                createStoreData.data,
                userMe,
                "penjualan",
                "toko",
                item.attributes.chart_of_account.data.attributes.kode,
                index,
                "Multi"
              );
            }
          });
        });
      }
    }

    // update inventory
    await createInventoryFromPenjualan(record);

    reloadPage();
    onCloseDrawer();
  };

  const cancel = (data) => {};

  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 2,
  });

  const [values, setValues] = useState([
    {
      option: "TUNAI",
      nominal: 0,
    },
    {
      option: "TRANSFER",
      nominal: 0,
    },
    {
      option: "KARTU KREDIT",
      nominal: 0,
    },
    {
      option: "LAINNYA",
      nominal: 0,
    },
  ]);

  const [oth, setOth] = useState(0);
  const [totalCharge, setTotalCharge] = useState(); // total charge [totalInputValue - oth
  const [totalChargeAuto, setTotalChargeAuto] = useState();
  const [totalInputValue, setTotalInputValue] = useState(0); // total after input [data?.total - totalInputValue + oth
  const [totalAfterInput, setTotalAfterInput] = useState(0); // total after input [data?.total - totalInputValue + oth

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

  useEffect(() => {
    console.log("total after input", totalAfterInput);
    setTotalChargeAuto(totalAfterInput <= 0 ? parseFloat(Math.abs(data?.total - totalInputValue)).toFixed(2) : 0);
    setTotalCharge();
    setOth();
  }, [totalAfterInput]);

  useEffect(() => {
    setTotalInputValue(values.reduce((acc, { nominal }) => acc + nominal, 0));
  }, [values]);

  useEffect(() => {
    setTotalAfterInput(data?.total - totalInputValue);
  }, [totalInputValue]);

  useEffect(() => {
    if (totalCharge !== undefined || totalCharge !== null) {
      setOth(parseFloat(totalCharge - totalChargeAuto ?? 0).toFixed(2));
    }
  }, [totalCharge, totalChargeAuto]);

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
          value={isNaN(oth) ? 0 : oth}
          formatter={(value) => `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          parser={(value) => value.replace(/Rp\s?|(,*)/g, "")}
          onChange={(v) => setOth(v)}
        />
      </div>

      <div className="grid items-center grid-cols-2 mt-4">
        <p className="m-0">Pengembalian</p>
        <InputNumber
          onFocus={(e) => e.target.select()}
          className="w-full"
          value={totalCharge ?? totalChargeAuto ?? 0}
          min={0}
          formatter={(value) => `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          parser={(value) => value.replace(/Rp\s?|(,*)/g, "")}
          onChange={(v) => {
            console.log("total charge", v);
            setTotalCharge(v);
          }}
        />
      </div>

      <div className="grid items-center grid-cols-2 mt-4">
        <p className="m-0">Sisa Pembayaran</p>

        <p className="m-0">{formatter.format(totalAfterInput < 0 ? 0 : totalAfterInput || 0)}</p>
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

import { Button, Drawer, InputNumber, Popconfirm, Select } from "antd";
import { CreateStorePaymenWithoutUpdate, updateReturTransaction } from "../../library/functions/createStorePayment";
import React, { useState } from "react";
import { createInventoryFromReturPenjualan } from "../../library/functions/createInventory";

function ReturDrawer({ openDrawer, onCloseDrawer, record, reloadPage, storeAccount, userMe, updateJurnal}) {
  const data = record?.attributes;

  console.log("record", record);
  const storeTrxId = data?.store_sale?.data?.id;

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
            totalAfterInput,
            nominal,
            option,
            "Retur",
            id,
            totalAfterInput
          );
          console.log("response api", id);
          listPaymentId.push(id);
        }
      })
    );
    // update transaction
    const createStoreData = await updateReturTransaction(storeTrxId, id, listPaymentId);
    console.log(createStoreData,"createStoreData");
    if(createStoreData.data?.id){
      // action to update pembayaran jurnal
      if (createStoreData.data.attributes.store_payments.data.length === 1) {
        storeAccount.data.map((item) => {
          if (item.attributes.type === createStoreData.data.attributes.store_payments.data[0].attributes.payment_method){
            updateJurnal(createStoreData.data, userMe, "retur", "retur toko", item.attributes.chart_of_account.data.attributes.kode);
          }
        });
      } else if (createStoreData.data.attributes.store_payments.data.length > 1) {
        createStoreData.data.attributes.store_payments.data.map((data, index) => {
          storeAccount.data.map((item) => {
            if (item.attributes.type === data.attributes.payment_method){
              updateJurnal(createStoreData.data, userMe, "retur", "retur toko", item.attributes.chart_of_account.data.attributes.kode, index, "Multi");
            }
          });
        });
      }
    }

    // update inventory
    //await createInventoryFromReturPenjualan(record);

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
      <div key={index} className="mt-4 grid grid-cols-2">
        <Select className="mr-2" value={values[index].option} onChange={handleChangeOption}>
          <Option value="CASH">Cash</Option>
          <Option value="TRANSFER BANK">Transfer Bank</Option>
          <Option value="KARTU KREDIT">Kartu Kredit</Option>
        </Select>
        <InputNumber
          onFocus={(e) => e.target.select()}
          placeholder="Masukan Nominal"
          min={0}
          className="w-full"
          formatter={(value) => `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          parser={(value) => value.replace(/Rp\s?|(,*)/g, "")}
          value={values[index].nominal}
          onChange={handleChangeNominal}
          key={index}
        />
      </div>
    );
  };

  const totalInputValue = values.reduce((acc, cur) => acc + cur.nominal, 0);
  const totalAfterInput = data?.total - totalInputValue;

  return (
    <Drawer title={`Pembayaran Lainnya`} placement="right" size="default" onClose={handleDrawerClose} open={openDrawer}>
      <p>No.Faktur : {data?.no_retur_store_sale ?? ""}</p>
      <p>Nama Customer : {data?.customer_name ?? ""}</p>
      <p>Total Retur Penjualan : {formatter.format(data?.total ?? 0)}</p>

      {Array.from({ length: 3 }, (_, i) => renderInput(i))}

      <div className="grid items-center grid-cols-2 mt-4">
        <p className="m-0">OTH</p>
        <InputNumber
          aria-readonly
          className={`w-full pointer-events-none ${totalAfterInput < 0 ? "text-red-500" : ""}`}
          value={totalAfterInput}
          formatter={(value) => formatter.format(value)}
          parser={(value) => value.replace(/Rp\s?|(,*)/g, "")}
        />
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

export default ReturDrawer;

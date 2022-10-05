import { useState } from "react";
import DataTable from "react-data-table-component";
import AlertDialog from "../../Alert/Alert";
import { InputNumber, Select, Form, Row } from "antd";

export default function ReactDataTable({
  data,
  setData,
  mapPrice,
  setMapPrice,
  mapPriceList,
  sumTotalPrice,
  qty,
  changeQty,
  price,
  setPrice,
  initialValue,
}) {
  let defaultPrice = 0;
  var defaultPriceAfterDisc = 0;
  var defaultSubTotal = 0;
  var defaultDp1 = 0;
  var defaultDp2 = 0;
  var defaultDp3 = 0;

  var priceAfterDisc = 0;
  var subTotal = 0;

  var tempMapPrice = {};
  var formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  });

  const onChangeUnit = (value, data) => {
    const priceUnit = data.attributes[`buy_price_${value}`];
    var defaultDisc1 = data.attributes[`unit_${value}_dp1`];
    var defaultDisc2 = data.attributes[`unit_${value}_dp2`];
    var defaultDisc3 = data.attributes[`unit_${value}_dp3`];
    var selectedUnit = data.attributes[`unit_${value}`];

    setMapPrice({
      ...mapPrice,
      [data.id]: {
        defaultUnit: selectedUnit,
        priceUnit: priceUnit,
        dp1: defaultDisc1,
        dp2: defaultDisc2,
        dp3: defaultDisc3,
      },
    });
  };

  const changePrice = (values, data) => {
    setPrice({
      ...price,
      [data.id]: {
        price_1st: values,
      },
    });
  };

  const calculatePriceAfterDisc = (row) => {
    defaultPriceAfterDisc = row.attributes[`buy_price_1`];

    if (mapPrice[row.id]) {
      defaultPriceAfterDisc = mapPrice[row.id].priceUnit;
    }

    if (price) {
      if (price[row.id]) {
        defaultPriceAfterDisc =
          defaultPriceAfterDisc - price[row.id]?.price_1st ?? 0;

        var price1 = calculatePercentage(defaultPriceAfterDisc, defaultDp1);
        var price2 = calculatePercentage(price1, defaultDp2);
        var price3 = calculatePercentage(price2, defaultDp3);
        defaultPriceAfterDisc = price3;
      }
    } else {
      defaultPriceAfterDisc = defaultPriceAfterDisc - 0;
      var price1 = calculatePercentage(defaultPriceAfterDisc, defaultDp1);
      var price2 = calculatePercentage(price1, defaultDp2);
      var price3 = calculatePercentage(price2, defaultDp3);
      defaultPriceAfterDisc = price3;
    }

    return formatter.format(defaultPriceAfterDisc);
  };

  const calculatePercentage = (value, percent) => {
    var newValue = value - (value * percent) / 100;
    return newValue;
  };

  const calculateSubTotal = (data) => {
    defaultSubTotal = defaultPriceAfterDisc;
    if (qty) {
      if (qty[data.id]) {
        defaultSubTotal = defaultPriceAfterDisc * qty[data.id].qty;
      }
    }

    mapPriceList[data.id] = defaultSubTotal;
    sumTotalPrice();
    return formatter.format(defaultSubTotal);
  };

  const onConfirm = (id) => {
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      if (element.id === id) {
        setData(data.filter((data, index) => data.id !== id));
      }
    }
  };

  const onCancel = () => {
    console.log("onCancel");
  };

  const customStyles = {
    headCells: {
      style: {
        color: "white",
        background: "#036B82",
      },
    },
  };

  const columns = [
    {
      name: "Nama Produk",
      width: "250px",
      selector: (row) => row.attributes?.name,
    },
    {
      name: "Harga Satuan",
      width: "250px",
      selector: (row) => {
        var selectedData = {};
        defaultPrice = row.attributes?.buy_price_1;
        tempMapPrice = {
          ...tempMapPrice,
          [row.id]: defaultPrice,
        };

        var currentPrice = tempMapPrice[row.id];
        if (mapPrice[row.id]) {
          currentPrice = mapPrice[row.id].priceUnit;
        }

        return formatter.format(currentPrice);
      },
    },
    {
      name: "Jumlah Pesanan",
      width: "250px",
      selector: (row) => {
        var defaultQty = 1;
        var defaultOption = row.attributes?.unit_1;
        var selectedData = {};

        initialValue.forEach((element) => {
          if (row.id === element.attributes.products.data[0].id) {
            selectedData[row.id] = element;
            defaultQty = selectedData[row.id].attributes.total_order;
            defaultOption = selectedData[row.id].attributes.unit_order;
          }
        });

        return (
          <>
            <Row>
              <Form.Item
                initialValue={defaultQty}
                name={["jumlah_qty", `${row.id}`]}
                noStyle
              >
                <InputNumber
                  defaultValue={defaultQty}
                  onChange={(e) => changeQty(e, row)}
                  rules={[
                    {
                      required: true,
                      message: "Required",
                    },
                  ]}
                  style={{
                    width: "30%",
                  }}
                />
              </Form.Item>

              <Form.Item name={["jumlah_option", `${row.id}`]} noStyle>
                <Select
                  defaultValue={defaultOption}
                  style={{
                    width: "50%",
                  }}
                >
                  {row.attributes?.unit_1 === null ? (
                    <></>
                  ) : (
                    <Select.Option value={row.attributes?.unit_1}>
                      {row.attributes?.unit_1}
                    </Select.Option>
                  )}
                  {row.attributes?.unit_2 === null ? (
                    <></>
                  ) : (
                    <Select.Option value={row.attributes?.unit_2}>
                      {row.attributes?.unit_2}
                    </Select.Option>
                  )}
                  {row.attributes?.unit_3 === null ? (
                    <></>
                  ) : (
                    <Select.Option value={row.attributes?.unit_3}>
                      {row.attributes?.unit_3}
                    </Select.Option>
                  )}
                  {row.attributes?.unit_4 === null ? (
                    <></>
                  ) : (
                    <Select.Option value={row.attributes?.unit_4}>
                      {row.attributes?.unit_4}
                    </Select.Option>
                  )}
                  {row.attributes?.unit_5 === null ? (
                    <></>
                  ) : (
                    <Select.Option value={row.attributes?.unit_5}>
                      {row.attributes?.unit_5}
                    </Select.Option>
                  )}
                </Select>
              </Form.Item>
            </Row>
          </>
        );
      },
    },
    {
      name: "Diskon",
      width: "150px",
      selector: (row) => {
        var selectedData = {};
        var initialDisc = 0;
        defaultPrice = row.attributes?.buy_price_1;
        tempMapPrice = {
          ...tempMapPrice,
          [row.id]: defaultPrice,
        };

        var currentPrice = tempMapPrice[row.id];
        if (mapPrice[row.id]) {
          currentPrice = mapPrice[row.id].priceUnit;
        }

        initialValue.forEach((element) => {
          if (row.id === element.attributes.products.data[0].id) {
            selectedData[row.id] = element;
            initialDisc = selectedData[row.id].attributes.disc;
          }
        });

        return (
          <Row align="bottom" justify="center">
            <Form.Item
              name={["disc_rp", `${row.id}`]}
              initialValue={initialDisc}
              noStyle
            >
              <InputNumber
                max={currentPrice}
                min={0}
                defaultValue={0}
                onChange={(e) => changePrice(e, row)}
                name="disc_rp"
                style={{
                  width: "100px",
                  marginRight: "10px",
                }}
              />
            </Form.Item>
          </Row>
        );
      },
    },
    {
      name: "",
      width: "350px",
      selector: (row) => {
        defaultDp1 = row.attributes?.unit_1_dp1;
        defaultDp2 = row.attributes?.unit_1_dp2;
        defaultDp3 = row.attributes?.unit_1_dp3;

        if (mapPrice[row.id]) {
          defaultDp1 = mapPrice[row.id]?.dp1;
          defaultDp2 = mapPrice[row.id]?.dp2;
          defaultDp3 = mapPrice[row.id]?.dp3;
        }

        return (
          <div className="grid grid-cols-3 gap-2 disabled:bg-white">
            <InputNumber
              disabled
              max={100}
              min={0}
              name="disc_rp1"
              value={defaultDp1}
              style={{
                width: "60px",
                backgroundColor: "#f4f4f4",
              }}
            />
            <InputNumber
              disabled
              max={100}
              min={0}
              value={defaultDp2}
              name="disc_rp2"
              style={{
                width: "60px",
                marginRight: "10px",
              }}
            />
            <InputNumber
              disabled
              max={100}
              min={0}
              value={defaultDp3}
              name="disc_rp3"
              style={{
                width: "60px",
                marginRight: "10px",
              }}
            />
          </div>
        );
      },
    },
    {
      name: "Harga Satuan Setelah Diskon",
      width: "250px",
      selector: (row) => {
        var selectedData = {};
        initialValue.forEach((element) => {
          if (element.attributes.products.data[0].id === row.id) {
            selectedData[row.id] = element;
          }
        });
        var priceAfterDisc = formatter.format(
          selectedData[row.id].attributes.unit_price_after_disc
        );

        if (price)
          if (price[row.id]) priceAfterDisc = calculatePriceAfterDisc(row);

        return priceAfterDisc;
      },
    },
    {
      name: "Subtotal",
      width: "250px",
      selector: (row) => {
        var selectedData = {};
        initialValue.forEach((element) => {
          if (element.attributes.products.data[0].id === row.id) {
            selectedData[row.id] = element;
          }
        });

        var subTotalPrice = formatter.format(
          selectedData[row.id].attributes.unit_price_after_disc
        );

        return subTotalPrice;
      },
    },
    {
      name: "Hapus",
      width: "250px",
      selector: (row) => (
        <AlertDialog
          onCancel={onCancel}
          onConfirm={onConfirm}
          title="Hapus Produk"
          message="Produk akan dihapus dari daftar ini. Lanjutkan?"
          id={row.id}
        />
      ),
    },
  ];

  return (
    <DataTable
      customStyles={customStyles}
      paginationRowsPerPageOptions={[50]}
      columns={columns}
      data={data}
      noDataComponent="--Belum ada produk--"
    />
  );
}

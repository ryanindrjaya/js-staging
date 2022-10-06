import { useState } from "react";
import DataTable from "react-data-table-component";
import AlertDialog from "../../Alert/Alert";
import { InputNumber, Select, Form, Row } from "antd";
import { useDispatch, useSelector } from "react-redux";
import action from "@iso/redux/application/order/action";

const { changeProductUnit } = action;

export default function ReactDataTable({ mapPrice }) {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.Order);

  let defaultPrice = 0;
  var defaultDp1 = 0;
  var defaultDp2 = 0;
  var defaultDp3 = 0;

  var tempMapPrice = {};

  var formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  });

  const onDeleteProduct = (value) => {
    console.log("do redux");
    dispatch({ type: "REMOVE_PRODUCT", index: value });
  };

  const onChangeUnit = (value, data) => {
    dispatch({ type: "CHANGE_PRODUCT_UNIT", index: value, product: data });
  };

  const onChangeQty = (value, data) => {
    dispatch({
      type: "CHANGE_PRODUCT_QTY",
      qty: value,
      product: data,
    });
  };

  const onChangeDisc = (value, data) => {
    dispatch({
      type: "CHANGE_PRODUCT_DISC",
      disc: value,
      product: data,
    });
  };

  const setPriceAfterDisc = (value, data) => {
    dispatch({
      type: "SET_PRICE_AFTER_DISC",
      price: value,
      product: data,
    });
  };

  const setSubTotal = (value, data) => {
    dispatch({
      type: "SET_SUBTOTAL",
      subTotal: value,
      product: data,
    });
  };

  const calculatePriceAfterDisc = (row) => {
    var priceUnit = row.attributes[`buy_price_1`];
    var qty = 1;
    var disc = 0;

    // check if price changed
    if (products.productInfo[row.id]?.priceUnit) {
      priceUnit =
        products.productInfo[row.id].priceUnit ?? row.attributes[`buy_price_1`];
    }

    // check if qty changed
    if (products.productInfo[row.id]?.qty) {
      qty = products.productInfo[row.id]?.qty ?? 1;
    }

    // check if disc changed
    if (products.productInfo[row.id]?.disc) {
      disc = products.productInfo[row.id]?.disc ?? 0;
    }

    priceUnit = priceUnit - disc;
    var price1 = calculatePercentage(priceUnit, defaultDp1);
    var price2 = calculatePercentage(price1, defaultDp2);
    var price3 = calculatePercentage(price2, defaultDp3);

    return formatter.format(price3);
  };

  const calculatePercentage = (value, percent) => {
    var newValue = value - (value * percent) / 100;
    return newValue;
  };

  const calculateSubTotal = (row) => {
    var priceUnit = row.attributes[`buy_price_1`];
    var qty = 1;
    var disc = 0;

    // check if price changed
    if (products.productInfo[row.id]?.priceUnit) {
      priceUnit =
        products.productInfo[row.id].priceUnit ?? row.attributes[`buy_price_1`];
    }

    // check if qty changed
    if (products.productInfo[row.id]?.qty) {
      qty = products.productInfo[row.id]?.qty ?? 1;
    }

    // check if disc changed
    if (products.productInfo[row.id]?.disc) {
      disc = products.productInfo[row.id]?.disc ?? 0;
    }

    priceUnit = priceUnit - disc;
    var price1 = calculatePercentage(priceUnit, defaultDp1);
    var price2 = calculatePercentage(price1, defaultDp2);
    var price3 = calculatePercentage(price2, defaultDp3);

    return formatter.format(price3 * qty);
  };

  const onConfirm = (id) => {
    for (let index = 0; index < products.productList.length; index++) {
      const element = products.productList[index];
      if (element.id === id) {
        // setData(data.filter((data, index) => data.id !== id));

        onDeleteProduct(index);
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
      width: "150px",
      selector: (row) => {
        var priceUnit = row.attributes?.buy_price_1;
        if (products.productInfo[row.id]) {
          if (products.productInfo[row.id].priceUnit) {
            priceUnit = products.productInfo[row.id].priceUnit;
          }
        }

        return formatter.format(priceUnit);
      },
    },
    {
      name: "Jumlah Pesanan",
      width: "220px",
      selector: (row) => {
        var defaultQty = 1;
        var defaultOption = row.attributes?.unit_1;

        return (
          <>
            <Row>
              <Form.Item
                initialValue={1}
                name={["jumlah_qty", `${row.id}`]}
                noStyle
              >
                <InputNumber
                  defaultValue={defaultQty}
                  onChange={(e) => onChangeQty(e, row)}
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

              <Form.Item
                name={["jumlah_option", `${row.id}`]}
                initialValue={defaultOption}
                noStyle
              >
                <Select
                  defaultValue={defaultOption}
                  onChange={(value) => onChangeUnit(value, row)}
                  name="jumlah_option"
                  style={{
                    width: "50%",
                  }}
                >
                  {row.attributes?.unit_1 === null ? (
                    <></>
                  ) : (
                    <Select.Option
                      disabled={row.attributes?.unit_1 === null}
                      value={1}
                    >
                      {row.attributes?.unit_1}
                    </Select.Option>
                  )}
                  {row.attributes?.unit_2 === null ? (
                    <></>
                  ) : (
                    <Select.Option
                      disabled={row.attributes?.unit_2 === null}
                      value={2}
                    >
                      {row.attributes?.unit_2}
                    </Select.Option>
                  )}
                  {row.attributes?.unit_3 === null ? (
                    <></>
                  ) : (
                    <Select.Option
                      disabled={row.attributes?.unit_3 === null}
                      value={3}
                    >
                      {row.attributes?.unit_3}
                    </Select.Option>
                  )}
                  {row.attributes?.unit_4 === null ? (
                    <></>
                  ) : (
                    <Select.Option
                      disabled={row.attributes?.unit_4 === null}
                      value={4}
                    >
                      {row.attributes?.unit_4}
                    </Select.Option>
                  )}
                  {row.attributes?.unit_5 === null ? (
                    <></>
                  ) : (
                    <Select.Option
                      disabled={row.attributes?.unit_5 === null}
                      value={5}
                    >
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
        defaultPrice = row.attributes?.buy_price_1;
        tempMapPrice = {
          ...tempMapPrice,
          [row.id]: defaultPrice,
        };

        var currentPrice = tempMapPrice[row.id];
        if (mapPrice[row.id]) {
          currentPrice = mapPrice[row.id].priceUnit;
        }

        return (
          <Row align="bottom" justify="center">
            <Form.Item name={["disc_rp", `${row.id}`]} noStyle>
              <InputNumber
                max={currentPrice}
                min={0}
                defaultValue={0}
                onChange={(e) => onChangeDisc(e, row)}
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
      width: "250px",
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
      width: "200px",
      selector: (row) => calculatePriceAfterDisc(row),
    },
    {
      name: "Subtotal",
      width: "200px",
      selector: (row) => calculateSubTotal(row),
    },
    {
      name: "Hapus",
      width: "150px",
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
      data={products.productList}
      noDataComponent={`--Belum ada produk-- ${products.productList.length}`}
    />
  );
}

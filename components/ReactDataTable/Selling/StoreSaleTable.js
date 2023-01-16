import DataTable from "react-data-table-component";
import AlertDialog from "../../Alert/Alert";
import { Input, InputNumber, Select, Form, Row, DatePicker } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

export default function ReactDataTable({
  calculatePriceAfterDisc,
  productSubTotal,
  setProductSubTotal,
  products,
  locations,
  setTotalPrice,
  formObj,
}) {
  const dispatch = useDispatch();
  const [error, setError] = useState();
  var defaultDp1 = 0;
  var defaultDp2 = 0;
  var defaultDp3 = 0;
  var unit = 1;
  var priceUnit = 1;
  var tempIndex = 0;
  var stock = 0;

  var formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 2,
  });

  const onDeleteProduct = (value) => {
    dispatch({ type: "REMOVE_PRODUCT", index: value });
  };

  const onChangeUnit = (data, value, index) => {
    if (value == 1) {
      priceUnit = data.attributes.buy_price_1;
    } else if (value == 2) {
      priceUnit = data.attributes.buy_price_2;
    } else if (value == 3) {
      priceUnit = data.attributes.buy_price_3;
    } else if (value == 4) {
      priceUnit = data.attributes.buy_price_4;
    } else if (value == 5) {
      priceUnit = data.attributes.buy_price_5;
    }

    dispatch({ type: "CHANGE_PRODUCT_UNIT", unit: value, product: data, index });
    onChangePriceUnit(priceUnit, data, value, index);
    onChangeQty(1, data, index);
    formObj.setFieldsValue({
      jumlah_qty: {
        [index]: 1,
      },
    });
    tempIndex = 0;
  };

  const onChangeQty = (value, data, index, initialQty) => {
    if (initialQty ? value > initialQty : false) {
      setError({
        ...error,
        [index]: "Jumlah melebihi nota penjualan",
      });
    } else {
      setError({
        ...error,
        [index]: null,
      });
    }

    dispatch({
      type: "CHANGE_PRODUCT_QTY",
      qty: value,
      product: data,
      index,
    });
  };

  const onChangeDisc = (value, data, index) => {
    dispatch({
      type: "CHANGE_PRODUCT_DISC",
      disc: value,
      product: data,
      index,
    });
  };

  const onChangeMargin = (value, data, index) => {
    dispatch({
      type: "CHANGE_PRODUCT_MARGIN",
      margin: value,
      product: data,
      index,
    });
  };

  const onChangeD1D2D3 = (value, data, type, index) => {
    switch (type) {
      case "d1":
        dispatch({
          type: "CHANGE_PRODUCT_D1",
          d1: value,
          product: data,
          index,
        });
        break;
      case "d2":
        dispatch({
          type: "CHANGE_PRODUCT_D2",
          d2: value,
          product: data,
          index,
        });
        break;
      default:
        break;
    }
  };

  const sumProductSubTotal = (data) => {
    const newProductSubTotalProduct = [data];

    const sum = newProductSubTotalProduct.reduce((prev, curr, index, array) => prev + curr, 0);
    setTotalPrice(sum);
  };

  const onConfirm = (id) => {
    var newSubTotalProduct = productSubTotal;
    var newProductInfo = products.productInfo;

    delete newSubTotalProduct[id];
    delete newProductInfo[id];

    setProductSubTotal(newSubTotalProduct);
    let subtotal = productSubTotal;
    onDeleteProduct(id);

    subtotal[id + 1] = 0;
    setProductSubTotal(subtotal);
    sumProductSubTotal(productSubTotal);

    if (products.productList.length == 0) {
      setTotalPrice(0);
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

  const onChangePriceUnit = (value, data, index, indexRow) => {
    var tempPriceUnit = [];
    console.log("value", value, data, index);

    tempPriceUnit.push(data.attributes.buy_price_1);
    tempPriceUnit.push(data.attributes.buy_price_2);
    tempPriceUnit.push(data.attributes.buy_price_3);
    tempPriceUnit.push(data.attributes.buy_price_4);
    tempPriceUnit.push(data.attributes.buy_price_5);

    data.attributes.buy_price_1 = value;
    data.attributes.buy_price_2 = value;
    data.attributes.buy_price_3 = value;
    data.attributes.buy_price_4 = value;
    data.attributes.buy_price_5 = value;

    if (tempIndex != index) {
      tempIndex = index;
      onChangeUnit(data, index, indexRow);
    }

    data.attributes.buy_price_1 = tempPriceUnit[0];
    data.attributes.buy_price_2 = tempPriceUnit[1];
    data.attributes.buy_price_3 = tempPriceUnit[2];
    data.attributes.buy_price_4 = tempPriceUnit[3];
    data.attributes.buy_price_5 = tempPriceUnit[4];

    formObj.setFieldsValue({
      harga_satuan: {
        [indexRow]: value,
      },
    });
  };

  const columns = [
    {
      name: "Nama Produk",
      width: "250px",
      selector: (row) => row.attributes?.name,
    },
    {
      name: "Jumlah Stock",
      width: "150px",
      selector: (row) => row?.stock,
    },
    {
      name: "Harga Satuan",
      width: "150px",
      selector: (row, idx) => {
        var priceUnit = row.attributes?.buy_price_1;
        if (products.productInfo[idx]?.priceUnit) {
          priceUnit = products.productInfo[idx].priceUnit;
        }
        return (
          <>
            <Row>
              <Form.Item name={["harga_satuan", `${idx}`]} noStyle>
                <InputNumber
                  defaultValue={priceUnit}
                  min={0}
                  onChange={(e) => onChangePriceUnit(e, row, unit, idx)}
                  style={{
                    width: "150px",
                    marginRight: "10px",
                  }}
                  formatter={(value) => value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                />
              </Form.Item>
            </Row>
          </>
        );
      },
    },
    {
      name: "Jumlah Penjualan",
      width: "220px",
      selector: (row, idx) => {
        var defaultQty = 1;
        var defaultOption = row.attributes?.unit_1;
        var defaultIndex = 1;
        var initialQty;

        // set max qty
        if (
          products?.preorderData?.data?.data?.attributes?.store_sale_details.data[idx]?.attributes
            ?.qty
        ) {
          initialQty =
            products?.preorderData?.data?.data?.attributes?.store_sale_details.data[idx]?.attributes
              ?.qty;
        }

        if (products.productInfo[idx]?.qty) {
          defaultQty = products.productInfo[idx].qty;
        }

        if (products.productInfo[idx]?.unitIndex) {
          defaultIndex = products.productInfo[idx].unitIndex;
        }

        // jika unit diganti maka unset max qty
        if (products.productInfo?.[idx]?.unit) {
          if (
            products.productInfo?.[idx]?.unit !==
            products?.preorderData?.data?.data?.attributes?.store_sale_details.data[idx]?.attributes
              .unit
          ) {
            initialQty = null;
          }
        }

        return (
          <>
            <Row>
              <Form.Item name={["jumlah_qty", `${idx}`]} noStyle>
                <InputNumber
                  // max={initialQty}
                  min={1}
                  defaultValue={defaultQty}
                  onChange={(e) => {
                    onChangeQty(e, row, idx, initialQty);
                  }}
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

              <Form.Item name={["jumlah_option", `${idx}`]} noStyle>
                <Select
                  defaultValue={defaultIndex}
                  onChange={(value) => onChangeUnit(row, value, idx)}
                  name="jumlah_option"
                  style={{
                    width: "57%",
                  }}
                >
                  {row.attributes?.unit_1 === null ? (
                    <></>
                  ) : (
                    <Select.Option
                      disabled={row.attributes?.unit_1 === null || defaultIndex > 1}
                      value={1}
                    >
                      {row.attributes?.unit_1}
                    </Select.Option>
                  )}
                  {row.attributes?.unit_2 === null ? (
                    <></>
                  ) : (
                    <Select.Option
                      disabled={row.attributes?.unit_2 === null || defaultIndex > 2}
                      value={2}
                    >
                      {row.attributes?.unit_2}
                    </Select.Option>
                  )}
                  {row.attributes?.unit_3 === null ? (
                    <></>
                  ) : (
                    <Select.Option
                      disabled={row.attributes?.unit_3 === null || defaultIndex > 3}
                      value={3}
                    >
                      {row.attributes?.unit_3}
                    </Select.Option>
                  )}
                  {row.attributes?.unit_4 === null ? (
                    <></>
                  ) : (
                    <Select.Option
                      disabled={row.attributes?.unit_4 === null || defaultIndex > 4}
                      value={4}
                    >
                      {row.attributes?.unit_4}
                    </Select.Option>
                  )}
                  {row.attributes?.unit_5 === null ? (
                    <></>
                  ) : (
                    <Select.Option
                      disabled={row.attributes?.unit_5 === null || defaultIndex > 5}
                      value={5}
                    >
                      {row.attributes?.unit_5}
                    </Select.Option>
                  )}
                </Select>
              </Form.Item>
              <p
                className={`m-0 text-red-500 transition-all ease-in-out transform duration-300 ${
                  error?.[idx] ? "scale-100" : "scale-0"
                }`}
              >
                {error?.[idx] || ""}
              </p>
            </Row>
          </>
        );
      },
    },
    {
      name: "Margin",
      width: "150px",
      selector: (row, idx) => {
        var defaultMargin = 0;

        return (
          <Row align="bottom" justify="center">
            <Form.Item name={["margin", `${idx}`]} noStyle>
              <InputNumber
                defaultValue={defaultMargin}
                min={0}
                onChange={(e) => onChangeMargin(e, row, idx)}
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
      name: "Diskon",
      width: "150px",
      selector: (row, idx) => {
        var defaultDisc = 0;
        if (products.productInfo[idx]?.disc) {
          defaultDisc = products.productInfo[idx].disc;
        }

        return (
          <Row align="bottom" justify="center">
            <Form.Item name={["disc_rp", `${idx}`]} noStyle>
              <InputNumber
                defaultValue={defaultDisc}
                min={0}
                onChange={(e) => onChangeDisc(e, row, idx)}
                style={{
                  width: "100px",
                  marginRight: "10px",
                }}
                formatter={(value) => value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
              />
            </Form.Item>
          </Row>
        );
      },
    },
    {
      name: "D1",
      width: "100px",
      selector: (row, idx) => {
        defaultDp1 = row.attributes?.unit_1_dp1 || 0;
        if (products.productInfo[idx]?.d1) {
          defaultDp1 = products.productInfo[idx].d1;
        }

        if (products.productInfo[idx]) {
          if (products.productInfo[idx].unit) {
            defaultDp1 = products.productInfo[idx].d1;
          }
        }

        return (
          <div className="disabled:bg-white">
            <InputNumber
              controls={false}
              formatter={(value) => `${value}%`}
              max={100}
              min={0}
              value={defaultDp1}
              name={["disc_rp1", `${idx}`]}
              onChange={(e) => onChangeD1D2D3(e, row, "d1", idx)}
              style={{
                width: "60px",
              }}
            />
          </div>
        );
      },
    },
    {
      name: "D2",
      width: "100px",
      selector: (row, idx) => {
        defaultDp2 = row.attributes?.unit_1_dp2 || 0;
        if (products.productInfo[idx]?.d2) {
          defaultDp2 = products.productInfo[idx].d2;
        }

        if (products.productInfo[idx]) {
          if (products.productInfo[idx].unit) {
            defaultDp2 = products.productInfo[idx].d2;
          }
        }

        return (
          <div className="disabled:bg-white">
            <InputNumber
              controls={false}
              formatter={(value) => `${value}%`}
              max={100}
              min={0}
              name={["disc_rp2", `${idx}`]}
              value={defaultDp2}
              onChange={(e) => onChangeD1D2D3(e, row, "d2", idx)}
              style={{
                width: "60px",
              }}
            />
          </div>
        );
      },
    },
    {
      name: "EXPDate",
      width: "150px",
      sortable: true,
      selector: (row, idx) => {
        return (
          <>
            <Form.Item
              label={"exp date"}
              name={["expired_date", `${idx}`]}
              rules={[
                {
                  required: true,
                  message: "Tanggal EXP tidak boleh kosong!",
                },
              ]}
              noStyle
            >
              <DatePicker placeholder="EXP. Date" size="normal" format={"DD/MM/YYYY"} />
            </Form.Item>
          </>
        );
      },
    },
    {
      name: "Subtotal Setelah Diskon",
      width: "200px",
      selector: (row, idx) => calculatePriceAfterDisc(row, idx),
    },
    {
      name: "Subtotal",
      width: "200px",
      selector: (row, idx) => formatter.format(productSubTotal[idx]),
    },
    {
      name: "Hapus",
      width: "150px",
      selector: (row, idx) => (
        <AlertDialog
          onCancel={onCancel}
          onConfirm={onConfirm}
          title="Hapus Produk"
          message="Produk akan dihapus dari daftar ini. Lanjutkan?"
          id={idx}
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
      noDataComponent={`--Belum ada produk--`}
    />
  );
}

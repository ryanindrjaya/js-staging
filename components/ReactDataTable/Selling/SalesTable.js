import DataTable from "react-data-table-component";
import AlertDialog from "../../Alert/Alert";
import { Input, InputNumber, Select, Form, Row, DatePicker } from "antd";
import { useDispatch } from "react-redux";
import { useState } from "react";

export default function SalesTable({
  calculatePriceAfterDisc,
  productSubTotal,
  setProductSubTotal,
  products,
  setTotalPrice,
  dataLocationStock,
  dataDetailTrx,
  stokString,
  formObj,
  retur = false,
  locations = [],
}) {
  const dispatch = useDispatch();
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
    dispatch({
      type: "CHANGE_PRODUCT_UNIT",
      unit: data,
      product: value,
      index,
    });
  };

  const onChangeQty = (value, data, index) => {
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

  const columns = [
    {
      name: "Nama Produk",
      width: "150px",
      selector: (row) => row.attributes?.name,
    },
    {
      name: "Stok Gudang",
      width: "300px",
      omit: retur,
      wrap: true,
      selector: (row, idx) => {
        if (dataLocationStock?.[row.id]) {
          const stock = dataLocationStock?.[row.id];

          const arrStock = [];

          for (let unit in stock.stok_gudang) {
            const qty = stock.stok_gudang[unit];

            arrStock.push(`${qty}${unit}`);
          }

          return <div className="disabled:bg-white whitespace-normal italic text-gray-500">{arrStock.join(", ")}</div>;
        } else {
          return <div className="disabled:bg-white italic text-gray-500">Stok Kosong</div>;
        }
      },
    },
    {
      name: "Harga Satuan",
      width: "150px",
      selector: (row, idx) => {
        var priceUnit = row.attributes?.sold_price_1;
        if (products.productInfo[idx]) {
          if (products.productInfo[idx].priceUnit) {
            priceUnit = products.productInfo[idx].priceUnit;
          }
        }

        return formatter.format(priceUnit);
      },
    },
    {
      name: retur ? "Jumlah Retur" : "Jumlah Penjualan",
      width: "220px",
      selector: (row, idx) => {
        var defaultQty = 1;
        var defaultUnit = row.attributes?.unit_1;
        var defaultIndex = 1;
        let max = 0;
        let min = max > 0 ? 1 : 0;
        const stock = dataLocationStock?.[row.id]?.stock;
        const conversion = dataLocationStock?.[row.id]?.conversion;

        if (products.productInfo[idx]?.qty) {
          defaultQty = products.productInfo[idx].qty;
        }

        if (products.productInfo[idx]?.unitIndex) {
          defaultIndex = products.productInfo[idx].unitIndex;
        }
        if (products.productInfo[idx]?.unit) {
          defaultUnit = products.productInfo[idx].unit;
        }

        if (stock) {
          max = stock[defaultUnit].qty;
        } else if (retur) {
          if (defaultUnit === dataLocationStock?.[row.id]?.order_details?.unit) {
            max = dataLocationStock?.[row.id]?.order_details?.qty;
          } else {
            // set max based on product conversion
            let productConversion = {};
            let orderUnitIndex;

            [1, 2, 3, 4, 5].forEach((i) => {
              if (row?.attributes[`unit_${i}`] === dataLocationStock?.[row.id]?.order_details?.unit) {
                orderUnitIndex = i;
              }
            });

            for (let i = orderUnitIndex; i <= 5; i++) {
              if (row?.attributes[`unit_${i}`]) {
                const unit = row?.attributes[`unit_${i}`];
                const conversion = row?.attributes[`qty_${i}`];
                const previousConversion = productConversion[row?.attributes[`unit_${i - 1}`]] || 1;
                if (i !== orderUnitIndex) {
                  productConversion[unit] = conversion * previousConversion;
                } else {
                  productConversion[unit] = conversion;
                }
              }
            }

            const stockBasedOnOrder = productConversion[defaultUnit] * dataLocationStock?.[row.id]?.order_details?.qty;

            max = stockBasedOnOrder > 0 ? stockBasedOnOrder : 0;
          }
        }

        return (
          <>
            <Row>
              <Form.Item name={["jumlah_qty", `${idx}`]} noStyle>
                <InputNumber
                  defaultValue={defaultQty}
                  onChange={(e) => onChangeQty(e, row, idx)}
                  min={1}
                  max={max} // added max qty for retur penjualan
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
                  onChange={(value) => onChangeUnit(value, row, idx)}
                  name="jumlah_option"
                  style={{
                    width: "57%",
                  }}
                >
                  {row.attributes?.unit_1 === null ? (
                    <></>
                  ) : (
                    <Select.Option disabled={row.attributes?.unit_1 === null} value={1}>
                      {row.attributes?.unit_1}
                    </Select.Option>
                  )}
                  {row.attributes?.unit_2 === null ? (
                    <></>
                  ) : (
                    <Select.Option disabled={row.attributes?.unit_2 === null} value={2}>
                      {row.attributes?.unit_2}
                    </Select.Option>
                  )}
                  {row.attributes?.unit_3 === null ? (
                    <></>
                  ) : (
                    <Select.Option disabled={row.attributes?.unit_3 === null} value={3}>
                      {row.attributes?.unit_3}
                    </Select.Option>
                  )}
                  {row.attributes?.unit_4 === null ? (
                    <></>
                  ) : (
                    <Select.Option disabled={row.attributes?.unit_4 === null} value={4}>
                      {row.attributes?.unit_4}
                    </Select.Option>
                  )}
                  {row.attributes?.unit_5 === null ? (
                    <></>
                  ) : (
                    <Select.Option disabled={row.attributes?.unit_5 === null} value={5}>
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
      name: "Margin",
      width: "150px",
      omit: retur,
      selector: (row, idx) => {
        var defaultMargin = 0;

        if (products.productInfo[idx]?.margin) {
          defaultMargin = products.productInfo[idx]?.margin;
        }

        return (
          <Row align="bottom" justify="center">
            <Form.Item name={["margin", `${idx}`]} noStyle>
              <InputNumber
                defaultValue={defaultMargin}
                formatter={(value) => `${value}%`}
                min={0}
                max={100}
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
        let defaultDisc = 0;
        if (products.productInfo[idx]?.disc) {
          defaultDisc = products.productInfo[idx]?.disc;
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
        defaultDp1 = products?.productInfo?.[idx]?.d1 || row.attributes?.disc_1_1 || 0;

        // if (products.productInfo[idx]?.d1) {
        //   defaultDp1 = products.productInfo[idx].d1;
        // }

        // if (products.productInfo[idx]) {
        //   if (products.productInfo[idx].unit) {
        //     defaultDp1 = products.productInfo[idx].d1;
        //   }
        // }

        return (
          <div className="disabled:bg-white">
            <InputNumber
              disabled
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
              value={defaultDp2}
              name={["disc_rp2", `${idx}`]}
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
                  message: "Tanggal EXP produk tidak boleh kosong!",
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
      name: "Lokasi Retur",
      width: "250px",
      omit: !retur,
      sortable: true,
      selector: (row, idx) => {
        return (
          <>
            <Form.Item
              label={"product_location"}
              name={["product_location", `${idx}`]}
              rules={[
                {
                  required: true,
                  message: "Lokasi Produk tidak boleh kosong!",
                },
              ]}
              noStyle
            >
              <Select
                placeholder="Pilih Lokasi Produk"
                size="normal"
                style={{
                  width: "200px",
                  marginRight: "10px",
                }}
              >
                {locations.map((element) => {
                  return (
                    <Select.Option value={element.id} key={element.attributes.name}>
                      {element.attributes.name}
                    </Select.Option>
                  );
                })}
              </Select>
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

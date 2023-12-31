import DataTable from "react-data-table-component";
import AlertDialog from "../../Alert/Alert";
import { Input, InputNumber, Select, Form, Row, DatePicker } from "antd";
import { useDispatch } from "react-redux";
import { useState } from "react";

export default function ReactDataTable({
  calculatePriceAfterDisc,
  productSubTotal,
  setProductSubTotal,
  products,
  setTotalPrice,
  dataLocationStock,
  setDataLocationStock,
  dataDetailTrx,
  stokString,
  formObj,
  getProduct,
  editPriceDisc = false,
  noMaxInput = false,
  isEdit = false,
}) {
  const dispatch = useDispatch();
  var defaultDp1 = 0;
  var defaultDp2 = 0;
  var defaultDp3 = 0;
  var unit = [];
  var priceUnit = 1;
  var tempIndex = 0;
  var stock = 0;

  var formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 2,
  });

  const onDeleteProduct = (index, product) => {
    console.log("products", product);
    dispatch({ type: "REMOVE_PRODUCT", index: index });

    formObj.setFieldsValue({
      harga_satuan: {
        [index]: product.sold_price_1,
      },
      jumlah_qty: {
        [index]: 1,
      },
      jumlah_option: {
        [index]: 1,
      },
      disc_rp: {
        [index]: 0,
      },
      margin: {
        [index]: 0,
      },
    });
  };

  const onChangeUnit = (data, value, index) => {
    const item = products.productList[index];
    const newValue = item.attributes[`sold_price_${data}`];

    onChangeProductPrice(newValue, value, index);

    formObj.setFieldsValue({
      harga_satuan: {
        [index]: newValue,
      },
    });

    dispatch({
      type: "CHANGE_PRODUCT_UNIT",
      unit: data,
      product: value,
      index,
    });
    getProduct(data, index);
  };

  const onChangeQty = (value, data, index) => {
    dispatch({
      type: "CHANGE_PRODUCT_QTY",
      qty: value,
      product: data,
      index,
    });
  };

  const onChangePriceUnit = (value, data, index, indexRow, changedValue) => {
    onChangeProductPrice(changedValue, data, indexRow);
  };

  const onChangeProductPrice = (unit_price, product, index) => {
    dispatch({
      type: "CHANGE_PRODUCT_PRICE",
      unit_price: unit_price,
      product: product,
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

  const onConfirm = (id, product) => {
    var newSubTotalProduct = productSubTotal;
    var newProductInfo = products.productInfo;

    delete newSubTotalProduct[id];
    delete newProductInfo[id];

    setProductSubTotal(newSubTotalProduct);
    let subtotal = productSubTotal;
    onDeleteProduct(id, product);

    subtotal[id + 1] = 0;
    setProductSubTotal(subtotal);
    sumProductSubTotal(productSubTotal);

    // hapus data stok
    const newDataLocationStock = Object.values(dataLocationStock);
    newDataLocationStock.splice(id, 1);

    setDataLocationStock(newDataLocationStock.reduce((obj, item, index) => ((obj[index] = item), obj), {}));

    if (products.productList.length == 0) {
      setTotalPrice(0);
    }
  };

  console.log("products", products);

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
      wrap: true,
      selector: (row) => row.attributes?.name,
    },
    {
      name: "Stok Gudang",
      selector: (row, idx) => {
        return (
          <div className={`disabled:bg-white italic ${dataLocationStock?.[idx] ? "text-green-500" : "text-red-500"}`}>
            {`${dataLocationStock?.[idx] || "Tidak Tersedia"}` ?? "Pilih Gudang"}
          </div>
        );
      },
    },
    {
      name: "Harga Satuan",
      width: "200px",
      selector: (row, idx) => {
        var priceUnit = row.attributes?.sold_price_1;
        if (products.productInfo[idx]) {
          if (products.productInfo[idx].priceUnit) {
            priceUnit = products.productInfo[idx].priceUnit;
          }
        }

        return (
          <Row align="bottom" justify="center">
            <Form.Item name={["harga_satuan", `${idx}`]} noStyle>
              <InputNumber
                disabled={!editPriceDisc}
                defaultValue={priceUnit}
                formatter={(value) => value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                onChange={(e) => onChangePriceUnit(e, row, unit[idx], idx, e)}
                style={{
                  width: "100%",
                  marginRight: "10px",
                }}
              />
            </Form.Item>
          </Row>
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

        if (products.productInfo[idx]?.qty) {
          defaultQty = products.productInfo[idx].qty;
        }

        if (products.productInfo[idx]?.unitIndex) {
          defaultIndex = products.productInfo[idx].unitIndex;
        }

        unit[idx] = defaultIndex;

        let max = null;

        if (dataLocationStock?.[idx]) {
          const stringArr = dataLocationStock?.[idx]?.split(" ");
          max = parseInt(stringArr?.[0]);
        }

        return (
          <>
            <Row>
              <Form.Item name={["jumlah_qty", `${idx}`]} noStyle>
                <InputNumber
                  onFocus={(e) => e.target.select()}
                  defaultValue={defaultQty}
                  onChange={(e) => onChangeQty(e, row, idx)}
                  min={1}
                  max={noMaxInput ? null : max ?? dataDetailTrx?.data?.[idx]?.attributes?.qty} // added max qty for retur penjualan
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
      selector: (row, idx) => {
        var defaultMargin = 0;

        return (
          <Row align="bottom" justify="center">
            <Form.Item name={["margin", `${idx}`]} noStyle>
              <InputNumber
                defaultValue={defaultMargin}
                formatter={(value) => `${value}%`}
                min={0}
                max={100}
                onFocus={(e) => e.target.select()}
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
                onFocus={(e) => e.target.select()}
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
        defaultDp1 = products?.productInfo?.[idx]?.disc || row.attributes?.disc_1_1 || 0;

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
              disabled={!editPriceDisc}
              controls={false}
              formatter={(value) => `${value}%`}
              onFocus={(e) => e.target.select()}
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
        //defaultDp2 = row.attributes?.unit_1_dp2 || 0;
        defaultDp2 = products.productInfo?.[idx]?.d2 || 0;

        console.log("defaultDp2", defaultDp2);

        // if (products.productInfo[idx]) {
        //   if (products.productInfo[idx].unit) {
        //     defaultDp2 = products.productInfo[idx].d2;
        //   }
        // }

        return (
          <Form.Item name={["dp2", `${idx}`]} noStyle>
            <div className="disabled:bg-white">
              <InputNumber
                controls={false}
                formatter={(value) => `${value}%`}
                max={100}
                onFocus={(e) => e.target.select()}
                min={0}
                value={defaultDp2}
                onChange={(e) => onChangeD1D2D3(e, row, "d2", idx)}
                style={{
                  width: "60px",
                }}
              />
            </div>
          </Form.Item>
        );
      },
    },
    // {
    //   name: "EXPDate",
    //   width: "150px",
    //   sortable: true,
    //   selector: (row, idx) => {
    //     return (
    //       <>
    //         <Form.Item
    //           label={"exp date"}
    //           name={["expired_date", `${idx}`]}
    //           rules={[
    //             {
    //               required: true,
    //               message: "Tanggal EXP produk tidak boleh kosong!",
    //             },
    //           ]}
    //           noStyle
    //         >
    //           <DatePicker placeholder="EXP. Date" size="normal" format={"DD/MM/YYYY"} />
    //         </Form.Item>
    //       </>
    //     );
    //   },
    // },
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
          onConfirm={() => onConfirm(idx, row.attributes)}
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

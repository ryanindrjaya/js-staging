import DataTable from "react-data-table-component";
import AlertDialog from "../../Alert/Alert";
import { Input, InputNumber, Select, Form, Row, DatePicker } from "antd";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

export default function ReactDataTable({
  calculatePriceAfterDisc,
  productSubTotal,
  setProductSubTotal,
  products,
  locations,
  setTotalPrice,
  formObj,
  initialQty,
}) {
  const dispatch = useDispatch();

  useEffect(() => {}, [products]);

  var defaultDp1 = 0;
  var defaultDp2 = 0;
  var defaultDp3 = 0;
  var unit = [];
  var priceUnit = 1;
  var tempIndex = null;

  var formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 2,
  });

  const onDeleteProduct = (value) => {
    dispatch({ type: "REMOVE_PRODUCT", index: value });
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

  const onChangeProductPrice = (unit_price, product, index) => {
    dispatch({
      type: "CHANGE_PRODUCT_PRICE",
      unit_price: unit_price,
      product: product,
      index,
    });
  };

  const onChangePriceUnit = (value, data, index, indexRow, changedValue) => {
    console.log("onChangePriceUnit", value, data, index, indexRow);
    var tempPriceUnit = [];

    const selectedUnit = formObj.getFieldValue(`jumlah_option`) || products.productInfo;

    const selectedUnitIndex = selectedUnit?.[indexRow]?.unitIndex || selectedUnit?.[indexRow] || index;

    const discRp = formObj.getFieldValue(`disc_rp`) || products.productInfo;
    const discRpIndex =
      discRp?.[indexRow]?.disc || discRp?.[indexRow] || data.attributes[`purchase_discount_${selectedUnitIndex}`];
    console.log("change discount to ", discRpIndex);
    onChangeDisc(discRpIndex, data, indexRow);

    tempPriceUnit.push(data.attributes.buy_price_1);
    tempPriceUnit.push(data.attributes.buy_price_2);
    tempPriceUnit.push(data.attributes.buy_price_3);
    tempPriceUnit.push(data.attributes.buy_price_4);
    tempPriceUnit.push(data.attributes.buy_price_5);

    // data.attributes.buy_price_1 = value;
    // data.attributes.buy_price_2 = value;
    // data.attributes.buy_price_3 = value;
    // data.attributes.buy_price_4 = value;
    // data.attributes.buy_price_5 = value;

    data.attributes.buy_price_1 = tempPriceUnit[0];
    data.attributes.buy_price_2 = tempPriceUnit[1];
    data.attributes.buy_price_3 = tempPriceUnit[2];
    data.attributes.buy_price_4 = tempPriceUnit[3];
    data.attributes.buy_price_5 = tempPriceUnit[4];

    if (tempIndex != index) {
      console.log("===== masuk siini =====");
      tempIndex = index;
      onChangeUnit(selectedUnitIndex, data, indexRow, changedValue);
      return;
    }

    onChangeProductPrice(changedValue, data, indexRow);
    console.log("product (redux)", products);
    formObj.setFieldsValue({
      harga_satuan: {
        [indexRow]: changedValue,
      },
      disc_rp: {
        [indexRow]: discRpIndex,
      },
    });
    console.log("product data", products);
  };

  const onChangeUnit = (selectedUnitIndex, data, index, changedValue) => {
    let priceEx = 0;

    // reset disc on change
    formObj.setFieldsValue({
      disc_rp: {
        [index]: null,
      },
    });

    unit = selectedUnitIndex;
    if (selectedUnitIndex == 1) {
      priceEx = data.attributes.buy_price_1;
    } else if (selectedUnitIndex == 2) {
      priceEx = data.attributes.buy_price_2;
    } else if (selectedUnitIndex == 3) {
      priceEx = data.attributes.buy_price_3;
    } else if (selectedUnitIndex == 4) {
      priceEx = data.attributes.buy_price_4;
    } else if (selectedUnitIndex == 5) {
      priceEx = data.attributes.buy_price_5;
    }

    changedValue = changedValue || priceEx;

    dispatch({
      type: "CHANGE_PRODUCT_UNIT",
      unit: selectedUnitIndex,
      product: data,
      index,
    });

    onChangePriceUnit(priceEx, data, selectedUnitIndex, index, changedValue);
    tempIndex = 0;
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
      case "d3":
        dispatch({
          type: "CHANGE_PRODUCT_D3",
          d3: value,
          product: data,
          index,
        });
        break;
      default:
        break;
    }
  };

  const onConfirm = (id) => {
    var newSubTotalProduct = productSubTotal;
    var newProductInfo = products.productInfo;

    delete newSubTotalProduct[id];
    delete newProductInfo[id];

    setProductSubTotal(newSubTotalProduct);

    const subtotal = productSubTotal[id];
    setTotalPrice((prev) => prev - subtotal);
    onDeleteProduct(id);
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
      name: "Jumlah Pesanan",
      width: "239px",
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

        return (
          <>
            <Row>
              <Form.Item name={["jumlah_qty", `${idx}`]} noStyle>
                <InputNumber
                  disabled
                  defaultValue={defaultQty}
                  onChange={(e) => onChangeQty(e, row, idx)}
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
                  disabled
                  defaultValue={defaultIndex}
                  onChange={(value) => {
                    console.log("jumlah option  value ", value);
                    onChangeUnit(value, row, idx);
                  }}
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
                  disabled
                  defaultValue={priceUnit}
                  min={0}
                  onChange={(e) => {
                    onChangePriceUnit(e, row, unit[idx], idx, e);
                  }}
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
      name: "Diskon",
      width: "150px",
      selector: (row, idx) => {
        var defaultDisc = row?.attributes?.purchase_discount_1 || 0;
        if (products.productInfo[idx].disc !== null || products.productInfo[idx].disc !== undefined) {
          defaultDisc = products?.productInfo[idx]?.disc;
        }

        return (
          <Row align="bottom" justify="center">
            <Form.Item name={["disc_rp", `${idx}`]} noStyle>
              <InputNumber
                disabled
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
              disabled
              controls={false}
              formatter={(value) => `${value}%`}
              max={100}
              min={0}
              value={defaultDp1}
              name={`disc_rp1_${idx}`}
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
              disabled
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
      name: "D3",
      width: "100px",
      selector: (row, idx) => {
        defaultDp3 = row.attributes?.unit_1_dp3 || 0;
        if (products.productInfo[idx]?.d3) {
          defaultDp3 = products.productInfo[idx].d3;
        }

        if (products.productInfo[idx]) {
          if (products.productInfo[idx].unit) {
            defaultDp3 = products.productInfo[idx].d3;
          }
        }

        return (
          <div className="disabled:bg-white">
            <InputNumber
              disabled
              controls={false}
              formatter={(value) => `${value}%`}
              max={100}
              min={0}
              name={["disc_rp3", `${idx}`]}
              value={defaultDp3}
              onChange={(e) => onChangeD1D2D3(e, row, "d3", idx)}
              style={{
                width: "60px",
              }}
            />
          </div>
        );
      },
    },
    {
      name: "Lokasi",
      width: "250px",
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
      name: "Batch",
      width: "150px",
      sortable: true,
      selector: (row, idx) => {
        return (
          <>
            <Form.Item label={"Batch"} name={["batch", `${idx}`]} noStyle>
              <Input size="normal" />
            </Form.Item>
          </>
        );
      },
    },
    {
      name: "Harga Satuan Setelah Diskon",
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

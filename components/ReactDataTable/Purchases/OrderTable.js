import DataTable from "react-data-table-component";
import AlertDialog from "../../Alert/Alert";
import { InputNumber, Select, Form, Row } from "antd";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

export default function OrderTable({
  calculatePriceAfterDisc,
  productSubTotal,
  setProductSubTotal,
  products,
  setTotalPrice,
  formObj,
}) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  var defaultDp1 = 0;
  var defaultDp2 = 0;
  var defaultDp3 = 0;
  var unit = 1;
  var priceUnit = 1;
  var tempIndex = 0;

  var formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
    useGrouping: true,
    groupingSeparator: ",",
    decimalSeparator: ".",
  });

  useEffect(() => {
    if (products?.productList?.length > 0) {
      setLoading(false);
    }
  }, [products]);

  const onDeleteProduct = (value) => {
    dispatch({ type: "REMOVE_PRODUCT", index: value });
  };

  const onChangeUnit = (value, data, index) => {
    console.log("data change unit", value, data, index);
    unit = value;
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

    dispatch({
      type: "CHANGE_PRODUCT_UNIT",
      unit: value,
      product: data,
      index,
    });
    onChangePriceUnit(priceUnit, data, value, index);
    tempIndex = 0;
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

  const onChangePriceUnit = (value, data, index, indexRow) => {
    console.log("get index", index, indexRow);
    var tempPriceUnit = [];

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
      onChangeUnit(index, data, indexRow);
    }

    data.attributes.buy_price_1 = tempPriceUnit[0];
    data.attributes.buy_price_2 = tempPriceUnit[1];
    data.attributes.buy_price_3 = tempPriceUnit[2];
    data.attributes.buy_price_4 = tempPriceUnit[3];
    data.attributes.buy_price_5 = tempPriceUnit[4];

    console.log("editing purpose", products?.productInfo?.[indexRow]?.disc);

    formObj.setFieldsValue({
      harga_satuan: {
        [indexRow]: value,
      },
      disc_rp: {
        [indexRow]: data.attributes[`purchase_discount_${index}`],
      },
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
      width: "200px",
      selector: (row, idx) => row.attributes?.name,
    },
    {
      name: "Jumlah Pesanan",
      width: "230px",
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

        return (
          <>
            <Row>
              <Form.Item name={["jumlah_qty", `${idx}`]} noStyle>
                <InputNumber
                  min={1}
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
      name: "Harga Satuan",
      width: "150px",
      selector: (row, idx) => {
        var priceUnit = row.attributes?.buy_price_1;
        if (products.productInfo[idx]?.priceUnit) {
          console.log("price unit", products.productInfo[idx].priceUnit);
          priceUnit = products.productInfo[idx].priceUnit;
        }
        return (
          <>
            <Row>
              <Form.Item name={["harga_satuan", `${idx}`]} noStyle>
                <InputNumber
                  defaultValue={priceUnit}
                  min={0}
                  onChange={(e) => {
                    const selectedUnitIndex =
                      formObj.getFieldValue("jumlah_option") ?? products?.productInfo[idx]?.unitIndex;

                    console.log(products);

                    console.log("test data onchange", e, row, selectedUnitIndex, idx);
                    // console.log("selected unit", selectedUnitIndex);
                    // onChangePriceUnit(e, row, unit, selectedUnitIndex[idx])

                    // edit prupose
                    // console.log("edit ", products?.productInfo[idx]?.unitIndex);

                    onChangePriceUnit(e, row, selectedUnitIndex?.[idx] ?? 1, idx);
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
        var defaultDisc = products?.productList[idx]?.attributes?.purchase_discount_1 || 0;

        if (products.productInfo[idx]?.disc !== undefined) {
          defaultDisc = products.productInfo[idx].disc;
        }

        return (
          <Row align="bottom" justify="center">
            <Form.Item name={["disc_rp", `${idx}`]} noStyle>
              <InputNumber
                controls={false}
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
        if (products.productInfo[idx]?.d1 !== undefined) {
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
        if (products.productInfo[idx]?.d2 !== undefined) {
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
      name: "D3",
      width: "100px",
      selector: (row, idx) => {
        defaultDp3 = row.attributes?.unit_1_dp3 || 0;
        if (products.productInfo[idx]?.d3 !== undefined) {
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
      keyField=""
      customStyles={customStyles}
      paginationRowsPerPageOptions={[50]}
      columns={columns}
      data={products?.productList || data || []}
      noDataComponent={`--Belum ada produk--`}
    />
  );
}

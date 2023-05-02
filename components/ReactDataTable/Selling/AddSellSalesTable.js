import DataTable from "react-data-table-component";
import AlertDialog from "../../Alert/Alert";
import { Input, InputNumber, Select, Form, Row, DatePicker } from "antd";
import { useDispatch } from "react-redux";

export default function ReactDataTable({
  calculatePriceAfterDisc,
  productSubTotal,
  products,
  locations,
  setTotalPrice,
  formObj,
}) {
  const dispatch = useDispatch();

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

  //const onChangeUnit = (value, data) => {
  //  unit = value;
  //  if(value == 1){ priceUnit = data.attributes.buy_price_1; }
  //  else if(value == 2){ priceUnit = data.attributes.buy_price_2; }
  //  else if(value == 3){ priceUnit = data.attributes.buy_price_3; }
  //  else if(value == 4){ priceUnit = data.attributes.buy_price_4; }
  //  else if(value == 5){ priceUnit = data.attributes.buy_price_5; }

  //  dispatch({ type: "CHANGE_PRODUCT_UNIT", index: value, product: data });
  //  onChangePriceUnit(priceUnit, data, value);
  //  tempIndex = 0;
  //};

  const onChangeQty = (value, data, index) => {
    dispatch({
      type: "CHANGE_PRODUCT_QTY",
      qty: value,
      product: data,
      index,
    });
  };

  const onChangeUnit = (data, value, index) => {
    dispatch({ type: "CHANGE_PRODUCT_UNIT", unit: data, product: value, index });
    var hargaSatuan = 0;
    if (data == 1) {
      hargaSatuan = value.attributes.buy_price_1;
      priceUnit = hargaSatuan;
    } else if (data == 2) {
      hargaSatuan = value.attributes.buy_price_2;
      priceUnit = hargaSatuan;
    } else if (data == 3) {
      hargaSatuan = value.attributes.buy_price_3;
      priceUnit = hargaSatuan;
    } else if (data == 4) {
      hargaSatuan = value.attributes.buy_price_4;
      priceUnit = hargaSatuan;
    } else if (data == 5) {
      hargaSatuan = value.attributes.buy_price_5;
      priceUnit = hargaSatuan;
    }

    //formObj.setFieldsValue({
    //  harga_satuan: hargaSatuan,
    //});
    onChangePriceUnit(hargaSatuan, value, index);
  };

  const onChangePriceUnit = (data, value, index) => {
    dispatch({ type: "CHANGE_PRODUCT_PRICE", unit_price: data, product: value, index });
  };

  const onConfirm = (id) => {
    const subtotal = productSubTotal[id];
    setTotalPrice((prev) => prev - subtotal);

    for (let index = 0; index < products.productList.length; index++) {
      const element = products.productList[index];
      if (element.id === id) {
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

  const columns = [
    {
      name: "Nama Produk",
      selector: (row) => row.attributes?.name,
    },
    {
      name: "Jumlah Stock",
      wrap: true,
      selector: (row) => {
        console.log("row stock", row.stock);
        let result = [];
        for (let unit in row?.stock) {
          result.push(`${row?.stock?.[unit].stock}${row?.stock?.[unit].unit}`);
        }

        return result.join(", ");
      },
    },
    {
      name: "Harga Satuan",
      selector: (row, idx) => {
        var priceUnit = row.attributes?.buy_price_1;
        if (products.productInfo[idx]?.priceUnit || products.productInfo[idx]?.unit_price) {
          priceUnit = products.productInfo[idx]?.unit_price || products.productInfo[idx].priceUnit;
        }

        return (
          <>
            <Row>
              <InputNumber
                readOnly
                value={priceUnit}
                min={0}
                onChange={(e) => onChangePriceUnit(e, row, unit[idx], idx)}
                style={{
                  width: "150px",
                  marginRight: "10px",
                }}
                formatter={(value) => value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
              />
            </Row>
          </>
        );
      },
    },
    {
      name: "Jumlah Penjualan",
      width: "260px",
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

        if (products.productInfo[idx]?.unit) {
          defaultOption = products.productInfo[idx].unit;
        }

        return (
          <>
            <Row>
              <Form.Item name={["jumlah_qty", `${idx}`]} noStyle>
                <InputNumber
                  defaultValue={defaultQty}
                  onChange={(e) => onChangeQty(e, row, idx)}
                  rules={[
                    {
                      required: true,
                      message: "Required",
                    },
                  ]}
                  max={row.stock?.[defaultOption]?.stock || 0}
                  min={1}
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
                    width: "50%",
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
      name: "Diskon Jual (%)",
      selector: (row, idx) => {
        let defaultDp1 = row.attributes?.unit_1_dp1 || 0;
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
              onFocus={(e) => e.target.select()}
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
      name: "Subtotal",
      selector: (row, idx) => {
        let priceUnit = row.attributes?.buy_price_1;
        let qty = 1;
        let diskonJual = 0;
        if (products.productInfo[idx]?.priceUnit || products.productInfo[idx]?.unit_price) {
          priceUnit = products.productInfo[idx]?.unit_price || products.productInfo[idx].priceUnit;
        }

        if (products.productInfo[idx]?.qty) {
          qty = products.productInfo[idx].qty;
        }

        if (products.productInfo[idx]?.d1) {
          diskonJual = products.productInfo[idx].d1;
        }

        let subtotal = priceUnit * qty - (priceUnit * qty * diskonJual) / 100;

        return formatter.format(subtotal);
      },
    },
    {
      name: "Hapus",
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
      noDataComponent={`--Belum ada produk--`}
    />
  );
}

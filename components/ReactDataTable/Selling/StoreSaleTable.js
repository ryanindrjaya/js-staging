import DataTable from "react-data-table-component";
import AlertDialog from "../../Alert/Alert";
import { Input, InputNumber, Select, Form, Row, DatePicker } from "antd";
import { useDispatch } from "react-redux";

export default function ReactDataTable({ calculatePriceAfterDisc, productSubTotal, products, locations, setTotalPrice, formObj }) {
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

  const onChangeUnit = (data, value) => {     
    dispatch({ type: "CHANGE_SALE_PRODUCT_UNIT", product: data, value });
  };

  const onChangeQty = (value, data) => {
    dispatch({
      type: "CHANGE_SALE_PRODUCT_QTY",
      qty: value,
      product: data,
    });
  };

  const onChangeDisc = (value, data) => {
    dispatch({
      type: "CHANGE_SALE_PRODUCT_DISC",
      disc: value,
      product: data,
    });
  };

  const onChangeMargin = (value, data) => {
    dispatch({
      type: "CHANGE_SALE_PRODUCT_MARGIN",
      margin: value,
      product: data,
    });
  };

  const onChangeD1D2D3 = (value, data, type) => {
    switch (type) {
      case "d1":
        dispatch({
          type: "CHANGE_SALE_PRODUCT_D1",
          d1: value,
          product: data,
        });
        break;
      case "d2":
        dispatch({
          type: "CHANGE_SALE_PRODUCT_D2",
          d2: value,
          product: data,
        });
        break;
      //case "d3":
      //  dispatch({
      //    type: "CHANGE_PRODUCT_D3",
      //    d3: value,
      //    product: data,
      //  });
      //  break;
      default:
        break;
    }
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
    console.log("productinfo", products)
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
      selector: (row) => { console.log(row, priceUnit)
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
      name: "Jumlah Penjualan",
      width: "220px",
      selector: (row) => {
        var defaultQty = 1;
        var defaultOption = row.attributes?.unit_1;
        var defaultIndex = 1;

        if (products.productInfo[row.id]?.qty) {
          defaultQty = products.productInfo[row.id].qty;
        }

        if (products.productInfo[row.id]?.unitIndex) {
          defaultIndex = products.productInfo[row.id].unitIndex;
        }

        return (
          <>
            <Row>
              <Form.Item name={["jumlah_qty", `${row.id}`]} noStyle>
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

              <Form.Item name={["jumlah_option", `${row.id}`]} noStyle>
                <Select
                  defaultValue={defaultIndex}
                  onChange={(value) => onChangeUnit(row, value)}
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
      name: "Margin",
      width: "150px",
      selector: (row) => {
        var defaultMargin = 0;

        return (
          <Row align="bottom" justify="center">
            <Form.Item name={["margin", `${row.id}`]} noStyle>
              <InputNumber
                defaultValue={defaultMargin}
                min={0}
                onChange={(e) => onChangeMargin(e, row)}
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
        if (products.productInfo[row.id]?.disc) {
          defaultDisc = products.productInfo[row.id].disc;
        }

        return (
          <Row align="bottom" justify="center">
            <Form.Item name={["disc_rp", `${row.id}`]} noStyle>
              <InputNumber
                defaultValue={defaultDisc}
                min={0}
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
      name: "D1",
      width: "100px",
      selector: (row) => {
        defaultDp1 = row.attributes?.unit_1_dp1 || 0;
        if (products.productInfo[row.id]?.d1) {
          defaultDp1 = products.productInfo[row.id].d1;
        }

        if (products.productInfo[row.id]) {
          if (products.productInfo[row.id].unit) {
            defaultDp1 = products.productInfo[row.id].d1;
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
              name={`disc_rp1_${row.id}`}
              onChange={(e) => onChangeD1D2D3(e, row, "d1")}
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
      selector: (row) => {
        defaultDp2 = row.attributes?.unit_1_dp2 || 0;
        if (products.productInfo[row.id]?.d2) {
          defaultDp2 = products.productInfo[row.id].d2;
        }

        if (products.productInfo[row.id]) {
          if (products.productInfo[row.id].unit) {
            defaultDp2 = products.productInfo[row.id].d2;
          }
        }

        return (
          <div className="disabled:bg-white">
            <InputNumber
              controls={false}
              formatter={(value) => `${value}%`}
              max={100}
              min={0}
              name={["disc_rp2", `${row.id}`]}
              value={defaultDp2}
              onChange={(e) => onChangeD1D2D3(e, row, "d2")}
              style={{
                width: "60px",
              }}
            />
          </div>
        );
      },
    },
    //{
    //  name: "D3",
    //  width: "100px",
    //  selector: (row) => {
    //    defaultDp3 = row.attributes?.unit_1_dp3 || 0;
    //    if (products.productInfo[row.id]?.d3) {
    //      defaultDp3 = products.productInfo[row.id].d3;
    //    }

    //    if (products.productInfo[row.id]) {
    //      if (products.productInfo[row.id].unit) {
    //        defaultDp3 = products.productInfo[row.id].d3;
    //      }
    //    }

    //    return (
    //      <div className="disabled:bg-white">
    //        <InputNumber
    //          controls={false}
    //          formatter={(value) => `${value}%`}
    //          max={100}
    //          min={0}
    //          name={["disc_rp3", `${row.id}`]}
    //          value={defaultDp3}
    //          onChange={(e) => onChangeD1D2D3(e, row, "d3")}
    //          style={{
    //            width: "60px",
    //          }}
    //        />
    //      </div>
    //    );
    //  },
    //},
    {
      name: "EXPDate",
      width: "150px",
      sortable: true,
      selector: (row) => {
        return (
          <>
            <Form.Item
              label={"exp date"}
              name={["expired_date", `${row.id}`]}
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
      selector: (row) => calculatePriceAfterDisc(row),
    },
    {
      name: "Subtotal",
      width: "200px",
      selector: (row) => console.log("sub totals :",productSubTotal[row.id], products),
      //selector: (row) => formatter.format(productSubTotal[row.id]),
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
      noDataComponent={`--Belum ada produk--`}
    />
  );
}

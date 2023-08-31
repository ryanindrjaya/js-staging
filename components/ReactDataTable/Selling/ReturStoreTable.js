import DataTable from "react-data-table-component";
import AlertDialog from "../../Alert/Alert";
import { Input, InputNumber, Select, Form, Row, DatePicker } from "antd";
import { useDispatch } from "react-redux";

export default function ReactDataTable({
  calculatePriceAfterDisc,
  productSubTotal,
  setProductSubTotal,
  products,
  setTotalPrice,
  dataLocationStock,
  dataDetailTrx,
  locations,
  onSelectLocation,
  stokString,
  formObj,
  setSelectedItems,
  selectedItems,
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
      wrap: true,
      selector: (row) => row.attributes?.name,
    },
    {
      name: "Gudang Penerima",
      width: "250px",
      sortable: true,
      selector: (row, idx) => {
        const selected = selectedItems?.find((element) => {
          return element.index === idx;
        });

        return (
          <>
            <Form.Item
              label={"product_location"}
              name={["product_location", `${idx}`]}
              rules={
                selected
                  ? [
                      {
                        required: true,
                        message: "Lokasi produk tidak boleh kosong!",
                      },
                    ]
                  : null
              }
              noStyle
            >
              <Select
                onSelect={(e) => onSelectLocation(e, row, idx)}
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
      name: "Stok Gudang",
      width: "300px",
      selector: (row, idx) => {
        return <div className="disabled:bg-white italic text-gray-500">{stokString?.[idx] ?? "Pilih Gudang"}</div>;
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
      name: "Jumlah Penjualan",
      width: "220px",
      selector: (row, idx) => {
        var defaultQty = 1;
        var defaultOption = row.attributes?.unit_1;
        var defaultIndex = 1;
        var unitChange = false;

        if (products.productInfo[idx]?.qty) {
          defaultQty = products.productInfo[idx].qty;
        }

        if (products.productInfo[idx]?.unitIndex) {
          defaultIndex = products.productInfo[idx].unitIndex;
        }

        if (products.productInfo[idx]?.unit) {
          const defaultUnit = dataDetailTrx?.data?.[idx]?.attributes.unit;
          const unit = products.productInfo[idx].unit;

          unitChange = defaultUnit !== unit;
        }

        const stok = stokString?.[idx]?.split(", ");

        const selectedStok = stok?.find((element, index) => {
          return index === defaultIndex - 1;
        });

        const max = selectedStok?.split(" ")?.[0] ?? 0;

        const selected = selectedItems?.find((element) => {
          return element.index === idx;
        });

        return (
          <>
            <Row>
              <Form.Item name={["jumlah_qty", `${idx}`]} noStyle>
                <InputNumber
                  defaultValue={defaultQty}
                  onChange={(e) => onChangeQty(e, row, idx)}
                  min={1}
                  max={unitChange ? parseInt(max) : dataDetailTrx?.data?.[idx]?.attributes?.qty} // added max qty for retur penjualan
                  rules={
                    selected
                      ? [
                          {
                            required: true,
                            message: "Required",
                          },
                        ]
                      : null
                  }
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
              // disabled
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
        const selected = selectedItems?.find((element) => {
          return element.index === idx;
        });
        return (
          <>
            <Form.Item
              label={"exp date"}
              name={["expired_date", `${idx}`]}
              rules={
                selected
                  ? [
                      {
                        required: true,
                        message: "Tanggal EXP produk tidak boleh kosong!",
                      },
                    ]
                  : null
              }
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
    // {
    //   name: "Hapus",
    //   width: "150px",
    //   selector: (row, idx) => (
    //     <AlertDialog
    //       onCancel={onCancel}
    //       onConfirm={onConfirm}
    //       title="Hapus Produk"
    //       message="Produk akan dihapus dari daftar ini. Lanjutkan?"
    //       id={idx}
    //     />
    //   ),
    // },
  ];

  return (
    <>
      <p className="mb-1">Pilih item yang hendak diretur :</p>
      <DataTable
        customStyles={customStyles}
        paginationRowsPerPageOptions={[50]}
        columns={columns}
        keyField="index"
        data={products.productList}
        noDataComponent={`--Belum ada produk--`}
        selectableRows
        onSelectedRowsChange={(e) => setSelectedItems(e.selectedRows)}
      />
    </>
  );
}

import DataTable from "react-data-table-component";
import AlertDialog from "../../Alert/Alert";
import { Input, InputNumber, Select, Form, Row, DatePicker } from "antd";
import { useDispatch } from "react-redux";

export default function ReactDataTable({ calculatePriceAfterDisc, productSubTotal, products, locations, setTotalPrice, formObj }) {
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

  const onChangeUnit = (value, data) => { 
    unit = value;
    if(value == 1){ priceUnit = data.attributes.buy_price_1; }
    else if(value == 2){ priceUnit = data.attributes.buy_price_2; }
    else if(value == 3){ priceUnit = data.attributes.buy_price_3; }
    else if(value == 4){ priceUnit = data.attributes.buy_price_4; }
    else if(value == 5){ priceUnit = data.attributes.buy_price_5; }
    
    dispatch({ type: "CHANGE_PRODUCT_UNIT", index: value, product: data });
    onChangePriceUnit(priceUnit, data, value);
    tempIndex = 0;
  };

  const onChangeQty = (value, data) => {
    dispatch({
      type: "CHANGE_PRODUCT_QTY",
      qty: value,
      product: data,
    });
  };

  const onChangePriceUnit = (value, data, index) => { 
    var tempPriceUnit = [];  console.log("value", value, data, index);
    
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

    if(tempIndex != index){
        tempIndex = index;
        onChangeUnit(index, data);
    }

    data.attributes.buy_price_1 = tempPriceUnit[0];
    data.attributes.buy_price_2 = tempPriceUnit[1];
    data.attributes.buy_price_3 = tempPriceUnit[2];
    data.attributes.buy_price_4 = tempPriceUnit[3];
    data.attributes.buy_price_5 = tempPriceUnit[4];

    formObj.setFieldsValue({
        harga_satuan: {
            [data.id]: value,
        },
    });
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

  const columns = [
    {
      name: "Nama Produk",
      width: "300px",
      selector: (row) => row.attributes?.name,
    },
    {
      name: "Jumlah Stock",
      width: "170px",
      selector: (row) => row?.stock,
    },
    {
      name: "Harga Satuan",
      width: "180px",
      selector: (row) => {
        var priceUnit = row.attributes?.buy_price_1;
        return  (
         <>
          <Row>
            <Form.Item name={["harga_satuan", `${row.id}`]} noStyle>
              <InputNumber
                defaultValue={priceUnit}
                min={0}
                onChange={(e) => onChangePriceUnit(e, row, unit)}
                style={{
                  width: "150px",
                  marginRight: "10px",
                }}
              />
            </Form.Item>
          </Row>
         </>
         );
      },
    },
    {
      name: "Jumlah Penjualan",
      width: "280px",
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
                  onChange={(value) => onChangeUnit(value, row)}
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
    //{
    //  name: "Subtotal",
    //  width: "200px",
    //  selector: (row) => formatter.format(productSubTotal[row.id]),
    //},
    {
      name: "Hapus",
      width: "200px",
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

import DataTable from "react-data-table-component";
import AlertDialog from "../../Alert/Alert";
import { InputNumber, Select, Form, Row } from "antd";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";

export default function ReactDataTable({
    calculatePriceAfterDisc,
    productSubTotal,
    products,
    setTotalPrice,
    productList
}) {

  const [qty, setQty] = useState([]);
  const [unit, setUnit] = useState([]);
  const dispatch = useDispatch();

  var defaultDp1 = 0;
  var defaultDp2 = 0;
  var defaultDp3 = 0;

  var formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  });

  const onDeleteProduct = (value) => {
    dispatch({ type: "REMOVE_PRODUCT", index: value });
  };

  const onChangeUnit = (value, data) => { //console.log("data unit :"); console.log(data);
    dispatch({ type: "CHANGE_PRODUCT_UNIT", index: value, product: data });
  };

  const onChangeQty = (value, data) => { //console.log("data qty :"); console.log(data);
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

  const onChangeD1D2D3 = (value, data, type) => {
    switch (type) {
      case "d1":
        dispatch({
          type: "CHANGE_PRODUCT_D1",
          d1: value,
          product: data,
        });
        break;
      case "d2":
        dispatch({
          type: "CHANGE_PRODUCT_D2",
          d2: value,
          product: data,
        });
        break;
      case "d3":
        dispatch({
          type: "CHANGE_PRODUCT_D3",
          d3: value,
          product: data,
        });
        break;
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

  //console.log("data product table :"); console.log(productList); console.log(products);
  //const productInfo = null;
  //products.productList.length = productList.length;
  //products.productList.forEach((element) => {
  //products.productInfo.length = null;
  //productList.forEach(element => {
  //    console.log("element baru :"); console.log(element);
  //    //console.log("product :"); console.log(products);
  //    qty.push(element.attributes.total_order);
  //    //data.push(element.attributes.product.data);
  //    console.log("qty dan data :"); //console.log(qty);
  //    console.log(element.attributes.product.data); console.log(products); console.log(qty);
  //    //if (products.productInfo.length != productList.length) {
  //    //  onChangeQty(qty, data);
  //    //}
  //    //products.productList.push(element.attributes.product.data);
  //}); 
    //console.log("product"); console.log(products.productInfo.length)
  //console.log(products)

  useEffect(() => {
    //qty.length = productList.length;
    //if(products.productInfo.length == undefined){ 
        //productList.forEach(element => {
        //    console.log("element baru :"); console.log(element);
        //    //console.log("product :"); console.log(products);
        //    //if (products.productInfo.length == undefined) {
        //      qty.push(element.attributes.total_order);
        //      unit.push(element.attributes.product.data);
        //    //}
        //    //console.log("qty dan data :"); //console.log(qty);
        //    //console.log(element.attributes.product.data); console.log(products); console.log(qty);
        //    //if (products.productInfo.length != productList.length) {
        //    //onChangeQty(element.attributes.total_order, element.attributes.product.data);
        //    //onChangeUnit(element.attributes.unit_order, element.attributes.product.data);
        //    //}
        //    //products.productList.push(element.attributes.product.data);
        //}); 
        //for (let index = 0; index < products.productList.length; index++) {
        //    console.log(productList);
        //}
    //} 
      //console.log("product qty and unit"); console.log(qty); console.log(unit);
  }, [products.productList]);

  useEffect(() => {
    //productList.forEach(element => {
    //    qty.push(element.attributes.total_order);
    //    unit.push(element.attributes.product.data);
    // 
    productList.forEach(element => { console.log("elemen"); console.log(element);
        if (element.attributes.unit_order == element.attributes.product.data.attributes.unit_2) { console.log("masuk")}
        qty.push(element.attributes.total_order);
        unit.push(element.attributes.unit_order);
        //onChangeQty(element.attributes.total_order, element.attributes.product.data);
        //onChangeUnit(element.attributes.unit_order, element.attributes.product.data);
    });
      console.log("product qty and unit"); console.log(qty); console.log(unit); console.log("product :"); console.log(products);
    for (let index = 0; index < products.productList.length; index++) {
      onChangeQty(qty[index], products.productList[index]);
      onChangeUnit(unit[index], products.productList[index]);
      //console.log("unit :"); console.log(products.productList[index].attributes.unit_1);
    }
  }, []);

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
      selector: (row) => { //console.log("ini row :"); console.log(row)
        var defaultQty = 1;
        var defaultOption = row.attributes?.unit_1;
        var defaultIndex = 1;

        if (products.productInfo[row.id]?.qty) {
          defaultQty = products.productInfo[row.id].qty;
        }
          //console.log("jmlh pesanan :"); console.log(products.productInfo[82]);
        if (products.productInfo[row.id]?.unit) {
          defaultIndex = products.productInfo[row.id].unit;
        }

        return (
          <>
            <Row>
              <Form.Item
                name={["jumlah_qty", `${row.id}`]}
                // initialValue={products.productInfo[row.id]?.qty ?? 1}
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
                // initialValue={defaultOption}
                noStyle
              >
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
    {
      name: "Diskon",
      width: "150px",
      selector: (row) => {
        var defaultDisc = 0;
        if (products.productInfo[row.id]?.disc) {
          defaultDisc = products.productInfo[row.id].disc;
        }

        return (
          <Row align="bottom" justify="center">
            <Form.Item name={["disc_rp", `${row.id}`]} noStyle>
              <InputNumber
                controls={false}
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
    {
      name: "D3",
      width: "100px",
      selector: (row) => {
        defaultDp3 = row.attributes?.unit_1_dp3 || 0;
        if (products.productInfo[row.id]?.d3) {
          defaultDp3 = products.productInfo[row.id].d3;
        }

        if (products.productInfo[row.id]) {
          if (products.productInfo[row.id].unit) {
            defaultDp3 = products.productInfo[row.id].d3;
          }
        }

        return (
          <div className="disabled:bg-white">
            <InputNumber
              controls={false}
              formatter={(value) => `${value}%`}
              max={100}
              min={0}
              name={["disc_rp3", `${row.id}`]}
              value={defaultDp3}
              onChange={(e) => onChangeD1D2D3(e, row, "d3")}
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
      selector: (row) => calculatePriceAfterDisc(row),
    },
    {
      name: "Subtotal",
      width: "200px",
      selector: (row) => formatter.format(productSubTotal[row.id]),
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

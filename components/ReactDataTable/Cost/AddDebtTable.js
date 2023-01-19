import DataTable from "react-data-table-component";
import AlertDialog from "../../Alert/Alert";
import { Input, InputNumber, Select, Form, Row, DatePicker } from "antd";
import { useDispatch } from "react-redux";

export default function ReactDataTable({ data }) { console.log("data tabel", data)
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
      name: "Pilih Dokumen",
      width: "150px",
      selector: (row) => {
        row.attributes?.no_purchasing;
      },
    },
    {
      name: "No LPB",
      width: "200px",
      selector: (row) => row.attributes?.no_purchasing,
    },
    {
      name: "Nota Supplier",
      width: "150px",
      selector: (row) => row.attributes?.no_nota_suppplier,
    },
    {
      name: "Nilai LPB",
      width: "150px",
      selector: (row) => formatter.format(row.attributes?.total_purchasing),
    },
    {
      name: "Total Nilai Retur Beli",
      width: "150px",
      //selector: (row) => row.attributes?.name,
    },
    {
      name: "Hutang Jatuh Tempo",
      width: "150px",
      //selector: (row) => row.attributes?.name,
    },
    {
      name: "ACC Tunai",
      width: "150px",
      selector: (row, idx) => {
        var defaultAccTunai = 0;

        return (
          <Row align="bottom" justify="center">
            <Form.Item name={["AccTunai", `${idx}`]} noStyle>
              <InputNumber
                defaultValue={defaultAccTunai}
                //formatter={(value) => `${value}%`}
                min={0}
                max={100}
                //onChange={(e) => onChangeMargin(e, row, idx)}
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
      name: "ACC Bank Transfer",
      width: "150px",
      selector: (row, idx) => {
        var defaultAccBankTf = 0;

        return (
          <Row align="bottom" justify="center">
            <Form.Item name={["AccBankTf", `${idx}`]} noStyle>
              <InputNumber
                defaultValue={defaultAccBankTf}
                //formatter={(value) => `${value}%`}
                min={0}
                max={100}
                //onChange={(e) => onChangeMargin(e, row, idx)}
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
      name: "ACC Bank Giro",
      width: "150px",
      selector: (row, idx) => {
        var defaultAccBankGiro = 0;

        return (
          <Row align="bottom" justify="center">
            <Form.Item name={["AccBankGiro", `${idx}`]} noStyle>
              <InputNumber
                defaultValue={defaultAccBankGiro}
                //formatter={(value) => `${value}%`}
                min={0}
                max={100}
                //onChange={(e) => onChangeMargin(e, row, idx)}
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
      name: "ACC CN",
      width: "150px",
      selector: (row, idx) => {
        var defaultAccCN = 0;

        return (
          <Row align="bottom" justify="center">
            <Form.Item name={["AccCN", `${idx}`]} noStyle>
              <InputNumber
                defaultValue={defaultAccCN}
                //formatter={(value) => `${value}%`}
                min={0}
                max={100}
                //onChange={(e) => onChangeMargin(e, row, idx)}
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
      name: "ACC OTH",
      width: "150px",
      //selector: (row) => row.attributes?.name,
    },
    {
      name: "Sisa Hutang Jt",
      width: "150px",
      //selector: (row) => row.attributes?.name,
    },
    //{
    //  name: "Harga Satuan",
    //  width: "180px",
    //  selector: (row, idx) => {
    //    priceUnit = row.attributes?.buy_price_1;
    //    return  (
    //     <>
    //      <Row>
    //        <Form.Item name={["harga_satuan", `${idx}`]} noStyle>
    //          <InputNumber
    //            defaultValue={priceUnit}
    //            min={0}
    //            onChange={(e) => onChangePriceUnit(e, row, idx)}
    //            style={{
    //              width: "150px",
    //              marginRight: "10px",
    //            }}
    //            formatter={(value) => value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
    //            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
    //          />
    //        </Form.Item>
    //      </Row>
    //     </>
    //     );
    //  },
    //},
    //{
    //  name: "Jumlah Penjualan",
    //  width: "280px",
    //  selector: (row, idx) => {
    //    var defaultQty = 1;
    //    var defaultOption = row.attributes?.unit_1;
    //    var defaultIndex = 1;

    //    if (products.productInfo[idx]?.qty) {
    //      defaultQty = products.productInfo[idx].qty;
    //    }

    //    if (products.productInfo[idx]?.unitIndex) {
    //      defaultIndex = products.productInfo[idx].unitIndex;
    //    }

    //    return (
    //      <>
    //        <Row>
    //          <Form.Item name={["jumlah_qty", `${idx}`]} noStyle>
    //            <InputNumber
    //              defaultValue={defaultQty}
    //              onChange={(e) => onChangeQty(e, row, idx)}
    //              rules={[
    //                {
    //                  required: true,
    //                  message: "Required",
    //                },
    //              ]}
    //              style={{
    //                width: "30%",
    //              }}
    //            />
    //          </Form.Item>

              //<Form.Item name={["jumlah_option", `${idx}`]} noStyle>
              //  <Select
              //    defaultValue={defaultIndex}
              //    onChange={(value) => onChangeUnit(value, row, idx)}
              //    name="jumlah_option"
              //    style={{
              //      width: "50%",
              //    }}
              //  >
              //    {row.attributes?.unit_1 === null ? (
              //      <></>
              //    ) : (
              //      <Select.Option disabled={row.attributes?.unit_1 === null} value={1}>
              //        {row.attributes?.unit_1}
              //      </Select.Option>
              //    )}
              //    {row.attributes?.unit_2 === null ? (
    //                <></>
    //              ) : (
    //                <Select.Option disabled={row.attributes?.unit_2 === null} value={2}>
    //                  {row.attributes?.unit_2}
    //                </Select.Option>
    //              )}
    //              {row.attributes?.unit_3 === null ? (
    //                <></>
    //              ) : (
    //                <Select.Option disabled={row.attributes?.unit_3 === null} value={3}>
    //                  {row.attributes?.unit_3}
    //                </Select.Option>
    //              )}
    //              {row.attributes?.unit_4 === null ? (
    //                <></>
    //              ) : (
    //                <Select.Option disabled={row.attributes?.unit_4 === null} value={4}>
    //                  {row.attributes?.unit_4}
    //                </Select.Option>
    //              )}
    //              {row.attributes?.unit_5 === null ? (
    //                <></>
    //              ) : (
    //                <Select.Option disabled={row.attributes?.unit_5 === null} value={5}>
    //                  {row.attributes?.unit_5}
    //                </Select.Option>
    //              )}
    //            </Select>
    //          </Form.Item>
    //        </Row>
    //      </>
    //    );
    //  },
    //},
    //{
    //  name: "Subtotal",
    //  width: "200px",
    //  selector: (row) => formatter.format(productSubTotal[row.id]),
    //},
    //{
    //  name: "Hapus",
    //  width: "200px",
    //  selector: (row) => (
    //    <AlertDialog
    //      onCancel={onCancel}
    //      onConfirm={onConfirm}
    //      title="Hapus Produk"
    //      message="Produk akan dihapus dari daftar ini. Lanjutkan?"
    //      id={row.id}
    //    />
    //  ),
    //},
  ];

  return (
    <DataTable
      customStyles={customStyles}
      paginationRowsPerPageOptions={[50]}
      columns={columns}
      data={data}
      noDataComponent={`--Belum ada produk--`}
    />
  );
}

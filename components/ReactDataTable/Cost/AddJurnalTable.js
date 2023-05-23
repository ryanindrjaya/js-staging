import DataTable from "react-data-table-component";
import AlertDialog from "../../Alert/Alert";
import { Input, InputNumber, Select, Form, Row, DatePicker } from "antd";
import { useDispatch } from "react-redux";

export default function ReactDataTable({
  calculatePriceAfterDisc,
  productSubTotal,
  data,
  locations,
  setTotalPrice,
  formObj,
}) {
  const dispatch = useDispatch(); console.log("data", data);

  var unit = 1;
  var priceUnit = 1;
  var tempIndex = 0;
  var stock = 0;

  var formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 2,
  });

  const onDeleteAkun = (value) => {
    dispatch({ type: "REMOVE_AKUN", index: value });
  };

  const onConfirm = (id) => {
    //const subtotal = productSubTotal[id];
    //setTotalPrice((prev) => prev - subtotal);

    for (let index = 0; index < data.akun.length; index++) {
      const element = data.akun[index];
      if (element.id === id) {
        onDeleteAkun(index);
      } console.log("id delete", id);
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
      name: "Akun",
      width: "170px",
      selector: (row, idx) => {
        return row.attributes.kode;
      },
    },
    {
      name: "Akun Deskripsi",
      width: "170px",
      selector: (row, idx) => {
        return row.attributes.nama;
      },
    },
    {
      name: "Catatan",
      width: "300px",
      selector: (row, idx) => {
        return (
          <>
            <Row>
              <Form.Item name={["catatan", `${idx}`]} noStyle>
                <Input
                  //defaultValue={defaultQty}
                  //onChange={(e) => onChangeQty(e, row, idx)}
                  rules={[
                    {
                      required: true,
                      message: "Required",
                    },
                  ]}
                  style={{
                    width: "300px",
                  }}
                  //max={row.stock?.[defaultOption]?.stock || 0}
                />
              </Form.Item>
            </Row>
          </>
        );
      },
    },
    {
      name: "Debit",
      width: "150px",
      selector: (row, idx) => {
       return (
          <>
            <Row>
              <Form.Item name={["debit", `${idx}`]} noStyle>
                <InputNumber
                  //defaultValue={defaultQty}
                  //onChange={(e) => onChangeQty(e, row, idx)}
                  rules={[
                    {
                      required: true,
                      message: "Required",
                    },
                  ]}
                  style={{
                    width: "100%",
                  }}
                  min={0}
                />
              </Form.Item>
            </Row>
          </>
        );
      },
    },
    {
      name: "Kredit",
      width: "150px",
      selector: (row, idx) => {
       return (
          <>
            <Row>
              <Form.Item name={["kredit", `${idx}`]} noStyle>
                <InputNumber
                  //defaultValue={defaultQty}
                  //onChange={(e) => onChangeQty(e, row, idx)}
                  rules={[
                    {
                      required: true,
                      message: "Required",
                    },
                  ]}
                  style={{
                    width: "100%",
                  }}
                  min={0}
                />
              </Form.Item>
            </Row>
          </>
        );
      },
    },
    {
      name: "Hapus",
      selector: (row) => (
        <AlertDialog
          onCancel={onCancel}
          onConfirm={onConfirm}
          title="Hapus Akun"
          message="Akun akan dihapus dari daftar ini. Lanjutkan?"
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
      data={data.akun}
      noDataComponent={`--Belum ada akun--`}
    />
  );
}

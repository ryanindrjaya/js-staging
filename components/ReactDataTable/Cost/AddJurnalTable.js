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

  const onDeleteAkun = (value) => {
    dispatch({ type: "REMOVE_AKUN", index: value });
  };

  const onChangeCatatan = (value, row, index) => {
    dispatch({ type: "CHANGE_CATATAN", catatan: value, data: row, index: index });
  };

  const onChangeKredit = (value, row, index) => {
    dispatch({ type: "CHANGE_KREDIT", kredit: value, data: row, index: index });
  };

  const onChangeDebit = (value, row, index) => {
    dispatch({ type: "CHANGE_DEBIT", debit: value, data: row, index: index });
  };

  const onConfirm = (id) => {
    //const subtotal = productSubTotal[id];
    //setTotalPrice((prev) => prev - subtotal);

    for (let index = 0; index < data.akun.length; index++) {
      const element = data.akun[index];
      if (element.id === id) {
        onDeleteAkun(index);
        console.log("index", id, element, data);
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
                  //defaultValue={default}
                  onChange={(e) => onChangeCatatan(e.target.value, row, idx)}
                  rules={[
                    {
                      required: true,
                      message: "Required",
                    },
                  ]}
                  style={{
                    width: "300px",
                  }}
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
                  //defaultValue={default}
                  onChange={(e) => onChangeDebit(e, row, idx)}
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
                  //defaultValue={default}
                  onChange={(e) => onChangeKredit(e, row, idx)}
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

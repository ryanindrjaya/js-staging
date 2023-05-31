import DataTable from "react-data-table-component";
import AlertDialog from "../../Alert/Alert";
import { Input, InputNumber, Select, Form, Row, DatePicker } from "antd";
import { useDispatch } from "react-redux";

export default function ReactDataTable({
  data,
  formObj,
  setDebitValue,
  setKreditValue,
  setTotalDebitValue,
  setTotalKreditValue,
  totalDebitValue,
  totalKreditValue,
}) {
  const dispatch = useDispatch();

  var unit = 1;
  var priceUnit = 1;
  var tempIndex = 0;
  var stock = 0;

  // var formatter = new Intl.NumberFormat("id-ID", {
  //   style: "currency",
  //   currency: "IDR",
  //   maximumFractionDigits: 2,
  // });

  const onDeleteAkun = (value) => {
    dispatch({ type: "REMOVE_AKUN", index: value });
  };

  const onChangeCatatan = (value, row, index) => {
    dispatch({ type: "CHANGE_CATATAN", catatan: value, data: row, index: index });
  };

  const onChangeKredit = (value, row, index) => {
    dispatch({ type: "CHANGE_KREDIT", kredit: value, data: row, index: index });
    setKreditValue(value);
  };

  const onChangeDebit = (value, row, index) => {
    dispatch({ type: "CHANGE_DEBIT", debit: value, data: row, index: index });
    setDebitValue(value);
  };

  const onConfirm = (id) => { console.log("id nih", id);
    // var newAkunInfo = data.akunInfo;

    // delete newAkunInfo[id];]
    console.log("total debit", totalDebitValue, data.akunInfo[id]?.debit);
    console.log("total kredit", totalKreditValue, data.akunInfo[id]?.kredit);

    setTotalDebitValue(totalDebitValue - (data.akunInfo[id]?.debit ?? 0));
    setTotalKreditValue(totalKreditValue - (data.akunInfo[id]?.kredit ?? 0));

    onDeleteAkun(id);
    // formObj.setFieldsValue({
    //   catatanData: undefined,
    //   debitData: 0,
    //   kreditData: 0,
    // });
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
              <Form.Item name={["catatanData", `${idx}`]} noStyle>
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
              <Form.Item name={["debitData", `${idx}`]} noStyle>
                <InputNumber
                  defaultValue={0}
                  formatter={(value) =>
                    value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
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
              <Form.Item name={["kreditData", `${idx}`]} noStyle>
                <InputNumber
                  defaultValue={0}
                  formatter={(value) =>
                    value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
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
      selector: (row, idx) => (
        <AlertDialog
          onCancel={onCancel}
          onConfirm={onConfirm}
          title="Hapus Akun"
          message="Akun akan dihapus dari daftar ini. Lanjutkan?"
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
      data={data.akun}
      noDataComponent={`--Belum ada akun--`}
    />
  );
}

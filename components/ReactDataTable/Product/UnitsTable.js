import DataTable from "react-data-table-component";
import AlertDialog from "../../Alert/Alert";
import { Input, Form, InputNumber } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { formatterNumber, parserNumber } from "../../Formatter/CurrencyFormatter";
import { setHargaNew } from "../../../pages/dashboard/produk/utility/setHargaValue";

export default function UnitsTable({ onDelete, onUpdate, onPageChange, initialValue, getDescUnit, descUnit, form }) {
  const onConfirm = (id) => {
    onDelete(id);
  };

  const onCancel = () => {
    console.log("onCancel");
  };

  const onEdit = (id) => {
    onUpdate(id);
  };

  const unit = [initialValue?.unit_1, initialValue?.unit_2, initialValue?.unit_3, initialValue?.unit_4, initialValue?.unit_5];

  const qty = [initialValue?.qty_1, initialValue?.qty_2, initialValue?.qty_3, initialValue?.qty_4, initialValue?.qty_5];

  const disc = [initialValue?.disc_1_1, initialValue?.disc_1_2, initialValue?.disc_1_3, initialValue?.disc_1_4, initialValue?.disc_1_5];

  const soldPrice = [
    initialValue?.sold_price_1,
    initialValue?.sold_price_2,
    initialValue?.sold_price_3,
    initialValue?.sold_price_4,
    initialValue?.sold_price_5,
  ];

  const pricelist = [
    initialValue?.pricelist_1,
    initialValue?.pricelist_2,
    initialValue?.pricelist_3,
    initialValue?.pricelist_4,
    initialValue?.pricelist_5,
  ];

  const buyPrice = [
    initialValue?.buy_price_1,
    initialValue?.buy_price_2,
    initialValue?.buy_price_3,
    initialValue?.buy_price_4,
    initialValue?.buy_price_5,
  ];

  const purchaseDiscount = [
    initialValue?.purchase_discount_1,
    initialValue?.purchase_discount_2,
    initialValue?.purchase_discount_3,
    initialValue?.purchase_discount_4,
    initialValue?.purchase_discount_5,
  ];

  const diskon1 = [initialValue?.unit_1_dp1, initialValue?.unit_2_dp1, initialValue?.unit_3_dp1, initialValue?.unit_4_dp1, initialValue?.unit_5_dp1];

  const diskon2 = [initialValue?.unit_1_dp2, initialValue?.unit_2_dp2, initialValue?.unit_3_dp2, initialValue?.unit_4_dp2, initialValue?.unit_5_dp2];

  const diskon3 = [initialValue?.unit_1_dp3, initialValue?.unit_2_dp3, initialValue?.unit_3_dp3, initialValue?.unit_4_dp3, initialValue?.unit_5_dp3];

  const diskon4 = [initialValue?.unit_1_dp4, initialValue?.unit_2_dp4, initialValue?.unit_3_dp4, initialValue?.unit_4_dp4, initialValue?.unit_5_dp4];

  const diskon5 = [initialValue?.unit_1_dp5, initialValue?.unit_2_dp5, initialValue?.unit_3_dp5, initialValue?.unit_4_dp5, initialValue?.unit_5_dp5];

  // const unit_1_dp1

  const content = (row) => (
    <div>
      <button onClick={() => onEdit(row.id)} className=" hover:text-cyan-700 transition-colors  text-xs font-normal py-2 px-2 rounded-md ">
        <EditOutlined className="mr-2 mt-0.5 float float-left" />
        Edit
      </button>
      <AlertDialog
        onCancel={onCancel}
        onConfirm={onConfirm}
        title="Hapus Kategori"
        message="Kategori yang dihapus tidak dapat dikembalikan lagi. Lanjutkan?"
        id={row.id}
      />
    </div>
  );

  const customStyles = {
    headCells: {
      style: {
        textTransform: "uppercase",
        justifyContent: "center",
      },
    },
  };

  const data = [
    {
      idx: 1,
      unit: "",
      qty: "",
      price: "",
      priceList: "",
    },
    { idx: 2, unit: "", qty: "", price: "", priceList: "" },
    { idx: 3, unit: "", qty: "", price: "", priceList: "" },
    {
      idx: 4,
      unit: "",
      qty: "",
      price: "",
      priceList: "",
    },
    {
      idx: 5,
      unit: "",
      qty: "",
      price: "",
      priceList: "",
    },
  ];

  const setFocusHarga = (e) => {
    e.target.setSelectionRange(0, 1);
  };

  const columns = [
    {
      name: "Unit",
      width: "150px",
      style: {
        backgroundColor: "#f4f4f4",
      },
      selector: (row) => (
        <Form.Item className="mt-4" name={`unit_${row.idx}`} initialValue={unit[row.idx - 1]}>
          <Input size="small" placeholder={`Nama Unit ${row.idx}`} onChange={getDescUnit} />
        </Form.Item>
      ),
    },
    {
      name: "Isi",
      width: "150px",
      style: {
        backgroundColor: "#f4f4f4",
      },
      selector: (row) => (
        <Form.Item className="mt-4" name={`qty_${row.idx}`} initialValue={qty[row.idx - 1]}>
          <InputNumber
            style={{
              width: "100%",
            }}
            size="small"
            placeholder={`Isi ${row.idx}`}
            onChange={getDescUnit}
          />
        </Form.Item>
      ),
    },

    {
      name: "Harga Pembelian",
      width: "170px",
      style: {
        backgroundColor: "#036B82",
      },
      selector: (row) => (
        <Form.Item className="mt-4" name={`buy_price_${row.idx}`} initialValue={buyPrice[row.idx - 1]}>
          <InputNumber
            onFocus={setFocusHarga}
            formatter={formatterNumber}
            parser={parserNumber}
            style={{
              width: "100%",
            }}
            size="small"
          />
        </Form.Item>
      ),
    },
    {
      name: "Diskon Pembelian",
      width: "150px",
      style: {
        backgroundColor: "#036B82",
      },
      selector: (row) => (
        <Form.Item className="mt-4" name={`purchase_discount_${[row.idx]}`} initialValue={purchaseDiscount[row.idx - 1] ?? 0}>
          <InputNumber
            onFocus={setFocusHarga}
            formatter={formatterNumber}
            parser={parserNumber}
            style={{
              width: "100%",
            }}
            size="small"
          />
        </Form.Item>
      ),
    },
    {
      name: "D1",
      width: "80px",
      style: {
        backgroundColor: "#036B82",
      },

      selector: (row) => (
        <Form.Item
          className="mt-4"
          name={`unit_${row.idx}_dp1`}
          rules={[{ type: "number", max: 100, message: "Melebihi ketentuan" }]}
          initialValue={diskon1[row.idx - 1]}
        >
          <InputNumber
            style={{
              width: "100%",
            }}
            size="small"
          />
        </Form.Item>
      ),
    },
    {
      name: "D2",
      width: "80px",
      style: {
        backgroundColor: "#036B82",
      },
      selector: (row) => (
        <Form.Item
          className="mt-4"
          name={`unit_${row.idx}_dp2`}
          rules={[{ type: "number", max: 100, message: "Melebihi ketentuan" }]}
          initialValue={diskon2[row.idx - 1]}
        >
          <InputNumber
            style={{
              width: "100%",
            }}
            size="small"
          />
        </Form.Item>
      ),
    },
    {
      name: "D3",
      width: "80px",
      style: {
        backgroundColor: "#036B82",
      },
      selector: (row) => (
        <Form.Item
          className="mt-4"
          name={`unit_${row.idx}_dp3`}
          rules={[{ type: "number", max: 100, message: "Melebihi ketentuan" }]}
          initialValue={diskon3[row.idx - 1]}
        >
          <InputNumber
            style={{
              width: "100%",
            }}
            size="small"
          />
        </Form.Item>
      ),
    },
    {
      name: "Pricelist",
      width: "150px",
      style: {
        backgroundColor: "#f4f4f4",
      },
      selector: (row) => (
        <Form.Item className="mt-4" name={`pricelist_${row.idx}`} initialValue={pricelist[row.idx - 1]}>
          <InputNumber
            onFocus={setFocusHarga}
            formatter={formatterNumber}
            parser={parserNumber}
            style={{
              width: "100%",
            }}
            size="small"
          />
        </Form.Item>
      ),
    },
    {
      name: "Harga Jual",
      width: "150px",
      style: {
        backgroundColor: "#f4f4f4",
      },
      selector: (row) => (
        <Form.Item className="mt-4" name={`sold_price_${row.idx}`} initialValue={soldPrice[row.idx - 1]}>
          <InputNumber
            onFocus={setFocusHarga}
            formatter={formatterNumber}
            parser={parserNumber}
            style={{
              width: "100%",
            }}
            size="small"
          />
        </Form.Item>
      ),
    },
    {
      name: "Disc Jual Persen",
      width: "170px",
      style: {
        backgroundColor: "#f4f4f4",
      },
      selector: (row) => (
        <Form.Item className="mt-4" name={`disc_1_${row.idx}`} initialValue={disc[row.idx - 1]}>
          <InputNumber
            style={{
              width: "100%",
            }}
            size="small"
          />
        </Form.Item>
      ),
    },
  ];

  const getInitialDescUnit = () => {
    let unit1 = `${initialValue?.qty_1 ?? ""} ${initialValue?.unit_1 ?? ""} `;
    let unit2 = `${initialValue?.qty_2 ?? ""} ${initialValue?.unit_2 ?? ""} `;
    let unit3 = `${initialValue?.qty_3 ?? ""} ${initialValue?.unit_3 ?? ""} `;
    let unit4 = `${initialValue?.qty_4 ?? ""} ${initialValue?.unit_4 ?? ""} `;
    let unit5 = `${initialValue?.qty_5 ?? ""} ${initialValue?.unit_5 ?? ""} `;
    let descUnit = unit1 + unit2 + unit3 + unit4 + unit5;

    return descUnit;
  };

  return (
    <>
      <DataTable customStyles={customStyles} onChangePage={onPageChange} columns={columns} data={data} />
      <p className="mt-3">Keterangan Unit : {descUnit ?? getInitialDescUnit()}</p>
    </>
  );
}

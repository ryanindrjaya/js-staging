import DataTable from "react-data-table-component";
import AlertDialog from "../../Alert/Alert";
import { Input, Form, InputNumber } from "antd";
import { EditOutlined } from "@ant-design/icons";

export default function UnitsTableView({ onDelete, onUpdate, onPageChange, initialValue }) {
  const unit = [
    initialValue?.unit_1,
    initialValue?.unit_2,
    initialValue?.unit_3,
    initialValue?.unit_4,
    initialValue?.unit_5,
  ];

  const qty = [initialValue?.qty_1, initialValue?.qty_2, initialValue?.qty_3, initialValue?.qty_4, initialValue?.qty_5];

  const disc = [
    initialValue?.disc_1_1,
    initialValue?.disc_1_2,
    initialValue?.disc_1_3,
    initialValue?.disc_1_4,
    initialValue?.disc_1_5,
  ];

  const soldPrice = [
    initialValue?.sold_price_1,
    initialValue?.sold_price_2,
    initialValue?.sold_price_3,
    initialValue?.sold_price_4,
    initialValue?.sold_price_5,
  ];

  const buyPrice = [
    initialValue?.buy_price_1,
    initialValue?.buy_price_2,
    initialValue?.buy_price_3,
    initialValue?.buy_price_4,
    initialValue?.buy_price_5,
  ];

  const pricelist = [
    initialValue?.pricelist_1,
    initialValue?.pricelist_2,
    initialValue?.pricelist_3,
    initialValue?.pricelist_4,
    initialValue?.pricelist_5,
  ];

  const purchaseDiscount = [
    initialValue?.purchase_discount_1,
    initialValue?.purchase_discount_2,
    initialValue?.purchase_discount_3,
    initialValue?.purchase_discount_4,
    initialValue?.purchase_discount_5,
  ];

  const diskon1 = [
    initialValue?.unit_1_dp1,
    initialValue?.unit_2_dp1,
    initialValue?.unit_3_dp1,
    initialValue?.unit_4_dp1,
    initialValue?.unit_5_dp1,
  ];

  const diskon2 = [
    initialValue?.unit_1_dp2,
    initialValue?.unit_2_dp2,
    initialValue?.unit_3_dp2,
    initialValue?.unit_4_dp2,
    initialValue?.unit_5_dp2,
  ];

  const diskon3 = [
    initialValue?.unit_1_dp3,
    initialValue?.unit_2_dp3,
    initialValue?.unit_3_dp3,
    initialValue?.unit_4_dp3,
    initialValue?.unit_5_dp3,
  ];

  const diskon4 = [
    initialValue?.unit_1_dp4,
    initialValue?.unit_2_dp4,
    initialValue?.unit_3_dp4,
    initialValue?.unit_4_dp4,
    initialValue?.unit_5_dp4,
  ];

  const diskon5 = [
    initialValue?.unit_1_dp5,
    initialValue?.unit_2_dp5,
    initialValue?.unit_3_dp5,
    initialValue?.unit_4_dp5,
    initialValue?.unit_5_dp5,
  ];

  const locale = "en-us";

  const rupiahFormatter = (value) => {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "IDR",
    })
      .format(value)
      .replace(/IDR/g, "")
      .trim();
  };

  const currencyParser = (val) => {
    try {
      // for when the input gets clears
      if (typeof val === "string" && !val.length) {
        val = "0.0";
      }

      // detecting and parsing between comma and dot
      var group = new Intl.NumberFormat(locale).format(1111).replace(/1/g, "");
      var decimal = new Intl.NumberFormat(locale).format(1.1).replace(/1/g, "");
      var reversedVal = val.replace(new RegExp("\\" + group, "g"), "");
      reversedVal = reversedVal.replace(new RegExp("\\" + decimal, "g"), ".");
      //  => 1232.21 €

      // removing everything except the digits and dot
      reversedVal = reversedVal.replace(/[^0-9.]/g, "");
      //  => 1232.21

      // appending digits properly
      const digitsAfterDecimalCount = (reversedVal.split(".")[1] || []).length;
      const needsDigitsAppended = digitsAfterDecimalCount > 2;

      if (needsDigitsAppended) {
        reversedVal = reversedVal * Math.pow(10, digitsAfterDecimalCount - 2);
      }

      return Number.isNaN(reversedVal) ? 0 : reversedVal;
    } catch (error) {
      console.error(error);
    }
  };

  const customStyles = {
    headCells: {
      style: {
        color: "white",
        textTransform: "uppercase",
        backgroundColor: "#036B82",
        justifyContent: "center",
      },
    },
    rows: {
      style: {
        minHeight: "72px",
      },
    },
  };

  const data = [1, 2, 3, 4, 5]
    .map((num) => {
      if (initialValue?.[`unit_${num}`]) {
        return {
          id: num,
          idx: num,
          unit: initialValue[`unit_${num}`],
          qty: initialValue[`qty_${num}`],
          price: "",
          priceList: initialValue[`pricelist_${num}`],
        };
      }
    })
    .filter((val) => val !== undefined);

  console.log(data);

  const columns = [
    {
      name: "Unit",
      width: "150px",
      style: {
        backgroundColor: "#fff",
      },

      selector: (row) => {
        return (
          <Input
            value={unit[row.idx - 1] ?? "-"}
            size="large"
            style={{ backgroundColor: "#ffffff" }}
            placeholder={`Nama Unit ${row.idx}`}
          />
        );
      },
    },
    {
      name: "Isi",
      width: "150px",
      style: {
        backgroundColor: "#fff",
      },

      selector: (row) => (
        <InputNumber
          readOnly
          controls={false}
          style={{
            width: "100%",
            backgroundColor: "#ffffff",
          }}
          size="large"
          value={qty[row.idx - 1] ?? "-"}
          placeholder={`Isi ${row.idx}`}
        />
      ),
    },

    {
      name: "Harga Pembelian",
      width: "250px",
      style: {
        backgroundColor: "#fff",
      },
      selector: (row) => (
        <InputNumber
          readOnly
          controls={false}
          formatter={rupiahFormatter}
          parser={currencyParser}
          style={{
            width: "100%",
            backgroundColor: "#ffffff",
          }}
          size="large"
          value={buyPrice[row.idx - 1] ?? 0}
          placeholder={`Isi ${row.idx}`}
        />
      ),
    },
    {
      name: "Diskon Pembelian",
      width: "170px",

      selector: (row) => (
        <InputNumber
          readOnly
          controls={false}
          formatter={rupiahFormatter}
          parser={currencyParser}
          style={{
            width: "100%",
            backgroundColor: "#ffffff",
          }}
          size="large"
          value={purchaseDiscount[row.idx - 1] ?? 0}
          placeholder="Diskon Pembelian"
        />
      ),
    },
    {
      name: "D1",
      width: "95px",

      style: {
        backgroundColor: "#fff",
      },

      selector: (row) => (
        <InputNumber
          readOnly
          controls={false}
          style={{
            width: "100%",
            backgroundColor: "#ffffff",
          }}
          size="large"
          placeholder="D1"
          value={diskon1[row.idx - 1] ?? "-"}
        />
      ),
    },
    {
      name: "D2",
      width: "95px",
      style: {
        backgroundColor: "#fff",
      },
      selector: (row) => (
        <InputNumber
          readOnly
          controls={false}
          style={{
            width: "100%",
            backgroundColor: "#ffffff",
          }}
          value={diskon2[row.idx - 1] ?? "-"}
          size="large"
          placeholder="D2"
        />
      ),
    },
    {
      name: "D3",
      width: "95px",

      style: {
        backgroundColor: "#fff",
      },
      selector: (row) => (
        <InputNumber
          readOnly
          controls={false}
          style={{
            width: "100%",
            backgroundColor: "#ffffff",
          }}
          size="large"
          placeholder="D3"
          value={diskon3[row.idx - 1] ?? "-"}
        />
      ),
    },
    {
      name: "Pricelist",
      width: "170px",
      style: {
        backgroundColor: "#fff",
      },
      selector: (row) => (
        <InputNumber
          readOnly
          controls={false}
          formatter={rupiahFormatter}
          parser={currencyParser}
          style={{
            width: "100%",
            backgroundColor: "#ffffff",
          }}
          size="large"
          placeholder={`Pricelist ${row.idx}`}
          value={pricelist[row.idx - 1] ?? 0}
        />
      ),
    },
    {
      name: "Harga Jual",
      width: "170px",
      style: {
        backgroundColor: "#fff",
      },
      selector: (row) => (
        <InputNumber
          readOnly
          controls={false}
          formatter={rupiahFormatter}
          parser={currencyParser}
          style={{
            width: "100%",
            backgroundColor: "#ffffff",
          }}
          size="large"
          placeholder={`Harga Jual ${row.idx}`}
          value={soldPrice[row.idx - 1] ?? 0}
        />
      ),
    },
    {
      name: "Disc 1%",
      width: "170px",
      style: {
        backgroundColor: "#fff",
      },
      selector: (row) => (
        <InputNumber
          readOnly
          controls={false}
          style={{
            width: "100%",
            backgroundColor: "#ffffff",
          }}
          size="large"
          placeholder={`Harga Disc ${row.idx}`}
          value={disc[row.idx - 1] ?? 0}
        />
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
      <DataTable
        className="mt-10"
        customStyles={customStyles}
        onChangePage={onPageChange}
        keyField="id"
        columns={columns}
        data={data}
      />
      <p className="mt-3">Keterangan Unit : {getInitialDescUnit()}</p>
    </>
  );
}

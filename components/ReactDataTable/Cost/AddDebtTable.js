import DataTable from "react-data-table-component";
import AlertDialog from "../../Alert/Alert";
import { Input, InputNumber, Select, Form, Row, DatePicker } from "antd";
import { useDispatch } from "react-redux";
import { useState } from "react";

export default function ReactDataTable({ data, retur, setSisaHutang }) {
  const dispatch = useDispatch();

  var unit = 1;
  var priceUnit = 1;
  var tempIndex = 0;
  var stock = 0;
  var returSubtotal = 0;
  var sisaHutang = {};
  //var returId = 0;

  //const [nilaiRetur, setNilaiRetur] = useState([]);
  
  data.forEach((element) => { console.log("element",element)
    retur.forEach((row) => {
      if(element.attributes.no_purchasing == row.id)
      {
        //element.attributes.purchasing_details.data.forEach((detail) => {
        //  row.subtotal += detail.attributes.sub_total;
        //});
        //row.subtotal = 
        returSubtotal += row.subtotal;
      }
    });

    element.subtotal = returSubtotal;
    element.hutangJatuhTempo = element.attributes.total_purchasing - element.subtotal;
    element.sisaHutang = element.hutangJatuhTempo;
    element.sisaHutangFix = element.hutangJatuhTempo; 
    element.tunai = 0;
    element.transfer = 0;
    element.giro = 0;
    element.cn = 0;
    element.oth = 0;
    sisaHutang[element.id] = element.sisaHutang;
  });

    console.log("var sissa hutang", sisaHutang)

  const onChange = (value, id, status) => {
    data.forEach((row) => {
      if(row.attributes.no_purchasing == id)
      {
        if(status == "tunai") {
          row.sisaHutang = row.sisaHutang + row.tunai;
          row.tunai = value;
          row.sisaHutang = row.sisaHutang - row.tunai;
        } else if(status == "transfer") {
          row.sisaHutang = row.sisaHutang + row.transfer;
          row.transfer = value;
          row.sisaHutang = row.sisaHutang - row.transfer;
        } else if (status == "giro") {
          row.sisaHutang = row.sisaHutang + row.giro;
          row.giro = value;
          row.sisaHutang = row.sisaHutang - row.giro;
        } else if (status == "cn") {
          row.sisaHutang = row.sisaHutang + row.cn;
          row.cn = value;
          row.sisaHutang = row.sisaHutang - row.cn;
        } else if (status == "oth") {
          row.sisaHutang = row.sisaHutang + row.oth;
          row.oth = value;
          row.sisaHutang = row.sisaHutang - row.oth;
        } else {
          row.sisaHutang = row.sisaHutangFix;
        }
      }
      
      sisaHutang[row.id] = row.sisaHutang;
    });
    console.log("data hutang", data, sisaHutang)
  };

  var formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
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
      selector: (row, idx) => {
        return (
          <Row align="bottom" justify="center">
            <Form.Item noStyle>
              <button type="button" className="bg-cyan-700 rounded-md m-1 text-sm">
                <p className="px-4 py-2 m-0 text-white">
                Pilih
                </p>
              </button>
            </Form.Item>
          </Row>
        )
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
      selector: (row) => formatter.format(row.subtotal),
    },
    {
      name: "Hutang Jatuh Tempo",
      width: "150px",
      selector: (row) => formatter.format(row.hutangJatuhTempo),
    },
    {
      name: "ACC Tunai",
      width: "150px",
      selector: (row, idx) => {
        var defaultAccTunai = row.tunai;

        return (
          <Row align="bottom" justify="center">
            <Form.Item name={["AccTunai", `${idx}`]} noStyle>
              <InputNumber
                defaultValue={defaultAccTunai}
                //formatter={(value) => `${value}%`}
                min={0}
                onChange={(e) => onChange(e, row.attributes.no_purchasing, "tunai")}
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
        var defaultAccBankTf = row.transfer;

        return (
          <Row align="bottom" justify="center">
            <Form.Item name={["AccBankTf", `${idx}`]} noStyle>
              <InputNumber
                defaultValue={defaultAccBankTf}
                //formatter={(value) => `${value}%`}
                min={0}
                onChange={(e) => onChange(e, row.attributes.no_purchasing, "transfer")}
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
        var defaultAccBankGiro = row.giro;

        return (
          <Row align="bottom" justify="center">
            <Form.Item name={["AccBankGiro", `${idx}`]} noStyle>
              <InputNumber
                defaultValue={defaultAccBankGiro}
                //formatter={(value) => `${value}%`}
                min={0}
                onChange={(e) => onChange(e, row.attributes.no_purchasing, "giro")}
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
        var defaultAccCN = row.cn;

        return (
          <Row align="bottom" justify="center">
            <Form.Item name={["AccCN", `${idx}`]} noStyle>
              <InputNumber
                defaultValue={defaultAccCN}
                //formatter={(value) => `${value}%`}
                min={0}
                onChange={(e) => onChange(e, row.attributes.no_purchasing, "cn")}
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
      selector: (row, idx) => {
        var defaultAccOTH = row.oth;

        return (
          <Row align="bottom" justify="center">
            <Form.Item name={["AccOTH", `${idx}`]} noStyle>
              <InputNumber
                defaultValue={defaultAccOTH}
                //formatter={(value) => `${value}%`}
                min={0}
                onChange={(e) => onChange(e, row.attributes.no_purchasing, "oth")}
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
      name: "Sisa Hutang Jt",
      width: "150px",
      selector: (row) => formatter.format(row.sisaHutang),
    },
  ];

  return (
    <DataTable
      customStyles={customStyles}
      paginationRowsPerPageOptions={[5]}
      paginationTotalRows={[1]}
      columns={columns}
      data={data}
      noDataComponent={`--Belum ada produk--`}
    />
  );
}

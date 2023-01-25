import DataTable from "react-data-table-component";
import AlertDialog from "../../Alert/Alert";
import { Input, InputNumber, Select, Form, Row, DatePicker, Checkbox } from "antd";
import { useDispatch } from "react-redux";
import { useState } from "react";

export default function ReactDataTable({ data, retur, setSisaHutang, biaya, calculatePriceTotal }) {
  const dispatch = useDispatch();

  var unit = 1;
  var priceUnit = 1;
  var tempIndex = 0;
  var stock = 0;
  var returSubtotal = 0;
  var sisaHutang = {};
  const [dataRetur, setDataRetur] = useState("tidak");
  //var returId = 0;

  //const [nilaiRetur, setNilaiRetur] = useState([]);

  var index = 0;
  data.forEach((element) => {

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

    //dispatch({ type: "CHAN    GE_DATA_SUBTOTAL", subtotal: returSubtotal, listData: element, index: index });
    //dispatch({ type: "CHANGE_DATA_TUNAI", tunai: 0, listData: element, index: index });

    element.subtotal = returSubtotal;
    element.hutangJatuhTempo = element.attributes.total_purchasing - element.subtotal;
    element.sisaHutang = element.hutangJatuhTempo;
    element.sisaHutangFix = element.hutangJatuhTempo; 
    sisaHutang[index] = element.sisaHutang;
    //biaya.info[index].pilihData = "tidak";

    index++;
  });

  //const onChangeSisaHutang = (value, data, index) => {
  //  var sisa = data.sisaHutangFix;
  //  sisa = sisa;
  //  dispatch({ type: "CHANGE_DATA_SISAHUTANG", sisahutang: sisa, listData: data, index: index });
  //};

  const onChangePilih = async (value, data, index, v) => { console.log("data nih ",data)
    var pilihData = "tidak";
    if(value.target.checked == true) pilihData = "pilih";
    else pilihData = "tidak";
    dispatch({ type: "CHANGE_PILIH_DATA", pilihData: pilihData, listData: data, index: index });
    dispatch({ type: "CHANGE_TOTAL_HUTANG_JATUH_TEMPO", totalHutangJatuhTempo: data.sisaHutang, listData: data, index: index });
  };

  const onChangeTunai = (value, data, index) => {
    //onChange(value, data, "tunai");
    dispatch({ type: "CHANGE_DATA_TUNAI", tunai: value, listData: data, index: index });
    onChangeSisaHutang(value, data, index);
  };

  const onChangeTransfer = (value, data, index) => {
    dispatch({ type: "CHANGE_DATA_TRANSFER", transfer: value, listData: data, index: index });
    onChangeSisaHutang(value, data, index);
  };

  const onChangeGiro = (value, data, index) => {
    dispatch({ type: "CHANGE_DATA_GIRO", giro: value, listData: data, index: index });
    onChangeSisaHutang(value, data, index);
  };

  const onChangeCn = (value, data, index) => {
    dispatch({ type: "CHANGE_DATA_CN", cn: value, listData: data, index: index });
    onChangeSisaHutang(value, data, index);
  };

  const onChangeOth = (value, data, index) => {
    dispatch({ type: "CHANGE_DATA_OTH", oth: value, listData: data, index: index });
    onChangeSisaHutang(value, data, index);
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
                <Checkbox onChange={(value) => onChangePilih(value, row, idx)}> Pilih </Checkbox>
            {/*{biaya.info[idx]?.pilihData == null || biaya.info[idx]?.pilihData == "tidak" ? (*/}
            {/*  <button type="button" onClick={(value) => onChangePilih("tidak", row, idx, value)} className="bg-cyan-700 rounded-md m-1 text-sm">*/}
            {/*    <p className="px-4 py-2 m-0 text-white">*/}
            {/*    Pilih*/}
            {/*    </p>*/}
            {/*  </button>*/}
            {/*) : (*/}
            {/*  <button type="button" onClick={(value) => onChangePilih("pilih", row, idx, value)} className="bg-white-700 rounded-md border border-cyan-700 m-1 text-sm">*/}
            {/*    <p className="px-4 py-2 m-0 text-black">*/}
            {/*    Tidak*/}
            {/*    </p>*/}
            {/*  </button>*/}
            {/*)}*/}
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
        var defaultAccTunai = 0;

        return (
          <Row align="bottom" justify="center">
            <Form.Item name={["AccTunai", `${idx}`]} noStyle>
              <InputNumber
                defaultValue={defaultAccTunai}
                //formatter={(value) => `${value}%`}
                min={0}
                onChange={(e) => onChangeTunai(e, row, idx)}
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
                onChange={(e) => onChangeTransfer(e, row, idx)}
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
                onChange={(e) => onChangeGiro(e, row, idx)}
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
                onChange={(e) => onChangeCn(e, row, idx)}
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
        var defaultAccOTH = 0;

        return (
          <Row align="bottom" justify="center">
            <Form.Item name={["AccOTH", `${idx}`]} noStyle>
              <InputNumber
                defaultValue={defaultAccOTH}
                //formatter={(value) => `${value}%`}
                min={0}
                onChange={(e) => onChangeOth(e, row, idx)}
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
      selector: (row, idx) => calculatePriceTotal(row, idx),
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

import DataTable from "react-data-table-component";
import AlertDialog from "../../Alert/Alert";
import { Input, InputNumber, Select, Form, Row, DatePicker, Checkbox } from "antd";
import { useDispatch } from "react-redux";
import { useState } from "react";

export default function ReactDataTable({ data, retur, biaya, calculatePriceTotal, form, supplier, statusPembayaran, rangePicker, search, dataEdit, dataEditId }) {
  const dispatch = useDispatch();

  var unit = 1;
  var priceUnit = 1;
  var tempIndex = 0;
  var stock = 0;
  var returSubtotal = 0;
  var sisaHutang = {};
  const [dataRetur, setDataRetur] = useState("tidak");

  var min = null;
  var max = null;

  if(rangePicker){
    min = new Date(rangePicker[0]);
    max = new Date(rangePicker[1]);
  }

  var index = 0;
  data?.forEach((element) => {

    retur.forEach((row) => {
      if(element.attributes.no_purchasing == row.id)
      {
        returSubtotal += row.subtotal;
      }
    });

    element.subtotal = returSubtotal;
    element.hutangJatuhTempo = element.attributes.total_purchasing - element.subtotal;
    element.sisaHutang = element.hutangJatuhTempo;
    element.sisaHutangFix = element.hutangJatuhTempo; 
    sisaHutang[index] = element.sisaHutang;
    
    index++;
  });

  //const onChangeSisaHutang = (value, data, index) => {
  //  var sisa = data.sisaHutangFix;
  //  sisa = sisa;
  //  dispatch({ type: "CHANGE_DATA_SISAHUTANG", sisahutang: sisa, listData: data, index: index });
  //};

  const cekData = (data) => {
    for (const key in biaya.list) {
      if(biaya.list[key].id == data.id) return key;
    }
  };

  const calculate = (row, id) => {
    id = cekData(row);
    return calculatePriceTotal(row, id);
  };

  const onChangePilih = async (value, data, index, v) => {
    var pilihData = "tidak";
    if(value.target.checked == true) pilihData = "pilih";
    else pilihData = "tidak";
    var indexTemp = index;
    index = cekData(data);

    if (pilihData == "tidak") {
      form.setFieldsValue({
        AccTunai: {
          [indexTemp]: 0,
        },
        AccBankTf: {
          [indexTemp]: 0,
        },
        AccBankGiro: {
          [indexTemp]: 0,
        },
        AccCN: {
          [indexTemp]: 0,
        },
        AccOTH: {
          [indexTemp]: 0,
        },
      });
    }

    //if(cek == "none"){
      dispatch({ type: "CHANGE_PILIH_DATA", pilihData: pilihData, listData: data, index: index });
      dispatch({ type: "CHANGE_TOTAL_HUTANG_JATUH_TEMPO", totalHutangJatuhTempo: data.sisaHutang - data.dibayar, listData: data, index: index });
      onChangeTunai(0, data, index);
      onChangeTransfer(0, data, index);
      onChangeGiro(0, data, index);
      onChangeCn(0, data, index);
      onChangeOth(0, data, index);
      onChangeId(data.id, data, index);

      //if (dataEdit) onChangeId("create", data, index);
    //}

    //biaya.info[index].id = data.id;
  };

  const onChangeId = (value, data, index) => {
    dispatch({ type: "CHANGE_ID", id: value, listData: data, index: index });
  };

  const onChangeTunai = (value, data, index) => {
    index = cekData(data);
    dispatch({ type: "CHANGE_DATA_TUNAI", tunai: value, listData: data, index: index });
  };

  const onChangeTransfer = (value, data, index) => {
    index = cekData(data);
    dispatch({ type: "CHANGE_DATA_TRANSFER", transfer: value, listData: data, index: index });
  };

  const onChangeGiro = (value, data, index) => {
    index = cekData(data);
    dispatch({ type: "CHANGE_DATA_GIRO", giro: value, listData: data, index: index });
  };

  const onChangeCn = (value, data, index) => {
    index = cekData(data);
    dispatch({ type: "CHANGE_DATA_CN", cn: value, listData: data, index: index });
  };

  const onChangeOth = (value, data, index) => {
    index = cekData(data);
    dispatch({ type: "CHANGE_DATA_OTH", oth: value, listData: data, index: index });
  };

  var formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 2,
    minimumFractionDigits : 2,
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
        var index = cekData(row);
        var defaultCek = false;
        if(biaya?.info[index]?.pilihData == "pilih") defaultCek = true;
        else defaultCek = false;

        return (
          <Row align="bottom" justify="center">
            <Form.Item noStyle>
                <Checkbox 
                  defaultChecked={defaultCek}
                  onChange={(value) => onChangePilih(value, row, idx)}
                >
                  Pilih
                </Checkbox>
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
        var index = cekData(row);
        var defaultAccTunai = biaya.info[index]?.tunai ?? 0;

        return (
          <Row align="bottom" justify="center">
            <Form.Item name={["AccTunai", `${idx}`]} noStyle>
              <InputNumber
                defaultValue={defaultAccTunai}
                formatter={(value) =>
                    value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
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
        var index = cekData(row);
        var defaultAccBankTf = biaya.info[index]?.transfer ?? 0;

        return (
          <Row align="bottom" justify="center">
            <Form.Item name={["AccBankTf", `${idx}`]} noStyle>
              <InputNumber
                defaultValue={defaultAccBankTf}
                formatter={(value) =>
                    value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
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
        var index = cekData(row);
        var defaultAccBankGiro = biaya.info[index]?.giro ?? 0;

        return (
          <Row align="bottom" justify="center">
            <Form.Item name={["AccBankGiro", `${idx}`]} noStyle>
              <InputNumber
                defaultValue={defaultAccBankGiro}
                formatter={(value) =>
                    value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
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
    // {
    //   name: "ACC CN",
    //   width: "150px",
    //   selector: (row, idx) => {
    //     var index = cekData(row);
    //     var defaultAccCN = biaya.info[index]?.cn ?? 0;

    //     return (
    //       <Row align="bottom" justify="center">
    //         <Form.Item name={["AccCN", `${idx}`]} noStyle>
    //           <InputNumber
    //             defaultValue={defaultAccCN}
    //             formatter={(value) =>
    //                 value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    //               }
    //             parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
    //             min={0}
    //             onChange={(e) => onChangeCn(e, row, idx)}
    //             style={{
    //               width: "100px",
    //               marginRight: "10px",
    //             }}
    //           />
    //         </Form.Item>
    //       </Row>
    //     );
    //   },
    // },
    // {
    //   name: "ACC OTH",
    //   width: "150px",
    //   selector: (row, idx) => {
    //     var index = cekData(row);
    //     var defaultAccOTH = biaya.info[index]?.oth ?? 0;

    //     return (
    //       <Row align="bottom" justify="center">
    //         <Form.Item name={["AccOTH", `${idx}`]} noStyle>
    //           <InputNumber
    //             defaultValue={defaultAccOTH}
    //             formatter={(value) =>
    //                 value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    //               }
    //             parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
    //             min={0}
    //             onChange={(e) => onChangeOth(e, row, idx)}
    //             style={{
    //               width: "100px",
    //               marginRight: "10px",
    //             }}
    //           />
    //         </Form.Item>
    //       </Row>
    //     );
    //   },
    // },
    {
      name: "Sisa Hutang Jt",
      width: "150px",
      selector: (row, idx) => calculate(row, idx),
    },
  ];

  return (
    <DataTable
      customStyles={customStyles}
      paginationRowsPerPageOptions={[5]}
      paginationTotalRows={[1]}
      columns={columns}
      data={data.filter((item) => {
        let man = new Date(item.attributes.date_purchasing); //date from data
        if(item.attributes.status_pembayaran == "Belum Lunas") item.attributes.status_pembayaran = "Belum Dibayar";

        if(supplier?.id == item.attributes.supplier.data.id && statusPembayaran == item.attributes.status_pembayaran &&
            min?.getFullYear() <= man.getFullYear() && man.getFullYear() <= max?.getFullYear() &&
            min?.getMonth()+1 <= man.getMonth()+1 && man.getMonth()+1 <= max?.getMonth()+1 &&
            min?.getDate() <= man.getDate() && man.getDate() <= max?.getDate() &&
            (item.attributes.no_purchasing.toLowerCase().indexOf(search?.toLowerCase()) !== -1 || search == undefined)
        ) {
          return item;
        }
        if(supplier?.id == item.attributes.supplier.data.id && statusPembayaran == undefined &&
            min?.getFullYear() <= man.getFullYear() && man.getFullYear() <= max?.getFullYear() &&
            min?.getMonth()+1 <= man.getMonth()+1 && man.getMonth()+1 <= max?.getMonth()+1 &&
            min?.getDate() <= man.getDate() && man.getDate() <= max?.getDate() &&
            (item.attributes.no_purchasing.toLowerCase().indexOf(search?.toLowerCase()) !== -1 || search == undefined)
        ) {
          return item;
          }
        if (supplier?.id == item.attributes.supplier.data.id && statusPembayaran == item.attributes.status_pembayaran && min == null && max == null && 
            (item.attributes.no_purchasing.toLowerCase().indexOf(search?.toLowerCase()) !== -1 || search == undefined)
        ) {
          return item;
        }
        if(supplier?.id == item.attributes.supplier.data.id && statusPembayaran == undefined && min == null && max == null && item.attributes.no_purchasing.toLowerCase().indexOf(search?.toLowerCase()) !== -1) {
          return item;
        }
        if(supplier?.id == item.attributes.supplier.data.id && statusPembayaran == undefined && min == null && max == null && search == undefined) {
          return item;
        }
      })}
      noDataComponent={`--Belum ada data LPB--`}
    />
  );
}

import DataTable from "react-data-table-component";
import AlertDialog from "../../Alert/Alert";
import { Form, Select, InputNumber, Checkbox, Popover, Modal } from "antd";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { PrinterOutlined } from "@ant-design/icons";
import router from "next/router";

export default function ReactDataTable({ data, retur, biaya, calculatePriceTotal, form }) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  var unit = 1;
  var priceUnit = 1;
  var tempIndex = 0;
  var stock = 0;
  var piutang = 0;
  var returSubtotal = 0;
  var sisaPiutang = {};
  var pembayaran = {};
  const [modalSisa, setModalSisa] = useState(0);
  const [dataRetur, setDataRetur] = useState("tidak");
  const [metode, setMetode] = useState("");
  const [biayaData, setBiayaData] = useState(0);

  var index = 0;
  data?.forEach((element) => {
  returSubtotal = 0;
  
    retur?.forEach((row) => {
      if(element?.attributes?.no_sales_sale == row?.id)
      {
        returSubtotal += row.subtotal;
      }
      if(element?.attributes?.no_panel_sale == row?.id)
      {
        returSubtotal += row.subtotal;
      }
      if(element?.attributes?.no_non_panel_sale == row?.id)
      {
        returSubtotal += row.subtotal;
      }
    });

    element.subtotal = returSubtotal;
    //element.hutangJatuhTempo = element.attributes.total_purchasing - element.subtotal;
    //element.sisaHutang = element.hutangJatuhTempo;
    //element.sisaHutangFix = element.hutangJatuhTempo;
    element.sisaPiutang = element.attributes?.total - element?.subtotal;
    sisaPiutang[index] = element.sisaPiutang;

    index++;
  });

  //const onChangeSisaHutang = (value, data, index) => {
  //  var sisa = data.sisaHutangFix;
  //  sisa = sisa;
  //  dispatch({ type: "CHANGE_DATA_SISAHUTANG", sisahutang: sisa, listData: data, index: index });
  //};

  const onChangePilih = async (value, data, index) => {
    var pilihData = "tidak";
    if(value.target.checked == true) pilihData = "pilih";
    else pilihData = "tidak";
    dispatch({ type: "CHANGE_PILIH_DATA", pilihData: pilihData, listData: data, index: index });
    dispatch({ type: "CHANGE_TOTAL_HUTANG_JATUH_TEMPO", totalHutangJatuhTempo: data.sisaHutang, listData: data, index: index });

    if(pilihData){
      onChangeTunai(0, data, index);
      onChangeTransfer(0, data, index);
      onChangeGiro(0, data, index);
      onChangeCn(0, data, index);
      onChangeOth(0, data, index);
    }
    //onChangeTunai(0, data, index);
    //console.log("pilih", data, biaya);
  };

  const onChangeTunai = (value, data, index) => {
    //onChange(value, data, "tunai");
    dispatch({ type: "CHANGE_DATA_TUNAI", tunai: value, listData: data, index: index });
    //onChangeSisaHutang(value, data, index);
  };

  const onChangeTransfer = (value, data, index) => {
    dispatch({ type: "CHANGE_DATA_TRANSFER", transfer: value, listData: data, index: index });
    //onChangeSisaHutang(value, data, index);
  };

  const onChangeGiro = (value, data, index) => {
    dispatch({ type: "CHANGE_DATA_GIRO", giro: value, listData: data, index: index });
    //onChangeSisaHutang(value, data, index);
  };

  const onChangeCn = (value, data, index) => {
    dispatch({ type: "CHANGE_DATA_CN", cn: value, listData: data, index: index });
    //onChangeSisaHutang(value, data, index);
  };

  const onChangeOth = (value, data, index) => {
    dispatch({ type: "CHANGE_DATA_OTH", oth: value, listData: data, index: index });
    //onChangeSisaHutang(value, data, index);
  };

  //const metodePembayaran = (value) => {
  //  //router.push("/dashboard/biaya/piutang/metode_pembayaran/" + value.id + value.keterangan);
  //  var totalPiutang = parseInt(value.attributes.total) - value.subtotal;
  //  router.push({
  //    pathname: '/dashboard/biaya/piutang/metode_pembayaran',
  //    query: { id: value.id, ket: value.keterangan, total: totalPiutang },
  //  });
  //};

  const onChangeMetode = (value) => {
    setMetode(value);
    //onChangeBayar(biaya,value);
  };

  const totalPembayaran = (row, idx) => {
    //if(pembayaran[idx] == undefined || pembayaran[idx] == 0) pembayaran[idx] = parseInt(row?.attributes?.total) - row?.subtotal - row?.sisaPiutang ;
    //if(0 pembayaran[idx] ) pembayaran[idx] = parseInt(row?.attributes?.total) - row?.subtotal - row?.sisaPiutang ;
    //biaya.list[idx].sisaPiutang = row.sisaPiutang ;
    
    if(biaya.list.length > 0) return formatter.format(biaya.list[idx].sisaPiutang);
  };

  const [tunai, setTunai] = useState(0);
  const [transfer, setTransfer] = useState(0);
  const [giro, setGiro] = useState(0);
  const [cn, setCn] = useState(0);
  const [oth, setOth] = useState(0);

  var tempTunai = 0;
  var tempTransfer = 0;
  var tempGiro = 0;
  var tempCn = 0;
  var tempOth = 0;
  var tempIndex = 0;
  const onChangeBayar = (value, metode, row, idx) => {
    //if(open == false){
    //  tempTunai = 0;
    //  tempTransfer = 0;
    //  tempGiro = 0;
    //  tempCn = 0;
    //  tempOth = 0;
    //}
    //setModalSisa(0);
    setBiayaData(value);

    if (metode == "tunai") { setTunai(value); }
    if (metode == "transfer") { setTransfer(value); }
    if (metode == "giro") { setGiro(value); }
    if (metode == "cn") { setCn(value); }
    if (metode == "oth") { setOth(value); }

    //setModalSisa(tempTunai + tempTransfer + tempGiro + tempCn + tempOth);
    setModalSisa(tunai + transfer + giro + cn + oth);
  };

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = (row, idx, value) => {
    //setModalText('The modal will be closed after two seconds');
    setConfirmLoading(true);

    onChangeTunai(tunai, row, idx);
    onChangeTransfer(transfer, row, idx);
    onChangeGiro(giro, row, idx);
    onChangeCn(cn, row, idx);
    onChangeOth(oth, row, idx);

    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);

      form.setFieldsValue({
          metode_bayar1: null,
          metode_bayar2: null,
          metode_bayar3: null,
          metode_bayar4: null,
          metode_bayar5: null,
          bayar1: null,
          bayar2: null,
          bayar3: null,
          bayar4: null,
          bayar5: null,
      });

      setTunai(0);
      setTransfer(0);
      setGiro(0);
      setCn(0);
      setOth(0);
    }, 100);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);

    form.setFieldsValue({
      metode_bayar1: null,
      metode_bayar2: null,
      metode_bayar3: null,
      metode_bayar4: null,
      metode_bayar5: null,
      bayar1: null,
      bayar2: null,
      bayar3: null,
      bayar4: null,
      bayar5: null,
    });

    setTunai(0);
    setTransfer(0);
    setGiro(0);
    setCn(0);
    setOth(0);
    //this.myFormRef.reset();
  };

  const content = (row, idx) => (
    <div>
        <div>
            <Checkbox className="text-xs font-normal py-2 px-2 rounded-md" onChange={(value) => onChangePilih(value, row, idx)}> Pilih </Checkbox>
        </div>
        <div>
            <button
                //onClick={() => metodePembayaran(row)}
                onClick={showModal}
                className=" hover:text-cyan-700 transition-colors  text-xs font-normal py-2 px-2 rounded-md "
            >
                <PrinterOutlined className="mr-2 mt-0.5 float float-left" />
                Metode Pembayaran
            </button>

            <Modal
                title="Title"
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                //ref={(modal) => this.myFormRef = modal}
                footer={[
                  <button className="border border-cyan-700 rounded-md m-1 text-sm px-6 py-2" key="back" onClick={handleCancel}>
                    Cancel
                  </button>,
                  <button className="bg-cyan-700 rounded-md m-1 text-sm px-4" key="submit" loading={loading} onClick={(value) => handleOk(row, idx, value)}>
                    <p className="px-4 py-2 m-0 text-white">
                        SIMPAN
                    </p>
                  </button>
                ]}
            >
                  <div className="w-full flex justify-start">
                      <div className="w-full md:w-1/2 px-3 mb-2 md:mb-0 text-center">
                          <span className="font-bold">TOTAL PIUTANG</span>
                      </div>
                  </div>

                  <div className="w-full flex justify-start mb-4">
                      <div className="w-full md:w-1/2 px-3 mb-2 md:mb-0 text-center">
                          <span className="font-bold">{formatter.format(row.attributes?.total - row.subtotal)}</span>
                      </div>
                  </div>

                  <div className="w-full flex justify-start">
                      <div className="w-full md:w-1/2 px-3 mb-2 md:mb-0">
                          <Form.Item name="metode_bayar1" noStyle>
                              <Select
                                  size="large"
                                  style={{
                                      width: "100%",
                                  }}
                                  placeholder="Akun Pembayaran"
                                  onChange={(value) => onChangeMetode(value)}
                              >
                                  <Select.Option value="tunai" key="tunai">
                                      Tunai
                                  </Select.Option>
                                  <Select.Option value="transfer" key="transfer">
                                      Bank Transfer
                                  </Select.Option>
                                  <Select.Option value="giro" key="giro">
                                      Bank Giro
                                  </Select.Option>
                                  <Select.Option value="cn" key="cn">
                                      CN
                                  </Select.Option>
                                  <Select.Option value="oth" key="oth">
                                      OTH
                                  </Select.Option>
                              </Select>
                          </Form.Item>
                      </div>
                      <div className="w-full md:w-1/2 px-3 mb-2 md:mb-0">
                          <Form.Item name="bayar1" noStyle>
                              <InputNumber
                                  size="large"
                                  max={data.total}
                                  min={0}
                                  style={{
                                      width: "100%",
                                      marginRight: "10px",
                                  }}
                                  onChange={(value) => onChangeBayar(value, metode, row, idx)}
                              />
                          </Form.Item>
                      </div>
                  </div>

                  <div className="w-full flex justify-start">
                      <div className="w-full md:w-1/2 px-3 mb-2 md:mb-0">
                          <Form.Item name="metode_bayar2" noStyle>
                              <Select
                                  size="large"
                                  style={{
                                      width: "100%",
                                  }}
                                  placeholder="Akun Pembayaran"
                                  onChange={(value) => onChangeMetode(value)}
                              >
                                  <Select.Option value="tunai" key="tunai">
                                      Tunai
                                  </Select.Option>
                                  <Select.Option value="transfer" key="transfer">
                                      Bank Transfer
                                  </Select.Option>
                                  <Select.Option value="giro" key="giro">
                                      Bank Giro
                                  </Select.Option>
                                  <Select.Option value="cn" key="cn">
                                      CN
                                  </Select.Option>
                                  <Select.Option value="oth" key="oth">
                                      OTH
                                  </Select.Option>
                              </Select>
                          </Form.Item>
                      </div>
                      <div className="w-full md:w-1/2 px-3 mb-2 md:mb-0">
                          <Form.Item name="bayar2" noStyle>
                              <InputNumber
                                  size="large"
                                  min={0}
                                  style={{
                                      width: "100%",
                                      marginRight: "10px",
                                  }}
                                  onChange={(value) => onChangeBayar(value, metode, row, idx)}
                              />
                          </Form.Item>
                      </div>
                  </div>

                  <div className="w-full flex justify-start">
                      <div className="w-full md:w-1/2 px-3 mb-2 md:mb-0">
                          <Form.Item name="metode_bayar3" noStyle>
                              <Select
                                  size="large"
                                  style={{
                                      width: "100%",
                                  }}
                                  placeholder="Akun Pembayaran"
                                  onChange={(value) => onChangeMetode(value)}
                              >
                                  <Select.Option value="tunai" key="tunai">
                                      Tunai
                                  </Select.Option>
                                  <Select.Option value="transfer" key="transfer">
                                      Bank Transfer
                                  </Select.Option>
                                  <Select.Option value="giro" key="giro">
                                      Bank Giro
                                  </Select.Option>
                                  <Select.Option value="cn" key="cn">
                                      CN
                                  </Select.Option>
                                  <Select.Option value="oth" key="oth">
                                      OTH
                                  </Select.Option>
                              </Select>
                          </Form.Item>
                      </div>
                      <div className="w-full md:w-1/2 px-3 mb-2 md:mb-0">
                          <Form.Item name="bayar3" noStyle>
                              <InputNumber
                                  size="large"
                                  min={0}
                                  style={{
                                      width: "100%",
                                      marginRight: "10px",
                                  }}
                                  onChange={(value) => onChangeBayar(value, metode, row)}
                              />
                          </Form.Item>
                      </div>
                  </div>

                  <div className="w-full flex justify-start">
                      <div className="w-full md:w-1/2 px-3 mb-2 md:mb-0">
                          <Form.Item name="metode_bayar4" noStyle>
                              <Select
                                  size="large"
                                  style={{
                                      width: "100%",
                                  }}
                                  placeholder="Akun Pembayaran"
                                  onChange={(value) => onChangeMetode(value)}
                              >
                                  <Select.Option value="tunai" key="tunai">
                                      Tunai
                                  </Select.Option>
                                  <Select.Option value="transfer" key="transfer">
                                      Bank Transfer
                                  </Select.Option>
                                  <Select.Option value="giro" key="giro">
                                      Bank Giro
                                  </Select.Option>
                                  <Select.Option value="cn" key="cn">
                                      CN
                                  </Select.Option>
                                  <Select.Option value="oth" key="oth">
                                      OTH
                                  </Select.Option>
                              </Select>
                          </Form.Item>
                      </div>
                      <div className="w-full md:w-1/2 px-3 mb-2 md:mb-0">
                          <Form.Item name="bayar4" noStyle>
                              <InputNumber
                                  size="large"
                                  min={0}
                                  style={{
                                      width: "100%",
                                      marginRight: "10px",
                                  }}
                                  onChange={(value) => onChangeBayar(value, metode, row)}
                              />
                          </Form.Item>
                      </div>
                  </div>

                  <div className="w-full flex justify-start">
                      <div className="w-full md:w-1/2 px-3 mb-2 md:mb-0">
                          <Form.Item name="metode_bayar5" noStyle>
                              <Select
                                  size="large"
                                  style={{
                                      width: "100%",
                                  }}
                                  placeholder="Akun Pembayaran"
                                  onChange={(value) => onChangeMetode(value)}
                              >
                                  <Select.Option value="tunai" key="tunai">
                                      Tunai
                                  </Select.Option>
                                  <Select.Option value="transfer" key="transfer">
                                      Bank Transfer
                                  </Select.Option>
                                  <Select.Option value="giro" key="giro">
                                      Bank Giro
                                  </Select.Option>
                                  <Select.Option value="cn" key="cn">
                                      CN
                                  </Select.Option>
                                  <Select.Option value="oth" key="oth">
                                      OTH
                                  </Select.Option>
                              </Select>
                          </Form.Item>
                      </div>
                      <div className="w-full md:w-1/2 px-3 mb-2 md:mb-0">
                          <Form.Item name="bayar5" noStyle>
                              <InputNumber
                                  size="large"
                                  min={0}
                                  style={{
                                      width: "100%",
                                      marginRight: "10px",
                                  }}
                                  onChange={(value) => onChangeBayar(value, metode, row)}
                              />
                          </Form.Item>
                      </div>
                  </div>

                  <div className="w-full flex justify-start mt-4">
                      <div className="w-full md:w-1/2 px-3 mb-2 md:mb-0 text-center">
                          <span className="font-bold">SISA PIUTANG</span>
                      </div>
                  </div>

                  <div className="w-full flex justify-start mb-4">
                      <div className="w-full md:w-1/2 px-3 mb-2 md:mb-0 text-center">
                          <span className="font-bold">
                              {formatter.format(
                                (row.attributes?.total - row.subtotal) - (tunai + transfer + giro + cn + oth)
                              )}
                          </span>
                      </div>
                  </div>

                  {/*<div className="w-full flex justify-start">*/}
                  {/*    <div className="w-full md:w-1/4 px-3 mb-2 md:mb-0 text-center">*/}
                  {/*        <Form.Item>*/}
                  {/*            {loading ? (*/}
                  {/*                <div className=" flex float-left ml-3 ">*/}
                  {/*                    <Spin />*/}
                  {/*                </div>*/}
                  {/*            ) : (*/}
                  {/*                <button htmlType="submit" className="bg-cyan-700 rounded-md m-1 text-sm px-4">*/}
                  {/*                    <p className="px-4 py-2 m-0 text-white">*/}
                  {/*                        SIMPAN*/}
                  {/*                    </p>*/}
                  {/*                </button>*/}
                  {/*            )}*/}
                  {/*        </Form.Item>*/}
                  {/*    </div>*/}
                  {/*</div>*/}
            </Modal>
        </div>
    </div>
  );

  var formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 2,
  });

  function formatMyDate(value, locale = "id-ID") {
    return new Date(value).toLocaleDateString(locale);
  }

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
          name: "Tindakan",
          width: "100px",
          selector: (row, idx) => (
        <>
            <Popover content={content(row, idx)} placement="bottom" trigger="click">
                <button className=" text-cyan-700  transition-colors  text-xs font-normal py-2 rounded-md ">
                    Tindakan
                </button>
            </Popover>
        </>
      ),
    },
    {
      name: "No Invoice",
      width: "200px",
      selector: (row) => row.attributes?.no_sales_sale ?? row.attributes?.no_non_panel_sale ?? row.attributes?.no_panel_sale,
    },
    {
      name: "Tanggal",
      width: "100px",
      selector: (row) => formatMyDate(row.attributes?.sale_date),
    },
    {
      name: "Pelanggan",
      width: "150px",
      selector: (row) => row.attributes?.customer?.data?.attributes?.name,
    },
    {
      name: "Sales",
      width: "150px",
      //selector: (row) => console.log("row tabel",row),
    },
    {
      name: "Nilai Invoice",
      width: "150px",
      selector: (row) => formatter.format(row.attributes?.total ?? 0),
    },
    {
      name: "Total Retur Jual",
      width: "150px",
      selector: (row) => formatter.format(row?.subtotal ?? 0),
    },
    {
      name: "Total Pembayaran",
      width: "150px",
      //selector: (row) => formatter.format( row.sisaHutang - row.sisaPiutang ),
      //selector: (row, idx) => totalPembayaran(row, idx) ,
      //selector: (row, idx) => ((row.attributes?.total - row?.subtotal) - row?.sisaPiutang) ?? 0 ,
      //selector: (row) => console.log("row total pem", row),
    },
    {
      name: "Sisa Piutang Jt",
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
      noDataComponent={`--Belum ada data penjualan--`}
    />
  );
}

import DataTable from "react-data-table-component";
import AlertDialog from "../../Alert/Alert";
import { Form, Select, InputNumber, Checkbox, Popover, Modal } from "antd";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { PrinterOutlined } from "@ant-design/icons";
import router from "next/router";

export default function ReactDataTable({ data, retur, biaya, calculatePriceTotal }) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  var unit = 1;
  var priceUnit = 1;
  var tempIndex = 0;
  var stock = 0;
  var returSubtotal = 0;
  var sisaPiutang = {};
  const [modalSisa, setModalSisa] = useState(0);
  const [dataRetur, setDataRetur] = useState("tidak");
  const [metode, setMetode] = useState("");
  const [biayaData, setBiayaData] = useState(0);

  var index = 0;
  data.forEach((element) => {

    retur.forEach((row) => {
      if(element.attributes.no_sales_sale == row.id)
      {
        returSubtotal += row.subtotal;
      }
    });

    element.subtotal = returSubtotal;
    //element.hutangJatuhTempo = element.attributes.total_purchasing - element.subtotal;
    //element.sisaHutang = element.hutangJatuhTempo;
    //element.sisaHutangFix = element.hutangJatuhTempo; 
    sisaPiutang[index] = element.sisaPiutang;

    index++;
  });

  //const onChangeSisaHutang = (value, data, index) => {
  //  var sisa = data.sisaHutangFix;
  //  sisa = sisa;
  //  dispatch({ type: "CHANGE_DATA_SISAHUTANG", sisahutang: sisa, listData: data, index: index });
  //};

  const onChangePilih = async (value, data, index, v) => {
    var pilihData = "tidak";
    if(value.target.checked == true) pilihData = "pilih";
    else pilihData = "tidak";
    dispatch({ type: "CHANGE_PILIH_DATA", pilihData: pilihData, listData: data, index: index });
    dispatch({ type: "CHANGE_TOTAL_HUTANG_JATUH_TEMPO", totalHutangJatuhTempo: data.sisaPiutang, listData: data, index: index });
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

  const metodePembayaran = (value) => { console.log("pembayaran",value)
    //router.push("/dashboard/biaya/piutang/metode_pembayaran/" + value.id + value.keterangan);
    var totalPiutang = parseInt(value.attributes.total) - value.subtotal;
    router.push({
      pathname: '/dashboard/biaya/piutang/metode_pembayaran',
      query: { id: value.id, ket: value.keterangan, total: totalPiutang },
    });
  };

  const onChangeMetode = (value) => {
    setMetode(value);
    //onChangeBayar(biaya,value);
  };

  let tunai = 0;
  var transfer = 0;
  var giro = 0;
  var cn = 0;
  var oth = 0;
  const onChangeBayar = (value, metode, row) => {

    setBiayaData(value);
    if (metode == "tunai") tunai = value;
    else if (metode == "transfer") transfer = value;
    else if (metode == "giro") giro = value;
    if (metode == "cn") cn = value;
    if (metode == "oth") oth = value; 
    console.log("data bayar", row, biaya);

    //tunai = biaya.info[idx]?.tunai ?? 0;
    //transfer = biaya.info[idx]?.transfer ?? 0;
    //giro = biaya.info[idx]?.giro ?? 0;
    //cn = biaya.info[idx]?.cn ?? 0;
    //oth = biaya.info[idx]?.oth ?? 0;

    setModalSisa(
        (parseInt(row.attributes.total) - row.subtotal) - (tunai + transfer + giro + cn + oth)
    );
    //dispatch({ type: "CHANGE_DATA_GIRO", giro: value, listData: data, index: index });
    //onChangeSisaHutang(value, data, index);
  };

  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setModalText('The modal will be closed after two seconds');
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
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
                footer={[
                  <button className="border border-cyan-700 rounded-md m-1 text-sm px-6 py-2" key="back" onClick={handleCancel}>
                    Cancel
                  </button>,
                  <button className="bg-cyan-700 rounded-md m-1 text-sm px-4" key="submit" loading={loading} onClick={handleOk}>
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
                                  onChange={(value) => onChangeBayar(value, metode, row)}
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
                                  onChange={(value) => onChangeBayar(value, metode, row)}
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
                          <span className="font-bold">{formatter.format(modalSisa)}</span>
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
      //name: "Pilih Dokumen",
      //width: "150px",
      //selector: (row, idx) => {
      //  return (
      //    <Row align="bottom" justify="center">
      //      <Form.Item noStyle>
      //          <Checkbox onChange={(value) => onChangePilih(value, row, idx)}> Pilih </Checkbox>
      //      {/*{biaya.info[idx]?.pilihData == null || biaya.info[idx]?.pilihData == "tidak" ? (*/}
      //      {/*  <button type="button" onClick={(value) => onChangePilih("tidak", row, idx, value)} className="bg-cyan-700 rounded-md m-1 text-sm">*/}
      //      {/*    <p className="px-4 py-2 m-0 text-white">*/}
      //      {/*    Pilih*/}
      //      {/*    </p>*/}
      //      {/*  </button>*/}
      //      {/*) : (*/}
      //      {/*  <button type="button" onClick={(value) => onChangePilih("pilih", row, idx, value)} className="bg-white-700 rounded-md border border-cyan-700 m-1 text-sm">*/}
      //      {/*    <p className="px-4 py-2 m-0 text-black">*/}
      //      {/*    Tidak*/}
      //      {/*    </p>*/}
      //      {/*  </button>*/}
      //      {/*)}*/}
      //      </Form.Item>
      //    </Row>
      //  )
      //},
    },
    //{
    //  name: "Pilih Metode Bayar",
    //  width: "150px",
    //  selector: (row, idx) => {
    //    return (
    //      <Row align="bottom" justify="center">
    //        <Form.Item noStyle>
    //          <button className="bg-cyan-700 rounded-md m-1 text-sm px-4">
    //            <p className="px-4 py-2 m-0 text-white">
    //              metode 
    //            </p>
    //          </button>
    //        </Form.Item>
    //      </Row>
    //    )
    //  },
    //},
    {
      name: "No Invoice",
      width: "200px",
      selector: (row) => row.attributes?.no_sales_sale,
    },
    {
      name: "Tanggal",
      width: "100px",
      selector: (row) => row.attributes?.sale_date,
    },
    {
      name: "Pelanggan",
      width: "150px",
      selector: (row) => row.attributes?.customer.data.attributes?.name,
    },
    {
      name: "Sales",
      width: "150px",
      selector: (row) => console.log("row tabel",row),
    },
    {
      name: "Nilai Invoice",
      width: "150px",
      selector: (row) => formatter.format(row.attributes?.total),
    },
    {
      name: "Total Retur Jual",
      width: "150px",
      selector: (row) => formatter.format(row.subtotal),
    },
    {
      name: "Total Pembayaran",
      width: "150px",
      //selector: (row) => formatter.format(row.hutangJatuhTempo),
    },
    //{
    //  name: "Hutang Jatuh Tempo",
    //  width: "150px",
    //  selector: (row) => formatter.format(row.hutangJatuhTempo),
    //},
    //{
    //  name: "ACC Tunai",
    //  width: "150px",
    //  selector: (row, idx) => {
    //    var defaultAccTunai = 0;

    //    return (
    //      <Row align="bottom" justify="center">
    //        <Form.Item name={["AccTunai", `${idx}`]} noStyle>
    //          <InputNumber
    //            defaultValue={defaultAccTunai}
    //            //formatter={(value) => `${value}%`}
    //            min={0}
    //            onChange={(e) => onChangeTunai(e, row, idx)}
    //            style={{
    //              width: "100px",
    //              marginRight: "10px",
    //            }}
    //          />
    //        </Form.Item>
    //      </Row>
    //    );
    //  },
    //},
    //{
    //  name: "ACC Bank Transfer",
    //  width: "150px",
    //  selector: (row, idx) => {
    //    var defaultAccBankTf = 0;

    //    return (
    //      <Row align="bottom" justify="center">
    //        <Form.Item name={["AccBankTf", `${idx}`]} noStyle>
    //          <InputNumber
    //            defaultValue={defaultAccBankTf}
    //            //formatter={(value) => `${value}%`}
    //            min={0}
    //            onChange={(e) => onChangeTransfer(e, row, idx)}
    //            style={{
    //              width: "100px",
    //              marginRight: "10px",
    //            }}
    //          />
    //        </Form.Item>
    //      </Row>
    //    );
    //  },
    //},
    //{
    //  name: "ACC Bank Giro",
    //  width: "150px",
    //  selector: (row, idx) => {
    //    var defaultAccBankGiro = 0;

    //    return (
    //      <Row align="bottom" justify="center">
    //        <Form.Item name={["AccBankGiro", `${idx}`]} noStyle>
    //          <InputNumber
    //            defaultValue={defaultAccBankGiro}
    //            //formatter={(value) => `${value}%`}
    //            min={0}
    //            onChange={(e) => onChangeGiro(e, row, idx)}
    //            style={{
    //              width: "100px",
    //              marginRight: "10px",
    //            }}
    //          />
    //        </Form.Item>
    //      </Row>
    //    );
    //  },
    //},
    //{
    //  name: "ACC CN",
    //  width: "150px",
    //  selector: (row, idx) => {
    //    var defaultAccCN = 0;

    //    return (
    //      <Row align="bottom" justify="center">
    //        <Form.Item name={["AccCN", `${idx}`]} noStyle>
    //          <InputNumber
    //            defaultValue={defaultAccCN}
    //            //formatter={(value) => `${value}%`}
    //            min={0}
    //            onChange={(e) => onChangeCn(e, row, idx)}
    //            style={{
    //              width: "100px",
    //              marginRight: "10px",
    //            }}
    //          />
    //        </Form.Item>
    //      </Row>
    //    );
    //  },
    //},
    //{
    //  name: "ACC OTH",
    //  width: "150px",
    //  selector: (row, idx) => {
    //    var defaultAccOTH = 0;

    //    return (
    //      <Row align="bottom" justify="center">
    //        <Form.Item name={["AccOTH", `${idx}`]} noStyle>
    //          <InputNumber
    //            defaultValue={defaultAccOTH}
    //            //formatter={(value) => `${value}%`}
    //            min={0}
    //            onChange={(e) => onChangeOth(e, row, idx)}
    //            style={{
    //              width: "100px",
    //              marginRight: "10px",
    //            }}
    //          />
    //        </Form.Item>
    //      </Row>
    //    );
    //  },
    //},
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
      noDataComponent={`--Belum ada produk--`}
    />
  );
}
import React, { useEffect, useState } from "react";
import DashboardLayout from "@iso/containers/DashboardLayout/DashboardLayout";
import LayoutContent from "@iso/components/utility/layoutContent";
import LayoutWrapper from "@iso/components/utility/layoutWrapper.js";
import TitlePage from "@iso/components/TitlePage/TitlePage";
import Head from "next/head";
import {
  Button,
  DatePicker,
  Empty,
  Input,
  InputNumber,
  Modal,
  notification,
  Popconfirm,
  Select,
  Tag,
  Tooltip,
} from "antd";
import moment from "moment";
import nookies from "nookies";
import { useRouter } from "next/router";
import DataTable from "react-data-table-component";
import { CloseCircleFilled, CheckCircleFilled, PrinterOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import Link from "next/link";

export default function daftarKeluarBarang({ companyOptions }) {
  const { token } = nookies.get();
  const [date, setDate] = useState([
    moment().startOf("month").format("YYYY-MM-DD"),
    moment().endOf("month").format("YYYY-MM-DD"),
  ]);
  const [selectedLocation, setSelectedLocation] = useState();
  const [noRefOptions, setNoRefOptions] = useState([]);
  const [selectedNoReferensi, setSelectedNoReferensi] = useState();
  const [statusFilter, setStatusFilter] = useState("Proses");
  const [data, setData] = useState([]);
  const [refetch, setRefetch] = useState(false);
  const [cancelModal, setCancelModal] = useState({
    visible: false,
    id: null,
    reason: "",
    loading: false,
    author: null,
    bulk: false,
  });
  const router = useRouter();
  const [filtered, setFiltered] = useState(null);
  const [queryProduct, setQueryProduct] = useState("");
  const [printable, setPrintable] = useState(false);
  const [printState, setPrintState] = useState(false);
  const [master, setMaster] = useState(null);
  const [loadingSend, setLoadingSend] = useState(false);

  const printPdf = () => {
    setPrintState(true);
  };

  useEffect(() => {
    if (router.query.location && !router.query.no_referensi) {
      setSelectedLocation(parseInt(router.query.location));
      setSelectedNoReferensi(null);
      setData([]);
      setStatusFilter("Proses");
    } else if (router.query.location && router.query.no_referensi) {
      setSelectedLocation(parseInt(router.query.location));
      setSelectedNoReferensi(router.query.no_referensi);
    }
  }, [router.query]);

  useEffect(() => {
    async function fetchNoReferensi() {
      const endpoint = `${process.env.NEXT_PUBLIC_URL}/product-request/no-ref?location=${selectedLocation}&type=sender&start_date=${date[0]}&end_date=${date[1]}`;
      const response = await fetch(endpoint, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const noRefs = await response.json();

      console.log("no ref ==>", noRefs);

      if (noRefs?.data?.length > 0) {
        const options = noRefs.data.reverse().map((item) => ({
          label: item,
          value: item,
        }));

        setNoRefOptions(options);
      } else {
        setNoRefOptions([]);
      }
    }

    if (selectedLocation && date) {
      fetchNoReferensi();
    }
  }, [selectedLocation, date]);

  useEffect(() => {
    async function fetchBarangKeluar() {
      const endpoint = `${process.env.NEXT_PUBLIC_URL}/product-request/location?location=${selectedLocation}&no_referensi=${selectedNoReferensi}&status=${statusFilter}&type=sender`;
      const req = await fetch(endpoint, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const response = await req.json();
      console.log("response barang keluar", response);
      setPrintable(response?.isDone);
      setMaster(response?.master);

      if (response?.data) {
        setData(response.data);
      }
    }

    if (selectedLocation && selectedNoReferensi) {
      fetchBarangKeluar();
    }
  }, [selectedNoReferensi, statusFilter, refetch]);

  console.log("master", master);

  const customStyles = {
    headCells: {
      style: {
        color: "white",
        background: "#036B82",
      },
    },
  };

  const handleCancelData = async (id) => {
    setCancelModal({
      ...cancelModal,
      loading: true,
    });

    try {
      const postData = {
        data: {
          status: "Dibatalkan",
          cancel_reason: cancelModal?.reason,
          cancel_author: cancelModal?.author,
        },
      };
      const endpoint = `${process.env.NEXT_PUBLIC_URL}/product-requests/${id}`;
      const req = await fetch(endpoint, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(postData),
      });

      const response = await req.json();

      console.log("response cancel", response);

      if (response?.data) {
        return {
          success: true,
          message: "Berhasil membatalkan data",
          description: "Data berhasil dibatalkan",
        };
      } else {
        return {
          success: false,
          message: "Gagal membatalkan data",
        };
      }
    } catch (error) {
      return {
        success: false,
        message: "Gagal membatalkan data",
      };
    }
  };

  const getUserMe = async () => {
    const cookies = nookies.get();

    const endpoint = process.env.NEXT_PUBLIC_URL + "/users/me";
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookies.token,
      },
    };

    const req = await fetch(endpoint, options);
    const res = await req.json();

    return res;
  };

  const handleAddToStock = async (row, index) => {
    if (row.send_qty === 0) {
      notification.error({
        message: "Gagal mengirim ke stok",
        description: "Jumlah pengiriman tidak boleh 0",
      });
      return;
    }
    try {
      const user = await getUserMe();

      const data = {
        id: row.id,
        location_sender: row.location_sender.id,
        location_recipient: row.location_recipient.id,
        product: row.product.id,
        req_qty: row.qty,
        qty: row?.send_qty || 1,
        unit: row.send_unit,
        type: "Transfer Keluar",
        sended: row?.sended || 0,
        no_referensi: row.no_referensi,
        keterangan: `Pengiriman stok ke ${row.location_recipient.name}`,
        author: user,
      };

      const endpoint = `${process.env.NEXT_PUBLIC_URL}/product-request/transfer`;
      const req = await fetch(endpoint, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const response = await req.json();

      if (response?.data) {
        return {
          success: true,
          message: "Berhasil mengirim ke stok",
          description:
            "Stok berhasil dikirim ke gudang tujuan, silahkan ganti status untuk melihat data yang sudah dikirim",
        };
      } else {
        return {
          success: false,
          message: response?.error?.message || response?.error || "Gagal mengirim ke stok",
          location: row.location_sender.id,
          product: row.product.id,
        };
      }
    } catch (error) {
      return {
        success: false,
        message: error?.message || error?.error || "Terjadi kesalahan server",
      };
    }
  };

  async function handleBulkSend() {
    if (data.length === 0) return;

    setLoadingSend(true);

    const promises = data.map((item, index) => handleAddToStock(item, index));

    const responses = await Promise.all(promises);

    const success = responses.filter((item) => item.success === true);
    const failed = responses.filter((item) => item.success === false);

    if (success.length > 0) {
      notification.success({
        message: "Berhasil mengirim ke stok",
        description: "Stok berhasil dikirim ke gudang tujuan",
      });
    }

    if (failed.length > 0) {
      for (let i = 0; i < failed.length; i++) {
        notification.error({
          message: failed?.message || "Gagal mengirim ke stok",
          description: (
            <span
              className="text-sm cursor-pointer m-0 text-blue-400 hover:text-blue-600"
              onClick={() => {
                router.replace(
                  {
                    pathname: "/dashboard/stok",
                    query: {
                      location: failed.location,
                      product: failed.product,
                    },
                  },
                  undefined,
                  { shallow: true }
                );
              }}
            >
              Lihat Stok
            </span>
          ),
        });
      }
    }

    setRefetch(!refetch);
    setLoadingSend(false);
  }

  const activeBtn =
    "bg-cyan-700 text-xs font-bold text-white w-full rounded h-10 hover:bg-cyan-800  shadow-sm flex items-center justify-center float-right";

  const inactiveBtn =
    "bg-gray-400 cursor-not-allowed text-xs font-bold text-gray-200 w-full rounded h-10 shadow-sm flex items-center justify-center float-right";

  const columns = [
    {
      name: "Nama Produk",
      wrap: true,
      selector: (row) => row.product.name,
    },
    {
      name: "Permintaan Transfer",
      align: "center",
      width: "260px",
      selector: (row) => (
        <Input.Group compact className="w-full">
          <InputNumber value={row.qty} readOnly className="w-[30%]" />
          <Input value={row.unit} className="w-auto border-r" />
        </Input.Group>
      ),
    },
    {
      name: "Transfer Ke",
      wrap: true,
      center: true,
      selector: (row) => row.location_recipient.name,
    },
    {
      name: "Status",
      center: true,
      selector: (row) => {
        let color = "";

        switch (row.status) {
          case "Proses":
            color = "default";
            break;
          case "Sebagian":
            color = "orange";
            break;
          case "Selesai":
            color = "green";
            break;
          case "Dibatalkan":
            color = "red";
            break;
          default:
            color = "default";
            break;
        }

        return (
          <Tag className="mr-0" color={color}>
            {row.status}
          </Tag>
        );
      },
    },
    {
      name: "Terkirim",
      center: true,
      selector: (row) => row?.sended || 0,
    },
    {
      name: "Kadaluwarsa",
      omit: statusFilter === "Dibatalkan",
      center: true,
      selector: (row) => (row?.exp_date ? moment(row.exp_date).format("DD/MM/YYYY") : "-"),
    },
    {
      name: "Qty Ditransfer",
      omit: statusFilter === "Dibatalkan",
      width: "260px",
      selector: (row, index) => {
        const stockIndex = row?.stock?.findIndex((item) => item.id === row?.product.id);

        let maxQty = row?.qty || undefined;
        const units =
          row?.stock?.[stockIndex]?.available_units.map((unit) => ({
            label: unit,
            value: unit,
          })) || [];

        const sameData = data.filter(
          (item, productIdx) =>
            item.product.id === row.product.id && item.send_unit === row.send_unit && productIdx !== index
        );

        if (sameData.length > 0) {
          sameData.forEach((data) => {
            maxQty -= data.qty;
          });
        }

        if (row.status === "Selesai") {
          maxQty = 999;
        }

        return (
          <Input.Group compact className="w-full">
            <InputNumber
              readOnly={row.status === "Selesai"}
              onChange={(value) => {
                const newData = data.map((item, itemIdx) => {
                  if (itemIdx === index) {
                    return {
                      ...item,
                      send_qty: value,
                    };
                  }

                  return item;
                });

                setData(newData);
              }}
              defaultValue={row.status === "Selesai" ? row.sended : row.qty}
              min={0}
              max={maxQty > 0 ? maxQty : 0}
              className="w-[30%]"
            />
            {row.status !== "Selesai" ? (
              <Select
                onChange={(value) => {
                  const newData = data.map((item, itemIdx) => {
                    if (itemIdx === index) {
                      return {
                        ...item,
                        send_unit: value,
                      };
                    }

                    return item;
                  });

                  setData(newData);
                }}
                className="w-[50%]"
                defaultValue={row?.sended_unit || row.unit}
                options={units}
              />
            ) : (
              <Input value={row?.sended_unit || row.unit} readOnly className="w-[50%] border-r" />
            )}
          </Input.Group>
        );
      },
    },
    {
      name: "Tindakan",
      omit: statusFilter === "Dibatalkan",
      center: true,
      selector: (row, index) =>
        row.status !== "Selesai" ? (
          <div className="flex gap-x-4">
            <Popconfirm
              title="Apakah anda yakin ingin membatalkan permintaan ini?"
              okButtonProps={{
                danger: true,
              }}
              okText="Ya"
              cancelText="Tidak"
              onConfirm={() =>
                setCancelModal({
                  ...cancelModal,
                  visible: true,
                  id: row.id,
                  author: row.location_sender.name,
                })
              }
              placement="topLeft"
            >
              <CloseCircleFilled title="Batalkan" className="text-3xl text-red-700" />
            </Popconfirm>
            <Popconfirm
              placement="topLeft"
              title="Apakah anda yakin ingin mengirim barang ini?"
              okButtonProps={{
                type: "default",
              }}
              okText="Ya"
              cancelText="Tidak"
              onConfirm={() => {
                handleAddToStock(row, index).then((res) => {
                  if (res.success) {
                    notification.success({
                      message: res.message,
                      description: res.description,
                    });
                    setRefetch(!refetch);
                  } else {
                    notification.error({
                      message: res?.message || "Gagal mengirim ke stok",
                      description: (
                        <span
                          className="text-sm cursor-pointer m-0 text-blue-400 hover:text-blue-600"
                          onClick={() => {
                            router.replace(
                              {
                                pathname: "/dashboard/stok",
                                query: {
                                  location: res.location,
                                  product: res.product,
                                },
                              },
                              undefined,
                              { shallow: true }
                            );
                          }}
                        >
                          Lihat Stok
                        </span>
                      ),
                    });
                  }
                });
              }}
            >
              <CheckCircleFilled title="Kirim Barang" className="text-3xl text-green-700" />
            </Popconfirm>
          </div>
        ) : (
          <PrinterOutlined className="mr-1 text-lg cursor-pointer hover:text-blue-700 duration-150" title="Cetak" />
        ),
    },
    {
      name: "Alasan",
      omit: statusFilter !== "Dibatalkan",
      selector: (row) => row?.cancel_reason || "-",
    },
  ];

  const printColumns = [
    {
      name: "No",
      width: "5%",
      align: "center",
      selector: (row, index) => index + 1,
    },
    {
      name: "ITEM",
      width: "25%",
      wrap: true,
      selector: (row) => row.product.name,
    },
    {
      name: "UNIT",
      width: "10%",
      selector: (row) => row.sended_unit,
    },
    {
      name: "JML",
      width: "10%",
      selector: (row) => row.sended,
    },
    {
      name: "STATUS",
      width: "20%",
      selector: (row) => {
        if (row.sended === row.qty) {
          return "Terkirim";
        } else if (row.sended < row.qty && row.sended > 0) {
          return "Dikirim Sebagian";
        } else {
          return "Belum Dikirim";
        }
      },
    },
    {
      name: "KET",
      width: "30%",
      selector: (row) => row.cancel_reason,
    },
  ];

  const handleFilterProducts = (e) => {
    setQueryProduct(e.target.value);
  };

  useEffect(() => {
    if (queryProduct !== "") {
      const filteredProducts = data.filter((item) =>
        item.product.name.toLowerCase().includes(queryProduct.toLowerCase())
      );

      setFiltered(filteredProducts);
    } else {
      setFiltered(null);
    }
  }, [queryProduct]);

  const handlePrint = () => {
    window.print();
  };

  const printStyles = {
    headCells: {
      style: {
        color: "black",
        background: "white",
        border: "1px solid black",
        fontWeight: "bold",
      },
    },
    cells: {
      style: {
        color: "black",
        background: "white",
        border: "1px solid black",
      },
    },
  };

  async function handleBulkCancel() {
    setCancelModal({
      ...cancelModal,
      loading: true,
    });

    try {
      const promises = data.map((item) => handleCancelData(item.id));

      const responses = await Promise.all(promises);

      const success = responses.filter((item) => item.success === true);
      const failed = responses.filter((item) => item.success === false);

      if (success.length > 0) {
        notification.success({
          message: "Berhasil membatalkan data",
          description: "Data berhasil dibatalkan",
        });
      }

      if (failed.length > 0) {
        for (let i = 0; i < failed.length; i++) {
          notification.error({
            message: failed?.message || "Gagal membatalkan data",
          });
        }
      }

      setRefetch(!refetch);
      setLoadingSend(false);
      setCancelModal({
        ...cancelModal,
        loading: false,
        visible: false,
      });
    } catch (e) {
      console.log(e);
      setCancelModal({
        ...cancelModal,
        loading: false,
        visible: false,
      });
      notification.error({
        message: "Gagal membatalkan data",
        description: "Terjadi kesalahan server saat membatalkan data",
      });
    }
  }

  return (
    <>
      {printState ? (
        <div className="px-6 py-3">
          <div className="flex justify-between items-center mb-5">
            <ArrowLeftOutlined
              title="Kembali"
              className="print:hidden cursor-pointer"
              onClick={() => {
                setPrintState(false);
              }}
            />
            <button onClick={handlePrint} class="print:hidden rounded-full bg-sky-400 px-4 py-2 font-bold text-white">
              <span>
                <PrinterOutlined className="mr-1 text-lg" />
              </span>{" "}
              Cetak Dokumen
            </button>
          </div>
          <h1 className="text-[#036B82] text-2xl">Lembar Pengiriman Barang</h1>

          <div className="w-full flex justify-between">
            <div className="w-2/4 grid grid-cols-2 mb-3">
              <div>
                <p className="text-sm mb-0 uppercase">No. Referensi</p>
                <p className="text-sm mb-0 uppercase">Tanggal Transfer</p>
                <p className="text-sm mb-0 uppercase">Dari Gudang</p>
                <p className="text-sm mb-0 uppercase">Lokasi Selesai</p>
              </div>
              <div className="text-right">
                <p className="text-sm mb-0 font-bold uppercase">{selectedNoReferensi}</p>
                <p className="text-sm mb-0 font-bold uppercase">{moment().format("DD/MM/YYYY")}</p>

                <p className="text-sm mb-0 font-bold uppercase">{master?.location_sender?.name}</p>
                <p className="text-sm mb-0 font-bold uppercase">{master?.location_recipient?.name}</p>
              </div>
            </div>
          </div>

          <DataTable
            dense
            columns={printColumns}
            data={master?.data || []}
            customStyles={printStyles}
            noDataComponent={`--Tidak ada data--`}
          />
        </div>
      ) : (
        <>
          <Head>
            <title>Daftar Keluar Barang</title>
          </Head>
          <DashboardLayout>
            <LayoutWrapper>
              <TitlePage
                titleText={
                  <div className="flex gap-x-4 items-center">
                    <span>DAFTAR KELUAR BARANG</span>
                    <Select
                      value={selectedLocation}
                      onSelect={(value) => {
                        router.replace(
                          {
                            pathname: "/dashboard/stok/daftar-keluar-barang",
                            query: { location: value },
                          },
                          undefined,
                          { shallow: true }
                        );
                      }}
                      options={companyOptions}
                      placeholder="Pilih Gudang"
                      className="lg:w-80 w-40 focus:border-none text-black hover:border-none"
                      bordered={false}
                    />
                  </div>
                }
              />
              <LayoutContent>
                {selectedLocation ? (
                  <>
                    <div className="w-full lg:w-3/4 grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                      <Modal
                        title="Batalkan Permintaan?"
                        open={cancelModal.visible}
                        confirmLoading={cancelModal.loading}
                        okButtonProps={{
                          danger: true,
                          disabled: cancelModal.reason === "",
                        }}
                        onOk={() => {
                          if (cancelModal?.bulk) {
                            handleBulkCancel();
                          } else {
                            handleCancelData(cancelModal.id).then((res) => {
                              if (res.success) {
                                notification.success({
                                  message: res.message,
                                  description: res.description,
                                });
                                setRefetch(!refetch);
                              } else {
                                notification.error({
                                  message: res?.message || "Gagal membatalkan data",
                                });
                              }
                            });
                          }
                        }}
                        onCancel={() => {
                          setCancelModal({
                            ...cancelModal,
                            visible: false,
                            id: null,
                            reason: "",
                            loading: false,
                          });
                        }}
                      >
                        <p>
                          Apakah anda yakin akan membatalkan permintaan ini? Harap isi alasan pembatalan dibawah ini:
                        </p>
                        <Input.TextArea
                          onInput={(e) => setCancelModal({ ...cancelModal, reason: e.target.value })}
                          value={cancelModal.reason}
                          placeholder="Alasan Pembatalan"
                          className="mt-2"
                        />
                      </Modal>
                      <DatePicker.RangePicker
                        defaultValue={[moment().startOf("month"), moment().endOf("month")]}
                        className="w-full"
                        placeholder="Tanggal"
                        onChange={(_, value) => {
                          if (value?.[0] !== "" && value?.[1] !== "") {
                            setDate(value);
                          } else {
                            setDate();
                          }
                        }}
                      />
                      <Select
                        value={selectedNoReferensi}
                        onSelect={(value) => {
                          router.replace(
                            {
                              pathname: "/dashboard/stok/daftar-keluar-barang",
                              query: {
                                ...router.query,
                                no_referensi: value,
                              },
                            },
                            undefined,
                            { shallow: true }
                          );
                        }}
                        allowClear
                        options={noRefOptions}
                        placeholder="No Referensi"
                        className="w-full"
                      />
                      <Select
                        defaultValue={statusFilter}
                        onChange={(value) => {
                          setStatusFilter(value);
                        }}
                        options={[
                          { label: "Proses", value: "Proses" },
                          { label: "Sebagian", value: "Sebagian" },
                          { label: "Selesai", value: "Selesai" },
                          { label: "Dibatalkan", value: "Dibatalkan" },
                        ]}
                        placeholder="Status"
                        className="w-full"
                      />
                    </div>

                    <p className="uppercase text-[#036B82] font-bold text-xl mb-1">Produk Transfer</p>
                    <div className="w-full lg:w-4/5 grid grid-cols-1 items-end md:grid-cols-4 gap-3 mb-3">
                      <Input.Search
                        onChange={handleFilterProducts}
                        size="large"
                        placeholder="Nama Produk"
                        className="w-full"
                      />
                      <button
                        title={!printable ? "Harap selesaikan semua permintaan terlebih dahulu" : ""}
                        onClick={printPdf}
                        disabled={!printable}
                        className={printable ? activeBtn : inactiveBtn}
                      >
                        CETAK BUKTI KELUAR BARANG
                      </button>
                    </div>

                    <DataTable
                      columns={columns}
                      data={filtered !== null ? filtered : data}
                      customStyles={customStyles}
                      noDataComponent={`--Tidak ada data--`}
                    />

                    <p className="font-bold mt-4 mb-0 mx-0">Catatan: </p>
                    <Input.TextArea
                      readOnly
                      value={master?.data?.[0]?.description}
                      className="w-full mt-2 mb-3"
                      placeholder="Catatan"
                    />

                    {statusFilter !== "Selesai" && statusFilter !== "Dibatalkan" ? (
                      <div className="mt-4 flex gap-x-4">
                        <Popconfirm
                          title="Apakah anda yakin ingin membatalkan permintaan ini?"
                          okButtonProps={{
                            danger: true,
                          }}
                          okText="Ya"
                          cancelText="Tidak"
                          onConfirm={() => {
                            if (data.length === 0) return;

                            setCancelModal({
                              ...cancelModal,
                              visible: true,
                              bulk: true,
                            });
                          }}
                          placement="top"
                        >
                          <Button className="flex gap-x-2 items-center font-bold" type="default" danger>
                            Batalkan Semua
                          </Button>
                        </Popconfirm>
                        <Popconfirm
                          placement="top"
                          title="Apakah anda yakin ingin mengirim permintaan ini?"
                          okButtonProps={{
                            type: "default",
                          }}
                          okText="Ya"
                          cancelText="Tidak"
                          onConfirm={handleBulkSend}
                        >
                          <Button
                            loading={loadingSend}
                            icon={<CheckCircleFilled title="Kirim Barang" className="text-xl" />}
                            className="flex gap-x-2 items-center font-bold"
                            type="primary"
                          >
                            Kirim Semua
                          </Button>
                        </Popconfirm>
                      </div>
                    ) : (
                      ""
                    )}
                  </>
                ) : (
                  <Empty description="Pilih Gudang Terlebih Dahulu" image={Empty.PRESENTED_IMAGE_SIMPLE} />
                )}
              </LayoutContent>
            </LayoutWrapper>
          </DashboardLayout>
        </>
      )}
    </>
  );
}

daftarKeluarBarang.getInitialProps = async (context) => {
  const cookies = nookies.get(context);

  const req = await fetchData(cookies);
  const data = await req.json();

  let options = [];

  if (data?.data?.length > 0) {
    options = data.data.map(({ attributes, id }) => {
      return {
        label: attributes.name,
        value: id,
      };
    });
  }

  return {
    companyOptions: options,
  };
};

const fetchData = async (cookies) => {
  const endpoint = process.env.NEXT_PUBLIC_URL + "/locations?populate=*";
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + cookies.token,
    },
  };

  const req = await fetch(endpoint, options);
  return req;
};

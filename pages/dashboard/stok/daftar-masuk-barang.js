import React, { useEffect, useState } from "react";
import DashboardLayout from "@iso/containers/DashboardLayout/DashboardLayout";
import LayoutContent from "@iso/components/utility/layoutContent";
import LayoutWrapper from "@iso/components/utility/layoutWrapper.js";
import TitlePage from "@iso/components/TitlePage/TitlePage";
import Head from "next/head";
import {
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
import { CloseCircleFilled, CheckCircleFilled, PrinterOutlined } from "@ant-design/icons";

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
  });
  const router = useRouter();
  const [printable, setPrintable] = useState(false);
  const [queryProduct, setQueryProduct] = useState("");
  const [filtered, setFiltered] = useState(null);

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

  const printPdf = () => {
    notification.info({
      message: "Fitur ini belum tersedia",
    });
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
      const endpoint = `${process.env.NEXT_PUBLIC_URL}/product-request/no-ref?location=${selectedLocation}&type=recipient&start_date=${date[0]}&end_date=${date[1]}`;
      const response = await fetch(endpoint, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const noRefs = await response.json();

      if (noRefs?.data?.length > 0) {
        const options = noRefs.data.map((item) => ({
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
      const endpoint = `${process.env.NEXT_PUBLIC_URL}/product-request/location?location=${selectedLocation}&no_referensi=${selectedNoReferensi}&accepted_status=${statusFilter}&type=recipient`;
      const req = await fetch(endpoint, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const response = await req.json();
      console.log("response fetch barang keluar", response);

      if (response?.data) {
        setData(response.data);
      }
    }

    if (selectedLocation && selectedNoReferensi) {
      fetchBarangKeluar();
    }
  }, [selectedNoReferensi, statusFilter, refetch]);
  const customStyles = {
    headCells: {
      style: {
        color: "white",
        background: "#036B82",
      },
    },
  };

  const activeBtn =
    "bg-cyan-700 text-xs font-bold text-white w-full rounded h-10 hover:bg-cyan-800  shadow-sm flex items-center justify-center float-right";

  const inactiveBtn =
    "bg-gray-400 cursor-not-allowed text-xs font-bold text-gray-200 w-full rounded h-10 shadow-sm flex items-center justify-center float-right";

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
        setCancelModal({
          visible: false,
          id: null,
          reason: "",
          loading: false,
        });
        notification.success({
          message: "Berhasil membatalkan data",
          description: "Data berhasil dibatalkan.",
        });
        setRefetch(!refetch);
      } else {
        setCancelModal({
          ...cancelModal,
          loading: false,
        });
        notification.error({
          message: response?.error?.message || "Gagal membatalkan data",
          description: "Silahkan coba lagi",
        });
      }
    } catch (error) {
      setCancelModal({
        ...cancelModal,
        loading: false,
      });
      console.log("error delete", error);
      notification.error({
        message: response?.error || "Gagal membatalkan data",
        description: "Harap hubungi admin",
      });
    }
  };

  const handleAddToStock = async (row, index) => {
    if (row?.send_qty <= 0) {
      notification.error({
        message: "Gagal menerima ke stok",
        description: "Jumlah barang yang diterima tidak boleh 0",
      });
      return;
    }

    try {
      const data = {
        id: row.id,
        location_sender: row.location_sender.id,
        location_recipient: row.location_recipient.id,
        product: row.product.id,
        req_qty: row.qty,
        qty: row.send_qty,
        unit: row?.send_unit || row?.sended_unit || row?.unit,
        type: "Transfer Masuk",
        accepted: row?.accepted || 0,
        no_referensi: row.no_referensi,
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
        notification.success({
          message: "Berhasil menerima ke stok",
          description:
            "Stok berhasil diterima, silahkan ganti status untuk melihat data yang sudah diterima",
        });
        setRefetch(!refetch);
      } else {
        notification.error({
          message: response?.error?.message || "Gagal menerima ke stok",
          desciption: "Stok gagal diterima, silahkan coba lagi",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    {
      name: "Nama Produk",
      selector: (row) => row.product.name,
    },
    {
      name: "Qty Ditransfer",
      align: "center",
      width: "180px",
      selector: (row) => (
        <Input.Group compact className="w-full">
          <InputNumber value={row.sended} readOnly className="w-[30%]" />
          <Input value={row?.sended_unit || row.unit} className="w-[60%] border-r" />
        </Input.Group>
      ),
    },
    {
      name: "Transfer Dari",
      center: true,
      selector: (row) => (
        <Tooltip title={row.location_sender.name} className="w-min">
          {row.location_sender.name}
        </Tooltip>
      ),
    },
    {
      name: "Status",
      center: true,
      selector: (row) => {
        let color = "";

        switch (statusFilter !== "Dibatalkan" ? row.accepted_status : row.status) {
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
            {statusFilter === "Dibatalkan" ? row?.status : row?.accepted_status || "Proses"}
          </Tag>
        );
      },
    },
    {
      name: "Sisa",
      center: true,
      selector: (row) => (row?.qty || 0) - (row?.accepted || 0),
    },
    {
      name: "Kadaluwarsa",
      omit: statusFilter === "Dibatalkan",
      center: true,
      selector: (row) => (row?.exp_date ? moment(row.exp_date).format("DD/MM/YYYY") : "-"),
    },
    {
      name: "Qty Diterima",
      omit: statusFilter === "Dibatalkan",
      width: "260px",
      selector: (row, index) => {
        let maxQty = row?.qty;
        const units = row.product_units;

        if (row.accepted_status === "Selesai") {
          maxQty = 9999;
        }

        return (
          <Input.Group compact className="w-full">
            <InputNumber
              readOnly={row.accepted_status === "Selesai"}
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
              defaultValue={row.accepted_status === "Selesai" ? row.sended : 0}
              min={0}
              max={maxQty > 0 ? maxQty : 0}
              className="w-[30%]"
            />
            {row.accepted_status !== "Selesai" ? (
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
              <Input value={row?.accepted_unit || row.unit} readOnly className="w-[50%] border-r" />
            )}
          </Input.Group>
        );
      },
    },
    {
      name: "Tindakan",
      omit: statusFilter === "Dibatalkan" || statusFilter === "Selesai",
      center: true,
      selector: (row, index) =>
        row.accepted_status !== "Selesai" ? (
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
                  author: row.location_recipient.name,
                })
              }
              placement="topLeft"
            >
              <CloseCircleFilled title="Batalkan" className="text-3xl text-red-700" />
            </Popconfirm>
            <Popconfirm
              placement="topLeft"
              title="Apakah anda sudah menerima barang ini?"
              okButtonProps={{
                type: "default",
              }}
              okText="Ya"
              cancelText="Tidak"
              onConfirm={() => handleAddToStock(row, index)}
            >
              <CheckCircleFilled title="Kirim Barang" className="text-3xl text-green-700" />
            </Popconfirm>
          </div>
        ) : (
          <PrinterOutlined
            className="mr-1 text-lg cursor-pointer hover:text-blue-700 duration-150"
            title="Cetak"
          />
        ),
    },
    {
      name: "Alasan",
      omit: statusFilter !== "Dibatalkan",
      selector: (row) => row?.cancel_reason || "-",
    },
    {
      name: "Dibatalkan Oleh",
      omit: statusFilter !== "Dibatalkan",
      selector: (row) => row?.cancel_author || "-",
    },
  ];

  return (
    <>
      <Head>
        <title>Daftar Masuk Barang</title>
      </Head>
      <DashboardLayout>
        <LayoutWrapper>
          <TitlePage
            titleText={
              <div className="flex gap-x-4 items-center">
                <span>DAFTAR MASUK BARANG</span>
                <Select
                  value={selectedLocation}
                  onSelect={(value) => {
                    router.replace(
                      {
                        pathname: "/dashboard/stok/daftar-masuk-barang",
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
                    onOk={() => handleCancelData(cancelModal.id)}
                    onCancel={() => {}}
                  >
                    <p>
                      Apakah anda yakin akan membatalkan permintaan ini? Harap isi alasan pembatalan
                      dibawah ini:
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
                          pathname: "/dashboard/stok/daftar-masuk-barang",
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
              </>
            ) : (
              <Empty
                description="Pilih Gudang Terlebih Dahulu"
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              />
            )}
          </LayoutContent>
        </LayoutWrapper>
      </DashboardLayout>
    </>
  );
}

daftarKeluarBarang.getInitialProps = async (context) => {
  const cookies = nookies.get(context);

  const req = await fetchData(cookies);
  const data = await req.json();

  let options = [];

  if (req.status !== 200) {
    context.res.writeHead(302, {
      Location: "/signin?session=false",
      "Content-Type": "text/html; charset=utf-8",
    });
    context?.res?.end();

    return {};
  }

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

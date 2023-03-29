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
  const router = useRouter();

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
      const endpoint = `${process.env.NEXT_PUBLIC_URL}/product-request/location?location=${selectedLocation}&no_referensi=${selectedNoReferensi}&status=${statusFilter}&type=sender`;
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

  const handleDeleteData = async (id, idx) => {
    try {
      const endpoint = `${process.env.NEXT_PUBLIC_URL}/product-requests/${id}`;
      const req = await fetch(endpoint, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const response = await req.json();

      console.log("response delete", response);

      if (response?.data) {
        notification.success({
          message: "Berhasil menghapus data",
          description: "Data berhasil dihapus",
        });
        setRefetch(!refetch);
      } else {
        notification.error({
          message: response?.error || "Gagal menghapus data",
          description: "Silahkan coba lagi",
        });
      }
    } catch (error) {
      console.log("error delete", error);
      notification.error({
        message: response?.error || "Gagal menghapus data",
        description: "Harap hubungi admin",
      });
    }
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
      const data = {
        id: row.id,
        location_sender: row.location_sender.id,
        location_recipient: row.location_recipient.id,
        product: row.product.id,
        req_qty: row.qty,
        qty: row.send_qty,
        unit: row.send_unit,
        type: "Transfer Keluar",
        sended: row?.sended || 0,
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

      console.log("response add to stock", response);

      if (response?.data) {
        notification.success({
          message: "Berhasil mengirim ke stok",
          description:
            "Stok berhasil dikirim ke gudang tujuan, silahkan ganti status untuk melihat data yang sudah dikirim",
        });
        setRefetch(!refetch);
      } else {
        notification.error({
          message: response?.error || "Gagal mengirim ke stok",
          desciption: "Stok gagal dikirim ke gudang tujuan, silahkan coba lagi",
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
      name: "Permintaan Transfer",
      align: "center",
      width: "180px",
      selector: (row) => (
        <Input.Group compact className="w-full">
          <InputNumber value={row.qty} readOnly className="w-[30%]" />
          <Input value={row.unit} className="w-[60%] border-r" />
        </Input.Group>
      ),
    },
    {
      name: "Transfer Ke",
      center: true,
      selector: (row) => (
        <Tooltip title={row.location_recipient.name} className="w-min">
          {row.location_recipient.name}
        </Tooltip>
      ),
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
            color = "red";
            break;
          case "Selesai":
            color = "green";
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
      center: true,
      selector: (row) => (row?.exp_date ? moment(row.exp_date).format("DD/MM/YYYY") : "-"),
    },
    {
      name: "Qty Ditransfer",
      width: "260px",
      selector: (row, index) => {
        const stockIndex = row?.stock?.findIndex((item) => item.id === row?.product.id);

        let maxQty = row?.stock?.[stockIndex]?.stock?.[row?.send_unit]?.qty || 1;
        const units =
          row?.stock?.[stockIndex]?.available_units.map((unit) => ({
            label: unit,
            value: unit,
          })) || [];

        const sameData = data.filter(
          (item, productIdx) =>
            item.product.id === row.product.id &&
            item.send_unit === row.send_unit &&
            productIdx !== index
        );

        if (sameData.length > 0) {
          sameData.forEach((data) => {
            maxQty -= data.qty;
          });
        }

        if (row.status === "Selesai") {
          maxQty = null;
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
              defaultValue={row.status === "Selesai" ? row.sended : 1}
              min={maxQty > 0 ? 1 : 0}
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
      center: true,
      selector: (row, index) =>
        row.status !== "Selesai" ? (
          <div className="flex gap-x-4">
            <Popconfirm
              title="Apakah anda yakin ingin menghapus permintaan ini?"
              okButtonProps={{
                danger: true,
              }}
              okText="Ya"
              cancelText="Tidak"
              onConfirm={() => handleDeleteData(row.id, index)}
              placement="topLeft"
            >
              <CloseCircleFilled title="Hapus" className="text-3xl text-red-700" />
            </Popconfirm>
            <Popconfirm
              placement="topLeft"
              title="Apakah anda yakin ingin mengirim barang ini?"
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
  ];

  return (
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
                    ]}
                    placeholder="Status"
                    className="w-full"
                  />
                </div>

                <p className="uppercase text-[#036B82] font-bold text-xl mb-1">Produk Transfer</p>
                <div className="w-full lg:w-4/5 grid grid-cols-1 items-end md:grid-cols-4 gap-3 mb-3">
                  <Input.Search size="large" placeholder="Nama Produk" className="w-full" />
                  <button
                    onClick={printPdf}
                    type="button"
                    className="bg-cyan-700 text-xs font-bold text-white w-full rounded h-10 hover:bg-cyan-800  shadow-sm flex items-center justify-center float-right"
                  >
                    PRINT PDF
                  </button>
                  <button
                    onClick={printPdf}
                    type="button"
                    className="bg-cyan-700 text-xs font-bold text-white w-full rounded h-10 hover:bg-cyan-800  shadow-sm flex items-center justify-center float-right"
                  >
                    PRINT CSV
                  </button>
                  <button
                    onClick={printPdf}
                    type="button"
                    className="bg-cyan-700 text-xs font-bold text-white w-full rounded h-10 hover:bg-cyan-800  shadow-sm flex items-center justify-center float-right"
                  >
                    PRINT XLS
                  </button>
                </div>

                <DataTable
                  columns={columns}
                  data={data}
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

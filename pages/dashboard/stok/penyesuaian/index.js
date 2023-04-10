import React, { useEffect, useState } from "react";
import Head from "next/head";
import DashboardLayout from "@iso/containers/DashboardLayout/DashboardLayout";
import LayoutContent from "@iso/components/utility/layoutContent";
import LayoutWrapper from "@iso/components/utility/layoutWrapper.js";
import TitlePage from "@iso/components/TitlePage/TitlePage";
import useDebounce from "../../../../hooks/useDebounce";
import { DatePicker, Descriptions, Modal, Popover, Select, Spin, Tag } from "antd";
import nookies from "nookies";
import DataTable from "react-data-table-component";
import { useRouter } from "next/router";
import { EditOutlined, BarsOutlined } from "@ant-design/icons";
import AlertDialog from "../../../../components/Alert/AlertCancel";
import moment from "moment";
import { toast } from "react-toastify";

export default function penyesuaian() {
  const { token } = nookies.get();
  const [location, setLocation] = useState("");
  const [noReferensi, setNoReferensi] = useState("");
  const [refetch, setRefetch] = useState(false);

  const debouncedLocation = useDebounce(location, 200);
  const debouncedNoReferensi = useDebounce(noReferensi, 200);
  const [loading, setLoading] = useState({
    location: false,
    no_referensi: false,
    data: false,
  });
  const [options, setOptions] = useState({
    location: [],
    products: [],
    no_referensi: [],
  });
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedNoReferensi, setSelectedNoReferensi] = useState(null);
  const [date, setDate] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [selectedData, setSelectedData] = useState(null);
  const [data, setData] = useState([]);
  const [modal, setModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function fetchLocations() {
      const endpoint = `${process.env.NEXT_PUBLIC_URL}/locations?filters[name][$containsi]=${debouncedLocation}`;
      const headers = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await fetch(endpoint, headers)
        .then((res) => {
          return res.json();
        })
        .catch((err) => {
          setLoading({ ...loading, location: false });
          console.log(err);
        });

      if (response.data) {
        setLoading({ ...loading, location: false });
        setOptions({
          ...options,
          location: response.data.map(({ id, attributes }) => ({
            label: attributes.name,
            value: id,
          })),
        });
      }
    }

    fetchLocations();
  }, [debouncedLocation]);

  // search query
  useEffect(() => {
    async function getPenyesuaianStok(id) {
      const endpoint = process.env.NEXT_PUBLIC_URL + `/inventory-adjustments/${id}?populate=deep`;
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
      const req = await fetch(endpoint, options);
      const res = await req.json();

      setSelectedData(res?.data);
    }

    if (router?.query?.id) {
      const id = router.query.id;
      getPenyesuaianStok(id);
    }
  }, [router.query]);

  useEffect(() => {
    if (selectedData) {
      setModal(true);
    }
  }, [selectedData]);

  useEffect(() => {
    async function fetchNoReferensi() {
      const endpoint = `${process.env.NEXT_PUBLIC_URL}/inventory-adjustment/no-referensi?query=${debouncedNoReferensi}`;
      const headers = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await fetch(endpoint, headers)
        .then((res) => {
          return res.json();
        })
        .catch((err) => {
          setLoading({ ...loading, no_referensi: false });
          console.log(err);
        });

      if (response.data) {
        setLoading({ ...loading, no_referensi: false });
        setOptions({
          ...options,
          no_referensi: response?.data,
        });
      }
    }

    fetchNoReferensi();
  }, [debouncedNoReferensi]);

  useEffect(() => {
    async function fetchPenyesuaianStok() {
      let filter = "";

      if (selectedLocation) {
        filter += `filters[location][id][$eq]=${selectedLocation}&`;
      }

      if (selectedNoReferensi) {
        filter += `filters[no_referensi][$eq]=${selectedNoReferensi}&`;
      }

      if (date) {
        filter += `filters[date][$eq]=${date}&`;
      }

      if (selectedStatus) {
        filter += `filters[status][$eq]=${selectedStatus}&`;
      }

      const endpoint = `${process.env.NEXT_PUBLIC_URL}/inventory-adjustments?populate=deep&${filter}sort[0]=date:desc`;
      const headers = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await fetch(endpoint, headers)
        .then((res) => {
          return res.json();
        })
        .catch((err) => {
          console.log(err);
        });

      console.log("response fetchData", response);

      if (response.data) {
        setData(response.data);
        setLoading({ ...loading, data: false });
      } else {
        setData([]);
        setLoading({ ...loading, data: false });
      }
    }

    setLoading({ ...loading, data: true });
    fetchPenyesuaianStok();
  }, [selectedLocation, selectedNoReferensi, date, selectedStatus, refetch]);

  const customStyles = {
    headerStyle: { textAlign: "center" },
    headCells: {
      style: {
        color: "white",
        background: "#036B82",
      },
    },
  };

  const handleAdd = () => {
    router.push("/dashboard/stok/penyesuaian/tambah");
  };

  const openModal = (id) => {
    router.replace(
      {
        pathname: "/dashboard/stok/penyesuaian",
        query: { id: id },
      },
      undefined,
      { shallow: true }
    );
  };

  const handleDelete = async (data) => {
    try {
      // delete details
      const details = data?.attributes?.details?.data;

      if (details?.length > 0) {
        for (let i = 0; i < details.length; i++) {
          const { id } = details[i];
          const endpointDetails = `${process.env.NEXT_PUBLIC_URL}/inventory-adjustment-details/${id}`;
          const headersDetails = {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          };

          const responseDetails = await fetch(endpointDetails, headersDetails);
        }
      }

      const endpoint = `${process.env.NEXT_PUBLIC_URL}/inventory-adjustments/${data.id}`;
      const headers = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await fetch(endpoint, headers)
        .then((res) => {
          return res.json();
        })
        .catch((err) => {
          console.log(err);
        });

      if (response) {
        toast.success("Berhasil menghapus data penyesuaian stok");
        setRefetch(!refetch);
      }
    } catch (error) {
      toast.error("Gagal menghapus data penyesuaian stok");
    }
  };

  const content = (row) => (
    <div>
      <div>
        <button
          onClick={() => openModal(row.id)}
          className=" hover:text-cyan-700 transition-colors  text-xs font-normal py-2 px-2 rounded-md "
        >
          <BarsOutlined className="mr-2 mt-0.5 float float-left" />
          Lihat
        </button>
      </div>
      <AlertDialog
        onCancel={() => {}}
        onConfirm={() => handleDelete(row)}
        title="Hapus Data?"
        message="Data yang dihapus tidak dapat dikembalikan lagi. Lanjutkan?"
        id={row.id}
        btnTitle="Hapus"
      />
    </div>
  );

  var formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 2,
  });

  const columns = [
    {
      name: "",
      width: "w-1/5",
      selector: (row) => (
        <>
          <Popover content={content(row)} placement="bottom">
            <button className=" text-cyan-700  transition-colors  text-xs font-normal py-2 rounded-md ">
              Tindakan
            </button>
          </Popover>
        </>
      ),
    },
    {
      name: "Tanggal",
      wrap: true,
      selector: ({ attributes }) => moment(attributes.date).format("DD/MM/YYYY"),
    },
    {
      name: "No. Referensi",
      width: "200px",
      selector: ({ attributes }) => attributes.no_referensi,
    },
    {
      name: "Lokasi",
      wrap: true,
      selector: ({ attributes }) => attributes?.location?.data?.attributes?.name || "-",
    },
    {
      name: "Jenis Penyesuaian",
      selector: ({ attributes }) => (
        <Tag color={attributes?.status === "Normal" ? "blue" : "red"}>{attributes?.status}</Tag>
      ),
    },
    {
      name: "Total Dikembalikan",
      wrap: true,
      selector: ({ attributes }) => formatter.format(attributes?.total_return || 0),
    },
    {
      name: "Alasan",
      wrap: true,
      selector: ({ attributes }) => attributes?.reason || "-",
    },
    {
      name: "Pembuat",
      wrap: true,
      selector: ({ attributes }) => attributes?.author || "-",
    },
  ];

  const detailColumns = [
    {
      name: "Nama Produk",
      selector: ({ attributes }) => attributes?.product?.data?.attributes?.name || "-",
      wrap: true,
    },
    {
      name: "Jumlah",
      selector: ({ attributes }) => attributes?.qty || "-",
    },
    {
      name: "Unit",
      selector: ({ attributes }) => attributes?.unit || "-",
    },
  ];

  return (
    <>
      <Head>
        <title>Daftar Penyesuaian Stok</title>
      </Head>
      <DashboardLayout>
        <LayoutWrapper>
          <TitlePage titleText={"Daftar Penyesuaian Stok"} />
          <LayoutContent>
            <Modal
              open={modal}
              onClose={() => {
                router.replace(
                  {
                    pathname: "/dashboard/stok/penyesuaian",
                  },
                  undefined,
                  { shallow: true }
                );
                setModal(false);
                setSelectedData();
              }}
              onCancel={() => {
                router.replace(
                  {
                    pathname: "/dashboard/stok/penyesuaian",
                  },
                  undefined,
                  { shallow: true }
                );
                setModal(false);
                setSelectedData();
              }}
              width={1000}
              okButtonProps={{ style: { display: "none" } }}
              cancelText="Close"
            >
              {selectedData && (
                <>
                  <Descriptions size="middle" title="INFORMASI PENYESUAIAN STOK" bordered>
                    <Descriptions.Item label="Tanggal Penyesuaian Stok" span={4}>
                      {selectedData?.attributes?.date}
                    </Descriptions.Item>
                    <Descriptions.Item label="No Referensi" span={2}>
                      {selectedData?.attributes?.no_referensi}
                    </Descriptions.Item>
                    <Descriptions.Item label="Lokasi Gudang Penyesuaian">
                      {selectedData?.attributes?.location?.data?.attributes?.name}
                    </Descriptions.Item>
                    <Descriptions.Item label="Status" span={2}>
                      <Tag color={selectedData?.attributes?.status === "Normal" ? "blue" : "red"}>
                        {selectedData?.attributes?.status}
                      </Tag>
                    </Descriptions.Item>
                    <Descriptions.Item label="Total Dikembalikan" span={2}>
                      {formatter.format(selectedData?.attributes?.total_return)}
                    </Descriptions.Item>
                    <Descriptions.Item label="Alasan" span={4}>
                      {selectedData?.attributes?.reason}
                    </Descriptions.Item>
                    <Descriptions.Item label="Pembuat" span={2}>
                      {selectedData?.attributes?.author}
                    </Descriptions.Item>
                  </Descriptions>

                  <div className="mt-2">
                    <p className="mb-2 font-bold uppercase">Detail</p>
                    <DataTable
                      customStyles={customStyles}
                      columns={detailColumns}
                      data={selectedData?.attributes?.details?.data}
                    />
                  </div>
                </>
              )}
            </Modal>

            <div className="w-full flex justify-between gap-x-32 mb-3">
              <div className="w-full md:w-1/2 grid grid-cols-2 gap-x-4 gap-y-3">
                <DatePicker
                  onChange={(_, value) => {
                    setDate(value);
                  }}
                  size="large"
                  className="w-full"
                  placeholder="Tanggal Dokumen"
                />
                <Select
                  onSearch={(value) => {
                    setLoading({ ...loading, no_referensi: true });
                    setNoReferensi(value);
                  }}
                  onSelect={(value) => {
                    setSelectedNoReferensi(value);
                  }}
                  value={selectedNoReferensi}
                  size="large"
                  showSearch
                  onClear={() => {
                    setSelectedNoReferensi(null);
                  }}
                  allowClear
                  filterOption={false}
                  placeholder="No Referensi"
                  loading={loading.no_referensi}
                  options={options.no_referensi}
                />
                <Select
                  allowClear
                  size="large"
                  placeholder="Status"
                  onChange={(value) => {
                    setSelectedStatus(value);
                  }}
                  options={[
                    { label: "Normal", value: "Normal" },
                    { label: "Abnormal", value: "Abnormal" },
                  ]}
                />
                <Select
                  onSearch={(value) => {
                    setLoading({ ...loading, location: true });
                    setLocation(value);
                  }}
                  onSelect={(value) => {
                    setSelectedLocation(value);
                  }}
                  allowClear
                  onClear={() => {
                    setSelectedLocation(null);
                  }}
                  value={selectedLocation}
                  placeholder="Lokasi Gudang"
                  showSearch
                  filterOption={false}
                  size="large"
                  loading={loading.location}
                  options={options.location}
                />
              </div>
              <div
                onClick={handleAdd}
                className="bg-cyan-700 w-full md:w-1/2 cursor-pointer rounded px-5 h-10 hover:bg-cyan-800 shadow-sm flex items-center justify-center float-right"
              >
                <div className="text-white text-center text-sm font-bold">
                  <a className="text-white no-underline text-xs sm:text-xs">+ Tambah</a>
                </div>
              </div>
            </div>

            <DataTable
              progressPending={loading.data}
              progressComponent={<Spin />}
              columns={columns}
              customStyles={customStyles}
              data={data}
              pagination
              paginationPerPage={10}
              paginationRowsPerPageOptions={[10, 20, 30, 40, 50]}
              paginationComponentOptions={{
                rowsPerPageText: "Baris per halaman:",
                rangeSeparatorText: "dari",
                noRowsPerPage: false,
                selectAllRowsItem: true,
                selectAllRowsItemText: "Semua",
              }}
              pointerOnHover
              highlightOnHover
              onRowClicked={(row) => openModal(row.id)}
            />
          </LayoutContent>
        </LayoutWrapper>
      </DashboardLayout>
    </>
  );
}

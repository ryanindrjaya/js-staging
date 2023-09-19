import Head from "next/head";
import React, { useEffect, useState } from "react";
import LayoutContent from "@iso/components/utility/layoutContent";
import DashboardLayout from "../../../containers/DashboardLayout/DashboardLayout";
import LayoutWrapper from "@iso/components/utility/layoutWrapper.js";
import CustomerTable from "@iso/components/ReactDataTable/CustomerTable";
import { useRouter } from "next/router";
import TitlePage from "../../../components/TitlePage/TitlePage";
import { toast } from "react-toastify";
import nookies from "nookies";
import ExportProduk from "../../../components/Form/ExportProduk";
import { Badge, Button, Descriptions, Input, Modal, Select, Tag } from "antd";
import UploadCustomer from "../../../components/Form/UploadCustomer";
import ExportCustomer from "../../../components/Form/ExportCustomer";
import useDebounce from "../../../hooks/useDebounce";

Customer.getInitialProps = async (context) => {
  const cookies = nookies.get(context);
  let data;

  const req = await fetchData(cookies, "/customers?populate=*");
  data = await req.json();

  const area = await fetchData(cookies, "/areas").then((res) => res.json());
  const wilayah = await fetchData(cookies, "/wilayahs").then((res) => res.json());

  return {
    props: {
      data,
      area: area?.data || [],
      wilayah: wilayah?.data || [],
    },
  };
};

const fetchData = async (cookies, url) => {
  const endpoint = process.env.NEXT_PUBLIC_URL + url;
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

function Customer({ props }) {
  const data = props.data;
  const { area, wilayah } = props;
  const [user, setUser] = useState(data);
  const [isSearching, setIsSearching] = useState(false);
  const [searchParameters, setSearchParameters] = useState({});
  const [selectedCustomer, setSelectedCustomer] = useState();
  const [openModal, setOpenModal] = useState(false);
  const debounced = useDebounce(searchParameters, 1000);
  const router = useRouter();
  const cookies = nookies.get(null, "token");

  const handleAdd = (e) => {
    router.push("/dashboard/customer/tambah");
  };

  const handleUpdate = async (id) => {
    router.push("/dashboard/customer/edit/" + id);
  };

  const handleDelete = async (id) => {
    const endpoint = process.env.NEXT_PUBLIC_URL + "/customers/" + id;
    const cookies = nookies.get(null, "token");

    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookies.token,
      },
    };

    const req = await fetch(endpoint, options);
    const res = await req.json();
    if (res) {
      const req = await fetchData(cookies, "/customers?populate=*");
      const data = await req.json();
      toast.success("Data Customer berhasil dihapus");
      setUser(data);
    }
  };

  // search query
  useEffect(() => {
    const searchQuery = async () => {
      setIsSearching(true);
      let query = "";
      let index = 0;

      for (const key in searchParameters) {
        if (searchParameters[key]?.length > 0) {
          if (key === "tipe_penjualan") {
            const parameter = searchParameters[key].map((item) => item).join(", ");
            query += `filters[$and][${index}][tipe_penjualan_query][$eq]=${parameter}&`;
            index++;
            continue;
          }

          if (key === "area" || key === "wilayah") {
            query += `filters[$and][${index}][${key}][name][$containsi]=${searchParameters[key]}&`;
            index++;
            continue;
          }

          query += `filters[$and][${index}][${key}][$containsi]=${searchParameters[key]}&`;
          index++;
        }
      }

      const endpoint = process.env.NEXT_PUBLIC_URL + "/customers?populate=*&" + query;

      console.log("endpoint", endpoint);

      const cookies = nookies.get(null, "token");
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + cookies.token,
        },
      };

      const req = await fetch(endpoint, options);
      const res = await req.json();

      setUser(res);
      setIsSearching(false);
    };

    searchQuery();
  }, [debounced]);

  useEffect(() => {
    async function getCustomerById(id) {
      const data = await fetchData(cookies, `/customers/${id}?populate=*`).then((res) => res.json());
      console.log("date", data.data.attributes);
      setSelectedCustomer(data.data);
    }

    if (router?.query?.id) {
      const id = router.query.id;
      getCustomerById(id);
    }
  }, [router.query]);

  useEffect(() => {
    if (selectedCustomer) {
      setOpenModal(true);
    }
  }, [selectedCustomer]);

  const getTagColor = (type) => {
    switch (type) {
      case "PANEL":
        return "green";
      case "NON PANEL":
        return "blue";
      case "SALES":
        return "cyan";
      case "TOKO":
        return "purple";
      case "KARAYAWAN":
        return "geekblue";
      default:
        return "geekblue";
    }
  };

  const formatNPWP = (npwp) => {
    if (npwp) {
      return npwp.replace(/(\d{2})(\d{3})(\d{3})(\d{1})(\d{3})/, "$1.$2.$3.$4-$5");
    }
    return "";
  };

  return (
    <>
      <Head>
        <title>Daftar Customer</title>
      </Head>
      <DashboardLayout>
        <LayoutWrapper style={{}}>
          <TitlePage titleText={"Customer"} />
          <LayoutContent>
            <Modal
              open={openModal}
              onClose={() => {
                router.replace(
                  {
                    pathname: "/dashboard/customer",
                  },
                  undefined,
                  { shallow: true }
                );
                setOpenModal(false);
                setSelectedCustomer();
              }}
              onCancel={() => {
                router.replace(
                  {
                    pathname: "/dashboard/customer",
                  },
                  undefined,
                  { shallow: true }
                );
                setOpenModal(false);
                setSelectedCustomer();
              }}
              width={1000}
              okButtonProps={{ style: { display: "none" } }}
              cancelText="Close"
            >
              {selectedCustomer && (
                <>
                  <Descriptions
                    extra={
                      <Button
                        className="bg-cyan-700 hover:bg-cyan-800 mr-7 border-none"
                        onClick={() => handleUpdate(selectedCustomer.id)}
                        type="primary"
                      >
                        Edit
                      </Button>
                    }
                    size="middle"
                    title="INFO CUSTOMER"
                    bordered
                  >
                    <Descriptions.Item label="Nama">{selectedCustomer?.attributes?.name}</Descriptions.Item>
                    <Descriptions.Item label="Kode Customer">{selectedCustomer?.attributes?.code}</Descriptions.Item>
                    <Descriptions.Item label="No Telepon">{selectedCustomer?.attributes?.phone}</Descriptions.Item>
                    <Descriptions.Item label="Kota">{selectedCustomer?.attributes?.city}</Descriptions.Item>
                    <Descriptions.Item label="Alamat" span={2}>
                      {selectedCustomer?.attributes?.address}
                    </Descriptions.Item>
                    <Descriptions.Item label="Golongan Customer">
                      <Badge status="processing" text={selectedCustomer?.attributes?.customer_type} />
                    </Descriptions.Item>
                    <Descriptions.Item label="Tipe Penjualan" span={2}>
                      {selectedCustomer?.attributes?.tipe_penjualan?.map((item) => (
                        <Tag color={getTagColor(item)}>{item}</Tag>
                      ))}
                    </Descriptions.Item>
                    <Descriptions.Item label="Deskripsi">{selectedCustomer?.attributes?.description}</Descriptions.Item>
                  </Descriptions>
                  {/* AREA SALES INFO */}
                  <Descriptions className="mt-3" size="middle" title="AREA SALES & KREDIT LIMIT" bordered>
                    <Descriptions.Item label="Nama Sales" span={3}>
                      {selectedCustomer?.attributes?.sales_name}
                    </Descriptions.Item>
                    <Descriptions.Item label="Area">
                      {selectedCustomer?.attributes?.area?.data?.attributes?.name}
                    </Descriptions.Item>
                    <Descriptions.Item label="Wilayah" span={2}>
                      {selectedCustomer?.attributes?.wilayah?.data?.attributes?.name}
                    </Descriptions.Item>
                    <Descriptions.Item label="Batas Kredit">
                      {`${selectedCustomer?.attributes?.credit_limit || 0}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </Descriptions.Item>
                    <Descriptions.Item label="Termin Pembayaran" span={2}>
                      {selectedCustomer?.attributes?.credit_limit_duration}{" "}
                      {selectedCustomer?.attributes?.credit_limit_duration_type}
                    </Descriptions.Item>
                    <Descriptions.Item label="Saldo Awal" span={3}>
                      {`${selectedCustomer?.attributes?.saldo_awal || 0}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </Descriptions.Item>
                  </Descriptions>
                  {/* INFO NPWP */}
                  <Descriptions className="mt-3" size="middle" title="Data NPWP & NIK" bordered>
                    <Descriptions.Item label="Nama NPWP" span={2}>
                      {selectedCustomer?.attributes?.nama_npwp}
                    </Descriptions.Item>
                    <Descriptions.Item label="Nomor NPWP">
                      {formatNPWP(selectedCustomer?.attributes?.nomor_npwp)}
                    </Descriptions.Item>
                    <Descriptions.Item label="Alamat NPWP" span={3}>
                      {selectedCustomer?.attributes?.alamat_npwp}
                    </Descriptions.Item>
                    <Descriptions.Item label="Nomor NIK">{selectedCustomer?.attributes?.nik}</Descriptions.Item>
                  </Descriptions>
                </>
              )}
            </Modal>
            <div className="w-full flex justify-between gap-x-32 mb-3">
              <div className="w-full md:w-1/2 grid grid-cols-2 gap-x-4 gap-y-3">
                <Input.Search
                  className=""
                  loading={isSearching}
                  onChange={(e) =>
                    setSearchParameters({
                      ...searchParameters,
                      name: e.target.value,
                    })
                  }
                  placeholder="Customer"
                  size="middle"
                />
                <Select
                  mode="multiple"
                  size="middle"
                  placeholder="Tipe Penjualan"
                  allowClear
                  showSearch
                  onChange={(e) => setSearchParameters({ ...searchParameters, tipe_penjualan: e })}
                  onClear={() => setSearchParameters({ ...searchParameters, tipe_penjualan: [] })}
                >
                  <Select.Option value="PANEL">PANEL</Select.Option>
                  <Select.Option value="NON PANEL">NON PANEL</Select.Option>
                  <Select.Option value="SALES">SALES</Select.Option>
                  <Select.Option value="TOKO">TOKO</Select.Option>
                </Select>
                <Select
                  mode="multiple"
                  size="middle"
                  placeholder="Area"
                  allowClear
                  showSearch
                  onChange={(e) => setSearchParameters({ ...searchParameters, area: e })}
                  onClear={() => setSearchParameters({ ...searchParameters, area: [] })}
                >
                  {area.length > 0 &&
                    area.map((item) => (
                      <Select.Option key={item.id} value={item.attributes.name}>
                        {item.attributes.name}
                      </Select.Option>
                    ))}
                </Select>
                <Select
                  mode="multiple"
                  size="middle"
                  placeholder="Wilayah"
                  allowClear
                  showSearch
                  onChange={(e) => setSearchParameters({ ...searchParameters, wilayah: e })}
                  onClear={() => setSearchParameters({ ...searchParameters, wilayah: [] })}
                >
                  {wilayah.length > 0 &&
                    wilayah.map((item) => (
                      <Select.Option key={item.id} value={item.attributes.name}>
                        {item.attributes.name}
                      </Select.Option>
                    ))}
                </Select>
              </div>
              <div className="w-full flex flex-col gap-y-3 gap-x-4 md:w-1/2">
                <div
                  onClick={handleAdd}
                  className="bg-cyan-700 hover:bg-cyan-800 w-full cursor-pointer rounded px-5 h-10  shadow-sm flex items-center justify-center float-right"
                >
                  <div className="text-white text-center text-sm font-bold">
                    <a className="text-white no-underline text-xs sm:text-xs">+ Tambah</a>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-x-4 w-full">
                  <UploadCustomer setCustomer={setUser} />
                  <ExportCustomer data={user?.data || []} />
                  <a href={"/template/Template Excel Data Customer.xlsx"}>
                    <button
                      type="button"
                      className="bg-cyan-700 text-xs font-bold text-white w-full rounded h-10 hover:bg-cyan-800  shadow-sm flex items-center justify-center float-right"
                    >
                      Download Template
                    </button>
                  </a>
                </div>
              </div>
            </div>

            <CustomerTable data={user?.data || []} onDelete={handleDelete} onUpdate={handleUpdate} />
          </LayoutContent>
        </LayoutWrapper>
      </DashboardLayout>
    </>
  );
}

export default Customer;

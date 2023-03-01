import Head from "next/head";
import React, { useEffect, useState } from "react";
import LayoutContent from "@iso/components/utility/layoutContent";
import DashboardLayout from "../../../containers/DashboardLayout/DashboardLayout";
import LayoutWrapper from "@iso/components/utility/layoutWrapper.js";
import SupplierTable from "../../../components/ReactDataTable/SupplierTable";
import { useRouter } from "next/router";
import { Button, Descriptions, Input, Modal } from "antd";
import TitlePage from "../../../components/TitlePage/TitlePage";
import { toast } from "react-toastify";
import nookies from "nookies";

const Supplier = ({ props }) => {
  const data = props.data;
  const [supplier, setSupplier] = useState(data);
  const [isSearching, setIsSearching] = useState(false);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState();

  const { Search } = Input;
  const router = useRouter();

  const handleAdd = () => {
    router.push("/dashboard/supplier/tambah");
  };

  const handleEdit = (id) => {
    router.push("/dashboard/supplier/edit/" + id);
  };

  const handleView = (data) => {
    console.log(data);
    setSelected(data);
  };

  useEffect(() => {
    if (selected) {
      setOpen(true);
    }
  }, [selected]);

  const handleDelete = async (id) => {
    const endpoint = process.env.NEXT_PUBLIC_URL + "/suppliers/" + id;
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
      const req = await fetchData(cookies);
      const res = await req.json();
      toast.success("Supplier berhasil dihapus");
      setSupplier(res);
    }
  };

  const handlePageChange = async (page) => {
    const cookies = nookies.get(null, "token");
    const endpoint = process.env.NEXT_PUBLIC_URL + "/suppliers?pagination[page]=" + page;

    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookies.token,
      },
    };

    try {
      const req = await fetch(endpoint, options);
      const res = await req.json();
      if (res) {
        setSupplier((prevData) => ({
          data: filterDuplicateData(prevData.data.concat(res.data)),
          meta: prevData.meta,
        }));
      } else {
        console.log("something is wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSearch = async (e) => {
    if (e.target.value.length >= 2) {
      setIsSearching(true);

      const req = await searchQuery(e.target.value);
      const res = await req.json();

      setSupplier(res);
      setIsSearching(false);
    } else {
      setSupplier(data);
      setIsSearching(false);
    }
  };

  const searchQuery = async (keywords) => {
    const endpoint =
      process.env.NEXT_PUBLIC_URL +
      "/suppliers?filters[$or][0][name][$containsi]=" +
      keywords +
      "&filters[$or][1][id_supplier][$containsi]=" +
      keywords +
      "&populate=*";

    const cookies = nookies.get(null, "token");
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

  return (
    <>
      <Head>
        <title>Daftar Supplier</title>
      </Head>
      <DashboardLayout>
        <LayoutWrapper style={{}}>
          <TitlePage titleText={"Supplier"} />
          <LayoutContent>
            <Modal
              open={open}
              onClose={() => {
                setOpen(false);
                setSelected();
              }}
              onCancel={() => {
                setOpen(false);
                setSelected();
              }}
              width={1000}
              okButtonProps={{ style: { display: "none" } }}
              cancelText="Close"
            >
              {selected && (
                <>
                  <Descriptions
                    extra={
                      <Button
                        className="bg-cyan-700 hover:bg-cyan-800 mr-7 border-none"
                        onClick={() => handleEdit(selected.id)}
                        type="primary"
                      >
                        Edit
                      </Button>
                    }
                    size="middle"
                    title="INFO SUPPLIER"
                    bordered
                  >
                    <Descriptions.Item label="Nama Supplier">
                      {selected?.attributes?.name}
                    </Descriptions.Item>
                    <Descriptions.Item span={2} label="Kode Supplier">
                      {selected?.attributes?.id_supplier}
                    </Descriptions.Item>
                    <Descriptions.Item label="Telepon">
                      {selected?.attributes?.phone}
                    </Descriptions.Item>
                    <Descriptions.Item label="Alamat">
                      {selected?.attributes?.address}
                    </Descriptions.Item>
                    <Descriptions.Item label="Email">
                      {selected?.attributes?.email}
                    </Descriptions.Item>
                    <Descriptions.Item label="Nomor NPWP">
                      {selected?.attributes?.nomor_npwp || ""}
                    </Descriptions.Item>
                    <Descriptions.Item span={2} label="Nama NPWP">
                      {selected?.attributes?.nama_npwp || ""}
                    </Descriptions.Item>
                    <Descriptions.Item label="Saldo Awal">
                      {`${selected?.attributes?.balance}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",") ||
                        0}
                    </Descriptions.Item>
                    <Descriptions.Item span={2} label="Termin Pembayaran">
                      {selected?.attributes?.credit_limit_duration || 0}{" "}
                      {selected?.attributes?.credit_limit_duration_type || "Hari"}
                    </Descriptions.Item>
                  </Descriptions>
                </>
              )}
            </Modal>
            <div className="w-full flex justify-between">
              <Search
                className=""
                loading={isSearching}
                onChange={(e) => onSearch(e)}
                placeholder="Cari Supplier"
                style={{
                  width: 200,
                }}
              />
              <button
                onClick={handleAdd}
                type="button"
                className="bg-cyan-700 rounded px-5 py-2 hover:bg-cyan-800  shadow-sm flex float-right mb-5"
              >
                <div className="text-white text-center text-sm font-bold">
                  <a className="text-white no-underline text-xs sm:text-xs">+ Tambah</a>
                </div>
              </button>
            </div>

            <SupplierTable
              onView={handleView}
              data={supplier}
              onUpdate={handleEdit}
              onDelete={handleDelete}
              onPageChange={handlePageChange}
            />
          </LayoutContent>
        </LayoutWrapper>
      </DashboardLayout>
    </>
  );
};

Supplier.getInitialProps = async (context) => {
  const cookies = nookies.get(context);
  let data;

  const req = await fetchData(cookies);
  data = await req.json();

  if (req.status !== 200) {
    context.res.writeHead(302, {
      Location: "/signin?session=false",
      "Content-Type": "text/html; charset=utf-8",
    });
    context?.res?.end();

    return {};
  }

  return {
    props: {
      data,
    },
  };
};

const fetchData = async (cookies) => {
  const endpoint = process.env.NEXT_PUBLIC_URL + "/suppliers?populate=*";
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

export default Supplier;

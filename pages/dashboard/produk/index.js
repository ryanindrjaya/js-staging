import Head from "next/head";
import React, { useEffect, useState } from "react";
import LayoutContent from "@iso/components/utility/layoutContent";
import LayoutWrapper from "@iso/components/utility/layoutWrapper.js";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import nookies from "nookies";
import DashboardLayout from "../../../containers/DashboardLayout/DashboardLayout";
import TitlePage from "../../../components/TitlePage/TitlePage";
import { Input, Modal } from "antd";
import ProductTable from "../../../components/ReactDataTable/ProductTable";
import ProductModal from "../../../components/Modal/ProductModal";
import UnitTableView from "../../../components/ReactDataTable/Product/UnitsTableView";

const Product = ({ props }) => {
  const data = props.data;
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState(data);
  const [modalProduct, setModalProduct] = useState();
  const [isSearching, setIsSearching] = useState(false);
  const [visible, setVisible] = useState(false);
  const router = useRouter();
  const [inventory, setInventory] = useState();
  const { Search } = Input;

  const onSearch = async (e) => {
    if (e.target.value.length >= 2) {
      setIsSearching(true);

      const req = await searchQuery(e.target.value);
      const res = await req.json();

      setProduct(res);
      setIsSearching(false);
    } else {
      setProduct(data);
      setIsSearching(false);
    }
  };

  const searchQuery = async (keywords) => {
    const endpoint =
      process.env.NEXT_PUBLIC_URL +
      "/products?filters[$or][0][name][$contains]=" +
      keywords +
      "&filters[$or][1][SKU][$contains]=" +
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

  const handleAdd = () => {
    console.log("");
    router.push("/dashboard/produk/tambah");
  };

  const handleView = () => {
    router.push("/dashboard/produk/lihat");
  };

  const handleUpdate = (id) => {
    console.log("");
    router.push("/dashboard/produk/edit/" + id);
  };

  const handleDelete = async (id) => {
    const endpoint = process.env.NEXT_PUBLIC_URL + "/products/" + id;
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
      toast.success("Produk berhasil dihapus");
      setProduct(res);
    }
  };

  const handlePageChange = async (page) => {
    const cookies = nookies.get(null, "token");
    const endpoint =
      process.env.NEXT_PUBLIC_URL + "/products?pagination[page]=" + page;

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
        setProduct((prevData) => ({
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

  const filterDuplicateData = (arr) => {
    const seen = new Set();

    const filteredArr = arr.filter((el) => {
      const duplicate = seen.has(el.id);
      seen.add(el.id);
      return !duplicate;
    });

    return filteredArr;
  };

  const fetchInventory = async (data) => {
    setIsLoading(true);
    const cookies = nookies.get(null, "token");
    const endpoint =
      process.env.NEXT_PUBLIC_URL +
      `/inventories?filters[products][id][$eq]=${data.id}&populate=locations`;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookies.token,
      },
    };

    const req = await fetch(endpoint, options);
    const res = await req.json();
    // return req;
    // console.log(res);

    setInventory(res.data);

    //
  };

  const openModal = async (e, data) => {
    // console.log("test", data);
    setVisible(e);
    fetchInventory(data);
  };

  useEffect(() => {
    console.log("inventory", inventory);
    setIsLoading(false);
  }, [inventory]);

  return (
    <>
      <Head>
        <title>Produk</title>
      </Head>
      <DashboardLayout>
        <LayoutWrapper style={{}}>
          <TitlePage titleText={"Produk"} />
          <LayoutContent>
            <div className="w-full flex justify-between">
              <Search
                className=""
                loading={isSearching}
                onChange={(e) => onSearch(e)}
                placeholder="Cari Produk"
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
                  <a className="text-white no-underline text-xs sm:text-xs">
                    + Tambah
                  </a>
                </div>
              </button>
            </div>

            <Modal
              className="rounded-lg m-5"
              head
              width={"90%"}
              centered
              visible={visible}
              onOk={() => setVisible(false)}
              onCancel={() => setVisible(false)}
              bodyStyle={{
                borderRadius: "20px",
                backgroundColor: "#fff",
              }}
              style={{
                backgroundColor: "#fff",
              }}
              footer={null}
            >
              <ProductModal
                data={modalProduct}
                isLoading={isLoading}
                inventory={inventory}
              />
            </Modal>

            <ProductTable
              data={product}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
              onPageChange={handlePageChange}
              setIsVisible={openModal}
              setViewModalProduct={setModalProduct}
            />
          </LayoutContent>
        </LayoutWrapper>
      </DashboardLayout>
    </>
  );
};

Product.getInitialProps = async (context) => {
  const cookies = nookies.get(context);
  let data;

  const req = await fetchData(cookies);
  data = await req.json();

  return {
    props: {
      data,
    },
  };
};

const fetchData = async (cookies) => {
  const endpoint = process.env.NEXT_PUBLIC_URL + "/products?populate=*";
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

export default Product;

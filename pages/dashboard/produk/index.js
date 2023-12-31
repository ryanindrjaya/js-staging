import Head from "next/head";
import React, { useEffect, useState } from "react";
import LayoutContent from "@iso/components/utility/layoutContent";
import LayoutWrapper from "@iso/components/utility/layoutWrapper.js";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import nookies from "nookies";
import DashboardLayout from "../../../containers/DashboardLayout/DashboardLayout";
import TitlePage from "../../../components/TitlePage/TitlePage";
import { Input, Modal, Select, message } from "antd";
import ProductTable from "../../../components/ReactDataTable/ProductTable";
import ProductModal from "../../../components/Modal/ProductModal";
import UnitTableView from "../../../components/ReactDataTable/Product/UnitsTableView";
import Manufactures from "../../../components/Form/AddProduct/Manufactures";
import DownloadTemplate from "../../../components/Form/DownloadTemplate";
import ExportProduk from "../../../components/Form/ExportProduk";
import UploadProduk from "../../../components/Form/UploadProduk";
import useDebounce from "../../../hooks/useDebounce";

const Product = ({ props }) => {
  const data = props?.data;
  const manufactures = props?.manufactures;
  const categories = props?.categories;
  const locations = props?.locations;
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState(data);
  const [modalProduct, setModalProduct] = useState();
  const [isSearching, setIsSearching] = useState(false);
  const [visible, setVisible] = useState(false);
  const router = useRouter();
  const [inventory, setInventory] = useState();
  const [searchParameters, setSearchParameters] = useState({
    namaSKU: "",
    manufacture: "",
    location: [],
    category: "",
  });
  const [searchOptionData, setSearchOptionData] = useState({
    manufactures: manufactures,
    categories: categories,
    locations: locations,
  });

  const debounced = useDebounce(searchParameters, 1000);

  const { Search } = Input;

  const handleSearch = (newValue, category) => {
    if (newValue) {
      fetchSearchOption(newValue, category);
    } else {
      setSearchOptionData({
        manufactures: manufactures,
        categories: categories,
        locations: locations,
      });
    }
  };

  const fetchSearchOption = async (query, category) => {
    const cookies = nookies.get(null);
    try {
      const endpoint = process.env.NEXT_PUBLIC_URL + `/${category}?filters[name][$containsi]=${query}`;
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + cookies.token,
        },
      };

      const req = await fetch(endpoint, options);
      const res = await req.json();

      if (req.status == 200) {
        const resData = res.data.map((item) => ({
          name: `${item.attributes.name}`,
          value: item.id,
          id: item.id,
        }));

        setSearchOptionData({ ...searchOptionData, [category]: resData });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // search query
  useEffect(() => {
    const searchQuery = async () => {
      setIsSearching(true);

      var query =
        "filters[$or][0][name][$contains]=" +
        searchParameters.namaSKU +
        "&filters[$or][1][SKU][$contains]=" +
        searchParameters.namaSKU;
      var locationQuery = "";

      if (searchParameters.manufacture) {
        query += "&filters[manufacture][name][$contains]=";
        query += searchParameters.manufacture;
      }

      if (searchParameters.category) {
        query += "&filters[category][name][$contains]=";
        query += searchParameters.category;
      }

      if (searchParameters.location.length > 0) {
        searchParameters.location.forEach((item, idx) => {
          locationQuery += "&filters[$and][" + (idx + 4) + "][locations][id][$eq]=" + item;
        });
      } else {
        locationQuery = "";
      }

      const endpoint =
        process.env.NEXT_PUBLIC_URL +
        "/products?populate=category,manufacture&pagination[limit]=10&" +
        query +
        locationQuery;

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

      setProduct(res);
      setIsSearching(false);
    };

    searchQuery();
  }, [debounced]);

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
    console.log("page", page);
    const cookies = nookies.get(null, "token");
    const endpoint =
      process.env.NEXT_PUBLIC_URL +
      "/products?populate=category,manufacture&pagination[pageSize]=10&pagination[page]=" +
      page +
      1;

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
    const endpoint = process.env.NEXT_PUBLIC_URL + `/inventories?filters[product][id][$eq]=${data.id}&populate=*`;
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
    console.log(res);

    return res.data;
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

  useEffect(() => {
    async function fetchOne(id) {
      setIsLoading(true);
      message.loading({ content: "Mengambil data", duration: 8000, key: "fetch" });
      const cookies = nookies.get();
      const endpoint = process.env.NEXT_PUBLIC_URL + `/products/${id}?populate=manufacture,category,group`;
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + cookies.token,
        },
      };

      const res = await fetch(endpoint, options)
        .then((r) => r.json())
        .catch((e) => console.log(e));

      if (res.data) {
        message.destroy("fetch");

        const inventory = await fetchInventory(res.data);

        setInventory(inventory);
        setModalProduct(res.data);
        setVisible(true);
        setIsLoading(false);
      }
    }
    if (router.query.id) {
      fetchOne(router.query.id);
    }
  }, [router.query]);

  return (
    <>
      <Head>
        <title>Produk</title>
      </Head>
      <DashboardLayout>
        <LayoutWrapper style={{}}>
          <TitlePage titleText={"Produk"} />
          <LayoutContent>
            <div className="w-full flex justify-between gap-x-32 mb-3">
              <div className="w-full md:w-1/2 grid grid-cols-2 gap-x-4 gap-y-3">
                <Search
                  className=""
                  loading={isSearching}
                  onChange={(e) =>
                    setSearchParameters({
                      ...searchParameters,
                      category: e.target.value,
                    })
                  }
                  placeholder="Kategori"
                  size="middle"
                />
                <Select
                  mode="multiple"
                  size="middle"
                  placeholder="LOKASI"
                  allowClear
                  onChange={(e) => setSearchParameters({ ...searchParameters, location: e })}
                  onClear={() => setSearchParameters({ ...searchParameters, location: [] })}
                  onSearch={(e) => handleSearch(e, "locations")}
                >
                  {searchOptionData.locations.map((data) => (
                    <Select.Option key={data.id} value={data.id}>
                      {data.name}
                    </Select.Option>
                  ))}
                </Select>
                <Search
                  className=""
                  loading={isSearching}
                  onChange={(e) =>
                    setSearchParameters({
                      ...searchParameters,
                      manufacture: e.target.value,
                    })
                  }
                  placeholder="Pabrikasi"
                  size="middle"
                />

                <Search
                  className=""
                  loading={isSearching}
                  onChange={(e) => {
                    setIsSearching(true);

                    setSearchParameters({
                      ...searchParameters,
                      namaSKU: e.target.value,
                    });
                  }}
                  placeholder="Nama Produk / SKU"
                  size="middle"
                />
              </div>
              <div className="w-full flex flex-col gap-y-3 gap-x-4 md:w-1/2">
                <div
                  onClick={handleAdd}
                  className="bg-cyan-700 w-full cursor-pointer rounded px-5 h-10 hover:bg-cyan-800 shadow-sm flex items-center justify-center float-right"
                >
                  <div className="text-white text-center text-sm font-bold">
                    <a className="text-white no-underline text-xs sm:text-xs">+ Tambah</a>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-x-4 w-full">
                  <UploadProduk setProduct={setProduct} fetchData={fetchData} />
                  <ExportProduk data={product.data} setProduct={setProduct} />
                  <DownloadTemplate />
                </div>
              </div>
            </div>

            <Modal
              className="rounded-lg m-5"
              head
              width={"90%"}
              centered
              open={visible}
              onOk={() => {
                router.replace(
                  {
                    pathname: router.pathname,
                  },
                  undefined,
                  { shallow: true }
                );
                setVisible(false);
                setModalProduct();
                setInventory();
              }}
              onCancel={() => {
                router.replace(
                  {
                    pathname: router.pathname,
                  },
                  undefined,
                  { shallow: true }
                );
                setVisible(false);
                setModalProduct();
                setInventory();
              }}
              bodyStyle={{
                borderRadius: "20px",
                backgroundColor: "#E8F2F2",
              }}
              style={{
                backgroundColor: "#E8F2F2",
                border: "2px solid #000",
              }}
              footer={null}
            >
              <ProductModal data={modalProduct} isLoading={isLoading} inventory={inventory} />
            </Modal>

            <ProductTable
              data={product}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
              onPageChange={handlePageChange}
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

  if (req.status !== 200) {
    context.res?.writeHead(302, {
      Location: "/signin?session=false",
      "Content-Type": "text/html; charset=utf-8",
    });
    context?.res?.end();

    return {};
  }

  const manufactures = await fetchSearchParametersData(cookies, "manufactures");
  const categories = await fetchSearchParametersData(cookies, "categories");
  const locations = await fetchSearchParametersData(cookies, "locations");

  return {
    props: {
      data,
      manufactures,
      categories,
      locations,
    },
  };
};

const formatData = (data) => {
  const formattedData = data?.map((item) => {
    return {
      name: `${item?.attributes?.name}`,
      value: item?.id,
      id: item?.id,
    };
  });

  return formattedData;
};

const fetchData = async (cookies) => {
  const endpoint = process.env.NEXT_PUBLIC_URL + "/products?populate=category,manufacture&pagination[limit]=10";
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

const fetchSearchParametersData = async (cookies, url) => {
  const endpoint = process.env.NEXT_PUBLIC_URL + `/${url}?pagination[limit]=10`;
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + cookies.token,
    },
  };

  const req = await fetch(endpoint, options);
  const res = await req.json();

  return formatData(res?.data || []) || [];
};

export default Product;

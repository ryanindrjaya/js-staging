import Head from "next/head";
import React, { useState } from "react";
import LayoutContent from "@iso/components/utility/layoutContent";
import DashboardLayout from "../../../../containers/DashboardLayout/DashboardLayout";
import LayoutWrapper from "@iso/components/utility/layoutWrapper.js";
import router, { useRouter } from "next/router";
import { Input, notification, Select, DatePicker } from "antd";
import TitlePage from "../../../../components/TitlePage/TitlePage";
import SellingTable from "../../../../components/ReactDataTable/Selling/SellingTable";
import nookies from "nookies";

Toko.getInitialProps = async (context) => {
  const cookies = nookies.get(context);

  const req = await fetchData(cookies);
  const user = await req.json();

  const reqLocation = await fetchLocation(cookies);
  const locations = await reqLocation.json();

  return {
    props: {
      user,
      locations,
    },
  };
};

const fetchData = async (cookies) => {
  const endpoint = process.env.NEXT_PUBLIC_URL + "/users/me";
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

const fetchLocation = async (cookies) => {
  const endpoint = process.env.NEXT_PUBLIC_URL + "/locations";
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

function Toko({ props }) { console.log("props :",props)
  //const user = props.user;
  const locations = props.locations.data;
  const router = useRouter();
  //const [sell, setSell] = useState(data);

  const handleAdd = () => {
    console.log("tambah");
    router.push("/dashboard/penjualan/toko/penjualan");
  };

  const handleUpdate = (id) => {
    // router.push("/dashboard/pembelian/order_pembelian/edit/" + id);
    openNotificationWithIcon(
      "info",
      "Work In Progress",
      "Hai, Fitur ini sedang dikerjakan. Silahkan tunggu pembaruan selanjutnya"
    );
  };

  const openNotificationWithIcon = (type, title, message) => {
    notification[type]({
      message: title,
      description: message,
    });
  };

  return (
    <>
      <Head>
        <title>Penjualan Toko</title>
      </Head>
      <DashboardLayout>
        <LayoutWrapper style={{}}>
          <TitlePage titleText={"Daftar Penjualan Toko"} />
          <LayoutContent>
            <div className="w-full flex justify-start">
              <div className="w-full md:w-1/5 px-3"> 
                <Select
                  placeholder="Lokasi Gudang"
                  size="large"
                  style={{
                    width: "100%",
                    marginRight: "10px",
                  }}
                >
                {/*{locations.map((element) => {*/}
                {/*  return (*/}
                    <Select.Option>
                      data
                    </Select.Option>
                {/*  );*/}
                {/*})}*/}
                </Select>
              </div>
              <div className="w-full md:w-1/5 px-3"> 
                <Select
                  placeholder="Lokasi Penjualan"
                  size="large"
                  style={{
                    width: "100%",
                    marginRight: "10px",
                  }}
                >
                {/*{locations.map((element) => {*/}
                {/*  return (*/}
                    <Select.Option>
                      data
                    </Select.Option>
                {/*  );*/}
                {/*})}*/}
                </Select>
              </div>
              <div className="w-full md:w-1/5 px-3"> 
                <Select
                  placeholder="Status Pembayaran"
                  size="large"
                  style={{
                    width: "100%",
                    marginRight: "10px",
                  }}
                >
                {/*{locations.map((element) => {*/}
                {/*  return (*/}
                    <Select.Option>
                      data
                    </Select.Option>
                {/*  );*/}
                {/*})}*/}
                </Select>
              </div>
              <div className="w-full md:w-1/5 px-3">                
                <DatePicker placeholder="Rentang Tanggal" size="large" style={{ width: "100%" }} />
              </div>
              <div className="w-full md:w-1/5 px-3"> 
                <Select
                  placeholder="Admin Penjualan"
                  size="large"
                  style={{
                    width: "100%",
                    marginRight: "10px",
                  }}
                >
                {/*{locations.map((element) => {*/}
                {/*  return (*/}
                    <Select.Option>
                      data
                    </Select.Option>
                {/*  );*/}
                {/*})}*/}
                </Select>
              </div>
            </div>

            <div className="w-full flex justify-start mt-3">
              <div className="w-full md:w-1/5 px-3"> 
                <Select
                  placeholder="Pelanggan"
                  size="large"
                  style={{
                    width: "100%",
                    marginRight: "10px",
                  }}
                >
                {/*{locations.map((element) => {*/}
                {/*  return (*/}
                    <Select.Option>
                      data
                    </Select.Option>
                {/*  );*/}
                {/*})}*/}
                </Select>
              </div>
              <div className="w-full md:w-1/5 px-3"> 
                <Select
                  placeholder="Sales"
                  size="large"
                  style={{
                    width: "100%",
                    marginRight: "10px",
                  }}
                >
                {/*{locations.map((element) => {*/}
                {/*  return (*/}
                    <Select.Option>
                      data
                    </Select.Option>
                {/*  );*/}
                {/*})}*/}
                </Select>
              </div>
              <div className="w-full md:w-1/5 px-3"> 
                <Select
                  placeholder="Status Penyerahan"
                  size="large"
                  style={{
                    width: "100%",
                    marginRight: "10px",
                  }}
                >
                {/*{locations.map((element) => {*/}
                {/*  return (*/}
                    <Select.Option>
                      data
                    </Select.Option>
                {/*  );*/}
                {/*})}*/}
                </Select>
              </div>
              <div className="w-full md:w-1/5 px-3"> 
                <Select
                  placeholder="Jatuh Tempo"
                  size="large"
                  style={{
                    width: "100%",
                    marginRight: "10px",
                  }}
                >
                {/*{locations.map((element) => {*/}
                {/*  return (*/}
                    <Select.Option>
                      data
                    </Select.Option>
                {/*  );*/}
                {/*})}*/}
                </Select>
              </div>
                <button
                    onClick={handleAdd}
                    type="button"
                    className="w-full md:w-1/6 mx-3 bg-cyan-700 rounded px-20 py-2 hover:bg-cyan-800  shadow-sm float-right mb-2"
                >
                    <div className="text-white text-center text-sm font-bold">
                      <a className="text-white no-underline text-xs sm:text-xs">
                        tambah
                      </a>
                    </div>
                </button>
            </div>

            <div className="w-full flex justify-start mt-4 mb-2 text-black text-md font-bold ml-1">
              Semua Penjualan
            </div>

            <div  className="w-full flex justify-between">
                <button
                    onClick={handleUpdate}
                    type="button"
                    className="w-full md:w-1/4 mx-3 bg-cyan-700 rounded px-20 py-2 hover:bg-cyan-800  shadow-sm float-right mb-5"
                >
                    <div className="text-white text-center text-sm font-bold">
                      <a className="text-white no-underline text-xs sm:text-xs">
                        Print PDF
                      </a>
                    </div>
                </button>
                <button
                    onClick={handleUpdate}
                    type="button"
                    className="w-full md:w-1/4 mx-3 bg-cyan-700 rounded px-20 py-2 hover:bg-cyan-800  shadow-sm float-right mb-5"
                >
                    <div className="text-white text-center text-sm font-bold">
                      <a className="text-white no-underline text-xs sm:text-xs">
                        Print CSV
                      </a>
                    </div>
                </button>
                <button
                    onClick={handleUpdate}
                    type="button"
                    className="w-full md:w-1/4 mx-3 bg-cyan-700 rounded px-20 py-2 hover:bg-cyan-800  shadow-sm float-right mb-5"
                >
                    <div className="text-white text-center text-sm font-bold">
                      <a className="text-white no-underline text-xs sm:text-xs">
                        Print XLS
                      </a>
                    </div>
                </button>
                <button
                    onClick={handleUpdate}
                    type="button"
                    className="w-full md:w-1/4 mx-3 bg-cyan-700 rounded px-20 py-2 hover:bg-cyan-800  shadow-sm float-right mb-5"
                >
                    <div className="text-white text-center text-sm font-bold">
                      <a className="text-white no-underline text-xs sm:text-xs">
                        Kolom Tampak
                      </a>
                    </div>
                </button>
            </div>

            {/*<SellingTable*/}
            {/*  data={sell}*/}
            {/*  //onUpdate={handleUpdate}*/}
            {/*  //onDelete={handleDelete}*/}
            {/*  //onPageChange={handlePageChange}*/}
            {/*  //onChangeStatus={onChangeStatus}*/}
            {/*/>*/}
          </LayoutContent>
        </LayoutWrapper>
      </DashboardLayout>
    </>
  );
}

export default Toko;

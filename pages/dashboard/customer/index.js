import Head from "next/head";
import React, { useState } from "react";
import LayoutContent from "@iso/components/utility/layoutContent";
import DashboardLayout from "../../../containers/DashboardLayout/DashboardLayout";
import LayoutWrapper from "@iso/components/utility/layoutWrapper.js";
import CustomerTable from "@iso/components/ReactDataTable/CustomerTable";
import { useRouter } from "next/router";
import TitlePage from "../../../components/TitlePage/TitlePage";
import { toast } from "react-toastify";
import nookies from "nookies";

Customer.getInitialProps = async (context) => {
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
    const endpoint = process.env.NEXT_PUBLIC_URL + "/customers?populate=*";
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

function Customer ({ props }) {
  const data = props.data;
  const [user, setUser] = useState(data); console.log("user",user)
  const router = useRouter();

  const handleAdd = () => {
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
      const req = await fetchData(cookies);
      const data = await req.json();
      toast.success("Data Customer berhasil dihapus");
      setUser(data);
    }
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
            <button
              onClick={handleAdd}
              type="button"
              className="bg-cyan-700 rounded px-5 py-2 hover:bg-cyan-800  shadow-sm flex float-right mb-5"
            >
              <div className="text-white text-center text-sm font-bold">
                <a className="text-white no-underline text-xs sm:text-xs">+ Tambah</a>
              </div>
            </button>

            <CustomerTable data={user} onDelete={handleDelete} onUpdate={handleUpdate} />
          </LayoutContent>
        </LayoutWrapper>
      </DashboardLayout>
    </>
  );
};

export default Customer;

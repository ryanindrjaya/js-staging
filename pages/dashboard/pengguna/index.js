import Head from "next/head";
import React, { useState } from "react";
import LayoutContent from "@iso/components/utility/layoutContent";
import DashboardLayout from "../../../containers/DashboardLayout/DashboardLayout";
import LayoutWrapper from "@iso/components/utility/layoutWrapper.js";
import UserTable from "../../../components/ReactDataTable/UserTable";
import { useRouter } from "next/router";
import TitlePage from "../../../components/TitlePage/TitlePage";
import { toast } from "react-toastify";
import nookies from "nookies";

const Pengguna = ({ props }) => {
  const data = props.data;
  const [user, setUser] = useState(data);
  const router = useRouter();

  const handleAddUser = () => {
    router.push("/dashboard/pengguna/tambah");
  };

  const handleUpdateUser = async (id) => {
    router.push("/dashboard/pengguna/edit/" + id);
  };

  const handleDelete = async (id) => {
    const endpoint = process.env.NEXT_PUBLIC_URL + "/users/" + id;
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
      toast.success("Data Pengguna berhasil dihapus");
      setUser(data);
    }
  };

  return (
    <>
      <Head>
        <title>Daftar Pengguna</title>
      </Head>
      <DashboardLayout>
        <LayoutWrapper style={{}}>
          <TitlePage titleText={"Pengguna"} />
          <LayoutContent>
            <button
              onClick={handleAddUser}
              type="button"
              className="bg-cyan-700 rounded px-5 py-2 hover:bg-cyan-800  shadow-sm flex float-right mb-5"
            >
              <div className="text-white text-center text-sm font-bold">
                <a className="text-white no-underline text-xs sm:text-xs">+ Tambah</a>
              </div>
            </button>

            <UserTable userData={user} onDelete={handleDelete} onUpdate={handleUpdateUser} />
          </LayoutContent>
        </LayoutWrapper>
      </DashboardLayout>
    </>
  );
};

export async function getServerSideProps(context) {
  const cookies = nookies.get(context);
  let data;

  const req = await fetchData(cookies);
  data = await req.json();

  if (req.status !== 200) {
    return {
      redirect: {
        destination: "/signin?session=false",
        permanent: false,
      },
    };
  } else {
    return {
      props: {
        data,
      },
    };
  }
}

const fetchData = async (cookies) => {
  const endpoint = process.env.NEXT_PUBLIC_URL + "/users?populate=*";
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

export default Pengguna;

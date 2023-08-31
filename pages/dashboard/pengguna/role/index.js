import Head from "next/head";
import React, { useState } from "react";
import LayoutContent from "@iso/components/utility/layoutContent";
import DashboardLayout from "@iso/containers/DashboardLayout/DashboardLayout";
import LayoutWrapper from "@iso/components/utility/layoutWrapper.js";
import RoleTable from "@iso/components/ReactDataTable/RoleTable";
import { useRouter } from "next/router";
import TitlePage from "@iso/components/TitlePage/TitlePage";
import { toast } from "react-toastify";
import nookies from "nookies";

const Role = ({ props }) => {
  console.log(props);
  const data = props.data.roles.filter(function (value, index, arr) {
    return index > 1;
  });

  const [role, setRole] = useState(data);
  const router = useRouter();

  const handleAddUser = () => {
    router.push("/dashboard/pengguna/role/tambah");
  };

  const handleDelete = async (id) => {
    const endpoint = process.env.NEXT_PUBLIC_URL + "/users-permissions/roles/" + id;
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

      const roleData = data.roles.filter(function (value, index, arr) {
        return index > 1;
      });

      setRole(roleData);
      toast.success("Role berhasil dihapus");
    }
  };

  return (
    <>
      <Head>
        <title>Daftar Role Pengguna</title>
      </Head>
      <DashboardLayout>
        <LayoutWrapper style={{}}>
          <TitlePage titleText={"Role"} />
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

            <RoleTable roleData={role} onDelete={handleDelete} />
          </LayoutContent>
        </LayoutWrapper>
      </DashboardLayout>
    </>
  );
};

Role.getInitialProps = async (context) => {
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
  const endpoint = process.env.NEXT_PUBLIC_URL + "/users-permissions/roles";
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + cookies.token,
    },
  };

  const req = await fetch(endpoint, options);
  console.log(endpoint);
  return req;
};

export default Role;

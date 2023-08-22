import Head from "next/head";
import React, { useState, useEffect } from "react";
import LayoutContent from "@iso/components/utility/layoutContent";
import DashboardLayout from "@iso/containers/DashboardLayout/DashboardLayout";
import LayoutWrapper from "@iso/components/utility/layoutWrapper.js";
import router, { useRouter } from "next/router";
import { Input, notification, Select, DatePicker, Form, Spin } from "antd";
import TitlePage from "@iso/components/TitlePage/TitlePage";
import Supplier from "@iso/components/Form/AddCost/SupplierForm";
import COATable from "@iso/components/ReactDataTable/Cost/ChartOfAccountTable";
import nookies from "nookies";
import { toast } from "react-toastify";

Setting.getInitialProps = async (context) => {
  const cookies = nookies.get(context);

  //const req = await fetchData(cookies);
  //const user = await req.json();

  const reqAkun = await fetchAkun(cookies);
  const akun = await reqAkun.json();

  return {
    props: {
      //user,
      akun,
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

const fetchAkun = async (cookies) => {
  const endpoint = process.env.NEXT_PUBLIC_URL + "/chart-of-accounts?sort[0]=kode%3Aasc&sort[1]=jenis_akun%3Adesc&pagination[pageSize]=200";
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

function Setting({ props }) {
  const user = props.user;
  const akunData = props.akun;
  const router = useRouter();
  const [akun, setAkun] = useState(akunData);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState();
  const [tunaiData, setTunaiData] = useState();
  const [transferData, setTransferData] = useState();

  const handleDelete = async (id) => {
    const endpoint = process.env.NEXT_PUBLIC_URL + "/chart-of-accounts/" + id;
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
      const res = await fetchData(cookies);
      openNotificationWithIcon(
        "success",
        "Berhasil menghapus data",
        "Akun COA yang dipilih telah berhasil dihapus. Silahkan cek kembali akun coa"
      );
      setAkun(res);
    }
  };

  const handlePageChange = async (page) => {
    const cookies = nookies.get(null, "token");
    const endpoint = process.env.NEXT_PUBLIC_URL + "/chart-of-accounts?pagination[page]=" + page;

    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookies.token,
      },
    };

    try {
      const req = await fetch(endpoint, options);
      const res = await req.json(); console.log(page, req);
      if (res) {
        setAkun((prevData) => ({
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

  const handleTambahAkun = () => {
    router.push("/dashboard/keuangan/coa/tambahCOA");
  };

  const onFinish = (values) => {
    setLoading(true);
    //setDataValues(values);
    setLoading(false);
  };

  const openNotificationWithIcon = (type, title, message) => {
    notification[type]({
      message: title,
      description: message,
    });
  };

  const validateError = () => {
    var listError = form.getFieldsError();
    listError.forEach((element) => {
      if (element.errors[0]) {
        notification["error"]({
          message: "Field Kosong",
          description: element.errors[0],
        });
      }
    });
  };

  const fetchData = async (cookies) => {
    const endpoint = process.env.NEXT_PUBLIC_URL + "/chart-of-accounts?chart-of-accounts?sort[0]=kode%3Aasc&sort[1]=jenis_akun%3Adesc&populate";
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookies.token,
      },
    };

    const req = await fetch(endpoint, options);
    const res = req.json();

    return res;
  };

  return (
    <>
      <Head>
        <title>AKUN COA</title>
      </Head>
      <DashboardLayout>
        <LayoutWrapper style={{}}>
          <TitlePage titleText={"AKUN COA"} />
          <LayoutContent>
            <div className="w-full flex justify-end mb-3">
              <button htmlType="button" className="bg-cyan-700 rounded-md m-1 text-sm" onClick={handleTambahAkun}>
                <p className="px-4 py-2 m-0 text-white">+ Tambah Akun</p>
              </button>
            </div>

            <Form
              //form={form}
              //name="add"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={validateError}
            >
              <COATable
                data={akun}
                //onUpdate={handleUpdate}
                onDelete={handleDelete}
                onPageChange={handlePageChange}
                //onChangeStatus={onChangeStatus}
                //onChangeSetting={onChangeSetting}
                user={user}
              />
            </Form>
          </LayoutContent>
        </LayoutWrapper>
      </DashboardLayout>
    </>
  );
}

export default Setting;

import React from "react";
import Head from "next/head";
import Maintenance from "../../components/Illustration/Maintenance";
import DashboardLayout from "../../containers/DashboardLayout/DashboardLayout";
import LayoutWrapper from "@iso/components/utility/layoutWrapper.js";
import nookies from "nookies";
import { useDispatch } from "react-redux";

const Dashboard = () => {
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <DashboardLayout>
        <LayoutWrapper>
          <div className="h-full w-full">
            <center>
              <div className="mt-5"></div>
              <Maintenance width={"600"} height={"300"} />
              <p className="font-bold p-4 text-zinc-600">Sedang Dalam Pengembangan..</p>
            </center>
          </div>
        </LayoutWrapper>
      </DashboardLayout>
    </>
  );
};

export async function getServerSideProps(context) {
  const cookies = nookies.get(context);
  if (!cookies.token) {
    return {
      redirect: {
        destination: "/signin?session=false",
        permanent: false,
      },
    };
  }

  return {
    props: {
      cookies,
    },
  };
}

export default Dashboard;

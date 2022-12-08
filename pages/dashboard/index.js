import React from "react";
import Head from "next/head";
import Maintenance from "../../components/Illustration/Maintenance";
import DashboardLayout from "../../containers/DashboardLayout/DashboardLayout";
import LayoutWrapper from "@iso/components/utility/layoutWrapper.js";
import nookies from "nookies";

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
        z
      </DashboardLayout>
    </>
  );
};

Dashboard.getInitialProps = async (context) => {
  const cookies = nookies.get(context);

  if (!cookies.token) {
    context.res.writeHead(302, {
      Location: "/signin?session=false",
      "Content-Type": "text/html; charset=utf-8",
    });
    context.res.end();

    return {};
  }

  return {
    props: {},
  };
};

export default Dashboard;

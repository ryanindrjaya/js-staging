import React from "react";
import Head from "next/head";
import Image from "next/image";
import { withAuthSync } from "../../authentication/auth.utils";
import DashboardLayout from "../../containers/DashboardLayout/DashboardLayout";
import LayoutWrapper from "@iso/components/utility/layoutWrapper.js";

const Dashboard = () => {
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <DashboardLayout>
        <LayoutWrapper>
          {/* main content */}
          {/* <div >
          <Image
          src="/assets/images/illustration/developer.png"
          alt="incoming page"
          width={300}
          height={300}
        />
        </div> */}
        </LayoutWrapper>
      </DashboardLayout>
    </>
  );
};

export default Dashboard;

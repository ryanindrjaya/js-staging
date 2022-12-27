import Head from "next/head";
import React, { useState } from "react";
import LayoutContent from "@iso/components/utility/layoutContent";
import DashboardLayout from "../../../../containers/DashboardLayout/DashboardLayout";
import LayoutWrapper from "@iso/components/utility/layoutWrapper.js";
import { useRouter } from "next/router";
import { Input, notification } from "antd";
import TitlePage from "../../../../components/TitlePage/TitlePage";
import PurchasingTable from "../../../../components/ReactDataTable/Purchases/PurchasingTable";
import nookies from "nookies";

function NonPanel() {
  const handleAdd = () => {
    console.log("tambah");
  };

  return (
    <>
      <Head>
        <title>Penjualan Non Panel</title>
      </Head>
      <DashboardLayout>
        <LayoutWrapper style={{}}>
          <TitlePage titleText={"Penjualan Non Panel"} />
          <LayoutContent>
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
          </LayoutContent>
        </LayoutWrapper>
      </DashboardLayout>
    </>
  );
}

export default NonPanel;

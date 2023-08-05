import React from "react";
import Head from "next/head";
import DashboardLayout from "@iso/containers/DashboardLayout/DashboardLayout";
import LayoutWrapper from "@iso/components/utility/layoutWrapper.js";
import TitlePage from "@iso/components/TitlePage/TitlePage";
import LayoutContent from "@iso/components/utility/layoutContent";
import { Input } from "antd";

export default function no_faktur_list() {
  const handleAdd = () => {};

  return (
    <>
      <Head>
        <title>Daftar Nomor Faktur</title>
      </Head>
      <DashboardLayout>
        <LayoutWrapper style={{}}>
          <TitlePage titleText={"Daftar Nomor Faktur"} />
          <LayoutContent>
            <div className="w-full flex justify-between">
              <Input.Search placeholder="Cari Nomor Faktur" className="max-w-xs w-full" />

              <button
                onClick={handleAdd}
                type="button"
                className="bg-cyan-700 mx-2 rounded px-5 py-2 hover:bg-cyan-800  shadow-sm flex float-right mb-5"
              >
                <div className="text-white text-center text-sm font-bold">
                  <a className="text-white no-underline text-xs sm:text-xs">+ Tambah</a>
                </div>
              </button>
            </div>
          </LayoutContent>
        </LayoutWrapper>
      </DashboardLayout>
    </>
  );
}

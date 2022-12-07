import Barcode from "react-jsbarcode";
import { QRCodeSVG } from "qrcode.react";
import Head from "next/head";
import React from "react";
import { Row } from "antd";
import LayoutContent from "@iso/components/utility/layoutContent";
import LayoutWrapper from "@iso/components/utility/layoutWrapper.js";
import nookies from "nookies";
import DashboardLayout from "../../../../../containers/DashboardLayout/DashboardLayout";
import TitlePage from "../../../../../components/TitlePage/TitlePage";
import HistoryTable from "../../../../../components/ReactDataTable/Product/HistoryTable";

History.getInitialProps = async (context) => {
  const cookies = nookies.get(context);
  const test = context.query;
  const locationId = context.query.locationId;
  const productId = context.query.productId;

  const reqInventory = await fetchInventory(cookies, productId, locationId);
  const inventory = await reqInventory.json();

  const reqProduct = await fetchProduct(cookies, productId, locationId);
  const product = await reqProduct.json();

  const reqHistory = await fetchHistory(cookies, productId, locationId);
  const history = await reqHistory.json();

  return {
    props: { inventory, product, history },
  };
};

const fetchProduct = async (cookies, productId) => {
  const endpoint = process.env.NEXT_PUBLIC_URL + `/products/` + productId;
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

const fetchInventory = async (cookies, productId, locationId) => {
  const endpoint =
    process.env.NEXT_PUBLIC_URL + `/inventories?filters[locations][id][$eq]=${locationId}&filters[products][id][$eq]=${productId}&populate=*`;
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

const fetchHistory = async (cookies, productId, locationId) => {
  const endpoint =
    process.env.NEXT_PUBLIC_URL + `/inventory-details?filters[locations][id][$eq]=${locationId}&filters[products][id][$eq]=${productId}&populate=*`;
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

function formatMyDate(value, locale = "id-ID") {
  return new Date(value).toLocaleDateString(locale);
}

function History({ props }) {
  const product = props.product.data.attributes;
  const inventory = props.inventory.data[0].attributes;
  const historyList = props.history.data;
  const smallesUnit = historyList[0].attributes.smallest_unit;

  console.log(props);
  return (
    <>
      <Head>
        <title>Riwayat Produk</title>
      </Head>
      <DashboardLayout>
        <LayoutWrapper style={{}}>
          <TitlePage titleText={"Riwayat Produk"} />
          <LayoutContent>
            <div>
              <Row justify="space-between">
                <div>
                  <div className="font-bold text-lg mb-4 uppercase">{product.name}</div>
                  <div className="text-sm mb-2">SKU : {product?.SKU}</div>
                  <div className="text-sm">
                    Total Stok : {inventory?.total_stock} {smallesUnit}
                  </div>
                </div>
                <div>
                  <Row>
                    <Barcode
                      value={product?.SKU}
                      options={{
                        format: "code128",
                        width: "2px",
                        height: "50px",
                      }}
                      renderer="svg"
                    />
                    <QRCodeSVG className="ml-5" height={80} width={80} value={product?.SKU} />
                  </Row>
                </div>
              </Row>

              <div className="font-bold text-lg mt-5 mb-3 uppercase">Daftar Stok</div>
              <HistoryTable data={historyList} />
            </div>
          </LayoutContent>
        </LayoutWrapper>
      </DashboardLayout>
    </>
  );
}

export default History;

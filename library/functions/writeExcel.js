import { message } from "antd";
import nookies from "nookies";
import writeXlsxFile from "write-excel-file";
import { DETAIL_HEADER, createDetailHeader, createHeader } from "../../components/Form/utils/ExcelStylePenjualan";

function getDescendantProp(obj, desc) {
  const arr = desc.split(".");

  if (arr.length === 1) {
    return obj[desc];
  }

  return desc.split(".").reduce((a, b) => a[b], obj);
}

function getDetailItemsKey(data) {
  const keys = Object.keys(data);
  const [detailItemsKey] = keys.filter((key) => key.includes("details"));
  return detailItemsKey;
}

async function getData(api, data = [], page = 1, limit = 100) {
  const cookies = nookies.get();
  const detailKey = api.split("-").join("_") + "_details";

  const endpoint = `${process.env.NEXT_PUBLIC_URL}/${api}s?populate=${detailKey}.product,customer&pagination[page]=${page}&pagination[pageSize]=${limit}`;
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + cookies.token,
    },
  };

  const req = await fetch(endpoint, options);

  if (req.ok) {
    const response = await req.json();

    if (response.data) {
      const newData = [...data, ...response.data];
      if (response.meta.pagination.pageCount > page) {
        return getData(api, newData, page + 1, limit);
      } else {
        return newData;
      }
    }
  } else {
    throw new Error("Error fetching data");
  }
}

const detailSchema = {
  SKU: "product.SKU",
  "Nama Produk": "product.name",
  Qty: "qty",
  Unit: "unit",
  Harga: "unit_price",
  Margin: "margin",
  "Diskon Rupiah": "disc",
  D1: "disc1",
  D2: "disc2",
  Subtotal: "sub_total",
  "EXP Date": "expired_date",
};

export const writeExcel = async ({ api, schema, outputPath = "Export Penjualan.xlsx" }) => {
  try {
    const _res = await getData(api);

    console.log(_res);

    const _data = _res.map(({ attributes }) => {
      const detailItemsKey = getDetailItemsKey(attributes);
      return {
        ...attributes,
        customer: attributes?.customer?.data?.attributes,
        details: attributes[detailItemsKey].data?.map((item) => {
          return {
            ...item.attributes,
            product: item.attributes.product.data.attributes,
          };
        }),
      };
    });

    const MASTER_HEADER = Object.keys(schema).map((key) => {
      return createHeader(key);
    });

    const DETAIL_HEADER = Object.keys(detailSchema).map((key) => {
      return createDetailHeader(key);
    });

    const result = [];
    _data.forEach((item) => {
      const master = Object.keys(schema).map((key) => {
        const value = getDescendantProp(item, schema[key]);
        return {
          value: value,
          fontSize: 11,
        };
      });

      result.push(master);

      const details = item.details.map((detail) => {
        const row = [];
        Object.keys(detailSchema).forEach((key) => {
          const value = getDescendantProp(detail, detailSchema[key]);
          row.push({
            value: value,
            fontSize: 11,
          });
        });
        return row;
      });

      result.push(...details);
    });

    console.log("columns", MASTER_HEADER);
    console.log("data master", result);

    const excelData = [MASTER_HEADER, DETAIL_HEADER, ...result];

    await writeXlsxFile(excelData, {
      fileName: outputPath,
    });

    // console.log(`Excel file saved to: ${outputPath}`);
  } catch (error) {
    message.error({ content: "Terjadi Kesalahan", duration: 3000, key: "fetch" });

    console.error("Error writing Excel file:", error);
  }
};

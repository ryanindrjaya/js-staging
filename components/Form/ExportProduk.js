import { Spin } from "antd";
import moment from "moment";
import React, { useState } from "react";
import writeXlsxFile from "write-excel-file";
import { HEADER_ROW_1, HEADER_ROW_2, columnsWidth } from "./ExcelStyles";

export default function ExportProduk({ data = [], setProduct }) {
  const [loading, setLoading] = useState(false);
  const excelData = [HEADER_ROW_1, HEADER_ROW_2];

  const exportData = async () => {
    setLoading(true);
    const time = moment().unix();

    if (data.length > 0) {
      const productData = data.map((product) => {
        const { attributes } = product;

        // kategori, golongan, lokasi, pabrikasi, sub kategori
        const kategori = `${attributes.category.data.attributes.category_id} - ${attributes.category.data.attributes.name}` || "";
        const golongan = `${attributes.group.data.attributes.alias} - ${attributes.group.data.attributes.name}` || "";
        const pabrikasi = `${attributes.manufacture.data.attributes.code} - ${attributes.manufacture.data.attributes.name}` || "";
        const subKategori = `${attributes.sub_category.data.attributes.sub_id} - ${attributes.sub_category.data.attributes.name}` || "";
        // proses data lokasi
        const dataLokasi =
          attributes.locations.data.map((location) => {
            return location.attributes.name;
          }) || [];
        const lokasi = dataLokasi.join(", ") || "";

        const {
          SKU,
          buy_price_1,
          buy_price_2,
          buy_price_3,
          buy_price_4,
          buy_price_5,
          description,
          disc_1_1,
          disc_1_2,
          disc_1_3,
          disc_1_4,
          disc_1_5,
          name,
          pricelist_1,
          pricelist_2,
          pricelist_3,
          pricelist_4,
          pricelist_5,
          purchase_discount_1,
          purchase_discount_2,
          purchase_discount_3,
          purchase_discount_4,
          purchase_discount_5,
          qty_1,
          qty_2,
          qty_3,
          qty_4,
          qty_5,
          sold_price_1,
          sold_price_2,
          sold_price_3,
          sold_price_4,
          sold_price_5,
          unit_1,
          unit_2,
          unit_3,
          unit_4,
          unit_5,
          unit_1_dp1,
          unit_1_dp2,
          unit_1_dp3,
          unit_1_dp4,
          unit_1_dp5,
          unit_2_dp1,
          unit_2_dp2,
          unit_2_dp3,
          unit_2_dp4,
          unit_2_dp5,
          unit_3_dp1,
          unit_3_dp2,
          unit_3_dp3,
          unit_3_dp4,
          unit_3_dp5,
          unit_4_dp1,
          unit_4_dp2,
          unit_4_dp3,
          unit_4_dp4,
          unit_4_dp5,
          unit_5_dp1,
          unit_5_dp2,
          unit_5_dp3,
          unit_5_dp4,
          unit_5_dp5,
        } = attributes;
        return [
          {
            value: SKU || "",
            fontSize: 11,
          },
          {
            value: name || "",
            fontSize: 11,
          },
          {
            value: kategori,
            fontSize: 11,
          },
          {
            value: subKategori,
            fontSize: 11,
          },
          {
            value: pabrikasi,
            fontSize: 11,
          },
          {
            value: golongan,
            fontSize: 11,
          },
          {
            value: lokasi,
            fontSize: 11,
          },
          {
            value: description || "",
            fontSize: 11,
          },
          {
            value: unit_1 || "",
            fontSize: 11,
          },
          {
            value: qty_1 || "",
            fontSize: 11,
          },
          {
            value: buy_price_1 || "",
            fontSize: 11,
          },
          {
            value: purchase_discount_1 || "",
            fontSize: 11,
          },
          {
            value: unit_1_dp1 || "",
            fontSize: 11,
          },
          {
            value: unit_1_dp2 || "",
            fontSize: 11,
          },
          {
            value: unit_1_dp3 || "",
            fontSize: 11,
          },
          {
            value: pricelist_1 || "",
            fontSize: 11,
          },
          {
            value: sold_price_1 || "",
            fontSize: 11,
          },
          {
            value: disc_1_1 || "",
            fontSize: 11,
          },
          {
            value: unit_2 || "",
            fontSize: 11,
          },
          {
            value: qty_2 || "",
            fontSize: 11,
          },
          {
            value: buy_price_2 || "",
            fontSize: 11,
          },
          {
            value: purchase_discount_2 || "",
            fontSize: 11,
          },
          {
            value: unit_2_dp1 || "",
            fontSize: 11,
          },
          {
            value: unit_2_dp2 || "",
            fontSize: 11,
          },
          {
            value: unit_2_dp3 || "",
            fontSize: 11,
          },
          {
            value: pricelist_2 || "",
            fontSize: 11,
          },
          {
            value: sold_price_2 || "",
            fontSize: 11,
          },
          {
            value: disc_1_2 || "",
            fontSize: 11,
          },
          {
            value: unit_3 || "",
            fontSize: 11,
          },
          {
            value: qty_3 || "",
            fontSize: 11,
          },
          {
            value: buy_price_3 || "",
            fontSize: 11,
          },
          {
            value: purchase_discount_3 || "",
            fontSize: 11,
          },
          {
            value: unit_3_dp1 || "",
            fontSize: 11,
          },
          {
            value: unit_3_dp2 || "",
            fontSize: 11,
          },
          {
            value: unit_3_dp3 || "",
            fontSize: 11,
          },
          {
            value: pricelist_3 || "",
            fontSize: 11,
          },
          {
            value: sold_price_3 || "",
            fontSize: 11,
          },
          {
            value: disc_1_3 || "",
            fontSize: 11,
          },
          {
            value: unit_4 || "",
            fontSize: 11,
          },
          {
            value: qty_4 || "",
            fontSize: 11,
          },
          {
            value: buy_price_4 || "",
            fontSize: 11,
          },
          {
            value: purchase_discount_4 || "",
            fontSize: 11,
          },
          {
            value: unit_4_dp1 || "",
            fontSize: 11,
          },
          {
            value: unit_4_dp2 || "",
            fontSize: 11,
          },
          {
            value: unit_4_dp3 || "",
            fontSize: 11,
          },
          {
            value: pricelist_4 || "",
            fontSize: 11,
          },
          {
            value: sold_price_4 || "",
            fontSize: 11,
          },
          {
            value: disc_1_4 || "",
            fontSize: 11,
          },
          {
            value: unit_5 || "",
            fontSize: 11,
          },
          {
            value: qty_5 || "",
            fontSize: 11,
          },
          {
            value: buy_price_5 || "",
            fontSize: 11,
          },
          {
            value: purchase_discount_5 || "",
            fontSize: 11,
          },
          {
            value: unit_5_dp1 || "",
            fontSize: 11,
          },
          {
            value: unit_5_dp2 || "",
            fontSize: 11,
          },
          {
            value: unit_5_dp3 || "",
            fontSize: 11,
          },
          {
            value: pricelist_5 || "",
            fontSize: 11,
          },
          {
            value: sold_price_5 || "",
            fontSize: 11,
          },
          {
            value: disc_1_5 || "",
            fontSize: 11,
          },
        ];
      });

      excelData.push(...productData);
    }

    try {
      const writeFile = await writeXlsxFile(excelData, {
        columns: columnsWidth,
        fileName: `Data Produk_${time}.xlsx`,
      });
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  return (
    <>
      {loading ? (
        <div className="w-full flex justify-center items-center h-10">
          <Spin />
        </div>
      ) : (
        <button
          onClick={exportData}
          type="button"
          className="bg-cyan-700 text-xs font-bold text-white w-full rounded h-10 hover:bg-cyan-800  shadow-sm flex items-center justify-center float-right"
        >
          Export Excel
        </button>
      )}
    </>
  );
}

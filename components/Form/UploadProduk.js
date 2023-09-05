import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { productKeys } from "./utils/productKeys";
import { getRelationalData, getLocationsId } from "./utils/getRelationalData";
import nookies from "nookies";
import { toast } from "react-toastify";
import { Progress, Spin, message } from "antd";

export default function UploadProduk({ setProduct }) {
  const [loading, setLoading] = useState(false);
  const [percent, setPercent] = useState(0);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("");

  const postData = async (row) => {
    const cookies = nookies.get(null);
    const endpoint = process.env.NEXT_PUBLIC_URL + "/products";

    try {
      const data = {
        data: row,
      };
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + cookies.token,
        },
        body: JSON.stringify(data),
      };

      console.log("options", options);

      try {
        const req = await fetch(endpoint, options);
        const res = await req.json();

        console.log("res", res);

        if (req.status == 200) {
          return true;
        } else {
          return false;
        }
      } catch (err) {
        console.log(err);
      }
    } catch (err) {
      toast.error("Gagal mengunggah data");
      setLoading(false);
      return false;
    }
  };

  const convertToJson = async (data) => {
    const rows = [];

    for (let i = 0; i < data.length; i++) {
      let rowData = {};
      const row = data[i];

      for (let j = 0; j < row.length; j++) {
        const element = row[j];
        const key = productKeys[j];

        if (j === 0) {
          // SKU
          rowData[key] = `${element}` || "";
          continue;
        }

        if (
          key === "description" ||
          key === "sub_category" ||
          key === "group" ||
          key === "manufacture" ||
          key === "locations" ||
          key === "unit_1" ||
          key === "unit_2" ||
          key === "unit_3" ||
          key === "unit_4" ||
          key === "unit_5"
        ) {
          rowData[key] = element || "";
          continue;
        }

        rowData[key] = element || 0;
      }

      if (!rowData.SKU) {
        return;
      }

      console.log("rowData", rowData);

      // process relational data
      const categoryIdRaw = rowData?.category?.trim() || "";
      const subCategoryIdRaw = typeof rowData?.sub_category === "string" ? rowData?.sub_category?.trim() || "" : null;
      const groupAliasRaw = rowData?.group?.trim() || "";
      const manufactureAliasRaw = rowData?.manufacture?.trim() || "";
      const locationNamesArrRaw = rowData?.locations?.split(",") || [];
      const locationsNamesTrimmed = locationNamesArrRaw.map((item) => item?.trim());

      console.log("manufacture alias", manufactureAliasRaw);

      const categoryId = await getRelationalData("categories", "name", categoryIdRaw);
      const subCategoryId = await getRelationalData("sub-categories", "name", subCategoryIdRaw);
      const groupId = await getRelationalData("groups", "name", groupAliasRaw);
      const manufactureId = await getRelationalData("manufactures", "name", manufactureAliasRaw);
      const locationsId = await getLocationsId(locationsNamesTrimmed);

      rowData = {
        ...rowData,
        category: categoryId,
        sub_category: subCategoryId,
        group: groupId,
        manufacture: manufactureId,
        locations: locationsId,
      };

      const success = await postData(rowData);

      if (!success) {
        setLoading(false);
        break;
      }

      rows.push(rowData);
    }

    return rows;
  };

  const importExcel = (e) => {
    const cookies = nookies.get(null);
    setLoading(true);

    message.loading({
      content: "Memproses data excel, jangan tutup halaman ini...",
      key: "process",
      duration: 300 * 1000,
    });
    try {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = async (event) => {
        const bstr = event.target.result;
        const workbook = XLSX.read(bstr, { type: "binary" });
        const workSheetName = workbook.SheetNames[0];
        const workSheet = workbook.Sheets[workSheetName];
        const fileData = XLSX.utils.sheet_to_json(workSheet, { header: 1 });
        fileData.splice(0, 2);
        const rowsData = await convertToJson(fileData);

        if (rowsData.length === fileData.length) {
          const endpointProduct = process.env.NEXT_PUBLIC_URL + "/products?populate=*";

          const optionsAllProduct = {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + cookies.token,
            },
          };

          const reqProduct = await fetch(endpointProduct, optionsAllProduct);
          const resProduct = await reqProduct.json();

          setProduct(resProduct);

          message.success({
            content: "Berhasil mengunggah data",
            key: "process",
            duration: 2,
          });

          setLoading(false);
        } else {
          message.error({
            content: "Gagal mengunggah data",
            key: "process",
            duration: 2,
          });
          setLoading(false);
        }
      };
      reader.readAsBinaryString(file);
    } catch (err) {
      setError("gagal ges ges");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (percent >= 100) {
      toast.success("Berhasil mengunggah data");
      setLoading(false);
      setPercent(0);
    }
  }, [percent]);

  useEffect(() => {
    if (error !== null) {
      toast.error(error);
      setTimeout(() => {
        setError(null);
      }, 2000);
    }
  }, [error]);

  return loading ? (
    <div className="flex flex-col items-center justify-center w-full">
      <Spin />
    </div>
  ) : (
    <>
      <label
        htmlFor="upload_file"
        className="bg-cyan-700 cursor-pointer text-xs font-bold text-white w-full rounded h-10 hover:bg-cyan-800  shadow-sm flex items-center justify-center float-right"
      >
        Upload
      </label>
      <input onChange={importExcel} type="file" id="upload_file" hidden />
    </>
  );
}

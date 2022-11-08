import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { productKeys } from "./utils/productKeys";
import { getRelationalData, getLocationsId } from "./utils/getRelationalData";
import nookies from "nookies";
import { toast } from "react-toastify";
import { Progress } from "antd";

export default function UploadProduk({ setProduct }) {
  const [loading, setLoading] = useState(false);
  const [percent, setPercent] = useState(0);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("");

  console.log("percent", percent);

  const postData = (data) => {
    let increment = 100 / data.length;
    console.log("increment", increment);
    const cookies = nookies.get(null);
    const endpoint = process.env.NEXT_PUBLIC_URL + "/products";

    try {
      data.forEach(async (row, idx) => {
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

          setPercent((prev) => Math.round(prev + increment));

          if (req.status == 200) {
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
          }
        } catch (err) {
          console.log(err);
        }
      });
    } catch (err) {
      toast.error("Gagal mengunggah data");
      setLoading(false);
    }
  };

  const convertToJson = async (data) => {
    const rows = data.map(async (row) => {
      let rowData = {};
      row.forEach((element, index) => {
        rowData[productKeys[index]] = element;
      });

      if (!rowData.SKU) {
        return;
      }

      // process relational data
      const categoryIdRaw = rowData?.category?.split("-")[0].trim() || "";
      const subCategoryIdRaw = rowData?.sub_category?.split("-")[0].trim() || "";
      const groupAliasRaw = rowData?.group?.split("-")[0].trim() || "";
      const manufactureAliasRaw = rowData?.manufacture?.split("-")[0].trim() || "";
      const locationNamesArrRaw = rowData?.locations?.split(",") || [];
      const locationsNamesTrimmed = locationNamesArrRaw.map((item) => item?.trim());

      console.log("manufacture alias", manufactureAliasRaw);

      const categoryId = await getRelationalData("categories", "category_id", categoryIdRaw);
      const subCategoryId = await getRelationalData("sub-categories", "sub_id", subCategoryIdRaw);
      const groupId = await getRelationalData("groups", "alias", groupAliasRaw);
      const manufactureId = await getRelationalData("manufactures", "code", manufactureAliasRaw);
      const locationsId = await getLocationsId(locationsNamesTrimmed);

      rowData = {
        ...rowData,
        category: categoryId,
        sub_category: subCategoryId,
        group: groupId,
        manufacture: manufactureId,
        locations: locationsId,
      };

      return rowData;
    });

    const resolvedRows = await Promise.all(rows);
    return resolvedRows;
  };

  const importExcel = (e) => {
    setLoading(true);

    console.log(e.target.files);
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
        postData(rowsData);
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
      <Progress type="circle" width={35} percent={percent} status={status} />
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

import { UploadOutlined } from "@ant-design/icons";
import { Button, Image, message, Space, Upload } from "antd";
import React, { useRef, useState } from "react";
import moment from "moment";
import { PhotoProvider, PhotoView } from "react-photo-view";

export default function UploadDokumen({ setFile, imageUrl, setImageUrl }) {
  const [loading, setLoading] = useState(false);
  const uploadRef = useRef(null);

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("Harap upload file JPG/PNG");
    }

    return isJpgOrPng;
  };

  function onChange(info) {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      setFile(info.file.originFileObj);
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        console.log(url);
        setImageUrl(url);
      });
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  }

  const handleUploadRef = () => {
    uploadRef.current.click();
  };

  return (
    <div className="h-full w-full">
      {imageUrl ? (
        <PhotoProvider>
          <PhotoView src={imageUrl}>
            <img className="cursor-pointer" src={imageUrl} alt="" />
          </PhotoView>
        </PhotoProvider>
      ) : (
        <div
          onClick={handleUploadRef}
          className="group h-[85.5%] border cursor-pointer border-dashed hover:border-blue-400 duration-150 flex justify-center items-center"
        >
          <p className="text-gray-300 text-xl cursor-pointer group-hover:text-blue-400 duration-150">Upload Gambar</p>
        </div>
      )}
      <Upload
        onRemove={() => {
          setImageUrl(null);
          setFile(null);
        }}
        maxCount={1}
        style={{ width: "100%" }}
        beforeUpload={beforeUpload}
        onChange={onChange}
      >
        <Button style={{ margin: 0 }} ref={uploadRef} hidden></Button>
      </Upload>
      <Button block={true} onClick={handleUploadRef} icon={<UploadOutlined />}>
        Select Image
      </Button>
    </div>
  );
}

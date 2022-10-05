import Barcode from "react-jsbarcode";
import { QRCodeSVG } from "qrcode.react";
import UnitTableView from "../../components/ReactDataTable/Product/UnitsTableView";

export default function ProductModal({ data }) {
  const product = data.attributes;

  function formatMyDate(value, locale = "id-ID") {
    return new Date(value).toLocaleDateString(locale);
  }

  return (
    <div>
      <div>
        <h5 className="text-center font-bold mb-5">LIHAT PRODUK</h5>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:mt-5">
        <div className="grid grid-cols-2 gap-2">
          <div className="...">NAMA</div>
          <div className="...">{product?.name}</div>
          <div className="...">SKU</div>
          <div className="...">{product?.SKU}</div>
          <div className="...">KATEGORI</div>

          <div className="...">{`${
            product?.category?.data?.attributes?.name ?? "-"
          } (${product?.category?.data?.attributes?.category_id ?? ""}) `}</div>
          <div className="...">PABRIKASI</div>
          <div className="...">{`${
            product?.manufacture?.data?.attributes?.name ?? "-"
          } (${product?.manufacture?.data?.attributes?.alias ?? ""}) `}</div>
          <div className="...">GOLONGAN</div>
          <div className="...">{`${
            product?.group?.data?.attributes?.name ?? "-"
          } (${product?.group?.data?.attributes?.alias ?? ""})`}</div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="...">DIBUAT PADA</div>
          <div className="...">{formatMyDate(product?.createdAt)}</div>
          <div className="...">DESKRIPSI</div>
          <div className="...">{`${product?.description}`}</div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <Barcode
            value={product?.SKU}
            options={{ format: "code128", width: "2px", height: "50px" }}
            renderer="svg"
          />
          <QRCodeSVG
            className="ml-5"
            height={80}
            width={80}
            value={product?.SKU}
          />
        </div>
      </div>
      <UnitTableView initialValue={product} />
    </div>
  );
}

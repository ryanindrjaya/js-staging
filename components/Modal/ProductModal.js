import Barcode from "react-jsbarcode";
import { QRCodeSVG } from "qrcode.react";
import UnitTableView from "../../components/ReactDataTable/Product/UnitsTableView";
import InventoryTable from "../../components/ReactDataTable/Product/InventoryTable";
import LoadingAnimations from "../Animations/Loading";
import moment from "moment";
import "moment/locale/id";

export default function ProductModal({ data, isLoading, inventory }) {
  moment.locale("id");
  const product = data.attributes;
  const productId = data.id;
  function formatMyDate(value, locale = "id-ID") {
    return new Date(value).toLocaleDateString(locale);
  }

  return (
    <div>
      <div>
        <h5 className="text-center font-bold mb-5 text-[#036B82]">LIHAT PRODUK</h5>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:mt-5">
        <div className="grid grid-cols-2 gap-2">
          <div className="...">NAMA</div>
          <div className="...">{product?.name}</div>
          <div className="...">SKU</div>
          <div className="...">{product?.SKU}</div>
          <div className="...">KATEGORI</div>
          <div className="...">{`${product?.category?.data?.attributes?.name ?? "-"} (${
            product?.category?.data?.attributes?.category_id ?? ""
          }) `}</div>
          <div className="...">PABRIKASI</div>
          <div className="...">{`${product?.manufacture?.data?.attributes?.name ?? "-"} (${
            product?.manufacture?.data?.attributes?.alias ?? ""
          }) `}</div>
          <div className="...">GOLONGAN</div>
          <div className="...">{`${product?.group?.data?.attributes?.name ?? "-"} (${product?.group?.data?.attributes?.alias ?? ""})`}</div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="...">DIBUAT PADA</div>
          <div className="... uppercase">{moment(product?.createdAt).format("LL")}</div>
          <div className="... col-span-2">
            <p>DESKRIPSI</p>
            <div className="... -mt-1">{`${product?.description || "-"}`}</div>
          </div>
        </div>
        {product?.SKU && (
          <div className="flex flex-col items-center gap-y-5 flex-wrap -mx-3 mb-6">
            <Barcode value={product?.SKU} options={{ format: "code128", width: "2px", height: "50px" }} renderer="svg" />
            <QRCodeSVG className="ml-5" height={100} width={100} value={product?.SKU} />
          </div>
        )}
      </div>
      <UnitTableView initialValue={product} />
      {isLoading ? (
        <div>
          <div className="w-36 h-36 flex  max-w-sm mx-auto">
            <LoadingAnimations />
          </div>
          <div className="w-full flex justify-center text-slate-300">Mengambil riwayat stok..</div>
        </div>
      ) : (
        <InventoryTable data={inventory} productId={productId} />
      )}
    </div>
  );
}

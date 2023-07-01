import DataTable from "react-data-table-component";
import AlertDialog from "../../Alert/Alert";
import { Popover, Select, Row, Tag, notification } from "antd";
import {
  EditOutlined,
  PrinterOutlined,
  UnorderedListOutlined,
  CalculatorOutlined,
  CloseOutlined,
  BarcodeOutlined,
  BankOutlined,
  UndoOutlined,
  SyncOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/router";
import { InventoryOutFromNonPanel, InventoryOutFromPanel } from "../../../library/functions/createInventory";
import { useState } from "react";
import nookies from "nookies";

export default function ReactDataTable({
  data,
  onDelete,
  onPageChange,
  onChangeStatusPengiriman,
  onChangeStatus,
  returPage,
  page,
  updateStock,
}) {
  const [loadingPiutang, setLoadingPiutang] = useState(false);
  const router = useRouter();
  const { Option } = Select;

  const tagRed = process.env.TAG_RED;
  const tagGreen = process.env.TAG_GREEN;
  const tagOrange = process.env.TAG_ORANGE;

  const openNotificationWithIcon = (type, title, message) => {
    notification[type]({
      message: title,
      description: message,
    });
  };

  const lihat = (row) => {
    openNotificationWithIcon(
      "info",
      "Work In Progress",
      "Hai, Fitur ini sedang dikerjakan. Silahkan tunggu pembaruan selanjutnya"
    );
    //router.push("order_pembelian/print/" + row.id);
  };

  const handleEdit = (row) => {
    if (page == "nonpanel") router.push("non_panel/edit/" + row.id);
    if (page == "panel") router.push("panel/edit/" + row.id);
    if (page == "toko") router.push("toko/edit/" + row.id);
  };

  const handleChangeStatus = async (row) => {
    const cookies = nookies.get(null);

    const endpoint = page === "nonpanel" ? "/non-panel-sales" : "/panel-sales";
    const url = process.env.NEXT_PUBLIC_URL + endpoint + "/" + row.id;

    const status = {
      data: {
        status_data: "Publish",
      },
    };

    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookies.token,
      },
      body: JSON.stringify(status),
    };

    const req = await fetch(url, options);
    const res = await req.json();

    console.log("change status", res);

    if (res?.data?.id) {
      return true;
    } else {
      return false;
    }
  };

  const handlePiutang = async (row, page) => {
    try {
      if (row.attributes.status_data === "Draft") {
        setLoadingPiutang(true);

        let out = false;
        let changeStatus = false;

        const customer = row.attributes.customer.data.attributes.name;
        const location = row.attributes.location.data.attributes.name;

        changeStatus = await handleChangeStatus(row);

        if (page == "nonpanel" && changeStatus) {
          out = await InventoryOutFromNonPanel(row.id, customer, location);
        } else if (page == "panel" && changeStatus) {
          out = await InventoryOutFromPanel(row.id, customer, location);
        }

        if (out && changeStatus) {
          openNotificationWithIcon(
            "success",
            "Dijadikan Piutang",
            "Data berhasil dijadikan Piutang, dan stok inventory telah dikurangi"
          );
          router.push("/dashboard/penjualan/" + page);
        } else {
          openNotificationWithIcon("error", "Error", "Data gagal dijadikan Piutang");
          setLoadingPiutang(false);
        }
      } else {
        notification.error({
          message: "Error",
          description: "Data sudah fix, tidak dapat dilakukan perubahan.",
        });
      }
    } catch (err) {
      setLoadingPiutang(false);
      console.log(err);
      notification.error({
        message: "Error",
        description: "Data gagal dijadikan Piutang",
      });
    }
  };

  const print = (row) => {
    if (page == "panel") router.push("/dashboard/penjualan/panel/print/" + row.id);
    else if (page == "nonpanel") router.push("/dashboard/penjualan/non_panel/print/" + row.id);
    else {
      router.push("/dashboard/penjualan/toko/print/" + row.id);
    }
  };

  const returPenjualan = (row) => {
    if (row.attributes.status == "Dibayar" || row.attributes.status == "Dibayar Sebagian") {
      if (returPage == "toko") router.push("toko/retur/" + row.id);
      if (returPage == "sales") router.push("sales/retur/" + row.id);
      if (returPage == "nonpanel") router.push("non_panel/retur/" + row.id);
      if (returPage == "panel") router.push("panel/retur/" + row.id);
    } else {
      const message =
        row.attributes.status === "Diretur"
          ? "Karena status lembar pembelian barang sudah diretur."
          : row.attributes.status === "Belum Dibayar"
          ? "Karena status retur harus sudah dibayar."
          : "Tidak bisa melakukan retur";

      openNotificationWithIcon("error", "Maaf tidak bisa diretur", message);
    }
  };

  const onConfirm = (id) => {
    console.log(id);
    onDelete(id);
  };

  const onCancel = () => {
    console.log("onCancel");
  };

  function formatMyDate(value, locale = "id-ID") {
    return new Date(value).toLocaleDateString(locale);
  }

  var formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 2,
  });

  function printReturPenjualan(row) {
    const returId = row.attributes.retur_store_sale?.data?.id;

    if (returId) {
      if (returPage == "toko") router.push("toko/retur/print/" + returId);
      if (returPage == "sales") router.push("sales/retur/print/" + row.id);
      if (returPage == "nonpanel") router.push("non_panel/retur/print/" + row.id);
      if (returPage == "panel") router.push("panel/retur/print/" + row.id);
    } else {
      openNotificationWithIcon(
        "error",
        "Maaf tidak bisa dicetak",
        "Data retur belum ada, silahkan buat retur terlebih dahulu"
      );
    }
  }

  const content = (row) => {
    if (page == "panel" || page == "nonpanel") {
      return (
        <div>
          <div>
            <button
              onClick={() => print(row)}
              className=" hover:text-cyan-700 transition-colors  text-xs font-normal py-2 px-2 rounded-md "
            >
              <PrinterOutlined className="mr-2 mt-0.5 float float-left" />
              Cetak
            </button>
          </div>

          {row.attributes.status_data != "Draft" ? (
            <></>
          ) : (
            <div>
              <button
                onClick={() => handleEdit(row)}
                className=" hover:text-cyan-700 transition-colors  text-xs font-normal py-2 px-2 rounded-md "
              >
                <EditOutlined className="mr-2 mt-0.5 float float-left" />
                Edit
              </button>
            </div>
          )}

          <div>
            <button
              onClick={() => handlePiutang(row, page)}
              className=" hover:text-cyan-700 transition-colors  text-xs font-normal py-2 px-2 rounded-md "
            >
              {loadingPiutang ? (
                <LoadingOutlined className="mr-2 mt-0.5 float float-left animate-spin" />
              ) : (
                <CalculatorOutlined className="mr-2 mt-0.5 float float-left" />
              )}
              Jadikan Piutang
            </button>
          </div>
          <div>
            <button
              onClick={() => lihat(row)}
              className=" hover:text-cyan-700 transition-colors  text-xs font-normal py-2 px-2 rounded-md "
            >
              <BankOutlined className="mr-2 mt-0.5 float float-left" />
              Pembayaran
            </button>
          </div>
          <div>
            <button
              onClick={() => lihat(row)}
              className=" hover:text-cyan-700 transition-colors  text-xs font-normal py-2 px-2 rounded-md "
            >
              <UnorderedListOutlined className="mr-2 mt-0.5 float float-left" />
              Melihat Pembayaran
            </button>
          </div>
          <div>
            <button
              onClick={() => returPenjualan(row)}
              className=" hover:text-cyan-700 transition-colors  text-xs font-normal py-2 px-2 rounded-md "
            >
              <UndoOutlined className="mr-2 mt-0.5 float float-left" />
              Retur Penjualan
            </button>
          </div>

          {row.attributes.status_data != "Draft" ? (
            <></>
          ) : (
            //<div>
            //  <button
            //    onClick={() => lihat(row)}
            //    className=" hover:text-cyan-700 transition-colors  text-xs font-normal py-2 px-2 rounded-md "
            //  >
            //    <CloseOutlined className="mr-2 mt-0.5 float float-left" />
            //    Batal
            //  </button>
            //</div>
            <AlertDialog
              onCancel={onCancel}
              onConfirm={onConfirm}
              title="Hapus Kategori"
              message="Kategori yang dihapus tidak dapat dikembalikan lagi. Lanjutkan?"
              id={row}
            />
          )}
        </div>
      );
    } else if (page === "toko") {
      return (
        <div>
          <div>
            <button
              onClick={() => print(row)}
              className=" hover:text-cyan-700 transition-colors  text-xs font-normal py-2 px-2 rounded-md "
            >
              <PrinterOutlined className="mr-2 mt-0.5 float float-left" />
              Cetak
            </button>
          </div>

          {row.attributes.status === "Dibayar" ? (
            <></>
          ) : row?.attributes?.retur_store_sale?.data?.id ? (
            <></>
          ) : (
            <div>
              <button
                onClick={() => handleEdit(row)}
                className=" hover:text-cyan-700 transition-colors  text-xs font-normal py-2 px-2 rounded-md "
              >
                <EditOutlined className="mr-2 mt-0.5 float float-left" />
                Edit
              </button>
            </div>
          )}

          {row?.attributes?.retur_store_sale?.data?.id ? (
            <div>
              <button
                onClick={() => printReturPenjualan(row)}
                className=" hover:text-cyan-700 transition-colors  text-xs font-normal py-2 px-2 rounded-md "
              >
                <UndoOutlined className="mr-2 mt-0.5 float float-left" />
                Cetak Retur Penjualan
              </button>
            </div>
          ) : (
            <div>
              <button
                onClick={() => returPenjualan(row)}
                className=" hover:text-cyan-700 transition-colors  text-xs font-normal py-2 px-2 rounded-md "
              >
                <UndoOutlined className="mr-2 mt-0.5 float float-left" />
                Retur Penjualan
              </button>
            </div>
          )}

          <AlertDialog
            onCancel={onCancel}
            onConfirm={onConfirm}
            title="Hapus Kategori"
            message="Kategori yang dihapus tidak dapat dikembalikan lagi. Lanjutkan?"
            id={row.id}
          />
        </div>
      );
    } else {
      return (
        <div>
          <div>
            <button
              onClick={() => print(row)}
              className=" hover:text-cyan-700 transition-colors  text-xs font-normal py-2 px-2 rounded-md "
            >
              <PrinterOutlined className="mr-2 mt-0.5 float float-left" />
              Cetak
            </button>
          </div>

          <div>
            <button
              onClick={() => returPenjualan(row)}
              className=" hover:text-cyan-700 transition-colors  text-xs font-normal py-2 px-2 rounded-md "
            >
              <UndoOutlined className="mr-2 mt-0.5 float float-left" />
              Retur Penjualan
            </button>
          </div>

          <AlertDialog
            onCancel={onCancel}
            onConfirm={onConfirm}
            title="Hapus Kategori"
            message="Kategori yang dihapus tidak dapat dikembalikan lagi. Lanjutkan?"
            id={row.id}
          />
        </div>
      );
    }
  };

  const customStyles = {
    headerStyle: { textAlign: "center" },
    headCells: {
      style: {
        color: "white",
        background: "#036B82",
      },
    },
  };

  const columns = [
    {
      name: "Tindakan",
      width: "150px",
      selector: (row) => (
        <>
          <Popover content={content(row)} placement="bottom" trigger="click">
            <button className=" text-cyan-700  transition-colors  text-xs font-normal py-2 rounded-md ">
              Tindakan
            </button>
          </Popover>
        </>
      ),
    },
    {
      name: "Tanggal",
      width: "150px",
      selector: (row) => formatMyDate(row.attributes?.sale_date),
    },
    {
      name: "Customer",
      width: "180px",
      selector: (row) => {
        if (page == "panel" || page == "nonpanel") return row.attributes?.customer?.data?.attributes?.name ?? "-";
        else return row.attributes?.customer_name ?? "-";
      },
    },
    {
      name: "No Faktur",
      width: "180px",
      selector: (row) => row.attributes?.no_store_sale || row.attributes?.no_sales_sale || "-",
    },
    {
      name: <div className="">Status</div>,
      width: "150px",
      selector: (row) => {
        // return tag if status == belum dibayar, give it a red color. else give it a green color
        if (row.attributes?.status == "Belum Dibayar") {
          return <Tag color="red">{row.attributes?.status}</Tag>;
        } else if (row.attributes?.status == "Diretur") {
          return <Tag color="orange">{row.attributes?.status}</Tag>;
        } else if (row.attributes?.status == "Dibayar Sebagian") {
          return <Tag>{row.attributes?.status}</Tag>;
        } else if (row.attributes?.retur_store_sale?.data?.id) {
          return <Tag color="orange">Diretur</Tag>;
        } else {
          return <Tag color="green">{row.attributes?.status}</Tag>;
        }
      },
    },
    {
      name: "Metode Pembayaran",
      width: "180px",
      selector: (row) => {
        const dataPaymentMethod =
          row?.attributes?.store_payments?.data?.map((payment) => payment?.attributes?.payment_method).join(", ") ??
          null;

        console.log(row.id, row?.attributes?.store_payments?.data);
        return dataPaymentMethod;
      },
    },
    {
      name: "Jumlah Total",
      width: "180px",
      selector: (row) => formatter.format(row.attributes?.total ?? "-"),
    },
    {
      name: "Total Dibayar",
      width: "180px",
      selector: (row) => {
        const dataPayment = row?.attributes?.store_payments?.data ?? [];

        const dataPaymentValue =
          dataPayment.length > 1
            ? dataPayment.reduce((acc, curr) => parseFloat(acc) + parseFloat(curr.attributes.payment), 0)
            : dataPayment.length === 1
            ? dataPayment[0].attributes.payment
            : 0;

        return formatter.format(dataPaymentValue);
      },
    },
    {
      name: "Kembalian",
      width: "200px",
      selector: (row) => {
        const totalHarga = row.attributes?.total ?? 0;
        const dataPayment = row?.attributes?.store_payments?.data ?? [];

        if (row.attributes.status === "Dibayar") {
          const dataPaymentValue = dataPayment.reduce(
            (acc, curr) => parseInt(acc) + parseInt(curr.attributes.payment),
            0
          );
          const kembali = dataPaymentValue - totalHarga < 0 ? 0 : dataPaymentValue - totalHarga;

          return formatter.format(kembali);
        }

        return formatter.format(0);
      },
    },

    {
      name: "Lokasi Penjualan",
      width: "180px",
      //selector: (row) => row.attributes?.supplier.data.attributes.name ?? "-",
      selector: (row) => row.attributes?.location.data.attributes.name ?? "-",
    },
    {
      name: "Catatan Staff",
      width: "180px",
      selector: (row) => row.attributes?.sale_staff ?? "-",
    },
    {
      name: "Catatan Penjualan",
      width: "180px",
      selector: (row) => row.attributes?.sale_note ?? "-",
    },
    {
      name: "Ditambah Oleh",
      width: "180px",
      selector: (row) => row.attributes?.added_by ?? "-",
    },
  ];

  return (
    <DataTable
      customStyles={customStyles}
      onChangePage={onPageChange}
      paginationRowsPerPageOptions={[10]}
      paginationTotalRows={data?.meta?.pagination?.total}
      columns={columns}
      data={data.data}
      pagination
      noDataComponent={"Belum ada data Penjualan"}
    />
  );
}

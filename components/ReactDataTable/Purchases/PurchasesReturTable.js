import DataTable from "react-data-table-component";
import AlertDialog from "../../Alert/Alert";
import { Popover, Select, Row, Tag, notification, Modal, Input, message } from "antd";
import { EditOutlined, PrinterOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { useState } from "react";
import createInventoryRetur from "../../../pages/dashboard/pembelian/utility/createInventoryRetur";
import nookies from "nookies";

export default function ReactDataTable({ data, onDelete, onPageChange, onChangeStatusPengiriman, onChangeStatus }) {
  const router = useRouter();
  console.log("data index", data);
  const { Option } = Select;
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editStatus, setEditStatus] = useState(false);

  const { TextArea } = Input;
  var formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 2,
  });

  const openNotificationWithIcon = (type, title, message) => {
    notification[type]({
      message: title,
      description: message,
    });
  };

  const print = (row) => {
    router.push("/dashboard/pembelian/retur/print/" + row.id);
  };

  const lihat = (row) => {
    //openNotificationWithIcon("info", "Work In Progress", "Hai, Fitur ini sedang dikerjakan. Silahkan tunggu pembaruan selanjutnya");
    router.push("/dashboard/pembelian/retur/print/" + row.id);
  };

  const edit = (row) => {
    //openNotificationWithIcon("info", "Work In Progress", "Hai, Fitur ini sedang dikerjakan. Silahkan tunggu pembaruan selanjutnya");
    router.push("/dashboard/pembelian/retur/edit/" + row.id);
  };

  const returLpb = (row) => {
    //openNotificationWithIcon("info", "Work In Progress", "Hai, Fitur ini sedang dikerjakan. Silahkan tunggu pembaruan selanjutnya");
    router.push("retur/returLpb/" + row.id);
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

  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
    //this.myFormRef.reset();
  };

  const openModal = (id) => {
    router.replace(
      {
        pathname: "/dashboard/pembelian/retur",
        query: { id: id },
      },
      undefined,
      { shallow: true }
    );
  };

  const content = (row) => (
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
          onClick={() => lihat(row)}
          className=" hover:text-cyan-700 transition-colors  text-xs font-normal py-2 px-2 rounded-md "
        >
          <UnorderedListOutlined className="mr-2 mt-0.5 float float-left" />
          Lihat
        </button>
      </div>

      {row.attributes.status === "Selesai" ? (
        <div hidden></div>
      ) : (
        <div>
          <button
            onClick={() => edit(row)}
            className=" hover:text-cyan-700 transition-colors  text-xs font-normal py-2 px-2 rounded-md "
          >
            <EditOutlined className="mr-2 mt-0.5 float float-left" />
            Edit
          </button>
        </div>
      )}

      <div>
        <Modal
          title="Pembayaran Retur Pembelian"
          open={open}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
          footer={[
            <button
              className="border border-cyan-700 rounded-md m-1 text-sm px-6 py-2"
              key="back"
              onClick={handleCancel}
            >
              Cancel
            </button>,
            <button
              className="bg-cyan-700 rounded-md m-1 text-sm px-4"
              key="submit"
              loading={loading}
              onClick={handleOk}
            >
              <p className="px-4 py-2 m-0 text-white">SIMPAN</p>
            </button>,
          ]}
        >
          <div className="w-full flex justify-start">
            <div className="w-full md:w-1/3 px-3 mb-2 md:mb-0 text-left">
              <span className="font-bold">Supplier : </span>
            </div>
            <div className="w-full md:w-1/3 px-3 mb-2 md:mb-0 text-center">
              <span className="font-bold">Nomer : </span>
            </div>
            <div className="w-full md:w-1/3 px-3 mb-2 md:mb-0 text-right">
              <span className="font-bold">Jumlah Total : </span>
            </div>
          </div>

          <div className="w-full flex justify-start">
            <div className="w-full md:w-1/3 px-3 mb-2 md:mb-0 text-left">
              <span className="font-bold">alamat</span>
            </div>
            <div className="w-full md:w-1/3 px-3 mb-2 md:mb-0 text-center">
              <div>
                <span className="font-bold">Tanggal : </span>
              </div>
              <div>
                <span className="font-bold">Lokasi Gudang : </span>
              </div>
            </div>
            <div className="w-full md:w-1/3 px-3 mb-2 md:mb-0 text-right">
              <span className="font-bold">Catatan : </span>
              <span className="font-bold">Pembayaran : </span>
            </div>
          </div>

          <div className="w-full flex justify-start">
            <TextArea rows={4} placeholder="Catatan Tambahan" />
          </div>
        </Modal>
      </div>

      {row.attributes.status === "Selesai" ? (
        <div hidden></div>
      ) : (
        <AlertDialog
          buttonText="Batalkan"
          onCancel={onCancel}
          onConfirm={onConfirm}
          title="Batalkan Retur Pembelian"
          message="Transaksi return akan dirubah menjadi status dibatalkan. Lanjutkan?"
          id={row.id}
        />
      )}
    </div>
  );

  const customStyles = {
    headerStyle: { textAlign: "center" },
    headCells: {
      style: {
        color: "white",
        background: "#036B82",
      },
    },
  };

  const changeStatus = async (row, status) => {
    const cookies = nookies.get(null);
    try {
      if (status === "Selesai") {
        const success = await createInventoryRetur(row);

        if (!success) {
          message.error("Gagal membuat retur");
          return;
        }
      }

      const endpoint = `${process.env.NEXT_PUBLIC_URL}/returs/${row.id}`;
      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.token}`,
        },
        body: JSON.stringify({
          data: {
            status: status,
          },
        }),
      };

      const res = await fetch(endpoint, options);
      const data = await res.json();

      if (data?.data) {
        message.success("Status berhasil diubah");
        router.reload();
      } else {
        message.error("Status gagal diubah");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    {
      name: "Tindakan",
      width: "150px",
      selector: (row) => {
        return (
          <>
            <Popover content={content(row)} placement="bottom" trigger="click">
              <button className=" text-cyan-700  transition-colors  text-xs font-normal py-2 rounded-md ">
                Tindakan
              </button>
            </Popover>
          </>
        );
      },
    },
    {
      name: "Tanggal",
      width: "150px",
      selector: (row) => formatMyDate(row.attributes?.tanggal_retur),
    },
    {
      name: "Status",
      width: "150px",
      selector: (row) => {
        return (
          <Select
            className="p-0"
            disabled={row.attributes.status === "Selesai"}
            onChange={(value) => {
              changeStatus(row, value);
            }}
            value={row.attributes.status}
          >
            <Select.Option value="Selesai">
              <Tag color="green">Selesai</Tag>
            </Select.Option>
            <Select.Option value="Draft">
              <Tag color="orange">Draft</Tag>
            </Select.Option>
          </Select>
        );
      },
    },

    {
      name: "No Retur",
      width: "180px",
      selector: (row) => row.attributes?.no_retur ?? "-",
    },
    {
      name: "NO LPB",
      width: "180px",
      selector: (row) => row.attributes.purchasing?.data?.attributes?.no_purchasing ?? "-",
    },
    {
      name: "Lokasi",
      width: "200px",
      selector: (row) => row.attributes?.location?.data?.attributes?.name,
    },
    {
      name: "Supplier",
      width: "180px",
      selector: (row) => row.attributes?.supplier?.data?.attributes?.name ?? "-",
    },

    {
      name: "Grand Total",
      width: "180px",
      selector: (row) => {
        const LPBTotal = row.attributes?.purchasing?.data?.attributes?.total_purchasing;

        return formatter.format(LPBTotal);
      },
    },
    {
      name: "Pembayaran",
      width: "180px",
      selector: (row) => {
        let returTotal = row.attributes?.total_price;
        return formatter.format(returTotal);
      },
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
      noDataComponent={"Belum ada data Retur Pembelian"}
      highlightOnHover
      onRowClicked={(row) => openModal(row.id)}
    />
  );
}

import { Popover } from "antd";
import DataTable from "react-data-table-component";
import AlertDialog from "../Alert/Alert";
import { EditOutlined, BarsOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";

export default function ReactDataTable({ data, onDelete, onUpdate }) {
  const router = useRouter();
  const onConfirm = (id) => {
    onDelete(id);
  };

  const onCancel = () => {
    console.log("onCancel");
  };

  const onEdit = (id) => {
    onUpdate(id);
  };

  const customStyles = {
    headCells: {
      style: {
        color: "white",
        background: "#036B82",
      },
    },
  };

  const openModal = (id) => {
    router.replace(
      {
        pathname: "/dashboard/customer",
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
          onClick={() => openModal(row.id)}
          className=" hover:text-cyan-700 transition-colors  text-xs font-normal py-2 px-2 rounded-md "
        >
          <BarsOutlined className="mr-2 mt-0.5 float float-left" />
          Lihat
        </button>
      </div>
      <button
        onClick={() => onEdit(row.id)}
        className=" hover:text-cyan-700 transition-colors  text-xs font-normal py-2 px-2 rounded-md "
      >
        <EditOutlined className="mr-2 mt-0.5 float float-left" />
        Edit
      </button>
      <AlertDialog
        onCancel={onCancel}
        onConfirm={onConfirm}
        title="Hapus Kategori"
        message="Kategori yang dihapus tidak dapat dikembalikan lagi. Lanjutkan?"
        id={row.id}
      />
    </div>
  );

  const columns = [
    {
      name: "Kode Customer",
      sortable: true,
      width: "140px",
      selector: ({ attributes }) => attributes.code,
    },
    {
      name: "Nama Customer",
      width: "140px",
      sortable: true,
      selector: ({ attributes }) => attributes.name,
    },
    {
      name: "Alamat",
      selector: ({ attributes }) => attributes.address,
    },
    {
      name: "Tipe Penjualan",
      sortable: true,
      width: "140px",
      selector: ({ attributes }) =>
        attributes?.tipe_penjualan?.map((item) => item)?.join(", ") || "-",
    },
    {
      name: "Nama Sales",
      width: "140px",
      sortable: true,
      selector: ({ attributes }) => attributes?.sales_name || "admin",
    },
    {
      name: "Area",
      sortable: true,
      selector: ({ attributes }) => attributes?.area?.data?.attributes?.name || "tes area",
    },
    {
      name: "Wilayah",
      sortable: true,
      selector: ({ attributes }) => attributes?.wilayah?.data?.attributes?.name || "tes wilayah",
    },
    {
      name: "Batas Kredit",
      width: "140px",
      sortable: true,
      selector: ({ attributes }) =>
        `${attributes?.credit_limit || 0}`.replace(/\B(?=(\d{3})+(?!\d))/g, ","),
    },
    {
      name: "Tindakan",
      selector: (row) => (
        <>
          <Popover content={content(row)} placement="bottom">
            <button className=" text-cyan-700  transition-colors  text-xs font-normal py-2 rounded-md ">
              Tindakan
            </button>
          </Popover>
        </>
      ),
    },
  ];

  return (
    <DataTable
      customStyles={customStyles}
      columns={columns}
      data={data}
      paginationRowsPerPageOptions={[50]}
      noDataComponent={`--Belum ada data customer--`}
      onRowClicked={(row) => openModal(row.id)}
      highlightOnHover
      pointerOnHover
      //pagination
    />
  );
}

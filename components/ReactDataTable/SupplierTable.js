import DataTable from "react-data-table-component";
import AlertDialog from "../Alert/Alert";
import { Popover } from "antd";
import { EditOutlined, BarsOutlined } from "@ant-design/icons";

export default function ReactDataTable({
  data,
  onDelete,
  onUpdate,
  onPageChange,
}) {
  console.log(data);
  const onConfirm = (id) => {
    onDelete(id);
  };

  const onCancel = () => {
    console.log("onCancel");
  };

  const onEdit = (id) => {
    onUpdate(id);
  };

  const content = (row) => (
    <div>
      <div>
        <button className=" hover:text-cyan-700 transition-colors  text-xs font-normal py-2 px-2 rounded-md ">
          <BarsOutlined className="mr-2 mt-0.5 float float-left" />
          Lihat
        </button>
      </div>
      <button className=" hover:text-cyan-700 transition-colors  text-xs font-normal py-2 px-2 rounded-md ">
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

  const customStyles = {
    headCells: {
      style: {
        color: "white",
        background: "#036B82",
      },
    },
  };

  const columns = [
    {
      name: "ID Supplier",
      width: "w-1/3",
      sortable: true,

      selector: (row) => row.attributes.id_supplier,
    },
    {
      name: "Nama",
      width: "w-1/3",
      sortable: true,

      selector: (row) => row.attributes.name,
    },
    {
      name: "No Telp",
      width: "w-1/3",
      sortable: true,
      selector: (row) => row.attributes.phone,
    },
    {
      name: "Alamat",
      width: "w-1/3",
      sortable: true,
      selector: (row) => row.attributes.address,
    },
    {
      name: "Tindakan",
      width: "250px",
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
      data={data.data}
      paginationTotalRows={data?.meta?.pagination.total}
      paginationRowsPerPageOptions={[10]}
      pagination
    />
  );
}

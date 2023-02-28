import DataTable from "react-data-table-component";
import AlertDialog from "../Alert/Alert";
import { Popover } from "antd";
import { EditOutlined } from "@ant-design/icons";

export default function ReactDataTable({ data, onDelete, onUpdate, onPageChange }) {
  const onConfirm = (id) => {
    console.log(id);
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
        title="Hapus Area"
        message="Area yang dihapus tidak dapat dikembalikan lagi. Lanjutkan?"
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
      name: "Kode Area",
      width: "250px",
      sortable: true,
      selector: (row) => row.attributes?.code,
    },
    {
      name: "Nama Area",
      width: "250px",
      sortable: true,
      selector: (row) => row.attributes?.name,
    },
    {
      name: "Deskripsi",
      width: "250px",
      sortable: true,
      selector: (row) => row.attributes?.description,
    },
    {
      name: "Tindakan",
      width: "250px",
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
  ];

  return (
    <DataTable
      customStyles={customStyles}
      onChangePage={onPageChange}
      paginationRowsPerPageOptions={[10]}
      paginationTotalRows={data?.meta?.pagination.total}
      columns={columns}
      data={data?.data}
      pagination
    />
  );
}

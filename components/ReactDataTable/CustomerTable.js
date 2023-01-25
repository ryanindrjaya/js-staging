import DataTable from "react-data-table-component";
import AlertDialog from "../Alert/Alert";
import { Popover } from "antd";
import { EditOutlined } from "@ant-design/icons"

export default function ReactDataTable({ data, onDelete, onUpdate }) {
  console.log("coba data", data);
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

  const customStyles = {
    headCells: {
      style: {
        color: "white",
        background: "#036B82",
      },
    },
  };

  const columns = [
    //{
    //  name: "Nama Pengguna",
    //  width: "250px",
    //  //sortable: true,
    //  selector: (row) => row.name,
    //},
    {
      name: "Nama",
      width: "w-1/4",
      //sortable: true,
      selector: (row) => row?.attributes?.name,
    },
    {
      name: "Alamat",
      width: "w-1/4",
      //sortable: true,
      selector: (row) => row?.attributes?.address,
    },
    {
      name: "Type",
      width: "w-1/4",
      //sortable: true,
      selector: (row) => row?.attributes?.type,
    },
    {
      name: "Tindakan",
      width: "w-1/4",
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
      columns={columns}
      data={data.data}
      paginationRowsPerPageOptions={[50]}
      noDataComponent={`--Belum ada data--`}
      //pagination
    />
  );
}

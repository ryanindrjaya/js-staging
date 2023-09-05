import DataTable from "react-data-table-component";
import AlertDialog from "../Alert/Alert";
import { Button } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";

export default function ReactDataTable({ roleData, onDelete, onUpdate }) {
  const router = useRouter();
  const onConfirm = (id) => {
    onDelete(id);
  };

  const onCancel = () => {
    console.log("onCancel");
  };

  const onEdit = (id) => {
    router.push("/dashboard/pengguna/role/edit/" + id);
  };

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
      name: "Nama",
      width: "w-1/3",
      sortable: true,

      selector: (row) => row.name,
    },
    {
      name: "Deskripsi",
      width: "w-1/3",
      sortable: true,
      selector: (row) => row.description,
    },

    {
      name: "Tindakan",
      width: "w-1/3",
      selector: (row) => (
        <>
          <div className="flex gap-x-3">
            <Button onClick={() => onEdit(row.id)} type="default" color="orange">
              <EditOutlined />
              Edit
            </Button>
            <AlertDialog
              onCancel={onCancel}
              onConfirm={onConfirm}
              title="Hapus Role"
              message="Role yang dihapus tidak dapat dikembalikan lagi. Lanjutkan?"
              id={row.id}
            />
          </div>
        </>
      ),
    },
  ];

  return <DataTable customStyles={customStyles} columns={columns} data={roleData} pagination />;
}

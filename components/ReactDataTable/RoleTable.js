import DataTable from "react-data-table-component";
import AlertDialog from "../Alert/Alert";

export default function ReactDataTable({ roleData, onDelete, onUpdate }) {


 
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
          <div className="grid grid-cols-3 gap-4">
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

  return <DataTable  customStyles={customStyles} columns={columns} data={roleData}  pagination />;
}

import DataTable from "react-data-table-component";
import AlertDialog from "../Alert/Alert";
import Link from "next/link";

export default function ReactDataTable({ unitData, onDelete }) {
  const onConfirm = (id) => {
    console.log(id);
    onDelete(id);
  };

  const onCancel = () => {
    console.log("onCancel");
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
      name: "Nama Satuan",
      width: "w-1/2",
      sortable: true,
      selector: (row) => row.attributes?.name,
    },

    {
      name: "Tindakan",
      width: "w-1/2",
      selector: (row) => (
        <>
          <div className="grid grid-cols-3 gap-4">
            <AlertDialog
              onCancel={onCancel}
              onConfirm={onConfirm}
              title="Hapus Satuan"
              message="Satuan yang dihapus tidak dapat dikembalikan lagi. Lanjutkan?"
              id={row.id}
            />
          </div>
        </>
      ),
    },
  ];

  return <DataTable  customStyles={customStyles} columns={columns} data={unitData} pagination />;
}

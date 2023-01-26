import DataTable from "react-data-table-component";
import AlertDialog from "../Alert/Alert";

export default function ReactDataTable({ data, onDelete, onUpdate }) { console.log("coba data",data)
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
    //{
    //  name: "Nama Pengguna",
    //  width: "250px",
    //  //sortable: true,
    //  selector: (row) => row.name,
    //},
    {
      name: "Nama",
      width: "250px",
      //sortable: true,
      selector: (row) => row.name,
    },
    {
      name: "Alamat",
      width: "250px",
      //sortable: true,
      selector: (row) => row.address,
    },
    {
      name: "Type",
      width: "250px",
      //sortable: true,
      selector: (row) => row.type,
    },
    {
      name: "Tindakan",
      width: "250px",
      selector: (row) => (
        <>
          <div className="grid grid-cols-3 gap-2">
            {row.deleteAble ? (
              <button
                onClick={() => onEdit(row.id)}
                className="hover:bg-cyan-700  hover:text-white transition-colors  text-xs font-normal py-2 px-2 rounded-md "
              >
                Edit
              </button>
            ) : (
              <button
                onClick={() => onEdit(row.id)}
                className="invisible hover:bg-cyan-700  hover:text-white transition-colors  text-xs font-normal py-2 px-2 rounded-md "
              >
                Edit
              </button>
            )}

            {row.deleteAble ? (
              <AlertDialog
                onCancel={onCancel}
                onConfirm={onConfirm}
                title="Hapus Customer"
                message="Data customer yang dihapus tidak dapat dikembalikan lagi. Lanjutkan?"
                id={row.id}
              />
            ) : (
              <div className="invisible">
                <button className="hover:bg-cyan-400  hover:text-white transition-colors  text-xs font-normal py-2 px-2 rounded-md ">
                  Hapus
                </button>
              </div>
            )}
          </div>
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
      noDataComponent={`--Belum ada produk--`}
      //pagination
    />
  );
}

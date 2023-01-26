import DataTable from "react-data-table-component";
import AlertDialog from "../Alert/Alert";
import Link from "next/link";

export default function ReactDataTable({ locationData, onDelete }) {
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
      name: "ID Lokasi",
      width: "200px",
      sortable: true,
      selector: (row) => row.attributes?.location_id,
    },
    {
      name: "Nama Lokasi",
      width: "200px",
      sortable: true,
      selector: (row) => row.attributes?.name,
    },
    {
      name: "No.Telp",
      width: "200px",
      sortable: true,
      selector: (row) => row.attributes?.phone,
    },
    {
      name: "Jalan",
      width: "200px",
      sortable: true,
      selector: (row) => row.attributes?.street,
    },
    {
      name: "Kode POS",
      width: "200px",
      sortable: true,
      selector: (row) => row.attributes?.postal_code,
    },
    {
      name: "Kota",
      width: "200px",
      sortable: true,
      selector: (row) => row.attributes?.city,
    },
    {
      name: "Provinsi",
      width: "200px",
      sortable: true,
      selector: (row) => row.attributes?.province,
    },
    {
      name: "Negara",
      width: "200px",
      sortable: true,
      selector: (row) => row.attributes?.country,
    },
    {
      name: "Tindakan",
      width: "250px",
      selector: (row) => (
        <>
          <div className="grid grid-cols-3 gap-4">
            <Link
              href={{
                pathname: "/dashboard/lokasi/edit/[id]",
                query: { id: row.id },
              }}
            >
              <a className="hover:bg-blue-400  hover:text-white transition-colors  text-xs font-normal py-2 px-3 rounded-md no-underline">
                Edit
              </a>
            </Link>

            <AlertDialog
              onCancel={onCancel}
              onConfirm={onConfirm}
              title="Hapus Lokasi"
              message="Data Lokasi yang dihapus tidak dapat dikembalikan lagi. Lanjutkan?"
              id={row.id}
            />
          </div>
        </>
      ),
    },
  ];

  return (
    <DataTable
      customStyles={customStyles}
      columns={columns}
      data={locationData}
      pagination
    />
  );
}

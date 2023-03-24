const borderStyle = {
  leftBorderStyle: "thin",
  leftBorderColor: "#000000",
  rightBorderStyle: "thin",
  rightBorderColor: "#000000",
  topBorderStyle: "thin",
  topBorderColor: "#000000",
  bottomBorderStyle: "thin",
  bottomBorderColor: "#000000",
};

const headerStyles = {
  fontWeight: "bold",
  fontSize: 11,
  backgroundColor: "#036B82",
  color: "#fffff",
  align: "center",
  alignVertical: "center",
  ...borderStyle,
};

export const columnsWidth = [
  { width: 16.33 },
  { width: 16.33 },
  { width: 16 },
  { width: 16.78 },
  { width: 26.44 },
  { width: 20.67 },
  { width: 15.33 },
  { width: 11.56 },
  { width: 10.78 },
  { width: 14.78 },
  { width: 21.78 },
  { width: 14 },
  { width: 21 },
  { width: 24.11 },
  { width: 24.89 },
  { width: 24 },
];

export const HEADER_ROW_1 = [
  {
    value: "KODE CUSTOMER",
    height: 25.8,
    ...headerStyles,
  },
  {
    value: "NAMA CUSTOMER",
    height: 25.8,
    ...headerStyles,
  },
  {
    value: "ALAMAT",
    height: 25.8,
    ...headerStyles,
  },
  {
    value: "KOTA",
    height: 25.8,
    ...headerStyles,
  },
  {
    value: "TELEPON",
    height: 25.8,
    ...headerStyles,
  },
  {
    value: "DESKRIPSI",
    height: 25.8,
    ...headerStyles,
  },
  {
    value: "GOLONGAN CUSTOMER",
    height: 25.8,
    ...headerStyles,
  },
  {
    value: "TIPE PENJUALAN",
    height: 25.8,
    ...headerStyles,
  },
  {
    value: "NAMA SALES",
    height: 25.8,
    ...headerStyles,
  },
  {
    value: "AREA",
    height: 25.8,
    ...headerStyles,
  },
  {
    value: "WILAYAH",
    height: 25.8,
    ...headerStyles,
  },
  {
    value: "BATAS KREDIT",
    height: 25.8,
    ...headerStyles,
  },
  {
    value: "TERMIN PEMBAYARAN",
    height: 25.8,
    ...headerStyles,
  },
  {
    value: "SALDO AWAL",
    height: 25.8,
    ...headerStyles,
  },
  {
    value: "NAMA NPWP",
    height: 25.8,
    ...headerStyles,
  },
  {
    value: "NOMOR NPWP",
    height: 25.8,
    ...headerStyles,
  },
  {
    value: "ALAMAT NPWP",
    height: 25.8,
    ...headerStyles,
  },
  {
    value: "NOMOR NIK",
    height: 25.8,
    ...headerStyles,
  },
];

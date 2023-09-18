export const borderStyle = {
  leftBorderStyle: "thin",
  leftBorderColor: "#000000",
  rightBorderStyle: "thin",
  rightBorderColor: "#000000",
  topBorderStyle: "thin",
  topBorderColor: "#000000",
  bottomBorderStyle: "thin",
  bottomBorderColor: "#000000",
};

export const headerStylesNonUnit = {
  fontWeight: "bold",
  fontSize: 11,
  backgroundColor: "#036B82",
  color: "#fffff",
  align: "center",
  alignVertical: "center",
  ...borderStyle,
};

const headerStylesUnit = {
  fontWeight: "bold",
  fontSize: 11,
  align: "center",
  alignVertical: "center",
  ...borderStyle,
};

export const columnsWidth = [
  { width: 9.56 },
  { width: 17.44 },
  { width: 19 },
  { width: 19 },
  { width: 22.7 },
  { width: 14.2 },
  { width: 27.11 },
  { width: 35 },
  //unit 1
  { width: 8.11 },
  { width: 8.11 },
  { width: 19.22 },
  { width: 19.22 },
  { width: 8.11 },
  { width: 8.11 },
  { width: 8.11 },
  { width: 19.22 },
  { width: 19.22 },
  { width: 15 },
  //unit 2
  { width: 8.11 },
  { width: 8.11 },
  { width: 19.22 },
  { width: 19.22 },
  { width: 8.11 },
  { width: 8.11 },
  { width: 8.11 },
  { width: 19.22 },
  { width: 19.22 },
  { width: 15 },
  //unit 3
  { width: 8.11 },
  { width: 8.11 },
  { width: 19.22 },
  { width: 19.22 },
  { width: 8.11 },
  { width: 8.11 },
  { width: 8.11 },
  { width: 19.22 },
  { width: 19.22 },
  { width: 15 },
  //unit 4
  { width: 8.11 },
  { width: 8.11 },
  { width: 19.22 },
  { width: 19.22 },
  { width: 8.11 },
  { width: 8.11 },
  { width: 8.11 },
  { width: 19.22 },
  { width: 19.22 },
  { width: 15 },
  //unit 5
  { width: 8.11 },
  { width: 8.11 },
  { width: 19.22 },
  { width: 19.22 },
  { width: 8.11 },
  { width: 8.11 },
  { width: 8.11 },
  { width: 19.22 },
  { width: 19.22 },
  { width: 15 },
];

const unit1Columns = [
  {
    value: "UNIT",
    backgroundColor: "#FF9505",
    ...headerStylesUnit,
  },
  {
    value: "ISI",
    backgroundColor: "#FF9505",
    ...headerStylesUnit,
  },
  {
    value: "HARGA PEMBELIAN",
    backgroundColor: "#FF9505",
    ...headerStylesUnit,
  },
  {
    value: "DISKON PEMBELIAN",
    backgroundColor: "#FF9505",
    ...headerStylesUnit,
  },
  {
    value: "D1",
    backgroundColor: "#FF9505",
    ...headerStylesUnit,
  },
  {
    value: "D2",
    backgroundColor: "#FF9505",
    ...headerStylesUnit,
  },
  {
    value: "D3",
    backgroundColor: "#FF9505",
    ...headerStylesUnit,
  },
  {
    value: "PRICELIST",
    backgroundColor: "#FF9505",
    ...headerStylesUnit,
  },
  {
    value: "HARGA JUAL",
    backgroundColor: "#FF9505",
    ...headerStylesUnit,
  },
  {
    value: "DISKON JUAL (%)",
    backgroundColor: "#FF9505",
    ...headerStylesUnit,
  },
];

const unit2Columns = [
  {
    value: "UNIT",
    backgroundColor: "#FAFF81",
    ...headerStylesUnit,
  },
  {
    value: "ISI",
    backgroundColor: "#FAFF81",
    ...headerStylesUnit,
  },
  {
    value: "HARGA PEMBELIAN",
    backgroundColor: "#FAFF81",
    ...headerStylesUnit,
  },
  {
    value: "DISKON PEMBELIAN",
    backgroundColor: "#FAFF81",
    ...headerStylesUnit,
  },
  {
    value: "D1",
    backgroundColor: "#FAFF81",
    ...headerStylesUnit,
  },
  {
    value: "D2",
    backgroundColor: "#FAFF81",
    ...headerStylesUnit,
  },
  {
    value: "D3",
    backgroundColor: "#FAFF81",
    ...headerStylesUnit,
  },
  {
    value: "PRICELIST",
    backgroundColor: "#FAFF81",
    ...headerStylesUnit,
  },
  {
    value: "HARGA JUAL",
    backgroundColor: "#FAFF81",
    ...headerStylesUnit,
  },
  {
    value: "DISKON JUAL (%)",
    backgroundColor: "#FAFF81",
    ...headerStylesUnit,
  },
];

const unit3Columns = [
  {
    value: "UNIT",
    backgroundColor: "#72B01D",
    ...headerStylesUnit,
  },
  {
    value: "ISI",
    backgroundColor: "#72B01D",
    ...headerStylesUnit,
  },
  {
    value: "HARGA PEMBELIAN",
    backgroundColor: "#72B01D",
    ...headerStylesUnit,
  },
  {
    value: "DISKON PEMBELIAN",
    backgroundColor: "#72B01D",
    ...headerStylesUnit,
  },
  {
    value: "D1",
    backgroundColor: "#72B01D",
    ...headerStylesUnit,
  },
  {
    value: "D2",
    backgroundColor: "#72B01D",
    ...headerStylesUnit,
  },
  {
    value: "D3",
    backgroundColor: "#72B01D",
    ...headerStylesUnit,
  },
  {
    value: "PRICELIST",
    backgroundColor: "#72B01D",
    ...headerStylesUnit,
  },
  {
    value: "HARGA JUAL",
    backgroundColor: "#72B01D",
    ...headerStylesUnit,
  },
  {
    value: "DISKON JUAL (%)",
    backgroundColor: "#72B01D",
    ...headerStylesUnit,
  },
];

const unit4Columns = [
  {
    value: "UNIT",
    backgroundColor: "#5DB7DE",
    ...headerStylesUnit,
  },
  {
    value: "ISI",
    backgroundColor: "#5DB7DE",
    ...headerStylesUnit,
  },
  {
    value: "HARGA PEMBELIAN",
    backgroundColor: "#5DB7DE",
    ...headerStylesUnit,
  },
  {
    value: "DISKON PEMBELIAN",
    backgroundColor: "#5DB7DE",
    ...headerStylesUnit,
  },
  {
    value: "D1",
    backgroundColor: "#5DB7DE",
    ...headerStylesUnit,
  },
  {
    value: "D2",
    backgroundColor: "#5DB7DE",
    ...headerStylesUnit,
  },
  {
    value: "D3",
    backgroundColor: "#5DB7DE",
    ...headerStylesUnit,
  },
  {
    value: "PRICELIST",
    backgroundColor: "#5DB7DE",
    ...headerStylesUnit,
  },
  {
    value: "HARGA JUAL",
    backgroundColor: "#5DB7DE",
    ...headerStylesUnit,
  },
  {
    value: "DISKON JUAL (%)",
    backgroundColor: "#5DB7DE",
    ...headerStylesUnit,
  },
];

const unit5Columns = [
  {
    value: "UNIT",
    backgroundColor: "#F0C987",
    ...headerStylesUnit,
  },
  {
    value: "ISI",
    backgroundColor: "#F0C987",
    ...headerStylesUnit,
  },
  {
    value: "HARGA PEMBELIAN",
    backgroundColor: "#F0C987",
    ...headerStylesUnit,
  },
  {
    value: "DISKON PEMBELIAN",
    backgroundColor: "#F0C987",
    ...headerStylesUnit,
  },
  {
    value: "D1",
    backgroundColor: "#F0C987",
    ...headerStylesUnit,
  },
  {
    value: "D2",
    backgroundColor: "#F0C987",
    ...headerStylesUnit,
  },
  {
    value: "D3",
    backgroundColor: "#F0C987",
    ...headerStylesUnit,
  },
  {
    value: "PRICELIST",
    backgroundColor: "#F0C987",
    ...headerStylesUnit,
  },
  {
    value: "HARGA JUAL",
    backgroundColor: "#F0C987",
    ...headerStylesUnit,
  },
  {
    value: "DISKON JUAL (%)",
    backgroundColor: "#F0C987",
    ...headerStylesUnit,
  },
];

export const HEADER_ROW_1 = [
  {
    value: "SKU",
    rowSpan: 2,
    ...headerStylesNonUnit,
  },
  {
    value: "NAMA PRODUK",
    rowSpan: 2,
    ...headerStylesNonUnit,
  },
  {
    value: "KATEGORI",
    rowSpan: 2,
    ...headerStylesNonUnit,
  },
  {
    value: "SUB KATEGORI",
    rowSpan: 2,
    ...headerStylesNonUnit,
  },
  {
    value: "PABRIKASI",
    rowSpan: 2,
    ...headerStylesNonUnit,
  },
  {
    value: "GOLONGAN",
    rowSpan: 2,
    ...headerStylesNonUnit,
  },
  {
    value: "LOKASI",
    rowSpan: 2,
    ...headerStylesNonUnit,
  },
  {
    value: "DESKRIPSI",
    rowSpan: 2,
    ...headerStylesNonUnit,
  },
  {
    value: "UNIT 1",
    span: 10,
    backgroundColor: "#FF9505",
    ...headerStylesUnit,
  },
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  {
    value: "UNIT 2",
    span: 10,
    backgroundColor: "#FAFF81",
    ...headerStylesUnit,
  },
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  {
    value: "UNIT 3",
    span: 10,
    backgroundColor: "#72B01D",
    ...headerStylesUnit,
  },
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  {
    value: "UNIT 4",
    span: 10,
    backgroundColor: "#5DB7DE",
    ...headerStylesUnit,
  },
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  {
    value: "UNIT 5",
    span: 10,
    backgroundColor: "#F0C987",
    ...headerStylesUnit,
  },
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
];

export const HEADER_ROW_2 = [
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  ...unit1Columns,
  ...unit2Columns,
  ...unit3Columns,
  ...unit4Columns,
  ...unit5Columns,
];

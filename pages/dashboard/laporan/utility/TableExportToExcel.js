import React from 'react';
import * as XLSX from 'xlsx';

const TableExportToExcel = ({ tableData }) => { console.log("tableData", tableData);
  // Function to handle the export button click
  const handleExportClick = () => {
    const data = [];
    const headers = [];

    // Extract headers from the first row of the table
    const headerRow = tableData.props.children[0];
    headerRow.props.children.forEach((th) => {
      headers.push(th.props.children);
    });

    // Extract data from the table rows
    const bodyRows = tableData.props.children[1].props.children;
    bodyRows.forEach((row) => {
      const rowData = [];
      row.props.children.forEach((td) => {
        rowData.push(td.props.children);
      });
      data.push(rowData);
    });

    // Create the Excel workbook and worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet([headers, ...data]);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    // Generate the Excel file
    XLSX.writeFile(workbook, 'table_data.xlsx');
  };

  return (
    <div>
      {/* Render the table here */}
      {tableData}
      <button onClick={handleExportClick}>Export to Excel</button>
    </div>
  );
};

export default TableExportToExcel;
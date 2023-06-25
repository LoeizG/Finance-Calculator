import React, { useState } from "react";
import * as XLSX from "xlsx";

const ExcelCard = (props) => {
  const [tables, setTables] = useState([]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });

      const tableData = [];

      workbook.SheetNames.forEach((sheetName) => {
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, {
          header: 1,
          dateNF: "dd/mm/yyyy",
        });

        const table = {
          sheetName,
          data: jsonData,
        };
        props.columnsData(table);

        tableData.push(table);
      });

      setTables(tableData);
    };

    reader.readAsArrayBuffer(file);
    console.log("Archivo importado:", file); // Imprimir el archivo importado
  };

  return (
    <div className="card">
      <div className="card-header">Importar archivo Excel</div>
      <div className="card-body">
        <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
        {tables.map((table, index) => (
          <div key={index}>
            <h3>{table.sheetName}</h3>
            <table className="table">
              <thead>
                <tr>
                  {table.data[0].map((header, headerIndex) => (
                    <th key={headerIndex}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {table.data.slice(1).map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((cell, cellIndex) => {
                      const cellValue = cell || ""; // Verificar si la celda es nula o indefinida
                      return <td key={cellIndex}>{cellValue}</td>;
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExcelCard;

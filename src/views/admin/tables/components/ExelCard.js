import React, { useState } from "react";
import * as XLSX from "xlsx";

const ExcelCard = (props) => {
  const [tables, setTables] = useState([]);
  const [activeSheet, setActiveSheet] = useState("");
  const [column8Sum, setColumn8Sum] = useState(0);
  const [column8SumSelectedSheet, setColumn8SumSelectedSheet] = useState(0);
  const [column10SumSelectedSheet, setColumn10SumSelectedSheet] = useState(0);
  const [column7SumSelectedSheet, setColumn7SumSelectedSheet] = useState(0);
  const [RentabilidadNeta, setRentabilidadNeta] = useState(0);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });

      const tableData = [];

      workbook.SheetNames.forEach((sheetName) => {
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        const table = {
          sheetName,
          data: jsonData,
        };
        props.columnsData(table);
        tableData.push(table);
      });

      setTables(tableData);
      setActiveSheet(tableData[0]?.sheetName || "");

      let sum = 0;
      tableData.forEach((table) => {
        table.data.slice(1).forEach((row) => {
          const cellValue = parseFloat(row[6]); // Columna 8 (el índice es 7 ya que los índices comienzan desde 0)
          if (!isNaN(cellValue)) {
            sum += cellValue;
          }
        });
      });
      setColumn8Sum(sum);
    };

    reader.readAsArrayBuffer(file);
  };

  const handleSheetButtonClick = (sheetName) => {
    setActiveSheet(sheetName);
    const selectedTable = tables.find((table) => table.sheetName === sheetName);
    if (selectedTable) {
      let sumColumn8 = 0;
      let sumColumn10 = 0;
      let sumColumn7 = 0;

      selectedTable.data.slice(1).forEach((row) => {
        const cellValueColumn8 = parseFloat(row[7]); // Columna 8 (el índice es 7 ya que los índices comienzan desde 0)
        const cellValueColumn10 = parseFloat(row[9]); // Columna 10 (el índice es 9)

        if (!isNaN(cellValueColumn8)) {
          sumColumn8 += cellValueColumn8;
        }
        if (!isNaN(cellValueColumn10)) {
          sumColumn10 += cellValueColumn10;
        }
      });

      const compras2022Table = tables.find(
        (table) => table.sheetName === "Compras 2022"
      );
      if (compras2022Table) {
        compras2022Table.data.slice(1).forEach((row) => {
          const cellValueColumn4 = parseFloat(row[4]); // Columna 4 (el índice es 3)
          if (!isNaN(cellValueColumn4)) {
            sumColumn7 += cellValueColumn4;
          }
        });
      }

      setColumn8SumSelectedSheet(sumColumn8);
      setColumn10SumSelectedSheet(sumColumn10);
      setColumn7SumSelectedSheet(sumColumn7);
      setRentabilidadNeta(sumColumn8 + sumColumn10);
    }
  };

  return (
    <div className="bg-white rounded shadow p-4">
      <div className="text-lg font-semibold mb-4">Importar archivo Excel</div>
      <div>
        <input
          type="file"
          accept=".xlsx, .xls"
          className="border py-2 px-4 rounded"
          onChange={handleFileChange}
        />
      </div>
      <div className="categorias">
        {tables.map((table, index) => (
          <button
            key={index}
            className={`${activeSheet === table.sheetName ? "btnActivo" : "btnInactivo"
              } py-2 px-4 rounded`}
            onClick={() => handleSheetButtonClick(table.sheetName)}
          >
            {table.sheetName}
          </button>
        ))}
      </div>
      {tables.map((table, index) => (
        <div
          key={index}
          className={`${activeSheet === table.sheetName ? "block" : "hidden"
            } mt-4 relative`}
        >
          <h3 className="text-lg font-semibold">
            Suma de la columna 8: {Math.ceil(column8Sum * 100) / 100}
          </h3>
          {activeSheet && (
            <h3 className="text-lg font-semibold">
              Suma de la columna 8 (hoja {activeSheet}):{" "}
              {Math.ceil(column8SumSelectedSheet * 100) / 100}
            </h3>
          )}
          {activeSheet && (
            <h3 className="text-lg font-semibold">
              Suma de la columna 10 (hoja {activeSheet}):{" "}
              {Math.ceil(column10SumSelectedSheet * 100) / 100}
            </h3>
          )}
          {activeSheet && (
            <h3 className="text-lg font-semibold">
              Suma de la columna 7 (hoja {activeSheet}):{" "}
              {Math.ceil(column7SumSelectedSheet * 100) / 100}
            </h3>
          )}
          <h3 className="text-lg font-semibold namePage">{table.sheetName}</h3>
          <table className="table pTable">
            <thead>
              <tr>
                {table.data[0].map((header, headerIndex) => (
                  <th key={headerIndex}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {table.data.slice(1).map((row, rowIndex) => (
                <tr key={rowIndex} className={rowIndex%2 == 0 ? "filaPar" : `filaImpar`}>
                  {row.map((cell, cellIndex) => {
                    let cellValue = cell || ""; // Verificar si la celda es nula o indefinida
                    if(cellValue && cellValue != "" && typeof cellValue != "string" && typeof cellValue === "number") {
                      cellValue = Math.ceil(cellValue * 100) / 100;
                    }
                    return <td key={cellIndex}>{cellValue}</td>;
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default ExcelCard;

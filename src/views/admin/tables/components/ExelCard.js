import React, { useState } from "react";
import * as XLSX from "xlsx";

const ExcelCard = (props) => {
  const [tables, setTables] = useState([]);
  const [activeSheet, setActiveSheet] = useState("");

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

      // onJsonData(tableData);
      setTables(tableData);
      setActiveSheet(tableData[0]?.sheetName || "");
    };

    reader.readAsArrayBuffer(file);
  };

  const handleSheetButtonClick = (sheetName) => {
    setActiveSheet(sheetName);
  };

  return (
    <div className="card">
      <div className="card-header">Importar archivo Excel</div>
      <div className="card-body">
        <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
        {tables.map((table, index) => (
          <div key={index}>
            <button
              className={activeSheet === table.sheetName ? "active " : ""}
              onClick={() => handleSheetButtonClick(table.sheetName)}
            >
              {table.sheetName}
            </button>
          </div>
        ))}
        {tables.map((table, index) => (
          <div
            key={index}
            style={{
              display: activeSheet === table.sheetName ? "block" : "none",
            }}
          >
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
//
// import React, { useState } from "react";
// import * as XLSX from "xlsx";
//
// const ExcelCard = ({ onJsonData }) => {
//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     const reader = new FileReader();
//
//     reader.onload = (e) => {
//       const data = new Uint8Array(e.target.result);
//       const workbook = XLSX.read(data, { type: "array" });
//
//       const tableData = [];
//
//       workbook.SheetNames.forEach((sheetName) => {
//         const worksheet = workbook.Sheets[sheetName];
//         const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
//
//         const formattedData = jsonData.map((row) => {
//           const formattedRow = row.map((cell, index) => {
//             if (index === COLUMN_INDEX_TO_FORMAT && typeof cell === "number" && cell > 1) {
//               const excelDateSerial = Math.floor(cell);
//               const baseDate = new Date(Date.UTC(1899, 11, 30));
//               const date = new Date(baseDate.getTime() + (excelDateSerial - 1) * 24 * 60 * 60 * 1000);
//               return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
//             } else {
//               return cell || "";
//             }
//           });
//           return formattedRow;
//         });
//
//         const table = {
//           sheetName,
//           data: formattedData,
//         };
//
//         tableData.push(table);
//       });
//
//       onJsonData(tableData);
//     };
//
//     reader.readAsArrayBuffer(file);
//   };
//
//   return (
//     <div className="card">
//       <div className="card-header">Importar archivo Excel</div>
//       <div className="card-body">
//         <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
//       </div>
//     </div>
//   );
// };
//
// export default ExcelCard;
//

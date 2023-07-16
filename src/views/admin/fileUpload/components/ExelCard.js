import React, { useState } from "react";
import * as XLSX from "xlsx";
import moment from "moment";
/* Cálculos del Excel - Word para las fórmulas */
let tomarLiquidez = false;
const razonLiquidezCorriente = [];
let tomarRapida = false;
const razonRapida = [];
let calculoDeFormulas = [];

const DevelopmentCalculo = (razon1, razon2) => {

  calculoDeFormulas = [
    {
      "key": "Razón de Liquidez Corriente",
      "value": ((Math.ceil(razon1[0]/razon1[1] * 100) / 100).toFixed(2))
    },
    {
      "key": "Razón Rápida",
      "value": ((Math.ceil((razon2[1]-razon2[0])/razon2[2] * 100) / 100).toFixed(2))
    }
  ]

  return (
    <div className="calculoDeFormulas">
      <h1>Cálculo de Razones</h1>
      <div>
        <h3>RAZÓN</h3>
        <h3>VALOR</h3>  
      </div>
      <div>
        { calculoDeFormulas.map((row, index) => {
          return(
            <div key={index}>
              <p>{row.key}</p>
              <p>{row.value}</p>
            </div>
          )
        }) }
      </div>
    </div>
  )
}

    // <div className="calculoDeFormulas">
    //   <h3>Razón de Liquidez Corriente: {(Math.ceil(razonLiquidezCorriente[0]/razonLiquidezCorriente[1] * 100) / 100).toFixed(2)}</h3>
    //   <h3>Razón Rápida: {(Math.ceil((razonRapida[1]-razonRapida[0])/razonRapida[2] * 100) / 100).toFixed(2)}</h3>
    // </div>

const ExcelCard = (props) => {
  const [tables, setTables] = useState([]);
  const [activeSheet, setActiveSheet] = useState("");
  const [key, setKey] = useState(0);
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

        const headers = jsonData[0];
        const transformedData = jsonData.slice(1).map(row => {
          const rowData = {};
          headers.forEach((header, columnIndex) => {
            rowData[header] = row[columnIndex];
          });
          return rowData;
        });
  
        const finalTransformedData = transformedData.map((row) => {
          const transformedRow = {};
          Object.keys(row).forEach((key) => {
            if (key === 'Fecha' || key === 'Fecha de cancelación') {
              const fechaNumerica = row[key];
              const fecha = moment(new Date(1900, 0, fechaNumerica - 1));
              const fechaFormateada = fecha.format('YYYY');
              transformedRow[key] = fechaFormateada;
            } else {
              transformedRow[key] = row[key];
            }
          });
          return transformedRow;
        });
  
        const table = {
          sheetName,
          data: finalTransformedData,
        };
        
        props.columnsData(table);
        tableData.push(table);
      });

      fetch('http://localhost:3001/api/CrearJson', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tableData),
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
        })
        .catch(error => {
          console.error('Error al enviar los datos al servidor:', error);
        });
    
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

    
    }
  };

  return (
    <>
      <div className="rounded bg-white p-4 shadow">
        <div className="mb-4 text-lg font-semibold">Importar archivo Excel</div>
        <div>
          <input
            type="file"
            accept=".xlsx, .xls"
            className="rounded border py-2 px-4"
            onChange={handleFileChange}
          />
        </div>
     
           
      </div>
    </>
  );
};

export default ExcelCard;

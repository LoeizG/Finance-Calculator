import React, { useState } from "react";
import * as XLSX from "xlsx";
import moment from "moment";

import compras from "../../../../variables/Compras 2022.json"
import costosOp from "../../../../variables/Costos op..json"
import inventario from "../../../../variables/Inventario 2022.json"
import ventas from "../../../../variables/Ventas anuales 2022.json"

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
            if (key === 'Fecha' || key === 'fecha' || key === 'Fecha de cancelación') {
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
    
        gentable();
    };

    reader.readAsArrayBuffer(file);
  };

  const gentable = () => {

    const dataCompras = compras;
    const dataCostosOp = costosOp;
    const dataInventario = inventario;
    const dataVentas = ventas;
    
    let totalAbonado = 0;
    let totalCancelado = 0;
    let totalPorCobrar = 0;

    let totalComprado = 0;
    let totalPorPagar = 0;
    let totalCostosOp = 0;

    let totalInventario = 0;

    let activosFijosCosto = 40000;

    let activosFijosNetos = activosFijosCosto * (0.9 ** 3);

    let depreciacionAc = 0;
  
    dataVentas.forEach((item) => {
      if(item.fecha === "2022"){
        totalAbonado += item["Abono (50%)"] ;
      }
      if(item["Fecha de cancelación"] === "2022"){
        totalCancelado += item.Cancelación;
      }else if(item["Fecha de cancelación"] === "2023"){
        totalPorCobrar += item.Cancelación;
      }
    });

    dataCompras.forEach((item) => {
      if(item.Fecha === "2022"){
        totalComprado += item.Abono ;
      }
      if(item["Fecha de cancelación"] === "2022"){
        totalComprado += item.Cancelación;
      }else if(item.Fecha === "2022" && item["Fecha de cancelación"] === "2023"){
        totalPorPagar += item.Cancelación;
      }
    });

     totalCostosOp = dataCostosOp.reduce((sum, obj) => {
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          sum += obj[key];
        }
      }
      return sum; }, 0);

    totalCostosOp *= 12;

    const costoPorProdTotal = {};

    dataInventario.forEach((item) => {
      const producto = item.Producto;
      const costoPorProd = item['Costo por prod.'];

      if (costoPorProd !== undefined) {
        costoPorProdTotal[producto] = costoPorProd;
      }
    });
    
    Object.values(costoPorProdTotal).forEach((costo) => {
      totalInventario += costo;
    });

    depreciacionAc = activosFijosCosto - activosFijosNetos;
  
    let efectivo = (totalAbonado + totalCancelado) - (totalComprado + totalCostosOp);

    let activosCorrientes = (efectivo + totalPorCobrar + totalInventario);

    console.log("Efectivo: ", efectivo);

    const jsonActivos = [
      {
        "name": "Efectivo",
        "date": efectivo.toLocaleString("eng-US",
          {
            style: "decimal",
            maximumFractionDigits: 2,
            minimumFractionDigits: 2
          })
      },
      {
        "name": "Cuentas por cobrar",
        "date": totalPorCobrar.toLocaleString("eng-US",
          {
            style: "decimal",
            maximumFractionDigits: 2,
            minimumFractionDigits: 2
          })
      },
      {
        "name": "Inventario",
        "date": totalInventario.toLocaleString("eng-US",
          {
            style: "decimal",
            maximumFractionDigits: 2,
            minimumFractionDigits: 2
          })
      },
      {
        "name": "Activos corrientes",
        "date": activosCorrientes.toLocaleString("eng-US",
          {
            style: "decimal",
            maximumFractionDigits: 2,
            minimumFractionDigits: 2
          })
      },
      {
        "name": "Activos fijos al costo",
        "date": activosFijosCosto.toLocaleString("eng-US",
          {
            style: "decimal",
            maximumFractionDigits: 2,
            minimumFractionDigits: 2
          })
      },
      {
        "name": "Depreciación acumulada",
        "date": depreciacionAc.toLocaleString("eng-US",
          {
            style: "decimal",
            maximumFractionDigits: 2,
            minimumFractionDigits: 2
          })
      },
      {
        "name": "Activos fijos netos",
        "date": activosFijosNetos.toLocaleString("eng-US",
          {
            style: "decimal",
            maximumFractionDigits: 2,
            minimumFractionDigits: 2
          })
      },
      {
        "name": "Activos Totales",
        "date": (activosCorrientes + activosFijosNetos).toLocaleString("eng-US",
          {
            style: "decimal",
            maximumFractionDigits: 2,
            minimumFractionDigits: 2
          })
      },];

    fetch('http://localhost:3001/api/OverwriteActivos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(jsonActivos)
    })
      .then(response => response.json())
      .then(data => {
        console.log(data.message);
      })
      .catch(error => {
        console.error('Error al enviar los datos al servidor:', error);
      });

      const jsonPasivos = [
        {
          "name": "Cuentas por pagar",
          "date": totalPorPagar.toLocaleString("eng-US",
            {
              style: "decimal",
              maximumFractionDigits: 2,
              minimumFractionDigits: 2
            })
        },
        {
          "name": "Patrimonio neto",
          "date": ((activosCorrientes + activosFijosNetos) - totalPorPagar).toLocaleString("eng-US",
            {
              style: "decimal",
              maximumFractionDigits: 2,
              minimumFractionDigits: 2
            })
        },]
        fetch('http://localhost:3001/api/OverwritePasivos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(jsonPasivos)
        })
          .then(response => response.json())
          .then(data => {
            console.log(data.message);
          })
          .catch(error => {
            console.error('Error al enviar los datos al servidor:', error);
          });

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

import React, { useState } from "react";
import {
  columnsDataDevelopment,
  columnsDataCheck,
  columnsDataColumns,
  columnsDataComplex,
  columnsDataVentasAnuales,
} from "./variables/columnsData";
import tableDataDevelopment from "./variables/tableDataDevelopment.json";
import tableDataPasivos from "./variables/tableDataPasivos.json";

import Activos from "./components/Activos";
import Pasivos from "./components/Pasivos";
import Calculadora from "./components/Calculadora";

import ExcelCard from "./components/ExelCard";

const Tables = () => {
  const [columns8, setcolum8] = useState("");
  const [tables, setTables] = useState([]);
  const Vista = (vista_A) => {
    console.log(vista_A);
    console.log(columnsDataDevelopment);

    console.log(tableDataDevelopment);
    setTables(vista_A);

    // props.VistaPrevia(vista_A, vista_B, Producto, text);
  };

  return (
    <div>
      <div className="grid grid-cols-1 gap-5 mt-5 h-full md:grid-cols-2">
        <ExcelCard
          columnsData={Vista}

          //  tableData={tableDataColumns}
        />
      </div>
      <div className="grid grid-cols-1 gap-5 mt-5 h-full md:grid-cols-1">
        <Activos
          columnsData={columnsDataDevelopment}
          tableData={[
            {
              name: "Dinero recaudado de las ventas",
              date: "108820.48",
            },
            {
              name: "Coste de productos vendidos",
              date: "50055.00",
            },
            {
              name: "Rentabilidad neta",
              date: "58765.48",
            },
            {
              name: "Servicio de agua",
              date: "50",
            },
            {
              name: "Electricidad",
              date: "250",
            },
            {
              name: "Internet",
              date: "150",
            },
            {
              name: "Salarios",
              date: "2300",
            },
            {
              name: "Renta",
              date: "1500",
            },
            {
              name: "Publicidad",
              date: "100",
            },
            {
              name: "Transporte",
              date: "350",
            },
            {
              name: "Coste operativo total",
              date: "4700",
            },
            {
              name: "Rentabildad operativa",
              date: "58765.48 − 4700",
            },
          ]}
        />
      </div>
      x
    </div>
  );
};

export default Tables;

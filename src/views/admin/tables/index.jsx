import CheckTable from "./components/CheckTable";
import React, { useState } from "react";
import {
  columnsDataDevelopment,
  columnsDataCheck,
  columnsDataColumns,
  columnsDataComplex,
  columnsDataVentasAnuales,
} from "./variables/columnsData";
import tableDataDevelopment from "./variables/tableDataDevelopment.json";
import tableDataCheck from "./variables/tableDataCheck.json";
import tableDataColumns from "./variables/tableDataColumns.json";
import tableDataComplex from "./variables/tableDataComplex.json";
import DevelopmentTable from "./components/DevelopmentTable";
import ColumnsTable from "./components/ColumnsTable";
import ComplexTable from "./components/ComplexTable";
import ExcelCard from "./components/ExelCard";
const Tables = () => {
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
      <div className="mt-5 grid h-full grid-cols-1 gap-5 md:grid-cols-2">
        <ExcelCard
          columnsData={Vista}

          // tableData={tableDataColumns}
        />
      </div>
      <div className="mt-5 grid h-full grid-cols-1 gap-5 md:grid-cols-2">
        <DevelopmentTable
          columnsData={columnsDataDevelopment}
          tableData={tableDataDevelopment}
        />
        <CheckTable columnsData={columnsDataCheck} tableData={tableDataCheck} />
      </div>

      <div className="mt-5 grid h-full grid-cols-1 gap-5 md:grid-cols-2">
        <ColumnsTable
          columnsData={columnsDataColumns}
          tableData={tableDataColumns}
        />

        <ComplexTable
          columnsData={columnsDataComplex}
          tableData={tableDataComplex}
        />
      </div>
      <div className="mt-5 grid h-full grid-cols-1 gap-5 bg-red-200 md:grid-cols-2">
        <ColumnsTable
          columnsData={columnsDataVentasAnuales}
          tableData={tableDataColumns}
        />

        <ComplexTable
          columnsData={columnsDataComplex}
          tableData={tableDataComplex}
        />
      </div>
    </div>
  );
};

export default Tables;

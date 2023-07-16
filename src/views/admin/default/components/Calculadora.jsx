import React, { useState } from "react";
import Widget from "components/widget/Widget";
import { IoMdHome } from "react-icons/io";
import { IoDocuments } from "react-icons/io5";
import { MdBarChart, MdDashboard } from "react-icons/md";

const LoanCalculator = () => {
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [loanPeriod, setLoanPeriod] = useState("");
  const [paidPeriods, setPaidPeriods] = useState("");

  const [Totalapagar, setTotalapagar] = useState(0);
  const [monthlyPayment, setmonthlyPayment] = useState(0);
  const [totalPayed, settotalPayed] = useState(0);
  const [remainingPayment, setremainingPayment] = useState(0);
  const [pagosFaltantes, setpagosFaltantes] = useState(0);

  const [showWidget, setShowWidget] = useState(false);

  const calculateLoan = () => {
    const principal = parseFloat(loanAmount);
    const interest = parseFloat(interestRate) / 100 / 12;
    const period = parseInt(loanPeriod);
    const paidPeriod = parseInt(paidPeriods);

    setTotalapagar(principal * Math.pow(1 + interest, period));

    setmonthlyPayment(
      principal *
        ((interest * Math.pow(1 + interest, period)) /
          (Math.pow(1 + interest, period) - 1))
    );

    settotalPayed(
      monthlyPayment * ((Math.pow(1 + interest, paidPeriod) - 1) / interest)
    );

    setremainingPayment(
      principal * Math.pow(1 + interest, paidPeriod) - totalPayed
    );

    setShowWidget(true);
    console.log("Prestamo:", principal.toFixed(2));

    console.log("Tasa de interes efectiva:", interest.toFixed(8));
    console.log("periodos:", period);
    console.log("periodos pagados:", totalPayed);
    console.log("pagos faltantes:", pagosFaltantes.toFixed(8));

    console.log("total pagado:", period.toFixed(2));
    console.log("deuda actual:", interest);
    CalculoParaJSON();
  };

  const CalculoParaJSON = () => {
    const interest = parseFloat(interestRate) / 100 / 12;
    const period = parseInt(loanPeriod);
    const paidPeriod = parseInt(paidPeriods);
    const principal = parseFloat(loanAmount);

    setpagosFaltantes(period - paidPeriod);

    if (pagosFaltantes <= 12) {
      const deudaCortoPlazo =
        monthlyPayment *
        ((Math.pow(1 + interest, pagosFaltantes) - 1) / interest);
      const deudaLargoPlazo = 0;
      const jsonData = [
        {
          name: "Prestamo bancario",
          date: deudaCortoPlazo.toLocaleString("eng-US", {
            style: "decimal",
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
          }),
        },
        {
          name: "Cuentas por Pagar",
          date: "1,065.00",
        },
        {
          name: "Pasivos corrientes",
          date: (deudaCortoPlazo + 1065).toLocaleString("eng-US", {
            style: "decimal",
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
          }),
        },
        {
          name: "Deuda a largo plazo",
          date: deudaLargoPlazo.toLocaleString("eng-US", {
            style: "decimal",
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
          }),
        },
        {
          name: "Pasivos Totales",
          date: (deudaLargoPlazo + 1065 + deudaCortoPlazo).toLocaleString(
            "eng-US",
            {
              style: "decimal",
              maximumFractionDigits: 2,
              minimumFractionDigits: 2,
            }
          ),
        },
      ];

      fetch("http://localhost:3001/src/views/admin/balance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data.message);
        })
        .catch((error) => {
          console.error("Error al enviar los datos al servidor:", error);
        });
    } else {
      const deudaCortoPlazo =
        monthlyPayment * ((Math.pow(1 + interest, 12) - 1) / interest);
      const deudaLargoPlazo =
        monthlyPayment *
        ((Math.pow(1 + interest, pagosFaltantes - 12) - 1) / interest);
      const jsonData = [
        {
          name: "Prestamo bancario",
          date: deudaCortoPlazo.toLocaleString("eng-US", {
            style: "decimal",
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
          }),
        },
        {
          name: "Cuentas por Pagar",
          date: "1,065.00",
        },
        {
          name: "Pasivos corrientes",
          date: (deudaCortoPlazo + 1065).toLocaleString("eng-US", {
            style: "decimal",
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
          }),
        },
        {
          name: "Deuda a largo plazo",
          date: deudaLargoPlazo.toLocaleString("eng-US", {
            style: "decimal",
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
          }),
        },
        {
          name: "Pasivos Totales",
          date: (deudaLargoPlazo + 1065 + deudaCortoPlazo).toLocaleString(
            "eng-US",
            {
              style: "decimal",
              maximumFractionDigits: 2,
              minimumFractionDigits: 2,
            }
          ),
        },
      ];

      fetch("http://localhost:3001/src/views/admin/balance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data.message);
        })
        .catch((error) => {
          console.error("Error al enviar los datos al servidor:", error);
        });
    }
  };

  return (
    <div>
      <div className="grid grid-cols-2 gap-8 p-8 mx-auto mt-5 mb-10 w-4/6 bg-white rounded-lg">
        <div className="flex justify-center items-center">
          <label className="block mb-2">Monto del préstamo:</label>
          <input
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
            className="p-2 ml-2 w-1/2 border-2 border-blue-900"
          />
        </div>
        <div className="flex justify-center items-center">
          <label className="block mb-2">Tasa de interés anual (%):</label>
          <input
            type="number"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            className="p-2 ml-2 w-1/2 border-2 border-blue-900"
          />
        </div>
        <div className="flex justify-center items-center">
          <label className="block mb-2">Período del préstamo (meses):</label>
          <input
            type="number"
            value={loanPeriod}
            onChange={(e) => setLoanPeriod(e.target.value)}
            className="p-2 ml-2 w-1/2 border-2 border-blue-900"
          />
        </div>
        <div className="flex justify-center items-center">
          <label className="block mb-2">Período pagado (meses):</label>
          <input
            type="number"
            value={paidPeriods}
            onChange={(e) => setPaidPeriods(e.target.value)}
            className="p-2 ml-2 w-1/2 border-2 border-blue-900 s"
          />
        </div>
        <button
          onClick={calculateLoan}
          className="col-span-2 py-2 px-4 px-20 mx-auto text-white bg-blue-500"
        >
          Calcular
        </button>
      </div>
      {showWidget && (
        <div className="grid grid-cols-1 gap-5 w-full md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6 mt-">
          <Widget
            icon={<MdBarChart className="w-7 h-7" />}
            title={"Total a Pagar"}
            subtitle={Totalapagar.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          />
          <Widget
            icon={<IoDocuments className="w-6 h-6" />}
            title={"Pago Mensual"}
            subtitle={monthlyPayment.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          />
          <Widget
            icon={<MdBarChart className="w-7 h-7" />}
            title={"Pagado a la fecha"}
            subtitle={totalPayed.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          />
          <Widget
            icon={<MdDashboard className="w-6 h-6" />}
            title={"Deuda Actual"}
            subtitle={remainingPayment.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          />
          <Widget
            icon={<MdBarChart className="w-7 h-7" />}
            title={"Pagos Faltantes"}
            subtitle={pagosFaltantes}
          />
        </div>
      )}
      ;
    </div>
  );
};

export default LoanCalculator;

import React, { useState , useEffect } from 'react';
import Widget from "components/widget/Widget";
import { IoMdHome } from "react-icons/io";
import { IoDocuments } from "react-icons/io5";
import { MdBarChart, MdDashboard } from "react-icons/md";

const LoanCalculator = () => {
	const [loanAmount, setLoanAmount] = useState('');
	const [interestRate, setInterestRate] = useState('');
	const [loanPeriod, setLoanPeriod] = useState('');
	const [paidPeriods, setPaidPeriods] = useState('');

	const [showWidget, setShowWidget] = useState(false);

	const [calculatedValues, setCalculatedValues] = useState({
		Totalapagar: 0,
		monthlyPayment: 0,
		totalPayed: 0,
		remainingPayment: 0,
		pagosFaltantes: 0
		});

	const calculateLoan = () => {
		const principal = parseFloat(loanAmount);
		const interest = (parseFloat(interestRate) / 100)/12 ;
		const period = parseInt(loanPeriod);
		const paidPeriod = parseInt(paidPeriods);
		

		const Totalapagar = principal * Math.pow(1 + interest, period);

		const monthlyPayment = (principal * interest * Math.pow(1 + interest, period)) /
		  (Math.pow(1 + interest, period) - 1);

		const totalPayed = monthlyPayment * ((Math.pow(1 + interest, paidPeriod) - 1) / interest);

		const remainingPayment = principal * Math.pow(1 + interest, paidPeriod) - totalPayed;

		const pagosFaltantes = period - paidPeriod;
	
		setCalculatedValues({
		  Totalapagar,
		  monthlyPayment,
		  totalPayed,
		  remainingPayment,
		  pagosFaltantes
		});
	
			  setShowWidget(true);
			

	};
	

	const CalculoParaJSON = () => {
		const interest = (parseFloat(interestRate) / 100) / 12;
		const period = parseInt(loanPeriod);
		const paidPeriod = parseInt(paidPeriods);
		const principal = parseFloat(loanAmount);

		const pagosFaltantes = calculatedValues.pagosFaltantes;
		const monthlyPayment = calculatedValues.monthlyPayment;


		if (pagosFaltantes <= 12) {
			const deudaCortoPlazo = monthlyPayment * ((Math.pow(1 + interest, pagosFaltantes) - 1) / interest);
			const deudaLargoPlazo = 0;
			const jsonData = [
				{
					"name": "Prestamo bancario",
					"date": deudaCortoPlazo.toLocaleString("eng-US",
					{
						style: "decimal",
						maximumFractionDigits: 2,
						minimumFractionDigits: 2
					})
				},
				{
					"name": "Cuentas por Pagar",
					"date": "1,065.00"
				},
				{
					"name": "Pasivos corrientes",
					"date": (deudaCortoPlazo + 1065).toLocaleString("eng-US",
					{
						style: "decimal",
						maximumFractionDigits: 2,
						minimumFractionDigits: 2
					})
				},
				{
					"name": "Deuda a largo plazo",
					"date": deudaLargoPlazo.toLocaleString("eng-US",
					{
						style: "decimal",
						maximumFractionDigits: 2,
						minimumFractionDigits: 2
					})
				},
				{
					"name": "Pasivos Totales",
					"date": ((deudaLargoPlazo + 1065) + deudaCortoPlazo).toLocaleString("eng-US",
					{
						style: "decimal",
						maximumFractionDigits: 2,
						minimumFractionDigits: 2
					})
				},];

			fetch('http://localhost:3001/src/views/admin/balance', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(jsonData)
			})
				.then(response => response.json())
				.then(data => {
					console.log(data.message);
				})
				.catch(error => {
					console.error('Error al enviar los datos al servidor:', error);
				});
		} else {
			const deudaCortoPlazo = monthlyPayment * ((Math.pow(1 + interest, 12) - 1) / interest);
			const deudaLargoPlazo = monthlyPayment * ((Math.pow(1 + interest, (pagosFaltantes - 12)) - 1) / interest);
			const jsonData = [
				{
					"name": "Prestamo bancario",
					"date": deudaCortoPlazo.toLocaleString("eng-US",
						{
							style: "decimal",
							maximumFractionDigits: 2,
							minimumFractionDigits: 2
						})
				},
				{
					"name": "Cuentas por Pagar",
					"date": "1,065.00"
				},
				{
					"name": "Pasivos corrientes",
					"date": (deudaCortoPlazo + 1065).toLocaleString("eng-US",
						{
							style: "decimal",
							maximumFractionDigits: 2,
							minimumFractionDigits: 2
						})
				},
				{
					"name": "Deuda a largo plazo",
					"date": deudaLargoPlazo.toLocaleString("eng-US",
						{
							style: "decimal",
							maximumFractionDigits: 2,
							minimumFractionDigits: 2
						})
				},
				{
					"name": "Pasivos Totales",
					"date": ((deudaLargoPlazo + 1065) + deudaCortoPlazo).toLocaleString("eng-US",
						{
							style: "decimal",
							maximumFractionDigits: 2,
							minimumFractionDigits: 2
						})
				},];

			fetch('http://localhost:3001/src/views/admin/balance', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(jsonData)
			})
				.then(response => response.json())
				.then(data => {
					console.log(data.message);
				})
				.catch(error => {
					console.error('Error al enviar los datos al servidor:', error);
				});
		}
		

	};




	return (
		<div>

			<div className="grid grid-cols-2 gap-8 mt-5 w-4/6 bg-white p-8  mx-auto mb-10 rounded-lg">
				<div className="flex justify-center items-center">
					<label className="block mb-2">Monto del préstamo:</label>
					<input type="number" value={loanAmount} onChange={(e) => setLoanAmount(e.target.value)} className="w-1/2 p-2 ml-2 border-2 border-blue-900 " />
				</div>
				<div className="flex justify-center items-center">
					<label className="block mb-2">Tasa de interés anual (%):</label>
					<input type="number" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} className="w-1/2 p-2 ml-2 border-2 border-blue-900  " />
				</div>
				<div className="flex justify-center items-center">
					<label className="block mb-2">Período del préstamo (meses):</label>
					<input type="number" value={loanPeriod} onChange={(e) => setLoanPeriod(e.target.value)} className="w-1/2 p-2 ml-2 border-2 border-blue-900  " />
				</div>
				<div className="flex justify-center items-center">
					<label className="block mb-2">Período pagado (meses):</label>
					<input type="number" value={paidPeriods} onChange={(e) => setPaidPeriods(e.target.value)} className="w-1/2 p-2 ml-2 border-2 border-blue-900  s" />
				</div>
				<button onClick={calculateLoan} className="bg-blue-500 text-white px-4 py-2 mx-auto px-20 col-span-2">Calcular</button>
			</div>
			
			{showWidget && (
				<div className="grid grid-cols-1 gap-5 mt- md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 w-full 3xl:grid-cols-6">
				<Widget
				  icon={<MdBarChart className="w-7 h-7" />}
				  title={"Total a Pagar"}
				  subtitle={calculatedValues.Totalapagar.toLocaleString("en-US", {
					style: "currency",
					currency: "USD",
				  })}
				/>
				<Widget
				  icon={<IoDocuments className="w-6 h-6" />}
				  title={"Pago Mensual"}
				  subtitle={calculatedValues.monthlyPayment.toLocaleString("en-US", {
					style: "currency",
					currency: "USD",
				  })}
				/>
				<Widget
				  icon={<MdBarChart className="w-7 h-7" />}
				  title={"Pagado a la fecha"}
				  subtitle={calculatedValues.totalPayed.toLocaleString("en-US", {
					style: "currency",
					currency: "USD",
				  })}
				/>
				<Widget
				  icon={<MdDashboard className="w-6 h-6" />}
				  title={"Deuda Actual"}
				  subtitle={calculatedValues.remainingPayment.toLocaleString("en-US", {
					style: "currency",
					currency: "USD",
				  })}
				/>
				<Widget
				  icon={<MdBarChart className="w-7 h-7" />}
				  title={"Pagos Faltantes"}
				  subtitle={calculatedValues.pagosFaltantes}
				/>
			  </div>
				)};
			
			


		</div>
	);
};

export default LoanCalculator;
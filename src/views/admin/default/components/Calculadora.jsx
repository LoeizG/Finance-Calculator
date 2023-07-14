import React, { useState } from 'react';
import Widget from "components/widget/Widget";
const LoanCalculator = () => {
	const [loanAmount, setLoanAmount] = useState('');
	const [interestRate, setInterestRate] = useState('');
	const [loanPeriod, setLoanPeriod] = useState('');
	const [paidPeriods, setPaidPeriods] = useState('');
	const calculateLoan = () => {
		const principal = parseFloat(loanAmount);
		const interest = (parseFloat(interestRate) / 100) / 12;
		const period = parseInt(loanPeriod);
		const paidPeriod = parseInt(paidPeriods);


		const Totalapagar = (principal * Math.pow(1 + interest, period));
		const monthlyPayment = principal * (((interest * Math.pow(1 + interest, period))) / ((Math.pow(1 + interest, period) - 1)));
		const totalPayed = monthlyPayment * ((Math.pow(1 + interest, paidPeriod) - 1) / interest);

		const remainingPayment = ((principal * Math.pow(1 + interest, paidPeriod))) - totalPayed;

		console.log('Total a pagar:', Totalapagar.toFixed(2));
		console.log('Pago mensual:', monthlyPayment.toFixed(2));
		console.log('Pagado a la fecha:', totalPayed.toFixed(2));
		console.log('Deuda actual:', remainingPayment.toFixed(2));
		CalculoParaJSON(period, paidPeriod, interest, monthlyPayment);
	};

	const CalculoParaJSON = (period, paidPeriod, interest, monthlyPayment) => {


		const pagosFaltantes = period - paidPeriod;

		if (pagosFaltantes <= 12) {
			const deudaCortoPlazo = monthlyPayment * ((Math.pow(1 + interest, pagosFaltantes) - 1) / interest);
			const deudaLargoPlazo = 0;
			const jsonData = [
				{
					"name": "Prestamo bancario",
					"date": deudaCortoPlazo
				},
				{
					"name": "Cuentas por Pagar",
					"date": "1,065.00"
				},
				{
					"name": "Pasivos corrientes",
					"date": (deudaCortoPlazo + 1065)
				},
				{
					"name": "Deuda a largo plazo",
					"date": deudaLargoPlazo
				},
				{
					"name": "Pasivos Totales",
					"date": ((deudaLargoPlazo + 1065) + deudaCortoPlazo)
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
			<div className="grid grid-cols-2 gap-8 mt-5 bg-white p-5 rounded-lg">
				<div className="flex justify-center items-center">
					<label className="block mb-2">Monto del préstamo:</label>
					<input type="number" value={loanAmount} onChange={(e) => setLoanAmount(e.target.value)} className="w-1/2 p-2 ml-2 border-2 border-blue-900 " />
				</div>
				<div className="flex justify-center items-center">
					<label className="block mb-2">Tasa de interés (%):</label>
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
		</div>
	);
};

export default LoanCalculator;
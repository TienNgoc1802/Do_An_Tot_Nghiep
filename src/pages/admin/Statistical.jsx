import React, { useEffect, useState } from "react";
import SideBar from "../../components/AdminSideBar";
import * as statisticalService from "../../services/StatisticalService";
import { Link } from "react-router-dom";
import {
	AreaChart,
	Area,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Label,
	ResponsiveContainer,
	Bar,
	BarChart,
	Legend,
	Cell,
} from "recharts";

const Statistical = () => {
	const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
	const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
	const [selectedYear1, setSelectedYear1] = useState(new Date().getFullYear());
	const [selectedMonth1, setSelectedMonth1] = useState(
		new Date().getMonth() + 1
	);
	const [selectedType, setSelectedType] = useState("month");
	const [monthlyRevenue, setMonthlyRevenue] = useState([]);
	const [dailyRevenue, setDailyRevenue] = useState([]);
	const [order, setOrder] = useState(null);
	const [totalByYear, setTotalByYear] = useState(0);
	const [totalByMonth, setTotalByMonth] = useState(0);

	const generateYears = (startYear, endYear) => {
		const years = [];
		for (let i = startYear; i <= endYear; i++) {
			years.push(i);
		}
		return years;
	};

	const currentYear = new Date().getFullYear();
	const startYear = currentYear - 5;
	const endYear = currentYear + 5;
	const years = generateYears(startYear, endYear);

	const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

	const calculateTotalByYear = (data) => {
		let finalTotal = 0;
		data.forEach((item) => (finalTotal += item.revenue));
		setTotalByYear(finalTotal);
	};

	const calculateTotalByMonth = (data) => {
		let finalTotal = 0;
		data.forEach((item) => (finalTotal += item.revenue));
		console.log(finalTotal);
		setTotalByMonth(finalTotal);
	};

	const fetchMonthlyRevenueByYear = async () => {
		try {
			const data = await statisticalService.getMonthlyRevenueByYear(
				selectedYear
			);
			const formattedData = data.map((item) => ({
				month: item[0],
				revenue: item[1],
			}));
			setMonthlyRevenue(formattedData);
			calculateTotalByYear(formattedData);
		} catch (error) {
			console.log("Fetch monthly revenue by year fail.", error);
		}
	};

	const fetchOrderByMonthAndYear = async () => {
		try {
			const data = await statisticalService.getOrderByMonthAndYear(
				selectedMonth,
				new Date().getFullYear()
			);
			setOrder(data);
		} catch (error) {
			console.log("Fetch order by month year fail.", error);
		}
	};

	const fetchDailyRevenueByMonth = async () => {
		try {
			const data = await statisticalService.getDailyRevenueByMonth(
				selectedMonth1,
				selectedYear1
			);
			const formattedData = data.map((item) => ({
				day: item[0],
				revenue: item[1],
			}));
			setDailyRevenue(formattedData);
			calculateTotalByMonth(formattedData);
		} catch (error) {
			console.log("Fetch daily revenue by month fail.", error);
		}
	};

	useEffect(() => {
		fetchOrderByMonthAndYear();
		fetchMonthlyRevenueByYear();
	}, [selectedYear, selectedMonth]);

	useEffect(() => {
		fetchDailyRevenueByMonth();
	}, [selectedYear1, selectedMonth1]);

	const formatBookingDate = (milliseconds) => {
		const date = new Date(milliseconds);
		return date.toLocaleDateString("en-GB", {
			day: "2-digit",
			month: "2-digit",
			year: "numeric",
		});
	};

	const percent =
		((monthlyRevenue[new Date().getMonth()]?.revenue -
			monthlyRevenue[new Date().getMonth() - 1]?.revenue) /
			(monthlyRevenue[new Date().getMonth() - 1]?.revenue - 1)) *
		100;

	const PaymentMethodBarChart = ({ orders }) => {
		const validOrders = orders || [];

		const defaultData = [
			{ name: "Pay On Delivery", value: 0 },
			{ name: "Pay On Bank", value: 0 },
			{ name: "Pay On VNPay", value: 0 },
		];

		const paymentMethodAmount = validOrders.reduce((acc, order) => {
			if (acc[order.payment_Method]) {
				acc[order.payment_Method] += order.total;
			} else {
				acc[order.payment_Method] = order.total;
			}
			return acc;
		}, {});

		const allPaymentMethods = [
			"Pay On Delivery",
			"Pay On Bank",
			"Pay On VNPay",
		];

		allPaymentMethods.forEach((method) => {
			if (!paymentMethodAmount[method]) {
				paymentMethodAmount[method] = 0;
			}
		});

		const data =
			validOrders.length > 0
				? Object.keys(paymentMethodAmount).map((key) => ({
						name: key,
						value: paymentMethodAmount[key],
				  }))
				: defaultData;

		const COLORS = ["#00CC33", "#663399", "#3300FF"];

		const formatPaymentMethod = (value) => {
			return value === "Pay On Delivery"
				? "Thanh toán khi nhận hàng"
				: value === "Pay On Bank"
				? "Chuyển khoản qua ngân hàng"
				: "Thanh toán qua VNPAY";
		};

		const legendData = [
			{ value: "Pay On Delivery", color: COLORS[0] },
			{ value: "Pay On Bank", color: COLORS[1] },
			{ value: "Pay On VNPAY", color: COLORS[2] },
		];

		return (
			<ResponsiveContainer width="100%" height={400}>
				<BarChart
					data={data}
					margin={{ top: 20, right: 0, left: 50, bottom: 20 }}
				>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis
						dataKey="name"
						tickFormatter={formatPaymentMethod}
						tick={{ fontSize: "12px" }}
					/>
					<YAxis
						tickFormatter={(value) => `${value.toLocaleString()}`}
						label={{
							value: "Tổng tiền (VND)",
							angle: -90,
							offset: -40,
							position: "insideLeft",
						}}
					/>
					<Tooltip
						formatter={(value, name) => [
							`${value.toLocaleString()} VND`,
							formatPaymentMethod(name),
						]}
					/>
					<Legend
						payload={legendData.map((item) => ({
							value: formatPaymentMethod(item.value),
							type: "rect",
							color: item.color,
						}))}
					/>
					<Bar dataKey="value">
						{data.map((entry, index) => (
							<Cell
								key={`cell-${index}`}
								fill={COLORS[index % COLORS.length]}
							/>
						))}
					</Bar>
				</BarChart>
			</ResponsiveContainer>
		);
	};

	return (
		<div
			className="statistical"
			style={{ display: "flex", background: "#f5f5f5" }}
		>
			<SideBar />
			<div
				className="statistical-content"
				style={{ padding: "15px 20px", flex: "1" }}
			>
				<h3 className="fw-bold mb-4">Thống kê</h3>

				<div
					className="mt-4"
					style={{
						background: "#fff",
						padding: "15px",
						boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
						borderRadius: "10px",
					}}
				>
					<div className="d-flex">
						<div style={{ flex: 4 }}>
							<p>Doanh thu tháng này (tháng {new Date().getMonth() + 1})</p>
							<p className="fw-bold fs-4">
								{`${new Intl.NumberFormat("vi-VN").format(
									monthlyRevenue[new Date().getMonth()]?.revenue
								)}₫`}
							</p>

							{percent < 0 ? (
								<>
									<p className="text-danger fw-bold fs-5 mt-3">
										<i className="bi bi-graph-down-arrow pe-2"></i>
										{Math.abs(percent.toFixed(2))}%
									</p>
									<p>So với tháng trước</p>
								</>
							) : (
								<>
									<p className="text-success fw-bold fs-5 mt-3">
										<i className="bi bi-graph-up-arrow pe-2"></i>
										{Math.abs(percent.toFixed(2))}%
									</p>
									<p>So với tháng trước</p>
								</>
							)}

							<p className="mt-3">
								Tổng số đơn hàng: <strong>{order?.length}</strong>
							</p>
						</div>
						<div style={{ flex: 8 }}>
							<PaymentMethodBarChart orders={order} />
						</div>
					</div>
					<div className="table-order-in-month">
						<h5
							style={{
								textAlign: "center",
								marginBottom: "20px",
								fontWeight: "700",
							}}
						>
							Thống kê đơn hàng trong tháng
						</h5>
						<div style={{ paddingTop: "20px", textAlign: "center" }}>
							<label htmlFor="year-select" className="fw-bold me-3">
								Chọn tháng:
							</label>
							<select
								id="year-select"
								className="form-select-sm"
								value={selectedMonth}
								onChange={(e) => setSelectedMonth(e.target.value)}
							>
								{months.map((month) => (
									<option key={month} value={month}>
										Tháng {month}
									</option>
								))}
							</select>
						</div>
						<table className="table table-striped mt-3">
							<thead>
								<tr>
									<th scope="col">#</th>
									<th scope="col">Người dùng</th>
									<th scope="col">Ngày đặt hàng</th>
									<th scope="col">Phương thức thanh toán</th>
									<th scope="col">Trạng thái</th>
									<th scope="col">Tổng tiền</th>
									<th scope="col"></th>
								</tr>
							</thead>
							<tbody>
								{order?.map((item, index) => (
									<tr key={index}>
										<th scope="row">#{item.id}</th>
										<td>
											<Link
												to={`/admin/users/edit-user/${item.user.id}`}
												className="text-dark"
											>
												{item.user.id}
											</Link>
										</td>
										<td>{formatBookingDate(item.booking_Date)}</td>
										<td>
											{item.payment_Method === "Pay On Delivery"
												? "Thanh toán khi nhận hàng"
												: item.payment_Method === "Pay On Bank"
												? "Chuyển khoản qua ngân hàng"
												: "Thanh toán qua VNPay"}
										</td>
										<td>
											<span
												className="bg-success"
												style={{
													color: "#fff",
													padding: "5px",
													borderRadius: "3px",
												}}
											>
												{item.status === "Completed" ? "Đã giao hàng" : ""}
											</span>
										</td>
										<td>{`${new Intl.NumberFormat("vi-VN").format(
											item.total
										)}₫`}</td>
										<td>
											<Link
												to={`/admin/order-detail/${item.id}`}
												className="text-info"
											>
												Xem chi tiết
											</Link>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>

				<div
					className="mt-4"
					style={{
						background: "#fff",
						padding: "15px",
						boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
						borderRadius: "10px",
					}}
				>
					<div className="d-flex justify-content-center align-items-center">
						<h5
							style={{
								textAlign: "center",
								marginBottom: "20px",
								fontWeight: "700",
								paddingRight: "10px",
							}}
						>
							Thống kê doanh thu theo
						</h5>
						<select
							id="type-select"
							className="form-select-sm"
							value={selectedType}
							onChange={(e) => setSelectedType(e.target.value)}
						>
							<option value="year">Năm</option>
							<option value="month">Tháng</option>
						</select>
					</div>

					{selectedType === "year" ? (
						<div>
							<label htmlFor="year-select" className="fw-bold me-2">
								Chọn năm:
							</label>
							<select
								id="year-select"
								className="form-select-sm"
								value={selectedYear}
								onChange={(e) => setSelectedYear(e.target.value)}
							>
								{years.map((year) => (
									<option key={year} value={year}>
										{year}
									</option>
								))}
							</select>
						</div>
					) : (
						<div className="d-flex justify-content-center align-items-center mt-4">
							<div>
								<label htmlFor="year-select" className="fw-bold me-2">
									Chọn năm:
								</label>
								<select
									id="year-select"
									className="form-select-sm"
									value={selectedYear1}
									onChange={(e) => setSelectedYear1(e.target.value)}
								>
									{years.map((year) => (
										<option key={year} value={year}>
											{year}
										</option>
									))}
								</select>
							</div>

							<div className="ms-4">
								<label htmlFor="year-select" className="fw-bold me-2">
									Chọn tháng:
								</label>
								<select
									id="year-select"
									className="form-select-sm"
									value={selectedMonth1}
									onChange={(e) => setSelectedMonth1(e.target.value)}
								>
									{months.map((month) => (
										<option key={month} value={month}>
											Tháng {month}
										</option>
									))}
								</select>
							</div>
						</div>
					)}

					<h4 className="mt-2">
						{selectedType === "year" ? (
							<strong>
								Tổng doanh thu:{" "}
								{`${new Intl.NumberFormat("vi-VN").format(totalByYear)}₫`}
							</strong>
						) : (
							<strong>
								Tổng doanh thu:{" "}
								{`${new Intl.NumberFormat("vi-VN").format(totalByMonth)}₫`}
							</strong>
						)}
					</h4>
					{selectedType === "year" ? (
						<div className="chart-monthly-revenue mt-3">
							<ResponsiveContainer width="100%" height={400}>
								<AreaChart
									data={monthlyRevenue}
									margin={{ top: 10, right: 30, left: 45, bottom: 20 }}
								>
									<CartesianGrid strokeDasharray="3 3" />
									<XAxis dataKey="month">
										<Label value="Tháng" offset={-15} position="insideBottom" />
									</XAxis>
									<YAxis>
										<Label
											value="Doanh thu"
											angle={-90}
											offset={-40}
											position="insideLeft"
										/>
									</YAxis>
									<Tooltip
										formatter={(value, name) => [
											`${value.toLocaleString()} VND`,
											"Doanh thu",
										]}
										labelFormatter={(label) => `Tháng: ${label}`}
									/>
									<Area
										type="monotone"
										dataKey="revenue"
										stroke="#8884d8"
										fill="#8884d8"
									/>
								</AreaChart>
							</ResponsiveContainer>
						</div>
					) : (
						<div className="chart-daily-revenue mt-3">
							<ResponsiveContainer width="100%" height={400}>
								<AreaChart
									data={dailyRevenue}
									margin={{ top: 10, right: 30, left: 45, bottom: 20 }}
								>
									<CartesianGrid strokeDasharray="3 3" />
									<XAxis dataKey="day">
										<Label value="Ngày" offset={-15} position="insideBottom" />
									</XAxis>
									<YAxis>
										<Label
											value="Doanh thu"
											angle={-90}
											offset={-40}
											position="insideLeft"
										/>
									</YAxis>
									<Tooltip
										formatter={(value, name) => [
											`${value.toLocaleString()} VND`,
											"Doanh thu",
										]}
										labelFormatter={(label) => `Ngày: ${label}`}
									/>
									<Area
										type="monotone"
										dataKey="revenue"
										stroke="#8884d8"
										fill="#8884d8"
									/>
								</AreaChart>
							</ResponsiveContainer>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Statistical;

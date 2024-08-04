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
	Pie,
	PieChart,
	Cell,
	Legend,
} from "recharts";

const Statistical = () => {
	const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
	const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
	const [monthlyRevenue, setMonthlyRevenue] = useState([]);
	const [currentOrder, setCurentOrder] = useState([]);
	const [order, setOrder] = useState(null);

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
		} catch (error) {
			console.log("Fetch monthly revenue by year fail.", error);
		}
	};

	const fetchOrderByMonthAndYear = async () => {
		try {
			const data = await statisticalService.getOrderByMonthAndYear(
				selectedMonth,
				selectedYear
			);
			setOrder(data);
		} catch (error) {
			console.log("Fetch order by month year fail.", error);
		}
	};

	const fetchCurrentOrder = async () => {
		try {
			const data = await statisticalService.getOrderByMonthAndYear(
				new Date().getMonth() + 1,
				new Date().getFullYear()
			);
			setCurentOrder(data);
		} catch (error) {
			console.log("Fetch current order fail.", error);
		}
	};

	useEffect(() => {
		fetchCurrentOrder();
		fetchOrderByMonthAndYear();
		fetchMonthlyRevenueByYear();
	}, [selectedYear, selectedMonth]);

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

	const PaymentMethodPieChart = ({ orders }) => {
		const paymentMethodAmount = orders.reduce((acc, order) => {
			if (acc[order.payment_Method]) {
			  acc[order.payment_Method] += order.total;
			} else {
			  acc[order.payment_Method] = order.total;
			}
			return acc;
		  }, {});
		
		  const data = Object.keys(paymentMethodAmount).map((key) => ({
			name: key,
			value: paymentMethodAmount[key],
		  }));

        const COLORS = ["#00CC33", "#663399" ];

		return (
			<ResponsiveContainer width="100%" height={300}>
				<PieChart>
					<Pie
						data={data}
						cx="50%"
						cy="50%"
						outerRadius={100}
						fill="#8884d8"
						dataKey="value"
						label
					>
						{data.map((entry, index) => (
							<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
						))}
					</Pie>
					<Tooltip
						formatter={(value, name) => [
							`${value}`,
							name === "Pay On Delivery"
								? "Thanh toán khi nhận hàng"
								: "Chuyển khoản qua ngân hàng",
						]}
					/>
					<Legend
						formatter={(value) =>
							value === "Pay On Delivery"
								? "Thanh toán khi nhận hàng"
								: "Chuyển khoản qua ngân hàng"
						}
					/>
				</PieChart>
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
					className="mt-4 d-flex"
					style={{
						background: "#fff",
						padding: "15px",
						boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
						borderRadius: "10px",
					}}
				>
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

                        <p className="mt-3">Tổng số đơn hàng: <strong>{currentOrder?.length}</strong></p>
					</div>
					<div style={{ flex: 8 }}>
						<h5
							style={{
								textAlign: "center",
								fontWeight: "700",
							}}
						>
							Phương thức thanh toán
						</h5>
						<PaymentMethodPieChart orders={currentOrder} />
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
					<h5
						style={{
							textAlign: "center",
							marginBottom: "20px",
							fontWeight: "700",
						}}
					>
						Doanh thu theo năm
					</h5>

					<div style={{ paddingTop: "20px", textAlign: "center" }}>
						<label htmlFor="year-select" className="fw-bold me-3">
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
					<div className="table-order-in-month mt-4">
						<h5
							style={{
								textAlign: "center",
								marginBottom: "20px",
								fontWeight: "700",
							}}
						>
							Đơn hàng trong tháng
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
												: "Chuyển khoản qua ngân hàng"}
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
			</div>
		</div>
	);
};

export default Statistical;

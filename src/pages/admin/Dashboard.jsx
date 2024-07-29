import React, { useState, useEffect, useContext } from "react";
import SideBar from "../../components/AdminSideBar";
import * as productService from "../../services/ProductService";
import * as categoryService from "../../services/CategoryService";
import * as userService from "../../services/UserService";
import * as orderService from "../../services/OrderService";
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	Tooltip,
	CartesianGrid,
	ResponsiveContainer,
	Label,
} from "recharts";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

const Dashboard = () => {
	const [top5BestSellers, setTop5BestSellers] = useState(null);
	const [totalProduct, setTotalProduct] = useState(0);
	const [totalCategory, setTotalCategory] = useState(0);
	const [totalUser, setTotalUser] = useState(0);
	const [totalOrder, setTotalOrder] = useState(0);
	const [orderRecent, setOrderRecent] = useState(null);
	const { admin, setAdmin } = useContext(AppContext);
	const navigate = useNavigate();

	const fetchTop5BestSellers = async () => {
		try {
			const data = await productService.bestSellers();
			setTop5BestSellers(data.slice(0, 5));
		} catch (error) {
			console.log("fetch best seller fail!", error);
		}
	};

	const fetchCategories = async () => {
		try {
			const data = await categoryService.getAllCategory();
			setTotalCategory(data.length);
		} catch (error) {
			console.log(error);
		}
	};

	const fetchGetAllProduct = async () => {
		try {
			const data = await productService.getAllProduct();
			setTotalProduct(data.length);
		} catch (error) {
			console.log(error);
		}
	};

	const fetchGetAllOrder = async () => {
		try {
			const data = await orderService.getAllOrder(0, 10);
			setTotalOrder(data.totalElements);
		} catch (error) {
			console.log(error);
		}
	};

	const fetchGetAllUser = async () => {
		try {
			const data = await userService.getAllUser(0, 10);
			setTotalUser(data.totalElements);
		} catch (error) {
			console.log(error);
		}
	};

	const fetchGetOrderToday = async () => {
		try {
			const data = await orderService.getOrderToday();
			setOrderRecent(data);
		} catch (error) {
			console.log("Fetch order today fail.", error);
		}
	};

	useEffect(() => {
		fetchGetOrderToday();
		fetchGetAllUser();
		fetchGetAllOrder();
		fetchCategories();
		fetchGetAllProduct();
		fetchTop5BestSellers();
	}, []);

	const handleStatus = (status) => {
		switch (status) {
			case "Pending":
				return "warning";
				break;
			case "Completed":
				return "success";
				break;
			case "Canceled":
				return "danger";
				break;
			default:
				return "success";
		}
	};

	if (!top5BestSellers) {
		return <div className="fs-1 text-danger">Loading...</div>;
	}

	const shortenText = (text, maxLength) =>
		text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;

	return (
		<div
			className="dashboard"
			style={{ display: "flex", background: "#f5f5f5" }}
		>
			<SideBar />
			<div
				className="dashboard-content"
				style={{ padding: "15px 20px", flex: "1" }}
			>
				<h3 className="fw-bold">Dashboard</h3>
				<div className="d-flex mt-4" style={{ gap: "15px" }}>
					<div className="card-item">
						<div className="d-flex justify-content-between align-items-center">
							<i className="bi bi-grid-1x2-fill fs-1 text-warning"></i>
							<div>
								<p className="fw-bold">Nhãn hàng</p>
								<h4 className="fw-bold" style={{ textAlign: "center" }}>
									{totalCategory}
								</h4>
							</div>
						</div>
					</div>
					<div className="card-item">
						<div className="d-flex justify-content-between align-items-center">
							<i className="bi bi-box-seam-fill fs-1 text-danger"></i>
							<div>
								<p className="fw-bold">Sản phẩm</p>
								<h4 className="fw-bold" style={{ textAlign: "center" }}>
									{totalProduct}
								</h4>
							</div>
						</div>
					</div>
					<div className="card-item">
						<div className="d-flex justify-content-between align-items-center">
							<i className="bi bi-cart3 fs-1 text-success"></i>
							<div>
								<p className="fw-bold">Đơn hàng</p>
								<h4 className="fw-bold" style={{ textAlign: "center" }}>
									{totalOrder}
								</h4>
							</div>
						</div>
					</div>
					<div className="card-item">
						<div className="d-flex justify-content-between align-items-center">
							<i className="bi bi-person-square fs-1 text-info"></i>
							<div>
								<p className="fw-bold">Người dùng</p>
								<h4 className="fw-bold" style={{ textAlign: "center" }}>
									{totalUser}
								</h4>
							</div>
						</div>
					</div>
				</div>
				<div className="chart-container d-flex mt-4" style={{ gap: "15px" }}>
					<div
						className="chart-item"
						style={{ flex: "1", background: "#fff", borderRadius: "10px" }}
					>
						<h5 style={{ textAlign: "center", marginBottom: "20px" }}>
							Top 5 Sản phẩm Bán Chạy
						</h5>
						<ResponsiveContainer width="100%" height={300}>
							<BarChart
								data={top5BestSellers}
								margin={{ top: 20, right: 20, left: 10, bottom: 20 }}
							>
								<CartesianGrid strokeDasharray="3 3" />
								<XAxis
									dataKey="product_Name"
									title="Sản phẩm"
									tickFormatter={(value) => shortenText(value, 10)} // Cắt bớt tên sản phẩm dài
									tick={{ fontSize: 12 }}
									interval={0}
								>
									<Label
										value="Sản phẩm"
										position="insideBottom"
										offset={-10}
										style={{ textAnchor: "middle", fontSize: 14 }}
									/>
								</XAxis>
								<YAxis title="Đã bán">
									<Label
										value="Đã bán"
										angle={-90}
										position="insideLeft"
										style={{ textAnchor: "middle", fontSize: 14 }}
									/>
								</YAxis>
								<Tooltip
									formatter={(value, name) => [value, name]}
									labelFormatter={(label) => `Sản phẩm: ${label}`}
								/>
								<Bar dataKey="sold" fill="#8884d8" />
							</BarChart>
						</ResponsiveContainer>
					</div>
					<div style={{ flex: "1" }}></div>
				</div>
				<div
					className="order-recent mt-4"
					style={{
						background: "#fff",
						padding: "15px",
						boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
						borderRadius: "10px",
					}}
				>
					<h5 className="fw-bold mb-3">Đơn hàng gần đây | Hôm nay</h5>
					<div className="table-order-today">
						<table className="table table-striped">
							<thead>
								<tr>
									<th scope="col">#</th>
									<th scope="col">Khách hàng</th>
									<th scope="col">Sản phẩm (Tên sản phẩm, Size, Số lượng)</th>
									<th scope="col">Tổng tiền</th>
									<th scope="col">Trạng thái</th>
									<th scope="col"></th>
								</tr>
							</thead>
							<tbody>
								{orderRecent?.map((item, index) => (
									<tr key={index}>
										<th scope="row">#{item.id}</th>
										<td>{item.fullname}</td>
										<td>
											{item.order_Item.map((orderItem) => (
												<div>
													<p>
														{orderItem.product?.product_Name}, {orderItem.size},
														x{orderItem.count}
													</p>
												</div>
											))}
										</td>
										<td>{`${new Intl.NumberFormat("vi-VN").format(
											item.total
										)}₫`}</td>
										<td>
											<span
												className={`bg-${handleStatus(item.status)}`}
												style={{
													color: "#fff",
													padding: "5px",
													borderRadius: "3px",
												}}
											>
												{item.status === "Pending"
													? "Chờ xác nhận"
													: item.status === "Delivering"
													? "Đang giao hàng"
													: item.status === "Completed"
													? "Đã giao hàng"
													: "Đơn hàng bị hủy"}
											</span>
										</td>
										<td>
											<Link
												to={`admin/order-detail/${item.id}`}
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

export default Dashboard;

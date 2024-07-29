import React, { useState, useEffect } from "react";
import SideBar from "../../components/AdminSideBar";
import * as orderService from "../../services/OrderService";
import toast from "react-hot-toast";
import ModalDelete from "../../components/ModalDelete";
import { Link } from "react-router-dom";

const Order = () => {
	const [selectedStatus, setSelectedStatus] = useState("All");
	const [order, setOrder] = useState(null);
	const [allOrder, setAllOrder] = useState(null);
	const [deliveringOrder, setDeliveringOrder] = useState(null);
	const [pendingOrder, setPendingOrder] = useState(null);
	const [completedOrder, setCompletedOrder] = useState(null);
	const [canceledOrder, setCanceledOrder] = useState(null);
	const [page, setPage] = useState(0);

	const fecthAllOrder = async () => {
		try {
			const data = await orderService.getAllOrder(page, 10);
			if (selectedStatus === "All") setOrder(data.content);
			setAllOrder(data.totalElements);
		} catch (error) {
			console.log("Fetch all order fail: ", error);
		}
	};

	const fecthPendingOrder = async () => {
		try {
			const data = await orderService.getOrderByStatus("Pending", page, 10);
			if (selectedStatus === "Pending") setOrder(data.content);
			setPendingOrder(data.totalElements);
		} catch (error) {
			console.log("Fetch pending order fail: ", error);
		}
	};

	const fecthDeliveringOrder = async () => {
		try {
			const data = await orderService.getOrderByStatus("Delivering", page, 10);
			if (selectedStatus === "Delivering") setOrder(data.content);
			setDeliveringOrder(data.totalElements);
		} catch (error) {
			console.log("Fetch delivering order fail: ", error);
		}
	};
	const fecthCompletedOrder = async () => {
		try {
			const data = await orderService.getOrderByStatus("Completed", page, 10);
			if (selectedStatus === "Completed") setOrder(data.content);
			setCompletedOrder(data.totalElements);
		} catch (error) {
			console.log("Fetch completed order fail: ", error);
		}
	};
	const fecthCanceledOrder = async () => {
		try {
			const data = await orderService.getOrderByStatus("Canceled", page, 10);
			if (selectedStatus === "Canceled") setOrder(data.content);
			setCanceledOrder(data.totalElements);
		} catch (error) {
			console.log("Fetch canceled order fail: ", error);
		}
	};

	useEffect(() => {
		fecthAllOrder();
		fecthPendingOrder();
		fecthDeliveringOrder();
		fecthCompletedOrder();
		fecthCanceledOrder();
	}, [page, selectedStatus]);

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

	const formatBookingDate = (milliseconds) => {
		const date = new Date(milliseconds);
		return date.toLocaleDateString("en-GB", {
			day: "2-digit",
			month: "2-digit",
			year: "numeric",
		});
	};

	const handlePrev = () => {
		if (page > 0) {
			setPage(page - 1);
		}
	};

	return (
		<div className="order" style={{ display: "flex", background: "#f5f5f5" }}>
			<SideBar />
			<div
				className="order-content"
				style={{ padding: "15px 20px", flex: "1" }}
			>
				<h3 className="fw-bold mb-4">Đơn hàng</h3>
				<div>
					<span
						style={{
							cursor: "pointer",
							fontWeight: "bold",
							textDecoration: selectedStatus === "All" ? "underline" : "none",
						}}
						onClick={() => setSelectedStatus("All")}
					>
						Tất cả({allOrder})
					</span>
					<span className="mx-1 fw-bold">|</span>
					<span
						style={{
							cursor: "pointer",
							fontWeight: "bold",
							textDecoration:
								selectedStatus === "Pending" ? "underline" : "none",
						}}
						onClick={() => setSelectedStatus("Pending")}
					>
						Chờ xác nhận({pendingOrder})
					</span>
					<span className="mx-1 fw-bold">|</span>
					<span
						style={{
							cursor: "pointer",
							fontWeight: "bold",
							textDecoration:
								selectedStatus === "Delivering" ? "underline" : "none",
						}}
						onClick={() => setSelectedStatus("Delivering")}
					>
						Đang giao({deliveringOrder})
					</span>
					<span className="mx-1 fw-bold">|</span>
					<span
						style={{
							cursor: "pointer",
							fontWeight: "bold",
							textDecoration:
								selectedStatus === "Completed" ? "underline" : "none",
						}}
						onClick={() => setSelectedStatus("Completed")}
					>
						Đã giao({completedOrder})
					</span>
					<span className="mx-1 fw-bold">|</span>
					<span
						style={{
							cursor: "pointer",
							fontWeight: "bold",
							textDecoration:
								selectedStatus === "Canceled" ? "underline" : "none",
						}}
						onClick={() => setSelectedStatus("Canceled")}
					>
						Đã hủy({canceledOrder})
					</span>
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
					<div className="table-order">
						<table className="table table-striped">
							<thead>
								<tr>
									<th scope="col">#</th>
									<th scope="col">Khách hàng</th>
									<th scope="col">Số điện thoại</th>
									<th scope="col">Ngày đặt</th>
									<th scope="col">Trạng thái</th>
									<th scope="col">Hình thức</th>
									<th scope="col">Tổng tiền</th>
									<th scope="col"></th>
								</tr>
							</thead>
							<tbody>
								{order?.map((item, index) => (
									<tr key={index}>
										<th scope="row">#{item.id}</th>
										<td>{item.fullname}</td>
										<td>{item.phone}</td>
										<td>{formatBookingDate(item.booking_Date)}</td>
										<td>
											{item.payment_Method === "Pay On Delivery"
												? "Thanh toán khi nhận hàng"
												: "Chuyển khoản qua ngân hàng"}
										</td>
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
										<td>{`${new Intl.NumberFormat("vi-VN").format(
											item.total
										)}₫`}</td>

										<td>
											<Link to={`/admin/order-detail/${item.id}`} className="text-info">
												Xem chi tiết
											</Link>
										</td>
									</tr>
								))}
							</tbody>
						</table>
						<div className="page d-flex justify-content-center align-items-center">
							<nav
								aria-label="Page navigation example"
								style={{ cursor: "pointer" }}
							>
								<ul className="pagination">
									<li className="page-item" onClick={handlePrev}>
										<div className="page-link" aria-label="Previous">
											<span aria-hidden="true">&laquo;</span>
										</div>
									</li>
									<li className="page-item">
										<div className="page-link">{page + 1}</div>
									</li>
									<li className="page-item" onClick={() => setPage(page + 1)}>
										<div className="page-link" aria-label="Next">
											<span aria-hidden="true">&raquo;</span>
										</div>
									</li>
								</ul>
							</nav>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Order;

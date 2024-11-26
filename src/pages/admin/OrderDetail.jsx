import React, { useState, useEffect } from "react";
import SideBar from "../../components/AdminSideBar";
import * as orderService from "../../services/OrderService";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const OrderDetail = () => {
	const { order_id } = useParams();
	const [orderDetail, setOrderDetail] = useState(null);
	const [totalProduct, setTotalProduct] = useState(0);

	const fetchOrderDetail = async () => {
		try {
			const data = await orderService.getOrderByID(order_id);
			setOrderDetail(data);
			calculateTotal(data.order_Item);
		} catch (error) {
			console.log("Fetch order detail: ", error);
		}
	};

	const calculateTotal = (items) => {
		let totalPrice = 0;
		items.forEach((item) => {
			if (
				item.product.promotion_Item &&
				item.product.promotion_Item.length > 0 &&
				item.product.promotion_Item[0].discount > 0
			) {
				const discount = item.product.promotion_Item[0].discount;
				totalPrice +=
					(item.product.price - (item.product.price * discount) / 100) *
					item.count;
			} else {
				totalPrice += item.product.price * item.count;
			}
		});
		setTotalProduct(totalPrice);
	};

	useEffect(() => {
		fetchOrderDetail();
	}, []);

	const formatBookingDate = (milliseconds) => {
		const date = new Date(milliseconds);
		return date.toLocaleDateString("en-GB", {
			day: "2-digit",
			month: "2-digit",
			year: "numeric",
		});
	};

	const handleStatus = (status) => {
		switch (status) {
			case "Pending":
				return "#FFCC00";
				break;
			case "Completed":
				return "#009900";
				break;
			case "Canceled":
				return "#FF0000";
				break;
			default:
				return "#009900";
		}
	};

	const handleUpdateStatus = async () => {
		try {
			if (orderDetail.status === "Pending")
				await orderService.updateStatus(order_id, "Delivering");
			if (orderDetail.status === "Delivering")
				await orderService.updateStatus(order_id, "Completed");
			toast.success("Cập nhật trạng thái đơn hàng thành công.");
			fetchOrderDetail();
		} catch (error) {
			toast.error("Cập nhật trạng thái đơn hàng thất bại.");
			console.log("Update status order fail: ", error);
		}
	};

	const handleHuyDon = async (order_id) => {
		try {
			await orderService.updateStatus(order_id, "Canceled");
			toast.success("Hủy đơn hàng thành công.");
			fetchOrderDetail();
		} catch (error) {
			toast.error("Hủy đơn hàng thất bại.");
			console.log("Update status order fail: ", error);
		}
	};

	if (!orderDetail) {
		return <div className="fs-1 text-danger">Loading...</div>;
	}

	return (
		<div
			className="order-detail"
			style={{ display: "flex", background: "#f5f5f5" }}
		>
			<SideBar />
			<div
				className="order-detail-content"
				style={{ padding: "15px 20px", flex: "1" }}
			>
				<div className="d-flex justify-content-between align-items-center">
					<h3 className="fw-bold">Chi tiết đơn hàng (#{order_id})</h3>
					<Link to="/admin/order" className="text-info">
						<i className="bi bi-chevron-double-left"></i> Quay lại
					</Link>
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
					<div className="order-info mb-2">
						<div className="d-flex justify-content-between align-items-center mb-3">
							<p className="fw-bold">
								Thông tin đơn hàng (Người dùng:{" "}
								<Link
									to={`/admin/users/edit-user/${orderDetail.user.id}`}
									className="text-dark"
								>
									{orderDetail.user.id}
								</Link>
								)
							</p>
							<p>
								<strong>Ngày đặt hàng: </strong>
								{formatBookingDate(orderDetail.booking_Date)}
							</p>
						</div>
						<p>
							<strong>Tên người nhận: </strong>
							{orderDetail.fullname}
						</p>
						<p>
							<strong>Số điện thoại: </strong>
							{orderDetail.phone}
						</p>
						<p>
							<strong>Email: </strong>
							{orderDetail.email}
						</p>
						<p>
							<strong>Đia chỉ nhận hàng: </strong>
							{orderDetail.address}
						</p>
					</div>
					<hr />
					<div className="my-2">
						<div className="list-product-order">
							{orderDetail.order_Item.map((item, index) => (
								<div
									className="product-item d-flex justify-content-between align-items-center mb-2"
									key={index}
								>
									<div className="d-flex">
										<Link to={`/products/${item.product.id}`}>
											<img
												src={item.product.productImage[0].url_Image}
												alt="Product Image"
												style={{
													width: "80px",
													height: "85px",
												}}
											></img>
										</Link>
										<div className="ms-3">
											<div className="product-name">
												<Link to={`/products/${item.product.id}`}>
													<p
														style={{
															overflow: "hidden",
															fontWeight: "bold",
															color: "#111111",
														}}
													>
														{item.product.product_Name}
													</p>
												</Link>
											</div>
											<div className="product-size">
												<span>Size: {item.size}</span>
											</div>
											<div className="product-count">
												<span>Số lượng: x{item.count}</span>
											</div>
										</div>
									</div>
									<div className="product-price">
										{item.product.promotion_Item &&
										item.product.promotion_Item.length > 0 &&
										item.product.promotion_Item[0].discount > 0 ? (
											<div className="product-price d-flex align-items-center">
												<span className="price-sale fw-bold">
													{`${new Intl.NumberFormat("vi-VN").format(
														item.product.price -
															(item.product.price *
																item.product.promotion_Item[0].discount) /
																100
													)}₫`}
												</span>
											</div>
										) : (
											<div>
												<span className="price fw-bold">
													{`${new Intl.NumberFormat("vi-VN").format(
														item.product.price
													)}₫`}
												</span>
											</div>
										)}
									</div>
								</div>
							))}
						</div>
					</div>
					<hr />
					<div className="d-flex my-3">
						<div className="status" style={{ flex: 1 }}>
							<div className="d-flex align-items-center">
								<span className="fw-bold me-3">Phương thức thanh toán</span>
								<div
									style={{
										padding: "10px",
										border: "1px solid #FF3300",
										color: "#FF3300",
										borderRadius: "4px",
										fontWeight: "600",
									}}
								>
									<span>
										{orderDetail.payment_Method === "Pay On Delivery"
											? "Thanh toán khi nhận hàng"
											: orderDetail.payment_Method === "Pay On Bank"
											? "Chuyển khoản qua ngân hàng"
											: "Thanh toán qua VNPay"}
									</span>
								</div>
							</div>
							<div className="d-flex align-items-center mt-3">
								<span className="fw-bold" style={{ marginRight: "45px" }}>
									Trạng thái đơn hàng
								</span>
								<div
									style={{
										border: `1px solid ${handleStatus(orderDetail.status)}`,
										color: `${handleStatus(orderDetail.status)}`,
										padding: "10px",
										borderRadius: "4px",
										fontWeight: "600",
									}}
								>
									<span>
										{orderDetail.status === "Pending"
											? "Chờ xác nhận"
											: orderDetail.status === "Delivering"
											? "Đang giao hàng"
											: orderDetail.status === "Completed"
											? "Đã giao hàng"
											: "Đơn hàng bị hủy"}
									</span>
								</div>
							</div>
						</div>
						<div className="price" style={{ flex: 1 }}>
							<div className="d-flex mb-2">
								<span style={{ flex: 5 }}></span>
								<span className="fw-bold" style={{ flex: 5 }}>
									Tổng tiền sản phẩm:
								</span>
								<span
									style={{ flex: 2, textAlign: "right" }}
								>{`${new Intl.NumberFormat("vi-VN").format(
									totalProduct
								)}₫`}</span>
							</div>
							<div className="d-flex mb-2">
								<span style={{ flex: 5 }}></span>
								<span className="fw-bold" style={{ flex: 5 }}>
									Tổng giảm giá:
								</span>
								<span
									style={{ flex: 2, textAlign: "right" }}
								>{`${new Intl.NumberFormat("vi-VN").format(0)}₫`}</span>
							</div>
							<div className="d-flex mb-2">
								<span style={{ flex: 5 }}></span>
								<span className="fw-bold" style={{ flex: 5 }}>
									Phí vận chuyển:
								</span>
								<span
									style={{ flex: 2, textAlign: "right" }}
								>{`${new Intl.NumberFormat("vi-VN").format(30000)}₫`}</span>
							</div>
							<div className="d-flex fs-5">
								<span style={{ flex: 5 }}></span>
								<span className="fw-bold ps-4" style={{ flex: 5 }}>
									Tổng thanh toán:
								</span>
								<span
									style={{
										flex: 2,
										textAlign: "right",
										color: "#FF6600",
										fontWeight: "bold",
									}}
								>{`${new Intl.NumberFormat("vi-VN").format(
									orderDetail.total
								)}₫`}</span>
							</div>
							<div className="d-flex justify-content-end align-items-center mt-4">
								{(orderDetail.status === "Pending" ||
									orderDetail.status === "Delivering") && (
									<div className="d-flex">
										<div>
											<button
												onClick={handleUpdateStatus}
												className="btn btn-success px-3 py-2 fw-bold"
											>
												{orderDetail.status === "Pending"
													? "Xác nhận đơn hàng"
													: "Hoàn tất đơn hàng"}
											</button>
										</div>
									</div>
								)}
								{(orderDetail.status === "Pending" ||
									orderDetail.status === "Delivering") && (
									<button
										onClick={() => handleHuyDon(orderDetail.id)}
										className="btn btn-danger px-3 py-2 ms-3"
									>
										Hủy đơn hàng
									</button>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default OrderDetail;

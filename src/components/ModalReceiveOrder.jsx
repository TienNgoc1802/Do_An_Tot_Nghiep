import React, { useEffect, useState } from "react";
import * as orderService from "../services/OrderService";
import toast from "react-hot-toast";

const ModalReceiveOrder = ({ isOpen, onClose, shipper }) => {
	const [orders, setOrders] = useState([]);
	const [selectedOrders, setSelectedOrders] = useState([]);

	const handleCheckboxChange = (orderId) => {
		setSelectedOrders((prevSelected) => {
			if (prevSelected.includes(orderId)) {
				// Nếu đã chọn, bỏ chọn (xóa khỏi danh sách)
				return prevSelected.filter((id) => id !== orderId);
			} else {
				// Nếu chưa chọn, thêm vào danh sách
				return [...prevSelected, orderId];
			}
		});
	};

	console.log(selectedOrders);

	const handleXacNhan = async () => {
		if (orders.length === 0) {
			toast.error("Không có đơn hàng nào đang trong trạng thái chờ lấy hàng.");
			return;
		} else if (selectedOrders.length === 0) {
			toast.error("Bạn phải chọn đơn hàng trước đã.");
			return;
		}
		try {
			await orderService.assignShipperToOrders(shipper.id, selectedOrders);
			toast.success("Đã giao đơn hàng cho shipper thành công.");
			onClose(); // Đóng modal sau khi thành công
		} catch (error) {
			toast.error("Failed to assign shipper!");
			console.log("Failed to assign shipper! ", error);
		}
	};

	const fetchListWaitingOrder = async () => {
		try {
			const data = await orderService.getOrderByStatus("Waiting", 0, 10000);
			setOrders(data.content);
		} catch (error) {
			console.log("Fetch waiting orders fail: ", error);
		}
	};

	useEffect(() => {
		fetchListWaitingOrder();
		if (isOpen) {
			// Thêm lớp phủ mờ
			document.body.classList.add("modal-open");
			const backdrop = document.createElement("div");
			backdrop.className = "modal-backdrop fade show";
			document.body.appendChild(backdrop);
		} else {
			// Xóa lớp phủ mờ
			document.body.classList.remove("modal-open");
			const backdrop = document.querySelector(".modal-backdrop");
			if (backdrop) {
				backdrop.remove();
			}
		}

		return () => {
			// Đảm bảo lớp phủ mờ được xóa khi component bị unmount
			document.body.classList.remove("modal-open");
			const backdrop = document.querySelector(".modal-backdrop");
			if (backdrop) {
				backdrop.remove();
			}
		};
	}, [isOpen]);

	if (!isOpen) return null;

	return (
		<div
			className="modal fade show"
			style={{ display: "block" }}
			tabIndex="-1"
			role="dialog"
			aria-hidden="true"
		>
			<div
				className="modal-overlay"
				onClick={onClose} // Đóng modal khi click overlay
			>
				<div
					className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable"
					onClick={(e) => e.stopPropagation()}
				>
					<div className="modal-content">
						<div className="modal-header d-flex justify-content-between align-items-center">
							<h4 className="fw-bold">Chọn đơn hàng giao</h4>
							<button onClick={onClose} className="btn-close "></button>
						</div>
						<div className="modal-body">
							{orders.length === 0 && (
								<p>Không có đơn hàng nào đang trong trạng thái chờ lấy hàng.</p>
							)}
							{orders?.map((item, index) => (
								<div
									className="product-item d-flex align-items-center mb-3"
									key={index}
								>
									<label
										className="d-flex align-items-center"
										style={{ cursor: "pointer", width: "100%" }}
									>
										<input
											type="checkbox"
											checked={selectedOrders.includes(item.id)} // Kiểm tra nếu đã chọn
											onChange={() => handleCheckboxChange(item.id)} // Xử lý khi click
											style={{
												cursor: "pointer",
												marginRight: "20px",
												fontSize: "30px",
											}}
										/>
										<div>
											<p>
												<strong>Mã đơn: </strong>
												{item.id}
											</p>
											<p>
												<strong>Tên người nhận: </strong>
												{item.fullname} {"(SĐT: "}
												{item.phone}
												{")"}
											</p>
											<p>
												<strong>Địa chỉ nhận hàng: </strong>
												{item.address}
											</p>

											{item.isPay ? (
												<div className="d-flex align-items-center">
													<p>
														<strong>Thu tiền: </strong>
														0₫
													</p>
													<p
														className="text-bg-success ms-3"
														style={{
															padding: "5px 10px",
															borderRadius: "5px ",
														}}
													>
														Đã thanh toán
													</p>
												</div>
											) : (
												<p>
													<strong>Thu tiền: </strong>
													{`${new Intl.NumberFormat("vi-VN").format(
														item.total
													)}₫`}
												</p>
											)}

											<p>
												<strong>Chi tiết đơn hàng: </strong>
											</p>
											{item.order_Item?.map((item1, index1) => (
												<div key={index1}>
													<div className="d-flex justify-content-between">
														<p className="text-primary fst-italic">
															{item1.product.product_Name}
															{", size: "}
															{item1.size}
														</p>
														<p className="text-danger">x{item1.count}</p>
													</div>
													<hr />
												</div>
											))}
										</div>
									</label>
								</div>
							))}
						</div>
						<div className="modal-footer">
							<button
								type="button"
								onClick={handleXacNhan}
								class="btn btn-primary py-2 px-3"
							>
								Xác nhận
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ModalReceiveOrder;

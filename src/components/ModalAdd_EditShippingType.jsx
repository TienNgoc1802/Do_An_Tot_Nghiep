import React, { useState, useEffect } from "react";
import * as shippingTypeService from "../services/ShippingTypeService";
import toast from "react-hot-toast";

const ModalShippingType = ({
	isOpen,
	onClose,
	onSuccess,
	type,
	shippingType,
}) => {
	const [shippingName, setShippingName] = useState("");
	const [shipCost, setShipCost] = useState("");
	const [estimatedTime, setEstimatedTime] = useState("");

	useEffect(() => {
		if (isOpen) {
			if (type === "add") {
				setShippingName("");
				setShipCost("");
				setEstimatedTime("");
			} else {
				setShippingName(shippingType.shippingName);
				setShipCost(shippingType.shipCost);
				setEstimatedTime(shippingType.estimatedTime);
			}
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

	const handleAdd_EditShippingType = async (e) => {
		e.preventDefault();

		if (isNaN(shipCost)) {
			toast.error("Phí ship phải là số.");
			return;
		}

		if (type === "add") {
			try {
				const data = await shippingTypeService.addShippingType(
					shippingName,
					shipCost,
					estimatedTime
				);
				if (data) {
					toast.success("Thêm mới loại ship thành công.");
					if (onSuccess) onSuccess();
					onClose();
				}
			} catch (error) {
				toast.error("Thêm mới loại ship thất bại");
				console.log("Add shipping type fail: ", error);
			}
		} else {
			try {
				const data = await shippingTypeService.editShippingType(
					shippingType.id,
					shippingName,
					shipCost,
					estimatedTime
				);
				if (data) {
					toast.success("Sửa loại ship thành công.");
					if (onSuccess) onSuccess();
					onClose();
				}
			} catch (error) {
				toast.error("Sửa loại ship thất bại");
				console.log("Edit shipping type fail: ", error);
			}
		}
	};

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
					className="modal-overlay"
					onClick={onClose} // Đóng modal khi click overlay
				>
					<div
						className="modal-dialog modal-dialog-centered"
						role="document"
						onClick={(e) => e.stopPropagation()}
					>
						<div className="modal-content">
							<div className="modal-header d-flex justify-content-between align-items-center">
								<h4 className="fw-bold">
									{type === "add" ? "Thêm loại ship" : "Chỉnh sửa loại ship"}
								</h4>
								<button onClick={onClose} className="btn-close "></button>
							</div>
							<div className="modal-body" style={{ padding: "20px" }}>
								<form onSubmit={handleAdd_EditShippingType}>
									<div>
										<label className="form-label fw-bold">Loại ship</label>
										<input
											name="shippingName"
											type="text"
											className="form-control"
											style={{ width: "300px" }}
											placeholder="Loại ship"
											value={shippingName}
											onChange={(e) => setShippingName(e.target.value)}
											required
										/>
									</div>
									<div className="mt-3">
										<label className="form-label fw-bold">Phí ship</label>
										<input
											name="shipCost"
											type="text"
											className="form-control"
											style={{ width: "300px" }}
											placeholder="Phí ship"
											value={shipCost}
											onChange={(e) => setShipCost(e.target.value)}
											required
										/>
									</div>
									<div className="mt-3">
										<label className="form-label fw-bold">
											Thời gian ước tính
										</label>
										<textarea
											name="estimatedTime"
											type="text"
											className="form-control"
											style={{ width: "300px" }}
											placeholder="Thời gian dự tính"
											value={estimatedTime}
											required
											onChange={(e) => setEstimatedTime(e.target.value)}
										/>
									</div>
									<div className="d-flex justify-content-center align-content-center mt-3">
										<button
											className="btn btn-primary btn-xac-nhan"
											style={{
												fontWeight: "bold",
												padding: "10px 25px",
											}}
											type="submit"
										>
											Lưu
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ModalShippingType;

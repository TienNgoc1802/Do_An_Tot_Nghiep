import React, { useState, useEffect } from "react";
import * as shipperService from "../services/ShipperService";
import toast from "react-hot-toast";

const ModalShipper = ({ isOpen, onClose, onSuccess, type, shipper }) => {
	const [phone, setPhone] = useState("");
	const [password, setPassword] = useState("");
	const [fullname, setFullName] = useState("");
	const [address, setAddress] = useState("");
	const [selectedImage, setSelectedImage] = useState(null);

	const handleImageUpload = (event) => {
		const file = event.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = () => {
				setSelectedImage(reader.result);
			};
			reader.readAsDataURL(file);
		}
	};

	useEffect(() => {
		if (isOpen) {
			if (type === "add") {
				setPhone("");
				setPassword("");
				setFullName("");
				setSelectedImage("");
				setAddress("");
			} else {
				setPhone(shipper.id);
				setPassword("");
				setFullName(shipper.fullname);
				setSelectedImage(shipper.avatar);
				setAddress(shipper.address);
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

	const handleAdd_EditShipper = async (e) => {
		e.preventDefault();

		if (type === "add") {
			try {
				const data = await shipperService.signUp(phone, fullname, password);
				if (data) {
					toast.success("Thêm shipper thành công.");
					if (onSuccess) onSuccess();
					onClose();
				}
			} catch (error) {
				toast.error("Thêm shipper thất bại");
				console.log("Add shipper fail: ", error);
			}
		} else {
			try {
				const data = await shipperService.updateShipper(
					shipper.id,
                    fullname,
					selectedImage,
					address,
				);
				if (data) {
					toast.success("Sửa thông tin shipper thành công.");
					if (onSuccess) onSuccess();
					onClose();
				}
			} catch (error) {
				toast.error("Sửa thông tin shipper thất bại");
				console.log("Edit shipper fail: ", error);
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
								<h4 className="fw-bold">{type === "add" ? "Thêm Shipper" : "Chỉnh sửa thông tin shipper"}</h4>
								<button onClick={onClose} className="btn-close "></button>
							</div>
							<div className="modal-body" style={{ padding: "20px" }}>
								<form onSubmit={handleAdd_EditShipper}>
									<div className="d-flex justify-content-center align-items-center">
										<div>
											<label className="form-label fw-bold">
												Số điện thoại
											</label>
											<input
												name="phone"
												type="text"
												className="form-control"
												style={{ width: "200px" }}
												placeholder="Số điện thoại"
												value={phone}
												onChange={(e) => setPhone(e.target.value)}
												required
                                                disabled={type === "edit"}
											/>
										</div>
										<div className="ms-3">
											<label className="form-label fw-bold">Mật khẩu</label>
											<input
												name="password"
												type="text"
												className="form-control"
												style={{ width: "200px" }}
												placeholder="Mật khẩu"
												value={password}
												onChange={(e) => setPassword(e.target.value)}
                                                disabled={type === "edit"} // Vô hiệu hóa khi chỉnh sửa
                                                required={type === "add"} // Bắt buộc khi thêm mới
											/>
										</div>
									</div>

									<div className="mt-3">
										<label className="form-label fw-bold">Họ tên</label>
										<input
											name="fullname"
											type="text"
											className="form-control"
											style={{ width: "250px" }}
											placeholder="Họ tên"
											value={fullname}
											onChange={(e) => setFullName(e.target.value)}
											required
										/>
									</div>
									<div className="mt-3">
										<label className="form-label fw-bold">Ảnh đại diện</label>
										<div className="d-flex align-items-center">
											<label htmlFor="add-image">
												<i
													className="bi bi-camera-fill"
													style={{
														fontSize: "25px",
														padding: "3px 15px",
														background: "#EEEEEE",
														borderRadius: "5px",
														cursor: "pointer",
													}}
												></i>
											</label>
											<input
												type="file"
												id="add-image"
												multiple
												onChange={handleImageUpload}
												style={{ display: "none", visibility: "none" }}
											/>
											<div className="ms-5">
												{selectedImage && (
													<img
														src={selectedImage}
														alt="Selected"
														accept="image/*"
														style={{ maxWidth: "60px", borderRadius: "50%" }}
													/>
												)}
											</div>
										</div>
									</div>
									<div className="mt-3">
										<label className="form-label fw-bold">Địa chỉ</label>
										<textarea
											name="address"
											type="text"
											className="form-control"
											placeholder="Đia chỉ"
											value={address}
											onChange={(e) => setAddress(e.target.value)}
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

export default ModalShipper;

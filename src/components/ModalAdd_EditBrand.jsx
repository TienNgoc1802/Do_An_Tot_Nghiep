import React, { useEffect, useState } from "react";
import * as brandService from "../services/BrandService";
import toast from "react-hot-toast";

const ModalAdd_EditBrand = ({ isOpen, onClose, onSuccess, type, brand }) => {
	const [name, setName] = useState("");
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
				setName("");
				setSelectedImage(null);
			} else {
				setName(brand.brand_name);
				setSelectedImage(brand.brand_image);
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

	const handleAdd_EditBrand = () => {};

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
									{type === "add" ? "Thêm nhãn hàng" : "Sửa nhãn hàng"}
								</h4>
								<button onClick={onClose} className="btn-close "></button>
							</div>
							<div className="modal-body" style={{ padding: "20px" }}>
								<form onSubmit={handleAdd_EditBrand}>
									<div>
										<label className="form-label fw-bold">Tên nhãn hàng</label>
										<input
											name="name"
											type="text"
											className="form-control"
											style={{ width: "400px" }}
											placeholder="Tên nhãn hàng"
											value={name}
											onChange={(e) => setName(e.target.value)}
											required
										/>
									</div>
									<div>
										<label className="form-label fw-bold mt-3">Ảnh nhãn hàng</label>

										<div className="d-flex align-items-center">
											<div className="btn-upload-img-review pe-3">
												<label htmlFor="add-image-review">
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
													id="add-image-review"
													onChange={handleImageUpload}
													style={{ display: "none", visibility: "none" }}
												/>
											</div>
											{selectedImage !== null && (
												<img
													src={selectedImage}
													alt="Selected"
													accept="image/*"
													style={{
														width: "170px",
														marginLeft: "30px",
													}}
												/>
											)}
										</div>
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

export default ModalAdd_EditBrand;

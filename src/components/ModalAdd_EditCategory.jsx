import React, { useState, useEffect } from "react";
import * as categoryService from "../services/CategoryService";
import toast from "react-hot-toast";

const ModalAdd_EditCategory = ({
	isOpen,
	onClose,
	onSuccess,
	type,
	category,
}) => {
	const [categoryName, setCategoryName] = useState("");

	const handleAdd_EditCategory = async (e) => {
		e.preventDefault();

		if (type === "add") {
			try {
				const data = await categoryService.addCatetogry(categoryName);
				if (data) {
					toast.success("Thêm danh mục thành công.");
					if (onSuccess) onSuccess();
					onClose();
				}
			} catch (error) {
				toast.error("Thêm danh mục thất bại.");
				console.log("Add category fail: ", error);
			}
		} else {
			try {
				const data = await categoryService.editCatetogry(
					category.id,
					categoryName,
				);
                if(data){
                    toast.success("Sửa danh mục thành công.");
                    if (onSuccess) onSuccess();
					onClose();
                }
		
			} catch (error) {
				toast.error("Sửa danh mục thất bại.");
				console.log("Edit category fail: ", error);
			}
		}
	};

	useEffect(() => {
		if (isOpen) {
			if (type === "add") {
				setCategoryName("");
			} else {
				setCategoryName(category.category_Name);
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
									{type === "add" ? "Thêm danh mục" : "Sửa danh mục"}
								</h4>
								<button onClick={onClose} className="btn-close "></button>
							</div>
							<div className="modal-body" style={{ padding: "20px" }}>
								<form onSubmit={handleAdd_EditCategory}>
									<div>
										<label className="form-label fw-bold">Tên danh mục</label>
										<input
											name="category_Name"
											type="text"
											className="form-control"
											style={{ width: "400px" }}
											placeholder="Tên danh mục"
											value={categoryName}
											onChange={(e) => setCategoryName(e.target.value)}
											required
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

export default ModalAdd_EditCategory;

import { useEffect } from "react";

const ModalDelete = ({ isOpen, onClose, handleDelete, text }) => {
	useEffect(() => {
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
			<div className="modal-dialog modal-dialog-centered" role="document">
				<div className="modal-content">
					<div
						className="modal-body"
						style={{ padding: "20px", textAlign: "center" }}
					>
						<span className="fw-bold">
							{text}
						</span>
						<div className="d-flex justify-content-center align-content-center mt-3">
							<button
								className="btn btn-huy"
								style={{
									color: "#fff",
									background: "#000",
									fontWeight: "bold",
									padding: "10px 25px",
									marginRight: "15px",
									border: "1px solid #000",
								}}
								onClick={onClose}
							>
								HỦY
							</button>
							<button
								className="btn btn-xac-nhan"
								style={{
									color: "#fff",
									background: "#ec0b0b",
									fontWeight: "bold",
									padding: "10px 25px",
									border: "1px solid #ec0b0b",
								}}
								onClick={handleDelete}
							>
								XÁC NHẬN
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ModalDelete;
import { useContext, useEffect, useState } from "react";
import * as productService from "../services/ProductService";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import ERROR_CODES from "../utils/errorCodes";

const ModalAddProduct = ({ isOpen, onClose }) => {
	const [products, setProducts] = useState(null);
	const { selectedProducts, setSelectedProducts } = useContext(AppContext);

	const fetchProductNotInPromotion = async () => {
		try {
			const data = await productService.productNotInPromotion();
			setProducts(data);
		} catch (error) {
			console.log("Fetch product not in promotion: ", error);
		}
	};

	const SLT = (items) => {
		let total = 0;
		items.forEach((size) => {
			total += size.quantity;
		});
		return total;
	};

	const handleCheckboxChange = (product) => {
		setSelectedProducts((prevSelected) => {
			const isSelected = prevSelected.some((item) => item.id === product.id);
			if (isSelected) {
				return prevSelected.filter((item) => item.id !== product.id);
			} else {
				return [...prevSelected, product];
			}
		});
	};

	const handleXacNhan = () => {
		if(selectedProducts.length === 0){
			toast.error(ERROR_CODES.NO_SELECTED_PRODUCTS.message);
		}
		else{
			onClose();
		}
	}

	const isSelected = (product) =>
		selectedProducts?.some((item) => item.id === product.id);

	useEffect(() => {
		fetchProductNotInPromotion();
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
							<h4 className="fw-bold">Chọn sản phẩm</h4>
							<button onClick={onClose} className="btn-close "></button>
						</div>
						<div className="modal-body">
							{products?.map((item, index) => (
								<div
									className="product-item d-flex align-items-center mb-3"
									key={index}
								>
									<label
										htmlFor={`checkbox-${item.id}`}
										className="d-flex align-items-center"
										style={{ cursor: "pointer", width: "100%" }}
									>
										{/* Checkbox */}
										<input
											id={`checkbox-${item.id}`}
											type="checkbox"
											checked={isSelected(item)}
											onChange={() => handleCheckboxChange(item)}
											style={{ cursor: "pointer" }} // Đảm bảo con trỏ hiển thị như khi rê qua checkbox
										/>
										{/* Hình ảnh sản phẩm */}
										<img
											src={item.productImage[0].url_Image}
											alt="Product Image"
											style={{ width: "60px", marginLeft: "15px" }}
										/>
										{/* Thông tin sản phẩm */}
										<div className="ms-3">
											<p>{item.product_Name}</p>
											<p>
												<strong>Giá bán: </strong>
												{`${new Intl.NumberFormat("vi-VN").format(
													item.price
												)}₫`}
											</p>
											<p>
												<strong>Số lượng sản phẩm: </strong>
												{SLT(item.productSize)}
											</p>
											<p>
												<strong>Đã bán: </strong>
												{item.sold}
											</p>
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

export default ModalAddProduct;

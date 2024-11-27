import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as cartService from "../services/CartService";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const ModalAddToCart = ({ isOpen, onClose, product, setIsModalOpen }) => {
	const [quantity, setQuantity] = useState(1);
	const [size, setSize] = useState(null);
	const [countSize, setCountSize] = useState(0);
	const { user, setTotalProductInCart } = useContext(AppContext);

	useEffect(() => {
		setQuantity(1);
		if (product.productSize && product.productSize.length > 0) {
			setSize(product.productSize[0].size);
			setCountSize(product.productSize[0].quantity);
		}
	}, [product]);

	const increaseQuantity = () => {
		if (quantity < countSize) {
			setQuantity(quantity + 1);
		}
		else{
			toast.error(`Bạn chỉ có thể đặt hàng tối đa ${countSize} sản phẩm.`);
		}
	};

	const decreaseQuantity = () => {
		if (quantity > 1) {
			setQuantity(quantity - 1);
		}
		else{
			toast.error(`Bạn phải đặt hàng tối thiểu 1 sản phẩm.`);
		}
	};

	const handleQuantityInputChange = (event) => {
		const value = event.target.value;
		const intValue = parseInt(value, 10);
		// if (!isNaN(intValue) && intValue > 0) {
		// 	setQuantity(intValue);
		// } else if (value === "") {
		// 	setQuantity("");
		// }

		if (value === "") {
			setQuantity("");
		} else if (!isNaN(intValue) && intValue > 0 && intValue <= countSize) {
			setQuantity(intValue);
		} else if (intValue > countSize) {
			toast.error(`Bạn chỉ có thể đặt hàng tối đa ${countSize} sản phẩm.`);
			setQuantity(countSize);
		}
	};

	const handleAddToCart = async () => {
		if (!user) {
			toast.error(
				"Bạn cần phải đăng nhập trước khi thực hiện thêm sản phẩm vào giỏ hàng."
			);
			return;
		}

		
		if(quantity > countSize){
			toast.error(`Bạn chỉ có thể đặt hàng tối đa ${countSize} sản phẩm.`);
			return;
		}
		if(quantity > countSize){
			toast.error(`Bạn chỉ có thể đặt hàng tối đa ${countSize} sản phẩm.`);
			return;
		}

		try {
			const data = await cartService.addToCart(
				user.id,
				product.id,
				quantity,
				size
			);
			if (data) {
				setTotalProductInCart(data.length);
				setIsModalOpen(false);
				toast.success("Đã thêm vào giỏ hàng thành công.");
			}
		} catch (error) {
			console.log(error);
			toast.error("Lỗi khi thêm sản phẩm vào giỏ hàng.");
		}
	};

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
			aria-hidden="false"
		>
			<div
				className="modal-overlay"
				onClick={onClose} // Đóng modal khi click overlay
			>
				<div
					className="modal-add-to-cart modal-dialog modal-dialog-centered"
					role="document"
					onClick={(e) => e.stopPropagation()} // Ngăn click từ modal lan ra overlay
				>
					<div
						className="modal-content"
						style={{ padding: "10px", textAlign: "center" }}
					>
						<div className="modal-body">
							<h3 className="fw-bold">Chọn kích thước & số lượng</h3>
							<p>
								<strong>Còn lại: {countSize} sản phẩm</strong>
							</p>
							<div className="d-flex justify-content-center align-items-center">
								<div className="media-size">
									<select
										className="size-selector me-4 p-2 fw-bold"
										value={size}
										onChange={(e) => {
											const selectedSize = e.target.value;
											setSize(selectedSize);
	
											const foundSize = product.productSize.find(
												(item) => item.size.toString() === selectedSize
											);
	
											if (foundSize) {
												console.log("Setting countSize to:", foundSize.quantity);
												setCountSize(foundSize.quantity);
											}
										}}
									>
										{product.productSize.map((size, index) => (
											<option key={index} value={size.size}>
												{size.size}
											</option>
										))}
									</select>
								</div>
								<div
									className="quantity-title d-flex justify-content-start align-items-center"
									style={{ padding: "20px 0" }}
								>
									<button
										type="button"
										onClick={decreaseQuantity}
										className="qty-btn"
									>
										<i className="bi bi-dash fs-4"></i>
									</button>
									<input
										type="text"
										id="quantity"
										name="quantity"
										value={quantity}
										min="1"
										onChange={handleQuantityInputChange}
										className="quantity-input"
									></input>
									<button
										type="button"
										onClick={increaseQuantity}
										className="qty-btn"
									>
										<i className="bi bi-plus fs-4"></i>
									</button>
								</div>
							</div>
							<button
								className="btn btn-add-to-cart"
								style={{
									fontWeight: "600",
									color: "#fff",
									border: "1px solid red",
									background: "red",
									padding: "10px 15px",
								}}
								onClick={handleAddToCart}
							>
								THÊM VÀO GIỎ HÀNG
							</button>
						</div>
						<Link to={`/products/${product.id}`}>
							<span
								className="text-info text-decoration-underline"
								style={{ fontSize: "14px" }}
							>
								Xem chi tiết sản phẩm
							</span>
						</Link>
						<button className="btn-close" onClick={onClose}></button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ModalAddToCart;

import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as cartService from "../../services/CartService";
import { AppContext } from "../../context/AppContext";
import ModalDeleteToCart from "../../components/ModalDeleteToCart";

const Cart = () => {
	const [listCart, setListCart] = useState([]);
	const [message, setMessage] = useState(false);
	const [total, setTotal] = useState(0);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [card_id, setCard_id] = useState(null);
	const { user, totalProductInCart, setTotalProductInCart } =
		useContext(AppContext);
	const navigate = useNavigate();

	const fetchListCart = async () => {
		try {
			const data = await cartService.cartOfUser(user.id);
			setListCart(data);
			setTotalProductInCart(data.length);
			calculateTotal(data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchListCart();
	}, [totalProductInCart]);

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
		setTotal(totalPrice);
	};

	const handleDeleteToCart = async () => {
		try {
			console.log(card_id);
			await cartService.deleteToCart(card_id, user.id);
			setTotalProductInCart(totalProductInCart - 1);
			setIsModalOpen(false);
			console.log("Xoa thanh cong.");
		} catch (error) {
			console.log(error);
		}
	};

	const handleQuantityChange = async (
		newCount,
		currentCount,
		product_id,
		size
	) => {
		if (currentCount === 1 && newCount === -1) {
			return;
		}
		try {
			await cartService.addToCart(user.id, product_id, newCount, size);
			console.log("Update cart thành công.");
			fetchListCart();
		} catch (error) {
			console.error("Error adding item to cart:", error);
		}
	};

	const handleSizeChange = async (id_cart_size, product_id, count, newSize) => {
		try {
			await cartService.deleteToCart(id_cart_size, user.id);
			const data = await cartService.addToCart(
				user.id,
				product_id,
				count,
				newSize
			);
			fetchListCart();
			console.log("Size change thành công.");
		} catch (error) {
			console.log("Size change fail.", error);
		}
	};

	const handleCheckOut = () => {
		if (total < 40000) {
			setMessage(true);
			return;
		} else {
			navigate("/checkout");
		}
	};

	return (
		<div>
			<ModalDeleteToCart
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				handleDelete={handleDeleteToCart}
			/>
			<div className="cart pb-5" style={{ background: "#f5f5f5" }}>
				<div className="container-fluid">
					<div className="breadcrumb-shop" style={{ padding: "9px 0" }}>
						<nav aria-label="breadcrumb">
							<ol class="breadcrumb">
								<li class="breadcrumb-item">
									<Link
										to="/home"
										style={{ color: "darkgray", fontWeight: "400" }}
									>
										Trang chủ
									</Link>
								</li>
								<li
									class="breadcrumb-item active"
									style={{ color: "darkgray", fontWeight: "400" }}
									aria-current="page"
								>
									Giỏ hàng ({totalProductInCart})
								</li>
							</ol>
						</nav>
					</div>
					<div>
						<div className="cart-content">
							<div className="row">
								<div class="col-lg-8 col-8 cart-detail">
									<div
										className="main-cart-detail"
										style={{
											background: "#fff",
											borderRadius: "4px",
											marginRight: "12px",
										}}
									>
										<h4
											className="heading-cart"
											style={{ padding: "10px 15px", fontWeight: "bold" }}
										>
											Giỏ hàng của bạn
										</h4>
										<hr></hr>
										{listCart.length !== 0 ? (
											<div
												className="list-pageform-cart"
												style={{ padding: "15px" }}
											>
												<div
													className="title-number-cart"
													style={{ padding: "0 0 15px" }}
												>
													<p>
														Bạn đang có{" "}
														<strong>{totalProductInCart} sản phẩm </strong>trong
														giỏ hàng
													</p>
												</div>
												<div
													className="table-cart"
													style={{
														padding: "8px 10px",
														border: "2px solid darkgrey",
														borderRadius: "7px",
													}}
												>
													{listCart.map((item, index) => (
														<>
															<div className="media-line-item">
																<div className="media-left d-flex justify-content-start align-items-center">
																	<div className="item-img">
																		<Link to={`/products/${item.product.id}`}>
																			<img
																				src={
																					item.product.productImage[0].url_Image
																				}
																				alt="Product Image"
																			></img>
																		</Link>
																	</div>
																	<button
																		className="item-remove"
																		onClick={() => {
																			setIsModalOpen(true);
																			setCard_id(item.id);
																		}}
																	>
																		Xóa
																	</button>

																	<div className="media-product-name-price ms-5">
																		<div className="item-info pb-2">
																			<Link to={`/products/${item.product.id}`}>
																				<p
																					className="item-name"
																					style={{
																						overflow: "hidden",
																						fontSize: "18px",
																						fontWeight: "500",
																						color: "#111111",
																						width: "370px",
																					}}
																				>
																					{item.product.product_Name}
																				</p>
																			</Link>
																		</div>
																		<div className="item-price">
																			{item.product.promotion_Item &&
																			item.product.promotion_Item.length > 0 &&
																			item.product.promotion_Item[0].discount >
																				0 ? (
																				<div className="product-price d-flex align-items-center">
																					<span
																						className="price-sale fw-bold"
																						style={{
																							fontSize: "18px",
																							fontWeight: "600",
																							color: "#8f9bb3",
																							paddingRight: "10px",
																						}}
																					>
																						{`${new Intl.NumberFormat(
																							"vi-VN"
																						).format(
																							item.product.price -
																								(item.product.price *
																									item.product.promotion_Item[0]
																										.discount) /
																									100
																						)}₫`}
																					</span>
																					<span
																						className="price text-decoration-line-through text-black-50"
																						style={{
																							fontSize: "14px",
																						}}
																					>
																						{`${new Intl.NumberFormat(
																							"vi-VN"
																						).format(item.product.price)}₫`}
																					</span>
																				</div>
																			) : (
																				<div>
																					<span
																						className="price fw-bold"
																						style={{ fontSize: "18px" }}
																					>
																						{`${new Intl.NumberFormat(
																							"vi-VN"
																						).format(item.product.price)}₫`}
																					</span>
																				</div>
																			)}
																		</div>
																	</div>
																</div>
																<div className="d-flex justify-content-end align-items-center">
																	<div className="media-size">
																		<select
																			className="size-selector me-5 p-2 fw-bold"
																			value={item.size}
																			onChange={(event) =>
																				handleSizeChange(
																					item.id,
																					item.product.id,
																					item.count,
																					event.target.value
																				)
																			}
																		>
																			{item.product.productSize.map(
																				(size, index) => (
																					<option key={index} value={size.size}>
																						{size.size}
																					</option>
																				)
																			)}
																		</select>
																	</div>
																	<div className="media-total d-flex flex-column justify-content-center align-items-center">
																		<div className="line-item-total pb-2">
																			{item.product.promotion_Item &&
																			item.product.promotion_Item.length > 0 &&
																			item.product.promotion_Item[0].discount >
																				0 ? (
																				<span
																					className="total"
																					style={{
																						fontSize: "20px",
																						fontWeight: "700",
																					}}
																				>
																					{`${new Intl.NumberFormat(
																						"vi-VN"
																					).format(
																						(item.product.price -
																							(item.product.price *
																								item.product.promotion_Item[0]
																									.discount) /
																								100) *
																							item.count
																					)}₫`}
																				</span>
																			) : (
																				<span
																					className="total"
																					style={{
																						fontSize: "20px",
																						fontWeight: "700",
																					}}
																				>
																					{`${new Intl.NumberFormat(
																						"vi-VN"
																					).format(
																						item.product.price * item.count
																					)}₫`}
																				</span>
																			)}
																		</div>
																		<div className="item-qty d-flex justify-content-start align-items-center">
																			<button
																				type="button"
																				onClick={() =>
																					handleQuantityChange(
																						-1,
																						item.count,
																						item.product.id,
																						item.size
																					)
																				}
																				className="qty-btn"
																			>
																				<i className="bi bi-dash fs-4"></i>
																			</button>
																			<input
																				type="text"
																				id="quantity"
																				name={`quantity${index}`}
																				value={item.count}
																				min="1"
																				class="quantity-input"
																				aria-readonly
																			></input>
																			<button
																				type="button"
																				onClick={() =>
																					handleQuantityChange(
																						+1,
																						item.count,
																						item.product.id,
																						item.size
																					)
																				}
																				className="qty-btn"
																			>
																				<i className="bi bi-plus fs-4"></i>
																			</button>
																		</div>
																	</div>
																</div>
															</div>
															{index < listCart.length - 1 && <hr />}
														</>
													))}
												</div>
											</div>
										) : (
											<div
												class="expanded-message"
												style={{ fontSize: "18px", padding: "20px 15px" }}
											>
												Giỏ hàng của bạn đang trống
											</div>
										)}
									</div>
								</div>
								<div className="col-lg-4 col-4 order-summary">
									<div
										className="order-summary-content"
										style={{
											background: "#fff",
											padding: "15px",
											marginBottom: "15px",
											borderRadius: "4px",
										}}
									>
										<h4
											className="summary-title"
											style={{
												fontWeight: "bold",
												paddingTop: "10px",
												paddingBottom: "15px",
											}}
										>
											Thông tin đơn hàng
										</h4>
										<hr />
										<div className="summary-total d-flex justify-content-between align-items-center py-2">
											<span className="fw-bold">Tổng tiền: </span>
											<span
												style={{
													fontSize: "24px",
													fontWeight: "bold",
													color: "red",
												}}
											>{`${new Intl.NumberFormat("vi-VN").format(
												total
											)}₫`}</span>
										</div>
										<hr />
										<div className="summary-action ms-3 py-3">
											<ul style={{ fontSize: "14px" }}>
												<li>Phí vận chuyển sẽ được tính ở trang thanh toán.</li>
												<li>
													Bạn cũng có thể nhập mã giảm giá ở trang thanh toán.
												</li>
											</ul>
										</div>
										{message && (
											<p className="text-danger pb-3">
												Giỏ hàng của bạn hiện chưa đạt mức tối thiểu để thanh
												toán.
											</p>
										)}

										<button onClick={handleCheckOut} className="btn-checkout">
											THANH TOÁN
										</button>
									</div>
									<div
										class="summary-warning alert-order"
										style={{
											padding: "12px 15px",
											borderRadius: "4px",
											background: "#d9edf7",
										}}
									>
										<p class="textmr">
											<strong>Chính sách mua hàng</strong>:
										</p>
										<p style={{ fontSize: "14px", paddingTop: "5px" }}>
											Hiện chúng tôi chỉ áp dụng thanh toán với đơn hàng có giá
											trị tối thiểu <strong>40.000₫ </strong> trở lên.
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Cart;

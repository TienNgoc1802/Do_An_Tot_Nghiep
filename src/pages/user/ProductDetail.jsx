import React, { useState, useEffect, useRef, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import ProductImagesSlider from "../../components/ProductImagesSlider";
import ProductSlider from "../../components/ProductSlider";
import banner from "../../assets/image/shoe-banner.jpg";
import * as productService from "../../services/ProductService";
import * as cartService from "../../services/CartService";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-hot-toast";

const ProductDetail = () => {
	const { product_id } = useParams();
	const [quantity, setQuantity] = useState(1);
	const itemRefs = useRef([]);
	const [focusedIndex, setFocusedIndex] = useState(0);
	const [product, setProduct] = useState(null);
	const { user, setTotalProductInCart } = useContext(AppContext);
	const [size, setSize] = useState(null);

	const handleItemClick = (index) => {
		setFocusedIndex(index);
		console.log(size);
		setSize(product.productSize[index].size);
		setTimeout(() => {
			console.log("Item clicked:", product.productSize[index].size, index);
		}, 0);
	};

	const handleBlur = () => {
		itemRefs.current[focusedIndex]?.focus();
	};

	const increaseQuantity = () => {
		setQuantity(quantity + 1);
	};

	const decreaseQuantity = () => {
		if (quantity > 1) {
			setQuantity(quantity - 1);
		}
	};

	const handleQuantityInputChange = (event) => {
		const value = event.target.value;
		const intValue = parseInt(value, 10);
		if (!isNaN(intValue) && intValue > 0) {
			setQuantity(intValue);
		} else if (value === "") {
			setQuantity("");
		}
	};

	useEffect(() => {
		const fetchProductDetail = async () => {
			try {
				const data = await productService.getProductById(product_id);
				setProduct(data);
				setSize(data.productSize[focusedIndex].size);
			} catch (error) {
				console.log(error);
			}
		};

		fetchProductDetail();
	}, []);

	const handleAddToCart = async () => {
		if(!user){
			toast.error("Bạn cần phải đăng nhập trước khi thực hiện thêm sản phẩm vào giỏ hàng.");
			return;
		}

		try {
			const data = await cartService.addToCart(
				user.id,
				product_id,
				quantity,
				size
			);
			if (data) {
				setTotalProductInCart(data.length);
				toast.success("Đã thêm vào giỏ hàng thành công.");
			}
		} catch (error) {
			console.log(error);
			toast.error("Lỗi khi thêm sản phẩm vào giỏ hàng.");
		}
	};

	if (!product) {
		return <div className="fs-1 text-danger">Loading...</div>;
	}

	return (
		<div>
			<div className="product-detail pb-5" style={{ background: "#f5f5f5" }}>
				<div className="container-fluid">
					<div className="breadcrumb-shop" style={{ padding: "9px 0" }}>
						<nav aria-label="breadcrumb">
							<ol className="breadcrumb">
								<li className="breadcrumb-item">
									<Link
										to="/home"
										style={{ color: "darkgray", fontWeight: "400" }}
									>
										Trang Chủ
									</Link>
								</li>
								<li className="breadcrumb-item">
									<Link to="" style={{ color: "darkgray", fontWeight: "400" }}>
										{product.categoryName}
									</Link>
								</li>
								<li
									className="breadcrumb-item active"
									style={{ color: "darkgray", fontWeight: "400" }}
									aria-current="page"
								>
									{product.product_Name}
								</li>
							</ol>
						</nav>
					</div>
				</div>
				<div className="product-detail">
					<div className="container-fluid">
						<div className="d-flex">
							<div className="product-detail-gallery">
								<ProductImagesSlider productImages={product.productImage} />
							</div>
							<div className="product-detail-content">
								<div
									style={{
										padding: "12px",
										marginLeft: "12px",
										background: "#fff",
										width: "850.17px",
										height: "569px",
									}}
								>
									<div
										className="product-heading"
										style={{ paddingBottom: "20px" }}
									>
										<h2 className="fw-bold pb-2">{product.product_Name}</h2>
										<div className="sold-old">
											<span>Tình trạng: </span>
											<strong style={{ color: "#F9BB01" }}>
												{product.is_Active === 1 ? `Còn hàng` : `Hết hàng`}
											</strong>
										</div>
									</div>
									<div className="d-flex flex-wrap">
										<div
											className="col-lg-8 wrapbox-left"
											style={{ paddingRight: "12px" }}
										>
											<div className="tilte-description">
												<span>
													<strong>Mô tả sản phẩm: </strong>
													{product.description}
												</span>
											</div>
											<div
												className="price-title d-flex justify-content-start align-items-center"
												style={{
													background: "#fafafa",
													padding: "12px",
													borderRadius: "4px",
													margin: "12px 0",
												}}
											>
												<span
													style={{
														fontWeight: "bold",
														paddingRight: "65px",
													}}
												>
													Giá:
												</span>
												{product.promotion_Item &&
												product.promotion_Item.length > 0 &&
												product.promotion_Item[0].discount ? (
													<div className="product-price d-flex align-items-center">
														<span
															className="price-sale fw-bold"
															style={{
																fontSize: "24px",
																color: "#ff0000",
																paddingRight: "10px",
															}}
														>
															{`${new Intl.NumberFormat("vi-VN").format(
																product.price -
																	product.price *
																		(product.promotion_Item[0].discount / 100)
															)}₫`}
														</span>
														<span
															className="price text-decoration-line-through text-black-50"
															style={{ fontSize: "18px", paddingRight: "50px" }}
														>
															{`${new Intl.NumberFormat("vi-VN").format(
																product.price
															)}₫`}
														</span>

														<div className="discount">
															<span
																style={{
																	fontSize: "13px",
																	background: "#fff",
																	color: "#ff0000",
																	border: "1px solid #ff0000",
																	padding: "3px 14px",
																	borderRadius: "3px",
																	fontWeight: "bold",
																}}
															>
																-{product.promotion_Item[0].discount}%
															</span>
														</div>
													</div>
												) : (
													<div>
														<span
															className="price fw-bold"
															style={{ fontSize: "24px" }}
														>
															{`${new Intl.NumberFormat("vi-VN").format(
																product.price
															)}₫`}
														</span>
													</div>
												)}
											</div>
											<div className="size-title d-flex justify-content-start align-items-center">
												<span
													style={{
														paddingRight: "12px",
														paddingLeft: "12px",
														fontWeight: "bold",
													}}
												>
													Kích thước:
												</span>
												{product.productSize.map((size, index) => (
													<div
														key={size.size}
														className="size-item"
														tabIndex="0"
														onClick={() => handleItemClick(index)}
														onBlur={handleBlur}
														style={{
															borderColor:
																index === focusedIndex ? "#f9bb01" : "#111111",
															color:
																index === focusedIndex ? "#f9bb01" : "black",
														}}
													>
														<span>{size.size}</span>
													</div>
												))}
											</div>
											<div
												className="quantity-title d-flex justify-content-start align-items-center"
												style={{ padding: "12px 0" }}
											>
												<span
													style={{
														paddingRight: "24px",
														paddingLeft: "12px",
														fontWeight: "bold",
													}}
												>
													Số lượng:
												</span>
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
													onChange={handleQuantityInputChange}
													min="1"
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
											{product.is_Active === 1 ? (
												<div
													className="btn-add-to-cart"
													style={{ paddingLeft: "12px", paddingTop: "20px" }}
												>
													<button
														type="button"
														onClick={handleAddToCart}
														id="add-to-cart"
													>
														THÊM VÀO GIỎ HÀNG
													</button>
												</div>
											) : (
												<div
													style={{ paddingLeft: "12px", paddingTop: "20px" }}
												>
													<span
														style={{
															color: "#929292",
															border: "1px solid #929292",
															background: "#fff",
															borderRadius: "4px",
															padding: "10px 30px",
															fontWeight: "bold",
														}}
													>
														HẾT HÀNG
													</span>
												</div>
											)}
										</div>
										<div
											className="col-lg-4 wrapbox-right"
											style={{ paddingLeft: "12px" }}
										>
											<div className="product-deliverly">
												<div className="title-deliverly">
													<span>Chính sách bán hàng</span>
												</div>
												<div className="infoList-deliverly">
													<div className="d-flex align-items-center deliverly-item">
														<i className="bi bi-box-seam text-black-50"></i>
														<span>Cam kết 100% chính hãng</span>
													</div>
													<div className="d-flex align-items-center deliverly-item">
														<i className="bi bi-telephone text-black-50"></i>
														<span>Hỗ trợ 24/7</span>
													</div>
												</div>
												<div className="title-deliverly">
													<span>Thông tin thêm</span>
												</div>
												<div className="infoList-deliverly">
													<div className="d-flex align-items-center deliverly-item">
														<i className="bi bi-shield-fill-check text-info"></i>
														<span>Hoàn tiến 111% nếu hàng giả</span>
													</div>
													<div className="d-flex align-items-center deliverly-item">
														<i className="bi bi-hand-thumbs-up-fill text-info"></i>
														<span>Mở hộp kiểm tra khi nhận hàng</span>
													</div>
													<div className="d-flex align-items-center deliverly-item">
														<i className="bi bi-reply-all-fill text-info"></i>
														<span>Đổi trả trong 7 ngày</span>
													</div>
												</div>
											</div>
											<div className="product-banner">
												<Link to="/collections/all">
													<img
														src={banner}
														alt="Product Banner"
														style={{
															width: "263.83px",
															height: "132px",
															padding: "12px 0",
														}}
													/>
												</Link>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				{/* <div className="product-same-type">
				<div className="container-fluid pt-5">
					<div className="mb-3">
						<h3 className="fw-bold">SẢN PHẨM CÙNG LOẠI</h3>
					</div>
					<div className="list-product-same-type">
						<ProductSlider />
					</div>
				</div>
			</div> */}
			</div>
		</div>
	);
};

export default ProductDetail;

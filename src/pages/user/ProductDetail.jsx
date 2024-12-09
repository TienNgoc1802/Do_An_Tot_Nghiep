import React, { useState, useEffect, useRef, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import ProductImagesSlider from "../../components/ProductImagesSlider";
import ProductSlider from "../../components/ProductSlider";
import banner from "../../assets/image/shoe-banner.jpg";
import * as productService from "../../services/ProductService";
import * as cartService from "../../services/CartService";
import * as voucherService from "../../services/VoucherService";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-hot-toast";
import { useLocation } from "react-router-dom";
import * as ratingService from "../../services/RatingService";

const ProductDetail = () => {
	const { product_id } = useParams();
	const [quantity, setQuantity] = useState(1);
	const itemRefs = useRef([]);
	const [focusedIndex, setFocusedIndex] = useState(0);
	const [product, setProduct] = useState(null);
	const { user, setTotalProductInCart } = useContext(AppContext);
	const [size, setSize] = useState(null);
	const [countSize, setCountSize] = useState(0);
	const [imageReview, setImageReview] = useState(null);
	const [review, setReview] = useState(null);
	const [rating, setRating] = useState(0);
	const [listRating, setListRating] = useState([]);
	const { copiedCode, setCopiedCode } = useContext(AppContext);
	const [voucher, setVoucher] = useState([]);
	const [validVouchers, setValidVouchers] = useState([]);
	const location = useLocation();

	const handleCopy = (code) => {
		navigator.clipboard.writeText(code); // Sao chép mã vào clipboard
		setCopiedCode(code); // Cập nhật trạng thái đã sao chép
	};

	// Lấy ID sản phẩm từ URL (ví dụ: /product/:id)
	const productId = location.pathname.split("/").pop();

	const fetchListRating = async () => {
		try {
			const data = await ratingService.getRatingsByProductId(product_id);
			setListRating(data);
		} catch (error) {
			console.log("fetch list rating fail!", error);
		}
	};

	const handleAddRating = async () => {
		try {
			const data = await ratingService.addRating(
				user.id,
				product_id,
				rating,
				review,
				imageReview
			);
			if (data) {
				toast.success("Đăng bài đánh giá thành công.");
				const newRating = {
					user: user,
					review: review,
					ratingValue: rating,
					img: imageReview,
				};

				setListRating((prevList) => [...prevList, newRating]);

				setRating(null); // Reset sao
				setReview(""); // Reset review
				setImageReview(null); // Reset ảnh
			}
		} catch (error) {
			toast.error("Đăng bài đánh giá thất bại.");
			console.log("Add rating fail!", error);
		}
	};

	const handleSubmitRating = (e) => {
		e.preventDefault();

		if (rating === null) {
			toast.error("Bạn cần phải chọn số sao đánh giá.");
			return;
		}

		if (user === null) {
			toast.error("Bạn cần đăng nhập để đăng bài viết đánh giá.");
			return;
		}

		handleAddRating();
	};

	const calculateAverageRating = () => {
		if (listRating.length === 0) return 0; // Tránh chia cho 0

		const totalRating = listRating.reduce(
			(acc, curr) => acc + curr.ratingValue,
			0
		);
		return totalRating / listRating.length;
	};

	const averageRating = calculateAverageRating().toFixed(1);

	const countRatings = () => {
		return listRating.reduce((acc, curr) => {
			if (acc[curr.ratingValue]) {
				acc[curr.ratingValue]++;
			} else {
				acc[curr.ratingValue] = 1;
			}
			return acc;
		}, {});
	};

	const ratingCounts = countRatings();

	const handleRatingChange = (e) => {
		setRating(Number(e.target.value));
	};

	const handleImageUpload = (event) => {
		const file = event.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = () => {
				setImageReview(reader.result);
			};
			reader.readAsDataURL(file);
		}
	};

	const soLuong = (size) => {
		product.productSize.forEach((item) => {
			if (item.size === size) {
				setCountSize(item.quantity);
			}
		});
	};

	const handleItemClick = (index) => {
		setFocusedIndex(index);
		console.log(size);
		const newSize = product.productSize[index].size;
		setSize(newSize);
		soLuong(newSize);
		setTimeout(() => {
			console.log("Item clicked:", product.productSize[index].size, index);
		}, 0);
	};

	const handleBlur = () => {
		itemRefs.current[focusedIndex]?.focus();
	};

	const increaseQuantity = () => {
		if (quantity < countSize) {
			setQuantity(quantity + 1);
		} else {
			toast.error(`Số lượng đặt hàng tối đa là ${countSize} sản phẩm.`);
		}
	};

	const decreaseQuantity = () => {
		if (quantity > 1) {
			setQuantity(quantity - 1);
		} else {
			toast.error(`Số lượng đặt hàng tối thiểu là 1 sản phẩm.`);
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
			toast.error(`Số lượng đặt hàng tối đa là ${countSize} sản phẩm.`);
			setQuantity(countSize);
		}
	};

	const addProductToRecentlyViewed = (product) => {
		const key = "recentlyViewed";
		const storedProducts = sessionStorage.getItem(key);
		let recentlyViewed = storedProducts ? JSON.parse(storedProducts) : [];

		// Kiểm tra xem sản phẩm đã tồn tại trong danh sách chưa
		const isProductExist = recentlyViewed.some(
			(item) => item.id === product.id
		);
		if (!isProductExist) {
			recentlyViewed.push(product);
		}

		// Giới hạn số lượng sản phẩm được lưu (ví dụ: tối đa 10 sản phẩm)
		if (recentlyViewed.length > 10) {
			recentlyViewed.shift();
		}

		// Lưu lại vào sessionStorage
		sessionStorage.setItem(key, JSON.stringify(recentlyViewed));
	};

	const getRecentlyViewedProducts = () => {
		const key = "recentlyViewed";
		const storedProducts = sessionStorage.getItem(key);
		return storedProducts ? JSON.parse(storedProducts) : [];
	};

	const [recentlyViewed, setRecentlyViewed] = useState([]);

	const fecthVoucher = async () => {
		try {
			const data = await voucherService.getAllVoucher();
			setVoucher(data);

			const currentTime = Date.now();
			const validVouchers = data.filter(
				(item) => item.expirationDate > currentTime
			);

			setValidVouchers(validVouchers);
		} catch (error) {
			console.log("fetch voucher is fail!", error);
		}
	};

	const formatBookingDate = (milliseconds) => {
		const date = new Date(milliseconds);
		return date.toLocaleDateString("en-GB", {
			day: "2-digit",
			month: "2-digit",
			year: "numeric",
		});
	};

	useEffect(() => {
		if (!productId) return;

		const fetchProductDetail = async () => {
			try {
				const data = await productService.getProductById(product_id);
				setProduct(data);
				setSize(data.productSize[focusedIndex].size);
				setCountSize(data.productSize[focusedIndex].quantity);

				addProductToRecentlyViewed(data);
			} catch (error) {
				console.log(error);
			}
		};

		fetchProductDetail();
		fecthVoucher();
		fetchListRating();

		const products = getRecentlyViewedProducts();
		setRecentlyViewed(products);
	}, [productId]);

	const handleAddToCart = async () => {
		if (!user) {
			toast.error(
				"Bạn cần phải đăng nhập trước khi thực hiện thêm sản phẩm vào giỏ hàng."
			);
			return;
		}

		if (quantity > countSize) {
			toast.error(`Số lượng đặt hàng tối đa là ${countSize} sản phẩm.`);
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
										marginRight: "12px",
										background: "#fff",
										width: "838.17px",
										height: "569px",
									}}
								>
									<div
										className="product-heading"
										style={{ paddingLeft: "12px" }}
									>
										<h2 className="fw-bold pb-2">{product.product_Name}</h2>
										<div className="sold-old">
											<span>Tình trạng: </span>
											<strong style={{ color: "#F9BB01" }}>
												{product.is_Active === 1 ? `Còn hàng` : `Hết hàng`}
											</strong>
										</div>
										<span>
											Đã bán: <strong>{product.sold}</strong>
										</span>
									</div>
									<div className="d-flex flex-wrap">
										<div
											className="col-lg-8 wrapbox-left"
											style={{ paddingRight: "12px" }}
										>
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
												<span className="ms-4">
													<strong>Còn lại: {countSize} sản phẩm</strong>
												</span>
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
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="coupon mb-5">
					<div className="container-fluid pt-5">
						<div className="top-title pb-3 d-flex justify-content-start">
							<span class="border border-2 border-black"></span>
							<h3 className="ps-2 fw-bold">MÃ GIẢM GIÁ</h3>
						</div>
						<div className="list-coupon d-flex flex-wrap">
							{validVouchers.map((item, index) => (
								<div className="item" key={index}>
									<div
										className="wd-coupon d-flex"
										style={{ fontSize: "14px" }}
									>
										<div className="wd-coupon-left d-flex">
											<strong>{item.discount / 1000}k</strong>
										</div>
										<div className="wd-coupon-right">
											<div className="wd-coupon-right-top pb-3">
												<div className="fw-bold">{item.description}</div>
												<span>Đơn hàng từ {item.paymentLimit / 1000}k</span>
											</div>
											<div className="wd-coupon-right-bottom d-flex justify-content-center align-items-center">
												<div className="wd-coupon-detail me-2">
													<div>
														<span>
															Mã: <strong>{item.code}</strong>
														</span>
													</div>
													<span>
														HSD: {formatBookingDate(item.expirationDate)}
													</span>
												</div>
												<div className="wd-coupon-copy">
													<button
														className={`clone-coupon ${
															copiedCode === item.code ? "copied" : ""
														}`}
														type="button"
														onClick={() => handleCopy(item.code)}
													>
														{copiedCode === item.code
															? "Đã sao chép"
															: "Sao chép mã"}
													</button>
												</div>
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>

				<div
					className="product-description-rating"
					style={{ margin: "0 12px" }}
				>
					<div
						className="container-fluid"
						style={{
							background: "#fff",
							padding: "12px",
						}}
					>
						<nav>
							<div className="nav nav-tabs" id="nav-tab" role="tablist">
								<button
									className="nav-link active"
									id="nav-description-tab"
									data-bs-toggle="tab"
									data-bs-target="#nav-description"
									type="button"
									role="tab"
									aria-controls="nav-description"
									aria-selected="true"
								>
									MÔ TẢ
								</button>
								<button
									className="nav-link"
									id="nav-rating-tab"
									data-bs-toggle="tab"
									data-bs-target="#nav-rating"
									type="button"
									role="tab"
									aria-controls="nav-rating"
									aria-selected="false"
								>
									ĐÁNH GIÁ SẢN PHẨM
								</button>
								<button
									className="nav-link"
									id="nav-payment-tab"
									data-bs-toggle="tab"
									data-bs-target="#nav-payment"
									type="button"
									role="tab"
									aria-controls="nav-payment"
									aria-selected="false"
								>
									CHÍNH SÁCH THANH TOÁN
								</button>
								<button
									className="nav-link"
									id="nav-return-tab"
									data-bs-toggle="tab"
									data-bs-target="#nav-return"
									type="button"
									role="tab"
									aria-controls="nav-return"
									aria-selected="false"
								>
									CHÍNH SÁCH ĐỔI TRẢ
								</button>
							</div>
						</nav>
						<div className="tab-content" id="nav-tabContent">
							<div
								className="tab-pane fade show active"
								id="nav-description"
								role="tabpanel"
								aria-labelledby="nav-description-tab"
							>
								<p>&nbsp;</p>
								<div className="product-description">
									<div
										dangerouslySetInnerHTML={{ __html: product.description }}
									/>
								</div>
							</div>
							<div
								className="tab-pane fade"
								id="nav-rating"
								role="tabpanel"
								aria-labelledby="nav-rating-tab"
							>
								<p>&nbsp;</p>
								<div className="rating-content">
									<div
										className="content-header d-flex"
										style={{ gap: "20px" }}
									>
										<div
											className="content-left"
											style={{
												flex: 1,
												background: "#EEEEEE",
												display: "flex",
												flexDirection: "column",
												alignItems: "center",
												justifyContent: "center",
											}}
										>
											<p
												style={{
													color: "#000",
													fontSize: "24px",
													fontWeight: "500",
												}}
											>
												Sao trung bình
											</p>
											<p
												style={{
													color: "#33FF33",
													fontSize: "50px",
													fontWeight: "bold",
													padding: "15px 0px",
												}}
											>
												{averageRating}
											</p>
											<p>({listRating.length} lượt đánh giá)</p>
										</div>
										<div
											className="content-right"
											style={{
												flex: 1,
											}}
										>
											<p
												style={{
													fontSize: "18px",
													color: "#000",
													fontWeight: "bold",
													paddingBottom: "10px",
												}}
											>
												{listRating.length} lượt đánh giá
											</p>
											<p style={{ fontSize: "14px" }}>
												5 ⭐⭐⭐⭐⭐ (Có {ratingCounts[5] || 0} lượt đánh giá)
											</p>
											<p style={{ fontSize: "14px" }}>
												4 ⭐⭐⭐⭐ (Có {ratingCounts[4] || 0} lượt đánh giá)
											</p>
											<p style={{ fontSize: "14px" }}>
												3 ⭐⭐⭐ (Có {ratingCounts[3] || 0} lượt đánh giá)
											</p>
											<p style={{ fontSize: "14px" }}>
												2 ⭐⭐ (Có {ratingCounts[2] || 0} lượt đánh giá)
											</p>
											<p style={{ fontSize: "14px" }}>
												1 ⭐ (Có {ratingCounts[1] || 0} lượt đánh giá)
											</p>
										</div>
									</div>
									<div
										className="content-center"
										style={{
											margin: "20px 0",
										}}
									>
										<p className="fw-bold pb-1">Viết đánh giá của bạn</p>
										<form className="form-review" onSubmit={handleSubmitRating}>
											<div className="row">
												{imageReview ? (
													<div className="d-flex" style={{ gap: "20px" }}>
														<div style={{ flex: 2 }}>
															<img
																src={imageReview}
																alt="Selected"
																accept="image/*"
																style={{ width: "200px", height: "200px" }}
															/>
														</div>
														<div style={{ flex: 10 }}>
															<textarea
																name="review"
																type="text"
																className="form-control"
																style={{ height: "200px", fontSize: "14px" }}
																placeholder="Viết đánh giá của bạn..."
																required
																value={review}
																onChange={(e) => setReview(e.target.value)}
															></textarea>
														</div>
													</div>
												) : (
													<div className="col-12">
														<textarea
															name="review"
															type="text"
															className="form-control"
															style={{ height: "100px", fontSize: "14px" }}
															placeholder="Viết đánh giá của bạn..."
															required
															value={review}
															onChange={(e) => setReview(e.target.value)}
														></textarea>
													</div>
												)}

												<div className="col-10 mt-3 d-flex">
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
													<div className="star-rating">
														<input
															type="radio"
															name="rating"
															id="star-1"
															className="rating-radio"
															value="5"
															checked={rating === Number(5)}
															onChange={handleRatingChange}
														></input>
														<label for="star-1">
															<i className="bi bi-star-fill"></i>
														</label>
														<input
															type="radio"
															name="rating"
															id="star-2"
															className="rating-radio"
															value="4"
															checked={rating === Number(4)}
															onChange={handleRatingChange}
														></input>
														<label for="star-2">
															<i className="bi bi-star-fill"></i>
														</label>
														<input
															type="radio"
															name="rating"
															id="star-3"
															className="rating-radio"
															value="3"
															checked={rating === Number(3)}
															onChange={handleRatingChange}
														></input>
														<label for="star-3">
															<i className="bi bi-star-fill"></i>
														</label>
														<input
															type="radio"
															name="rating"
															id="star-4"
															className="rating-radio"
															value="2"
															checked={rating === Number(2)}
															onChange={handleRatingChange}
														></input>
														<label for="star-4">
															<i className="bi bi-star-fill"></i>
														</label>
														<input
															type="radio"
															name="rating"
															id="star-5"
															className="rating-radio"
															value="1"
															checked={rating === Number(1)}
															onChange={handleRatingChange}
														></input>
														<label for="star-5">
															<i className="bi bi-star-fill"></i>
														</label>
													</div>
												</div>
												<div className="col-2 mt-3 d-flex justify-content-end">
													<button type="submit" className="btn btn-primary">
														Đăng
													</button>
												</div>
											</div>
										</form>
									</div>
									<div className="content-footer pt-3">
										{listRating?.map((item, index) => (
											<div key={index} className="item pb-4 d-flex">
												<img
													src={listRating[index].user.avatar}
													alt="Avatar"
													style={{
														maxWidth: "50px",
														maxHeight: "50px",
														borderRadius: "50%",
													}}
												/>
												<div className="ms-3">
													<p className="fw-bold">
														{listRating[index].user.user_Name}
													</p>
													{item.ratingValue === 1 ? (
														<p>⭐</p>
													) : item.ratingValue === 2 ? (
														<p>⭐⭐</p>
													) : item.ratingValue === 3 ? (
														<p>⭐⭐⭐</p>
													) : item.ratingValue === 4 ? (
														<p>⭐⭐⭐⭐</p>
													) : (
														<p>⭐⭐⭐⭐⭐</p>
													)}
													<p>{item.review}</p>
													{item.img && (
														<img
															src={item.img}
															alt="Review Image"
															style={{ width: "50px" }}
														/>
													)}
												</div>
											</div>
										))}
									</div>
								</div>
							</div>
							<div
								className="tab-pane fade"
								id="nav-payment"
								role="tabpanel"
								aria-labelledby="nav-payment-tab"
							>
								<div className="more-description">
									<p>&nbsp;</p>
									<p>
										<span className="wysiwyg-font-size-medium">
											<strong>1. Giới thiệu</strong>
										</span>
									</p>
									<p>
										<span className="wysiwyg-font-size-medium">
											Chào mừng quý khách hàng đến với website của ShoesShop
										</span>
									</p>
									<p>
										<span className="wysiwyg-font-size-medium">
											Khi quý khách hàng truy cập vào trang website của chúng
											tôi có nghĩa là quý khách đồng ý với các điều khoản này.
											Trang web có quyền thay đổi, chỉnh sửa, thêm hoặc lược bỏ
											bất kỳ phần nào trong Điều khoản mua bán hàng hóa này, vào
											bất cứ lúc nào. Các thay đổi có hiệu lực ngay khi được
											đăng trên trang web mà không cần thông báo trước. Và khi
											quý khách tiếp tục sử dụng trang web, sau khi các thay đổi
											về Điều khoản này được đăng tải, có nghĩa là quý khách
											chấp nhận với những thay đổi đó.
										</span>
									</p>
									<p>
										<span className="wysiwyg-font-size-medium">
											Quý khách hàng vui lòng kiểm tra thường xuyên để cập nhật
											những thay đổi của chúng tôi.
										</span>
									</p>
									<p>&nbsp;</p>
									<p>
										<span className="wysiwyg-font-size-medium">
											<strong>2. Hướng dẫn sử dụng website</strong>
										</span>
									</p>
									<p>
										<span className="wysiwyg-font-size-medium">
											Khi vào web của chúng tôi, khách hàng phải đảm bảo đủ 18
											tuổi, hoặc truy cập dưới sự giám sát của cha mẹ hay người
											giám hộ hợp pháp. Khách hàng đảm bảo có đầy đủ hành vi dân
											sự để thực hiện các giao dịch mua bán hàng hóa theo quy
											định hiện hành của pháp luật Việt Nam.
										</span>
									</p>
									<p>
										<span className="wysiwyg-font-size-medium">
											Trong suốt quá trình đăng ký, quý khách đồng ý nhận email
											quảng cáo từ website. Nếu không muốn tiếp tục nhận mail,
											quý khách có thể từ chối bằng cách nhấp vào đường link ở
											dưới cùng trong mọi email quảng cáo.
										</span>
									</p>
									<p>&nbsp;</p>
									<p>
										<span className="wysiwyg-font-size-medium">
											<strong>3. Thanh toán an toàn và tiện lợi</strong>
										</span>
									</p>
									<p>
										<span className="wysiwyg-font-size-medium">
											Người mua có thể tham khảo các phương thức thanh toán sau
											đây và lựa chọn áp dụng phương thức phù hợp:
										</span>
									</p>
									<p>
										<span className="wysiwyg-font-size-medium">
											<strong>
												<u>Cách 1</u>
											</strong>
											: Thanh toán trực tiếp (người mua nhận hàng tại địa chỉ
											cửa hàng)
										</span>
									</p>
									<p>
										<span className="wysiwyg-font-size-medium">
											<strong>
												<u>Cách 2</u>
											</strong>
											: Thanh toán sau (COD – giao hàng và thu tiền tận nơi)
										</span>
									</p>
									<p>
										<span className="wysiwyg-font-size-medium">
											<strong>
												<u>Cách 3</u>
											</strong>
											: Thanh toán online qua chuyển khoản
										</span>
									</p>
									<p>&nbsp;</p>
								</div>
							</div>
							<div
								className="tab-pane fade"
								id="nav-return"
								role="tabpanel"
								aria-labelledby="nav-return-tab"
							>
								<div className="more-description">
									<p>&nbsp;</p>
									<p>
										<strong>
											ShoesShop.vn luôn trân trọng sự tín nhiệm của quý khách
											giành cho chúng tôi. Chính vì vậy, chúng tôi luôn cố gắng
											để mang đến quý khách hàng những sản phẩm chất lượng cao
											và tiết kiệm chi phí.
										</strong>
									</p>
									<p>
										Thay cho cam kết về chất lượng sản phẩm, ShoesShop.vn thực
										hiện chính sách đổi trả hàng hóa. Theo đó, tất cả các sản
										phẩm được mua tại ShoesShop.vn đều có thể đổi size và mẫu
										trong vòng 07 ngày sau khi nhận hàng.
									</p>
									<p>
										Để được thực hiện đổi hàng hoá, Quý khách cần giữ lại Hóa
										đơn mua hàng tại ShoesShop.vn. Sản phẩm được đổi là những
										sản phẩm đáp ứng được những điều kiện trong Chính sách đổi
										trả hàng hóa.
									</p>
									<p>&nbsp;</p>
									<p>
										<strong>
											ShoesShop.vn thực hiện đổi hàng/trả lại tiền cho Quý
											khách, nhưng không hoàn lại phí vận chuyển hoặc lệ phí
											giao hàng, trừ những trường hợp sau:
										</strong>
									</p>
									<ul className="ps-4">
										<li>
											Không đúng chủng loại, mẫu mã như quý khách đặt hàng.
										</li>
										<li>
											Tình trạng bên ngoài bị ảnh hưởng như bong tróc, bể vỡ xảy
											ra trong quá trình vận chuyển,…
										</li>
										<li>
											Không đạt chất lượng như: phát hiện hàng fake, hàng kém
											chất lượng, không phải hàng chính hãng.
										</li>
									</ul>
									<p>
										Quý khách vui lòng kiểm tra hàng hóa và ký nhận tình trạng
										với nhân viên giao hàng ngay khi nhận được hàng. Khi phát
										hiện một trong các trường hợp trên, quý khách có thể trao
										đổi trực tiếp với nhân viên giao hàng hoặc phản hồi cho
										chúng tôi trong vòng 24h theo số Hotline: 084. 850. 6666
									</p>
									<p>&nbsp;</p>
									<p>
										<strong>
											ShoesShop.vn sẽ không chấp nhận đổi/trả hàng khi:
										</strong>
									</p>
									<ul className="ps-4">
										<li>Hàng hoá là hàng order.</li>
										<li>
											Thời điểm thông báo đổi trả quá 07 ngày kể từ khi Quý
											khách nhận hàng.
										</li>
										<li>
											Quý khách tự làm ảnh hưởng tình trạng bên ngoài như rách
											bao bì, bong tróc, bể vỡ, bị bẩn, hư hại (không còn như
											nguyên vẹn ban đầu),...
										</li>
										<li>
											Quý khách vận hành không đúng chỉ dẫn gây hỏng hóc hàng
											hóa.
										</li>
										<li>
											Quý khách đã kiểm tra và ký nhận tình trạng hàng hóa nhưng
											không có phản hồi trong vòng 24h kể từ lúc ký nhận hàng.
										</li>
										<li>Không còn size/mẫu mà khách hàng muốn đổi.</li>
										<li>Không đổi từ hàng hóa có sẵn sang hàng phải order.</li>
										<li>Sản phẩm đã cắt tag/mác.</li>
										<li>Sản phẩm đã qua sử dụng.</li>
									</ul>
									<p>&nbsp;</p>
									<p>
										<strong>
											ShoesShop thực hiện đổi trả theo quy trình sau:
										</strong>
									</p>
									<ul className="ps-4">
										<li>
											<strong>Bước 1:</strong> Quý khách liên hệ trực tiếp với
											ShoesShop qua số Hotline: 084. 850. 6666 để thông báo tình
											trạng hàng hoá cần đổi/trả trong vòng 07 ngày kể từ khi
											nhận hàng.
										</li>
										<li>
											<strong>Bước 2:</strong> Nhân viên ShoesShop sẽ tiếp nhận
											phản hồi và hướng dẫn bạn cung cấp thông tin đơn hàng để
											chúng tôi truy soát.
										</li>
										<li>
											<strong>Bước 3:</strong> Quý khách ship hàng cần đổi/trả
											kèm hoá đơn lại về địa chỉ của ShoesShop để chúng tôi kiểm
											tra.
										</li>
										<li>
											<strong>Bước 4:</strong> Sau khi kiểm tra hàng và xác nhận
											đủ sản phẩm đủ điều kiện đổi/trả, ShoesShop sẽ liên hệ lại
											xác nhận với bạn và gửi hàng về cho bạn theo địa chỉ bạn
											cung cấp.
										</li>
									</ul>
									<p>&nbsp;</p>
									<p>
										<em>
											Lưu ý: Quý khách sẽ phải chịu phí ship 2 chiều khi
											đổi/trả. Chỉ hỗ trợ đổi sản phẩm một lần duy nhất.
										</em>
									</p>
									<p>&nbsp;</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="viewed-products pt-5">
					<div className="container-fluid">
						<div className="mb-3">
							<h3 className="fw-bold">SẢN PHẨM ĐÃ XEM</h3>
						</div>
						<div className="list-viewed-products">
							<ProductSlider products={recentlyViewed} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductDetail;

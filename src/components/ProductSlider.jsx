import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper/core";
import { Navigation } from "swiper/modules";
import "swiper/swiper-bundle.css";
import "swiper/css";
import { Link } from "react-router-dom";
import ModalAddToCart from "./ModalAddToCart";

SwiperCore.use([Navigation]);

const ProductSlider = ({ products, type }) => {
	const [isBeginning, setIsBeginning] = useState(true);
	const [isEnd, setIsEnd] = useState(false);
	const swiperRef = useRef(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [product, setProduct] = useState({});

	useEffect(() => {
		if (swiperRef.current) {
			swiperRef.current.swiper.on("slideChange", () => {
				setIsBeginning(swiperRef.current.swiper.isBeginning);
				setIsEnd(swiperRef.current.swiper.isEnd);
			});
		}
	}, []);

	const handlePrevButtonClick = () => {
		if (swiperRef.current && swiperRef.current.swiper) {
			swiperRef.current.swiper.slidePrev();
		}
	};

	const handleNextButtonClick = () => {
		if (swiperRef.current && swiperRef.current.swiper) {
			swiperRef.current.swiper.slideNext();
		}
	};

	return (
		<div>
			<ModalAddToCart
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				product={product}
				setIsModalOpen = {setIsModalOpen}
			/>
			<div className="swiper-container" style={{ position: "relative" }}>
				<Swiper
					ref={swiperRef}
					spaceBetween={12}
					slidesPerView={5}
					breakpoints={{
						1362: {
							slidesPerView: 5,
							spaceBetween: 12,
						},
						1295: {
							slidesPerView: 5,
							spaceBetween: 12,
						},
						681: {
							slidesPerView: 3,
							spaceBetween: 12,
						},
					}}
				>
					{products.map((product, index) => (
						<SwiperSlide key={index}>
							<div className="product-card card">
								<Link to={`/products/${product.id}`}>
									<img
										src={product.productImage[0].url_Image}
										className="card-img-top"
										alt="ProductImage"
										style={{
											padding: "30px 3px 20px",
											height: "297.39px",
											width: "100%",
										}}
									></img>
								</Link>
								<div
									className="card-details"
									style={{ padding: "10px 14px 10px" }}
								>
									<div>
										<span className="category" style={{ fontSize: "13px" }}>
											{product.categoryName}
										</span>
										<br />
										<div
											style={{
												overflow: "hidden",
												whiteSpace: "nowrap",
												textOverflow: "ellipsis",
											}}
										>
											<Link to={`/products/${product.id}`}>
												<span className="product-name text-black">
													{product.product_Name}
												</span>
											</Link>
										</div>
									</div>
									<div
										className="d-flex justify-content-between align-items-center"
										style={{ height: "43.5px", margin: "10px 0" }}
									>
										{product.promotion_Item &&
										product.promotion_Item.length > 0 &&
										product.promotion_Item[0].discount > 0 ? (
											<div className="product-price d-flex flex-column">
												<span
													className="price-sale fw-bold"
													style={{ color: "#d0021c" }}
												>
													{`${new Intl.NumberFormat("vi-VN").format(
														product.price -
															product.price *
																(product.promotion_Item[0].discount / 100)
													)}₫`}
												</span>
												<span
													className="price text-decoration-line-through text-black-50"
													style={{ fontSize: "13px" }}
												>
													{`${new Intl.NumberFormat("vi-VN").format(
														product.price
													)}₫`}
												</span>
											</div>
										) : (
											<div>
												<span className="price fw-bold">
													{`${new Intl.NumberFormat("vi-VN").format(
														product.price
													)}₫`}
												</span>
											</div>
										)}

										<div className="d-flex justify-content-end align-items-center">
											{product.promotion_Item &&
												product.promotion_Item.length > 0 &&
												product.promotion_Item[0].discount > 0 && (
													<div className="discount">
														<span
															className="rounded-1 p-2 fw-bold"
															style={{
																fontSize: "13px",
																background: "#ff0000",
																color: "#fff",
															}}
														>
															-{product.promotion_Item[0].discount}%
														</span>
													</div>
												)}

											{type === "new" && (
												<div className="new">
													<span
														className="rounded-1 p-2 ms-1 fw-bold"
														style={{
															fontSize: "13px",
															background: "#fed700",
															color: "#fff",
														}}
													>
														NEW
													</span>
												</div>
											)}
										</div>
									</div>
									<div
										className="add-to-cart d-flex align-items-center justify-content-start"
										onClick={() => {
											setIsModalOpen(true);
											setProduct(product);
										}}
									>
										<div
											className="cart-icon rounded-circle d-flex align-items-center justify-content-center"
											style={{
												background: "#263b96",
												width: "32px",
												height: "32px",
											}}
										>
											<span>
												<i
													className="bi bi-cart3"
													style={{ color: "#fff" }}
												></i>
											</span>
										</div>
										<div className="text-add-cart">
											<span
												className="fw-bold ps-2"
												style={{ fontSize: "12px" }}
											>
												THÊM VÀO GIỎ HÀNG
											</span>
										</div>
									</div>
								</div>
							</div>
						</SwiperSlide>
					))}
				</Swiper>

				<div
					className="d-flex align-items-center justify-content-end"
					style={{
						position: "absolute",
						top: "0",
						right: "0",
						transform: "translateY(-100%)",
						paddingBottom: "18px",
					}}
				>
					<div
						className={`button-prev ${isBeginning ? "hidden" : ""}`}
						onClick={handlePrevButtonClick}
					>
						<i className="bi bi-arrow-left fs-4"></i>
					</div>
					<div className="px-1"></div>
					<div
						className={`button-next ${isEnd ? "hidden" : ""}`}
						onClick={handleNextButtonClick}
					>
						<i className="bi bi-arrow-right fs-4"></i>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductSlider;

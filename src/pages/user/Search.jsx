import { useContext, useEffect, useState } from "react";
import * as productService from "../../services/ProductService";
import { Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import ModalAddToCart from "../../components/ModalAddToCart";

const Search = () => {
	const [page, setPage] = useState(0);
	const [loading, setLoading] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [productPagination, setProductPagination] = useState(null);
	const [products, setProducts] = useState([]);
	const [product, setProduct] = useState({});
	const { searchContent } = useContext(AppContext);

	useEffect(() => {
		const fetchSearchProduct = async () => {
			if (!searchContent || searchContent.trim() === "") {
				return;
			}
			
			setLoading(true);
			try {
				const data = await productService.search(searchContent, page, 10);
				setProductPagination(data);
				setProducts((prev) => [...prev, ...(data.content || [])]);
			} catch (error) {
				console.log("Search product fail!", error);
			} finally {
				setLoading(false);
			}
		};

		fetchSearchProduct();
	}, [page, searchContent]);

	return (
		<div>
			<ModalAddToCart
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				product={product}
				setIsModalOpen={setIsModalOpen}
			/>
			<div className="search-content pb-5" style={{ background: "#f5f5f5" }}>
				<div className="container-fluid">
					<div
						className="search-detail-header"
						style={{
							paddingTop: "20px",
							marginBottom: "30px",
							textAlign: "center",
						}}
					>
						<h3 className="fw-bold mb-2">Tìm Kiếm</h3>
						{products.length > 0 && (
							<span>
								Có <strong>{productPagination?.totalElements} sản phẩm</strong>{" "}
								cho tìm kiếm
							</span>
						)}
						<div
							style={{
								margin: "20px auto 30px",
								display: "block",
								width: "60px",
								height: "4px",
								background: "black",
							}}
						></div>
						{products.length === 0 && (
							<div className="messaage">
								<p
									style={{
										fontSize: "18px",
										fontWeight: "700",
										paddingBottom: "13px",
									}}
								>
									Không tìm thấy nội dung bạn yêu cầu
								</p>
								<p>
									Không tìm thấy <strong>" {searchContent}"</strong>. Vui lòng
									kiểm tra chính tả, sử dụng các từ tổng quát hơn và thử lại!
								</p>
							</div>
						)}
					</div>
					<div className="search-detail-main">
						{products.length > 0 && (
							<p style={{ padding: "6px" }}>
								Kết quả tìm kiếm cho " {searchContent}".
							</p>
						)}
						<div className="list-product-search">
							<div className="custom-row">
								{products.map((product, index) => (
									<div className="custom-column" key={index}>
										<div
											className="product-card card"
											style={{ width: "100%" }}
										>
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
													<span
														className="category"
														style={{ fontSize: "13px" }}
													>
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
									</div>
								))}
							</div>
						</div>
						{page < productPagination?.totalPages - 1 && (
							<div className="d-flex justify-content-center align-items-center pt-3">
								<button
									className="btn-loadmore"
									onClick={() => setPage(page + 1)}
								>
									Xem Thêm Sản Phẩm
								</button>
								{loading && (
									<div
										class="spinner-border text-warning"
										role="status"
										style={{
											width: "20px",
											height: "20px",
											marginLeft: "10px",
										}}
									>
										<span class="visually-hidden">Loading...</span>
									</div>
								)}
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Search;

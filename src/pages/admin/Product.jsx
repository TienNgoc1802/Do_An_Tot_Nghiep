import React, { useEffect, useState } from "react";
import SideBar from "../../components/AdminSideBar";
import * as productService from "../../services/ProductService";
import { Link } from "react-router-dom";
import ModalDelete from "../../components/ModalDelete";
import toast from "react-hot-toast";

const Product = () => {
	const [page, setPage] = useState(0);
	const [products, setProducts] = useState([]);
	const [productId, setProductId] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [searchContent, setSearchContent] = useState("");

	const handlePrev = () => {
		if (page > 0) {
			setPage(page - 1);
		}
	};

	const fetchSearchProduct = async () => {
		if (!searchContent || searchContent.trim() === "") {
			fetchAllProducts();
			return;
		}

		try {
			const data = await productService.search(searchContent, page, 10);
			setProducts(data.content);
		} catch (error) {
			console.log("Search product fail!", error);
		}
	};

	const fetchAllProducts = async () => {
		try {
			const data = await productService.filterProduct(
				null,
				null,
				null,
				null,
				page,
				10
			);
			setProducts(data.content);
		} catch (error) {
			console.log("Fetch products fail: ", error);
		}
	};

	useEffect(() => {
		fetchAllProducts();
	}, [page]);

	const formatBookingDate = (milliseconds) => {
		const date = new Date(milliseconds);
		return date.toLocaleDateString("en-GB", {
			day: "2-digit",
			month: "2-digit",
			year: "numeric",
		});
	};

	const handleDeleteProduct = async () => {
		try {
			await productService.deleteProduct(productId);
			fetchAllProducts(page, 10);
			toast.success("Xóa sản phẩm thành công.");
			setIsModalOpen(false);
		} catch (error) {
			toast.error("Xóa sản phẩm thất bại.");
			setIsModalOpen(false);
			console.log("Delete product fail: ", error);
		}
	};

	return (
		<div>
			<ModalDelete
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				handleDelete={handleDeleteProduct}
				text={"Bạn có chắc chắn muốn xóa sản phẩm này?"}
			/>
			<div
				className="product"
				style={{ display: "flex", background: "#f5f5f5" }}
			>
				<SideBar />
				<div
					className="product-content"
					style={{ padding: "15px 20px", flex: "1" }}
				>
					<h3 className="fw-bold mb-4">Quản Lý Sản Phẩm</h3>
					<button className="btn btn-info text-light fw-bold mb-3">
						<Link to="/admin/products/add-product" className="text-light">
							Thêm sản phẩm
						</Link>
					</button>
					<div className="col-6">
						<div class="input-group mb-3">
							<input
								type="text"
								class="form-control"
								placeholder="Tìm kiếm sản phẩm"
								value={searchContent}
								onChange={(e) => setSearchContent(e.target.value)}
							/>
							<button
								class="btn btn-outline-secondary fw-bold"
								type="button"
								onClick={() => fetchSearchProduct()}
							>
								Tìm kiếm
							</button>
						</div>
					</div>
					<div className="d-flex" style={{ gap: "15px" }}>
						<div
							style={{
								background: "#fff",
								flex: "1",
								borderRadius: "10px",
								padding: "15px",
								boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
							}}
						>
							<table className="table table-striped">
								<thead>
									<tr>
										<th scope="col">#</th>
										<th scope="col">Tên sản phẩm</th>
										<th scope="col">Ngày tạo</th>
										<th scope="col">Hình ảnh sản phẩm</th>
										<th scope="col">Số lượng size</th>
										<th scope="col">Đã bán</th>
										<th scope="col">Giá bán</th>
										<th scope="col">Nhãn hàng</th>
										<th scope="col">Trạng thái</th>
										<th scope="col">Thao tác</th>
									</tr>
								</thead>
								<tbody>
									{products?.map((item, index) => (
										<tr key={{ index }}>
											<th scope="row">#{page * 10 + index + 1}</th>
											<td style={{ width: "20%" }}>{item.product_Name}</td>
											<td>{formatBookingDate(item.created_At)}</td>
											<td style={{ width: "10%", textAlign: "center" }}>
												{item.productImage.length}
											</td>
											<td style={{ width: "10%", textAlign: "center" }}>
												{item.productSize.length}
											</td>
											<td style={{ textAlign: "center" }}>{item.sold}</td>
											<td>{`${new Intl.NumberFormat("vi-VN").format(
												item.price
											)}₫`}</td>
											<td style={{ textAlign: "center" }}>
												{item.categoryName}
											</td>
											<td>{item.is_Active === 1 ? "Đăng bán" : "Ngừng bán"}</td>
											<td style={{ width: "10%", textAlign: "center" }}>
												<button className="btn">
													<Link
														to={`/admin/products/edit-product/${item.id}`}
													>
														<i className="bi bi-pencil-square text-info fs-6"></i>
													</Link>
												</button>
												<button
													className="btn"
													onClick={() => {
														setIsModalOpen(true);
														setProductId(item.id);
													}}
												>
													<i className="bi bi-trash3-fill text-danger fs-6"></i>
												</button>
											</td>
										</tr>
									))}
								</tbody>
							</table>
							<div className="page d-flex justify-content-center align-items-center">
								<nav
									aria-label="Page navigation example"
									style={{ cursor: "pointer" }}
								>
									<ul className="pagination">
										<li className="page-item" onClick={handlePrev}>
											<div className="page-link" aria-label="Previous">
												<span aria-hidden="true">&laquo;</span>
											</div>
										</li>
										<li className="page-item">
											<div className="page-link">{page + 1}</div>
										</li>
										<li className="page-item" onClick={() => setPage(page + 1)}>
											<div className="page-link" aria-label="Next">
												<span aria-hidden="true">&raquo;</span>
											</div>
										</li>
									</ul>
								</nav>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Product;

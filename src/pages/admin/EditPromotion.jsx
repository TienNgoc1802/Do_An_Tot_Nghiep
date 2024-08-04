import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import SideBar from "../../components/AdminSideBar";
import * as promotionService from "../../services/PromotionService";
import * as productService from "../../services/ProductService";
import { AppContext } from "../../context/AppContext";
import ModalAddProduct from "../../components/ModalAddProductInPromotion";
import toast from "react-hot-toast";

const EditPromotion = () => {
	const { id } = useParams();
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");
	const [discount, setDiscount] = useState("");
	const [isActive, setIsActice] = useState(1);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { selectedProducts, setSelectedProducts } = useContext(AppContext);

	const SLT = (items) => {
		let total = 0;
		items.forEach((size) => {
			total += size.quantity;
		});
		return total;
	};

	const formatBookingDate = (milliseconds) => {
		const date = new Date(milliseconds);
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, "0");
		const day = String(date.getDate()).padStart(2, "0");

		return `${year}-${month}-${day}`;
	};

	const fetchPromoByID = async () => {
		try {
			const data = await promotionService.getPromotionByID(id);
			setName(data.name);
			setDescription(data.description);
			setStartDate(formatBookingDate(data.startDate));
			setEndDate(formatBookingDate(data.endDate));
			setDiscount(data.discount);
			setIsActice(data.is_Active);
		} catch (error) {
			console.log("Fetch promotion by id fail: ", error);
		}
	};

	const fetchProductByPromoID = async () => {
		try {
			const data = await productService.productByPromotionID(id);
			setSelectedProducts(data);
		} catch (error) {
			console.log("Fetch product by promotion id fail: ", error);
		}
	};

	useEffect(() => {
		fetchPromoByID();
		fetchProductByPromoID();
	}, []);

	const handleEditPromotion = async (e) => {
		e.preventDefault();
		const productIds = selectedProducts.map((product) => product.id);

		try {
			await promotionService.editPromotion(
				id,
				name,
				description,
				startDate,
				endDate,
				discount,
				isActive,
				productIds
			);
			toast.success("Cập nhật thông tin khuyến mãi thành công.");
			fetchPromoByID(id);
			fetchProductByPromoID(id);
			setSelectedProducts([]);

		} catch (error) {
			toast.error("Cập nhật thông tin khuyến mãi thất bại.");
			console.error("Error response data:", error.response.data);
			console.error("Error response status:", error.response.status);
			console.error("Error response headers:", error.response.headers);
		}
	};

	return (
		<div>
			<ModalAddProduct
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
			/>
			<div
				className="edit-promotion"
				style={{ display: "flex", background: "#f5f5f5" }}
			>
				<SideBar />
				<div
					className="edit-promotion-content"
					style={{ padding: "15px 20px", flex: "1" }}
				>
					<div className="d-flex justify-content-between align-items-center">
						<h3 className="fw-bold">Cập nhật thông tin khuyến mãi</h3>
						<Link to="/admin/promotion" className="text-info">
							<i className="bi bi-chevron-double-left"></i> Quay lại
						</Link>
					</div>
					<div
						className="mt-4"
						style={{
							background: "#fff",
							padding: "15px",
							boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
							borderRadius: "10px",
						}}
					>
						<form className="form-add-user" onSubmit={handleEditPromotion}>
							<div className="row">
								<div className="col-12 col-lg-12">
									<label className="form-label fw-bold">Tên khuyến mãi</label>
									<input
										name="name"
										type="text"
										className="form-control"
										placeholder="Tên khuyến mãi"
										required
										value={name}
										onChange={(e) => setName(e.target.value)}
									/>
								</div>
								<div className="col-12 col-lg-12 mt-3">
									<label className="form-label fw-bold">Mô tả</label>
									<textarea
										name="description"
										type="text"
										className="form-control"
										placeholder="Mô tả"
										value={description}
										onChange={(e) => setDescription(e.target.value)}
									/>
								</div>
								<div className="col-6 col-lg-6 mt-3">
									<label className="form-label fw-bold">Ngày bắt đầu</label>
									<input
										name="start-date"
										type="date"
										id="dateInput"
										className="form-control"
										placeholder="Ngày bắt đầu"
										required
										value={startDate}
										onChange={(e) => setStartDate(e.target.value)}
									/>
								</div>
								<div className="col-6 col-lg-6 mt-3">
									<label className="form-label fw-bold">Ngày kết thúc</label>
									<input
										name="end-date"
										type="date"
										className="form-control"
										placeholder="Ngày kết thúc"
										required
										value={endDate}
										onChange={(e) => setEndDate(e.target.value)}
									/>
								</div>
								<div className="col-3 col-lg-3 mt-3">
									<label className="form-label fw-bold">
										Phần trăm giảm giá
									</label>
									<input
										name="discount"
										type="text"
										className="form-control"
										placeholder="Giảm giá"
										value={discount}
										onChange={(e) => setDiscount(e.target.value)}
										min="0"
										max="100"
									/>
								</div>
								<div className="col-9 col-lg-9 mt-3">
									<label className="form-label fw-bold">Trạng thái</label>
									<div className="d-flex mt-2">
										<div>
											<input
												name="status"
												type="radio"
												value="1"
												checked={isActive === 1}
												onChange={(e) => setIsActice(Number(e.target.value))}
											/>
											<span className="ms-2">Kích hoạt khuyến mãi</span>
										</div>
										<div className="ms-4">
											<input
												name="status"
												type="radio"
												value="0"
												checked={isActive === 0}
												onChange={(e) => setIsActice(Number(e.target.value))}
											/>
											<span className="ms-2">Tạm dừng khuyến mãi</span>
										</div>
									</div>
								</div>
							</div>
							<div>
								<button
									type="button"
									className="btn px-3 py-2 text-light fw-bold mt-4"
									onClick={() => setIsModalOpen(true)}
									style={{ background: "#FF6600" }}
								>
									Thêm sản phẩm
								</button>
								<table className="table table-striped add-product-table mt-3">
									<thead>
										<tr>
											<th scope="col">#</th>
											<th scope="col">Tên sản phẩm</th>
											<th scope="col">Ảnh sản phẩm</th>
											<th scope="col">Giá sản phẩm</th>
											<th scope="col">Số lượng sản phẩm</th>
											<th scope="col">Đã bán</th>
										</tr>
									</thead>
									<tbody>
										{selectedProducts?.map((item, index) => (
											<tr key={{ index }}>
												<th scope="row">#{index + 1}</th>
												<td>{item.product_Name}</td>
												<td>
													<img
														src={item.productImage[0].url_Image}
														alt="Product Image"
														style={{ width: "60px" }}
													/>
												</td>

												<td>{`${new Intl.NumberFormat("vi-VN").format(
													item.price
												)}₫`}</td>
												<td>{SLT(item.productSize)}</td>
												<td>{item.sold}</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
							<button
								type="submit"
								className="btn btn-info px-3 py-2 text-light fw-bold mt-4"
							>
								Lưu thông tin
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EditPromotion;

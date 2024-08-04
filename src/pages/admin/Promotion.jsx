import React, { useEffect, useState } from "react";
import SideBar from "../../components/AdminSideBar";
import * as promotionService from "../../services/PromotionService";
import { Link } from "react-router-dom";
import ModalDelete from "../../components/ModalDelete";
import toast from "react-hot-toast";

const Promotion = () => {
	const [page, setPage] = useState(0);
	const [promotion, setPromotion] = useState(null);
	const [promoId, setPromoId] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const fetchAllPromotion = async () => {
		try {
			const data = await promotionService.getAllPromotion(page, 10);
			setPromotion(data.content);
		} catch (error) {
			console.log("Fetch all promtion fail: ", error);
		}
	};

	const handlePrev = () => {
		if (page > 0) {
			setPage(page - 1);
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

	const handleDeletePromotion = async () => {
		try {
			await promotionService.deletePromotion(promoId);
			fetchAllPromotion(page, 10);
			toast.success("Xóa khuyến mãi thành công.");
			setIsModalOpen(false);
		} catch (error) {
			toast.error("Xóa khuyến mãi thất bại.");
			setIsModalOpen(false);	
			console.log("Delete promotion fail: ", error);
		}
	};

	useEffect(() => {
		fetchAllPromotion();
	}, [page]);

	return (
		<div>
			<ModalDelete
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				handleDelete={handleDeletePromotion}
				text={"Bạn có chắc chắn muốn xóa khuyến mãi này?"}
			/>
			<div
				className="dashboard"
				style={{ display: "flex", background: "#f5f5f5" }}
			>
				<SideBar />
				<div
					className="dashboard-content"
					style={{ padding: "15px 20px", flex: "1" }}
				>
					<h3 className="fw-bold mb-4">Quản Lý Khuyến Mãi</h3>
					<button className="btn btn-info text-light fw-bold mb-3">
						<Link to="/admin/promotion/add-promotion" className="text-light">
							Thêm Khuyến mãi
						</Link>
					</button>
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
										<th scope="col">Tên khuyến mãi</th>
										<th scope="col">Ngày bắt đầu</th>
										<th scope="col">Ngày kết thúc</th>
										<th scope="col">Giảm giá</th>
										<th scope="col">Trạng thái</th>
										<th scope="col">Thao tác</th>
									</tr>
								</thead>
								<tbody>
									{promotion?.map((item, index) => (
										<tr key={index}>
											<th scope="row">#{page * 10 + index + 1}</th>
											<td style={{ width: "30%" }}>{item.name}</td>
											<td>{formatBookingDate(item.startDate)}</td>
											<td>{formatBookingDate(item.endDate)}</td>
											<td>{item.discount}%</td>
											<td>
												{item.is_Active === 1
													? "Kích hoạt khuyến mãi"
													: "Tạm dừng khuyến mãi"}
											</td>
											<td>
												<button className="btn">
													<Link
														to={`/admin/promotion/edit-promotion/${item.id}`}
													>
														<i className="bi bi-pencil-square text-info fs-5"></i>
													</Link>
												</button>
												<button
													className="btn"
													onClick={() => {
														setIsModalOpen(true);
														setPromoId(item.id);
													}}
												>
													<i className="bi bi-trash3-fill text-danger fs-5"></i>
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

export default Promotion;

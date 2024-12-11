import React, { useState, useEffect } from "react";
import SideBar from "../../components/AdminSideBar";
import * as brandService from "../../services/BrandService";
import ModalAdd_EditBrand from "../../components/ModalAdd_EditBrand";
import ModalDelete from "../../components/ModalDelete";
import toast from "react-hot-toast";

const Brand = () => {
	const [brands, setBrands] = useState([]);
	const [isModalAdd_EditOpen, setIsModalAdd_EditOpen] = useState(false);
	const [brand, setBrand] = useState({});
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [type, setType] = useState("add");

	const fetchBrands = async () => {
		try {
			const data = await brandService.getAllBrands();
			setBrands(data);
		} catch (error) {
			console.log("Fetch brands fail: ", error);
		}
	};

	useEffect(() => {
		fetchBrands();
	}, []);

	const handleDeleteBrand = async () => {
		if (brand.product.length !== 0) {
			toast.error("Bạn không thể xóa bỏ nhãn hàng đã có sản phẩm.");
			setIsModalOpen(false);
			return;
		} else {
			try {
				await brandService.deleteBrand(brand.id);
				fetchBrands();
				toast.success("Xóa nhãn hàng thành công.");
				setIsModalOpen(false);
			} catch (error) {
				toast.error("Xóa nhãn hàng thất bại.");
				console.log("Delete category fail: ", error);
			}
		}
	};

	return (
		<div>
			<ModalDelete
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				handleDelete={handleDeleteBrand}
				text={"Bạn có chắc chắn muốn xóa nhãn hàng này?"}
			/>
			<ModalAdd_EditBrand
				isOpen={isModalAdd_EditOpen}
				onClose={() => setIsModalAdd_EditOpen(false)}
				onSuccess={fetchBrands}
				type={type}
				brand={brand}
			/>
			<div className="brand" style={{ display: "flex", background: "#f5f5f5" }}>
				<SideBar />
				<div
					className="brand-content"
					style={{ padding: "15px 20px", flex: "1" }}
				>
					<h3 className="fw-bold mb-4">Quản Lý Nhãn Hàng</h3>
					<button
						className="btn btn-info text-light fw-bold mb-3"
						onClick={() => {
							setIsModalAdd_EditOpen(true);
							setType("add");
						}}
					>
						Thêm nhãn hàng
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
										<th scope="col">Tên nhãn hàng</th>
										<th scope="col">Ảnh nhãn hàng</th>
										<th scope="col">Thao tác</th>
									</tr>
								</thead>
								<tbody>
									{brands?.map((item, index) => (
										<tr key={{ index }}>
											<th scope="row">#{index + 1}</th>
											<td>{item.brand_name}</td>
											<td>
												<img
													src={item.brand_image}
													alt="Brand Image"
													style={{ maxWidth: "150px", borderRadius: "10px" }}
												/>
											</td>
											<td>
												<button
													className="btn"
													onClick={() => {
														setIsModalAdd_EditOpen(true);
														setBrand(item);
														setType("edit");
													}}
												>
													<i className="bi bi-pencil-square text-info fs-5"></i>
												</button>
												<button
													className="btn"
													onClick={() => {
														setIsModalOpen(true);
														setBrand(item);
													}}
												>
													<i className="bi bi-trash3-fill text-danger fs-5"></i>
												</button>
											</td>
										</tr>
									))}
								</tbody>
							</table>
							{/* <div className="page d-flex justify-content-center align-items-center">
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
						</div> */}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Brand;

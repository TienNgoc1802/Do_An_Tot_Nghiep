import React, { useState, useEffect } from "react";
import SideBar from "../../components/AdminSideBar";
import * as categoryService from "../../services/CategoryService";
import toast from "react-hot-toast";
import ModalDelete from "../../components/ModalDelete";
import ModalAdd_EditCategory from "../../components/ModalAdd_EditCategory";

const Category = () => {
	const [page, setPage] = useState(0);
	const [categories, setCategories] = useState(null);
	const [isModalAdd_EditOpen, setIsModalAdd_EditOpen] = useState(false);
	const [category, setCategory] = useState({});
	const [selectedImage, setSelectedImage] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [sttEdit, setSTTEdit] = useState(0);
	const [type, setType] = useState("add");

	const handleImageUpload = (event) => {
		const file = event.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = () => {
				setSelectedImage(reader.result);
			};
			reader.readAsDataURL(file);
		}
	};

	const fetchCategoriesWithPagination = async () => {
		try {
			const data = await categoryService.getCategoryWithPagination(page, 10);
			setCategories(data.content);
		} catch (error) {
			console.log("Fetch category fail: ", error);
		}
	};

	useEffect(() => {
		fetchCategoriesWithPagination();
	}, [page]);

	const handlePrev = () => {
		if (page > 0) {
			setPage(page - 1);
		}
	};

	const handleDeleteCategory = async () => {
		if (category.product.length !== 0) {
			toast.error("Bạn không thể xóa danh mục đã có sản phẩm.");
			setIsModalOpen(false);
			return;
		} else {
			try {
				await categoryService.deleteCategory(category.id);
				fetchCategoriesWithPagination(page, 10);
				toast.success("Xóa danh mục thành công.");
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
				handleDelete={handleDeleteCategory}
				text={"Bạn có chắc chắn muốn xóa danh mục này?"}
			/>
			<ModalAdd_EditCategory
				isOpen={isModalAdd_EditOpen}
				onClose={() => setIsModalAdd_EditOpen(false)}
				onSuccess={fetchCategoriesWithPagination}
				type={type}
				category={category}
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
					<h3 className="fw-bold mb-4">Quản Lý Danh Mục Sản Phẩm</h3>
					<button
						className="btn btn-info text-light fw-bold mb-3"
						onClick={() => {
							setIsModalAdd_EditOpen(true);
							setType("add");
						}}
					>
						Thêm danh mục
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
										<th scope="col">Thao tác</th>
									</tr>
								</thead>
								<tbody>
									{categories?.map((item, index) => (
										<tr key={{ index }}>
											<th scope="row">#{page * 10 + index + 1}</th>
											<td>{item.category_Name}</td>
											<td>
												<button
													className="btn"
													onClick={() => {
														setCategory(item);
														setSTTEdit(page * 10 + index + 1);
														setIsModalAdd_EditOpen(true);
														setType("edit")
													}}
												>
													<i className="bi bi-pencil-square text-info fs-5"></i>
												</button>
												<button
													className="btn"
													onClick={() => {
														setIsModalOpen(true);
														setCategory(item);
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

export default Category;

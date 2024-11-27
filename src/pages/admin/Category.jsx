import React, { useState, useEffect } from "react";
import SideBar from "../../components/AdminSideBar";
import * as categoryService from "../../services/CategoryService";
import toast from "react-hot-toast";
import ModalDelete from "../../components/ModalDelete";

const Category = () => {
	const [page, setPage] = useState(0);
	const [categories, setCategories] = useState(null);
	const [showAddCategory, setShowAddCategory] = useState(false);
	const [showEditCategory, setShowEditCategory] = useState(false);
	const [categoryName, setCategoryName] = useState("");
	const [category, setCategory] = useState({});
	const [selectedImage, setSelectedImage] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [sttEdit, setSTTEdit] = useState(0);

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
		setShowEditCategory(false);
		setShowAddCategory(false);
		fetchCategoriesWithPagination();
	}, [page]);

	const handlePrev = () => {
		if (page > 0) {
			setPage(page - 1);
		}
	};

	const handleSubmitAddCategory = async (e) => {
		e.preventDefault();
		try {
			await categoryService.addCatetogry(categoryName, selectedImage);
			fetchCategoriesWithPagination(page, 10);
			toast.success("Thêm nhãn hàng thành công.");
		} catch (error) {
			toast.error("Thêm nhãn hàng thất bại.");
			console.log("Add category fail: ", error);
		}
	};

	const handleSubmitEditCategory = async (e) => {
		e.preventDefault();
		try {
			await categoryService.editCatetogry(
				category.id,
				categoryName,
				selectedImage
			);
			fetchCategoriesWithPagination(page, 10);
			toast.success("Sửa nhãn hàng thành công.");
		} catch (error) {
			toast.error("Sửa nhãn hàng thất bại.");
			console.log("Edit category fail: ", error);
		}
	};

	const handleDeleteCategory = async () => {
		if (category.product.length !== 0) {
			toast.error("Bạn không thể xóa bỏ nhãn hàng đã có sản phẩm.");
			setIsModalOpen(false);
			return;
		} else {
			try {
				await categoryService.deleteCategory(category.id);
				fetchCategoriesWithPagination(page, 10);				
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
				handleDelete={handleDeleteCategory}
				text={"Bạn có chắc chắn muốn xóa nhãn hàng này?"}
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
					<h3 className="fw-bold mb-4">Quản Lý Nhãn Hàng</h3>
					<button
						className="btn btn-info text-light fw-bold mb-3"
						onClick={() => {
							setShowEditCategory(false);
							setShowAddCategory(true);
							setCategoryName("");
							setSelectedImage(null);
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
									{categories?.map((item, index) => (
										<tr key={{ index }}>
											<th scope="row">#{page * 10 + index + 1}</th>
											<td>{item.category_Name}</td>
											<td>
												<img
													src={item.category_image}
													alt="Category Image"
													style={{ width: "60px" }}
												/>
											</td>
											<td>
												<button
													className="btn"
													onClick={() => {
														setShowAddCategory(false);
														setShowEditCategory(true);
														setCategoryName(item.category_Name);
														setSelectedImage(null);
														setCategory(item);
														setSTTEdit(page * 10 + index + 1);
													}}
												>
													<i className="bi bi-pencil-square text-info fs-5"></i>
												</button>
												<button
													className="btn"
													onClick={() => {
														setShowAddCategory(false);
														setShowEditCategory(false);
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

						{showAddCategory && (
							<div
								style={{
									background: "#fff",
									flex: "1",
									borderRadius: "10px",
									padding: "15px",
									boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
									position: "relative",
								}}
							>
								<button
									onClick={() => setShowAddCategory(false)}
									className="btn-close"
									style={{ position: "absolute", right: 15, top: 15 }}
								></button>
								<h5 className="fw-bold my-4 align-content-center">
									Thêm nhãn hàng
								</h5>
								<form
									className="form-add-category"
									onSubmit={handleSubmitAddCategory}
								>
									<div className="row d-flex align-items-center mt-3">
										<div className="col-4">
											<label className="fw-bold">Tên nhãn hàng:</label>
										</div>
										<div className="col-8">
											<input
												name="categoryName"
												className="form-control"
												value={categoryName}
												type="text"
												onChange={(e) => setCategoryName(e.target.value)}
												required
											></input>
										</div>
									</div>
									<div className="row d-flex align-items-center mt-3">
										<div className="col-4">
											<label className="fw-bold">Ảnh nhãn hàng:</label>
										</div>
										<div className="col-8">
											<div>
												<input
													type="file"
													name="categoryImage"
													onChange={handleImageUpload}
													required
												/>
												{selectedImage && (
													<img
														src={selectedImage}
														alt="Selected"
														accept="image/*"
														style={{
															maxWidth: "100px",
															marginTop: "10px",
														}}
													/>
												)}
											</div>
										</div>
									</div>
									<button
										type="submit"
										className="btn btn-info text-light fw-bold mt-3 py-2 px-3"
									>
										Thêm
									</button>
								</form>
							</div>
						)}

						{showEditCategory && (
							<div
								style={{
									background: "#fff",
									flex: "1",
									borderRadius: "10px",
									padding: "15px",
									boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
									position: "relative",
								}}
							>
								<button
									onClick={() => setShowEditCategory(false)}
									className="btn-close"
									style={{ position: "absolute", right: 15, top: 15 }}
								></button>
								<h5 className="fw-bold my-4 align-content-center">
									Sửa nhãn hàng (#{sttEdit})
								</h5>
								<form
									className="form-add-category"
									onSubmit={handleSubmitEditCategory}
								>
									<div className="row d-flex align-items-center mt-3">
										<div className="col-4">
											<label className="fw-bold">Tên nhãn hàng:</label>
										</div>
										<div className="col-8">
											<input
												name="categoryName"
												className="form-control"
												value={categoryName}
												type="text"
												onChange={(e) => setCategoryName(e.target.value)}
											></input>
										</div>
									</div>
									<div className="row d-flex align-items-center mt-3">
										<div className="col-4">
											<label className="fw-bold">Ảnh nhãn hàng:</label>
										</div>
										<div className="col-8">
											<div>
												<input
													type="file"
													name="categoryImage"
													onChange={handleImageUpload}
												/>
												{selectedImage ? (
													<img
														src={selectedImage}
														alt="Selected"
														accept="image/*"
														style={{
															maxWidth: "100px",
															marginTop: "10px",
														}}
													/>
												) : (
													<img
														src={category?.category_Image}
														alt="Selected"
														style={{ maxWidth: "100px", marginTop: "10px" }}
													/>
												)}
											</div>
										</div>
									</div>
									<button
										type="submit"
										className="btn btn-info text-light fw-bold mt-3 py-2 px-3"
									>
										Sửa
									</button>
								</form>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Category;

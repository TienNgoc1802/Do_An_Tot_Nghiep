import React, { useEffect, useState } from "react";
import SideBar from "../../components/AdminSideBar";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import * as productService from "../../services/ProductService";
import * as categoryServie from "../../services/CategoryService";

const AddProduct = () => {
	const [name, setName] = useState("");
	const [description, setDescription] = useState("Chưa cập nhật");
	const [price, setPrice] = useState("");
	const [isActive, setIsActice] = useState(1);
	const [categoryID, setCategoryID] = useState("");
	const [categories, setCategories] = useState([]);
	const [sizes, setSizes] = useState([]);
	const [images, setImages] = useState([]);
	const [size, setSize] = useState("");
	const [quantity, setQuantity] = useState(50);
	const navigate = useNavigate();

	const handleImageUpload = (event) => {
		const files = Array.from(event.target.files);
		const newImages = files.map((file) => URL.createObjectURL(file));
		setImages((prevImages) => [...prevImages, ...newImages]);
	};

	const handleRemoveImage = (index) => {
		setImages((prevImages) => prevImages.filter((_, i) => i !== index));
	};

	const handleAddSize = () => {
		if (size && quantity) {
			setSizes([...sizes, { size, quantity }]);
			setSize("");
			setQuantity(50);
		}
	};

	const handleRemoveSize = (index) => {
		setSizes(sizes.filter((_, i) => i !== index));
	};

	console.log(images);
	console.log(sizes);

	const fetchCategories = async () => {
		try {
			const data = await categoryServie.getAllCategory();
			setCategories(data);
		} catch (error) {
			console.log("Fetch categories fail: ", error);
		}
	};

	useEffect(() => {
		fetchCategories();
	}, []);

	const handleSubmitAddProduct = async (e) => {
		e.preventDefault();

		try {
			const data = await productService.addProduct(
				name,
				description,
				price,
				categoryID,
				isActive,
				images,
				sizes
			);
			if (data) {
				toast.success("Thêm sản phẩm thành công.");
				navigate("/admin/products");
			}
		} catch (error) {
			toast.error("Thêm sản phẩm thất bại.");
			console.error("Error response data:", error);
		}
	};

	return (
		<div
			className="add-product"
			style={{ display: "flex", background: "#f5f5f5" }}
		>
			<SideBar />
			<div
				className="add-product-content"
				style={{ padding: "15px 20px", flex: "1" }}
			>
				<div className="d-flex justify-content-between align-items-center">
					<h3 className="fw-bold">Thêm mới sản phẩm</h3>
					<Link to="/admin/products" className="text-info">
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
					<form className="form-add-product" onSubmit={handleSubmitAddProduct}>
						<div className="row">
							<div className="col-12 col-lg-12">
								<label className="form-label fw-bold">Tên sản phẩm</label>
								<input
									name="name"
									type="text"
									className="form-control"
									placeholder="Tên sản phẩm"
									value={name}
									required
									onChange={(e) => setName(e.target.value)}
								/>
							</div>
							<div className="col-12 col-lg-12 mt-3">
								<label className="form-label fw-bold">Mô tả sản phẩm</label>
								<textarea
									name="description"
									type="text"
									className="form-control"
									placeholder="Mô tả"
									value={description}
									onChange={(e) => setDescription(e.target.value)}
								/>
							</div>
							<div className="col-4 col-lg-4 mt-3">
								<label className="form-label fw-bold">Giá sản phẩm</label>
								<input
									name="price"
									type="text"
									className="form-control"
									placeholder="Giá sản phẩm"
									value={price}
									required
									onChange={(e) => setPrice(e.target.value)}
								/>
							</div>
							<div className="col-4 col-lg-4 mt-3">
								<label className="form-label fw-bold">Nhãn hàng</label>
								<select
									className="form-select"
									value={categoryID}
									onChange={(e) => setCategoryID(e.target.value)}
									required
								>
									<option value="">Chọn nhãn hàng</option>
									{categories?.map((category) => (
										<option key={category.id} value={category.id}>
											{category.category_Name}
										</option>
									))}
								</select>
							</div>
							<div className="col-4 col-lg-4 mt-3">
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
										<span className="ms-2">Đăng bán</span>
									</div>
									<div className="ms-4">
										<input
											name="status"
											type="radio"
											value="0"
											checked={isActive === 0}
											onChange={(e) => setIsActice(Number(e.target.value))}
										/>
										<span className="ms-2">Dừng bán</span>
									</div>
								</div>
							</div>
						</div>

						<div className="add-image mt-3">
							<p className="fw-bold">Ảnh sản phẩm</p>
							<div className="d-flex align-items-center mt-2">
								<label htmlFor="add-image">
									<i
										className="bi bi-plus-lg"
										style={{
											fontSize: "20px",
											border: "1px solid black",
											padding: "5px 10px",
											borderRadius: "3px",
											cursor: "pointer",
										}}
									></i>
								</label>
								<input
									type="file"
									id="add-image"
									multiple
									onChange={handleImageUpload}
									style={{ display: "none", visibility: "none" }}
								/>
								<div className="image-gallery d-flex ms-4">
									{images.map((image, index) => (
										<div
											key={index}
											className="image-item me-2 d-flex flex-column"
										>
											<img
												src={image}
												alt={`Uploaded ${index}`}
												style={{ width: "120px", height: "130px" }}
											/>
											<button
												className="btn"
												type="button"
												onClick={() => handleRemoveImage(index)}
											>
												<i
													className="bi bi-dash-lg"
													style={{
														fontSize: "15px",
														border: "1px solid black",
														padding: "0 5px",
														borderRadius: "3px",
														cursor: "pointer",
													}}
												></i>
											</button>
										</div>
									))}
								</div>
							</div>
						</div>

						<div className="add-size mt-3">
							<p className="fw-bold">Kích thước sản phẩm(Size, Số lượng)</p>
							<div className="d-flex align-items-center mt-2">
								<div className="me-1">
									<div className="me-2 d-flex flex-column">
										<input
											style={{
												marginTop: "5px",
												border: "1px solid black",
												borderRadius: "3px",
												padding: "5px 10px",
												width: "130px",
											}}
											type="text"
											name="size"
											placeholder="Size"
											value={size}
											onChange={(e) => setSize(e.target.value)}
										/>
										<input
											style={{
												marginTop: "5px",
												border: "1px solid black",
												borderRadius: "3px",
												padding: "5px 10px",
												width: "130px",
											}}
											type="number"
											name="quantity"
											placeholder="Số lượng"
											value={quantity}
											onChange={(e) => setQuantity(e.target.value)}
										/>
									</div>
								</div>
								<span onClick={handleAddSize} style={{ cursor: "pointer" }}>
									<i
										className="bi bi-plus-lg"
										style={{
											fontSize: "20px",
											border: "1px solid black",
											padding: "5px 10px",
											borderRadius: "3px",
										}}
									></i>
								</span>
								<div className="d-flex align-items-center ms-5">
									{sizes.map((item, index) => (
										<div
											key={index}
											className="image-item me-3 d-flex flex-column"
										>
											<p>
												<strong>Size: </strong>
												{item.size}
											</p>
											<p>
												<strong>Số lượng: </strong>
												{item.quantity}
											</p>

											<button
												className="btn"
												type="button"
												onClick={() => handleRemoveSize(index)}
											>
												<i
													className="bi bi-dash-lg"
													style={{
														fontSize: "15px",
														border: "1px solid black",
														padding: "0 5px",
														borderRadius: "3px",
														cursor: "pointer",
													}}
												></i>
											</button>
										</div>
									))}
								</div>
							</div>
						</div>

						<button
							type="submit"
							className="btn btn-info px-3 py-2 text-light fw-bold mt-4"
						>
							Thêm sản phẩm
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default AddProduct;

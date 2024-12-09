import React, { useEffect, useState } from "react";
import SideBar from "../../components/AdminSideBar";
import ModalDelete from "../../components/ModalDelete";
import * as shippingTypeService from "../../services/ShippingTypeService";
import ModalShippingType from "../../components/ModalAdd_EditShippingType";
import toast from "react-hot-toast";

const ShippingType = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isModalShippingTypeOpen, setIsModalShippingTypeOpen] = useState(false);
	const [listShipping, setListShipping] = useState([]);
	const [shippingType, setShippingType] = useState({});
	const [modalType, setModalType] = useState("add");

	const handleDeleteShippingType = async () => {
		if (shippingType.order?.length > 0) {
			toast.error("Bạn không thể xóa loại ship đã liên kết với đơn hàng.");
			return;
		} else {
			try {
				await shippingTypeService.deleteShippingType(shippingType.id);
				setIsModalOpen(false);
				fetchListShippingType();
				toast.success("Xóa loại ship thành công.");
			} catch (error) {
				toast.error("Xóa loại ship thất bại.");
				setIsModalOpen(false);
				console.log("Delete shipping type fail: ", error);
			}
		}
	};

	const fetchListShippingType = async () => {
		try {
			const data = await shippingTypeService.getShippingType();
			setListShipping(data);
		} catch (error) {
			console.log("Fetch shipping type fail: ", error);
		}
	};

	useEffect(() => {
		fetchListShippingType();
	}, []);

	return (
		<div>
			<ModalDelete
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				handleDelete={handleDeleteShippingType}
				text={"Bạn có chắc chắn muốn xóa loại ship này?"}
			/>
			<ModalShippingType
				isOpen={isModalShippingTypeOpen}
				onClose={() => setIsModalShippingTypeOpen(false)}
				onSuccess={fetchListShippingType}
				type={modalType}
				shippingType={shippingType}
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
					<h3 className="fw-bold mb-4">Quản Lý Loại Ship</h3>
					<button
						className="btn btn-info text-light fw-bold mb-3"
						onClick={() => {
							setIsModalShippingTypeOpen(true);
							setModalType("add");
						}}
					>
						Thêm loại ship
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
										<th scope="col">Loại ship</th>
										<th scope="col">Phí ship</th>
										<th scope="col">Thời gian ước tính</th>
										<th scope="col">Thao tác</th>
									</tr>
								</thead>
								<tbody>
									{listShipping?.map((item, index) => (
										<tr key={{ index }}>
											<th scope="row">#{index + 1}</th>
											<td>{item.shippingName}</td>
											<td>
												{`${new Intl.NumberFormat("vi-VN").format(
													item.shipCost
												)}₫`}
											</td>
											<td>{item.estimatedTime}</td>
											<td>
												<button
													className="btn"
													onClick={() => {
														setIsModalShippingTypeOpen(true);
														setModalType("edit");
														setShippingType(item);
													}}
												>
													<i className="bi bi-pencil-square text-info fs-5"></i>
												</button>
												<button
													className="btn"
													onClick={() => {
														setIsModalOpen(true);
														setShippingType(item);
													}}
												>
													<i className="bi bi-trash3-fill text-danger fs-5"></i>
												</button>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ShippingType;

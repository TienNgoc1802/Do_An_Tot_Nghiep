import React, { useState, useEffect } from "react";
import SideBar from "../../components/AdminSideBar";
import * as shipperService from "../../services/ShipperService";
import ModalDelete from "../../components/ModalDelete";
import toast from "react-hot-toast";
import ModalShipper from "../../components/ModalAdd_EditShipper";

const Shipper = () => {
	const [shippers, setShippers] = useState([]);
	const [shipper, setShipper] = useState({});
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isModalShipperOpen, setIsModalShipperOpen] = useState(false);
	const [modalType, setModalType] = useState("add");

	const fetchShippers = async () => {
		try {
			const data = await shipperService.getShipper();
			setShippers(data);
		} catch (error) {
			console.log("Fetch shippers fail: ", error);
		}
	};

	const handleDeleteShipper = async () => {
		if (shipper.order?.length > 0) {
			toast.error("Bạn không thể xóa shipper đã liên kết với đơn hàng.");
			return;
		} else {
			try {
				await shipperService.deleteShipper(shipper.id);
				setIsModalOpen(false);
				fetchShippers();
				toast.success("Xóa shipper thành công.");
			} catch (error) {
				toast.error("Xóa shipper thất bại.");
				setIsModalOpen(false);
				console.log("Delete shipper type fail: ", error);
			}
		}
	};

	useEffect(() => {
		fetchShippers();
	}, []);

	return (
		<div>
			<ModalDelete
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				handleDelete={handleDeleteShipper}
				text={"Bạn có chắc chắn muốn xóa shipper này?"}
			/>
			<ModalShipper
				isOpen={isModalShipperOpen}
				onClose={() => setIsModalShipperOpen(false)}
				onSuccess={fetchShippers}
				type={modalType}
				shipper={shipper}
			/>
			<div
				className="shipper"
				style={{ display: "flex", background: "#f5f5f5" }}
			>
				<SideBar />
				<div
					className="order-content"
					style={{ padding: "15px 20px", flex: "1" }}
				>
					<h3 className="fw-bold mb-4">Quản lý Shipper</h3>
					<button
						className="btn btn-info text-light fw-bold mb-3"
						onClick={() => {
							setIsModalShipperOpen(true);
							setModalType("add")
						}}
					>
						Thêm Shipper
					</button>
					<div
						className="mt-3"
						style={{
							background: "#fff",
							padding: "15px",
							boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
							borderRadius: "10px",
						}}
					>
						<div className="table-shipper">
							<table className="table table-striped">
								<thead>
									<tr>
										<th scope="col">#</th>
										<th scope="col">Số điện thoại</th>
										<th scope="col">Họ tên</th>
										<th scope="col">Avatar</th>
										<th scope="col" style={{ width: "35%" }}>
											Địa chỉ
										</th>
										<th scope="col">Thao tác</th>
									</tr>
								</thead>
								<tbody>
									{shippers?.map((item, index) => (
										<tr key={index}>
											<th scope="row">#{index + 1}</th>
											<td>{item.id}</td>
											<td>{item.fullname}</td>
											<td>
												<img
													src={item.avatar}
													alt="Avatar Image"
													style={{
														width: "50px",
														height: "50px",
														borderRadius: "50%",
													}}
												/>
											</td>
											<td>{item.address}</td>
											<td>
												<button
													className="btn"
													onClick={() => {
														setIsModalShipperOpen(true);
														setShipper(item);
														setModalType("edit");
													}}
												>
													<i className="bi bi-pencil-square text-info fs-5"></i>
												</button>
												<button
													onClick={() => {
														setIsModalOpen(true);
														setShipper(item);
													}}
													className="btn"
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

export default Shipper;

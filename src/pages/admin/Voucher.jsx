import React, { useState, useEffect } from "react";
import SideBar from "../../components/AdminSideBar";
import { Link } from "react-router-dom";
import * as voucherService from "../../services/VoucherService";
import ModalDelete from "../../components/ModalDelete";
import toast from "react-hot-toast";

const Voucher = () => {
	const [vouchers, setVouchers] = useState([]);
	const [voucherId, setVoucherId] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	// const [code, setCode] = useState("");
	// const [expDate, setExpDate] = useState("");
	// const [created, setCreated] = useState("");
	// const [limitNumber, setLimitNumber] = useState("");
	// const [numberUsed, setNumberUsed] = useState("");

	const formatBookingDate = (milliseconds) => {
		const date = new Date(milliseconds);
		return date.toLocaleDateString("en-GB", {
			day: "2-digit",
			month: "2-digit",
			year: "numeric",
		});
	};

	const fecthVoucher = async () => {
		try {
			const data = await voucherService.getAllVoucher();
			setVouchers(data);
		} catch (error) {
			console.log("fetch voucher is fail!", error);
		}
	};

	const handleDeleteVoucher = async () => {
		try {
			await voucherService.deleteVoucher(voucherId);
			fecthVoucher();
			toast.success("Xóa mã giảm giá thành công.");
			setIsModalOpen(false);
		} catch (error) {
			toast.error("Xóa mã giảm giá thất bại.");
			setIsModalOpen(false);
			console.log("Delete voucher fail: ", error);
		}
	};

	const handleResetNumberUsed = async (id) => {
		try {
			const data = await voucherService.resetNumberUsed(id);
			if (data) {
				toast.success("Reset số lượt sử dụng mã giảm giá thành công.");
				fecthVoucher();
			}
		} catch (error) {
			toast.error("Reset số lượt sử dụng mã giảm giá thất bại.");
			console.log("Reset Number Used fail.", error);
		}
	};

	useEffect(() => {
		fecthVoucher();
	}, []);

	return (
		<div>
			<ModalDelete
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				handleDelete={handleDeleteVoucher}
				text={"Bạn có chắc chắn muốn xóa mã giảm giá này?"}
			/>
			<div
				className="voucher"
				style={{ display: "flex", background: "#f5f5f5" }}
			>
				<SideBar />
				<div
					className="voucher-content"
					style={{ padding: "15px 20px", flex: "1" }}
				>
					<h3 className="fw-bold mb-4">Quản lý mã giảm giá</h3>
					<button className="btn btn-info text-light fw-bold mb-3">
						<Link to="/admin/vouchers/add-voucher" className="text-light">
							Thêm mã giảm giá
						</Link>
					</button>
					<div
						className="mt-4"
						style={{
							background: "#fff",
							padding: "15px",
							boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
							borderRadius: "10px",
						}}
					>
						<table className="table table-striped">
							<thead>
								<tr>
									<th scope="col">#</th>
									<th scope="col">CODE</th>
									<th scope="col">Ngày tạo</th>
									<th scope="col">Ngày hết hạn</th>
									<th scope="col">Số lượt giới hạn</th>
									<th scope="col">Số lượt sử dụng</th>
									<th scope="col">Thao tác</th>
								</tr>
							</thead>
							<tbody>
								{vouchers?.map((item, index) => (
									<tr key={{ index }}>
										<th scope="row">#{index + 1}</th>
										<td>{item.code}</td>
										<td>{formatBookingDate(item.created)}</td>
										<td>{formatBookingDate(item.expirationDate)}</td>
										<td>{item.limitNumber}</td>
										<td>{item.numberUsed}</td>
										<td>
											<button
												className="btn"
												onClick={() => handleResetNumberUsed(item.id)}
											>
												<i className="bi bi-arrow-repeat fs-5 text-secondary"></i>
											</button>
											<button className="btn">
												<Link to={`/admin/vouchers/edit-voucher/${item.id}`}>
													<i className="bi bi-pencil-square text-info fs-6"></i>
												</Link>
											</button>
											<button
												className="btn"
												onClick={() => {
													setIsModalOpen(true);
													setVoucherId(item.id);
												}}
											>
												<i className="bi bi-trash3-fill text-danger fs-6"></i>
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
	);
};

export default Voucher;

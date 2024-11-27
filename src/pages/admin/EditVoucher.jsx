import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import SideBar from "../../components/AdminSideBar";
import * as voucherService from "../../services/VoucherService";

const EditVoucher = () => {
	const { id } = useParams();
	const [code, setCode] = useState("");
	const [expDate, setExpDate] = useState("");
	const [limitNumber, setLimitNumber] = useState("");
	const [paymentLimit, setPaymentLimit] = useState("");
	const [description, setDescription] = useState("");
	const [discount, setDiscount] = useState("");

	const formatBookingDate = (milliseconds) => {
		const date = new Date(milliseconds);
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, "0");
		const day = String(date.getDate()).padStart(2, "0");

		return `${year}-${month}-${day}`;
	};

	const fecthVoucherByID = async () => {
		try {
			const data = await voucherService.getVoucherByID(id);
			setCode(data.code);
			setDescription(data.description);
			setExpDate(formatBookingDate(data.expirationDate));
			setDiscount(data.discount);
            setPaymentLimit(data.paymentLimit);
            setLimitNumber(data.limitNumber);
		} catch (error) {
			console.log("Fetch promotion by id fail: ", error);
		}
	};

	const handleSubmitEditVoucher = async (e) => {
		e.preventDefault();

		try {
			const data = await voucherService.editVoucher(
                id,
				code,
				discount,
				limitNumber,
				expDate,
				paymentLimit,
				description
			);
			if (data) {
				toast.success("Chỉnh sửa thông tin mã giảm giá thành công.");
			}
		} catch (error) {
			toast.error("Chỉnh sửa thông tin mã giảm giá thất bại.");
			console.error("Error response data:", error);
		}
	};

	useEffect(() => {
		fecthVoucherByID();
	}, []);

	return (
		<div
			className="edit-voucher"
			style={{ display: "flex", background: "#f5f5f5" }}
		>
			<SideBar />
			<div
				className="edit-voucher-content"
				style={{ padding: "15px 20px", flex: "1" }}
			>
				<div className="d-flex justify-content-between align-items-center">
					<h3 className="fw-bold">Chỉnh sửa thông tin mã giảm giá</h3>
					<Link to="/admin/vouchers" className="text-info">
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
					<form className="form-add-voucher" onSubmit={handleSubmitEditVoucher}>
						<div className="row">
							<div className="col-6 col-lg-6">
								<label className="form-label fw-bold">Mã CODE</label>
								<input
									name="code"
									type="text"
									className="form-control"
									placeholder="Mã CODE"
									value={code}
									required
									onChange={(e) => setCode(e.target.value)}
								/>
							</div>
							<div className="col-6 col-lg-6">
								<label className="form-label fw-bold">Ngày hết hạn</label>
								<input
									name="name"
									type="date"
									className="form-control"
									placeholder="Ngày hết hạn"
									value={expDate}
									required
									onChange={(e) => setExpDate(e.target.value)}
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
							<div className="col-4 col-lg-4 mt-3">
								<label className="form-label fw-bold">Giảm giá</label>
								<input
									name="discount"
									type="text"
									className="form-control"
									placeholder="Giảm giá"
									value={discount}
									onChange={(e) => setDiscount(e.target.value)}
								/>
							</div>
							<div className="col-4 col-lg-4 mt-3">
								<label className="form-label fw-bold">Số lượt giới hạn</label>
								<input
									name="limitNumber"
									type="number"
									className="form-control"
									placeholder="Số lượt giới hạn"
									value={limitNumber}
									onChange={(e) => setLimitNumber(e.target.value)}
								/>
							</div>
							<div className="col-4 col-lg-4 mt-3">
								<label className="form-label fw-bold">Hạn mức thanh toán</label>
								<input
									name="paymentLimit"
									type="text"
									className="form-control"
									placeholder="Hạn mức thanh toán"
									value={paymentLimit}
									onChange={(e) => setPaymentLimit(e.target.value)}
								/>
							</div>
						</div>
						<button
							type="submit"
							className="btn btn-info px-3 py-2 text-light fw-bold mt-4"
						>
							Lưu
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default EditVoucher;

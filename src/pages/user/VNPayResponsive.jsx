import React, { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import success from "../../assets/image/success2.png";
import fail from "../../assets/image/fail.png";
import * as orderService from "../../services/OrderService";
import { AppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const VNPayResponsive = () => {
	const location = useLocation();
	const [paymentInfo, setPaymentInfo] = useState({});
	const [order, setOrder] = useState(null);
	const { setTotalProductInCart } = useContext(AppContext);

	const handleCheckOut = async () => {
		try {
			const data = await orderService.placeOrder(
				order.userId,
				order.fullName,
				order.phone,
				order.finalAddress,
				order.selectedPaymentMethod,
				order.finalTotal
			);
			if (data) {
				toast.success("Đã thanh toán thành công.");
				setTotalProductInCart(0);
			}
		} catch (error) {
			toast.error("Đã xảy ra lỗi khi thanh toán.");
			console.log("Check out fail: ", error);
		}
	};

	useEffect(() => {
		const params = new URLSearchParams(location.search);
		const paymentData = {
			vnp_Amount: params.get("vnp_Amount"),
			vnp_BankCode: params.get("vnp_BankCode"),
			vnp_CardType: params.get("vnp_CardType"),
			vnp_OrderInfo: params.get("vnp_OrderInfo"),
			vnp_PayDate: params.get("vnp_PayDate"),
			vnp_ResponseCode: params.get("vnp_ResponseCode"),
			vnp_TmnCode: params.get("vnp_TmnCode"),
			vnp_TransactionStatus: params.get("vnp_TransactionStatus"),
			vnp_TxnRef: params.get("vnp_TxnRef"),
		};
		setPaymentInfo(paymentData);

		const storedOrder = JSON.parse(localStorage.getItem("order"));
		setOrder(storedOrder);

		localStorage.removeItem("order");
		console.log(order);
	}, [location.search]);

	console.log(order);

	useEffect(() => {
		if (order && paymentInfo.vnp_TransactionStatus === "00") {
			handleCheckOut();
		}
	}, [order]);

	const formatAmount = (amount) => {
		if (!amount) return "";
		return new Intl.NumberFormat("vi-VN", {
			style: "currency",
			currency: "VND",
		}).format(amount / 100); // VNPay amount is in smallest unit (VND x 100)
	};

	const formatBookingDate = (payDate) => {
		if (!payDate) return "";
		const year = payDate.slice(0, 4);
		const month = payDate.slice(4, 6);
		const day = payDate.slice(6, 8);
		const hour = payDate.slice(8, 10);
		const minute = payDate.slice(10, 12);
		const second = payDate.slice(12, 14);
		const date = new Date(
			`${year}-${month}-${day}T${hour}:${minute}:${second}`
		);
		return (
			date.toLocaleDateString("en-GB", {
				day: "2-digit",
				month: "2-digit",
				year: "numeric",
			}) +
			" " +
			date.toLocaleTimeString("en-GB", {
				hour: "2-digit",
				minute: "2-digit",
				second: "2-digit",
			})
		);
	};

	return (
		<div className="d-flex flex-column align-items-center">
			<div className="py-4">
				{paymentInfo.vnp_TransactionStatus === "00" ? (
					<div className="d-flex flex-column align-items-center">
						<img
							src={success}
							alt="Success Icon"
							style={{ width: "128px", textAlign: "center" }}
						/>
						<p className="text-success fs-5 fw-bold">Giao dịch thành công</p>
					</div>
				) : (
					<div className="d-flex flex-column align-items-center">
						<img src={fail} alt="Fail Icon" style={{ width: "128px" }} />
						<p className="text-danger fs-5 fw-bold">
							Giao dịch không thành công
						</p>
					</div>
				)}
			</div>
			<div>
				<p>
					<strong>Mã giao dịch: </strong>
					{paymentInfo.vnp_TxnRef}
				</p>
				<p>
					<strong>Số tiền: </strong>
					{formatAmount(paymentInfo.vnp_Amount)}
				</p>
				<p>
					<strong>Nội dung thanh toán : </strong>Thanh toán hóa đơn
				</p>
				<p>
					<strong>Mã ngân hàng : </strong>
					{paymentInfo.vnp_BankCode}
				</p>
				<p>
					<strong>Thời gian giao dịch : </strong>
					{formatBookingDate(paymentInfo.vnp_PayDate)}
				</p>
				<p>
					<strong>Kết quả giao dịch: </strong>
					<span>
						{paymentInfo.vnp_ResponseCode === "00"
							? "Giao dịch thành công"
							: paymentInfo.vnp_ResponseCode === "24"
							? "Giao dịch không thành công do: Khách hàng hủy giao dịch"
							: "Giao dịch không thành công"}
					</span>
				</p>
			</div>
			<div>
				{paymentInfo.vnp_TransactionStatus === "00" ? (
					<Link to="/home">
						<button className="btn btn-info text-light mt-4 px-4 py-2 fw-bold">
							Về trang chủ
						</button>
					</Link>
				) : (
					<Link to="/checkout">
						<button className="btn btn-info text-light mt-4 px-4 py-2 fw-bold">
							Về trang thanh toán
						</button>
					</Link>
				)}
			</div>
		</div>
	);
};

export default VNPayResponsive;

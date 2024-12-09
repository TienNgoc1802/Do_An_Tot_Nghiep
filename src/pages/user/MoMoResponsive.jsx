import React, { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import success from "../../assets/image/success2.png";
import fail from "../../assets/image/fail.png";
import * as orderService from "../../services/OrderService";
import { AppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const MoMoResponsive = () => {
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
				order.finalTotal,
				order.voucher_id,
				order.shippingTypeId,
				order.isPay
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
			partnerCode: params.get("partnerCode"),
			orderId: params.get("orderId"),
			requestId: params.get("requestId"),
			amount: params.get("amount"),
			orderInfo: params.get("orderInfo"),
			transId: params.get("transId"),
			resultCode: params.get("resultCode"),
			message: params.get("message"),
			responseTime: params.get("responseTime"),
			payType: params.get("payType"),
		};
		setPaymentInfo(paymentData);

		const storedOrder = JSON.parse(localStorage.getItem("order"));
		setOrder(storedOrder);

		localStorage.removeItem("order");
		console.log(order);
	}, [location.search]);

	useEffect(() => {
		if (order && paymentInfo.resultCode === "1") {
			handleCheckOut();
		}
	}, [order]);

	const formatAmount = (amount) => {
		if (!amount) return "";
		return new Intl.NumberFormat("vi-VN", {
			style: "currency",
			currency: "VND",
		}).format(amount);
	};

	const formatTransactionTime = (timestamp) => {
		if (!timestamp) return "";
		const date = new Date(parseInt(timestamp));
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
				{paymentInfo.resultCode === "0" ? (
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
							{paymentInfo.message || "Giao dịch không thành công"}
						</p>
					</div>
				)}
			</div>
			<div>
				<p>
					<strong>Mã giao dịch: </strong>
					{paymentInfo.transId || "Không có thông tin"}
				</p>
				<p>
					<strong>Số tiền: </strong>
					{formatAmount(paymentInfo.amount)}
				</p>
				<p>
					<strong>Nội dung thanh toán : </strong>
					{paymentInfo.orderInfo || "Không có thông tin"}
				</p>
				<p>
					<strong>Thời gian giao dịch : </strong>
					{formatTransactionTime(paymentInfo.responseTime)}
				</p>
				<p>
					<strong>Kết quả giao dịch: </strong>
					<span>
						{paymentInfo.resultCode === "0"
							? "Giao dịch thành công"
							: "Giao dịch không thành công"}
					</span>
				</p>
			</div>
			<div>
				{paymentInfo.resultCode === "0" ? (
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

export default MoMoResponsive;

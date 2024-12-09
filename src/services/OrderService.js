import { orderRequest } from "../utils/request";

export const getAllOrder = async (page, pageSize) => {
	const res = await orderRequest.get("", {
		params: {
			page,
			pageSize,
		},
	});
	return res.data;
};

export const getOrderByStatus = async (status, page, pageSize) => {
	const res = await orderRequest.get("/orderbystatus", {
		params: {
			status,
			page,
			pageSize,
		},
	});
	return res.data;
};

export const getOrderByID = async (id) => {
	const res = await orderRequest.get(`/orderdetail/${id}`);
	return res.data;
};

export const getOrderToday = async () => {
	const res = await orderRequest.get("/ordertoday");
	return res.data;
};

export const placeOrder = async (
	user_id,
	fullname,
	phoneNumber,
	address,
	paymentMethod,
	total,
	voucher_id,
	shippingTypeId,
	isPay,
	shipper_id
) => {
	const params = new URLSearchParams();
	params.append("user_id", user_id);
	params.append("fullname", fullname);
	params.append("phoneNumber", phoneNumber);
	params.append("address", address);
	params.append("paymentMethod", paymentMethod);
	params.append("total", total);
	params.append("voucherId", voucher_id);
	params.append("shipping_type_id", shippingTypeId);
	params.append("is_pay", isPay);
	params.append("shipper_id", shipper_id);

	const res = await orderRequest.post("/placeorder", params);
	return res.data;
};

export const getOrderByUserID = async (user_id) => {
	const res = await orderRequest.get("/orderofuser", {
		params: { user_id: user_id },
	});
	return res.data;
};

export const updateStatus = async (orderId, newStatus) => {
	const params = new URLSearchParams();
	params.append("newStatus", newStatus);

	// Sử dụng `params` trong URL query string
	const res = await orderRequest.patch(
		`/updatestatus/${orderId}?${params.toString()}`
	);
	return res.data;
};

import { orderRequest } from "../utils/request";

export const placeOrder = async (
	user_id,
	fullname,
	phoneNumber,
	address,
	paymentMethod,
	total
) => {
	const params = new URLSearchParams();
	params.append("user_id", user_id);
	params.append("fullname", fullname);
	params.append("phoneNumber", phoneNumber);
	params.append("address", address);
	params.append("paymentMethod", paymentMethod);
	params.append("total", total);
	const res = await orderRequest.post("/placeorder", params);
	return res.data;
};

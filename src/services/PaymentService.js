import { paymentRequest } from "../utils/request";

export const creatPaymentURL = async (total) => {
	const res = await paymentRequest.get("/create", {
		params: { amount: total },
	});
	return res.data;
};

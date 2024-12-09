import { paymentRequest } from "../utils/request";

export const creatPaymentURL = async (total) => {
	const res = await paymentRequest.get("/vnpay", {
		params: { amount: total },
	});
	return res.data;
};

export const processPaymentWithMomo = async (total) => {
	const res = await paymentRequest.post(`/momo?orderTotal=${total}`);
	return res.data;
};

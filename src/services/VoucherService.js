import { voucherRequest } from "../utils/request";

export const getVoucherByID = async (id) => {
	const res = await voucherRequest.get(`/getVoucherById/${id}`);
	return res.data;
};

export const getAllVoucher = async () => {
	const res = await voucherRequest.get();
	return res.data;
};

export const addVoucher = async (
	Code,
	discount,
	limitNumber,
	expDate,
	paymentLimit,
	description
) => {
	const params = new URLSearchParams();
	params.append("Code", Code);
	params.append("discount", discount);
	params.append("limitNumber", limitNumber);
	params.append("experitionDate", expDate);
	params.append("paymentLimit", paymentLimit);
	params.append("description", description);
	const res = await voucherRequest.post("/add", params);

	return res.data;
};

export const editVoucher = async (
	id,
	code,
	discount,
	limitNumber,
	expirationDate,
	paymentLimit,
	description
) => {
	const params = new URLSearchParams();
	params.append("id", id);
	params.append("code", code);
	params.append("discount", discount);
	params.append("limitNumber", limitNumber);
	params.append("experitionDate", expirationDate); // Đảm bảo đúng tên tham số
	params.append("paymentLimit", paymentLimit);
	params.append("description", description);

	try {
		const res = await voucherRequest.post(`/edit`, params);
		return res.data;
	} catch (error) {
		console.error("Error response data:", error.response?.data);
		throw error;
	}
};

export const deleteVoucher = async (id) => {
	const res = await voucherRequest.delete(`/delete/${id}`);
	return res.data;
};

export const resetNumberUsed = async (id) => {
	const res = await voucherRequest.patch(`/resetNumberUsed/${id}`);
	return res.data;
};

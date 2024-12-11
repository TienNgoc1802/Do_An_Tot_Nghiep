import { brandRequest } from "../utils/request";

export const getAllBrands = async () => {
	const res = await brandRequest.get();
	return res.data;
};

export const deleteBrand = async (id) => {
	const res = await brandRequest.delete(`/delete/${id}`);
	return res.data;
};

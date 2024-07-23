import { promotionRequest } from "../utils/request";

export const checkProductInPromo = async (product_id) => {
	const res = await promotionRequest.get(`/checkproduct/${product_id}`, {
		params: { product_id },
	});
    return res.data;
};

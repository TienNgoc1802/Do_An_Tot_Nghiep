import { promotionRequest } from "../utils/request";

export const checkProductInPromo = async (product_id) => {
	const res = await promotionRequest.get(`/checkproduct/${product_id}`, {
		params: { product_id },
	});
	return res.data;
};

export const getAllPromotion = async (page, pageSize) => {
	const res = await promotionRequest.get("", {
		params: {
			page,
			pageSize,
		},
	});
	return res.data;
};

export const addPromotion = async (
	name,
	description,
	start,
	end,
	discount,
	status,
	productIds
) => {
	const params = new URLSearchParams();
	params.append("name", name);
	params.append("description", description);
	params.append("start", start);
	params.append("end", end);
	params.append("discount", discount);
	params.append("status", status);
	params.append("productIds", JSON.stringify(productIds)); // Chuyển đổi productIds thành chuỗi JSON

	const res = await promotionRequest.post("/add", params);
	return res.data;
};

export const getPromotionByID = async (id) => {
	const res = await promotionRequest.get(`/promodetail/${id}`);
	return res.data;
}

export const deletePromotion = async (id) => {
	const res = await promotionRequest.delete(`/delete/${id}`);
	return res.data;
}

export const editPromotion = async (
	id,
	name,
	description,
	start,
	end,
	discount,
	status,
	productIds
) => {
	const params = new URLSearchParams();
	params.append("promotionId", id)
	params.append("name", name);
	params.append("description", description);
	params.append("start", start);
	params.append("end", end);
	params.append("discount", discount);
	params.append("status", status);
	params.append("productIds", JSON.stringify(productIds)); // Chuyển đổi productIds thành chuỗi JSON

	const res = await promotionRequest.post("/edit", params);
	return res.data;
};


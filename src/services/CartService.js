import { cartRequest } from "../utils/request";

export const addToCart = async (user_id, product_id, count, size) => {
	const params = new URLSearchParams();
	params.append("user_id", user_id);
	params.append("product_id", product_id);
	params.append("count", count);
	params.append("size", size);
	const res = await cartRequest.post("/addtocart", params);
	return res.data;
};

export const cartOfUser = async (user_id) => {
	const res = await cartRequest.get("/cartofuser", {
		params: { user_id: user_id },
	});
	return res.data;
};

export const deleteToCart = async (cart_id, user_id) => {
	const res = await cartRequest.delete("/deletetocart", {
		params: { cart_id, user_id },
	});
	return res.data;
};

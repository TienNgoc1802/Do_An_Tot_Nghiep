import { shippingTypeRequest } from "../utils/request";

export const getShippingType = async () => {
	const res = await shippingTypeRequest.get();
	return res.data;
};

export const deleteShippingType = async (id) => {
	const res = await shippingTypeRequest.delete(`/delete/${id}`);
	return res.data;
};

export const addShippingType = async (
	id,
	shippingName,
	shipCost,
	esestimatedTime
) => {
	const params = new URLSearchParams();
	params.append("Shipping_TypeName", shippingName);
	params.append("shipCost", shipCost);
	params.append("estimateTime", esestimatedTime);
	const res = await shippingTypeRequest.post("/add", params);
	return res.data;
};

export const editShippingType = async (
	id,
	shippingName,
	shipCost,
	estimatedTime
) => {
	const res = await shippingTypeRequest.put(`/edit/${id}`, null, {
		params: {
			Shipping_TypeName: shippingName,
			shipCost: shipCost,
			estimateTime: estimatedTime,
		},
	});

	return res.data;
};

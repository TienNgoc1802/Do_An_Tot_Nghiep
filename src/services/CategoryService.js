import { categroyRequest } from "../utils/request";

export const getAllCategory = async () => {
	const res = await categroyRequest.get();
	return res.data;
};

export const getCategoryWithPagination = async (page, pageSize) => {
	const res = await categroyRequest.get(`/pagination/${page}/${pageSize}`);
	return res.data;
};

export const addCatetogry = async (name) => {
	const params = new URLSearchParams();
	params.append("categoryName", name);
	const res = await categroyRequest.post("/add", params);

	return res.data;
};

export const editCatetogry = async (id, name) => {
	const response = await categroyRequest.put(`/edit/${id}`, null, {
		params: { categoryName: name }, 
	});

	return response.data;
};

export const deleteCategory = async (id) => {
	const res = await categroyRequest.delete(`/delete/${id}`);
	return res.data;
};

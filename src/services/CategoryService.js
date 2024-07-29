import { categroyRequest } from "../utils/request";

export const getAllCategory = async () => {
	const res = await categroyRequest.get();
	return res.data;
};

export const getCategoryWithPagination = async (page, pageSize) => {
	const res = await categroyRequest.get(`/pagination/${page}/${pageSize}`);
	return res.data;
};

export const addCatetogry = async (name, image) => {
	const formData = new FormData();
	formData.append("categoryName", name);
	if (image) {
		const response = await fetch(image);
		const blob = await response.blob();
		formData.append("categoryImage", blob, "category.jpg");
	}

	const res = await categroyRequest.post("/add", formData, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});

    return res.data;
};

export const editCatetogry = async (id, name, image) => {
	const formData = new FormData();
	formData.append("categoryName", name);
	if (image) {
		const response = await fetch(image);
		const blob = await response.blob();
		formData.append("categoryImage", blob, "category.jpg");
	}

	const res = await categroyRequest.put(`/edit/${id}`, formData, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});

    return res.data;
};

export const deleteCategory = async (id) => {
    const res = await categroyRequest.delete(`/delete/${id}`);
    return res.data;
}


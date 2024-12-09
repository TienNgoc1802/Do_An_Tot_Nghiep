import { shipperRequest } from "../utils/request";

export const getShipper = async () => {
	const res = await shipperRequest.get();
	return res.data;
};

export const deleteShipper = async (id) => {
	const res = await shipperRequest.delete(`/delete/${id}`);
	return res.data;
};

export const signUp = async (phone, fullname, password) => {
	const params = new URLSearchParams();
	params.append("phone_number", phone);
	params.append("fullname", fullname);
	params.append("password", password);
	const res = await shipperRequest.post("/signup", params);
	return res.data;
};

export const updateShipper = async (
	id,
	fullname,
	avatar,
	address
) => {
	const formData = new FormData();
	formData.append("phone_number", id);
    if (avatar) {
		const response = await fetch(avatar);
		const blob = await response.blob();
		formData.append("avatar", blob, "avatar.jpg");
	}
	formData.append("fullname", fullname);
	formData.append("address", address);

	const res = await shipperRequest.post("/update", formData, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});
	return res.data;
};

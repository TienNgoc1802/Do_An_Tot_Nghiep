import { userRequest } from "../utils/request";

export const login = async (username, password) => {
	const res = await userRequest.get("/login", {
		params: { id: username, password: password },
	});
	return res.data;
};

export const signUp = async (username, fullname, email, password) => {
	const params = new URLSearchParams();
	params.append("username", username);
	params.append("fullname", fullname);
	params.append("email", email);
	params.append("password", password);
	const res = await userRequest.post("/signup", params);
	return res.data;
};

export const updateProfile = async (
	id,
	avatar,
	fullname,
	email,
	phoneNumber,
	address
) => {
	const formData = new FormData();
	formData.append("id", id);
	if (avatar) {
		const response = await fetch(avatar);
		const blob = await response.blob();
		formData.append("avatar", blob, "avatar.jpg");
	}
	formData.append("fullname", fullname);
	formData.append("email", email);
	formData.append("phoneNumber", phoneNumber);
	formData.append("address", address);

	const res = await userRequest.post("/update", formData, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});
	return res.data;
};

export const ChangePassword = async (id, newPassword) => {
	const params = new URLSearchParams();
	params.append("id", id);
	params.append("password", newPassword);
	const res = await userRequest.post("/changepassword", params);
	return res.data;
};

export const getAllUser = async (page, pageSize) => {
	const res = await userRequest.get("", {
		params: {
			page,
			pageSize,
		},
	});
	return res.data;
};

export const addUser = async (
	username,
	fullname,
	email,
	password,
	role,
	phone,
	address,
	avatar
) => {
	const formData = new FormData();
	formData.append("username", username);
	formData.append("fullname", fullname);
	formData.append("email", email);
	formData.append("password", password);
	formData.append("role", role);
	formData.append("phone", phone);
	formData.append("address", address);
	if (avatar) {
		const response = await fetch(avatar);
		const blob = await response.blob();
		formData.append("avatarInput", blob, "avatar.jpg");
	}

	const res = await userRequest.post("/add", formData, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});

	return res.data;
};

export const deleteUser = async (id) => {
	const res = await userRequest.delete(`/delete/${id}`);
	return res.data;
};

export const getUserById = async (id) => {
	const res = await userRequest.get(`/userbyid/${id}`);
	return res.data;
};

export const editUser = async (
	username,
	fullname,
	email,
	password,
	role,
	phone,
	address,
	avatar
) => {
	const formData = new FormData();
	formData.append("id", username);
	formData.append("password", password);
	if (avatar) {
		const response = await fetch(avatar);
		const blob = await response.blob();
		formData.append("avatar", blob, "avatar.jpg");
	}
	formData.append("fullname", fullname);
	formData.append("email", email);
	formData.append("role", role);
	formData.append("phone", phone);
	formData.append("address", address);

	const res = await userRequest.post("/edit", formData, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});

	return res.data;
};

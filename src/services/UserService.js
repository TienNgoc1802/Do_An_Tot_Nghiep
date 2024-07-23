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
	const res = await userRequest.post("/signup", params,);
	return res.data;
};

import React, { useState } from "react";
import SideBar from "../../components/AdminSideBar";
import * as userService from "../../services/UserService";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const AddUser = () => {
	const [id, setID] = useState("");
	const [password, setPasswword] = useState("");
	const [fullname, setFullName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [address, setAddress] = useState("");
	const [role, setRole] = useState("");
	const [selectedImage, setSelectedImage] = useState(null);
	const navigate = useNavigate();

	const handleImageUpload = (event) => {
		const file = event.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = () => {
				setSelectedImage(reader.result);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleSubmitAddUser = async (e) => {
        e.preventDefault();
        console.log(role)
		try {
			const data = await userService.addUser(
				id,
				fullname,
				email,
				password,
				role,
				phone,
				address,
				selectedImage
			);
			toast.success("Thêm mới người dùng thành công.");
			navigate("/admin/users");
		} catch (error) {
			toast.error("Thêm mới người dùng thất bại.");
			console.log("Add user fail: ", error.response.data);
		}
	};

	return (
		<div
			className="add-user"
			style={{ display: "flex", background: "#f5f5f5" }}
		>
			<SideBar />
			<div
				className="add-user-content"
				style={{ padding: "15px 20px", flex: "1" }}
			>
				<div className="d-flex justify-content-between align-items-center">
					<h3 className="fw-bold">Thêm mới người dùng</h3>
					<Link to="/admin/users" className="text-info">
						<i className="bi bi-chevron-double-left"></i> Quay lại
					</Link>
				</div>

				<div
					className="mt-4"
					style={{
						background: "#fff",
						padding: "15px",
						boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
						borderRadius: "10px",
					}}
				>
					<form className="form-add-user" onSubmit={handleSubmitAddUser}>
						<div className="row">
							<div className="col-6 col-lg-6">
								<label className="form-label fw-bold">
									Người dùng (Tài khoản)
								</label>
								<input
									name="id"
									type="text"
									className="form-control"
									placeholder="Tài khoản"
									required
									value={id}
									onChange={(e) => setID(e.target.value)}
								/>
							</div>
							<div className="col-6 col-lg-6">
								<label className="form-label fw-bold">Mật khẩu</label>
								<input
									name="password"
									type="text"
									className="form-control"
									placeholder="Mật khẩu"
									required
									value={password}
									onChange={(e) => setPasswword(e.target.value)}
								/>
							</div>
							<div className="col-5 col-lg-5 mt-3">
								<label className="form-label fw-bold">Họ và tên</label>
								<input
									name="fullname"
									type="text"
									className="form-control"
									placeholder="Họ và tên"
									required
									value={fullname}
									onChange={(e) => setFullName(e.target.value)}
								/>
							</div>
							<div className="col-7 col-lg-7 mt-3">
								<label className="form-label fw-bold">Email</label>
								<input
									name="email"
									type="text"
									className="form-control"
									placeholder="Email"
									required
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>
							<div className="col-4 col-lg-4 mt-3">
								<label className="form-label fw-bold">Số điện thoại</label>
								<input
									name="phone"
									type="text"
									className="form-control"
									placeholder="Số điện thoại"
									value={phone}
									onChange={(e) => setPhone(e.target.value)}
								/>
							</div>
							<div className="col-4 col-lg-4 mt-3">
								<label className="form-label fw-bold">Quyền</label>
								<select
									className="form-select"
									required
									onChange={(e) => setRole(e.target.value)}
									placeholder="Chọn quyền"
								>
									<option value="">Chọn quyền</option>
									<option value="admin">admin</option>
									<option value="user">user</option>
								</select>
							</div>
							<div className="col-4 col-lg-4 mt-3">
								<label className="form-label fw-bold">Loại đăng nhập</label>
								<input
									name="login-type"
									type="text"
									className="form-control"
									value="Mặc định"
									disabled
								/>
							</div>
							<div className="col-12 col-lg-12 mt-3">
								<label className="form-label fw-bold">Địa chỉ</label>
								<input
									name="address"
									type="text"
									className="form-control"
									value={address}
									onChange={(e) => setAddress(e.target.value)}
								/>
							</div>

							<label className="form-label fw-bold mt-3">Ảnh đại diện</label>
							<div className="d-flex align-items-center">
								<div className="col-5 col-lg-5">
									<div className="input-group">
										<input
											type="file"
											name="avatar"
											className="form-control"
											id="inputGroupFile04"
											aria-describedby="inputGroupFileAddon04"
											aria-label="Upload"
											onChange={handleImageUpload}
										/>
									</div>
								</div>
								<div className="ms-4">
									{selectedImage && (
										<img
											src={selectedImage}
											alt="Selected"
											accept="image/*"
											style={{ maxWidth: "60px", borderRadius: "50%" }}
										/>
									)}
								</div>
							</div>
						</div>
						<button
							type="submit"
							className="btn btn-info px-3 py-2 text-light fw-bold mt-4"
						>
							Thêm người dùng
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default AddUser;

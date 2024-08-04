import React, { useState, useContext, useEffect } from "react";
import SideBar from "../../components/AdminSideBar";
import { AppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import * as userService from "../../services/UserService";

const Profile = () => {
	const [stage, setStage] = useState("AdminInfo");
	const { admin, setAdmin } = useContext(AppContext);
	const [selectedImage, setSelectedImage] = useState(null);
	const [fullname, setFullName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [address, setAddress] = useState("");
	const [passwordOld, setPasswordOld] = useState("");
	const [passwordNew, setPasswordNew] = useState("");
	const [confirmPasswordNew, setConfirmPasswordNew] = useState("");

	useEffect(() => {
		if (admin) {
			setFullName(admin.user_Name || "");
			setEmail(admin.email || "");
			setPhone(admin.phone_Number || "");
			setAddress(admin.address || "");
		}
	}, [admin]);

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

	const handleSubmitInfo = async (e) => {
        e.preventDefault();
		try {
			const data = await userService.updateProfileAdmin(
				admin.id,
				selectedImage,
				fullname,
				email,
				phone,
				address
			);
			setAdmin(data);
			sessionStorage.setItem("admin", JSON.stringify(data));
			toast.success("Cập nhật thông tin tài khoản thành công.");
		} catch (error) {
			toast.error("Cập nhật thông tin tài khoản thất bại.");
			console.log("Updata admin informtion fail: ", error);
		}
    };

    const handldeSubmitChangePassword = async (e) => {
        e.preventDefault();
		if (passwordOld !== admin.password) {
			toast.error("Mật khẩu hiện tại không chính xác.");
			return;
		}

		if (passwordNew !== confirmPasswordNew) {
			toast.error("Vui lòng xác nhận lại mật khẩu mới.");
			return;
		}

		try {
			await userService.ChangePasswordAdmin(admin.id, passwordNew);
			toast.success("Thay đổi mật khẩu thành công.");
			setPasswordOld("");
            setPasswordNew("");
            setConfirmPasswordNew("");
		} catch (error) {
			toast.error("Thay đổi mật khẩu thất bại.");
			console.log("Updata user informtion fail: ", error);
		}
    }

	return (
		<div
			className="dashboard"
			style={{ display: "flex", background: "#f5f5f5" }}
		>
			<SideBar />
			<div
				className="profile-content"
				style={{ padding: "30px 40px", flex: "1" }}
			>
				<div className="row">
					<div className="col-3 col-lg-3 sidebar-account">
						<h5 className="fw-bold mb-3">Tài khoản</h5>
						<ul className="list-select">
							<li onClick={() => setStage("AdminInfo")}>Thông tin tài khoản</li>
							<li onClick={() => setStage("ChangePassword")}>Đổi mật khẩu</li>
						</ul>
					</div>
					<div className="col-9 col-lg-9">
						{stage === "AdminInfo" && (
							<div className="account-infomation">
								<h5 className="fw-bold mb-3">Thông tin cá nhân</h5>
								<form className="form-info" onSubmit={handleSubmitInfo}>
									<div className="row d-flex align-items-center">
										<div className="col-2">
											<label className="fw-bold" htmlFor="fullname">
												Họ và tên:
											</label>
										</div>
										<div className="col-10">
											<input
												name="fullname"
												className="form-control"
												value={fullname}
												type="text"
												onChange={(e) => setFullName(e.target.value)}
											></input>
										</div>
									</div>
									<div className="row d-flex align-items-center mt-3">
										<div className="col-2">
											<label className="fw-bold" htmlFor="email">
												Email:
											</label>
										</div>
										<div className="col-10">
											<input
												name="email"
												className="form-control"
												value={email}
												type="text"
												onChange={(e) => setEmail(e.target.value)}
											></input>
										</div>
									</div>
									<div className="row d-flex align-items-center mt-3">
										<div className="col-2">
											<label className="fw-bold" htmlFor="phone">
												Số điện thoại:
											</label>
										</div>
										<div className="col-10">
											<input
												name="phone"
												className="form-control"
												value={phone}
												type="text"
												onChange={(e) => setPhone(e.target.value)}
											></input>
										</div>
									</div>
									<div className="row d-flex align-items-center mt-3">
										<div className="col-2">
											<label className="fw-bold" htmlFor="address">
												Địa chỉ:
											</label>
										</div>
										<div className="col-10">
											<input
												name="address"
												className="form-control"
												value={address}
												type="text"
												onChange={(e) => setAddress(e.target.value)}
											></input>
										</div>
									</div>
									<div className="row d-flex align-items-center mt-3">
										<div className="col-2">
											<label className="fw-bold" htmlFor="avatar">
												Ảnh đại diện:
											</label>
										</div>
										<div className="col-10">
											<div className="d-flex align-items-center">
												<div className="col-6 col-lg-6">
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
												<div className="ms-4">
													{selectedImage ? (
														<img
															src={selectedImage}
															alt="Selected"
															accept="image/*"
															style={{ maxWidth: "60px", borderRadius: "50%" }}
														/>
													) : (
														<img
															src={admin?.avatar}
															alt="Selected"
															style={{ maxWidth: "60px", borderRadius: "50%" }}
														/>
													)}
												</div>
											</div>
										</div>
									</div>
									<button
										type="submit"
										className="btn btn-info text-light fw-bold mt-3 py-2 px-3"
									>
										Cập nhật thông tin
									</button>
								</form>
							</div>
						)}

						{stage === "ChangePassword" && (
							<div className="account-changepass">
								<h5 className="fw-bold mb-3">Thay đổi mật khẩu</h5>
								<form
									className="form-changepassword"
									onSubmit={handldeSubmitChangePassword}
								>
									<div className="row d-flex align-items-center">
										<div className="col-3">
											<label className="fw-bold" htmlFor="fullname">
												Mật khẩu hiện tại:
											</label>
										</div>
										<div className="col-9">
											<input
												name="passwordOld"
												className="form-control"
												type="password"
												onChange={(e) => setPasswordOld(e.target.value)}
												required
											></input>
										</div>
									</div>
									<div className="row d-flex align-items-center mt-3">
										<div className="col-3">
											<label className="fw-bold" htmlFor="email">
												Mật khẩu mới:
											</label>
										</div>
										<div className="col-9">
											<input
												name="passwordNew"
												className="form-control"
												type="password"
												onChange={(e) => setPasswordNew(e.target.value)}
												required
											></input>
										</div>
									</div>
									<div className="row d-flex align-items-center mt-3">
										<div className="col-3">
											<label className="fw-bold" htmlFor="email">
												Nhập lại mật khẩu mới:
											</label>
										</div>
										<div className="col-9">
											<input
												name="confirmPasswordNew"
												className="form-control"
												type="password"
												onChange={(e) => setConfirmPasswordNew(e.target.value)}
												required
											></input>
										</div>
									</div>

									<button
										type="submit"
										className="btn btn-info text-light fw-bold mt-3 py-2 px-3"
									>
										Xác nhận thay đổi
									</button>
								</form>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Profile;

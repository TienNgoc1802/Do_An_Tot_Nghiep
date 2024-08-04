import React, { useContext } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/image/logo_shop.png";
import login_img from "../../assets/image/login.jpg";
import * as UserService from "../../services/UserService";
import { AppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const LoginAdmin = () => {
	const [loginName, setLoginName] = useState("");
	const [password, setPassword] = useState("");
	const [errorLogin, setErrorLogin] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [showPasswordNew, setShowPasswordNew] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const navigate = useNavigate();
	const { setAdmin } = useContext(AppContext);
	const [stage, setStage] = useState("SignIn");
	const [loginForgot, setLoginForgot] = useState("");
	const [resCode, setResCode] = useState("");
	const [code, setCode] = useState("");
	const [passwordNew, setPasswordNew] = useState("");
	const [confirmPasswordNew, setConfirmPasswordNew] = useState("");

	const handleSignIn = async (e) => {
		e.preventDefault();
		try {
			const data = await UserService.login(loginName, password);
			if (data) {
				if (data.role === "admin") {
					sessionStorage.setItem("admin", JSON.stringify(data));
					setAdmin(data);
					navigate("/admin/dashboard");
				} else {
					toast.error("Tài khoản hoặc mật khẩu không chính xác.");
				}
			} else {
				setErrorLogin("Tài khoản hoặc mật khẩu không chính xác");
				setTimeout(() => setErrorLogin(null), 2000);
			}
		} catch (error) {
			setErrorLogin(
				error.response ? error.response.data.message : "Đăng nhập thất bại!"
			);
			setTimeout(() => setErrorLogin(null), 2000);
		}
	};

	const handleForgotPassword = async (e) => {
		e.preventDefault();
		try {
			console.log(loginForgot);
			const data = await UserService.forgotPasswordAdmin(loginForgot);
			setResCode(data);
			setStage("OTP");
			toast.success("Đã gửi mã OTP.");
		} catch (error) {
			toast.error("Tài khoản không tồn tại.");
			console.log("Call api forgot password fail: ", error);
		}
	};

	const handleConfirmOTP = (e) => {
		e.preventDefault();
		if (code !== resCode) {
			toast.error("Mã OTP không chính xác.");
			return;
		} else {
			setStage("ChangePassword");
		}
	};

	const handleChangePassword = async (e) => {
		e.preventDefault();
		if (passwordNew !== confirmPasswordNew) {
			toast.error("Vui lòng xác nhận lại mật khẩu mới.");
			return;
		}

		try {
			await UserService.ChangePasswordAdmin(loginForgot, passwordNew);
			toast.success("Thay đổi mật khẩu thành công.");
			setStage("SignIn");
		} catch (error) {
			toast.error("Thay đổi mật khẩu thất bại.");
			console.log("Change password fail: ", error);
		}
	};

	return (
		<div className="container">
			<div
				className=" border shadow-lg rounded d-flex justify-content-center align-items-center"
				style={{
					height: "calc(100vh - 20px)",
					marginTop: "20px",
				}}
			>
				<div className="row">
					<div className="col-6">
						<img
							src={login_img}
							className="img-fluid rounded"
							alt="Login"
						></img>
					</div>
					{stage === "SignIn" && (
						<div className="col-6">
							<div className="ps-2 mt-5 pt-4">
								<img
									src={logo}
									alt="Logo"
									style={{
										width: "70px",
										height: "auto",
										marginBottom: "20px",
									}}
								/>
								<span className="h1 fw-bold text-black-50">
									Shoes Shop Admin
								</span>
							</div>
							<div className="mx-4 pe-5">
								<div className="sign-in">
									<form className="signin-form" onSubmit={handleSignIn}>
										<div className="form-group mb-3 mt-4">
											<div className="d-flex flex-row align-items-center">
												<span>
													<i className="bi bi-person-fill fs-3 me-2"></i>
												</span>
												<input
													value={loginName}
													onChange={(e) => setLoginName(e.target.value)}
													name="login-name"
													type="text"
													className="form-control"
													placeholder="Tài Khoản"
													required
												/>
											</div>
										</div>
										<div className="form-group mb-3">
											<div className="d-flex flex-row align-items-center">
												<span>
													<i className="bi bi-lock-fill fs-3 me-2"></i>
												</span>
												<div className="input-group">
													<input
														value={password}
														onChange={(e) => setPassword(e.target.value)}
														name="password"
														type={showPassword ? "text" : "password"}
														className="form-control"
														placeholder="Mật Khẩu"
														required
														style={{ borderRight: 0 }}
													/>
													<span
														className="input-group-text"
														onClick={() => setShowPassword(!showPassword)}
													>
														<i
															className={
																showPassword
																	? "bi bi-eye-fill"
																	: "bi bi-eye-slash-fill"
															}
														></i>
													</span>
												</div>
											</div>
										</div>
										<div className="d-flex justify-content-end align-items-center mb-2">
											<span
												onClick={() => setStage("ForgotPassword")}
												className="text-info"
												style={{ cursor: "pointer" }}
											>
												Quên mật khẩu?
											</span>
										</div>
										{errorLogin && <p style={{ color: "red" }}>{errorLogin}</p>}
										<div className="form-group my-3">
											<button
												type="submit"
												className="form-control btn btn-primary rounded submit px-3"
											>
												Đăng Nhập
											</button>
										</div>
									</form>
								</div>
							</div>
						</div>
					)}

					{stage === "ForgotPassword" && (
						<div className="col-6 col-lg-6 p-5 mt-5">
							<h3 className="fw-bold mt-3">Quên mật khẩu</h3>
							<form
								className="form-forgotpass my-4"
								onSubmit={handleForgotPassword}
							>
								<label className="fw-bold mb-1">Nhập tài khoản của bạn</label>
								<input
									value={loginForgot}
									onChange={(e) => setLoginForgot(e.target.value)}
									name="forgot"
									className="form-control"
									placeholder="Tài khoản"
									required
								/>
								<button
									type="submit"
									className="btn btn-primary py-2 form-control mt-3 fw-bold"
								>
									Gửi Mã OTP
								</button>
							</form>
							<span
								className="text-info"
								style={{ cursor: "pointer" }}
								onClick={() => setStage("SignIn")}
							>
								Đăng nhập
							</span>
						</div>
					)}

					{stage === "OTP" && (
						<div className="col-6 col-lg-6 p-5 mt-5">
							<h3 className="fw-bold mt-3">Xác Nhận OTP</h3>
							<form
								className="form-forgotpass my-4"
								onSubmit={handleConfirmOTP}
							>
								<label className="fw-bold mb-1">
									Kiểm tra email đăng ký tài khoản của bạn và nhập mã OTP
								</label>
								<input
									value={code}
									onChange={(e) => setCode(e.target.value)}
									name="otp"
									className="form-control"
									placeholder="Nhập mã OTP"
									required
								/>
								<button
									type="submit"
									className="btn btn-primary py-2 form-control mt-3 fw-bold"
								>
									Xác Nhận
								</button>
							</form>
							<span
								className="text-info"
								style={{ cursor: "pointer" }}
								onClick={() => setStage("SignIn")}
							>
								Đăng nhập
							</span>
							<span> hoặc </span>
							<span>
								<Link to="/signup" className="text-info">
									Đăng ký
								</Link>
							</span>
						</div>
					)}

					{stage === "ChangePassword" && (
						<div className="col-6 col-lg-6 p-5 mt-5">
							<h3 className="fw-bold mt-3">Thay Đổi Mật Khẩu</h3>
							<form
								className="form-forgotpass my-4"
								onSubmit={handleChangePassword}
							>
								<div className="input-group mb-3">
									<input
										value={passwordNew}
										onChange={(e) => setPasswordNew(e.target.value)}
										name="password"
										type={showPasswordNew ? "text" : "password"}
										className="form-control"
										placeholder="Mật khẩu mới"
										required
										style={{ borderRight: 0 }}
									/>
									<span
										className="input-group-text"
										onClick={() => setShowPasswordNew(!showPasswordNew)}
									>
										<i
											className={
												showPasswordNew
													? "bi bi-eye-fill"
													: "bi bi-eye-slash-fill"
											}
										></i>
									</span>
								</div>

								<div className="input-group">
									<input
										value={confirmPasswordNew}
										onChange={(e) => setConfirmPasswordNew(e.target.value)}
										name="password"
										type={showConfirmPassword ? "text" : "password"}
										className="form-control"
										placeholder="Nhập Lại Mật Khẩu"
										required
										style={{ borderRight: 0 }}
									/>
									<span
										className="input-group-text"
										onClick={() => setShowConfirmPassword(!showConfirmPassword)}
									>
										<i
											className={
												showConfirmPassword
													? "bi bi-eye-fill"
													: "bi bi-eye-slash-fill"
											}
										></i>
									</span>
								</div>
								<button
									type="submit"
									className="btn btn-primary py-2 form-control mt-3 fw-bold"
								>
									Thay đổi mật khẩu
								</button>
							</form>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default LoginAdmin;

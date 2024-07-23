import React from "react";
import { useState } from "react";
import logo from "../../assets/image/logo_shop.png";
import signup_img from "../../assets/image/signup.jpg";
import { signUp } from "../../services/UserService";
import { Link } from "react-router-dom";

const SignUp = () => {
	const [userName, setUserName] = useState("");
	const [fullName, setFullName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errorSignUp, setErrorSignUp] = useState(null);
	const [successSignUp, setSuccessSignUp] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [showPassword1, setShowPassword1] = useState(false);

	const handleSignOut = async (e) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			setErrorSignUp("Mật khẩu và xác nhận mật khẩu không khớp.");
			setTimeout(() => {
				setErrorSignUp(null);
			}, 2000);
			return;
		}

		try {
			const data = await signUp(userName, fullName, email, password);
			console.log("Sign-up successful:", data);

			setSuccessSignUp(true);
			setTimeout(() => {
				// Redirect to "/signin" after 3 seconds
				window.location.href = "/signin";
			}, 3000);
		} catch (error) {
			console.error("Sign-up failed:", error);
			setErrorSignUp("Đăng ký thất bại!");
			setTimeout(() => {
				setErrorSignUp(null);
			}, 2000);
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
							src={signup_img}
							className="img-fluid rounded"
							alt="Sign Up"
						></img>
					</div>
					<div className="col-6 mt-3 pt-1">
						<Link to="/home">
							<div className="ms-2">
								<img
									src={logo}
									alt="Logo"
									style={{
										width: "70px",
										height: "auto",
										marginBottom: "20px",
									}}
								/>
								<span className="h1 fw-bold text-black-50">Shoes Shop</span>
							</div>
						</Link>
						<form onSubmit={handleSignOut} className="signout-form">
							<div className="mx-4 pe-5">
								<div className="form-group mb-2 mt-3">
									<div className="d-flex flex-row align-items-center">
										<span>
											<i className="bi bi-person-fill fs-3 me-2"></i>
										</span>
										<input
											value={userName}
											onChange={(e) => setUserName(e.target.value)}
											name="login-name"
											type="text"
											className="form-control"
											placeholder="Tài Khoản"
											required
										/>
									</div>
								</div>
								<div className="form-group mb-2">
									<div className="d-flex flex-row align-items-center">
										<span>
											<i className="bi bi-clipboard2-fill fs-3 me-2"></i>
										</span>
										<input
											value={fullName}
											onChange={(e) => setFullName(e.target.value)}
											name="full-name"
											type="text"
											className="form-control"
											placeholder="Họ Tên"
											required
										/>
									</div>
								</div>
								<div className="form-group mb-2">
									<div className="d-flex flex-row align-items-center">
										<span>
											<i className="bi bi-envelope-fill fs-3 me-2"></i>
										</span>
										<input
											value={email}
											onChange={(e) => setEmail(e.target.value)}
											name="email"
											type="text"
											className="form-control"
											placeholder="Email"
											required
										/>
									</div>
								</div>
								<div className="form-group mb-2">
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
								<div className="form-group mb-3">
									<div className="d-flex flex-row align-items-center">
										<span>
											<i className="bi bi-key-fill fs-3 me-2"></i>
										</span>
										<div className="input-group">
											<input
												value={confirmPassword}
												onChange={(e) => setConfirmPassword(e.target.value)}
												name="confirm_password"
												type={showPassword1 ? "text" : "password"}
												className="form-control"
												placeholder="Xác nhận mật khẩu"
												required
												style={{ borderRight: 0 }}
											/>
											<span
												className="input-group-text"
												onClick={() => setShowPassword1(!showPassword1)}
											>
												<i
													className={
														showPassword1
															? "bi bi-eye-fill"
															: "bi bi-eye-slash-fill"
													}
												></i>
											</span>
										</div>
									</div>
								</div>
								{errorSignUp && (
									<div>
										<p style={{ color: "red" }}>{errorSignUp}</p>
									</div>
								)}
								{successSignUp && (
									<div>
										<p style={{ color: "green" }}>
											Tài khoản được tạo thành công! Đang chuyển tới trang đăng
											nhập...
										</p>
									</div>
								)}
								<div className="form-group my-3">
									<button
										type="submit"
										className="form-control btn btn-primary rounded submit px-3"
									>
										Đăng Ký
									</button>
								</div>
								<div className="pt-4">
									<p className="mb-0">
										Bạn đã có tài khoản?{" "}
										<Link to="/signin" className="text-info fw-bold">
											Đăng nhập
										</Link>
									</p>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SignUp;

import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/image/logo_shop.png";
import login_img from "../../assets/image/login.jpg";
import * as UserService from "../../services/UserService";
import { AppContext } from "../../context/AppContext";

const SignIn = () => {
	const [loginName, setLoginName] = useState("");
	const [password, setPassword] = useState("");
	const [errorLogin, setErrorLogin] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const navigate = useNavigate();
	const {setUser, setTotalProductInCart } = useContext(AppContext);

	const handleSignIn = async (e) => {
		e.preventDefault();
		try {
			const data = await UserService.login(loginName, password);
			if (data) {
				sessionStorage.setItem("user", JSON.stringify(data));
				setUser(data);
				setTotalProductInCart(data.cart.length);
				navigate("/home");
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
					<div className="col-6">
						<div className="ps-2 mt-5">
							<Link to="/home">
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
							</Link>
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
										{/* <div className="form-check">
											<input
												className="form-check-input"
												type="checkbox"
												checked={rememberMe}
												onChange={handleRememberMe}
												id="form1Example3"
											/>
											<label
												className="form-check-label"
												htmlFor="form1Example3"
											>
												Nhớ tài khoản
											</label>
										</div> */}
										<Link to="/forgotpassword" className="text-info">
											Quên mật khẩu?
										</Link>
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
								<div className="d-flex justify-content-center align-items-center mb-3 pb-1">
									<p>Hoặc đăng nhập với:</p>
									<Link to="#!" className="text-secondary">
										<i className="bi bi-google mx-4"></i>
									</Link>
								</div>
								<div>
									<p className="mb-0">
										Bạn chưa có tài khoản?{" "}
										<Link to="/signup" className="text-info fw-bold">
											Đăng Ký
										</Link>
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SignIn;

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
	HiEye,
	HiEyeOff,
	HiMail,
	HiLockClosed,
	HiArrowRight,
} from "react-icons/hi";
import axios from "axios";

type AdminUser = {
	id: string;
	email: string;
	role: "admin";
};

type LoginResponse = {
	token: string;
	user: AdminUser;
};

export default function AdminLogin() {
	const navigate = useNavigate();
	const [showPassword, setShowPassword] = useState(false);
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const [errors, setErrors] = useState<Record<string, string>>({});
	const [isLoading, setIsLoading] = useState(false);

	const validate = () => {
		const newErrors: Record<string, string> = {};

		if (!formData.email) {
			newErrors.email = "Email is required";
		} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
			newErrors.email = "Email is invalid";
		}

		if (!formData.password) {
			newErrors.password = "Password is required";
		} else if (formData.password.length < 6) {
			newErrors.password = "Password must be at least 6 characters";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!validate()) return;

		setIsLoading(true);
		setErrors({});

		try {
			const response = await axios.post<LoginResponse>(
				"http://localhost:3000/api/admin/login",
				{
					email: formData.email,
					password: formData.password,
				},
			);

			const { token, user } = response.data;

			if (user.role !== "admin") {
				setErrors({ submit: "Access denied." });
				return;
			}

			localStorage.setItem("adminToken", token);
			localStorage.setItem("adminUser", JSON.stringify(user));

			navigate("/admin");
			window.location.reload();
		} catch (error: any) {
			setErrors({
				submit: error.response?.data?.message || "Invalid admin credentials.",
			});
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-slate-50 text-slate-900">
			<div className="grid min-h-screen lg:grid-cols-2">
				<div className="hidden overflow-hidden bg-[radial-gradient(circle_at_top,rgba(96,165,250,0.35),transparent_35%),linear-gradient(135deg,rgba(239,246,255,1),rgba(219,234,254,0.95))] lg:flex">
					<div className="relative flex h-full w-full items-center justify-center px-12">
						<div className="absolute right-16 top-20 h-72 w-72 rounded-full bg-blue-100/60 blur-3xl" />
						<div className="absolute bottom-20 left-16 h-96 w-96 rounded-full bg-white/70 blur-3xl" />

						<div className="relative z-10 flex max-w-md flex-col items-center text-center">
							<div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl border border-white/70 bg-white/80 shadow-sm backdrop-blur">
								<span className="text-4xl">🛡️</span>
							</div>

							<h2 className="text-3xl font-bold tracking-tight text-slate-900">
								Admin portal
								<br />
								<span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
									manage approvals and business accounts
								</span>
							</h2>

							<p className="mt-4 text-lg leading-7 text-slate-600">
								Sign in to review pending businesses, approve accounts, and
								manage the platform.
							</p>
						</div>
					</div>
				</div>

				<div className="flex items-center justify-center px-6 py-12">
					<div className="w-full max-w-md">
						<Link to="/" className="mb-8 flex items-center gap-3">
							<div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-lg font-bold text-white shadow-sm">
								BP
							</div>
							<span className="text-2xl font-bold tracking-tight text-slate-900">
								BasePoint
							</span>
						</Link>

						<div className="mb-8">
							<h1 className="mb-2 text-3xl font-bold tracking-tight text-slate-900">
								Admin Login
							</h1>
							<p className="text-slate-600">
								Enter your admin credentials to continue.
							</p>
						</div>

						<form onSubmit={handleSubmit} className="space-y-5">
							<div>
								<label className="mb-2 block text-sm font-medium text-slate-700">
									Email address
								</label>
								<div className="relative">
									<HiMail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
									<input
										type="email"
										value={formData.email}
										onChange={(e) =>
											setFormData({ ...formData, email: e.target.value })
										}
										placeholder="admin@example.com"
										className={`w-full rounded-2xl border bg-white py-3 pl-12 pr-4 text-slate-900 shadow-sm outline-none transition focus:border-blue-500 ${
											errors.email ? "border-red-500" : "border-slate-200"
										}`}
									/>
								</div>
								{errors.email && (
									<p className="mt-1 text-sm text-red-500">{errors.email}</p>
								)}
							</div>

							<div>
								<label className="mb-2 block text-sm font-medium text-slate-700">
									Password
								</label>
								<div className="relative">
									<HiLockClosed className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
									<input
										type={showPassword ? "text" : "password"}
										value={formData.password}
										onChange={(e) =>
											setFormData({ ...formData, password: e.target.value })
										}
										placeholder="Enter your password"
										className={`w-full rounded-2xl border bg-white py-3 pl-12 pr-12 text-slate-900 shadow-sm outline-none transition focus:border-blue-500 ${
											errors.password ? "border-red-500" : "border-slate-200"
										}`}
									/>
									<button
										type="button"
										onClick={() => setShowPassword(!showPassword)}
										className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-slate-400 transition hover:text-slate-700">
										{showPassword ? (
											<HiEyeOff className="h-5 w-5" />
										) : (
											<HiEye className="h-5 w-5" />
										)}
									</button>
								</div>
								{errors.password && (
									<p className="mt-1 text-sm text-red-500">{errors.password}</p>
								)}
							</div>

							{errors.submit && (
								<p className="text-sm text-red-500">{errors.submit}</p>
							)}

							<button
								type="submit"
								disabled={isLoading}
								className="group relative flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-2xl bg-blue-600 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50">
								<span className="relative z-10 flex items-center justify-center gap-2">
									{isLoading ? (
										<>
											<div className="h-5 w-5 animate-spin rounded-full border-2 border-white/20 border-t-white" />
											Logging in...
										</>
									) : (
										<>
											Login as Admin
											<HiArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
										</>
									)}
								</span>
							</button>
						</form>

						<p className="mt-8 text-center text-sm text-slate-600">
							Back to{" "}
							<Link
								to="/login"
								className="font-semibold text-blue-700 hover:text-blue-800">
								user login
							</Link>
						</p>

						<div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm">
							<p className="text-sm text-slate-600">
								Admin access is restricted to authorized accounts only.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

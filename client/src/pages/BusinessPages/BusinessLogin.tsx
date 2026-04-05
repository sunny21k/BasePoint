import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
	HiEye,
	HiEyeOff,
	HiMail,
	HiLockClosed,
	HiArrowRight,
} from "react-icons/hi";
import { useBusinessAuth } from "./BusinessAuthContext";
import axios from "axios";

export default function BusinessLogin() {
	const navigate = useNavigate();
	const { refreshAuth } = useBusinessAuth();
	const [showPassword, setShowPassword] = useState(false);
	const [formData, setFormData] = useState({
		email: "",
		password: "",
		rememberMe: false,
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
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!validate()) return;

		setIsLoading(true);

		try {
			const response = await axios.post(
				"http://localhost:3000/api/auth/login",
				{
					email: formData.email,
					password: formData.password,
				},
			);

			console.log("Login success:", response.data);

			const { token, user } = response.data;

			// Check if it's actually a business account
			if (user.role !== "business") {
				setErrors({
					submit:
						"This is a customer account. Please use the customer login page.",
				});
				return;
			}

			// Save token and role
			localStorage.setItem("token", token);
			localStorage.setItem("role", user.role); // ADD THIS!
			console.log("Token and role saved");

			// Refresh auth state
			await refreshAuth();

			// Small delay to ensure state updates
			setTimeout(() => {
				console.log("Navigating to dashboard...");
				navigate("/business/dashboard", { replace: true });
				window.location.reload(); // Force reload to update navbar
			}, 100);
		} catch (error: any) {
			console.error("Login error:", error);
			setErrors({
				submit:
					error.response?.data?.message ||
					"Login failed. Check your email and password.",
			});
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-sky-50 text-slate-900">
			<div className="grid min-h-screen lg:grid-cols-2">
				<div className="flex items-center justify-center px-6 py-12">
					<div className="w-full max-w-md">
						<Link to="/" className="mb-8 flex items-center gap-3">
							<div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-600 text-lg font-bold text-white shadow-sm">
								BP
							</div>
							<span className="text-2xl font-bold tracking-tight text-slate-900">
								BasePoint
							</span>
						</Link>

						<div className="mb-8">
							<h1 className="mb-2 text-3xl font-bold tracking-tight text-slate-900">
								Welcome back
							</h1>
							<p className="text-slate-600">
								Log in to manage your business and bookings.
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
										placeholder="you@example.com"
										className={`w-full rounded-2xl border bg-white py-3 pl-12 pr-4 text-slate-900 shadow-sm outline-none transition focus:border-sky-500 ${
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
										className={`w-full rounded-2xl border bg-white py-3 pl-12 pr-12 text-slate-900 shadow-sm outline-none transition focus:border-sky-500 ${
											errors.password ? "border-red-500" : "border-slate-200"
										}`}
									/>
									<button
										type="button"
										onClick={() => setShowPassword(!showPassword)}
										className="absolute right-4 top-1/2 cursor-pointer -translate-y-1/2 text-slate-400 transition hover:text-slate-700">
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

							<div className="flex items-center justify-between">
								<label className="flex cursor-pointer items-center gap-2">
									<input
										type="checkbox"
										checked={formData.rememberMe}
										onChange={(e) =>
											setFormData({ ...formData, rememberMe: e.target.checked })
										}
										className="h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
									/>
									<span className="text-sm text-slate-600">Remember me</span>
								</label>

								<Link
									to="/forgot-password"
									className="text-sm font-medium text-sky-700 hover:text-sky-800">
									Forgot password?
								</Link>
							</div>

							{errors.submit && (
								<p className="text-sm text-red-500">{errors.submit}</p>
							)}

							<button
								type="submit"
								disabled={isLoading}
								className="group relative flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-2xl bg-slate-900 py-3 font-semibold text-white shadow-sm transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50">
								<span className="relative z-10 flex items-center justify-center gap-2">
									{isLoading ? (
										<>
											<div className="h-5 w-5 animate-spin rounded-full border-2 border-white/20 border-t-white" />
											Logging in...
										</>
									) : (
										<>
											Log in
											<HiArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
										</>
									)}
								</span>
							</button>
						</form>

						<div className="relative my-8">
							<div className="absolute inset-0 flex items-center">
								<div className="w-full border-t border-slate-200" />
							</div>
							<div className="relative flex justify-center text-sm">
								<span className="bg-sky-50 px-4 text-slate-500">
									Or continue with
								</span>
							</div>
						</div>

						<div className="grid grid-cols-2 gap-3">
							<button className="flex cursor-pointer items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm transition hover:bg-slate-50">
								<img
									src="https://www.google.com/favicon.ico"
									alt="Google"
									className="h-5 w-5"
								/>
								<span className="text-sm font-medium text-slate-700">
									Google
								</span>
							</button>
							<button className="flex cursor-pointer items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm transition hover:bg-slate-50">
								<img
									src="https://github.com/favicon.ico"
									alt="GitHub"
									className="h-5 w-5"
								/>
								<span className="text-sm font-medium text-slate-700">
									GitHub
								</span>
							</button>
						</div>

						<p className="mt-8 text-center text-sm text-slate-600">
							Don't have an account?{" "}
							<Link
								to="/business/create-account"
								className="font-semibold text-sky-700 hover:text-sky-800">
								Sign up for free
							</Link>
						</p>

						<div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm">
							<p className="mb-2 text-sm text-slate-600">
								Looking to book a service?
							</p>
							<Link
								to="/customer/login"
								className="text-sm font-semibold text-sky-700 hover:text-sky-800">
								Customer login →
							</Link>
						</div>
					</div>
				</div>

				<div className="hidden overflow-hidden bg-[radial-gradient(circle_at_top,rgba(125,211,252,0.45),transparent_35%),linear-gradient(135deg,rgba(239,246,255,1),rgba(224,242,254,0.95))] lg:flex">
					<div className="relative flex h-full w-full items-center justify-center px-12">
						<div className="absolute left-16 top-20 h-72 w-72 rounded-full bg-sky-200/60 blur-3xl" />
						<div className="absolute bottom-20 right-16 h-96 w-96 rounded-full bg-white/70 blur-3xl" />

						<div className="relative z-10 flex max-w-md flex-col items-center text-center">
							<div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl border border-white/70 bg-white/80 shadow-sm backdrop-blur">
								<span className="text-4xl">📊</span>
							</div>

							<h2 className="text-3xl font-bold tracking-tight text-slate-900">
								Manage your business
								<br />
								<span className="bg-gradient-to-r from-sky-600 to-cyan-600 bg-clip-text text-transparent">
									from anywhere
								</span>
							</h2>

							<p className="mt-4 text-lg leading-7 text-slate-600">
								Access your dashboard, manage bookings, track revenue, and grow
								your business—all in one place.
							</p>

							<div className="mt-8 grid w-full grid-cols-3 gap-4">
								<div className="rounded-2xl border border-white/70 bg-white/80 p-4 shadow-sm backdrop-blur">
									<div className="text-2xl font-bold text-sky-700">500+</div>
									<div className="mt-1 text-xs text-slate-500">Businesses</div>
								</div>
								<div className="rounded-2xl border border-white/70 bg-white/80 p-4 shadow-sm backdrop-blur">
									<div className="text-2xl font-bold text-sky-700">10k+</div>
									<div className="mt-1 text-xs text-slate-500">Bookings</div>
								</div>
								<div className="rounded-2xl border border-white/70 bg-white/80 p-4 shadow-sm backdrop-blur">
									<div className="text-2xl font-bold text-sky-700">4.9</div>
									<div className="mt-1 text-xs text-slate-500">Rating</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

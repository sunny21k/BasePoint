import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
	HiArrowRight,
	HiEye,
	HiEyeOff,
	HiMail,
	HiLockClosed,
	HiUser,
	HiPhone,
} from "react-icons/hi";
import { HiBuildingOffice2 } from "react-icons/hi2";
import axios from "axios";
import { useBusinessAuth } from "./BusinessAuthContext";

export default function BusinessCreateAccount() {
	const navigate = useNavigate();
	const { refreshAuth } = useBusinessAuth();
	const [showPassword, setShowPassword] = useState(false);
	const [formData, setFormData] = useState({
		businessName: "",
		ownerName: "",
		email: "",
		password: "",
		phone: "",
	});
	const [errors, setErrors] = useState<Record<string, string>>({});
	const [isLoading, setIsLoading] = useState(false);

	const validate = () => {
		const newErrors: Record<string, string> = {};

		if (!formData.businessName)
			newErrors.businessName = "Business name is required";
		if (!formData.ownerName) newErrors.ownerName = "Owner name is required";

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

		if (!formData.phone) newErrors.phone = "Phone number is required";

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!validate()) return;

		setIsLoading(true);

		try {
			const response = await axios.post(
				"http://localhost:3000/api/auth/business-signup",
				{
					businessName: formData.businessName,
					ownerName: formData.ownerName,
					email: formData.email,
					password: formData.password,
					phone: formData.phone,
				},
			);

			console.log("Signup success:", response.data);

			const { token, user } = response.data;

			// Save token and role
			localStorage.setItem("token", token);
			localStorage.setItem("role", user.role);

			await refreshAuth();

			setTimeout(() => {
				navigate("/business/verification", { replace: true });
				window.location.reload();
			}, 100);
		} catch (error: any) {
			console.error("Signup error:", error);
			setErrors({
				submit:
					error.response?.data?.message || "Signup failed. Please try again.",
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
								Create your account
							</h1>
							<p className="text-slate-600">
								Set up your business profile and get started.
							</p>
						</div>

						<form onSubmit={handleSubmit} className="space-y-5">
							<div>
								<label className="mb-2 block text-sm font-medium text-slate-700">
									Business name
								</label>
								<div className="relative">
									<HiBuildingOffice2 className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
									<input
										type="text"
										value={formData.businessName}
										onChange={(e) =>
											setFormData({ ...formData, businessName: e.target.value })
										}
										placeholder="BasePoint Barbershop"
										className={`w-full rounded-2xl border bg-white py-3 pl-12 pr-4 text-slate-900 shadow-sm outline-none transition focus:border-sky-500 ${
											errors.businessName
												? "border-red-500"
												: "border-slate-200"
										}`}
									/>
								</div>
								{errors.businessName && (
									<p className="mt-1 text-sm text-red-500">
										{errors.businessName}
									</p>
								)}
							</div>

							<div>
								<label className="mb-2 block text-sm font-medium text-slate-700">
									Owner name
								</label>
								<div className="relative">
									<HiUser className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
									<input
										type="text"
										value={formData.ownerName}
										onChange={(e) =>
											setFormData({ ...formData, ownerName: e.target.value })
										}
										placeholder="John Doe"
										className={`w-full rounded-2xl border bg-white py-3 pl-12 pr-4 text-slate-900 shadow-sm outline-none transition focus:border-sky-500 ${
											errors.ownerName ? "border-red-500" : "border-slate-200"
										}`}
									/>
								</div>
								{errors.ownerName && (
									<p className="mt-1 text-sm text-red-500">
										{errors.ownerName}
									</p>
								)}
							</div>

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
										placeholder="Create a password"
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

							<div>
								<label className="mb-2 block text-sm font-medium text-slate-700">
									Phone number
								</label>
								<div className="relative">
									<HiPhone className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
									<input
										type="tel"
										value={formData.phone}
										onChange={(e) =>
											setFormData({ ...formData, phone: e.target.value })
										}
										placeholder="(555) 555-5555"
										className={`w-full rounded-2xl border bg-white py-3 pl-12 pr-4 text-slate-900 shadow-sm outline-none transition focus:border-sky-500 ${
											errors.phone ? "border-red-500" : "border-slate-200"
										}`}
									/>
								</div>
								{errors.phone && (
									<p className="mt-1 text-sm text-red-500">{errors.phone}</p>
								)}
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
											Creating account...
										</>
									) : (
										<>
											Create business account
											<HiArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
										</>
									)}
								</span>
							</button>
						</form>

						<p className="mt-8 text-center text-sm text-slate-600">
							Already have an account?{" "}
							<Link
								to="/business/login"
								className="font-semibold text-sky-700 hover:text-sky-800">
								Log in
							</Link>
						</p>
					</div>
				</div>

				<div className="hidden overflow-hidden bg-[radial-gradient(circle_at_top,rgba(125,211,252,0.45),transparent_35%),linear-gradient(135deg,rgba(239,246,255,1),rgba(224,242,254,0.95))] lg:flex">
					<div className="relative flex h-full w-full items-center justify-center px-12">
						<div className="absolute left-16 top-20 h-72 w-72 rounded-full bg-sky-200/60 blur-3xl" />
						<div className="absolute bottom-20 right-16 h-96 w-96 rounded-full bg-white/70 blur-3xl" />

						<div className="relative z-10 flex max-w-md flex-col items-center text-center">
							<div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl border border-white/70 bg-white/80 shadow-sm backdrop-blur">
								<span className="text-4xl">🏢</span>
							</div>

							<h2 className="text-3xl font-bold tracking-tight text-slate-900">
								Start building your
								<br />
								<span className="bg-gradient-to-r from-sky-600 to-cyan-600 bg-clip-text text-transparent">
									business presence
								</span>
							</h2>

							<p className="mt-4 text-lg leading-7 text-slate-600">
								Create your account, manage your business details, and get ready
								to accept bookings.
							</p>

							<div className="mt-8 grid w-full grid-cols-3 gap-4">
								<div className="rounded-2xl border border-white/70 bg-white/80 p-4 shadow-sm backdrop-blur">
									<div className="text-2xl font-bold text-sky-700">Fast</div>
									<div className="mt-1 text-xs text-slate-500">Setup</div>
								</div>
								<div className="rounded-2xl border border-white/70 bg-white/80 p-4 shadow-sm backdrop-blur">
									<div className="text-2xl font-bold text-sky-700">Easy</div>
									<div className="mt-1 text-xs text-slate-500">Signup</div>
								</div>
								<div className="rounded-2xl border border-white/70 bg-white/80 p-4 shadow-sm backdrop-blur">
									<div className="text-2xl font-bold text-sky-700">Clean</div>
									<div className="mt-1 text-xs text-slate-500">Dashboard</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

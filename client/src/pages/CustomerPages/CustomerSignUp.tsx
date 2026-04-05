import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
	HiEye,
	HiEyeOff,
	HiMail,
	HiLockClosed,
	HiArrowRight,
	HiUser,
	HiPhone,
} from "react-icons/hi";
import axios from "axios";

export default function CustomerSignup() {
	const navigate = useNavigate();
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [formData, setFormData] = useState({
		ownerName: "",
		email: "",
		password: "",
		confirmPassword: "",
		phone: "",
	});
	const [errors, setErrors] = useState<Record<string, string>>({});
	const [isLoading, setIsLoading] = useState(false);

	const validate = () => {
		const newErrors: Record<string, string> = {};

		if (!formData.ownerName) {
			newErrors.ownerName = "Name is required";
		}

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

		if (!formData.confirmPassword) {
			newErrors.confirmPassword = "Please confirm your password";
		} else if (formData.confirmPassword !== formData.password) {
			newErrors.confirmPassword = "Passwords do not match";
		}

		if (!formData.phone) {
			newErrors.phone = "Phone number is required";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!validate()) return;

		setIsLoading(true);
		setErrors({});

		try {
			const response = await axios.post(
				"http://localhost:3000/api/auth/customer-signup",
				{
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
			localStorage.setItem("role", user.role); // ADD THIS!

			// Redirect to customer home
			navigate("/customer/home", { replace: true });
			window.location.reload(); // Force reload to update navbar
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
		<div className="min-h-screen bg-green-50 text-slate-900">
			<div className="grid min-h-screen lg:grid-cols-2">
				<div className="hidden overflow-hidden bg-[radial-gradient(circle_at_top,rgba(167,243,208,0.55),transparent_35%),linear-gradient(135deg,rgba(236,253,245,1),rgba(209,250,229,0.95))] lg:flex">
					<div className="relative flex h-full w-full items-center justify-center px-12">
						<div className="absolute right-16 top-20 h-72 w-72 rounded-full bg-emerald-100/60 blur-3xl" />
						<div className="absolute bottom-20 left-16 h-96 w-96 rounded-full bg-white/70 blur-3xl" />

						<div className="relative z-10 flex max-w-md flex-col items-center text-center">
							<div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl border border-white/70 bg-white/80 shadow-sm backdrop-blur">
								<span className="text-4xl">✨</span>
							</div>

							<h2 className="text-3xl font-bold tracking-tight text-slate-900">
								Create your account
								<br />
								<span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
									and start booking
								</span>
							</h2>

							<p className="mt-4 text-lg leading-7 text-slate-600">
								Sign up to browse services, book appointments, and keep track of
								your visits in one place.
							</p>
						</div>
					</div>
				</div>

				<div className="flex items-center justify-center px-6 py-12">
					<div className="w-full max-w-md">
						<Link to="/" className="mb-8 flex items-center gap-3">
							<div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-600 text-lg font-bold text-white shadow-sm">
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
								Sign up to manage your bookings and appointments.
							</p>
						</div>

						<form onSubmit={handleSubmit} className="space-y-5">
							<div>
								<label className="mb-2 block text-sm font-medium text-slate-700">
									Full name
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
										className={`w-full rounded-2xl border bg-white py-3 pl-12 pr-4 text-slate-900 shadow-sm outline-none transition focus:border-emerald-500 ${
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
										className={`w-full rounded-2xl border bg-white py-3 pl-12 pr-4 text-slate-900 shadow-sm outline-none transition focus:border-emerald-500 ${
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
										className={`w-full rounded-2xl border bg-white py-3 pl-12 pr-4 text-slate-900 shadow-sm outline-none transition focus:border-emerald-500 ${
											errors.phone ? "border-red-500" : "border-slate-200"
										}`}
									/>
								</div>
								{errors.phone && (
									<p className="mt-1 text-sm text-red-500">{errors.phone}</p>
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
										className={`w-full rounded-2xl border bg-white py-3 pl-12 pr-12 text-slate-900 shadow-sm outline-none transition focus:border-emerald-500 ${
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

							<div>
								<label className="mb-2 block text-sm font-medium text-slate-700">
									Confirm password
								</label>
								<div className="relative">
									<HiLockClosed className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
									<input
										type={showConfirmPassword ? "text" : "password"}
										value={formData.confirmPassword}
										onChange={(e) =>
											setFormData({
												...formData,
												confirmPassword: e.target.value,
											})
										}
										placeholder="Confirm your password"
										className={`w-full rounded-2xl border bg-white py-3 pl-12 pr-12 text-slate-900 shadow-sm outline-none transition focus:border-emerald-500 ${
											errors.confirmPassword
												? "border-red-500"
												: "border-slate-200"
										}`}
									/>
									<button
										type="button"
										onClick={() => setShowConfirmPassword(!showConfirmPassword)}
										className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-slate-400 transition hover:text-slate-700">
										{showConfirmPassword ? (
											<HiEyeOff className="h-5 w-5" />
										) : (
											<HiEye className="h-5 w-5" />
										)}
									</button>
								</div>
								{errors.confirmPassword && (
									<p className="mt-1 text-sm text-red-500">
										{errors.confirmPassword}
									</p>
								)}
							</div>

							{errors.submit && (
								<p className="text-sm text-red-500">{errors.submit}</p>
							)}

							<button
								type="submit"
								disabled={isLoading}
								className="group relative flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-2xl bg-emerald-600 py-3 font-semibold text-white shadow-sm transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-50">
								<span className="relative z-10 flex items-center justify-center gap-2">
									{isLoading ? (
										<>
											<div className="h-5 w-5 animate-spin rounded-full border-2 border-white/20 border-t-white" />
											Creating account...
										</>
									) : (
										<>
											Sign up
											<HiArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
										</>
									)}
								</span>
							</button>
						</form>

						<p className="mt-8 text-center text-sm text-slate-600">
							Already have an account?{" "}
							<Link
								to="/customer/login"
								className="font-semibold text-emerald-700 hover:text-emerald-800">
								Log in
							</Link>
						</p>

						<div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm">
							<p className="mb-2 text-sm text-slate-600">
								Are you a business owner?
							</p>
							<Link
								to="/business/create-account"
								className="text-sm font-semibold text-emerald-700 hover:text-emerald-800">
								Business signup →
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

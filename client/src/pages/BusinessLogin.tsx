import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
	HiEye,
	HiEyeOff,
	HiMail,
	HiLockClosed,
	HiArrowRight,
} from "react-icons/hi";

export default function BusinessLogin() {
	const navigate = useNavigate();
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

		// Simulate API call
		setTimeout(() => {
			setIsLoading(false);
			// For now, just redirect to dashboard
			navigate("/dashboard");
		}, 1500);
	};

	return (
		<div className="min-h-screen bg-[#050609] text-white flex">
			{/* Left side - Form */}
			<div className="flex-1 flex items-center justify-center p-8">
				<div className="w-full max-w-md">
					{/* Logo */}
					<Link to="/" className="flex items-center gap-3 mb-8">
						<div className="w-12 h-12 bg-basepoint-teal/20 rounded-xl flex items-center justify-center">
							<span className="text-basepoint-teal font-bold text-lg">BP</span>
						</div>
						<span className="text-2xl font-bold">BasePoint</span>
					</Link>

					{/* Header */}
					<div className="mb-8">
						<h1 className="text-3xl font-bold mb-2">Welcome back</h1>
						<p className="text-gray-400">
							Log in to manage your business and bookings
						</p>
					</div>

					{/* Form */}
					<form onSubmit={handleSubmit} className="space-y-5">
						{/* Email */}
						<div>
							<label className="block text-sm font-medium text-gray-300 mb-2">
								Email address
							</label>
							<div className="relative">
								<HiMail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
								<input
									type="email"
									value={formData.email}
									onChange={(e) =>
										setFormData({ ...formData, email: e.target.value })
									}
									placeholder="you@example.com"
									className={`w-full pl-12 pr-4 py-3 bg-white/5 border ${
										errors.email ? "border-red-500" : "border-white/10"
									} rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-basepoint-teal transition`}
								/>
							</div>
							{errors.email && (
								<p className="mt-1 text-sm text-red-400">{errors.email}</p>
							)}
						</div>

						{/* Password */}
						<div>
							<label className="block text-sm font-medium text-gray-300 mb-2">
								Password
							</label>
							<div className="relative">
								<HiLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
								<input
									type={showPassword ? "text" : "password"}
									value={formData.password}
									onChange={(e) =>
										setFormData({ ...formData, password: e.target.value })
									}
									placeholder="Enter your password"
									className={`w-full pl-12 pr-12 py-3 bg-white/5 border ${
										errors.password ? "border-red-500" : "border-white/10"
									} rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-basepoint-teal transition`}
								/>
								<button
									type="button"
									onClick={() => setShowPassword(!showPassword)}
									className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition">
									{showPassword ? (
										<HiEyeOff className="w-5 h-5" />
									) : (
										<HiEye className="w-5 h-5" />
									)}
								</button>
							</div>
							{errors.password && (
								<p className="mt-1 text-sm text-red-400">{errors.password}</p>
							)}
						</div>

						{/* Remember me & Forgot password */}
						<div className="flex items-center justify-between">
							<label className="flex items-center gap-2 cursor-pointer group">
								<input
									type="checkbox"
									checked={formData.rememberMe}
									onChange={(e) =>
										setFormData({ ...formData, rememberMe: e.target.checked })
									}
									className="w-4 h-4 rounded border-white/10 bg-white/5 text-basepoint-teal focus:ring-basepoint-teal focus:ring-offset-0"
								/>
								<span className="text-sm text-gray-400 group-hover:text-white transition">
									Remember me
								</span>
							</label>

							<Link
								to="/forgot-password"
								className="text-sm text-basepoint-teal hover:text-teal-400 font-medium transition">
								Forgot password?
							</Link>
						</div>

						{/* Submit button */}
						<button
							type="submit"
							disabled={isLoading}
							className="w-full cursor-pointer border-1 border-gray-700 relative group bg-basepoint-teal text-white py-3 rounded-lg font-semibold hover:bg-teal-500 transition disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden">
							{/* Animated background */}
							<div className="absolute inset-0 bg-gradient-to-r from-basepoint-teal via-teal-500 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>

							<span className="relative z-10 flex items-center justify-center gap-2">
								{isLoading ? (
									<>
										<div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
										Logging in...
									</>
								) : (
									<>
										Log in
										<HiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
									</>
								)}
							</span>
						</button>
					</form>

					{/* Divider */}
					<div className="relative my-8">
						<div className="absolute inset-0 flex items-center">
							<div className="w-full border-t border-white/10"></div>
						</div>
						<div className="relative flex justify-center text-sm">
							<span className="px-4 bg-[#050609] text-gray-500">
								Or continue with
							</span>
						</div>
					</div>

					{/* Social login */}
					<div className="grid grid-cols-2 gap-3">
						<button className="flex items-center cursor-pointer justify-center gap-2 px-4 py-3 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 hover:border-white/20 transition">
							<img
								src="https://www.google.com/favicon.ico"
								alt="Google"
								className="w-5 h-5"
							/>
							<span className="text-sm font-medium">Google</span>
						</button>
						<button className="flex items-center cursor-pointer justify-center gap-2 px-4 py-3 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 hover:border-white/20 transition">
							<img
								src="https://github.com/favicon.ico"
								alt="GitHub"
								className="w-5 h-5"
							/>
							<span className="text-sm font-medium">GitHub</span>
						</button>
					</div>

					{/* Sign up link */}
					<p className="mt-8 text-center text-sm text-gray-400">
						Don't have an account?{" "}
						<Link
							to="/business/signup"
							className="text-basepoint-teal hover:text-teal-400 font-semibold transition">
							Sign up for free
						</Link>
					</p>

					{/* Customer login link */}
					<div className="mt-4 p-4 bg-white/5 border border-white/10 rounded-lg text-center">
						<p className="text-sm text-gray-400 mb-2">
							Looking to book a service?
						</p>
						<Link
							to="/customer/login"
							className="text-sm cursor-pointer text-basepoint-teal hover:text-teal-400 font-semibold transition">
							Customer login →
						</Link>
					</div>
				</div>
			</div>

			{/* Right side - Visual */}
			<div className="hidden lg:flex flex-1 bg-gradient-to-br from-basepoint-teal/20 via-purple-500/20 to-basepoint-navy/20 relative overflow-hidden">
				{/* Animated gradient orbs */}
				<div className="absolute top-20 left-20 w-72 h-72 bg-basepoint-teal/30 rounded-full blur-3xl animate-pulse"></div>
				<div
					className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse"
					style={{ animationDelay: "1s" }}></div>

				{/* Grid pattern */}
				<div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px]"></div>

				{/* Content */}
				<div className="relative z-10 flex flex-col items-center justify-center p-12 text-center">
					<div className="max-w-md">
						<div className="w-20 h-20 bg-basepoint-teal/20 rounded-2xl flex items-center justify-center mb-6 mx-auto backdrop-blur-sm border border-white/10">
							<span className="text-4xl">📊</span>
						</div>
						<h2 className="text-3xl font-bold mb-4">
							Manage your business
							<br />
							<span className="bg-gradient-to-r from-basepoint-teal to-emerald-400 bg-clip-text text-transparent">
								from anywhere
							</span>
						</h2>
						<p className="text-gray-400 text-lg mb-8">
							Access your dashboard, manage bookings, track revenue, and grow
							your business—all in one place.
						</p>

						{/* Stats */}
						<div className="grid grid-cols-3 gap-4">
							<div className="p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
								<div className="text-2xl font-bold text-basepoint-teal">
									500+
								</div>
								<div className="text-xs text-gray-400 mt-1">Businesses</div>
							</div>
							<div className="p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
								<div className="text-2xl font-bold text-basepoint-teal">
									10k+
								</div>
								<div className="text-xs text-gray-400 mt-1">Bookings</div>
							</div>
							<div className="p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
								<div className="text-2xl font-bold text-basepoint-teal">
									4.9
								</div>
								<div className="text-xs text-gray-400 mt-1">Rating</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

import { useState } from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";

interface Step1AccountProps {
	data: {
		email: string;
		password: string;
		businessName: string;
	};
	onUpdate: (field: string, value: string) => void;
	onNext: () => void;
}

export default function Step1Account({
	data,
	onUpdate,
	onNext,
}: Step1AccountProps) {
	const [showPassword, setShowPassword] = useState(false);
	const [errors, setErrors] = useState<Record<string, string>>({});

	const validate = () => {
		const newErrors: Record<string, string> = {};

		if (!data.email) {
			newErrors.email = "Email is required";
		} else if (!/\S+@\S+\.\S+/.test(data.email)) {
			newErrors.email = "Email is invalid";
		}

		if (!data.password) {
			newErrors.password = "Password is required";
		} else if (data.password.length < 8) {
			newErrors.password = "Password must be at least 8 characters";
		}

		if (!data.businessName) {
			newErrors.businessName = "Business name is required";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (validate()) {
			onNext();
		}
	};

	return (
		<div className="w-full max-w-lg mx-auto px-4">
			<div className="text-center mb-8">
				<h2 className="text-2xl font-semibold text-white">
					Create your account
				</h2>
				<p className="mt-1 text-sm text-gray-400">
					Let’s get started with a few basic details.
				</p>
			</div>

			<form onSubmit={handleSubmit} className="space-y-6">
				{/* Business Name */}
				<div>
					<label className="block text-sm font-medium text-gray-300 mb-2">
						Business name
					</label>
					<input
						type="text"
						value={data.businessName}
						onChange={(e) => onUpdate("businessName", e.target.value)}
						placeholder="John's Barbershop"
						className={`w-full rounded-xl border bg-white/5 px-4 py-3.5 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-basepoint-teal focus:ring-1 focus:ring-basepoint-teal/30 transition ${
							errors.businessName
								? "border-red-500 focus:border-red-500"
								: "border-white/10"
						}`}
					/>
					{errors.businessName && (
						<p className="mt-1 text-xs text-red-400">{errors.businessName}</p>
					)}
				</div>

				{/* Email */}
				<div>
					<label className="block text-sm font-medium text-gray-300 mb-2">
						Email
					</label>
					<input
						type="email"
						value={data.email}
						onChange={(e) => onUpdate("email", e.target.value)}
						placeholder="john@example.com"
						className={`w-full rounded-xl border bg-white/5 px-4 py-3.5 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-basepoint-teal focus:ring-1 focus:ring-basepoint-teal/30 transition ${
							errors.email
								? "border-red-500 focus:border-red-500"
								: "border-white/10"
						}`}
					/>
					{errors.email && (
						<p className="mt-1 text-xs text-red-400">{errors.email}</p>
					)}
				</div>

				{/* Password */}
				<div>
					<label className="block text-sm font-medium text-gray-300 mb-2">
						Password
					</label>
					<div className="relative">
						<input
							type={showPassword ? "text" : "password"}
							value={data.password}
							onChange={(e) => onUpdate("password", e.target.value)}
							placeholder="At least 8 characters"
							className={`w-full rounded-xl border bg-white/5 px-4 py-3.5 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-basepoint-teal focus:ring-1 focus:ring-basepoint-teal/30 transition pr-12 ${
								errors.password
									? "border-red-500 focus:border-red-500"
									: "border-white/10"
							}`}
						/>
						<button
							type="button"
							onClick={() => setShowPassword(!showPassword)}
							className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition"
							aria-label={showPassword ? "Hide password" : "Show password"}>
							{showPassword ? (
								<HiEyeOff className="h-4 w-4" />
							) : (
								<HiEye className="h-4 w-4" />
							)}
						</button>
					</div>
					{errors.password && (
						<p className="mt-1 text-xs text-red-400">{errors.password}</p>
					)}
				</div>

				{/* Submit button */}
				<button
					type="submit"
					className="w-full cursor-pointer rounded-xl bg-basepoint-teal text-white py-3.5 font-semibold shadow-sm hover:bg-teal-500 active:scale-98 transition">
					Continue to category
				</button>

				{/* Login link */}
				<p className="text-center text-sm text-gray-400 mt-6">
					Already have an account?{" "}
					<a
						href="/business/login"
						className="text-basepoint-teal hover:text-teal-400 font-medium">
						Log in instead
					</a>
				</p>
			</form>
		</div>
	);
}

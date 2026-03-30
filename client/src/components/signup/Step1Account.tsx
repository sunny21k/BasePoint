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

		if (!data.businessName) {
			newErrors.businessName = "Business name is required";
		}
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

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (validate()) onNext();
	};

	return (
		<div className="mx-auto w-full max-w-lg px-4">
			<div className="rounded-[1.75rem] border border-slate-200 bg-white/90 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-sm">
				<div className="mb-8 text-center">
					<h2 className="text-2xl font-semibold tracking-tight text-slate-900">
						Create your account
					</h2>
					<p className="mt-1 text-sm text-slate-500">
						Let&apos;s get started with a few basic details.
					</p>
				</div>

				<form onSubmit={handleSubmit} className="space-y-6">
					<div>
						<label className="mb-2 block text-sm font-medium text-slate-700">
							Business name
						</label>
						<input
							type="text"
							value={data.businessName}
							onChange={(e) => onUpdate("businessName", e.target.value)}
							placeholder="John's Barbershop"
							className={`w-full rounded-2xl border bg-white px-4 py-3.5 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 ${
								errors.businessName ? "border-red-400" : "border-slate-300"
							}`}
						/>
						{errors.businessName && (
							<p className="mt-1 text-xs text-red-500">{errors.businessName}</p>
						)}
					</div>

					<div>
						<label className="mb-2 block text-sm font-medium text-slate-700">
							Email
						</label>
						<input
							type="email"
							value={data.email}
							onChange={(e) => onUpdate("email", e.target.value)}
							placeholder="john@example.com"
							className={`w-full rounded-2xl border bg-white px-4 py-3.5 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 ${
								errors.email ? "border-red-400" : "border-slate-300"
							}`}
						/>
						{errors.email && (
							<p className="mt-1 text-xs text-red-500">{errors.email}</p>
						)}
					</div>

					<div>
						<label className="mb-2 block text-sm font-medium text-slate-700">
							Password
						</label>
						<div className="relative">
							<input
								type={showPassword ? "text" : "password"}
								value={data.password}
								onChange={(e) => onUpdate("password", e.target.value)}
								placeholder="At least 8 characters"
								className={`w-full rounded-2xl border bg-white px-4 py-3.5 pr-12 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 ${
									errors.password ? "border-red-400" : "border-slate-300"
								}`}
							/>
							<button
								type="button"
								onClick={() => setShowPassword(!showPassword)}
								className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-slate-400 transition hover:text-slate-700"
								aria-label={showPassword ? "Hide password" : "Show password"}>
								{showPassword ? (
									<HiEyeOff className="h-4 w-4" />
								) : (
									<HiEye className="h-4 w-4" />
								)}
							</button>
						</div>
						{errors.password && (
							<p className="mt-1 text-xs text-red-500">{errors.password}</p>
						)}
					</div>

					<button
						type="submit"
						className="w-full cursor-pointer rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 font-semibold text-white shadow-sm transition hover:from-emerald-500 hover:to-teal-500 active:scale-[0.99]">
						Continue to category
					</button>

					<p className="mt-6 text-center text-sm text-slate-500">
						Already have an account?{" "}
						<a
							href="/business/login"
							className="font-medium text-emerald-700 hover:text-emerald-900">
							Log in instead
						</a>
					</p>
				</form>
			</div>
		</div>
	);
}

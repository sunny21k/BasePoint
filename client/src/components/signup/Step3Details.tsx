import { useState } from "react";

interface Step3DetailsProps {
	data: {
		address: string;
		phone: string;
		description: string;
	};
	onUpdate: (field: string, value: string) => void;
	onNext: () => void;
	onBack: () => void;
}

export default function Step3Details({
	data,
	onUpdate,
	onNext,
	onBack,
}: Step3DetailsProps) {
	const [errors, setErrors] = useState<Record<string, string>>({});

	const validate = () => {
		const newErrors: Record<string, string> = {};

		if (!data.address) newErrors.address = "Address is required";
		if (!data.phone) newErrors.phone = "Phone number is required";
		if (!data.description) {
			newErrors.description = "Description is required";
		} else if (data.description.length < 20) {
			newErrors.description = "Description should be at least 20 characters";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (validate()) onNext();
	};

	return (
		<div className="mx-auto w-full max-w-3xl px-4">
			<div className="rounded-[1.75rem] border border-slate-200 bg-white/90 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-sm lg:p-8">
				<div className="mb-8 text-center">
					<h2 className="text-2xl font-semibold tracking-tight text-slate-900">
						Tell us about your business
					</h2>
					<p className="mt-2 text-sm leading-6 text-slate-500">
						This helps customers find you and feel confident booking.
					</p>
				</div>

				<form onSubmit={handleSubmit} className="space-y-6">
					<div>
						<label className="mb-2 block text-sm font-medium text-slate-700">
							Business address
						</label>
						<input
							type="text"
							value={data.address}
							onChange={(e) => onUpdate("address", e.target.value)}
							placeholder="123 Main St, Brooklyn, NY 11201"
							className={`w-full rounded-2xl border bg-white px-4 py-3.5 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 ${
								errors.address ? "border-red-400" : "border-slate-300"
							}`}
						/>
						{errors.address && (
							<p className="mt-1 text-xs text-red-500">{errors.address}</p>
						)}
					</div>

					<div>
						<label className="mb-2 block text-sm font-medium text-slate-700">
							Phone number
						</label>
						<input
							type="tel"
							value={data.phone}
							onChange={(e) => onUpdate("phone", e.target.value)}
							placeholder="(555) 123-4567"
							className={`w-full rounded-2xl border bg-white px-4 py-3.5 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 ${
								errors.phone ? "border-red-400" : "border-slate-300"
							}`}
						/>
						{errors.phone && (
							<p className="mt-1 text-xs text-red-500">{errors.phone}</p>
						)}
					</div>

					<div>
						<label className="mb-2 block text-sm font-medium text-slate-700">
							Business description
						</label>
						<textarea
							value={data.description}
							onChange={(e) => onUpdate("description", e.target.value)}
							placeholder="Tell customers what makes your business special..."
							rows={5}
							className={`w-full resize-none rounded-2xl border bg-white px-4 py-3.5 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 ${
								errors.description ? "border-red-400" : "border-slate-300"
							}`}
						/>
						<div className="mt-1 flex items-center justify-between">
							{errors.description ? (
								<p className="text-xs text-red-500">{errors.description}</p>
							) : (
								<p className="text-xs text-slate-500">
									{data.description.length} characters (minimum 20)
								</p>
							)}
						</div>
					</div>

					<div>
						<label className="mb-2 block text-sm font-medium text-slate-700">
							Logo <span className="text-slate-400">(optional)</span>
						</label>
						<div className="rounded-2xl border-2 border-dashed border-slate-300 bg-gradient-to-br from-slate-50 to-white p-6 text-center transition hover:border-emerald-300 hover:bg-emerald-50/50">
							<div className="mb-2 text-3xl">📷</div>
							<p className="text-sm font-medium text-slate-800">
								Upload your logo
							</p>
							<p className="mt-1 text-xs text-slate-500">
								Square images work best. You can change this later.
							</p>
							<button
								type="button"
								className="mt-4 cursor-pointer rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm font-semibold text-emerald-700 shadow-sm transition hover:bg-emerald-50 hover:text-emerald-900">
								Choose file
							</button>
						</div>
					</div>

					<div className="flex items-center justify-between pt-4">
						<button
							type="button"
							onClick={onBack}
							className="cursor-pointer rounded-2xl border border-slate-200 bg-white px-6 py-3 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 hover:text-slate-900">
							← Back
						</button>
						<button
							type="submit"
							className="cursor-pointer rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:from-emerald-500 hover:to-teal-500">
							Continue →
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

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

		if (!data.address) {
			newErrors.address = "Address is required";
		}

		if (!data.phone) {
			newErrors.phone = "Phone number is required";
		}

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
		if (validate()) {
			onNext();
		}
	};

	return (
		<div className="max-w-2xl mx-auto px-4">
			<div className="text-center mb-8">
				<h2 className="text-2xl font-semibold text-white">
					Tell us about your business
				</h2>
				<p className="mt-1 text-sm text-gray-400">
					This helps customers find you and feel confident booking.
				</p>
			</div>

			<form onSubmit={handleSubmit} className="space-y-6">
				{/* Address */}
				<div>
					<label className="block text-sm font-medium text-gray-300 mb-2">
						Business address
					</label>
					<input
						type="text"
						value={data.address}
						onChange={(e) => onUpdate("address", e.target.value)}
						placeholder="123 Main St, Brooklyn, NY 11201"
						className={`w-full rounded-xl border bg-white/5 px-4 py-3.5 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-basepoint-teal focus:ring-1 focus:ring-basepoint-teal/30 transition ${
							errors.address
								? "border-red-500 focus:border-red-500"
								: "border-white/10"
						}`}
					/>
					{errors.address && (
						<p className="mt-1 text-xs text-red-400">{errors.address}</p>
					)}
				</div>

				{/* Phone */}
				<div>
					<label className="block text-sm font-medium text-gray-300 mb-2">
						Phone number
					</label>
					<input
						type="tel"
						value={data.phone}
						onChange={(e) => onUpdate("phone", e.target.value)}
						placeholder="(555) 123-4567"
						className={`w-full rounded-xl border bg-white/5 px-4 py-3.5 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-basepoint-teal focus:ring-1 focus:ring-basepoint-teal/30 transition ${
							errors.phone
								? "border-red-500 focus:border-red-500"
								: "border-white/10"
						}`}
					/>
					{errors.phone && (
						<p className="mt-1 text-xs text-red-400">{errors.phone}</p>
					)}
				</div>

				{/* Description */}
				<div>
					<label className="block text-sm font-medium text-gray-300 mb-2">
						Business description
					</label>
					<textarea
						value={data.description}
						onChange={(e) => onUpdate("description", e.target.value)}
						placeholder="Tell customers what makes your business special..."
						rows={4}
						className={`w-full resize-none rounded-xl border bg-white/5 px-4 py-3.5 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-basepoint-teal focus:ring-1 focus:ring-basepoint-teal/30 transition ${
							errors.description
								? "border-red-500 focus:border-red-500"
								: "border-white/10"
						}`}
					/>
					<div className="mt-1 flex items-center justify-between">
						{errors.description ? (
							<p className="text-xs text-red-400">{errors.description}</p>
						) : (
							<p className="text-xs text-gray-500">
								{data.description.length} characters (minimum 20)
							</p>
						)}
					</div>
				</div>

				{/* Logo upload (optional) */}
				<div>
					<label className="block text-sm font-medium text-gray-300 mb-2">
						Logo <span className="text-gray-500">(optional)</span>
					</label>
					<div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-white/10 p-6 text-center transition hover:border-white/20">
						<div className="mb-2 text-3xl">📷</div>
						<p className="text-sm text-gray-400">Upload your logo</p>
						<p className="mt-1 text-xs text-gray-500">
							Square images work best. You can change this later.
						</p>
						<button
							type="button"
							className="mt-3 cursor-pointer text-sm font-semibold text-basepoint-teal hover:text-teal-400">
							Choose file
						</button>
					</div>
				</div>

				{/* Navigation */}
				<div className="flex justify-between pt-4">
					<button
						type="button"
						onClick={onBack}
						className="cursor-pointer rounded-xl bg-white/5 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/10">
						← Back
					</button>
					<button
						type="submit"
						className="cursor-pointer rounded-xl bg-basepoint-teal px-6 py-3 text-sm font-semibold text-white transition hover:bg-teal-500">
						Continue →
					</button>
				</div>
			</form>
		</div>
	);
}

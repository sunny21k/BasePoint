import { useState } from "react";

interface BookingPreferences {
	bookingType: "in-person" | "online" | "both";
	bufferTime: number;
	allowCancellations: boolean;
	cancellationFee?: number;
	cancellationFeeType?: "dollar" | "percent";
	cancellationWindow?: number;
}

interface Step1PreferencesProps {
	data: { preferences: BookingPreferences };
	onUpdate: (field: string, value: BookingPreferences) => void;
	onNext: () => void;
	onBack?: () => void;
}

export default function Step1Preferences({
	data,
	onUpdate,
	onNext,
	onBack,
}: Step1PreferencesProps) {
	const [preferences, setPreferences] = useState<BookingPreferences>(
		data.preferences,
	);

	const handleChange = (field: keyof BookingPreferences, value: any) => {
		const updated = { ...preferences, [field]: value };
		setPreferences(updated);
		onUpdate("preferences", updated);
	};

	const handleCancellationFeeClick = (opt: {
		label: string;
		value: number;
		type: "dollar" | "percent";
	}) => {
		const updated = {
			...preferences,
			cancellationFee: opt.value,
			cancellationFeeType: opt.type,
		};

		console.log("Clicked cancellation fee:", opt);
		console.log("Updated cancellation fee state:", updated);

		setPreferences(updated);
		onUpdate("preferences", updated);
	};

	const isValid =
		preferences.bufferTime >= 0 &&
		(!preferences.allowCancellations ||
			(preferences.cancellationFee !== undefined &&
				preferences.cancellationWindow !== undefined));

	const bufferOptions = [0, 5, 10, 20, 30];
	const cancellationWindowOptions = [30, 60, 120, 180, 240];
	const cancellationFeeOptions = [
		{ label: "No fee", value: 0, type: "dollar" as const },
		{ label: "$5", value: 5, type: "dollar" as const },
		{ label: "$10", value: 10, type: "dollar" as const },
		{ label: "5%", value: 5, type: "percent" as const },
		{ label: "10%", value: 10, type: "percent" as const },
	];

	return (
		<div className="mx-auto w-full max-w-3xl px-4">
			<div className="rounded-[1.75rem] border border-slate-200 bg-white/90 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-sm lg:p-8">
				<div className="mb-8 text-center">
					<h2 className="text-2xl font-semibold tracking-tight text-slate-900">
						Set your appointment preferences
					</h2>
					<p className="mt-2 text-sm leading-6 text-slate-500">
						How do you want your customers to book with you?
					</p>
					<p className="mt-2 text-xs leading-5 text-slate-400">
						You can update these preferences later at any time.
					</p>
				</div>

				<div className="space-y-6">
					<div>
						<label className="mb-2 block text-sm font-medium text-slate-700">
							Booking type
						</label>
						<p className="mb-3 text-xs leading-5 text-slate-500">
							Choose whether you take in-person appointments, online
							appointments, or both.
						</p>
						<div className="relative">
							<select
								value={preferences.bookingType}
								onChange={(e) => handleChange("bookingType", e.target.value)}
								className="w-full appearance-none rounded-2xl border border-slate-300 bg-white px-4 py-3 pr-10 text-sm text-slate-900 shadow-sm outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100">
								<option value="in-person">In-person</option>
								<option value="online">Online</option>
								<option value="both">Both</option>
							</select>
							<div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
								<svg
									className="h-4 w-4 text-slate-400"
									fill="none"
									stroke="currentColor"
									strokeWidth={2}
									viewBox="0 0 24 24">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M19 9l-7 7-7-7"
									/>
								</svg>
							</div>
						</div>
					</div>

					<div>
						<label className="mb-2 block text-sm font-medium text-slate-700">
							Buffer time between appointments
						</label>
						<p className="mb-3 text-xs leading-5 text-slate-500">
							This adds a small gap between bookings so you have time to reset,
							travel, or prepare.
						</p>
						<input
							type="number"
							min={0}
							value={preferences.bufferTime}
							onChange={(e) =>
								handleChange("bufferTime", Number(e.target.value))
							}
							className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
						/>
						<div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-5">
							{bufferOptions.map((opt) => (
								<button
									key={opt}
									type="button"
									onClick={() => handleChange("bufferTime", opt)}
									className={`cursor-pointer rounded-2xl border p-3 text-left transition ${
										preferences.bufferTime === opt
											? "border-emerald-500 bg-emerald-50 ring-2 ring-emerald-100"
											: "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
									}`}>
									<div className="text-sm font-semibold text-slate-900">
										{opt} min
									</div>
								</button>
							))}
						</div>
					</div>

					<div className="flex flex-col gap-3">
						<div className="flex items-center gap-3">
							<input
								type="checkbox"
								checked={preferences.allowCancellations}
								onChange={(e) =>
									handleChange("allowCancellations", e.target.checked)
								}
								className="h-5 w-5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-200"
							/>
							<label className="text-sm text-slate-700">
								Allow customers to cancel appointments
							</label>
						</div>

						{preferences.allowCancellations && (
							<div className="space-y-4">
								<div>
									<label className="mb-2 block text-sm font-medium text-slate-700">
										Cancellation fee
									</label>
									<p className="mb-3 text-xs leading-5 text-slate-500">
										Choose a flat amount or percentage for cancellations.
									</p>
									<div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
										{cancellationFeeOptions.map((opt) => {
											const isSelected =
												preferences.cancellationFee === opt.value &&
												preferences.cancellationFeeType === opt.type;

											return (
												<button
													key={opt.label}
													type="button"
													onClick={() => handleCancellationFeeClick(opt)}
													className={`cursor-pointer rounded-2xl border p-3 text-left transition ${
														isSelected
															? "border-emerald-500 bg-emerald-50 ring-2 ring-emerald-100"
															: "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
													}`}>
													<div className="text-sm font-semibold text-slate-900">
														{opt.label}
													</div>
												</button>
											);
										})}
									</div>
								</div>

								<div>
									<label className="mb-2 block text-sm font-medium text-slate-700">
										Cancellation window (minutes before appointment)
									</label>
									<p className="mb-3 text-xs leading-5 text-slate-500">
										Set how much notice customers need before they can cancel.
									</p>
									<input
										type="number"
										min={0}
										value={preferences.cancellationWindow ?? ""}
										onChange={(e) =>
											handleChange("cancellationWindow", Number(e.target.value))
										}
										className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
									/>
									<div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-5">
										{cancellationWindowOptions.map((opt) => (
											<button
												key={opt}
												type="button"
												onClick={() => handleChange("cancellationWindow", opt)}
												className={`cursor-pointer rounded-2xl border p-3 text-left transition ${
													preferences.cancellationWindow === opt
														? "border-emerald-500 bg-emerald-50 ring-2 ring-emerald-100"
														: "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
												}`}>
												<div className="text-sm font-semibold text-slate-900">
													{opt} min
												</div>
											</button>
										))}
									</div>
								</div>
							</div>
						)}
					</div>
				</div>

				<div className="mt-8 flex justify-between">
					<button
						type="button"
						onClick={onBack}
						className="cursor-pointer rounded-2xl border border-slate-200 bg-white px-6 py-3 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 hover:text-slate-900">
						← Back
					</button>

					<button
						type="button"
						onClick={onNext}
						disabled={!isValid}
						className={`rounded-2xl px-6 py-3 text-sm font-semibold transition ${
							isValid
								? "cursor-pointer bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-sm hover:from-emerald-500 hover:to-teal-500"
								: "cursor-not-allowed bg-slate-100 text-slate-400"
						}`}>
						Continue →
					</button>
				</div>
			</div>
		</div>
	);
}

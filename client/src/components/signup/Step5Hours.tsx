interface Hours {
	open: string;
	close: string;
	isOpen: boolean;
}

interface Step5HoursProps {
	data: { hours: Record<string, Hours> };
	onUpdate: (field: string, value: Record<string, Hours>) => void;
	onNext: () => void;
	onBack: () => void;
}

export default function Step5Hours({
	data,
	onUpdate,
	onNext,
	onBack,
}: Step5HoursProps) {
	const days = [
		{ key: "monday", label: "Monday" },
		{ key: "tuesday", label: "Tuesday" },
		{ key: "wednesday", label: "Wednesday" },
		{ key: "thursday", label: "Thursday" },
		{ key: "friday", label: "Friday" },
		{ key: "saturday", label: "Saturday" },
		{ key: "sunday", label: "Sunday" },
	];

	const updateDay = (
		day: string,
		field: keyof Hours,
		value: string | boolean,
	) => {
		onUpdate("hours", {
			...data.hours,
			[day]: {
				...data.hours[day],
				[field]: value,
			},
		});
	};

	return (
		<div className="mx-auto w-full max-w-3xl px-4">
			<div className="rounded-[1.75rem] border border-slate-200 bg-white/90 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-sm lg:p-8">
				<div className="mb-8 text-center">
					<h2 className="text-2xl font-semibold tracking-tight text-slate-900">
						Set your hours
					</h2>
					<p className="mt-2 text-sm leading-6 text-slate-500">
						When are you available for bookings each day?
					</p>
				</div>

				<div className="space-y-3">
					{days.map((day) => {
						const isOpen = data.hours[day.key].isOpen;

						return (
							<div
								key={day.key}
								className="rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-4 shadow-sm">
								<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
									<label className="flex cursor-pointer items-center gap-3">
										<input
											type="checkbox"
											checked={isOpen}
											onChange={(e) =>
												updateDay(day.key, "isOpen", e.target.checked)
											}
											className="h-5 w-5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-200"
										/>
										<div>
											<span className="text-sm font-semibold text-slate-900">
												{day.label}
											</span>
											<p className="text-xs text-slate-500">
												{isOpen ? "Open for bookings" : "Closed"}
											</p>
										</div>
									</label>

									{isOpen ? (
										<div className="flex items-center gap-3">
											<input
												type="time"
												value={data.hours[day.key].open}
												onChange={(e) =>
													updateDay(day.key, "open", e.target.value)
												}
												className="rounded-2xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
											/>
											<span className="text-sm text-slate-400">to</span>
											<input
												type="time"
												value={data.hours[day.key].close}
												onChange={(e) =>
													updateDay(day.key, "close", e.target.value)
												}
												className="rounded-2xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
											/>
										</div>
									) : (
										<span className="inline-flex w-fit rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-500">
											Closed
										</span>
									)}
								</div>
							</div>
						);
					})}
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
						className="cursor-pointer rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:from-emerald-500 hover:to-teal-500">
						Continue →
					</button>
				</div>
			</div>
		</div>
	);
}

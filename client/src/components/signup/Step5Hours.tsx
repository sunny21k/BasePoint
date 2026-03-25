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
		<div className="max-w-2xl mx-auto px-4">
			<div className="text-center mb-8">
				<h2 className="text-2xl font-semibold text-white">Set your hours</h2>
				<p className="mt-1 text-sm text-gray-400">
					When are you available for bookings each day?
				</p>
			</div>

			<div className="space-y-3">
				{days.map((day) => (
					<div
						key={day.key}
						className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4">
						{/* Checkbox label */}
						<label className="flex cursor-pointer items-center gap-3 flex-1">
							<input
								type="checkbox"
								checked={data.hours[day.key].isOpen}
								onChange={(e) => updateDay(day.key, "isOpen", e.target.checked)}
								className="h-5 w-5 rounded border-white/10 bg-white/5 text-basepoint-teal focus:ring-basepoint-teal focus:ring-offset-0"
							/>
							<span className="text-sm font-medium text-white">
								{day.label}
							</span>
						</label>

						{/* Time inputs */}
						{data.hours[day.key].isOpen ? (
							<div className="flex items-center gap-3">
								<input
									type="time"
									value={data.hours[day.key].open}
									onChange={(e) => updateDay(day.key, "open", e.target.value)}
									className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:outline-none focus:border-basepoint-teal focus:ring-1 focus:ring-basepoint-teal/30 transition"
								/>
								<span className="text-gray-500 text-sm">to</span>
								<input
									type="time"
									value={data.hours[day.key].close}
									onChange={(e) => updateDay(day.key, "close", e.target.value)}
									className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:outline-none focus:border-basepoint-teal focus:ring-1 focus:ring-basepoint-teal/30 transition"
								/>
							</div>
						) : (
							<span className="text-xs text-gray-500">Closed</span>
						)}
					</div>
				))}
			</div>

			{/* Navigation */}
			<div className="mt-8 flex justify-between">
				<button
					type="button"
					onClick={onBack}
					className="cursor-pointer rounded-xl bg-white/5 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/10">
					← Back
				</button>
				<button
					type="button"
					onClick={onNext}
					className="cursor-pointer rounded-xl bg-basepoint-teal px-6 py-3 text-sm font-semibold text-white transition hover:bg-teal-500">
					Continue →
				</button>
			</div>
		</div>
	);
}

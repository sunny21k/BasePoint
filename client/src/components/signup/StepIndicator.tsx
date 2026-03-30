import { useMemo } from "react";

interface StepIndicatorProps {
	currentStep: number;
	totalSteps: number;
}

export default function StepIndicator({
	currentStep,
	totalSteps,
}: StepIndicatorProps) {
	const steps = [
		{ number: 1, label: "Account" },
		{ number: 2, label: "Category" },
		{ number: 3, label: "Details" },
		{ number: 4, label: "Service" },
		{ number: 5, label: "Hours" },
		{ number: 6, label: "Done" },
	];

	const percent = useMemo(
		() => Math.round((currentStep / totalSteps) * 100),
		[currentStep, totalSteps],
	);

	return (
		<div className="mx-auto w-full max-w-5xl px-4">
			<div className="rounded-[1.75rem] border border-slate-200 bg-white/85 p-5 shadow-sm backdrop-blur-sm">
				<div className="mb-5 flex flex-col gap-1">
					<h2 className="text-xl font-semibold tracking-tight text-slate-900">
						Create your BasePoint business
					</h2>
					<p className="text-sm leading-6 text-slate-500">
						We&apos;ll guide you through setting up your booking page in a few
						simple steps.
					</p>
				</div>

				<div className="mb-6">
					<div className="mb-2 flex items-center justify-between text-sm text-slate-500">
						<span>
							Step {currentStep} of {totalSteps}
						</span>
						<span>{percent}% complete</span>
					</div>

					<div className="h-2 overflow-hidden rounded-full bg-slate-100">
						<div
							className="h-full rounded-full bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-300 transition-all duration-500 ease-out"
							style={{ width: `${percent}%` }}
						/>
					</div>
				</div>

				<div className="hidden items-start justify-between gap-2 lg:flex">
					{steps.map((step, idx) => {
						const isCompleted = currentStep > step.number;
						const isActive = currentStep === step.number;
						const isFuture = currentStep < step.number;

						return (
							<div key={step.number} className="flex flex-1 items-center">
								<div className="flex flex-col items-center">
									<div
										className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition-all duration-300 ${
											isActive
												? "border border-emerald-200 bg-gradient-to-r from-emerald-400 to-teal-400 text-white shadow-sm"
												: isCompleted
													? "border border-emerald-200 bg-emerald-50 text-emerald-700"
													: "border border-slate-200 bg-white text-slate-400"
										}`}>
										{isCompleted ? (
											<svg
												className="h-4 w-4"
												fill="currentColor"
												viewBox="0 0 20 20">
												<path
													fillRule="evenodd"
													d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
													clipRule="evenodd"
												/>
											</svg>
										) : (
											step.number
										)}
									</div>

									<span
										className={`mt-2 text-xs font-medium transition-colors duration-300 ${
											isFuture ? "text-slate-400" : "text-slate-700"
										}`}>
										{step.label}
									</span>
								</div>

								{idx < steps.length - 1 && (
									<div className="mx-3 h-0.5 flex-1 overflow-hidden rounded-full bg-slate-100">
										<div
											className={`h-full rounded-full transition-all duration-300 ${
												currentStep > step.number
													? "bg-gradient-to-r from-emerald-300 to-teal-300"
													: "bg-transparent"
											}`}
										/>
									</div>
								)}
							</div>
						);
					})}
				</div>

				<div className="mt-6 grid gap-2 sm:grid-cols-3 lg:hidden">
					{steps.map((step) => {
						const isCompleted = currentStep > step.number;
						const isActive = currentStep === step.number;

						return (
							<div
								key={step.number}
								className={`rounded-2xl border px-3 py-3 text-center transition ${
									isActive
										? "border-emerald-200 bg-emerald-50"
										: isCompleted
											? "border-emerald-100 bg-emerald-50/60"
											: "border-slate-200 bg-white"
								}`}>
								<div
									className={`mx-auto flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold ${
										isActive
											? "bg-gradient-to-r from-emerald-400 to-teal-400 text-white"
											: isCompleted
												? "bg-emerald-100 text-emerald-700"
												: "bg-slate-100 text-slate-500"
									}`}>
									{isCompleted ? "✓" : step.number}
								</div>
								<p
									className={`mt-2 text-xs font-medium ${
										isActive
											? "text-slate-900"
											: isCompleted
												? "text-emerald-700"
												: "text-slate-400"
									}`}>
									{step.label}
								</p>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}

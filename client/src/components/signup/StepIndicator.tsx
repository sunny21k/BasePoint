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
		<div className="w-full max-w-4xl mx-auto px-4">
			{/* Title row */}
			<div className="mb-6 flex flex-col gap-0.5">
				<h2 className="text-lg font-semibold text-white">
					Create your BasePoint business
				</h2>
				<p className="text-sm text-gray-400">
					We’ll guide you through setting up your booking page in a few simple
					steps.
				</p>
			</div>

			{/* Progress bar */}
			<div className="mb-8">
				<div className="flex items-center justify-between text-sm text-gray-400">
					<span>
						Step {currentStep} of {totalSteps}
					</span>
					<span>{percent}% complete</span>
				</div>
				<div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/5">
					<div
						className="h-full bg-linear-to-r from-basepoint-teal to-emerald-400 transition-all duration-500 ease-out"
						style={{ width: `${percent}%` }}
					/>
				</div>
			</div>

			{/* Step dots (desktop only) */}
			<div className="hidden lg:flex items-center justify-between">
				{steps.map((step, idx) => {
					const isCompleted = currentStep > step.number;
					const isActive = currentStep === step.number;
					const isFuture = currentStep < step.number;

					return (
						<div key={step.number} className="flex items-center">
							<div className="flex flex-col items-center">
								<div
									className={`relative flex h-9 w-9 items-center justify-center rounded-full font-semibold text-xs transition-all duration-300 ${
										isActive
											? "bg-basepoint-teal text-white shadow-lg shadow-basepoint-teal/40"
											: isCompleted
												? "bg-white/10 text-basepoint-teal"
												: "bg-white/5 text-gray-500"
									}`}>
									{isCompleted ? (
										<svg
											className="h-3.5 w-3.5"
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
									className={`mt-2 text-xs font-medium transition-colors duration-300 ${isFuture ? "text-gray-500" : "text-white"}`}>
									{step.label}
								</span>
							</div>

							{/* Connector line */}
							{idx < steps.length - 1 && (
								<div
									className={`w-12 h-0.5 mx-2 rounded-full transition-all duration-300 ${
										currentStep >= step.number
											? "bg-basepoint-teal"
											: "bg-white/5"
									}`}
								/>
							)}
						</div>
					);
				})}
			</div>
		</div>
	);
}

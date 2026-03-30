import { useState } from "react";
import { Link } from "react-router-dom";
import StepIndicator from "../components/signup/StepIndicator";
import Step1Account from "../components/signup/Step1Account";
import Step2Category from "../components/signup/Step2Category";
import Step3Details from "../components/signup/Step3Details";
import Step4Service from "../components/signup/Step4Service";
import Step5Hours from "../components/signup/Step5Hours";
import Step6Success from "../components/signup/Step6Success";

interface SignupData {
	email: string;
	password: string;
	businessName: string;
	category: string;
	address: string;
	phone: string;
	description: string;
	services: Array<{
		name: string;
		price: number;
		duration: number;
		description: string;
	}>;
	hours: Record<string, { open: string; close: string; isOpen: boolean }>;
}

export default function BusinessSignup() {
	const [currentStep, setCurrentStep] = useState(1);
	const [formData, setFormData] = useState<SignupData>({
		email: "",
		password: "",
		businessName: "",
		category: "",
		address: "",
		phone: "",
		description: "",
		services: [],
		hours: {
			monday: { open: "09:00", close: "17:00", isOpen: true },
			tuesday: { open: "09:00", close: "17:00", isOpen: true },
			wednesday: { open: "09:00", close: "17:00", isOpen: true },
			thursday: { open: "09:00", close: "17:00", isOpen: true },
			friday: { open: "09:00", close: "17:00", isOpen: true },
			saturday: { open: "09:00", close: "17:00", isOpen: true },
			sunday: { open: "09:00", close: "17:00", isOpen: false },
		},
	});

	const updateField = (field: string, value: any) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 6));
	const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

	return (
		<div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.12),transparent_28%),linear-gradient(180deg,#f8fafc_0%,#ecfeff_46%,#ffffff_100%)] text-slate-900">
			<nav className="border-b border-slate-200/80 bg-white/75 backdrop-blur">
				<div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
					<Link to="/" className="flex items-center gap-3">
						<div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-600 to-teal-500 text-sm font-bold text-white shadow-sm">
							BP
						</div>
						<span className="text-xl font-bold tracking-tight text-slate-900">
							BasePoint
						</span>
					</Link>

					<Link
						to="/business/login"
						className="text-sm text-slate-500 transition hover:text-emerald-700">
						Already have an account?{" "}
						<span className="font-semibold text-emerald-700">Log in</span>
					</Link>
				</div>
			</nav>

			<main className="mx-auto max-w-5xl px-6 py-12 lg:py-14">
				<div className="rounded-[2rem] border border-slate-200 bg-white/85 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-sm lg:p-8">
					<StepIndicator currentStep={currentStep} totalSteps={6} />

					<div className="mt-8">
						{currentStep === 1 && (
							<Step1Account
								data={{
									email: formData.email,
									password: formData.password,
									businessName: formData.businessName,
								}}
								onUpdate={updateField}
								onNext={nextStep}
							/>
						)}

						{currentStep === 2 && (
							<Step2Category
								data={{ category: formData.category }}
								onUpdate={updateField}
								onNext={nextStep}
								onBack={prevStep}
							/>
						)}

						{currentStep === 3 && (
							<Step3Details
								data={{
									address: formData.address,
									phone: formData.phone,
									description: formData.description,
								}}
								onUpdate={updateField}
								onNext={nextStep}
								onBack={prevStep}
							/>
						)}

						{currentStep === 4 && (
							<Step4Service
								data={{ services: formData.services }}
								onUpdate={updateField}
								onNext={nextStep}
								onBack={prevStep}
							/>
						)}

						{currentStep === 5 && (
							<Step5Hours
								data={{ hours: formData.hours }}
								onUpdate={updateField}
								onNext={nextStep}
								onBack={prevStep}
							/>
						)}

						{currentStep === 6 && (
							<Step6Success businessName={formData.businessName} />
						)}
					</div>
				</div>
			</main>
		</div>
	);
}

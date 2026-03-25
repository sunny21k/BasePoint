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
		<div className="min-h-screen bg-[#050609] text-white">
			{/* Header */}
			<nav className="border-b border-white/5">
				<div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
					<Link to="/" className="flex items-center gap-2">
						<div className="w-8 h-8 bg-basepoint-teal/20 rounded-lg flex items-center justify-center">
							<span className="text-basepoint-teal font-bold text-sm">BP</span>
						</div>
						<span className="text-xl font-bold">BasePoint</span>
					</Link>
					<Link
						to="/business/login"
						className="text-sm text-gray-400 hover:text-white transition">
						Already have an account?{" "}
						<span className="text-basepoint-teal font-semibold">Log in</span>
					</Link>
				</div>
			</nav>

			{/* Main Content */}
			<div className="max-w-4xl mx-auto px-6 py-12">
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
		</div>
	);
}

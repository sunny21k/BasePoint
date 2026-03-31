import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
	HiArrowRight,
	HiPhone,
	HiUser,
	HiMail,
	HiLocationMarker,
	HiGlobeAlt,
	HiInformationCircle,
} from "react-icons/hi";

import { HiBuildingOffice2 } from "react-icons/hi2";

const businessTypes = [
	"Salon",
	"Barbershop",
	"Fitness Studio",
	"Spa",
	"Restaurant",
	"Consulting",
	"Home Services",
	"Other",
];

export default function BusinessOnboarding() {
	const navigate = useNavigate();
	const [currentStep, setCurrentStep] = useState(1);
	const [isLoading, setIsLoading] = useState(false);
	const [errors, setErrors] = useState<Record<string, string>>({});
	const [formData, setFormData] = useState({
		ownerName: "",
		email: "",
		phone: "",
		businessName: "",
		businessType: "",
		businessAddress: "",
		websiteOrSocial: "",
		description: "",
	});

	const validateStep = (step: number) => {
		const newErrors: Record<string, string> = {};

		if (step === 1) {
			if (!formData.ownerName.trim())
				newErrors.ownerName = "Owner name is required";
			if (!formData.email.trim()) newErrors.email = "Email is required";
			else if (!/\S+@\S+\.\S+/.test(formData.email))
				newErrors.email = "Email is invalid";
			if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
		}

		if (step === 2) {
			if (!formData.businessName.trim())
				newErrors.businessName = "Business name is required";
			if (!formData.businessType)
				newErrors.businessType = "Business type is required";
			if (!formData.businessAddress.trim())
				newErrors.businessAddress = "Business address is required";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleNext = () => {
		if (!validateStep(currentStep)) return;
		setCurrentStep(2);
	};

	const handleBack = () => setCurrentStep(1);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!validateStep(2)) return;

		setIsLoading(true);

		setTimeout(() => {
			setIsLoading(false);
			navigate("/business/pending", {
				state: {
					applicationStatus: "pending",
					businessName: formData.businessName,
				},
			});
		}, 1200);
	};

	return (
		<div className="min-h-screen bg-sky-50 px-6 py-12 text-slate-900">
			<div className="mx-auto w-full max-w-4xl">
				<div className="mb-8 flex items-center justify-between">
					<Link to="/" className="flex items-center gap-3">
						<div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-600 text-lg font-bold text-white shadow-sm">
							BP
						</div>
						<span className="text-2xl font-bold tracking-tight text-slate-900">
							BasePoint
						</span>
					</Link>
					<Link
						to="/business/login"
						className="text-sm font-semibold text-sky-700 hover:text-sky-800">
						Back to login
					</Link>
				</div>

				<div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
					<div className="border-b border-slate-200 bg-slate-50 px-6 py-5 md:px-8">
						<div className="mb-4 flex items-center justify-between gap-4">
							<div>
								<h1 className="text-2xl font-bold tracking-tight text-slate-900">
									Business verification
								</h1>
								<p className="mt-1 text-sm text-slate-600">
									Tell us about your business so we can review your application.
								</p>
							</div>
							<div className="text-right text-sm text-slate-500">
								Step {currentStep} of 2
							</div>
						</div>
						<div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
							<div
								className="h-full rounded-full bg-sky-600 transition-all"
								style={{ width: currentStep === 1 ? "50%" : "100%" }}
							/>
						</div>
					</div>

					<form
						onSubmit={handleSubmit}
						className="grid gap-0 lg:grid-cols-[1.2fr_0.8fr]">
						<div className="p-6 md:p-8">
							{currentStep === 1 && (
								<div className="space-y-5">
									<div>
										<label className="mb-2 block text-sm font-medium text-slate-700">
											Owner full name
										</label>
										<div className="relative">
											<HiUser className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
											<input
												value={formData.ownerName}
												onChange={(e) =>
													setFormData({
														...formData,
														ownerName: e.target.value,
													})
												}
												placeholder="Jane Doe"
												className={`w-full rounded-2xl border bg-white py-3 pl-12 pr-4 outline-none transition focus:border-sky-500 ${
													errors.ownerName
														? "border-red-500"
														: "border-slate-200"
												}`}
											/>
										</div>
										{errors.ownerName && (
											<p className="mt-1 text-sm text-red-500">
												{errors.ownerName}
											</p>
										)}
									</div>

									<div>
										<label className="mb-2 block text-sm font-medium text-slate-700">
											Email address
										</label>
										<div className="relative">
											<HiMail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
											<input
												type="email"
												value={formData.email}
												onChange={(e) =>
													setFormData({ ...formData, email: e.target.value })
												}
												placeholder="you@example.com"
												className={`w-full rounded-2xl border bg-white py-3 pl-12 pr-4 outline-none transition focus:border-sky-500 ${
													errors.email ? "border-red-500" : "border-slate-200"
												}`}
											/>
										</div>
										{errors.email && (
											<p className="mt-1 text-sm text-red-500">
												{errors.email}
											</p>
										)}
									</div>

									<div>
										<label className="mb-2 block text-sm font-medium text-slate-700">
											Phone number
										</label>
										<div className="relative">
											<HiPhone className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
											<input
												value={formData.phone}
												onChange={(e) =>
													setFormData({ ...formData, phone: e.target.value })
												}
												placeholder="(555) 123-4567"
												className={`w-full rounded-2xl border bg-white py-3 pl-12 pr-4 outline-none transition focus:border-sky-500 ${
													errors.phone ? "border-red-500" : "border-slate-200"
												}`}
											/>
										</div>
										{errors.phone && (
											<p className="mt-1 text-sm text-red-500">
												{errors.phone}
											</p>
										)}
									</div>

									<div className="rounded-2xl border border-sky-100 bg-sky-50 p-4 text-sm text-slate-600">
										<div className="mb-1 flex items-center gap-2 font-medium text-slate-800">
											<HiInformationCircle className="h-5 w-5 text-sky-600" />
											Why we ask for this
										</div>
										We use your contact details to review your business and
										reach out if we need anything else.
									</div>
								</div>
							)}

							{currentStep === 2 && (
								<div className="space-y-5">
									<div>
										<label className="mb-2 block text-sm font-medium text-slate-700">
											Business name
										</label>
										<div className="relative">
											<HiBuildingOffice2 className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
											<input
												value={formData.businessName}
												onChange={(e) =>
													setFormData({
														...formData,
														businessName: e.target.value,
													})
												}
												placeholder="BasePoint Salon"
												className={`w-full rounded-2xl border bg-white py-3 pl-12 pr-4 outline-none transition focus:border-sky-500 ${
													errors.businessName
														? "border-red-500"
														: "border-slate-200"
												}`}
											/>
										</div>
										{errors.businessName && (
											<p className="mt-1 text-sm text-red-500">
												{errors.businessName}
											</p>
										)}
									</div>

									<div>
										<label className="mb-2 block text-sm font-medium text-slate-700">
											Business type
										</label>
										<select
											value={formData.businessType}
											onChange={(e) =>
												setFormData({
													...formData,
													businessType: e.target.value,
												})
											}
											className={`w-full rounded-2xl border bg-white px-4 py-3 outline-none transition focus:border-sky-500 ${
												errors.businessType
													? "border-red-500"
													: "border-slate-200"
											}`}>
											<option value="">Select a type</option>
											{businessTypes.map((type) => (
												<option key={type} value={type}>
													{type}
												</option>
											))}
										</select>
										{errors.businessType && (
											<p className="mt-1 text-sm text-red-500">
												{errors.businessType}
											</p>
										)}
									</div>

									<div>
										<label className="mb-2 block text-sm font-medium text-slate-700">
											Business address
										</label>
										<div className="relative">
											<HiLocationMarker className="absolute left-4 top-4 h-5 w-5 text-slate-400" />
											<textarea
												value={formData.businessAddress}
												onChange={(e) =>
													setFormData({
														...formData,
														businessAddress: e.target.value,
													})
												}
												placeholder="123 Main St, New York, NY"
												rows={3}
												className={`w-full rounded-2xl border bg-white py-3 pl-12 pr-4 outline-none transition focus:border-sky-500 ${
													errors.businessAddress
														? "border-red-500"
														: "border-slate-200"
												}`}
											/>
										</div>
										{errors.businessAddress && (
											<p className="mt-1 text-sm text-red-500">
												{errors.businessAddress}
											</p>
										)}
									</div>

									<div>
										<label className="mb-2 block text-sm font-medium text-slate-700">
											Website or social link{" "}
											<span className="text-slate-400">(optional)</span>
										</label>
										<div className="relative">
											<HiGlobeAlt className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
											<input
												value={formData.websiteOrSocial}
												onChange={(e) =>
													setFormData({
														...formData,
														websiteOrSocial: e.target.value,
													})
												}
												placeholder="https://instagram.com/yourbusiness"
												className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-12 pr-4 outline-none transition focus:border-sky-500"
											/>
										</div>
										<p className="mt-1 text-sm text-slate-500">
											Share a website, Instagram, Facebook page, or leave it
											blank.
										</p>
									</div>

									<div>
										<label className="mb-2 block text-sm font-medium text-slate-700">
											Business description{" "}
											<span className="text-slate-400">(optional)</span>
										</label>
										<textarea
											value={formData.description}
											onChange={(e) =>
												setFormData({
													...formData,
													description: e.target.value,
												})
											}
											placeholder="Tell us what you offer..."
											rows={4}
											className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-sky-500"
										/>
									</div>
								</div>
							)}

							<div className="mt-8 flex items-center justify-between gap-3">
								{currentStep === 2 ? (
									<button
										type="button"
										onClick={handleBack}
										className="rounded-2xl border border-slate-200 bg-white px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-50">
										Back
									</button>
								) : (
									<div />
								)}

								{currentStep === 1 ? (
									<button
										type="button"
										onClick={handleNext}
										className="ml-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 font-semibold text-white transition hover:bg-slate-800">
										Continue
										<HiArrowRight className="h-5 w-5" />
									</button>
								) : (
									<button
										type="submit"
										disabled={isLoading}
										className="ml-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-sky-600 px-5 py-3 font-semibold text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-50">
										{isLoading ? (
											<>
												<div className="h-5 w-5 animate-spin rounded-full border-2 border-white/25 border-t-white" />
												Submitting...
											</>
										) : (
											<>
												Submit application
												<HiArrowRight className="h-5 w-5" />
											</>
										)}
									</button>
								)}
							</div>
						</div>

						<div className="border-t border-slate-200 bg-slate-50 p-6 lg:border-l lg:border-t-0 md:p-8">
							<div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
								<h2 className="text-lg font-semibold text-slate-900">
									What happens next
								</h2>
								<ul className="mt-4 space-y-4 text-sm text-slate-600">
									<li className="flex gap-3">
										<span className="mt-0.5 h-2 w-2 rounded-full bg-sky-500" />
										Submit your business application.
									</li>
									<li className="flex gap-3">
										<span className="mt-0.5 h-2 w-2 rounded-full bg-sky-500" />
										We review the details you provided.
									</li>
									<li className="flex gap-3">
										<span className="mt-0.5 h-2 w-2 rounded-full bg-sky-500" />
										Approved accounts unlock the dashboard.
									</li>
								</ul>
							</div>

							<div className="mt-6 rounded-3xl border border-dashed border-slate-300 bg-white p-6 text-sm text-slate-600">
								<p className="font-medium text-slate-800">Need help?</p>
								<p className="mt-2">
									Keep this form simple for now. You can add documents or tax
									details later if your review process needs them.
								</p>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

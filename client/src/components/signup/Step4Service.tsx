import { useState } from "react";
import {
	HiPlus,
	HiX,
	HiOutlineInformationCircle,
	HiOutlineClock,
	HiOutlineTag,
	HiOutlineSparkles,
	HiOutlineChevronDown,
} from "react-icons/hi";
import { API_URL } from "../../pages/BusinessPages/BusinessAuthContext";
import axios from "axios";

interface Service {
	name: string;
	price: number;
	duration: number;
	description: string;
}

interface Step4ServiceProps {
	data: { services: Service[] };
	onUpdate: (field: string, value: Service[]) => void;
	onNext: () => void;
	onBack: () => void;
}

export default function Step4Service({
	data,
	onUpdate,
	onNext,
	onBack,
}: Step4ServiceProps) {
	const [showForm, setShowForm] = useState(data.services.length === 0);
	const [isSaving, setIsSaving] = useState(false);
	const [currentService, setCurrentService] = useState<Service>({
		name: "",
		price: 0,
		duration: 30,
		description: "",
	});

	const handleNext = async () => {
		try {
			setIsSaving(true);

			const token = localStorage.getItem("token");

			await axios.post(
				`${API_URL}/api/services/create-services-bulk`,
				{
					services: data.services,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			);

			onNext();
		} catch (err) {
			console.error("Failed to save services:", err);
		} finally {
			setIsSaving(false);
		}
	};

	const templates = [
		{
			name: "Men's Haircut",
			price: 35,
			duration: 30,
			description: "Classic haircut with wash and style",
			badge: "Popular",
		},
		{
			name: "Women's Haircut",
			price: 65,
			duration: 60,
			description: "Cut and style",
			badge: "Popular",
		},
		{
			name: "Beard Trim",
			price: 20,
			duration: 15,
			description: "Shape and edge up",
			badge: "Quick add",
		},
		{
			name: "Personal Training",
			price: 75,
			duration: 60,
			description: "One-on-one training session",
			badge: "Popular",
		},
		{
			name: "Yoga Class",
			price: 25,
			duration: 60,
			description: "Group yoga session",
			badge: "Quick add",
		},
		{
			name: "Massage (60min)",
			price: 90,
			duration: 60,
			description: "Relaxation massage",
			badge: "Popular",
		},
	];

	const addService = () => {
		if (currentService.name && currentService.price > 0) {
			onUpdate("services", [...data.services, currentService]);
			setCurrentService({
				name: "",
				price: 0,
				duration: 30,
				description: "",
			});
			setShowForm(false);
		}
	};

	const removeService = (index: number) => {
		onUpdate(
			"services",
			data.services.filter((_, i) => i !== index),
		);
	};

	const useTemplate = (template: (typeof templates)[0]) => {
		setCurrentService({
			name: template.name,
			price: template.price,
			duration: template.duration,
			description: template.description,
		});
		setShowForm(true);
	};

	const isValidCurrent = currentService.name && currentService.price > 0;

	return (
		<div className="mx-auto w-full max-w-5xl px-4">
			<div className="rounded-[1.75rem] border border-slate-200 bg-white/90 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-sm lg:p-8">
				<div className="mb-8 text-center">
					<h2 className="text-2xl font-semibold tracking-tight text-slate-900">
						Add your services
					</h2>
					<p className="mt-2 text-sm leading-6 text-slate-500">
						What do you offer? Start with at least one to continue.
					</p>
					<p className="mt-2 text-xs leading-5 text-slate-400">
						You can change these later anytime.
					</p>
				</div>

				{data.services.length > 0 && (
					<div className="mb-6">
						<div className="mb-3 flex items-center gap-2">
							<HiOutlineSparkles className="h-5 w-5 text-emerald-600" />
							<h3 className="text-sm font-semibold text-slate-900">
								Added services
							</h3>
						</div>

						<div className="space-y-3">
							{data.services.map((service, idx) => (
								<div
									key={idx}
									className="flex items-start justify-between gap-4 rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-4 shadow-sm">
									<div className="min-w-0 flex-1">
										<h4 className="text-sm font-semibold text-slate-900">
											{service.name}
										</h4>
										<p className="mt-1 text-xs text-slate-500">
											${service.price} • {service.duration} min
										</p>
										{service.description && (
											<p className="mt-2 text-xs leading-5 text-slate-500">
												{service.description}
											</p>
										)}
									</div>

									<button
										type="button"
										onClick={() => removeService(idx)}
										className="cursor-pointer rounded-full border border-slate-200 bg-white p-2 text-slate-400 transition hover:border-red-200 hover:bg-red-50 hover:text-red-500"
										aria-label="Remove service">
										<HiX className="h-4 w-4" />
									</button>
								</div>
							))}
						</div>
					</div>
				)}

				<div className="mb-8 rounded-3xl border border-slate-200 bg-slate-50/80 p-5">
					<div className="mb-3 flex items-center gap-2">
						<HiOutlineSparkles className="h-5 w-5 text-emerald-600" />
						<h3 className="text-sm font-semibold text-slate-900">
							Quick start templates
						</h3>
					</div>
					<p className="mb-4 text-xs leading-5 text-slate-500">
						Pick one to auto-fill the form, then edit it to match your business.
					</p>

					<div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
						{templates.map((template, idx) => (
							<button
								key={idx}
								type="button"
								onClick={() => useTemplate(template)}
								className="group relative cursor-pointer rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-200 hover:bg-emerald-50/60 hover:shadow-md">
								<div className="absolute right-3 top-3 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">
									{template.badge}
								</div>

								<h4 className="pr-16 text-sm font-semibold text-slate-900">
									{template.name}
								</h4>
								<p className="mt-1 text-xs leading-5 text-slate-500">
									{template.description}
								</p>

								<div className="mt-4 flex items-center gap-4 text-xs text-slate-500">
									<span className="inline-flex items-center gap-1">
										<HiOutlineTag className="h-4 w-4" />${template.price}
									</span>
									<span className="inline-flex items-center gap-1">
										<HiOutlineClock className="h-4 w-4" />
										{template.duration} min
									</span>
								</div>

								<div className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-emerald-700 opacity-0 transition group-hover:opacity-100">
									Use template
									<HiOutlineChevronDown className="h-4 w-4 rotate-[-90deg]" />
								</div>
							</button>
						))}
					</div>
				</div>

				{showForm ? (
					<div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-6 shadow-sm">
						<div className="mb-4 flex items-center gap-2">
							<HiOutlineInformationCircle className="h-5 w-5 text-emerald-600" />
							<p className="text-sm font-medium text-slate-700">
								Add or edit a service below
							</p>
						</div>

						<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
							<div>
								<label className="mb-2 block text-sm font-medium text-slate-700">
									Service name
								</label>
								<input
									type="text"
									value={currentService.name}
									onChange={(e) =>
										setCurrentService({
											...currentService,
											name: e.target.value,
										})
									}
									placeholder="Men's Haircut"
									className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
								/>
							</div>

							<div>
								<label className="mb-2 block text-sm font-medium text-slate-700">
									Price ($)
								</label>
								<input
									type="number"
									value={currentService.price || ""}
									onChange={(e) =>
										setCurrentService({
											...currentService,
											price: Number(e.target.value),
										})
									}
									placeholder="35"
									min="0"
									step="0.01"
									className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
								/>
							</div>
						</div>

						<div className="mt-4">
							<label className="mb-2 block text-sm font-medium text-slate-700">
								Duration (minutes)
							</label>
							<select
								value={currentService.duration}
								onChange={(e) =>
									setCurrentService({
										...currentService,
										duration: Number(e.target.value),
									})
								}
								className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100">
								<option value={15}>15 minutes</option>
								<option value={30}>30 minutes</option>
								<option value={45}>45 minutes</option>
								<option value={60}>1 hour</option>
								<option value={90}>1.5 hours</option>
								<option value={120}>2 hours</option>
							</select>
						</div>

						<div className="mt-4">
							<label className="mb-2 block text-sm font-medium text-slate-700">
								Description <span className="text-slate-400">(optional)</span>
							</label>
							<textarea
								value={currentService.description}
								onChange={(e) =>
									setCurrentService({
										...currentService,
										description: e.target.value,
									})
								}
								placeholder="Brief description of the service"
								rows={3}
								className="w-full resize-none rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
							/>
						</div>

						<div className="mt-6 flex gap-3">
							<button
								type="button"
								onClick={addService}
								disabled={!isValidCurrent}
								className={`flex-1 rounded-2xl px-4 py-3 text-sm font-semibold transition ${
									isValidCurrent
										? "cursor-pointer bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-sm hover:from-emerald-500 hover:to-teal-500"
										: "cursor-not-allowed bg-slate-100 text-slate-400"
								}`}>
								Add Service
							</button>

							<button
								type="button"
								onClick={() => {
									setShowForm(false);
									setCurrentService({
										name: "",
										price: 0,
										duration: 30,
										description: "",
									});
								}}
								className="cursor-pointer rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50">
								Cancel
							</button>
						</div>
					</div>
				) : (
					<button
						type="button"
						onClick={() => setShowForm(true)}
						className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-slate-300 bg-gradient-to-br from-slate-50 to-white p-5 text-sm font-medium text-slate-500 shadow-sm transition hover:border-emerald-300 hover:bg-emerald-50/60 hover:text-emerald-700">
						<HiPlus className="h-5 w-5" />
						Add custom service
					</button>
				)}

				<div className="mt-8 flex justify-between">
					<button
						type="button"
						onClick={onBack}
						className="cursor-pointer rounded-2xl border border-slate-200 bg-white px-6 py-3 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 hover:text-slate-900">
						← Back
					</button>

					<button
						type="button"
						onClick={handleNext}
						disabled={data.services.length === 0}
						className={`rounded-2xl px-6 py-3 text-sm font-semibold transition ${
							data.services.length > 0
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

import { useState } from "react";
import { HiPlus, HiX } from "react-icons/hi";

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
	const [currentService, setCurrentService] = useState<Service>({
		name: "",
		price: 0,
		duration: 30,
		description: "",
	});

	const templates = [
		{
			name: "Men's Haircut",
			price: 35,
			duration: 30,
			description: "Classic haircut with wash and style",
		},
		{
			name: "Women's Haircut",
			price: 65,
			duration: 60,
			description: "Cut and style",
		},
		{
			name: "Beard Trim",
			price: 20,
			duration: 15,
			description: "Shape and edge up",
		},
		{
			name: "Personal Training",
			price: 75,
			duration: 60,
			description: "One-on-one training session",
		},
		{
			name: "Yoga Class",
			price: 25,
			duration: 60,
			description: "Group yoga session",
		},
		{
			name: "Massage (60min)",
			price: 90,
			duration: 60,
			description: "Relaxation massage",
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
		setCurrentService(template);
		setShowForm(true);
	};

	const isValidCurrent = currentService.name && currentService.price > 0;

	return (
		<div className="mx-auto w-full max-w-4xl px-4">
			<div className="rounded-[1.75rem] border border-slate-200 bg-white/90 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-sm lg:p-8">
				<div className="mb-8 text-center">
					<h2 className="text-2xl font-semibold tracking-tight text-slate-900">
						Add your services
					</h2>
					<p className="mt-2 text-sm leading-6 text-slate-500">
						What do you offer? Start with at least one to continue.
					</p>
				</div>

				{data.services.length > 0 && (
					<div className="mb-6 space-y-3">
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
				)}

				{!showForm && (
					<div className="mb-6">
						<p className="mb-3 text-sm text-slate-500">
							Or start from a template:
						</p>
						<div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
							{templates.map((template, idx) => (
								<button
									key={idx}
									type="button"
									onClick={() => useTemplate(template)}
									className="cursor-pointer rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-200 hover:bg-emerald-50/60 hover:shadow-md">
									<h4 className="text-sm font-semibold text-slate-900">
										{template.name}
									</h4>
									<p className="mt-1 text-xs text-slate-500">
										${template.price} • {template.duration} min
									</p>
									<p className="mt-2 text-xs leading-5 text-slate-500">
										{template.description}
									</p>
								</button>
							))}
						</div>
					</div>
				)}

				{showForm ? (
					<div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-6 shadow-sm">
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
										? "bg-gradient-to-r cursor-pointer from-emerald-600 to-teal-600 text-white shadow-sm hover:from-emerald-500 hover:to-teal-500"
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
						onClick={onNext}
						disabled={data.services.length === 0}
						className={`rounded-2xl px-6 py-3 text-sm font-semibold transition ${
							data.services.length > 0
								? "bg-gradient-to-r cursor-pointer from-emerald-600 to-teal-600 text-white shadow-sm hover:from-emerald-500 hover:to-teal-500"
								: "cursor-not-allowed bg-slate-100 text-slate-400"
						}`}>
						Continue →
					</button>
				</div>
			</div>
		</div>
	);
}

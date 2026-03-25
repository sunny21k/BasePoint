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
			setCurrentService({ name: "", price: 0, duration: 30, description: "" });
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
		<div className="max-w-3xl mx-auto px-4">
			<div className="text-center mb-8">
				<h2 className="text-2xl font-semibold text-white">Add your services</h2>
				<p className="mt-1 text-sm text-gray-400">
					What do you offer? Start with at least one to continue.
				</p>
			</div>

			{/* List of existing services */}
			{data.services.length > 0 && (
				<div className="mb-6 space-y-3">
					{data.services.map((service, idx) => (
						<div
							key={idx}
							className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4">
							<div className="flex-1">
								<h4 className="text-sm font-semibold text-white">
									{service.name}
								</h4>
								<p className="mt-1 text-xs text-gray-400">
									${service.price} • {service.duration} min
								</p>
								{service.description && (
									<p className="mt-2 text-xs text-gray-500">
										{service.description}
									</p>
								)}
							</div>
							<button
								type="button"
								onClick={() => removeService(idx)}
								className="cursor-pointer text-gray-400 hover:text-red-400 transition">
								<HiX className="h-5 w-5" />
							</button>
						</div>
					))}
				</div>
			)}

			{/* Templates */}
			{!showForm && (
				<div className="mb-6">
					<p className="text-sm text-gray-400 mb-3">
						Or start from a template:
					</p>
					<div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
						{templates.map((template, idx) => (
							<button
								key={idx}
								type="button"
								onClick={() => useTemplate(template)}
								className="cursor-pointer rounded-xl border border-white/10 bg-white/5 p-4 text-left transition hover:border-basepoint-teal hover:bg-white/10">
								<h4 className="text-sm font-semibold text-white">
									{template.name}
								</h4>
								<p className="mt-1 text-xs text-gray-400">
									${template.price} • {template.duration} min
								</p>
								<p className="mt-1 text-xs text-gray-500">
									{template.description}
								</p>
							</button>
						))}
					</div>
				</div>
			)}

			{/* Add service form */}
			{showForm ? (
				<div className="rounded-xl border border-white/10 bg-white/5 p-6 space-y-4">
					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
						{/* Name */}
						<div>
							<label className="block text-sm font-medium text-gray-300 mb-2">
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
								className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-basepoint-teal focus:ring-1 focus:ring-basepoint-teal/30 transition"
							/>
						</div>

						{/* Price */}
						<div>
							<label className="block text-sm font-medium text-gray-300 mb-2">
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
								className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-basepoint-teal focus:ring-1 focus:ring-basepoint-teal/30 transition"
							/>
						</div>
					</div>

					{/* Duration */}
					<div>
						<label className="block text-sm font-medium text-gray-300 mb-2">
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
							className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white focus:outline-none focus:border-basepoint-teal focus:ring-1 focus:ring-basepoint-teal/30 transition">
							<option value={15}>15 minutes</option>
							<option value={30}>30 minutes</option>
							<option value={45}>45 minutes</option>
							<option value={60}>1 hour</option>
							<option value={90}>1.5 hours</option>
							<option value={120}>2 hours</option>
						</select>
					</div>

					{/* Description */}
					<div>
						<label className="block text-sm font-medium text-gray-300 mb-2">
							Description (optional)
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
							rows={2}
							className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-basepoint-teal focus:ring-1 focus:ring-basepoint-teal/30 transition resize-none"
						/>
					</div>

					{/* Actions */}
					<div className="flex gap-3">
						<button
							type="button"
							onClick={addService}
							disabled={!isValidCurrent}
							className={`flex-1 cursor-pointer rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
								isValidCurrent
									? "bg-basepoint-teal text-white hover:bg-teal-500"
									: "bg-white/5 text-gray-500 cursor-not-allowed"
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
							className="cursor-pointer rounded-xl bg-white/5 px-4 py-2.5 text-sm text-white transition hover:bg-white/10">
							Cancel
						</button>
					</div>
				</div>
			) : (
				<button
					type="button"
					onClick={() => setShowForm(true)}
					className="cursor-pointer w-full rounded-xl border-2 border-dashed border-white/10 bg-white/5 p-4 text-center text-sm text-gray-400 transition hover:border-basepoint-teal hover:text-basepoint-teal flex items-center justify-center gap-2">
					<HiPlus className="h-5 w-5" />
					Add custom service
				</button>
			)}

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
					disabled={data.services.length === 0}
					className={`cursor-pointer rounded-xl px-6 py-3 text-sm font-semibold transition ${
						data.services.length > 0
							? "bg-basepoint-teal text-white hover:bg-teal-500"
							: "bg-white/5 text-gray-500 cursor-not-allowed"
					}`}>
					Continue →
				</button>
			</div>
		</div>
	);
}

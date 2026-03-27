import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { useState } from "react";

// From your onboarding
type Service = {
	id: string;
	name: string;
	price: number;
	duration: number;
	description: string;
};

// Mock data (you’ll replace with API later)
const mockServices: Service[] = [
	{
		id: "haircut-men",
		name: "Men's Haircut",
		price: 35,
		duration: 30,
		description: "Classic haircut with wash and style",
	},
	{
		id: "yoga-60",
		name: "Yoga Class",
		price: 25,
		duration: 60,
		description: "Group yoga session",
	},
	{
		id: "massage-60",
		name: "Massage (60min)",
		price: 90,
		duration: 60,
		description: "Relaxation massage",
	},
];

export default function Services() {
	const [services, setServices] = useState<Service[]>(mockServices);
	const [editing, setEditing] = useState<Service | null>(null);

	const handleDelete = (id: string) => {
		setServices(services.filter((s) => s.id !== id));
	};

	const handleSave = () => {
		if (!editing) return;

		setServices(services.map((s) => (s.id === editing.id ? editing : s)));
		setEditing(null);
	};

	const handleCancel = () => {
		setEditing(null);
	};

	return (
		<DashboardLayout>
			<div>
				<h1 className="text-2xl font-semibold text-white">Services</h1>
				<p className="mt-1 text-sm text-gray-400">
					Add, edit, and manage the services you offer.
				</p>
			</div>

			{/* Add new service (basic) */}
			<div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-5">
				<h3 className="mb-4 text-sm font-semibold text-white">
					Add a new service
				</h3>

				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
					<div>
						<label className="block text-xs text-gray-400 mb-1">
							Service name *
						</label>
						<input
							type="text"
							placeholder="Men's Haircut"
							className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-basepoint-teal focus:ring-1 focus:ring-basepoint-teal/30"
							value={editing?.name ?? ""}
							onChange={(e) =>
								setEditing({
									...(editing ?? {
										id: crypto.randomUUID(),
										name: "",
										price: 0,
										duration: 30,
										description: "",
									}),
									name: e.target.value,
								})
							}
						/>
					</div>

					<div>
						<label className="block text-xs text-gray-400 mb-1">
							Price ($)
						</label>
						<input
							type="number"
							placeholder="35"
							className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-basepoint-teal focus:ring-1 focus:ring-basepoint-teal/30"
							value={editing?.price ?? ""}
							onChange={(e) =>
								setEditing({
									...(editing ?? {
										id: crypto.randomUUID(),
										name: "",
										price: 0,
										duration: 30,
										description: "",
									}),
									price: Number(e.target.value),
								})
							}
						/>
					</div>
				</div>

				<div className="mt-4">
					<label className="block text-xs text-gray-400 mb-1">
						Duration (minutes)
					</label>
					<select
						value={editing?.duration ?? 30}
						onChange={(e) =>
							setEditing({
								...(editing ?? {
									id: crypto.randomUUID(),
									name: "",
									price: 0,
									duration: 30,
									description: "",
								}),
								duration: Number(e.target.value),
							})
						}
						className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:outline-none focus:border-basepoint-teal focus:ring-1 focus:ring-basepoint-teal/30">
						<option value={15}>15 minutes</option>
						<option value={30}>30 minutes</option>
						<option value={45}>45 minutes</option>
						<option value={60}>1 hour</option>
						<option value={90}>1.5 hours</option>
						<option value={120}>2 hours</option>
					</select>
				</div>

				<div className="mt-4">
					<label className="block text-xs text-gray-400 mb-1">
						Description (optional)
					</label>
					<textarea
						placeholder="Brief description of the service"
						className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-basepoint-teal focus:ring-1 focus:ring-basepoint-teal/30"
						value={editing?.description ?? ""}
						onChange={(e) =>
							setEditing({
								...(editing ?? {
									id: crypto.randomUUID(),
									name: "",
									price: 0,
									duration: 30,
									description: "",
								}),
								description: e.target.value,
							})
						}
					/>
				</div>

				{/* Action buttons */}
				<div className="mt-4 flex gap-3">
					<button
						type="button"
						className="cursor-pointer rounded-xl border border-basepoint-teal/40 bg-basepoint-teal px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-500 hover:border-basepoint-teal/60 focus:outline-none focus:ring-1 focus:ring-basepoint-teal/40"
						onClick={handleSave}>
						{editing?.id ? "Update Service" : "Add Service"}
					</button>
					<button
						type="button"
						className="cursor-pointer rounded-xl border border-white/20 bg-white/5 px-4 py-2 text-sm text-white transition hover:border-white/30 hover:bg-white/10 focus:outline-none focus:ring-1 focus:ring-white/20"
						onClick={handleCancel}>
						Cancel
					</button>
				</div>
			</div>

			{/* Services list */}
			<div className="mt-6">
				<h3 className="mb-4 text-sm font-semibold text-white">Your services</h3>

				{services.length > 0 ? (
					<div className="space-y-3">
						{services.map((service) => (
							<div
								key={service.id}
								className="rounded-xl border border-white/10 bg-white/5 p-4">
								<div className="flex flex-wrap items-center justify-between gap-3">
									<div className="flex-1 min-w-0">
										<h4 className="text-sm font-medium text-white truncate">
											{service.name}
										</h4>
										<p className="text-xs text-gray-400">
											${service.price} • {service.duration} min
										</p>
										{service.description && (
											<p className="mt-1 text-xs text-gray-500">
												{service.description}
											</p>
										)}
									</div>

									<div className="flex gap-2">
										<button
											type="button"
											className="cursor-pointer rounded-lg border border-basepoint-teal/40 bg-basepoint-teal/10 px-2 py-1 text-xs font-medium text-basepoint-teal transition hover:border-basepoint-teal hover:bg-basepoint-teal/20 focus:outline-none focus:ring-1 focus:ring-basepoint-teal/40"
											onClick={() => setEditing(service)}>
											Edit
										</button>
										<button
											type="button"
											className="cursor-pointer rounded-lg border border-red-400/40 bg-red-400/10 px-2 py-1 text-xs font-medium text-red-400 transition hover:border-red-400 hover:bg-red-400/20 focus:outline-none focus:ring-1 focus:ring-red-400/40"
											onClick={() => handleDelete(service.id)}>
											Delete
										</button>
									</div>
								</div>
							</div>
						))}
					</div>
				) : (
					<p className="text-sm text-gray-400">No services added yet.</p>
				)}
			</div>
		</DashboardLayout>
	);
}

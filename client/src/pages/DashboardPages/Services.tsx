import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { useState, useEffect, use } from "react";
import axios from "axios";
import { API_URL } from "../BusinessPages/BusinessAuthContext";

type Service = {
	id: string;
	name: string;
	price: number;
	duration: number;
	description: string;
};

// const mockServices: Service[] = [
// 	{
// 		id: "haircut-men",
// 		name: "Men's Haircut",
// 		price: 35,
// 		duration: 30,
// 		description: "Classic haircut with wash and style",
// 	},
// 	{
// 		id: "yoga-60",
// 		name: "Yoga Class",
// 		price: 25,
// 		duration: 60,
// 		description: "Group yoga session",
// 	},
// 	{
// 		id: "massage-60",
// 		name: "Massage (60min)",
// 		price: 90,
// 		duration: 60,
// 		description: "Relaxation massage",
// 	},
// ];

export default function Services() {
	const [services, setServices] = useState<Service[]>([]);
	const [editing, setEditing] = useState<Service | null>(null);

	const fetchServices = async () => {
		try {
			const token = localStorage.getItem("token");

			const res = await axios.get(`${API_URL}/api/services`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			const formatted = res.data.services.map((s: any) => ({
				id: s._id,
				name: s.name,
				price: s.price,
				duration: s.duration,
				description: s.description || "",
			}));

			setServices(formatted);
		} catch (err) {
			console.error("Failed to fetch services", err);
		}
	};

	useEffect(() => {
		fetchServices();
	}, []);

	const handleDelete = async (id: string) => {
		try {
			const token = localStorage.getItem("token");

			await axios.delete(`${API_URL}/api/services/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			await fetchServices();
		} catch (err) {
			console.error("Failed to delete service", err);
		}
	};

	const handleSave = async () => {
		if (!editing) return;

		try {
			const token = localStorage.getItem("token");

			// UPDATE
			if (services.some((s) => s.id === editing.id)) {
				const res = await axios.put(
					`${API_URL}/api/services/${editing.id}`,
					editing,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					},
				);

				const updated = res.data.service;

				setServices((prev) =>
					prev.map((s) =>
						s.id === editing.id
							? {
									id: updated._id,
									name: updated.name,
									price: updated.price,
									duration: updated.duration,
									description: updated.description || "",
								}
							: s,
					),
				);
			}
			// CREATE
			else {
				const res = await axios.post(`${API_URL}/api/services`, editing, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});

				const created = res.data.service;

				setServices((prev) => [
					...prev,
					{
						id: created._id,
						name: created.name,
						price: created.price,
						duration: created.duration,
						description: created.description || "",
					},
				]);
			}

			setEditing(null);
		} catch (err) {
			console.error("Save failed", err);
		}
	};

	const handleCancel = () => {
		setEditing(null);
	};

	const startNew = () => {
		setEditing({
			id: crypto.randomUUID(),
			name: "",
			price: 0,
			duration: 30,
			description: "",
		});
	};

	return (
		<DashboardLayout>
			<div className="rounded-[1.75rem] border border-slate-200 bg-white/90 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-sm">
				<div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
					<div>
						<div className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
							Service catalog
						</div>
						<h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
							Services
						</h1>
						<p className="mt-2 text-sm text-slate-500">
							Add, edit, and manage the services you offer.
						</p>
					</div>

					<button
						type="button"
						onClick={startNew}
						className="cursor-pointer rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:from-emerald-500 hover:to-teal-500">
						Add new service
					</button>
				</div>

				{editing && (
					<div className="mt-6 rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-5 shadow-sm">
						<div className="mb-4 flex items-center justify-between">
							<h3 className="text-sm font-semibold text-slate-900">
								{services.some((s) => s.id === editing.id)
									? "Edit service"
									: "New service"}
							</h3>
							<span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
								Service editor
							</span>
						</div>

						<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
							<div>
								<label className="mb-1 block text-xs font-medium text-slate-600">
									Service name *
								</label>
								<input
									type="text"
									placeholder="Men's Haircut"
									className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
									value={editing.name}
									onChange={(e) =>
										setEditing({ ...editing, name: e.target.value })
									}
								/>
							</div>

							<div>
								<label className="mb-1 block text-xs font-medium text-slate-600">
									Price ($)
								</label>
								<input
									type="number"
									placeholder="35"
									className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
									value={editing.price}
									onChange={(e) =>
										setEditing({ ...editing, price: Number(e.target.value) })
									}
								/>
							</div>
						</div>

						<div className="mt-4">
							<label className="mb-1 block text-xs font-medium text-slate-600">
								Duration (minutes)
							</label>
							<select
								value={editing.duration}
								onChange={(e) =>
									setEditing({ ...editing, duration: Number(e.target.value) })
								}
								className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100">
								<option value={15}>15 minutes</option>
								<option value={30}>30 minutes</option>
								<option value={45}>45 minutes</option>
								<option value={60}>1 hour</option>
								<option value={90}>1.5 hours</option>
								<option value={120}>2 hours</option>
							</select>
						</div>

						<div className="mt-4">
							<label className="mb-1 block text-xs font-medium text-slate-600">
								Description <span className="text-slate-400">(optional)</span>
							</label>
							<textarea
								placeholder="Brief description of the service"
								className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
								value={editing.description}
								onChange={(e) =>
									setEditing({ ...editing, description: e.target.value })
								}
								rows={3}
							/>
						</div>

						<div className="mt-5 flex gap-3">
							<button
								type="button"
								className="cursor-pointer rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:from-emerald-500 hover:to-teal-500"
								onClick={handleSave}>
								{services.some((s) => s.id === editing.id)
									? "Update service"
									: "Add service"}
							</button>
							<button
								type="button"
								className="cursor-pointer rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
								onClick={handleCancel}>
								Cancel
							</button>
						</div>
					</div>
				)}

				<div className="mt-6">
					<div className="mb-4 flex items-center justify-between">
						<h3 className="text-sm font-semibold text-slate-900">
							Your services
						</h3>
						<p className="text-xs text-slate-500">{services.length} total</p>
					</div>

					{services.length > 0 ? (
						<div className="space-y-3">
							{services.map((service) => (
								<div
									key={service.id}
									className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md">
									<div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
										<div className="min-w-0 flex-1">
											<h4 className="truncate text-sm font-semibold text-slate-900">
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

										<div className="flex gap-2">
											<button
												type="button"
												className="cursor-pointer rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700 transition hover:bg-emerald-100"
												onClick={() => setEditing(service)}>
												Edit
											</button>
											<button
												type="button"
												className="cursor-pointer rounded-xl border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-medium text-red-700 transition hover:bg-red-100"
												onClick={() => handleDelete(service.id)}>
												Delete
											</button>
										</div>
									</div>
								</div>
							))}
						</div>
					) : (
						<div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-sm text-slate-500">
							No services added yet.
						</div>
					)}
				</div>
			</div>
		</DashboardLayout>
	);
}

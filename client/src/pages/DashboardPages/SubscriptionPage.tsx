import { useState } from "react";
import DashboardLayout from "../../components/dashboard/DashboardLayout";

type SubscriptionPlan = {
	id: string;
	name: string;
	price: number;
	interval: "month" | "year";
	includedCredits: number | null;
	unlimited: boolean;
	description: string;
	active: boolean;
};

const mockPlans: SubscriptionPlan[] = [];

export default function Subscriptions() {
	const [plans, setPlans] = useState<SubscriptionPlan[]>(mockPlans);
	const [editing, setEditing] = useState<SubscriptionPlan | null>(null);

	const handleDelete = (id: string) =>
		setPlans(plans.filter((p) => p.id !== id));

	const handleSave = () => {
		if (!editing) return;
		setPlans(plans.map((p) => (p.id === editing.id ? editing : p)));
		setEditing(null);
	};

	const startNew = () => {
		setEditing({
			id: crypto.randomUUID(),
			name: "",
			price: 0,
			interval: "month",
			includedCredits: 1,
			unlimited: false,
			description: "",
			active: true,
		});
	};

	const isEditingExisting = editing
		? plans.some((p) => p.id === editing.id)
		: false;

	return (
		<DashboardLayout>
			<div className="rounded-[1.75rem] border border-slate-200 bg-white/90 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-sm">
				<div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
					<div>
						<div className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
							Membership plans
						</div>
						<h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
							Subscriptions
						</h1>
						<p className="mt-2 text-sm text-slate-500">
							Create recurring membership plans for your business.
						</p>
					</div>

					<button
						type="button"
						onClick={startNew}
						className="cursor-pointer rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:from-emerald-500 hover:to-teal-500">
						Add plan
					</button>
				</div>

				{editing && (
					<div className="mt-6 rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-5 shadow-sm">
						<div className="mb-4 flex items-center justify-between">
							<h2 className="text-sm font-semibold text-slate-900">
								{isEditingExisting ? "Edit plan" : "New plan"}
							</h2>
							<span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
								Plan editor
							</span>
						</div>

						<div className="grid gap-4 md:grid-cols-2">
							<div>
								<label className="mb-1 block text-xs font-medium text-slate-600">
									Plan name
								</label>
								<input
									value={editing.name}
									onChange={(e) =>
										setEditing({ ...editing, name: e.target.value })
									}
									className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
									placeholder="5 Haircuts Monthly"
								/>
							</div>

							<div>
								<label className="mb-1 block text-xs font-medium text-slate-600">
									Price
								</label>
								<input
									type="number"
									value={editing.price}
									onChange={(e) =>
										setEditing({ ...editing, price: Number(e.target.value) })
									}
									className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
									placeholder="30"
								/>
							</div>

							<div>
								<label className="mb-1 block text-xs font-medium text-slate-600">
									Billing interval
								</label>
								<select
									value={editing.interval}
									onChange={(e) =>
										setEditing({
											...editing,
											interval: e.target.value as "month" | "year",
										})
									}
									className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100">
									<option value="month">Monthly</option>
									<option value="year">Yearly</option>
								</select>
							</div>

							<div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2.5">
								<input
									type="checkbox"
									checked={editing.unlimited}
									onChange={(e) =>
										setEditing({
											...editing,
											unlimited: e.target.checked,
											includedCredits: e.target.checked ? null : 1,
										})
									}
									className="h-4 w-4 cursor-pointer rounded border-slate-300 text-emerald-600 focus:ring-emerald-200"
								/>
								<label className="text-sm text-slate-700">Unlimited plan</label>
							</div>

							<div>
								<label className="mb-1 block text-xs font-medium text-slate-600">
									Included credits
								</label>
								<input
									type="number"
									disabled={editing.unlimited}
									value={editing.includedCredits ?? ""}
									onChange={(e) =>
										setEditing({
											...editing,
											includedCredits: Number(e.target.value),
										})
									}
									className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400"
									placeholder="5"
								/>
							</div>

							<div className="md:col-span-2">
								<label className="mb-1 block text-xs font-medium text-slate-600">
									Description
								</label>
								<textarea
									value={editing.description}
									onChange={(e) =>
										setEditing({ ...editing, description: e.target.value })
									}
									className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
									placeholder="Describe what this plan includes"
									rows={3}
								/>
							</div>

							<div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2.5">
								<input
									type="checkbox"
									checked={editing.active}
									onChange={(e) =>
										setEditing({ ...editing, active: e.target.checked })
									}
									className="h-4 w-4 cursor-pointer rounded border-slate-300 text-emerald-600 focus:ring-emerald-200"
								/>
								<label className="text-sm text-slate-700">Active</label>
							</div>
						</div>

						<div className="mt-5 flex gap-3">
							<button
								type="button"
								onClick={handleSave}
								className="cursor-pointer rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:from-emerald-500 hover:to-teal-500">
								Save plan
							</button>
							<button
								type="button"
								onClick={() => setEditing(null)}
								className="cursor-pointer rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50">
								Cancel
							</button>
						</div>
					</div>
				)}

				{plans.length > 0 ? (
					<div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
						{plans.map((plan) => (
							<div
								key={plan.id}
								className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
								<div className="flex items-start justify-between gap-3">
									<div>
										<h3 className="text-base font-semibold text-slate-900">
											{plan.name}
										</h3>
										<p className="mt-1 text-sm text-slate-500">
											{plan.description}
										</p>
									</div>

									<span
										className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${
											plan.active
												? "border-emerald-200 bg-emerald-50 text-emerald-700"
												: "border-slate-200 bg-slate-50 text-slate-500"
										}`}>
										{plan.active ? "Active" : "Inactive"}
									</span>
								</div>

								<div className="mt-4 space-y-2 text-sm text-slate-600">
									<p>
										<span className="font-medium text-slate-900">Price:</span> $
										{plan.price}/{plan.interval}
									</p>
									<p>
										<span className="font-medium text-slate-900">Type:</span>{" "}
										{plan.unlimited
											? "Unlimited"
											: `${plan.includedCredits} credits included`}
									</p>
								</div>

								<div className="mt-5 flex gap-2">
									<button
										type="button"
										onClick={() => setEditing(plan)}
										className="cursor-pointer rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700 transition hover:bg-emerald-100">
										Edit
									</button>
									<button
										type="button"
										onClick={() => handleDelete(plan.id)}
										className="cursor-pointer rounded-xl border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-medium text-red-700 transition hover:bg-red-100">
										Delete
									</button>
								</div>
							</div>
						))}
					</div>
				) : (
					<div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-500 shadow-sm">
						There are no subscriptions yet. Create your first plan.
					</div>
				)}
			</div>
		</DashboardLayout>
	);
}

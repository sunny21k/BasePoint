import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { useState } from "react";

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

	return (
		<DashboardLayout>
			<div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
				<div>
					<h1 className="text-2xl font-semibold text-white">Subscriptions</h1>
					<p className="mt-1 text-sm text-gray-400">
						Create recurring membership plans for your business.
					</p>
				</div>

				<button
					type="button"
					onClick={startNew}
					className="cursor-pointer rounded-xl border border-basepoint-teal/40 bg-basepoint-teal px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-500 hover:border-basepoint-teal/60 focus:outline-none focus:ring-1 focus:ring-basepoint-teal/40">
					Add plan
				</button>
			</div>

			{editing && (
				<div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-5">
					<h2 className="mb-4 text-sm font-semibold text-white">
						{plans.some((p) => p.id === editing.id) ? "Edit plan" : "New plan"}
					</h2>

					<div className="grid gap-4 md:grid-cols-2">
						<div>
							<label className="mb-1 block text-xs text-gray-400">
								Plan name
							</label>
							<input
								value={editing.name}
								onChange={(e) =>
									setEditing({ ...editing, name: e.target.value })
								}
								className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-basepoint-teal focus:ring-1 focus:ring-basepoint-teal/30"
								placeholder="5 Haircuts Monthly"
							/>
						</div>

						<div>
							<label className="mb-1 block text-xs text-gray-400">Price</label>
							<input
								type="number"
								value={editing.price}
								onChange={(e) =>
									setEditing({ ...editing, price: Number(e.target.value) })
								}
								className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-basepoint-teal focus:ring-1 focus:ring-basepoint-teal/30"
								placeholder="30"
							/>
						</div>

						<div>
							<label className="mb-1 block text-xs text-gray-400">
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
								className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-basepoint-teal focus:ring-1 focus:ring-basepoint-teal/30">
								<option value="month">Monthly</option>
								<option value="year">Yearly</option>
							</select>
						</div>

						<div className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-3 py-2">
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
								className="h-4 w-4 cursor-pointer rounded border-white/20 bg-white/10 accent-basepoint-teal"
							/>
							<label className="text-sm text-gray-300">Unlimited plan</label>
						</div>

						<div>
							<label className="mb-1 block text-xs text-gray-400">
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
								className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none disabled:cursor-not-allowed disabled:opacity-50 focus:border-basepoint-teal focus:ring-1 focus:ring-basepoint-teal/30"
								placeholder="5"
							/>
						</div>

						<div className="md:col-span-2">
							<label className="mb-1 block text-xs text-gray-400">
								Description
							</label>
							<textarea
								value={editing.description}
								onChange={(e) =>
									setEditing({ ...editing, description: e.target.value })
								}
								className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-basepoint-teal focus:ring-1 focus:ring-basepoint-teal/30"
								placeholder="Describe what this plan includes"
								rows={3}
							/>
						</div>

						<div className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-3 py-2">
							<input
								type="checkbox"
								checked={editing.active}
								onChange={(e) =>
									setEditing({ ...editing, active: e.target.checked })
								}
								className="h-4 w-4 cursor-pointer rounded border-white/20 bg-white/10 accent-basepoint-teal"
							/>
							<label className="text-sm text-gray-300">Active</label>
						</div>
					</div>

					<div className="mt-5 flex gap-3">
						<button
							type="button"
							onClick={handleSave}
							className="cursor-pointer rounded-xl border border-basepoint-teal/40 bg-basepoint-teal px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-500 hover:border-basepoint-teal/60 focus:outline-none focus:ring-1 focus:ring-basepoint-teal/40">
							Save plan
						</button>
						<button
							type="button"
							onClick={() => setEditing(null)}
							className="cursor-pointer rounded-xl border border-white/20 bg-white/5 px-4 py-2 text-sm text-white transition hover:border-white/30 hover:bg-white/10 focus:outline-none focus:ring-1 focus:ring-white/20">
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
							className="rounded-xl border border-white/10 bg-white/5 p-5">
							<div className="flex items-start justify-between gap-3">
								<div>
									<h3 className="text-base font-semibold text-white">
										{plan.name}
									</h3>
									<p className="mt-1 text-sm text-gray-400">
										{plan.description}
									</p>
								</div>
								<span
									className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${
										plan.active
											? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300"
											: "border-white/15 bg-white/5 text-gray-300"
									}`}>
									{plan.active ? "Active" : "Inactive"}
								</span>
							</div>

							<div className="mt-4 space-y-2 text-sm text-gray-300">
								<p>
									<span className="text-white">Price:</span> ${plan.price}/
									{plan.interval}
								</p>
								<p>
									<span className="text-white">Type:</span>{" "}
									{plan.unlimited
										? "Unlimited"
										: `${plan.includedCredits} credits included`}
								</p>
							</div>

							<div className="mt-5 flex gap-2">
								<button
									type="button"
									onClick={() => setEditing(plan)}
									className="cursor-pointer rounded-lg border border-basepoint-teal/40 bg-basepoint-teal/10 px-3 py-1.5 text-xs font-medium text-basepoint-teal transition hover:border-basepoint-teal hover:bg-basepoint-teal/20 focus:outline-none focus:ring-1 focus:ring-basepoint-teal/40">
									Edit
								</button>
								<button
									type="button"
									onClick={() => handleDelete(plan.id)}
									className="cursor-pointer rounded-lg border border-red-400/40 bg-red-400/10 px-3 py-1.5 text-xs font-medium text-red-400 transition hover:border-red-400 hover:bg-red-400/20 focus:outline-none focus:ring-1 focus:ring-red-400/40">
									Delete
								</button>
							</div>
						</div>
					))}
				</div>
			) : (
				<div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-6 text-sm text-gray-400">
					There are no subscriptions yet. Create your first plan.
				</div>
			)}
		</DashboardLayout>
	);
}

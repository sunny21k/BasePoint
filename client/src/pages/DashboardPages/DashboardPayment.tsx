import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { useState } from "react";

type PaymentSettings = {
	stripeConnected: boolean;
	payoutMethod: string;
	payoutSchedule: "daily" | "weekly" | "monthly";
	cardPaymentsEnabled: boolean;
	applePayEnabled: boolean;
	googlePayEnabled: boolean;
};

const initialPaymentSettings: PaymentSettings = {
	stripeConnected: false,
	payoutMethod: "Add bank account",
	payoutSchedule: "weekly",
	cardPaymentsEnabled: true,
	applePayEnabled: true,
	googlePayEnabled: true,
};

export default function Payments() {
	const [paymentSettings, setPaymentSettings] = useState(
		initialPaymentSettings,
	);

	const handleSave = () => {
		console.log(paymentSettings);
	};

	return (
		<DashboardLayout>
			<div className="rounded-[1.75rem] border border-slate-200 bg-white/90 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-sm">
				<div>
					<div className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
						Payments
					</div>
					<h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
						Payments
					</h1>
					<p className="mt-2 text-sm text-slate-500">
						Manage how you accept payments and receive payouts.
					</p>
				</div>

				<div className="mt-6 space-y-6">
					<section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
						<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
							<div>
								<h2 className="text-sm font-semibold text-slate-900">
									Stripe connection
								</h2>
								<p className="mt-1 text-sm text-slate-500">
									Connect Stripe to accept card payments and manage payouts.
								</p>
							</div>

							<span
								className={`inline-flex w-fit rounded-full border px-2.5 py-1 text-xs font-medium ${
									paymentSettings.stripeConnected
										? "border-emerald-200 bg-emerald-50 text-emerald-700"
										: "border-amber-200 bg-amber-50 text-amber-700"
								}`}>
								{paymentSettings.stripeConnected
									? "Connected"
									: "Not connected"}
							</span>
						</div>

						<div className="mt-4 flex flex-wrap gap-3">
							<button
								type="button"
								className="cursor-pointer rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:from-emerald-500 hover:to-teal-500">
								Connect Stripe
							</button>
							<button
								type="button"
								className="cursor-pointer rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50">
								Manage Stripe
							</button>
						</div>
					</section>

					<section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
						<h2 className="mb-4 text-sm font-semibold text-slate-900">
							Payout settings
						</h2>
						<div className="grid gap-4 md:grid-cols-2">
							<div>
								<label className="mb-1 block text-xs font-medium text-slate-600">
									Payout method
								</label>
								<input
									value={paymentSettings.payoutMethod}
									onChange={(e) =>
										setPaymentSettings({
											...paymentSettings,
											payoutMethod: e.target.value,
										})
									}
									className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
									placeholder="Add bank account"
								/>
							</div>

							<div>
								<label className="mb-1 block text-xs font-medium text-slate-600">
									Payout schedule
								</label>
								<select
									value={paymentSettings.payoutSchedule}
									onChange={(e) =>
										setPaymentSettings({
											...paymentSettings,
											payoutSchedule: e.target.value as
												| "daily"
												| "weekly"
												| "monthly",
										})
									}
									className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100">
									<option value="daily">Daily</option>
									<option value="weekly">Weekly</option>
									<option value="monthly">Monthly</option>
								</select>
							</div>
						</div>
					</section>

					<section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
						<h2 className="mb-4 text-sm font-semibold text-slate-900">
							Accepted payment methods
						</h2>

						<div className="space-y-3">
							{[
								["Card payments", "cardPaymentsEnabled"],
								["Apple Pay", "applePayEnabled"],
								["Google Pay", "googlePayEnabled"],
							].map(([label, key]) => (
								<label
									key={label}
									className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
									<span className="text-sm text-slate-700">{label}</span>
									<input
										type="checkbox"
										checked={
											paymentSettings[key as keyof PaymentSettings] as boolean
										}
										onChange={(e) =>
											setPaymentSettings({
												...paymentSettings,
												[key]: e.target.checked,
											} as PaymentSettings)
										}
										className="h-4 w-4 cursor-pointer rounded border-slate-300 text-emerald-600 focus:ring-emerald-200"
									/>
								</label>
							))}
						</div>
					</section>
				</div>

				<div className="mt-6 flex justify-end">
					<button
						type="button"
						onClick={handleSave}
						className="cursor-pointer rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:from-emerald-500 hover:to-teal-500">
						Save payment settings
					</button>
				</div>
			</div>
		</DashboardLayout>
	);
}

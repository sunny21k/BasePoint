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
			<div>
				<h1 className="text-2xl font-semibold text-white">Payments</h1>
				<p className="mt-1 text-sm text-gray-400">
					Manage how you accept payments and receive payouts.
				</p>
			</div>

			<div className="mt-6 space-y-6">
				<section className="rounded-xl border border-white/10 bg-white/5 p-5">
					<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
						<div>
							<h2 className="text-sm font-semibold text-white">
								Stripe connection
							</h2>
							<p className="mt-1 text-sm text-gray-400">
								Connect Stripe to accept card payments and manage payouts.
							</p>
						</div>

						<span
							className={`inline-flex w-fit rounded-full border px-2.5 py-1 text-xs font-medium ${
								paymentSettings.stripeConnected
									? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300"
									: "border-amber-400/30 bg-amber-400/10 text-amber-300"
							}`}>
							{paymentSettings.stripeConnected ? "Connected" : "Not connected"}
						</span>
					</div>

					<div className="mt-4 flex flex-wrap gap-3">
						<button
							type="button"
							className="cursor-pointer rounded-xl border border-basepoint-teal/40 bg-basepoint-teal px-4 py-2 text-sm font-semibold text-white transition hover:border-basepoint-teal/60 hover:bg-teal-500 focus:outline-none focus:ring-1 focus:ring-basepoint-teal/40">
							Connect Stripe
						</button>
						<button
							type="button"
							className="cursor-pointer rounded-xl border border-white/20 bg-white/5 px-4 py-2 text-sm text-white transition hover:border-white/30 hover:bg-white/10 focus:outline-none focus:ring-1 focus:ring-white/20">
							Manage Stripe
						</button>
					</div>
				</section>

				<section className="rounded-xl border border-white/10 bg-white/5 p-5">
					<h2 className="mb-4 text-sm font-semibold text-white">
						Payout settings
					</h2>
					<div className="grid gap-4 md:grid-cols-2">
						<div>
							<label className="mb-1 block text-xs text-gray-400">
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
								className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none transition focus:border-basepoint-teal focus:ring-1 focus:ring-basepoint-teal/30"
								placeholder="Add bank account"
							/>
						</div>

						<div>
							<label className="mb-1 block text-xs text-gray-400">
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
								className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none transition focus:border-basepoint-teal focus:ring-1 focus:ring-basepoint-teal/30">
								<option value="daily">Daily</option>
								<option value="weekly">Weekly</option>
								<option value="monthly">Monthly</option>
							</select>
						</div>
					</div>
				</section>

				<section className="rounded-xl border border-white/10 bg-white/5 p-5">
					<h2 className="mb-4 text-sm font-semibold text-white">
						Accepted payment methods
					</h2>
					<div className="space-y-3">
						<label className="flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-white/5 px-3 py-3">
							<span className="text-sm text-gray-300">Card payments</span>
							<input
								type="checkbox"
								checked={paymentSettings.cardPaymentsEnabled}
								onChange={(e) =>
									setPaymentSettings({
										...paymentSettings,
										cardPaymentsEnabled: e.target.checked,
									})
								}
								className="h-4 w-4 cursor-pointer rounded border-white/20 bg-white/10 accent-basepoint-teal"
							/>
						</label>

						<label className="flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-white/5 px-3 py-3">
							<span className="text-sm text-gray-300">Apple Pay</span>
							<input
								type="checkbox"
								checked={paymentSettings.applePayEnabled}
								onChange={(e) =>
									setPaymentSettings({
										...paymentSettings,
										applePayEnabled: e.target.checked,
									})
								}
								className="h-4 w-4 cursor-pointer rounded border-white/20 bg-white/10 accent-basepoint-teal"
							/>
						</label>

						<label className="flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-white/5 px-3 py-3">
							<span className="text-sm text-gray-300">Google Pay</span>
							<input
								type="checkbox"
								checked={paymentSettings.googlePayEnabled}
								onChange={(e) =>
									setPaymentSettings({
										...paymentSettings,
										googlePayEnabled: e.target.checked,
									})
								}
								className="h-4 w-4 cursor-pointer rounded border-white/20 bg-white/10 accent-basepoint-teal"
							/>
						</label>
					</div>
				</section>
			</div>

			<div className="mt-6 flex justify-end">
				<button
					type="button"
					onClick={handleSave}
					className="cursor-pointer rounded-xl border border-basepoint-teal/40 bg-basepoint-teal px-5 py-2 text-sm font-semibold text-white transition hover:border-basepoint-teal/60 hover:bg-teal-500 focus:outline-none focus:ring-1 focus:ring-basepoint-teal/40">
					Save payment settings
				</button>
			</div>
		</DashboardLayout>
	);
}

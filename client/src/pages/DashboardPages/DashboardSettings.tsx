import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { useState } from "react";

type BusinessHours = {
	day: string;
	isOpen: boolean;
	open: string;
	close: string;
};

type BusinessSettings = {
	businessName: string;
	phone: string;
	email: string;
	address: string;
	timezone: string;
};

type BookingRules = {
	minNoticeHours: number;
	cancellationWindowHours: number;
	depositRequired: boolean;
	maxBookingsPerDay: number;
	allowSubscriptionBookings: boolean;
};

const initialSettings: BusinessSettings = {
	businessName: "Basepoint Studio",
	phone: "(555) 123-4567",
	email: "hello@basepoint.com",
	address: "123 Main St, New York, NY",
	timezone: "America/New_York",
};

const initialHours: BusinessHours[] = [
	{ day: "Monday", isOpen: true, open: "09:00", close: "17:00" },
	{ day: "Tuesday", isOpen: true, open: "09:00", close: "17:00" },
	{ day: "Wednesday", isOpen: true, open: "09:00", close: "17:00" },
	{ day: "Thursday", isOpen: true, open: "09:00", close: "17:00" },
	{ day: "Friday", isOpen: true, open: "09:00", close: "17:00" },
	{ day: "Saturday", isOpen: true, open: "10:00", close: "16:00" },
	{ day: "Sunday", isOpen: false, open: "10:00", close: "16:00" },
];

const initialRules: BookingRules = {
	minNoticeHours: 2,
	cancellationWindowHours: 24,
	depositRequired: false,
	maxBookingsPerDay: 20,
	allowSubscriptionBookings: true,
};

export default function Settings() {
	const [settings, setSettings] = useState(initialSettings);
	const [hours, setHours] = useState(initialHours);
	const [rules, setRules] = useState(initialRules);

	const updateHour = (
		index: number,
		field: keyof BusinessHours,
		value: string | boolean,
	) => {
		const next = [...hours];
		next[index] = { ...next[index], [field]: value } as BusinessHours;
		setHours(next);
	};

	const handleSave = () => {
		console.log({ settings, hours, rules });
	};

	return (
		<DashboardLayout>
			<div>
				<h1 className="text-2xl font-semibold text-white">Settings</h1>
				<p className="mt-1 text-sm text-gray-400">
					Manage your business info, availability, and booking rules.
				</p>
			</div>

			<div className="mt-6 space-y-6">
				<section className="rounded-xl border border-white/10 bg-white/5 p-5">
					<h2 className="mb-4 text-sm font-semibold text-white">
						Business profile
					</h2>

					<div className="grid gap-4 md:grid-cols-2">
						<div>
							<label className="mb-1 block text-xs text-gray-400">
								Business name
							</label>
							<input
								className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none transition focus:border-basepoint-teal focus:ring-1 focus:ring-basepoint-teal/30"
								value={settings.businessName}
								onChange={(e) =>
									setSettings({ ...settings, businessName: e.target.value })
								}
							/>
						</div>

						<div>
							<label className="mb-1 block text-xs text-gray-400">
								Timezone
							</label>
							<select
								className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none transition focus:border-basepoint-teal focus:ring-1 focus:ring-basepoint-teal/30"
								value={settings.timezone}
								onChange={(e) =>
									setSettings({ ...settings, timezone: e.target.value })
								}>
								<option value="America/New_York">America/New_York</option>
								<option value="America/Chicago">America/Chicago</option>
								<option value="America/Denver">America/Denver</option>
								<option value="America/Los_Angeles">America/Los_Angeles</option>
							</select>
						</div>

						<div>
							<label className="mb-1 block text-xs text-gray-400">Phone</label>
							<input
								className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none transition focus:border-basepoint-teal focus:ring-1 focus:ring-basepoint-teal/30"
								value={settings.phone}
								onChange={(e) =>
									setSettings({ ...settings, phone: e.target.value })
								}
							/>
						</div>

						<div>
							<label className="mb-1 block text-xs text-gray-400">Email</label>
							<input
								className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none transition focus:border-basepoint-teal focus:ring-1 focus:ring-basepoint-teal/30"
								value={settings.email}
								onChange={(e) =>
									setSettings({ ...settings, email: e.target.value })
								}
							/>
						</div>

						<div className="md:col-span-2">
							<label className="mb-1 block text-xs text-gray-400">
								Address
							</label>
							<input
								className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none transition focus:border-basepoint-teal focus:ring-1 focus:ring-basepoint-teal/30"
								value={settings.address}
								onChange={(e) =>
									setSettings({ ...settings, address: e.target.value })
								}
							/>
						</div>
					</div>
				</section>

				<section className="rounded-xl border border-white/10 bg-white/5 p-5">
					<h2 className="mb-4 text-sm font-semibold text-white">
						Business hours
					</h2>

					<div className="space-y-3">
						{hours.map((item, index) => (
							<div
								key={item.day}
								className="grid grid-cols-1 gap-3 rounded-lg border border-white/10 bg-white/5 p-3 sm:grid-cols-[140px_120px_1fr_1fr] sm:items-center">
								<div className="flex items-center">
									<span className="text-sm text-white">{item.day}</span>
								</div>

								<label className="flex items-center gap-2 text-sm text-gray-300">
									<input
										type="checkbox"
										checked={item.isOpen}
										onChange={(e) =>
											updateHour(index, "isOpen", e.target.checked)
										}
										className="h-4 w-4 cursor-pointer rounded border-white/20 bg-white/10 accent-basepoint-teal"
									/>
									Open
								</label>

								<input
									type="time"
									disabled={!item.isOpen}
									value={item.open}
									onChange={(e) => updateHour(index, "open", e.target.value)}
									className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none transition disabled:cursor-not-allowed disabled:opacity-50 focus:border-basepoint-teal focus:ring-1 focus:ring-basepoint-teal/30"
								/>

								<input
									type="time"
									disabled={!item.isOpen}
									value={item.close}
									onChange={(e) => updateHour(index, "close", e.target.value)}
									className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none transition disabled:cursor-not-allowed disabled:opacity-50 focus:border-basepoint-teal focus:ring-1 focus:ring-basepoint-teal/30"
								/>
							</div>
						))}
					</div>
				</section>

				<section className="rounded-xl border border-white/10 bg-white/5 p-5">
					<h2 className="mb-4 text-sm font-semibold text-white">
						Booking rules
					</h2>

					<div className="grid gap-4 md:grid-cols-2">
						<div>
							<label className="mb-1 block text-xs text-gray-400">
								Minimum notice (hours)
							</label>
							<input
								type="number"
								min={0}
								value={rules.minNoticeHours}
								onChange={(e) =>
									setRules({ ...rules, minNoticeHours: Number(e.target.value) })
								}
								className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none transition focus:border-basepoint-teal focus:ring-1 focus:ring-basepoint-teal/30"
							/>
						</div>

						<div>
							<label className="mb-1 block text-xs text-gray-400">
								Cancellation window (hours)
							</label>
							<input
								type="number"
								min={0}
								value={rules.cancellationWindowHours}
								onChange={(e) =>
									setRules({
										...rules,
										cancellationWindowHours: Number(e.target.value),
									})
								}
								className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none transition focus:border-basepoint-teal focus:ring-1 focus:ring-basepoint-teal/30"
							/>
						</div>

						<div>
							<label className="mb-1 block text-xs text-gray-400">
								Max bookings per day
							</label>
							<input
								type="number"
								min={1}
								value={rules.maxBookingsPerDay}
								onChange={(e) =>
									setRules({
										...rules,
										maxBookingsPerDay: Number(e.target.value),
									})
								}
								className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none transition focus:border-basepoint-teal focus:ring-1 focus:ring-basepoint-teal/30"
							/>
						</div>

						<div className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-3 py-2">
							<input
								type="checkbox"
								checked={rules.depositRequired}
								onChange={(e) =>
									setRules({ ...rules, depositRequired: e.target.checked })
								}
								className="h-4 w-4 cursor-pointer rounded border-white/20 bg-white/10 accent-basepoint-teal"
							/>
							<label className="text-sm text-gray-300">Deposit required</label>
						</div>

						<div className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-3 py-2 md:col-span-2">
							<input
								type="checkbox"
								checked={rules.allowSubscriptionBookings}
								onChange={(e) =>
									setRules({
										...rules,
										allowSubscriptionBookings: e.target.checked,
									})
								}
								className="h-4 w-4 cursor-pointer rounded border-white/20 bg-white/10 accent-basepoint-teal"
							/>
							<label className="text-sm text-gray-300">
								Allow subscriptions to book services
							</label>
						</div>
					</div>
				</section>
			</div>

			<div className="mt-6 flex justify-end">
				<button
					type="button"
					onClick={handleSave}
					className="cursor-pointer rounded-xl border border-basepoint-teal/40 bg-basepoint-teal px-5 py-2 text-sm font-semibold text-white transition hover:border-basepoint-teal/60 hover:bg-teal-500 focus:outline-none focus:ring-1 focus:ring-basepoint-teal/40">
					Save settings
				</button>
			</div>
		</DashboardLayout>
	);
}

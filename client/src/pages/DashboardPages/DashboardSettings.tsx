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
	brandColor: string;
	bookingWindow: number;
	bufferTime: number;
};

const initialSettings: BusinessSettings = {
	businessName: "Basepoint Studio",
	phone: "(555) 123-4567",
	email: "hello@basepoint.com",
	address: "123 Main St, New York, NY",
	timezone: "America/New_York",
	brandColor: "#14b8a6",
	bookingWindow: 14,
	bufferTime: 10,
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

const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function Settings() {
	const [settings, setSettings] = useState(initialSettings);
	const [hours, setHours] = useState(initialHours);

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
		console.log({ settings, hours });
	};

	return (
		<DashboardLayout>
			<div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="mb-8 rounded-[2rem] border border-white/60 bg-white/80 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl">
					<div className="inline-flex rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700">
						Workspace settings
					</div>
					<div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
						<div>
							<h1 className="text-3xl font-semibold tracking-tight text-slate-900">
								Settings
							</h1>
							<p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
								Configure your business profile, brand, and availability in one
								place.
							</p>
						</div>

						<div className="grid grid-cols-3 gap-3 text-center">
							<div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
								<p className="text-[11px] uppercase tracking-wide text-slate-500">
									Hours
								</p>
								<p className="mt-1 text-lg font-semibold text-slate-900">
									{hours.filter((h) => h.isOpen).length}/7
								</p>
							</div>
							<div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
								<p className="text-[11px] uppercase tracking-wide text-slate-500">
									Window
								</p>
								<p className="mt-1 text-lg font-semibold text-slate-900">
									{settings.bookingWindow}d
								</p>
							</div>
							<div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
								<p className="text-[11px] uppercase tracking-wide text-slate-500">
									Buffer
								</p>
								<p className="mt-1 text-lg font-semibold text-slate-900">
									{settings.bufferTime}m
								</p>
							</div>
						</div>
					</div>
				</div>

				<div className="grid gap-6 xl:grid-cols-12">
					<section className="xl:col-span-5 rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm">
						<div className="mb-5 flex items-center justify-between">
							<h2 className="text-sm font-semibold text-slate-900">
								Business profile
							</h2>
							<span
								className="h-3 w-3 rounded-full"
								style={{ backgroundColor: settings.brandColor }}
							/>
						</div>

						<div className="space-y-4">
							<div>
								<label className="mb-1 block text-xs font-medium text-slate-600">
									Business name
								</label>
								<input
									className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-teal-400 focus:ring-2 focus:ring-teal-100"
									value={settings.businessName}
									onChange={(e) =>
										setSettings({ ...settings, businessName: e.target.value })
									}
								/>
							</div>

							<div className="grid gap-4 sm:grid-cols-2">
								<div>
									<label className="mb-1 block text-xs font-medium text-slate-600">
										Phone
									</label>
									<input
										className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-teal-400 focus:ring-2 focus:ring-teal-100"
										value={settings.phone}
										onChange={(e) =>
											setSettings({ ...settings, phone: e.target.value })
										}
									/>
								</div>

								<div>
									<label className="mb-1 block text-xs font-medium text-slate-600">
										Email
									</label>
									<input
										className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-teal-400 focus:ring-2 focus:ring-teal-100"
										value={settings.email}
										onChange={(e) =>
											setSettings({ ...settings, email: e.target.value })
										}
									/>
								</div>
							</div>

							<div>
								<label className="mb-1 block text-xs font-medium text-slate-600">
									Address
								</label>
								<input
									className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-teal-400 focus:ring-2 focus:ring-teal-100"
									value={settings.address}
									onChange={(e) =>
										setSettings({ ...settings, address: e.target.value })
									}
								/>
							</div>

							<div className="grid gap-4 sm:grid-cols-2">
								<div>
									<label className="mb-1 block text-xs font-medium text-slate-600">
										Timezone
									</label>
									<select
										className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-teal-400 focus:ring-2 focus:ring-teal-100"
										value={settings.timezone}
										onChange={(e) =>
											setSettings({ ...settings, timezone: e.target.value })
										}>
										<option value="America/New_York">America/New_York</option>
										<option value="America/Chicago">America/Chicago</option>
										<option value="America/Denver">America/Denver</option>
										<option value="America/Los_Angeles">
											America/Los_Angeles
										</option>
									</select>
								</div>

								<div>
									<label className="mb-1 block text-xs font-medium text-slate-600">
										Brand color
									</label>
									<input
										type="color"
										value={settings.brandColor}
										onChange={(e) =>
											setSettings({ ...settings, brandColor: e.target.value })
										}
										className="h-[46px] w-full cursor-pointer rounded-2xl border border-slate-300 bg-white px-2 py-1 shadow-sm"
									/>
								</div>
							</div>

							<div className="grid gap-4 sm:grid-cols-2">
								<div>
									<label className="mb-1 block text-xs font-medium text-slate-600">
										Booking window (days)
									</label>
									<input
										type="number"
										min={1}
										className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-teal-400 focus:ring-2 focus:ring-teal-100"
										value={settings.bookingWindow}
										onChange={(e) =>
											setSettings({
												...settings,
												bookingWindow: Number(e.target.value),
											})
										}
									/>
								</div>

								<div>
									<label className="mb-1 block text-xs font-medium text-slate-600">
										Buffer time (minutes)
									</label>
									<input
										type="number"
										min={0}
										className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-teal-400 focus:ring-2 focus:ring-teal-100"
										value={settings.bufferTime}
										onChange={(e) =>
											setSettings({
												...settings,
												bufferTime: Number(e.target.value),
											})
										}
									/>
								</div>
							</div>
						</div>
					</section>

					<section className="xl:col-span-7 rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm">
						<div className="mb-5 flex items-center justify-between">
							<h2 className="text-sm font-semibold text-slate-900">
								Business hours
							</h2>
							<span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
								Weekly schedule
							</span>
						</div>

						<div className="space-y-3">
							{hours.map((item, index) => (
								<div
									key={item.day}
									className="grid gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 lg:grid-cols-[90px_100px_1fr_1fr]">
									<div className="flex items-center">
										<div>
											<p className="text-sm font-semibold text-slate-900">
												{item.day}
											</p>
											<p className="text-xs text-slate-500">
												{weekdays[index]}
											</p>
										</div>
									</div>

									<label className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700">
										<input
											type="checkbox"
											checked={item.isOpen}
											onChange={(e) =>
												updateHour(index, "isOpen", e.target.checked)
											}
											className="h-4 w-4 cursor-pointer rounded border-slate-300 text-teal-600 focus:ring-teal-200"
										/>
										Open
									</label>

									<input
										type="time"
										disabled={!item.isOpen}
										value={item.open}
										onChange={(e) => updateHour(index, "open", e.target.value)}
										className="rounded-2xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400 focus:border-teal-400 focus:ring-2 focus:ring-teal-100"
									/>

									<input
										type="time"
										disabled={!item.isOpen}
										value={item.close}
										onChange={(e) => updateHour(index, "close", e.target.value)}
										className="rounded-2xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400 focus:border-teal-400 focus:ring-2 focus:ring-teal-100"
									/>
								</div>
							))}
						</div>
					</section>
				</div>

				<div className="mt-6 flex justify-end">
					<button
						type="button"
						onClick={handleSave}
						className="cursor-pointer rounded-2xl bg-gradient-to-r from-teal-600 to-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:from-teal-500 hover:to-emerald-500">
						Save settings
					</button>
				</div>
			</div>
		</DashboardLayout>
	);
}

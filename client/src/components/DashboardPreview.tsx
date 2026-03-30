import { useState } from "react";

export default function DashboardPreview() {
	const [activeView, setActiveView] = useState<"customer" | "business">(
		"customer",
	);

	return (
		<div className="hidden sm:block rounded-[2rem] border border-slate-200/70 bg-white/80 p-6 backdrop-blur-xl shadow-[0_25px_80px_rgba(15,23,42,0.12)]">
			{/* Top Bar */}
			<div className="mb-6 flex items-center justify-between text-xs">
				<span className="rounded-full bg-gradient-to-r from-sky-500/10 to-blue-500/10 px-3 py-1 font-medium text-sky-700">
					Sample dashboard
				</span>
				<span className="text-slate-400">Live preview</span>
			</div>

			{/* Toggle */}
			<div className="mb-6 inline-flex rounded-full bg-slate-100/80 p-1 text-xs backdrop-blur">
				<button
					type="button"
					onClick={() => setActiveView("customer")}
					className={`rounded-full px-4 py-1.5 font-medium transition ${
						activeView === "customer"
							? "bg-white text-slate-900 shadow"
							: "text-slate-500 hover:text-slate-900"
					}`}>
					Customer
				</button>
				<button
					type="button"
					onClick={() => setActiveView("business")}
					className={`rounded-full px-4 py-1.5 font-medium transition ${
						activeView === "business"
							? "bg-white text-slate-900 shadow"
							: "text-slate-500 hover:text-slate-900"
					}`}>
					Business
				</button>
			</div>

			{/* CUSTOMER VIEW */}
			{activeView === "customer" && (
				<div>
					<div className="mb-5 flex items-center justify-between">
						<div>
							<p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
								Upcoming
							</p>
							<p className="mt-1 text-sm text-slate-600">
								Your next confirmed bookings
							</p>
						</div>
						<span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
							Reminders on
						</span>
					</div>

					<div className="space-y-3">
						{[
							{
								time: "9:00 AM",
								title: "Fade & beard trim",
								name: "Andre Brooks",
								status: "Paid",
								amount: "$55",
							},
							{
								time: "12:30 PM",
								title: "PT session",
								name: "Jenna Smith",
								status: "Paid",
								amount: "$80",
							},
							{
								time: "4:00 PM",
								title: "Hydrating facial",
								name: "Lola Martinez",
								status: "Paid",
								amount: "$95",
							},
						].map((item, index) => (
							<div
								key={index}
								className="group flex items-center justify-between rounded-2xl border border-slate-200/70 bg-white px-4 py-4 shadow-sm transition hover:shadow-md">
								<div className="flex items-center gap-3">
									<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-sky-100 to-blue-100 text-xs font-semibold text-sky-700">
										{item.name
											.split(" ")
											.map((n) => n[0])
											.join("")
											.slice(0, 2)
											.toUpperCase()}
									</div>

									<div>
										<p className="text-sm font-semibold text-slate-900">
											{item.time} · {item.title}
										</p>
										<p className="text-xs text-slate-500">
											{item.name} ·{" "}
											<span className="text-emerald-600">{item.status}</span>
										</p>
									</div>
								</div>

								<span className="text-sm font-semibold text-slate-900">
									{item.amount}
								</span>
							</div>
						))}
					</div>
				</div>
			)}

			{/* BUSINESS VIEW */}
			{activeView === "business" && (
				<div>
					<div className="mb-5 flex items-center justify-between">
						<div>
							<p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
								Overview
							</p>
							<p className="mt-1 text-sm text-slate-600">
								Key metrics at a glance
							</p>
						</div>
						<span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-medium text-sky-700">
							Live data
						</span>
					</div>

					<div className="grid gap-3 sm:grid-cols-2">
						<div className="rounded-2xl border border-slate-200/70 bg-gradient-to-br from-white to-slate-50 p-4 shadow-sm">
							<p className="text-xs text-slate-500">Weekly revenue</p>
							<p className="mt-2 text-2xl font-semibold text-slate-900">
								$3,270
							</p>
							<p className="mt-1 text-sm text-emerald-600">+18% growth</p>
						</div>

						<div className="rounded-2xl border border-slate-200/70 bg-gradient-to-br from-white to-slate-50 p-4 shadow-sm">
							<p className="text-xs text-slate-500">New clients</p>
							<p className="mt-2 text-2xl font-semibold text-slate-900">28</p>
							<p className="mt-1 text-sm text-slate-500">
								Top source: Instagram
							</p>
						</div>
					</div>

					<div className="mt-3 space-y-3">
						<div className="rounded-2xl border border-slate-200/70 bg-white p-4 shadow-sm">
							<div className="flex items-center justify-between">
								<span className="text-sm font-medium text-slate-900">
									Today’s bookings
								</span>
								<span className="text-sm text-emerald-600">6</span>
							</div>
							<p className="mt-2 text-sm text-slate-500">
								Peak hours: 3 PM – 6 PM
							</p>
						</div>

						<div className="rounded-2xl border border-slate-200/70 bg-white p-4 shadow-sm">
							<div className="flex items-center justify-between">
								<span className="text-sm font-medium text-slate-900">
									Top service
								</span>
								<span className="text-sm text-sky-600">42%</span>
							</div>
							<p className="mt-2 text-sm text-slate-500">Fade & beard trim</p>
						</div>
					</div>
				</div>
			)}

			{/* Footer */}
			<p className="mt-6 text-xs text-slate-400">
				Sample data — real dashboards update instantly as bookings come in.
			</p>
		</div>
	);
}

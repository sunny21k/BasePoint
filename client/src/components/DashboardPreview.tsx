import { useState } from "react";

export default function DashboardPreview() {
	const [activeView, setActiveView] = useState<"customer" | "business">(
		"customer",
	);

	return (
		<div className="hidden rounded-2xl border border-white/10 bg-[#05080f]/90 p-4 shadow-[0_24px_80px_rgba(0,0,0,0.85)] backdrop-blur sm:block">
			<div className="mb-2 flex items-center justify-between text-[11px] text-gray-400">
				<span className="rounded-full bg-white/5 px-2 py-0.5">
					Example views (mock data)
				</span>
				<span className="text-gray-500">What BasePoint can look like</span>
			</div>

			{/* Tabs */}
			<div className="mb-4 inline-flex rounded-full bg-white/5 p-1 text-xs">
				<button
					type="button"
					onClick={() => setActiveView("customer")}
					className={`rounded-full px-3 py-1 text-[11px] font-medium transition ${
						activeView === "customer"
							? "bg-white text-gray-900 shadow-sm"
							: "text-gray-300 hover:text-white"
					}`}>
					Customer view
				</button>
				<button
					type="button"
					onClick={() => setActiveView("business")}
					className={`rounded-full px-3 py-1 text-[11px] font-medium transition ${
						activeView === "business"
							? "bg-white text-gray-900 shadow-sm"
							: "text-gray-300 hover:text-white"
					}`}>
					Business view
				</button>
			</div>

			{/* Customer view */}
			{activeView === "customer" && (
				<>
					<div className="flex items-center justify-between pb-3">
						<span className="text-xs font-medium uppercase tracking-wide text-gray-400">
							Today&apos;s schedule
						</span>
						<span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
							Low no‑shows • Auto reminders
						</span>
					</div>

					<div className="space-y-3">
						{[
							{
								label: "9:00 AM • Fade & beard trim",
								name: "Andre Brooks",
								amount: 55,
							},
							{
								label: "12:30 PM • PT session",
								name: "Jenna Smith",
								amount: 80,
							},
							{
								label: "4:00 PM • Hydrating facial",
								name: "Lola Martinez",
								amount: 95,
							},
						].map((item, index) => (
							<div
								key={index}
								className="flex items-center justify-between rounded-xl border border-white/5 bg-white/5 px-3 py-3 text-sm">
								<div className="flex items-center gap-3">
									<div className="flex h-9 w-9 items-center justify-center rounded-lg bg-basepoint-teal/15 text-xs font-semibold text-basepoint-teal">
										{item.name
											.split(" ")
											.map((n) => n[0])
											.join("")
											.slice(0, 2)
											.toUpperCase()}
									</div>
									<div>
										<p className="text-sm font-medium text-white">
											{item.label}
										</p>
										<p className="text-xs text-gray-400">
											{item.name} •{" "}
											<span className="text-emerald-300">Paid online</span>
										</p>
									</div>
								</div>
								<span className="text-xs font-semibold text-gray-100">
									${item.amount}
								</span>
							</div>
						))}
					</div>

					<p className="mt-2 text-[11px] text-gray-500">
						Example of how confirmed appointments look to your clients once they
						book.
					</p>
				</>
			)}

			{/* Business view */}
			{activeView === "business" && (
				<>
					<div className="flex items-center justify-between pb-3">
						<span className="text-xs font-medium uppercase tracking-wide text-gray-400">
							Business overview
						</span>
						<span className="rounded-full bg-basepoint-teal/15 px-3 py-1 text-xs font-medium text-teal-300">
							At a glance
						</span>
					</div>

					{/* Top metrics */}
					<div className="grid grid-cols-2 gap-3 text-xs">
						<div className="rounded-xl bg-white/5 px-3 py-3">
							<p className="text-gray-400">This week&apos;s revenue</p>
							<p className="mt-1 text-sm font-semibold text-white">$3,270</p>
							<p className="mt-1 text-[11px] text-emerald-300">
								+18% vs last week
							</p>
						</div>
						<div className="rounded-xl bg-white/5 px-3 py-3">
							<p className="text-gray-400">New clients this month</p>
							<p className="mt-1 text-sm font-semibold text-teal-300">+28</p>
							<p className="mt-1 text-[11px] text-gray-400">
								Mostly from Instagram
							</p>
						</div>
					</div>

					{/* Upcoming + popular service */}
					<div className="mt-3 grid gap-3 text-[11px] text-gray-300 sm:grid-cols-2">
						<div className="rounded-xl bg-white/5 px-3 py-3">
							<p className="text-gray-400">Upcoming today</p>
							<div className="mt-1 flex items-center justify-between">
								<span>6 bookings</span>
								<span className="font-medium text-emerald-300">
									Fully booked 3–6 PM
								</span>
							</div>
						</div>
						<div className="rounded-xl bg-white/5 px-3 py-3">
							<p className="text-gray-400">Most booked service</p>
							<div className="mt-1 flex items-center justify-between">
								<span>Fade & beard trim</span>
								<span className="font-medium text-teal-300">
									42% of bookings
								</span>
							</div>
						</div>
					</div>

					{/* Health strip */}
					<div className="mt-3 space-y-2 text-[11px] text-gray-300">
						<div className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2">
							<span>No‑show rate (30 days)</span>
							<span className="font-medium text-emerald-300">1.2%</span>
						</div>
						<div className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2">
							<span>Repeat clients</span>
							<span className="font-medium text-teal-300">72%</span>
						</div>
						<div className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2">
							<span>Average ticket value</span>
							<span className="font-medium text-gray-100">$68.40</span>
						</div>
					</div>

					<p className="mt-2 text-[11px] text-gray-500">
						Example of the kind of high‑level stats you see as bookings and
						payments come in.
					</p>
				</>
			)}

			<p className="mt-2 text-[11px] text-gray-500">
				Data shown is sample only. Your dashboard updates in real‑time as
				customers book and pay.
			</p>
		</div>
	);
}

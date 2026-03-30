import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { useState } from "react";

type BusinessHour = {
	day:
		| "monday"
		| "tuesday"
		| "wednesday"
		| "thursday"
		| "friday"
		| "saturday"
		| "sunday";
	open: string;
	close: string;
	isOpen: boolean;
};

type Booking = {
	id: string;
	clientName: string;
	serviceName: string;
	price: number;
	status: "confirmed" | "completed" | "cancelled" | "no-show";
	datetime: string;
};

const mockHours: BusinessHour[] = [
	{ day: "monday", open: "09:00", close: "17:00", isOpen: true },
	{ day: "tuesday", open: "09:00", close: "17:00", isOpen: true },
	{ day: "wednesday", open: "09:00", close: "17:00", isOpen: true },
	{ day: "thursday", open: "09:00", close: "17:00", isOpen: true },
	{ day: "friday", open: "09:00", close: "17:00", isOpen: true },
	{ day: "saturday", open: "10:00", close: "16:00", isOpen: true },
	{ day: "sunday", open: "10:00", close: "16:00", isOpen: false },
];

const mockBookings: Booking[] = [
	{
		id: "1",
		clientName: "Andre Brooks",
		serviceName: "Men's Haircut",
		price: 35,
		status: "confirmed",
		datetime: "09:00",
	},
	{
		id: "2",
		clientName: "Jenna Smith",
		serviceName: "PT Session",
		price: 80,
		status: "confirmed",
		datetime: "11:00",
	},
];

export default function DashboardCalendarPage() {
	const [selectedDate] = useState(new Date());

	const filtered = mockBookings;

	return (
		<DashboardLayout>
			<div className="rounded-[1.75rem] border border-slate-200 bg-white/90 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-sm">
				<div className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
					Calendar
				</div>

				<div className="mt-3">
					<h1 className="text-3xl font-semibold tracking-tight text-slate-900">
						Calendar
					</h1>
					<p className="mt-2 text-sm text-slate-500">
						View your appointments and availability by day.
					</p>
				</div>
			</div>

			<div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
				<p className="text-xs font-medium uppercase tracking-wide text-slate-500">
					Selected date
				</p>
				<h2 className="mt-1 text-sm font-semibold text-slate-900">
					{selectedDate.toDateString()}
				</h2>
			</div>

			<div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
				<div className="mb-4 flex items-center justify-between">
					<h3 className="text-sm font-semibold text-slate-900">
						Booked appointments
					</h3>
					<span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
						{filtered.length} bookings
					</span>
				</div>

				{filtered.length > 0 ? (
					<div className="space-y-3">
						{filtered.map((booking) => (
							<div
								key={booking.id}
								className="flex items-center justify-between rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white px-4 py-3 text-sm shadow-sm">
								<div>
									<p className="font-semibold text-slate-900">
										{booking.clientName}
									</p>
									<p className="text-xs text-slate-500">
										{booking.serviceName} • {booking.datetime}
									</p>
								</div>

								<span
									className={`rounded-full px-2.5 py-1 text-xs font-medium capitalize ${
										booking.status === "confirmed"
											? "bg-emerald-50 text-emerald-700"
											: booking.status === "completed"
												? "bg-teal-50 text-teal-700"
												: "bg-red-50 text-red-700"
									}`}>
									{booking.status}
								</span>
							</div>
						))}
					</div>
				) : (
					<p className="text-sm text-slate-500">No appointments today</p>
				)}
			</div>

			<div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-gradient-to-br from-slate-50 to-white p-5 text-sm text-slate-500 shadow-sm">
				Availability and time-slot picker coming soon.
			</div>
		</DashboardLayout>
	);
}

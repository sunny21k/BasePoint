import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { useState } from "react";

// Mock data model (you’ll replace with real API later)
type BusinessHour = {
	day:
		| "monday"
		| "tuesday"
		| "wednesday"
		| "thursday"
		| "friday"
		| "saturday"
		| "sunday";
	open: string; // "09:00"
	close: string; // "17:00"
	isOpen: boolean;
};

type Booking = {
	id: string;
	clientName: string;
	serviceName: string;
	price: number;
	status: "confirmed" | "completed" | "cancelled" | "no-show";
	datetime: string; // ISO-ish or human time
};

// Dummy hours and bookings for one day
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
	const [selectedDate, setSelectedDate] = useState(new Date());

	// Just show bookings for the selected day (in reality you filter by date)
	const filtered = mockBookings;

	return (
		<DashboardLayout>
			<div>
				<h1 className="text-2xl font-semibold text-white">Calendar</h1>
				<p className="mt-1 text-sm text-gray-400">
					View your appointments and availability by day.
				</p>
			</div>

			{/* Selected date display */}
			<div className="mt-6">
				<h2 className="text-sm font-medium text-white">
					{selectedDate.toDateString()}
				</h2>
			</div>

			{/* Time slots list (simplified) */}
			<div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-5">
				<h3 className="mb-4 text-sm font-semibold text-white">
					Booked appointments
				</h3>

				{filtered.length > 0 ? (
					<div className="space-y-3">
						{filtered.map((booking) => (
							<div
								key={booking.id}
								className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm">
								<div>
									<p className="text-white font-medium">{booking.clientName}</p>
									<p className="text-gray-400 text-xs">
										{booking.serviceName} • {booking.datetime}
									</p>
								</div>
								<span
									className={`rounded-full px-2 py-1 text-xs font-medium capitalize ${
										booking.status === "confirmed"
											? "bg-basepoint-teal/20 text-basepoint-teal"
											: booking.status === "completed"
												? "bg-emerald-400/20 text-emerald-300"
												: "bg-red-400/20 text-red-300"
									}`}>
									{booking.status}
								</span>
							</div>
						))}
					</div>
				) : (
					<p className="text-sm text-gray-400">No appointments today</p>
				)}
			</div>

			{/* Availability / slots could be added later */}
			<div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-5 text-sm text-gray-400">
				Availability and time‑slot picker coming soon.
			</div>
		</DashboardLayout>
	);
}

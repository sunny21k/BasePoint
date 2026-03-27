import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import QuickStatsCard from "../components/dashboard/QuickStatsCard";
import UpcomingBookingsCard from "../components/dashboard/UpcomingBookingsCard";
import RevenueChart from "../components/dashboard/RevenueChart";
import RepeatClientsChart from "../components/dashboard/RepeatClientsChart";
import DashboardLayout from "../components/dashboard/DashboardLayout";

// Minimal mock data structure
type MockBooking = {
	id: string;
	clientName: string;
	serviceName: string;
	price: number;
	status: "confirmed" | "completed" | "cancelled" | "no-show";
	datetime: string; // ISO or "10:00 AM"
	createdAt: string; // ISO for date math
};

const mockBookings: MockBooking[] = [
	{
		id: "1",
		clientName: "Andre Brooks",
		serviceName: "Men's Haircut",
		price: 35,
		status: "confirmed",
		datetime: "9:00 AM",
		createdAt: "2026-03-24T09:00:00Z",
	},
	{
		id: "2",
		clientName: "Jenna Smith",
		serviceName: "PT Session",
		price: 80,
		status: "completed",
		datetime: "12:30 PM",
		createdAt: "2026-03-24T12:30:00Z",
	},
	{
		id: "3",
		clientName: "Lola Martinez",
		serviceName: "Massage",
		price: 90,
		status: "cancelled",
		datetime: "4:00 PM",
		createdAt: "2026-03-24T16:00:00Z",
	},
	{
		id: "4",
		clientName: "Andre Brooks",
		serviceName: "Beard Trim",
		price: 20,
		status: "completed",
		datetime: "6:00 PM",
		createdAt: "2026-03-23T18:00:00Z",
	},
];

export default function DashboardPage() {
	const [bookings, setBookings] = useState<MockBooking[]>([]);

	// Later: fetch from API
	useEffect(() => {
		// Just mock for now
		setBookings(mockBookings);
	}, []);

	return (
		<DashboardLayout>
			<div>
				<h1 className="text-2xl font-semibold">Overview</h1>
				<p className="text-sm text-gray-400">
					High‑level stats and recent activity.
				</p>
			</div>

			<QuickStatsCard bookings={bookings} />
			<UpcomingBookingsCard bookings={bookings} />
			<RevenueChart bookings={bookings} />
			<RepeatClientsChart bookings={bookings} />
		</DashboardLayout>
	);
}

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiBriefcase } from "react-icons/fi";
import QuickStatsCard from "../components/dashboard/QuickStatsCard";
import UpcomingBookingsCard from "../components/dashboard/UpcomingBookingsCard";
import RevenueChart from "../components/dashboard/RevenueChart";
import RepeatClientsChart from "../components/dashboard/RepeatClientsChart";
import DashboardLayout from "../components/dashboard/DashboardLayout";

type MockBooking = {
	id: string;
	clientName: string;
	serviceName: string;
	price: number;
	status: "confirmed" | "completed" | "cancelled" | "no-show";
	datetime: string;
	createdAt: string;
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

	useEffect(() => {
		setBookings(mockBookings);
	}, []);

	return (
		<DashboardLayout>
			<div className="mb-8 rounded-[1.75rem] border border-slate-200 bg-white/90 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-sm">
				<div className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
					Dashboard overview
				</div>

				<div className="mt-4 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
					<div>
						<h1 className="text-3xl font-semibold tracking-tight text-slate-900">
							Overview
						</h1>
						<p className="mt-2 text-sm text-slate-500">
							High-level stats and recent activity.
						</p>
					</div>

					<Link
						to="/business/dashboard/profile"
						className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
						<FiBriefcase className="h-4 w-4 text-sky-600" />
						Business profile
						<FiArrowRight className="h-4 w-4" />
					</Link>
				</div>
			</div>

			<div className="space-y-6">
				<QuickStatsCard bookings={bookings} />
				<UpcomingBookingsCard bookings={bookings} />
				<div className="grid gap-6 lg:grid-cols-2">
					<RevenueChart bookings={bookings} />
					<RepeatClientsChart bookings={bookings} />
				</div>
			</div>
		</DashboardLayout>
	);
}

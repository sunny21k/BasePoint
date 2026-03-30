import BookingCard from "./BookCard";

interface Booking {
	id: string;
	clientName: string;
	serviceName: string;
	price: number;
	status: "confirmed" | "completed" | "cancelled" | "no-show";
	datetime: string;
}

interface UpcomingBookingsCardProps {
	bookings: Booking[];
}

function filterUpcoming(bookings: Booking[]) {
	return bookings.filter(
		(b) => b.status === "confirmed" || b.status === "completed",
	);
}

export default function UpcomingBookingsCard({
	bookings,
}: UpcomingBookingsCardProps) {
	const upcoming = filterUpcoming(bookings);

	return (
		<div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
			<div className="mb-4 flex items-center justify-between">
				<h2 className="text-lg font-semibold text-slate-900">Upcoming today</h2>
				<span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
					{upcoming.length} bookings
				</span>
			</div>

			<div className="space-y-3">
				{upcoming.length > 0 ? (
					upcoming.map((booking) => (
						<BookingCard key={booking.id} booking={booking} />
					))
				) : (
					<p className="text-sm text-slate-500">
						No upcoming appointments today
					</p>
				)}
			</div>
		</div>
	);
}

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

// Only show “live” appointments (not cancelled/no‑show)
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
		<div className="rounded-xl border border-white/10 bg-white/5 p-5">
			<div className="mb-4 flex items-center justify-between">
				<h2 className="text-lg font-semibold text-white">Upcoming today</h2>
				<span className="rounded-full bg-emerald-400/10 px-2 py-1 text-xs font-medium text-emerald-300">
					{upcoming.length} bookings
				</span>
			</div>

			<div className="space-y-3">
				{upcoming.length > 0 ? (
					upcoming.map((booking) => (
						<BookingCard key={booking.id} booking={booking} />
					))
				) : (
					<p className="text-sm text-gray-400">
						No upcoming appointments today
					</p>
				)}
			</div>
		</div>
	);
}

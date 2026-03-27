interface Booking {
	status: "confirmed" | "completed" | "cancelled" | "no-show";
	price: number;
	createdAt: string; // e.g., "2026-03-24T09:00:00Z"
	clientName: string;
}

interface QuickStatsCardProps {
	bookings: Booking[];
}

// Helper: get days between two dates
function daysDiff(a: Date, b: Date): number {
	const _MS_PER_DAY = 1000 * 60 * 60 * 24;
	const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
	const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
	return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}

function monthDiff(a: Date, b: Date): number {
	return (
		b.getMonth() + b.getFullYear() * 12 - (a.getMonth() + a.getFullYear() * 12)
	);
}

function getStats(bookings: Booking[]) {
	const now = new Date();

	// Bookings this week (within 7 days of now)
	const bookingsThisWeek = bookings.filter((b) => {
		const bDate = new Date(b.createdAt);
		const diffDays = daysDiff(bDate, now);
		return b.status === "completed" && diffDays >= 0 && diffDays <= 7;
	});

	// Revenue this month (only completed bookings from this month)
	const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
	const revenueThisMonth = bookings
		.filter((b) => {
			const bDate = new Date(b.createdAt);
			const bMonth = new Date(bDate.getFullYear(), bDate.getMonth(), 1);
			return (
				b.status === "completed" && bMonth.getTime() === thisMonth.getTime()
			);
		})
		.reduce((sum, b) => sum + b.price, 0);

	// No‑show / cancelled vs total
	const noShowsOrCancelled = bookings.filter(
		(b) => b.status === "cancelled" || b.status === "no-show",
	).length;
	const totalBookings = bookings.length;
	const noShowRate =
		totalBookings > 0 ? (noShowsOrCancelled / totalBookings) * 100 : 0;

	// Repeat clients
	const clientMap = new Map<string, number>();
	for (const b of bookings) {
		clientMap.set(b.clientName, (clientMap.get(b.clientName) ?? 0) + 1);
	}
	const repeatClients = Array.from(clientMap.values()).filter(
		(count) => count > 1,
	).length;
	const totalClients = clientMap.size;
	const repeatClientRate =
		totalClients > 0 ? (repeatClients / totalClients) * 100 : 0;

	return {
		bookingsThisWeek: bookingsThisWeek.length,
		revenueThisMonth,
		noShowRate: Math.round(noShowRate * 10) / 10, // 1 digit
		repeatClientRate: Math.round(repeatClientRate * 10) / 10,
	};
}

export default function QuickStatsCard({ bookings }: QuickStatsCardProps) {
	const { bookingsThisWeek, revenueThisMonth, noShowRate, repeatClientRate } =
		getStats(bookings);

	return (
		<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
			<div className="rounded-xl border border-white/10 bg-white/5 p-5">
				<p className="text-xs text-gray-400">Bookings this week</p>
				<p className="mt-1 text-2xl font-semibold text-white">
					{bookingsThisWeek}
				</p>
			</div>
			<div className="rounded-xl border border-white/10 bg-white/5 p-5">
				<p className="text-xs text-gray-400">Revenue this month</p>
				<p className="mt-1 text-2xl font-semibold text-white">
					${revenueThisMonth}
				</p>
			</div>
			<div className="rounded-xl border border-white/10 bg-white/5 p-5">
				<p className="text-xs text-gray-400">No‑show rate</p>
				<p className="mt-1 text-2xl font-semibold text-white">{noShowRate}%</p>
			</div>
			<div className="rounded-xl border border-white/10 bg-white/5 p-5">
				<p className="text-xs text-gray-400">Repeat clients</p>
				<p className="mt-1 text-2xl font-semibold text-white">
					{repeatClientRate}%
				</p>
			</div>
		</div>
	);
}

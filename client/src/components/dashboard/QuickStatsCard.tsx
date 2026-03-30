interface Booking {
	status: "confirmed" | "completed" | "cancelled" | "no-show";
	price: number;
	createdAt: string;
	clientName: string;
}

interface QuickStatsCardProps {
	bookings: Booking[];
}

function daysDiff(a: Date, b: Date): number {
	const _MS_PER_DAY = 1000 * 60 * 60 * 24;
	const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
	const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
	return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}

function getStats(bookings: Booking[]) {
	const now = new Date();

	const bookingsThisWeek = bookings.filter((b) => {
		const bDate = new Date(b.createdAt);
		const diffDays = daysDiff(bDate, now);
		return b.status === "completed" && diffDays >= 0 && diffDays <= 7;
	});

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

	const noShowsOrCancelled = bookings.filter(
		(b) => b.status === "cancelled" || b.status === "no-show",
	).length;

	const totalBookings = bookings.length;
	const noShowRate =
		totalBookings > 0 ? (noShowsOrCancelled / totalBookings) * 100 : 0;

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
		noShowRate: Math.round(noShowRate * 1) / 1,
		repeatClientRate: Math.round(repeatClientRate * 1) / 1,
	};
}

export default function QuickStatsCard({ bookings }: QuickStatsCardProps) {
	const { bookingsThisWeek, revenueThisMonth, noShowRate, repeatClientRate } =
		getStats(bookings);

	const stats = [
		{ label: "Bookings this week", value: bookingsThisWeek },
		{ label: "Revenue this month", value: `$${revenueThisMonth}` },
		{ label: "No-show rate", value: `${noShowRate}%` },
		{ label: "Repeat clients", value: `${repeatClientRate}%` },
	];

	return (
		<div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
			{stats.map((stat) => (
				<div
					key={stat.label}
					className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
					<p className="text-xs font-medium uppercase tracking-wide text-slate-500">
						{stat.label}
					</p>
					<p className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
						{stat.value}
					</p>
				</div>
			))}
		</div>
	);
}

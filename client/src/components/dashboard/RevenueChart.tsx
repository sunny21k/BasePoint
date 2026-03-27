import { useMemo } from "react";

interface Booking {
	status: "confirmed" | "completed" | "cancelled" | "no-show";
	price: number;
	createdAt: string;
}

interface RevenueChartProps {
	bookings: Booking[];
}

function getRevenuePerDay(bookings: Booking[]) {
	const filtered = bookings.filter((b) => b.status === "completed");

	const revenueByDate = new Map<string, number>();

	for (const b of filtered) {
		const date = new Date(b.createdAt).toDateString(); // "Wed Mar 25 2026"
		revenueByDate.set(date, (revenueByDate.get(date) ?? 0) + b.price);
	}

	return Array.from(revenueByDate.entries()).map(([date, revenue]) => ({
		date,
		revenue,
	}));
}

export default function RevenueChart({ bookings }: RevenueChartProps) {
	const data = useMemo(() => getRevenuePerDay(bookings), [bookings]);

	if (data.length === 0) {
		return (
			<div className="rounded-xl border border-white/10 bg-white/5 p-5 text-center text-sm text-gray-400">
				No completed bookings yet
			</div>
		);
	}

	const maxRevenue = Math.max(...data.map((d) => d.revenue));

	return (
		<div className="rounded-xl border border-white/10 bg-white/5 p-5">
			<h3 className="mb-4 text-lg font-semibold text-white">Revenue by day</h3>
			<div className="mt-4 space-y-3">
				{data.map((item) => {
					const percent = (item.revenue / maxRevenue) * 100;
					return (
						<div key={item.date} className="flex items-center justify-between">
							<div className="text-sm text-gray-300">
								{new Date(item.date).toLocaleDateString(undefined, {
									weekday: "short",
									month: "short",
									day: "numeric",
								})}
							</div>
							<div className="flex-1 mx-3 h-6 rounded-full bg-white/10 overflow-hidden">
								<div
									className="h-full bg-basepoint-teal"
									style={{ width: `${percent}%` }}
								/>
							</div>
							<div className="text-sm text-white font-medium">
								${item.revenue}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}

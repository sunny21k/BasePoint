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
		const date = new Date(b.createdAt).toDateString();
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
			<div className="rounded-2xl border border-slate-200 bg-white p-5 text-center text-sm text-slate-500 shadow-sm">
				No completed bookings yet
			</div>
		);
	}

	const maxRevenue = Math.max(...data.map((d) => d.revenue));

	return (
		<div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
			<h3 className="mb-4 text-lg font-semibold text-slate-900">
				Revenue by day
			</h3>

			<div className="mt-4 space-y-3">
				{data.map((item) => {
					const percent = (item.revenue / maxRevenue) * 100;

					return (
						<div key={item.date} className="flex items-center gap-3">
							<div className="w-28 shrink-0 text-xs text-slate-500 sm:w-36">
								{new Date(item.date).toLocaleDateString(undefined, {
									weekday: "short",
									month: "short",
									day: "numeric",
								})}
							</div>

							<div className="h-3 flex-1 overflow-hidden rounded-full bg-slate-100">
								<div
									className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500"
									style={{ width: `${percent}%` }}
								/>
							</div>

							<div className="w-16 text-right text-sm font-semibold text-slate-900">
								${item.revenue}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}

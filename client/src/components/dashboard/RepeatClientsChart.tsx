import { useMemo } from "react";

interface Booking {
	status: "confirmed" | "completed" | "cancelled" | "no-show";
	createdAt: string;
	clientName: string;
}

interface RepeatClientsChartProps {
	bookings: Booking[];
}

function getRepeatNewStats(bookings: Booking[]) {
	const filtered = bookings.filter((b) => b.status === "completed");

	if (filtered.length === 0) {
		return { repeat: 0, new: 0 };
	}

	const clientMap = new Map<string, number>();
	for (const b of filtered) {
		clientMap.set(b.clientName, (clientMap.get(b.clientName) ?? 0) + 1);
	}

	let repeat = 0;
	let newCount = 0;

	for (const count of clientMap.values()) {
		if (count > 1) repeat += 1;
		else newCount += 1;
	}

	return { repeat, new: newCount };
}

export default function RepeatClientsChart({
	bookings,
}: RepeatClientsChartProps) {
	const { repeat, new: newCount } = useMemo(
		() => getRepeatNewStats(bookings),
		[bookings],
	);

	const total = repeat + newCount;
	const repeatPercent = total > 0 ? (repeat / total) * 100 : 0;
	const newPercent = total > 0 ? (newCount / total) * 100 : 0;

	if (total === 0) {
		return (
			<div className="rounded-2xl border border-slate-200 bg-white p-5 text-center text-sm text-slate-500 shadow-sm">
				No completed bookings yet
			</div>
		);
	}

	return (
		<div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
			<h3 className="mb-4 text-lg font-semibold text-slate-900">
				Repeat vs new clients
			</h3>

			<div className="space-y-3">
				<div className="flex items-center justify-between rounded-2xl bg-emerald-50 px-4 py-3">
					<div className="flex items-center gap-2">
						<div className="h-3 w-3 rounded-full bg-emerald-600" />
						<span className="text-sm font-medium text-slate-700">
							{repeat} repeat clients
						</span>
					</div>
					<span className="text-sm font-semibold text-emerald-700">
						{repeatPercent.toFixed(0)}%
					</span>
				</div>

				<div className="flex items-center justify-between rounded-2xl bg-teal-50 px-4 py-3">
					<div className="flex items-center gap-2">
						<div className="h-3 w-3 rounded-full bg-teal-500" />
						<span className="text-sm font-medium text-slate-700">
							{newCount} new clients
						</span>
					</div>
					<span className="text-sm font-semibold text-teal-700">
						{newPercent.toFixed(0)}%
					</span>
				</div>
			</div>
		</div>
	);
}

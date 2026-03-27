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
		if (count > 1) {
			repeat += 1;
		} else {
			newCount += 1;
		}
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
			<div className="rounded-xl border border-white/10 bg-white/5 p-5 text-center text-sm text-gray-400">
				No completed bookings yet
			</div>
		);
	}

	return (
		<div className="rounded-xl border border-white/10 bg-white/5 p-5">
			<h3 className="mb-4 text-lg font-semibold text-white">
				Repeat vs new clients
			</h3>

			<div className="flex h-32 items-center justify-center space-x-4">
				{/* Pie slice 1: Repeat */}
				<div
					className="h-20 w-20 rounded-full bg-basepoint-teal"
					style={{ width: 0, height: 0 }}></div>

				{/* Simple “text pie” for now, easier to style */}
				<div className="flex flex-col gap-1 text-sm">
					<div className="flex items-center gap-2">
						<div className="h-3 w-3 rounded-full bg-basepoint-teal" />
						<span className="text-white">{repeat} repeat clients</span>
						<span className="text-gray-400">({repeatPercent.toFixed(0)}%)</span>
					</div>
					<div className="flex items-center gap-2">
						<div className="h-3 w-3 rounded-full bg-emerald-400" />
						<span className="text-white">{newCount} new clients</span>
						<span className="text-gray-400">({newPercent.toFixed(0)}%)</span>
					</div>
				</div>
			</div>
		</div>
	);
}

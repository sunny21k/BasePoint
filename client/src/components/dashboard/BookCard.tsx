interface Booking {
	clientName: string;
	serviceName: string;
	price: number;
	status: "confirmed" | "completed" | "cancelled" | "no-show";
	datetime: string;
}

function getStatusColor(status: Booking["status"]): string {
	switch (status) {
		case "completed":
			return "text-emerald-700 bg-emerald-50 border-emerald-200";
		case "confirmed":
			return "text-teal-700 bg-teal-50 border-teal-200";
		case "cancelled":
			return "text-red-700 bg-red-50 border-red-200";
		case "no-show":
			return "text-amber-700 bg-amber-50 border-amber-200";
		default:
			return "text-slate-700 bg-slate-50 border-slate-200";
	}
}

export default function BookingCard({ booking }: { booking: Booking }) {
	const statusClasses = getStatusColor(booking.status);

	return (
		<div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md">
			<div className="flex items-center gap-3">
				<div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-100 to-teal-100 text-xs font-bold text-emerald-700">
					{booking.clientName
						.split(" ")
						.map((n) => n[0])
						.join("")
						.slice(0, 2)
						.toUpperCase()}
				</div>

				<div className="min-w-0 flex-1">
					<p className="truncate text-sm font-semibold text-slate-900">
						{booking.clientName}
					</p>
					<div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-500">
						<span className="truncate">{booking.serviceName}</span>
						<span>•</span>
						<span
							className={`inline-flex rounded-full border px-2 py-0.5 font-medium capitalize ${statusClasses}`}>
							{booking.status}
						</span>
					</div>
				</div>

				<div className="text-right">
					<p className="text-sm font-semibold text-slate-900">
						${booking.price}
					</p>
					<p className="text-xs text-slate-500">{booking.datetime}</p>
				</div>
			</div>
		</div>
	);
}

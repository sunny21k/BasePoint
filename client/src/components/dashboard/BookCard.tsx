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
			return "text-emerald-300";
		case "confirmed":
			return "text-teal-300";
		case "cancelled":
			return "text-red-300";
		case "no-show":
			return "text-yellow-300";
		default:
			return "text-gray-300";
	}
}

export default function BookingCard({ booking }: { booking: Booking }) {
	const statusColor = getStatusColor(booking.status);

	return (
		<div className="rounded-lg border border-white/10 bg-white/5 p-4">
			<div className="flex items-center gap-3">
				<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-basepoint-teal/15 text-xs font-semibold text-basepoint-teal">
					{booking.clientName
						.split(" ")
						.map((n) => n[0])
						.join("")
						.slice(0, 2)
						.toUpperCase()}
				</div>

				<div className="flex-1">
					<p className="text-sm font-medium text-white">{booking.clientName}</p>
					<p className="text-xs text-gray-400">
						{booking.serviceName} •{" "}
						<span className={statusColor}>{booking.status}</span>
					</p>
				</div>

				<div className="text-right text-sm">
					<p className="text-white">${booking.price}</p>
					<p className="text-gray-400">{booking.datetime}</p>
				</div>
			</div>
		</div>
	);
}

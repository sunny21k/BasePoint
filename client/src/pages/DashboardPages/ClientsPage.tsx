import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { useMemo, useState } from "react";

type Client = {
	id: string;
	name: string;
	email: string;
	phone: string;
	lastAppointment: string;
	totalBookings: number;
	status: "active" | "new" | "inactive";
};

const mockClients: Client[] = [
	{
		id: "1",
		name: "Andre Brooks",
		email: "andre@email.com",
		phone: "(555) 111-2222",
		lastAppointment: "Mar 22, 2026",
		totalBookings: 8,
		status: "active",
	},
	{
		id: "2",
		name: "Jenna Smith",
		email: "jenna@email.com",
		phone: "(555) 222-3333",
		lastAppointment: "Mar 20, 2026",
		totalBookings: 4,
		status: "active",
	},
	{
		id: "3",
		name: "Marcus Lee",
		email: "marcus@email.com",
		phone: "(555) 333-4444",
		lastAppointment: "Mar 18, 2026",
		totalBookings: 1,
		status: "new",
	},
	{
		id: "4",
		name: "Sofia Patel",
		email: "sofia@email.com",
		phone: "(555) 444-5555",
		lastAppointment: "Feb 27, 2026",
		totalBookings: 12,
		status: "active",
	},
	{
		id: "5",
		name: "Noah Kim",
		email: "noah@email.com",
		phone: "(555) 555-6666",
		lastAppointment: "Jan 11, 2026",
		totalBookings: 0,
		status: "inactive",
	},
];

export default function Clients() {
	const [query, setQuery] = useState("");

	const clients = useMemo(() => {
		const q = query.trim().toLowerCase();
		if (!q) return mockClients;

		return mockClients.filter(
			(c) =>
				c.name.toLowerCase().includes(q) ||
				c.email.toLowerCase().includes(q) ||
				c.phone.toLowerCase().includes(q),
		);
	}, [query]);

	return (
		<DashboardLayout>
			<div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
				<div>
					<h1 className="text-2xl font-semibold text-white">Clients</h1>
					<p className="mt-1 text-sm text-gray-400">
						View customers, booking history, and repeat clients.
					</p>
				</div>

				<div className="w-full sm:w-80">
					<label className="mb-1 block text-xs text-gray-400">
						Search clients
					</label>
					<input
						type="text"
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						placeholder="Search by name, email, or phone"
						className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none transition focus:border-basepoint-teal focus:ring-1 focus:ring-basepoint-teal/30"
					/>
				</div>
			</div>

			<div className="mt-6 overflow-hidden rounded-xl border border-white/10 bg-white/5">
				<div className="overflow-x-auto">
					<table className="min-w-full divide-y divide-white/10">
						<thead className="bg-white/5">
							<tr>
								<th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-400">
									Client
								</th>
								<th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-400">
									Contact
								</th>
								<th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-400">
									Last appointment
								</th>
								<th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-400">
									Bookings
								</th>
								<th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-400">
									Status
								</th>
								<th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-400">
									Action
								</th>
							</tr>
						</thead>

						<tbody className="divide-y divide-white/10">
							{clients.length > 0 ? (
								clients.map((client) => (
									<tr key={client.id} className="transition hover:bg-white/5">
										<td className="px-4 py-4">
											<div>
												<p className="text-sm font-medium text-white">
													{client.name}
												</p>
												<p className="text-xs text-gray-500">
													Client ID: {client.id}
												</p>
											</div>
										</td>

										<td className="px-4 py-4 text-sm text-gray-300">
											<div>{client.email}</div>
											<div className="text-xs text-gray-500">
												{client.phone}
											</div>
										</td>

										<td className="px-4 py-4 text-sm text-gray-300">
											{client.lastAppointment}
										</td>

										<td className="px-4 py-4 text-sm text-gray-300">
											{client.totalBookings}
										</td>

										<td className="px-4 py-4">
											<span
												className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${
													client.status === "active"
														? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300"
														: client.status === "new"
															? "border-basepoint-teal/30 bg-basepoint-teal/10 text-basepoint-teal"
															: "border-white/15 bg-white/5 text-gray-300"
												}`}>
												{client.status}
											</span>
										</td>

										<td className="px-4 py-4 text-right">
											<button
												type="button"
												className="cursor-pointer rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-white transition hover:border-basepoint-teal/40 hover:bg-basepoint-teal/10 focus:outline-none focus:ring-1 focus:ring-basepoint-teal/40">
												View
											</button>
										</td>
									</tr>
								))
							) : (
								<tr>
									<td
										className="px-4 py-10 text-center text-sm text-gray-400"
										colSpan={6}>
										No clients found.
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
			</div>
		</DashboardLayout>
	);
}

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
			<div className="rounded-[1.75rem] border border-slate-200 bg-white/90 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-sm">
				<div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
					<div>
						<div className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
							Client directory
						</div>
						<h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
							Clients
						</h1>
						<p className="mt-2 text-sm text-slate-500">
							View customers, booking history, and repeat clients.
						</p>
					</div>

					<div className="w-full sm:w-80">
						<label className="mb-1 block text-xs font-medium text-slate-600">
							Search clients
						</label>
						<input
							type="text"
							value={query}
							onChange={(e) => setQuery(e.target.value)}
							placeholder="Search by name, email, or phone"
							className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
						/>
					</div>
				</div>

				<div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
					<div className="overflow-x-auto">
						<table className="min-w-full divide-y divide-slate-200">
							<thead className="bg-slate-50">
								<tr>
									<th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
										Client
									</th>
									<th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
										Contact
									</th>
									<th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
										Last appointment
									</th>
									<th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
										Bookings
									</th>
									<th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
										Status
									</th>
									<th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
										Action
									</th>
								</tr>
							</thead>

							<tbody className="divide-y divide-slate-200">
								{clients.length > 0 ? (
									clients.map((client) => (
										<tr
											key={client.id}
											className="transition hover:bg-slate-50">
											<td className="px-4 py-4">
												<div>
													<p className="text-sm font-semibold text-slate-900">
														{client.name}
													</p>
													<p className="text-xs text-slate-500">
														Client ID: {client.id}
													</p>
												</div>
											</td>

											<td className="px-4 py-4 text-sm text-slate-600">
												<div>{client.email}</div>
												<div className="text-xs text-slate-500">
													{client.phone}
												</div>
											</td>

											<td className="px-4 py-4 text-sm text-slate-600">
												{client.lastAppointment}
											</td>

											<td className="px-4 py-4 text-sm text-slate-600">
												{client.totalBookings}
											</td>

											<td className="px-4 py-4">
												<span
													className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${
														client.status === "active"
															? "border-emerald-200 bg-emerald-50 text-emerald-700"
															: client.status === "new"
																? "border-teal-200 bg-teal-50 text-teal-700"
																: "border-slate-200 bg-slate-50 text-slate-500"
													}`}>
													{client.status}
												</span>
											</td>

											<td className="px-4 py-4 text-right">
												<button
													type="button"
													className="cursor-pointer rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-50 hover:text-slate-900">
													View
												</button>
											</td>
										</tr>
									))
								) : (
									<tr>
										<td
											className="px-4 py-10 text-center text-sm text-slate-500"
											colSpan={6}>
											No clients found.
										</td>
									</tr>
								)}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</DashboardLayout>
	);
}

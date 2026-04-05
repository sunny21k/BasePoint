import { useEffect, useState } from "react";
import axios from "axios";
import { HiCheck, HiX, HiRefresh, HiShieldCheck } from "react-icons/hi";

type PendingBusiness = {
	_id: string;
	ownerName: string;
	email: string;
	phone?: string;
	businessType?: string;
	businessAddress?: string;
	status?: string;
	accountStatus?: string;
	createdAt?: string;
};

export default function AdminDashboard() {
	const [businesses, setBusinesses] = useState<PendingBusiness[]>([]);
	const [loading, setLoading] = useState(true);
	const [actionLoading, setActionLoading] = useState<string | null>(null);
	const [error, setError] = useState("");

	const token = localStorage.getItem("adminToken");

	const fetchPendingBusinesses = async () => {
		try {
			setLoading(true);
			setError("");

			const res = await axios.get<PendingBusiness[]>(
				"http://localhost:3000/api/admin/businesses/pending",
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			);

			setBusinesses(res.data);
		} catch (err: any) {
			setError(
				err?.response?.data?.message || "Failed to load pending businesses",
			);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchPendingBusinesses();
	}, []);

	const handleApprove = async (id: string) => {
		try {
			setActionLoading(id);
			await axios.patch(
				`http://localhost:3000/api/admin/businesses/${id}/approve`,
				{},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			);

			setBusinesses((prev) => prev.filter((business) => business._id !== id));
		} catch (err: any) {
			setError(err?.response?.data?.message || "Failed to approve business");
		} finally {
			setActionLoading(null);
		}
	};

	const handleReject = async (id: string) => {
		try {
			setActionLoading(id);
			await axios.patch(
				`http://localhost:3000/api/admin/businesses/${id}/reject`,
				{},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			);

			setBusinesses((prev) => prev.filter((business) => business._id !== id));
		} catch (err: any) {
			setError(err?.response?.data?.message || "Failed to reject business");
		} finally {
			setActionLoading(null);
		}
	};

	return (
		<div className="min-h-screen bg-slate-50 px-6 py-10 text-slate-900">
			<div className="mx-auto max-w-7xl">
				<div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
					<div>
						<div className="mb-2 inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
							<HiShieldCheck className="h-4 w-4" />
							Admin Dashboard
						</div>
						<h1 className="text-3xl font-bold tracking-tight">
							Pending Businesses
						</h1>
						<p className="mt-2 text-slate-600">
							Review submitted business accounts and approve or reject them.
						</p>
					</div>

					<button
						onClick={fetchPendingBusinesses}
						className="inline-flex items-center cursor-pointer justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium shadow-sm transition hover:bg-slate-100">
						<HiRefresh className="h-4 w-4" />
						Refresh
					</button>
				</div>

				{error && (
					<div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
						{error}
					</div>
				)}

				{loading ? (
					<div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
						Loading pending businesses...
					</div>
				) : businesses.length === 0 ? (
					<div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
						No pending businesses right now.
					</div>
				) : (
					<div className="grid gap-5">
						{businesses.map((business) => (
							<div
								key={business._id}
								className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
								<div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
									<div className="space-y-2">
										<div className="flex items-center gap-2">
											<h2 className="text-xl font-bold">
												{business.ownerName}
											</h2>
											<span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
												Pending
											</span>
										</div>

										<p className="text-sm text-slate-600">{business.email}</p>

										{business.phone && (
											<p className="text-sm text-slate-600">
												Phone: {business.phone}
											</p>
										)}

										{business.businessType && (
											<p className="text-sm text-slate-600">
												Type: {business.businessType}
											</p>
										)}

										{business.businessAddress && (
											<p className="text-sm text-slate-600">
												Address: {business.businessAddress}
											</p>
										)}
									</div>

									<div className="flex flex-wrap gap-3">
										<button
											onClick={() => handleApprove(business._id)}
											disabled={actionLoading === business._id}
											className="inline-flex items-center cursor-pointer gap-2 rounded-xl bg-emerald-600 px-4 py-2 font-semibold text-white transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-60">
											<HiCheck className="h-5 w-5" />
											{actionLoading === business._id
												? "Working..."
												: "Approve"}
										</button>

										<button
											onClick={() => handleReject(business._id)}
											disabled={actionLoading === business._id}
											className="inline-flex items-center cursor-pointer gap-2 rounded-xl bg-rose-600 px-4 py-2 font-semibold text-white transition hover:bg-rose-500 disabled:cursor-not-allowed disabled:opacity-60">
											<HiX className="h-5 w-5" />
											{actionLoading === business._id ? "Working..." : "Reject"}
										</button>
									</div>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
}

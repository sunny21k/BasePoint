import { useEffect, useState } from "react";
import axios from "axios";
import {
	HiCheck,
	HiX,
	HiRefresh,
	HiShieldCheck,
	HiLogout,
	HiClock,
} from "react-icons/hi";
import { useAdminAuth } from "./AdminAuthContext";
import { Navigate } from "react-router-dom";

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

	const { token, admin, logout, loading: authLoading } = useAdminAuth();

	useEffect(() => {
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

		if (token && admin?.role === "admin") {
			fetchPendingBusinesses();
		}
	}, [token, admin]);

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

	const handleLogoutClick = () => {
		logout();
	};

	if (authLoading) return null;
	if (!token || !admin || admin.role !== "admin") {
		return <Navigate to="/admin/login" replace />;
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-50 to-blue-50 text-slate-900">
			<div className="mx-auto max-w-7xl px-6 py-8">
				<div className="mb-8 flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur sm:flex-row sm:items-end sm:justify-between">
					<div>
						<div className="mb-3 inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
							<HiShieldCheck className="h-4 w-4" />
							Admin Dashboard
						</div>
						<h1 className="text-3xl font-bold tracking-tight text-slate-900">
							Pending Businesses
						</h1>
						<p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
							Review submitted business accounts and approve or reject them with
							a clean workflow.
						</p>
					</div>

					<div className="flex flex-wrap gap-3">
						<button
							onClick={() => window.location.reload()}
							className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-100">
							<HiRefresh className="h-4 w-4" />
							Refresh
						</button>

						<button
							onClick={handleLogoutClick}
							className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800">
							<HiLogout className="h-4 w-4" />
							Logout
						</button>
					</div>
				</div>

				{error && (
					<div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 shadow-sm">
						{error}
					</div>
				)}

				{loading ? (
					<div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
						<div className="mx-auto mb-3 h-10 w-10 animate-spin rounded-full border-4 border-blue-100 border-t-blue-600" />
						<p className="text-sm text-slate-600">
							Loading pending businesses...
						</p>
					</div>
				) : businesses.length === 0 ? (
					<div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
						<div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
							<HiClock className="h-6 w-6 text-slate-500" />
						</div>
						<h2 className="text-lg font-semibold text-slate-900">
							No pending businesses
						</h2>
						<p className="mt-2 text-sm text-slate-600">
							Everything is up to date right now.
						</p>
					</div>
				) : (
					<div className="grid gap-5">
						{businesses.map((business) => (
							<div
								key={business._id}
								className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
								<div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
									<div className="space-y-4">
										<div className="flex flex-wrap items-center gap-3">
											<h2 className="text-xl font-bold tracking-tight text-slate-900">
												{business.ownerName}
											</h2>
											<span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
												<HiClock className="h-3.5 w-3.5" />
												Pending
											</span>
										</div>

										<div className="grid gap-2 text-sm text-slate-600 sm:grid-cols-2">
											<p>
												<span className="font-medium text-slate-800">
													Email:
												</span>{" "}
												{business.email}
											</p>

											{business.phone && (
												<p>
													<span className="font-medium text-slate-800">
														Phone:
													</span>{" "}
													{business.phone}
												</p>
											)}

											{business.businessType && (
												<p>
													<span className="font-medium text-slate-800">
														Type:
													</span>{" "}
													{business.businessType}
												</p>
											)}

											{business.businessAddress && (
												<p className="sm:col-span-2">
													<span className="font-medium text-slate-800">
														Address:
													</span>{" "}
													{business.businessAddress}
												</p>
											)}
										</div>
									</div>

									<div className="flex flex-wrap gap-3 lg:justify-end">
										<button
											onClick={() => handleApprove(business._id)}
											disabled={actionLoading === business._id}
											className="inline-flex items-center gap-2 rounded-2xl bg-emerald-600 px-4 py-2.5 font-semibold text-white shadow-sm transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-60">
											<HiCheck className="h-5 w-5" />
											{actionLoading === business._id
												? "Working..."
												: "Approve"}
										</button>

										<button
											onClick={() => handleReject(business._id)}
											disabled={actionLoading === business._id}
											className="inline-flex items-center gap-2 rounded-2xl bg-rose-600 px-4 py-2.5 font-semibold text-white shadow-sm transition hover:bg-rose-500 disabled:cursor-not-allowed disabled:opacity-60">
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

import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
	HiCheck,
	HiX,
	HiRefresh,
	HiShieldCheck,
	HiLogout,
	HiClock,
	HiUserGroup,
	HiCheckCircle,
	HiXCircle,
} from "react-icons/hi";
import { useAdminAuth } from "./AdminAuthContext";
import { Navigate } from "react-router-dom";

type BusinessItem = {
	_id: string;
	userId: string;
	ownerName: string;
	email: string;
	phone?: string;
	businessType?: string;
	businessAddress?: string;
	websiteOrSocial?: string;
	description?: string;
	isOnBoarded: boolean;
	createdAt?: string;
	accountStatus?: "pending" | "approved" | "rejected";
};

type StatusFilter = "all" | "pending" | "approved" | "rejected";

export default function AdminDashboard() {
	const [businesses, setBusinesses] = useState<BusinessItem[]>([]);
	const [loading, setLoading] = useState(true);
	const [actionLoading, setActionLoading] = useState<string | null>(null);
	const [error, setError] = useState("");
	const [activeTab, setActiveTab] = useState<StatusFilter>("pending");

	const { token, admin, logout, loading: authLoading } = useAdminAuth();

	useEffect(() => {
		const fetchBusinesses = async () => {
			try {
				setLoading(true);
				setError("");

				const res = await axios.get<BusinessItem[]>(
					"http://localhost:3000/api/admin/businesses",
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					},
				);

				setBusinesses(res.data);
			} catch (err: any) {
				setError(err?.response?.data?.message || "Failed to load businesses");
			} finally {
				setLoading(false);
			}
		};

		if (token && admin?.role === "admin") {
			fetchBusinesses();
		}
	}, [token, admin]);

	const updateStatus = async (
		id: string,
		accountStatus: "pending" | "approved" | "rejected",
	) => {
		try {
			setActionLoading(id);
			setError("");

			await axios.patch(
				`http://localhost:3000/api/admin/businesses/${id}/status`,
				{ accountStatus },
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			);

			setBusinesses((prev) =>
				prev.map((business) =>
					business._id === id ? { ...business, accountStatus } : business,
				),
			);
		} catch (err: any) {
			setError(err?.response?.data?.message || "Failed to update status");
		} finally {
			setActionLoading(null);
		}
	};

	const filteredBusinesses = useMemo(() => {
		if (activeTab === "all") return businesses;
		return businesses.filter(
			(business) => business.accountStatus === activeTab,
		);
	}, [businesses, activeTab]);

	const handleLogoutClick = () => {
		logout();
	};

	if (authLoading) return null;
	if (!token || !admin || admin.role !== "admin") {
		return <Navigate to="/admin/login" replace />;
	}

	const tabCount = (status: StatusFilter) =>
		status === "all"
			? businesses.length
			: businesses.filter((b) => b.accountStatus === status).length;

	const stats = {
		total: businesses.length,
		pending: businesses.filter(
			(b) => (b.accountStatus || "pending") === "pending",
		).length,
		approved: businesses.filter((b) => b.accountStatus === "approved").length,
		rejected: businesses.filter((b) => b.accountStatus === "rejected").length,
	};

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
							Business Status Manager
						</h1>
						<p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
							Review business submissions, move them between statuses, and keep
							track of onboarding progress.
						</p>
					</div>

					<div className="flex flex-wrap gap-3">
						<button
							onClick={() => window.location.reload()}
							className="inline-flex cursor-pointer items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-100">
							<HiRefresh className="h-4 w-4" />
							Refresh
						</button>

						<button
							onClick={handleLogoutClick}
							className="inline-flex cursor-pointer items-center gap-2 rounded-2xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800">
							<HiLogout className="h-4 w-4" />
							Logout
						</button>
					</div>
				</div>

				<div className="mb-6 grid gap-4 md:grid-cols-4">
					<div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
						<div className="flex items-center justify-between">
							<p className="text-sm text-slate-600">Total</p>
							<HiUserGroup className="h-5 w-5 text-slate-400" />
						</div>
						<p className="mt-3 text-3xl font-bold text-slate-900">
							{stats.total}
						</p>
					</div>

					<div className="rounded-3xl border border-amber-100 bg-amber-50 p-5 shadow-sm">
						<div className="flex items-center justify-between">
							<p className="text-sm text-amber-700">Pending</p>
							<HiClock className="h-5 w-5 text-amber-600" />
						</div>
						<p className="mt-3 text-3xl font-bold text-amber-700">
							{stats.pending}
						</p>
					</div>

					<div className="rounded-3xl border border-emerald-100 bg-emerald-50 p-5 shadow-sm">
						<div className="flex items-center justify-between">
							<p className="text-sm text-emerald-700">Approved</p>
							<HiCheckCircle className="h-5 w-5 text-emerald-600" />
						</div>
						<p className="mt-3 text-3xl font-bold text-emerald-700">
							{stats.approved}
						</p>
					</div>

					<div className="rounded-3xl border border-rose-100 bg-rose-50 p-5 shadow-sm">
						<div className="flex items-center justify-between">
							<p className="text-sm text-rose-700">Rejected</p>
							<HiXCircle className="h-5 w-5 text-rose-600" />
						</div>
						<p className="mt-3 text-3xl font-bold text-rose-700">
							{stats.rejected}
						</p>
					</div>
				</div>

				<div className="mb-6 flex flex-wrap gap-3 rounded-3xl border border-slate-200 bg-white p-3 shadow-sm">
					{(["all", "pending", "approved", "rejected"] as StatusFilter[]).map(
						(tab) => {
							const active = activeTab === tab;
							return (
								<button
									key={tab}
									onClick={() => setActiveTab(tab)}
									className={`cursor-pointer rounded-2xl px-4 py-2 text-sm font-semibold transition ${
										active
											? "bg-blue-600 text-white shadow-sm"
											: "bg-slate-100 text-slate-700 hover:bg-slate-200"
									}`}>
									{tab.charAt(0).toUpperCase() + tab.slice(1)} ({tabCount(tab)})
								</button>
							);
						},
					)}
				</div>

				{error && (
					<div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 shadow-sm">
						{error}
					</div>
				)}

				{loading ? (
					<div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
						<div className="mx-auto mb-3 h-10 w-10 animate-spin rounded-full border-4 border-blue-100 border-t-blue-600" />
						<p className="text-sm text-slate-600">Loading businesses...</p>
					</div>
				) : filteredBusinesses.length === 0 ? (
					<div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
						<div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
							<HiClock className="h-6 w-6 text-slate-500" />
						</div>
						<h2 className="text-lg font-semibold text-slate-900">
							No businesses in this tab
						</h2>
						<p className="mt-2 text-sm text-slate-600">
							Try switching to another status tab.
						</p>
					</div>
				) : (
					<div className="grid gap-5">
						{filteredBusinesses.map((business) => {
							const status = business.accountStatus || "pending";

							return (
								<div
									key={business._id}
									className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
									<div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
										<div className="space-y-4">
											<div className="flex flex-wrap items-center gap-3">
												<h2 className="text-xl font-bold tracking-tight text-slate-900">
													{business.ownerName}
												</h2>

												<span
													className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${
														status === "approved"
															? "bg-emerald-100 text-emerald-700"
															: status === "rejected"
																? "bg-rose-100 text-rose-700"
																: "bg-amber-100 text-amber-700"
													}`}>
													<HiClock className="h-3.5 w-3.5" />
													{status.charAt(0).toUpperCase() + status.slice(1)}
												</span>

												<span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
													Onboarded: {business.isOnBoarded ? "Yes" : "No"}
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

												{business.websiteOrSocial && (
													<p className="sm:col-span-2">
														<span className="font-medium text-slate-800">
															Website/Social:
														</span>{" "}
														{business.websiteOrSocial}
													</p>
												)}

												{business.description && (
													<p className="sm:col-span-2">
														<span className="font-medium text-slate-800">
															Description:
														</span>{" "}
														{business.description}
													</p>
												)}
											</div>
										</div>

										<div className="inline-flex rounded-2xl border border-slate-200 bg-slate-50 p-1 shadow-sm">
											<button
												onClick={() => updateStatus(business._id, "pending")}
												disabled={actionLoading === business._id}
												className={`cursor-pointer rounded-xl px-4 py-2 text-sm font-semibold transition ${
													status === "pending"
														? "bg-amber-500 text-white shadow-sm"
														: "text-slate-600 hover:bg-white hover:text-slate-900"
												} disabled:cursor-not-allowed disabled:opacity-60`}>
												Pending
											</button>

											<button
												onClick={() => updateStatus(business._id, "approved")}
												disabled={actionLoading === business._id}
												className={`cursor-pointer rounded-xl px-4 py-2 text-sm font-semibold transition ${
													status === "approved"
														? "bg-emerald-600 text-white shadow-sm"
														: "text-slate-600 hover:bg-white hover:text-slate-900"
												} disabled:cursor-not-allowed disabled:opacity-60`}>
												Approved
											</button>

											<button
												onClick={() => updateStatus(business._id, "rejected")}
												disabled={actionLoading === business._id}
												className={`cursor-pointer rounded-xl px-4 py-2 text-sm font-semibold transition ${
													status === "rejected"
														? "bg-rose-600 text-white shadow-sm"
														: "text-slate-600 hover:bg-white hover:text-slate-900"
												} disabled:cursor-not-allowed disabled:opacity-60`}>
												Rejected
											</button>
										</div>
									</div>
								</div>
							);
						})}
					</div>
				)}
			</div>
		</div>
	);
}

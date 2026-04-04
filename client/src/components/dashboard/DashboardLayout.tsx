import { NavLink, useNavigate } from "react-router-dom";
import {
	HiHome,
	HiCalendar,
	HiUsers,
	HiViewList,
	HiCreditCard,
	HiCog,
} from "react-icons/hi";
import { IoWalletOutline } from "react-icons/io5";
import { useBusinessAuth } from "../../pages/BusinessPages/BusinessAuthContext";

interface DashboardLayoutProps {
	children: React.ReactNode;
}

const navItems = [
	{ to: "/business/dashboard", label: "Overview", icon: HiHome, end: true },
	{ to: "/business/dashboard/calendar", label: "Calendar", icon: HiCalendar },
	{ to: "/business/dashboard/clients", label: "Clients", icon: HiUsers },
	{ to: "/business/dashboard/services", label: "Services", icon: HiViewList },
	{
		to: "/business/dashboard/subscriptions",
		label: "Subscriptions",
		icon: IoWalletOutline,
	},
	{ to: "/business/dashboard/payments", label: "Payments", icon: HiCreditCard },
	{ to: "/business/dashboard/settings", label: "Settings", icon: HiCog },
];

export default function DashboardLayout({ children }: DashboardLayoutProps) {
	const navigate = useNavigate();
	const { logout } = useBusinessAuth();

	const handleLogout = () => {
		logout();
		navigate("/business/login", { replace: true });
	};

	return (
		<div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.10),transparent_28%),linear-gradient(180deg,#f8fafc_0%,#ecfeff_45%,#ffffff_100%)] text-slate-900">
			<div className="flex min-h-screen">
				<aside className="sticky top-0 hidden h-screen w-72 border-r border-slate-200 bg-white/85 backdrop-blur-sm lg:flex lg:flex-col">
					<div className="flex h-16 items-center gap-3 border-b border-slate-200 px-6">
						<div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-600 to-teal-500 text-sm font-bold text-white shadow-sm">
							BP
						</div>
						<div>
							<p className="text-sm font-semibold text-slate-900">BasePoint</p>
							<p className="text-xs text-slate-500">Business dashboard</p>
						</div>
					</div>

					<nav className="flex-1 space-y-1 px-3 py-4">
						{navItems.map(({ to, label, icon: Icon, end }) => (
							<NavLink
								key={to}
								to={to}
								end={end}
								className={({ isActive }) =>
									`group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
										isActive
											? "border border-emerald-200 bg-emerald-50 text-emerald-700 shadow-sm"
											: "text-slate-600 hover:border-slate-200 hover:bg-slate-50 hover:text-slate-900"
									}`
								}>
								{({ isActive }) => (
									<>
										<Icon
											className={`h-5 w-5 transition ${
												isActive
													? "text-emerald-600"
													: "text-slate-400 group-hover:text-slate-700"
											}`}
										/>
										<span>{label}</span>
									</>
								)}
							</NavLink>
						))}
					</nav>

					<div className="border-t border-slate-200 p-4 space-y-3">
						<div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-4">
							<p className="text-xs font-medium uppercase tracking-wide text-slate-500">
								Workspace
							</p>
							<p className="mt-1 text-sm font-semibold text-slate-900">
								Manage bookings, services, and plans
							</p>
							<p className="mt-2 text-xs leading-5 text-slate-500">
								Everything you need to run your business in one place.
							</p>
						</div>

						<button
							onClick={handleLogout}
							className="w-full cursor-pointer rounded-2xl bg-rose-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-rose-700">
							Log out
						</button>
					</div>
				</aside>

				<main className="flex-1 overflow-x-hidden">
					<div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
						<div className="lg:hidden">
							<div className="mb-6 flex items-center gap-3 rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 shadow-sm backdrop-blur-sm">
								<div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-600 to-teal-500 text-sm font-bold text-white">
									BP
								</div>
								<div>
									<p className="text-sm font-semibold text-slate-900">
										BasePoint
									</p>
									<p className="text-xs text-slate-500">Business dashboard</p>
								</div>
							</div>

							<button
								onClick={handleLogout}
								className="mb-6 w-full rounded-2xl bg-rose-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-rose-700">
								Log out
							</button>
						</div>

						<div className="space-y-6">{children}</div>
					</div>
				</main>
			</div>
		</div>
	);
}

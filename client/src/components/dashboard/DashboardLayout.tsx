import { NavLink } from "react-router-dom";
import {
	HiHome,
	HiCalendar,
	HiUsers,
	HiViewList,
	HiCreditCard,
	HiCog,
} from "react-icons/hi";

import { IoWalletOutline } from "react-icons/io5";

interface DashboardLayoutProps {
	children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
	return (
		<div className="min-h-screen bg-[#050609] text-white">
			<div className="flex">
				{/* Sidebar */}
				<aside className="w-60 border-r border-white/10 bg-[#040508]">
					<div className="flex h-16 items-center px-6 border-b border-white/10">
						<span className="text-sm font-semibold">BasePoint</span>
					</div>

					<nav className="mt-4 space-y-1 px-3">
						{[
							{ to: "/business/dashboard", label: "Overview", icon: HiHome },
							{
								to: "/business/dashboard/calendar",
								label: "Calendar",
								icon: HiCalendar,
							},
							{
								to: "/business/dashboard/clients",
								label: "Clients",
								icon: HiUsers,
							},
							{
								to: "/business/dashboard/services",
								label: "Services",
								icon: HiViewList,
							},
							{
								to: "/business/dashboard/subscriptions",
								label: "Subscriptions",
								icon: IoWalletOutline,
							},
							{
								to: "/business/dashboard/payments",
								label: "Payments",
								icon: HiCreditCard,
							},
							{
								to: "/business/dashboard/settings",
								label: "Settings",
								icon: HiCog,
							},
						].map(({ to, label, icon: Icon }) => (
							<NavLink
								key={to}
								to={to}
								end={to === "/business/dashboard"}
								className={({ isActive }) =>
									`group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition
                  ${
										isActive
											? "bg-basepoint-teal/20 text-basepoint-teal border-l-2 border-basepoint-teal"
											: "text-gray-300 hover:bg-white/5"
									}`
								}>
								<Icon className="h-4 w-4" />
								{label}
							</NavLink>
						))}
					</nav>
				</aside>

				{/* Main content */}
				<main className="flex-1 overflow-auto">
					<div className="mx-auto max-w-6xl px-6 py-8 space-y-6">
						{children}
					</div>
				</main>
			</div>
		</div>
	);
}

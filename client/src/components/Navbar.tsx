import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";

const navItems = [
	{ label: "Find services", to: "/search" },
	{ label: "Pricing", to: "/pricing" },
	{ label: "About", to: "/about" },
];

export default function Navbar() {
	const [open, setOpen] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [role, setRole] = useState<string | null>(null);
	const navigate = useNavigate();
	const location = useLocation();

	// Re-check auth status whenever location changes
	useEffect(() => {
		const checkAuth = () => {
			const token = localStorage.getItem("token");
			const savedRole = localStorage.getItem("role");
			setIsLoggedIn(!!token);
			setRole(savedRole);
		};

		checkAuth();
	}, [location]); // Re-run when location changes

	const handleLogout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("role");
		setIsLoggedIn(false);
		setRole(null);
		navigate("/");
	};

	const dashboardLink =
		role === "business" ? "/business/dashboard" : "/customer/home";

	return (
		<nav className="sticky top-0 z-40 border-b border-slate-200/80 bg-slate-50 backdrop-blur-md">
			<div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-6">
				<div className="flex h-16 items-center justify-between">
					<Link to="/" className="flex items-center gap-3">
						<div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-600 text-sm font-black text-white shadow-sm">
							BP
						</div>
						<span className="text-lg font-semibold tracking-tight text-slate-900">
							BasePoint
						</span>
					</Link>

					<div className="hidden items-center gap-8 md:flex">
						<div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 p-1 text-sm">
							{navItems.map((item) => (
								<NavLink
									key={item.to}
									to={item.to}
									className={({ isActive }) =>
										[
											"rounded-full px-4 py-2 font-medium transition",
											isActive
												? "bg-white text-slate-900 shadow-sm"
												: "text-slate-500 hover:text-slate-900",
										].join(" ")
									}>
									{item.label}
								</NavLink>
							))}
						</div>

						<div className="flex items-center gap-3 text-sm">
							{!isLoggedIn ? (
								<>
									<Link
										to="/business/login"
										className="rounded-full px-4 py-2 font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900">
										Log in
									</Link>
									<Link
										to="/business/signup"
										className="rounded-full bg-slate-900 px-4 py-2 font-semibold text-white shadow-sm transition hover:bg-slate-800">
										Start for free
									</Link>
								</>
							) : (
								<>
									<Link
										to={dashboardLink}
										className="rounded-full px-4 py-2 font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900">
										Dashboard
									</Link>
									<button
										onClick={handleLogout}
										className="rounded-full cursor-pointer bg-slate-900 px-4 py-2 font-semibold text-white shadow-sm transition hover:bg-slate-800">
										Logout
									</button>
								</>
							)}
						</div>
					</div>

					<button
						className="inline-flex items-center justify-center rounded-xl p-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900 md:hidden"
						onClick={() => setOpen((o) => !o)}
						aria-label="Toggle navigation">
						{open ? (
							<HiOutlineX className="h-5 w-5" />
						) : (
							<HiOutlineMenu className="h-5 w-5" />
						)}
					</button>
				</div>
			</div>

			{open && (
				<div className="border-t border-slate-200 bg-white md:hidden">
					<div className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
						<div className="space-y-2">
							{navItems.map((item) => (
								<NavLink
									key={item.to}
									to={item.to}
									onClick={() => setOpen(false)}
									className={({ isActive }) =>
										[
											"block rounded-xl px-4 py-3 text-sm font-medium transition",
											isActive
												? "bg-sky-50 text-sky-700"
												: "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
										].join(" ")
									}>
									{item.label}
								</NavLink>
							))}
						</div>

						<div className="mt-4 grid grid-cols-2 gap-3">
							{!isLoggedIn ? (
								<>
									<Link
										to="/business/login"
										onClick={() => setOpen(false)}
										className="rounded-xl border border-slate-200 px-4 py-3 text-center text-sm font-medium text-slate-700 transition hover:bg-slate-50">
										Log in
									</Link>
									<Link
										to="/business/signup"
										onClick={() => setOpen(false)}
										className="rounded-xl bg-sky-600 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-sky-500">
										Start for free
									</Link>
								</>
							) : (
								<>
									<Link
										to={dashboardLink}
										onClick={() => setOpen(false)}
										className="rounded-xl bg-sky-600 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-sky-500">
										Dashboard
									</Link>
									<button
										onClick={() => {
											handleLogout();
											setOpen(false);
										}}
										className="rounded-xl border border-slate-200 px-4 py-3 text-center text-sm font-medium text-slate-700 transition hover:bg-slate-50">
										Logout
									</button>
								</>
							)}
						</div>
					</div>
				</div>
			)}
		</nav>
	);
}

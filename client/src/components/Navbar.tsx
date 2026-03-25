import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";

const navItems = [
	{ label: "Find services", to: "/search" },
	{ label: "Pricing", to: "/pricing" },
	{ label: "About", to: "/about" },
];

export default function Navbar() {
	const [open, setOpen] = useState(false);

	return (
		<nav className="sticky top-0 z-40 border-b border-white/5 bg-[#050609]/80 backdrop-blur-md">
			<div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:h-18 sm:px-6 lg:px-6">
				{/* Logo */}
				<Link to="/" className="flex items-center gap-2">
					<div className="flex h-8 w-8 items-center justify-center rounded-xl bg-linear-to-br from-basepoint-teal to-emerald-400 text-sm font-black text-white shadow-lg shadow-basepoint-teal/40">
						BP
					</div>
					<span className="text-lg font-semibold tracking-tight text-gray-100">
						BasePoint
					</span>
				</Link>

				{/* Desktop nav */}
				<div className="hidden items-center gap-6 md:flex">
					<div className="flex items-center gap-4 text-sm">
						{navItems.map((item) => (
							<NavLink
								key={item.to}
								to={item.to}
								className={({ isActive }) =>
									[
										"relative px-1 py-1 font-medium transition",
										isActive
											? "text-white"
											: "text-gray-400 hover:text-gray-100",
									].join(" ")
								}>
								{({ isActive }) => (
									<>
										<span>{item.label}</span>
										{isActive && (
											<span className="absolute -bottom-1 left-0 h-0.5 w-full rounded-full bg-linear-to-r from-basepoint-teal to-emerald-400" />
										)}
									</>
								)}
							</NavLink>
						))}
					</div>

					<div className="flex items-center gap-3 text-sm">
						<Link
							to="/business/login"
							className="rounded-lg px-3 py-2 font-medium text-gray-300 transition hover:bg-white/5 hover:text-white">
							Log in
						</Link>
						<Link
							to="/business/signup"
							className="rounded-lg bg-white px-4 py-2 font-semibold text-gray-900 shadow-sm transition hover:bg-gray-100">
							Start for free
						</Link>
					</div>
				</div>

				{/* Mobile button */}
				<button
					className="inline-flex items-center justify-center rounded-lg p-2 text-gray-300 hover:bg-white/5 md:hidden"
					onClick={() => setOpen((o) => !o)}
					aria-label="Toggle navigation">
					{open ? (
						<HiOutlineX className="h-5 w-5" />
					) : (
						<HiOutlineMenu className="h-5 w-5" />
					)}
				</button>
			</div>

			{/* Mobile menu */}
			{open && (
				<div className="border-t border-white/5 bg-[#050609] md:hidden">
					<div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4 text-sm">
						{navItems.map((item) => (
							<NavLink
								key={item.to}
								to={item.to}
								onClick={() => setOpen(false)}
								className={({ isActive }) =>
									[
										"rounded-lg px-3 py-2 font-medium transition",
										isActive
											? "bg-white/5 text-white"
											: "text-gray-300 hover:bg-white/5 hover:text-white",
									].join(" ")
								}>
								{item.label}
							</NavLink>
						))}
						<div className="mt-2 flex gap-2">
							<Link
								to="/business/login"
								onClick={() => setOpen(false)}
								className="flex-1 rounded-lg px-3 py-2 text-center font-medium text-gray-300 transition hover:bg-white/5 hover:text-white">
								Log in
							</Link>
							<Link
								to="/business/signup"
								onClick={() => setOpen(false)}
								className="flex-1 rounded-lg bg-basepoint-teal px-3 py-2 text-center font-semibold text-white transition hover:bg-teal-500">
								Start for free
							</Link>
						</div>
					</div>
				</div>
			)}
		</nav>
	);
}

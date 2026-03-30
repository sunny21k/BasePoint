import { Link } from "react-router-dom";
import { HiArrowRight, HiSearch } from "react-icons/hi";
import DashboardPreview from "./DashboardPreview";

export default function HeroSection() {
	return (
		<section className="relative overflow-hidden border-b border-slate-200 bg-white">
			<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.10),transparent_35%),radial-gradient(circle_at_top_right,rgba(14,165,233,0.08),transparent_30%)]" />
			<div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-200 to-transparent" />

			<div className="relative mx-auto max-w-6xl px-6 py-20 lg:py-28">
				<div className="grid gap-14 lg:grid-cols-[1.15fr_0.95fr] lg:items-center">
					<div>
						<p className="text-sm font-medium tracking-wide text-sky-700">
							Booking software for local service businesses
						</p>

						<h1 className="mt-4 max-w-2xl text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
							Book the right service
							<span className="text-sky-600"> faster</span>, and manage your
							business from one place.
						</h1>

						<p className="mt-5 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
							BasePoint helps customers discover trusted local services, while
							businesses manage bookings, calendars, and payments in one clean
							dashboard.
						</p>

						<div className="mt-8 max-w-xl">
							<div className="flex flex-col gap-3 sm:flex-row">
								<div className="flex flex-1 items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 shadow-sm">
									<HiSearch className="h-5 w-5 text-sky-600" />
									<input
										type="text"
										placeholder="Search businesses, services, or locations"
										className="w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
									/>
								</div>

								<Link
									to="/search"
									className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800">
									Browse services
									<HiArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
								</Link>
							</div>

							<div className="mt-4 flex flex-col gap-2 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
								<div>
									<span className="font-semibold text-sky-700">
										For customers:
									</span>{" "}
									Search and book local services.
								</div>
								<div>
									<span className="font-semibold text-emerald-700">
										For businesses:
									</span>{" "}
									<Link
										to="/business/signup"
										className="font-semibold text-slate-900 underline decoration-sky-300 underline-offset-4 hover:text-sky-700">
										Create your free business page
									</Link>
								</div>
							</div>
						</div>

						<div className="mt-7 flex flex-wrap items-center gap-4 text-sm text-slate-500">
							<span>
								<span className="font-semibold text-slate-900">4.9/5</span>{" "}
								rating from 200+ businesses
							</span>
							<span className="hidden h-1 w-1 rounded-full bg-slate-300 sm:inline-block" />
							<span>Thousands of bookings processed monthly</span>
						</div>
					</div>

					<div className="relative">
						<div className="absolute -inset-4 rounded-[2rem] bg-sky-100/50 blur-2xl" />
						<div className="relative rounded-[2rem] border border-slate-200 bg-white p-4 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
							<DashboardPreview />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

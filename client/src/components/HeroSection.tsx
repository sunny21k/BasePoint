import { Link } from "react-router-dom";
import { HiArrowRight, HiSearch, HiSparkles } from "react-icons/hi";
import DashboardPreview from "./DashboardPreview";

export default function HeroSection() {
	return (
		<section className="relative border-b border-white/5">
			{/* Soft gradient wash */}
			<div className="pointer-events-none absolute inset-0 bg-linear-to-b from-basepoint-teal/15 via-transparent to-transparent" />

			{/* Subtle grid background */}
			<div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.07] mix-blend-screen bg-[linear-gradient(to_right,rgba(148,163,184,0.25)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.25)_1px,transparent_1px)] bg-size-[26px_26px]" />

			<div className="relative mx-auto max-w-6xl px-6 pt-20 pb-16 lg:pt-28 lg:pb-20">
				<div className="inline-flex flex-col gap-1">
					<div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-wide text-teal-300">
						<span className="h-px w-5 rounded-full bg-teal-300/60" />
						<span>Built for customers and businesses</span>
					</div>
					<p className="text-xs text-gray-400 sm:text-[13px]">
						Search for services or run your own booking page in one place.
					</p>
				</div>

				<div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,3fr),minmax(0,2fr)] lg:items-center">
					{/* Left copy */}
					<div>
						<h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
							Find the right{" "}
							<span className="bg-linear-to-r from-teal-300 via-emerald-300 to-cyan-300 bg-clip-text text-transparent">
								service
							</span>{" "}
							or run yours
							<br />
							from one clean dashboard.
						</h1>

						<p className="mt-4 max-w-xl text-sm text-gray-300 sm:text-lg">
							Customers use BasePoint to book trusted barbers, salons, trainers,
							and more. Businesses use it to keep calendars full and payments
							smooth, without juggling multiple tools.
						</p>

						{/* Search area */}
						<div className="mt-8 max-w-xl space-y-3">
							<div className="flex flex-col gap-3 sm:flex-row">
								{/* Search input */}
								<div className="flex-1 rounded-2xl border border-white/15 bg-black/40 px-4 py-3 text-base shadow-md backdrop-blur">
									<div className="flex items-center gap-3">
										<HiSearch className="h-5 w-5 text-basepoint-teal" />
										<input
											type="text"
											placeholder="Search businesses, services, or locations"
											className="w-full bg-transparent text-sm sm:text-base text-gray-100 placeholder:text-gray-500 focus:outline-none"
										/>
									</div>
								</div>

								{/* Browse button */}
								<Link
									to="/search"
									className="group inline-flex flex-none items-center justify-center gap-2 rounded-2xl border border-white/40 bg-basepoint-teal px-6 py-3.5 text-sm sm:text-base font-semibold text-white shadow-md shadow-basepoint-teal/40 transition hover:bg-teal-500 hover:border-white/60">
									Browse services
									<HiArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
								</Link>
							</div>

							{/* Dual hero CTAs */}
							<div className="flex flex-col gap-2 text-xs text-gray-400 sm:flex-row sm:items-center sm:justify-between">
								<div>
									<span className="font-semibold text-teal-300">
										For customers:
									</span>{" "}
									Start by browsing and booking local services.
								</div>
								<div>
									<span className="font-semibold text-emerald-300">
										For businesses:
									</span>{" "}
									<Link
										to="/business/signup"
										className="font-semibold text-emerald-300 underline-offset-2 hover:text-emerald-200 hover:underline">
										Create your free BasePoint business
									</Link>
									.
								</div>
							</div>
						</div>

						{/* Social proof */}
						<div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-gray-500">
							<div className="flex items-center gap-1.5">
								<HiSparkles className="h-4 w-4 text-basepoint-teal" />
								<span>
									4.9 / 5 rating from{" "}
									<span className="text-teal-300">200+ local businesses</span>
								</span>
							</div>
							<span className="hidden h-1 w-1 rounded-full bg-gray-600 sm:inline-block" />
							<span>
								<span className="text-emerald-300">Thousands of bookings</span>{" "}
								processed every month
							</span>
						</div>
					</div>

					{/* Right dashboard preview */}
					<DashboardPreview />
				</div>
			</div>
		</section>
	);
}

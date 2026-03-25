import { Link } from "react-router-dom";
import {
	HiArrowRight,
	HiCalendar,
	HiUsers,
	HiCreditCard,
} from "react-icons/hi";

export default function FeaturesSection() {
	return (
		<section className="border-b border-white/5 py-16 lg:py-20">
			<div className="mx-auto max-w-6xl px-6">
				<div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
					<div>
						<h2 className="text-2xl font-semibold sm:text-3xl">
							One platform for{" "}
							<span className="text-teal-300">people booking</span> and{" "}
							<span className="text-emerald-300">people running the show</span>.
						</h2>
						<p className="mt-2 max-w-xl text-sm text-gray-400 sm:text-base">
							Whether you&apos;re finding your next appointment or filling your
							calendar, BasePoint keeps everything simple and in sync.
						</p>
					</div>
				</div>

				{/* Two-column card */}
				<div className="mt-8 grid gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 text-sm sm:grid-cols-2">
					<div className="border-b border-white/10 pb-4 sm:border-b-0 sm:border-r sm:pr-5">
						<p className="text-xs font-semibold uppercase tracking-wide text-teal-300">
							For customers
						</p>
						<h3 className="mt-2 text-base font-semibold text-white">
							I want to book services.
						</h3>
						<p className="mt-2 text-xs text-gray-400 sm:text-sm">
							Search by service or location, see real availability, and confirm
							your appointment in a few taps.
						</p>
						<Link
							to="/search"
							className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-teal-300 underline-offset-2 hover:text-teal-200 hover:underline">
							Start browsing services
							<HiArrowRight className="h-3 w-3" />
						</Link>
					</div>
					<div className="pt-4 sm:pl-5 sm:pt-0">
						<p className="text-xs font-semibold uppercase tracking-wide text-emerald-300">
							For businesses
						</p>
						<h3 className="mt-2 text-base font-semibold text-white">
							I want to manage my bookings.
						</h3>
						<p className="mt-2 text-xs text-gray-400 sm:text-sm">
							Create a simple booking page, connect payments, and let BasePoint
							keep your schedule organized.
						</p>
						<Link
							to="/business/signup"
							className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-emerald-300 underline-offset-2 hover:text-emerald-200 hover:underline">
							Create my free business page
							<HiArrowRight className="h-3 w-3" />
						</Link>
					</div>
				</div>

				{/* Stats strip */}
				<div className="mt-6 grid gap-3 text-xs text-gray-300 sm:grid-cols-3">
					<div className="rounded-xl border border-white/5 bg-white/5 px-4 py-3">
						<p className="text-gray-400">Bookings every month</p>
						<p className="mt-1 text-lg font-semibold text-teal-300">10,000+</p>
					</div>
					<div className="rounded-xl border border-white/5 bg-white/5 px-4 py-3">
						<p className="text-gray-400">Businesses using BasePoint</p>
						<p className="mt-1 text-lg font-semibold text-emerald-300">200+</p>
					</div>
					<div className="rounded-xl border border-white/5 bg-white/5 px-4 py-3">
						<p className="text-gray-400">Average rating</p>
						<p className="mt-1 text-lg font-semibold text-teal-200">4.9 / 5</p>
					</div>
				</div>

				{/* Feature cards */}
				<div className="mt-10 grid gap-8 md:grid-cols-3">
					<div className="rounded-2xl border border-white/10 bg-white/5 p-5">
						<div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-basepoint-teal/15">
							<HiCalendar className="h-5 w-5 text-basepoint-teal" />
						</div>
						<h3 className="text-base font-semibold">
							Scheduling that runs itself
						</h3>
						<p className="mt-2 text-sm text-gray-400">
							Clients book themselves 24/7, you get a clean calendar, automatic
							reminders, and fewer no‑shows.
						</p>
					</div>

					<div className="rounded-2xl border border-white/10 bg-white/5 p-5">
						<div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-basepoint-teal/15">
							<HiUsers className="h-5 w-5 text-basepoint-teal" />
						</div>
						<h3 className="text-base font-semibold">Clear client history</h3>
						<p className="mt-2 text-sm text-gray-400">
							See notes, visit history, and preferences at a glance so every
							appointment feels personal, not rushed.
						</p>
					</div>

					<div className="rounded-2xl border border-white/10 bg-white/5 p-5">
						<div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-basepoint-teal/15">
							<HiCreditCard className="h-5 w-5 text-basepoint-teal" />
						</div>
						<h3 className="text-base font-semibold">Payments built‑in</h3>
						<p className="mt-2 text-sm text-gray-400">
							Take deposits, charge no‑show fees, and get payouts via Stripe
							straight to your account—usually the next business day.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}

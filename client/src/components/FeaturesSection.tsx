import { Link } from "react-router-dom";
import {
	HiArrowRight,
	HiCalendar,
	HiUsers,
	HiCreditCard,
} from "react-icons/hi";

export default function FeaturesSection() {
	return (
		<section className="border-b border-slate-200 bg-gray-100 py-16 lg:py-20">
			<div className="mx-auto max-w-6xl px-6">
				<div className="max-w-2xl">
					<h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
						One platform for people booking and people running the show.
					</h2>
					<p className="mt-2 max-w-xl text-sm text-slate-600 sm:text-base">
						Whether you&apos;re finding your next appointment or filling your
						calendar, BasePoint keeps everything simple and in sync.
					</p>
				</div>

				<div className="mt-8 grid gap-4 md:grid-cols-2">
					<div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6 shadow-sm">
						<p className="text-sm font-medium text-sky-700">For customers</p>
						<h3 className="mt-2 text-xl font-semibold text-slate-900">
							Book the right service with less effort.
						</h3>
						<p className="mt-2 text-sm leading-6 text-slate-600">
							Search by service or location, see real availability, and confirm
							your appointment in a few taps.
						</p>
						<Link
							to="/search"
							className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-sky-700 hover:text-sky-800">
							Start browsing services
							<HiArrowRight className="h-4 w-4" />
						</Link>
					</div>

					<div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6 shadow-sm">
						<p className="text-sm font-medium text-emerald-700">
							For businesses
						</p>
						<h3 className="mt-2 text-xl font-semibold text-slate-900">
							Keep bookings organized and payments in sync.
						</h3>
						<p className="mt-2 text-sm leading-6 text-slate-600">
							Create a simple booking page, connect payments, and let BasePoint
							handle the busy work.
						</p>
						<Link
							to="/business/signup"
							className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:text-emerald-800">
							Create my free business page
							<HiArrowRight className="h-4 w-4" />
						</Link>
					</div>
				</div>

				<div className="mt-6 grid gap-3 sm:grid-cols-3">
					<div className="rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-sm">
						<p className="text-sm text-slate-500">Bookings every month</p>
						<p className="mt-1 text-2xl font-semibold text-slate-900">
							10,000+
						</p>
					</div>
					<div className="rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-sm">
						<p className="text-sm text-slate-500">Businesses using BasePoint</p>
						<p className="mt-1 text-2xl font-semibold text-slate-900">200+</p>
					</div>
					<div className="rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-sm">
						<p className="text-sm text-slate-500">Average rating</p>
						<p className="mt-1 text-2xl font-semibold text-slate-900">
							4.9 / 5
						</p>
					</div>
				</div>

				<div className="mt-10 grid gap-6 md:grid-cols-3">
					<div className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm">
						<div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-100 text-sky-700">
							<HiCalendar className="h-5 w-5" />
						</div>
						<h3 className="mt-4 text-base font-semibold text-slate-900">
							Scheduling that runs itself
						</h3>
						<p className="mt-2 text-sm leading-6 text-slate-600">
							Clients book themselves 24/7, you get a clean calendar, automatic
							reminders, and fewer no-shows.
						</p>
					</div>

					<div className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm">
						<div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
							<HiUsers className="h-5 w-5" />
						</div>
						<h3 className="mt-4 text-base font-semibold text-slate-900">
							Clear client history
						</h3>
						<p className="mt-2 text-sm leading-6 text-slate-600">
							See notes, visit history, and preferences at a glance so every
							appointment feels personal.
						</p>
					</div>

					<div className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm">
						<div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-100 text-sky-700">
							<HiCreditCard className="h-5 w-5" />
						</div>
						<h3 className="mt-4 text-base font-semibold text-slate-900">
							Payments built in
						</h3>
						<p className="mt-2 text-sm leading-6 text-slate-600">
							Take deposits, charge no-show fees, and get payouts via Stripe
							straight to your account.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}

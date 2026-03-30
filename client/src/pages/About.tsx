import {
	HiSparkles,
	HiShieldCheck,
	HiUserGroup,
	HiClock,
	HiCreditCard,
	HiCalendar,
} from "react-icons/hi";

export default function AboutPage() {
	return (
		<div className="bg-sky-50 text-slate-900">
			<section className="border-b border-slate-200 bg-white">
				<div className="mx-auto max-w-6xl px-6 py-20 lg:py-24">
					<div className="max-w-4xl">
						<p className="text-sm font-medium tracking-wide text-sky-700">
							About BasePoint
						</p>
						<h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
							We&apos;re building the easiest way for local services to get
							booked.
						</h1>
						<p className="mt-6 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
							BasePoint started with a simple idea: booking a service should
							feel as easy as ordering anything else online. Too many businesses
							still rely on text messages, spreadsheets, scattered calendars,
							and manual follow-ups, while customers are left trying to figure
							out availability, pricing, and payment with too much friction.
						</p>
						<p className="mt-4 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
							We built BasePoint to bring both sides into one clean system.
							Customers can discover trusted local services, book in a few
							clicks, and get reminders that keep everything on track.
							Businesses can manage schedules, payments, and clients without
							bouncing between multiple apps.
						</p>
					</div>

					<div className="mt-10 grid gap-4 sm:grid-cols-3">
						<div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
							<p className="text-sm text-slate-500">Businesses supported</p>
							<p className="mt-2 text-3xl font-semibold text-slate-900">200+</p>
						</div>
						<div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
							<p className="text-sm text-slate-500">Monthly bookings</p>
							<p className="mt-2 text-3xl font-semibold text-slate-900">10k+</p>
						</div>
						<div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
							<p className="text-sm text-slate-500">Average rating</p>
							<p className="mt-2 text-3xl font-semibold text-slate-900">
								4.9/5
							</p>
						</div>
					</div>
				</div>
			</section>

			<section className="border-b border-slate-200 py-16 lg:py-20">
				<div className="mx-auto max-w-6xl px-6">
					<div className="max-w-3xl">
						<p className="text-sm font-medium text-sky-700">
							Why we built BasePoint
						</p>
						<h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
							The booking experience was overdue for a reset.
						</h2>
						<p className="mt-4 text-base leading-7 text-slate-600">
							Most booking tools are built around software, not people. They
							make businesses adapt to complicated systems and make customers
							work too hard just to reserve a time. We wanted something simpler:
							a platform that feels obvious from the first click and useful
							every day after that.
						</p>
						<p className="mt-4 text-base leading-7 text-slate-600">
							That means clean interfaces, clear availability, simple payments,
							and reminders that reduce no-shows without adding more admin work.
							It also means building a product that works just as well for a
							barber, a salon, a trainer, a studio, or any service-based
							business that needs a dependable booking flow.
						</p>
					</div>

					<div className="mt-10 grid gap-6 md:grid-cols-3">
						<div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
							<div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-100 text-sky-700">
								<HiSparkles className="h-5 w-5" />
							</div>
							<h3 className="mt-4 text-lg font-semibold text-slate-900">
								Simplicity first
							</h3>
							<p className="mt-2 text-sm leading-6 text-slate-600">
								Every screen is designed to be clear, fast, and easy to
								understand without training.
							</p>
						</div>

						<div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
							<div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
								<HiShieldCheck className="h-5 w-5" />
							</div>
							<h3 className="mt-4 text-lg font-semibold text-slate-900">
								Trust built in
							</h3>
							<p className="mt-2 text-sm leading-6 text-slate-600">
								Customers need confidence, and businesses need reliability.
								BasePoint is designed to support both.
							</p>
						</div>

						<div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
							<div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-100 text-sky-700">
								<HiClock className="h-5 w-5" />
							</div>
							<h3 className="mt-4 text-lg font-semibold text-slate-900">
								Less busy work
							</h3>
							<p className="mt-2 text-sm leading-6 text-slate-600">
								Reminders, scheduling, and payment handling should happen in the
								background, not dominate your day.
							</p>
						</div>
					</div>
				</div>
			</section>

			<section className="border-b border-slate-200 bg-white py-16 lg:py-20">
				<div className="mx-auto max-w-6xl px-6">
					<div className="max-w-3xl">
						<p className="text-sm font-medium text-sky-700">Our mission</p>
						<h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
							Make local booking feel modern, simple, and dependable.
						</h2>
						<p className="mt-4 text-base leading-7 text-slate-600">
							Our mission is to help service businesses grow without making them
							become software experts. We want to give them the tools to stay
							organized, look professional, and keep more of their time focused
							on the work they actually do.
						</p>
						<p className="mt-4 text-base leading-7 text-slate-600">
							For customers, that means a booking experience that feels smooth
							and trustworthy. For businesses, it means fewer no-shows, better
							visibility, and a system that helps the schedule stay full without
							more overhead.
						</p>
					</div>

					<div className="mt-10 grid gap-4 md:grid-cols-2">
						<div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6 shadow-sm">
							<p className="text-sm font-medium text-emerald-700">
								What we care about
							</p>
							<ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
								<li>• Making booking feel quick and clear.</li>
								<li>• Helping businesses stay organized with less stress.</li>
								<li>
									• Creating a product that feels friendly, not complicated.
								</li>
								<li>
									• Supporting local service providers with tools that actually
									help them grow.
								</li>
							</ul>
						</div>

						<div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6 shadow-sm">
							<p className="text-sm font-medium text-emerald-700">
								What success looks like
							</p>
							<ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
								<li>• Customers book in fewer clicks.</li>
								<li>• Businesses spend less time on admin.</li>
								<li>• Calendars stay full and easy to manage.</li>
								<li>
									• Everyone gets a smoother experience from start to finish.
								</li>
							</ul>
						</div>
					</div>
				</div>
			</section>

			<section className="border-b border-slate-200 py-16 lg:py-20">
				<div className="mx-auto max-w-6xl px-6">
					<div className="grid gap-8 lg:grid-cols-2">
						<div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
							<p className="text-sm font-medium text-sky-700">
								How we think about product
							</p>
							<h3 className="mt-3 text-xl font-semibold text-slate-900">
								Good software should disappear into the background.
							</h3>
							<p className="mt-4 text-sm leading-6 text-slate-600">
								When people open BasePoint, they should immediately understand
								what to do next. The product should guide them without getting
								in the way. That means fewer unnecessary steps, stronger visual
								hierarchy, and just enough detail to make each action feel
								confident.
							</p>
							<p className="mt-4 text-sm leading-6 text-slate-600">
								We like interfaces that feel calm. Not empty, not flashy, just
								clear. If a user can understand the value in a few seconds, then
								the design is doing its job.
							</p>
						</div>

						<div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
							<p className="text-sm font-medium text-sky-700">
								Who it&apos;s for
							</p>
							<h3 className="mt-3 text-xl font-semibold text-slate-900">
								Built for real service businesses.
							</h3>
							<div className="mt-5 space-y-4">
								{[
									{
										title: "Barbers and salons",
										desc: "Keep chairs full, reduce no-shows, and make bookings feel polished.",
									},
									{
										title: "Fitness and wellness",
										desc: "Manage sessions, class schedules, and recurring appointments in one place.",
									},
									{
										title: "Trainers and specialists",
										desc: "Let clients self-book while you keep your calendar organized.",
									},
									{
										title: "Any service-first business",
										desc: "If your business depends on appointments, BasePoint should help make it easier.",
									},
								].map((item) => (
									<div
										key={item.title}
										className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
										<p className="font-medium text-slate-900">{item.title}</p>
										<p className="mt-1 text-sm leading-6 text-slate-600">
											{item.desc}
										</p>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="border-b border-slate-200 bg-slate-50 py-16 lg:py-20">
				<div className="mx-auto max-w-6xl px-6">
					<div className="max-w-3xl">
						<p className="text-sm font-medium text-sky-700">Our values</p>
						<h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
							The product is guided by a few simple values.
						</h2>
					</div>

					<div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
						<div className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
							<h3 className="text-base font-semibold text-slate-900">
								Clarity
							</h3>
							<p className="mt-2 text-sm leading-6 text-slate-600">
								Make it obvious what to do next.
							</p>
						</div>
						<div className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
							<h3 className="text-base font-semibold text-slate-900">
								Reliability
							</h3>
							<p className="mt-2 text-sm leading-6 text-slate-600">
								Build systems people can count on.
							</p>
						</div>
						<div className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
							<h3 className="text-base font-semibold text-slate-900">
								Respect
							</h3>
							<p className="mt-2 text-sm leading-6 text-slate-600">
								Save time for customers and business owners alike.
							</p>
						</div>
						<div className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
							<h3 className="text-base font-semibold text-slate-900">
								Momentum
							</h3>
							<p className="mt-2 text-sm leading-6 text-slate-600">
								Help businesses stay busy without adding complexity.
							</p>
						</div>
					</div>
				</div>
			</section>

			<section className="border-b border-slate-200 py-16 lg:py-20">
				<div className="mx-auto max-w-6xl px-6">
					<div className="grid gap-8 lg:grid-cols-2 lg:items-center">
						<div>
							<p className="text-sm font-medium text-sky-700">Growth so far</p>
							<h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
								We&apos;re still early, and that&apos;s part of the opportunity.
							</h2>
							<p className="mt-4 text-base leading-7 text-slate-600">
								BasePoint is growing with feedback from local business owners
								who want something simpler than the tools they&apos;ve been
								forced to use. Every improvement is focused on making the core
								workflow easier: get discovered, get booked, get paid, and stay
								organized.
							</p>
							<p className="mt-4 text-base leading-7 text-slate-600">
								We care less about looking like a giant platform and more about
								becoming the tool people actually prefer to use every day.
							</p>
						</div>

						<div className="grid gap-4 sm:grid-cols-2">
							<div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
								<div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-100 text-sky-700">
									<HiCalendar className="h-5 w-5" />
								</div>
								<h3 className="mt-4 text-lg font-semibold text-slate-900">
									Easy scheduling
								</h3>
								<p className="mt-2 text-sm leading-6 text-slate-600">
									Booking should stay simple for everyone involved.
								</p>
							</div>

							<div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
								<div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
									<HiCreditCard className="h-5 w-5" />
								</div>
								<h3 className="mt-4 text-lg font-semibold text-slate-900">
									Payments built in
								</h3>
								<p className="mt-2 text-sm leading-6 text-slate-600">
									Make deposits and payouts feel effortless.
								</p>
							</div>

							<div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
								<div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-100 text-sky-700">
									<HiUserGroup className="h-5 w-5" />
								</div>
								<h3 className="mt-4 text-lg font-semibold text-slate-900">
									Built for teams
								</h3>
								<p className="mt-2 text-sm leading-6 text-slate-600">
									Designed for businesses with more than one moving part.
								</p>
							</div>

							<div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
								<div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
									<HiShieldCheck className="h-5 w-5" />
								</div>
								<h3 className="mt-4 text-lg font-semibold text-slate-900">
									Built to feel trustworthy
								</h3>
								<p className="mt-2 text-sm leading-6 text-slate-600">
									Customers should feel confident before they ever book.
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}

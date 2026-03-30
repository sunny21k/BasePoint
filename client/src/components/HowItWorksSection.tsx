export default function HowItWorksSection() {
	return (
		<section className="border-b border-slate-200 bg-slate-100 py-16 lg:py-20">
			<div className="mx-auto max-w-6xl px-6 space-y-12">
				<div className="max-w-2xl">
					<h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
						How BasePoint works
					</h2>
					<p className="mt-2 text-sm text-slate-600 sm:text-base">
						Two simple flows: one for people booking services, and one for the
						people running them.
					</p>
				</div>

				<div className="grid gap-8 lg:grid-cols-2">
					<div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6 shadow-sm">
						<p className="text-xs font-medium tracking-wide text-sky-700">
							For customers
						</p>
						<h3 className="mt-2 text-xl font-semibold text-slate-900">
							Find what you need and book in a few taps.
						</h3>
						<p className="mt-2 text-sm leading-6 text-slate-600">
							Search, pick a time, and get reminders so you never miss an
							appointment.
						</p>

						<div className="mt-6 space-y-4">
							{[
								{
									num: "1",
									title: "Search",
									desc: "Browse by service, location, or business name to find what fits you best.",
								},
								{
									num: "2",
									title: "Book",
									desc: "Pick a time that works, confirm in seconds, and pay online when it’s offered.",
								},
								{
									num: "3",
									title: "Show up",
									desc: "Get reminders ahead of time so you stay on schedule, then just show up and enjoy the service.",
								},
							].map((step) => (
								<div key={step.num} className="flex gap-4">
									<div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sky-100 text-xs font-semibold text-sky-700">
										{step.num}
									</div>
									<div>
										<h4 className="text-sm font-semibold text-slate-900">
											{step.title}
										</h4>
										<p className="text-sm leading-6 text-slate-600">
											{step.desc}
										</p>
									</div>
								</div>
							))}
						</div>
					</div>

					<div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6 shadow-sm">
						<p className="text-xs font-medium tracking-wide text-emerald-700">
							For businesses
						</p>
						<h3 className="mt-2 text-xl font-semibold text-slate-900">
							Set it up once, let BasePoint handle the busy work.
						</h3>
						<p className="mt-2 text-sm leading-6 text-slate-600">
							Create your page, share the link, and let bookings and payments
							run in the background.
						</p>

						<div className="mt-6 space-y-4">
							{[
								{
									num: "1",
									title: "Create your page",
									desc: "Add your services, availability, and pricing. Connect Stripe to get paid online.",
								},
								{
									num: "2",
									title: "Share your link",
									desc: "Drop your BasePoint link in your bio, website, or QR code so clients can book themselves.",
								},
								{
									num: "3",
									title: "Get booked & paid",
									desc: "Watch your schedule stay organized while payments and reminders are handled automatically.",
								},
							].map((step) => (
								<div key={step.num} className="flex gap-4">
									<div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-semibold text-emerald-700">
										{step.num}
									</div>
									<div>
										<h4 className="text-sm font-semibold text-slate-900">
											{step.title}
										</h4>
										<p className="text-sm leading-6 text-slate-600">
											{step.desc}
										</p>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

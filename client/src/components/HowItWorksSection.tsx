export default function HowItWorksSection() {
	return (
		<section className="border-b border-white/5 py-16 lg:py-20">
			<div className="mx-auto max-w-6xl px-6 space-y-12">
				{/* Section header */}
				<div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
					<div>
						<h2 className="text-2xl font-semibold sm:text-3xl">
							How BasePoint works
						</h2>
						<p className="mt-2 max-w-xl text-sm text-gray-400 sm:text-base">
							Two simple flows. One for people booking services, one for the
							people running them.
						</p>
					</div>
				</div>

				<div className="grid gap-8 lg:grid-cols-2">
					{/* Customers track */}
					<div className="rounded-2xl border border-white/10 bg-white/5 p-6">
						<p className="text-xs font-semibold uppercase tracking-wide text-teal-300">
							For customers
						</p>
						<h3 className="mt-2 text-lg font-semibold text-white sm:text-xl">
							Find what you need, book in a few taps.
						</h3>
						<p className="mt-2 text-sm text-gray-400">
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
									desc: "Pick a time that works, confirm in seconds, and pay online when it's offered.",
								},
								{
									num: "3",
									title: "Show up",
									desc: "Get reminders ahead of time so you don't forget, then just show up and enjoy the service.",
								},
							].map((step) => (
								<div key={step.num} className="flex gap-3">
									<div className="flex h-7 w-7 items-center justify-center rounded-full bg-basepoint-teal/15 text-xs font-semibold text-basepoint-teal">
										{step.num}
									</div>
									<div>
										<h4 className="text-sm font-semibold text-white">
											{step.title}
										</h4>
										<p className="text-xs text-gray-400 sm:text-sm">
											{step.desc}
										</p>
									</div>
								</div>
							))}
						</div>
					</div>

					{/* Businesses track */}
					<div className="rounded-2xl border border-white/10 bg-white/5 p-6">
						<p className="text-xs font-semibold uppercase tracking-wide text-emerald-300">
							For businesses
						</p>
						<h3 className="mt-2 text-lg font-semibold text-white sm:text-xl">
							Set it up once, let BasePoint handle the busy work.
						</h3>
						<p className="mt-2 text-sm text-gray-400">
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
									desc: "Watch your schedule stay organized while payments and reminders are handled automatically for you.",
								},
							].map((step) => (
								<div key={step.num} className="flex gap-3">
									<div className="flex h-7 w-7 items-center justify-center rounded-full bg-basepoint-teal/15 text-xs font-semibold text-basepoint-teal">
										{step.num}
									</div>
									<div>
										<h4 className="text-sm font-semibold text-white">
											{step.title}
										</h4>
										<p className="text-xs text-gray-400 sm:text-sm">
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

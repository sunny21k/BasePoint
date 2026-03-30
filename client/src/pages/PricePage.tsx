import { Link } from "react-router-dom";
import { HiCheck } from "react-icons/hi";

const plans = [
	{
		name: "Starter",
		price: "$0",
		description: "Best for trying BasePoint and getting your first bookings.",
		features: [
			"Basic booking page",
			"Unlimited services",
			"Customer booking links",
			"Email notifications",
		],
		buttonLabel: "Get started",
		highlighted: false,
	},
	{
		name: "Growth",
		price: "$29",
		description: "For businesses that want to stay booked and organized.",
		features: [
			"Everything in Starter",
			"Online payments",
			"Calendar management",
			"Automated reminders",
			"Client history",
		],
		buttonLabel: "Start free trial",
		highlighted: true,
	},
	{
		name: "Pro",
		price: "$59",
		description: "For teams and high-volume businesses that need more control.",
		features: [
			"Everything in Growth",
			"Multiple staff members",
			"Advanced reporting",
			"Priority support",
			"Custom booking settings",
		],
		buttonLabel: "Contact sales",
		highlighted: false,
	},
];

export default function PricePage() {
	return (
		<div className="bg-sky-50 text-slate-900">
			<section className="border-b border-slate-200 bg-white">
				<div className="mx-auto max-w-6xl px-6 py-20 lg:py-24 text-center">
					<p className="text-sm font-medium tracking-wide text-sky-700">
						Pricing
					</p>
					<h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
						Simple pricing that grows with your business.
					</h1>
					<p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
						Start free, upgrade when you need more, and only pay for the tools
						that help your business stay booked and organized.
					</p>

					<div className="mt-8 flex items-center justify-center gap-3 text-sm text-slate-600">
						<span className="rounded-full bg-sky-50 px-3 py-1 font-medium text-sky-700">
							No setup fees
						</span>
						<span className="rounded-full bg-emerald-50 px-3 py-1 font-medium text-emerald-700">
							Cancel anytime
						</span>
						<span className="rounded-full bg-slate-100 px-3 py-1 font-medium text-slate-700">
							Built for local services
						</span>
					</div>
				</div>
			</section>

			<section className="py-16 lg:py-20">
				<div className="mx-auto max-w-6xl px-6">
					<div className="grid gap-6 lg:grid-cols-3">
						{plans.map((plan) => (
							<div
								key={plan.name}
								className={`rounded-[1.75rem] border p-6 shadow-sm transition ${
									plan.highlighted
										? "border-sky-300 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)]"
										: "border-slate-200 bg-white"
								}`}>
								{plan.highlighted && (
									<p className="mb-4 inline-flex rounded-full bg-sky-50 px-3 py-1 text-xs font-medium text-sky-700">
										Most popular
									</p>
								)}

								<h2 className="text-xl font-semibold text-slate-900">
									{plan.name}
								</h2>
								<p className="mt-2 text-sm leading-6 text-slate-600">
									{plan.description}
								</p>

								<div className="mt-6 flex items-end gap-1">
									<span className="text-4xl font-semibold tracking-tight text-slate-900">
										{plan.price}
									</span>
									<span className="pb-1 text-sm text-slate-500">/month</span>
								</div>

								<Link
									to={
										plan.name === "Starter"
											? "/business/signup"
											: "/business/signup"
									}
									className={`mt-6 inline-flex w-full cursor-pointer items-center justify-center rounded-2xl px-4 py-3 text-sm font-semibold transition ${
										plan.highlighted
											? "bg-slate-900 text-white hover:bg-slate-800"
											: "border border-slate-200 bg-white text-slate-900 hover:bg-slate-50"
									}`}>
									{plan.buttonLabel}
								</Link>

								<div className="mt-6 space-y-3">
									{plan.features.map((feature) => (
										<div
											key={feature}
											className="flex items-start gap-3 text-sm text-slate-600">
											<HiCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
											<span>{feature}</span>
										</div>
									))}
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			<section className="border-t border-slate-200 bg-white py-16">
				<div className="mx-auto max-w-4xl px-6">
					<h2 className="text-2xl font-semibold tracking-tight text-slate-900">
						Frequently asked questions
					</h2>
					<div className="mt-6 space-y-4">
						<div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
							<p className="font-medium text-slate-900">Can I start free?</p>
							<p className="mt-2 text-sm leading-6 text-slate-600">
								Yes. You can start on the free plan and upgrade whenever you
								need more features.
							</p>
						</div>
						<div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
							<p className="font-medium text-slate-900">
								Do you charge setup fees?
							</p>
							<p className="mt-2 text-sm leading-6 text-slate-600">
								No setup fees. You only pay for the plan that fits your
								business.
							</p>
						</div>
						<div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
							<p className="font-medium text-slate-900">
								Can I cancel anytime?
							</p>
							<p className="mt-2 text-sm leading-6 text-slate-600">
								Yes. You can change or cancel your plan whenever you need to.
							</p>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}

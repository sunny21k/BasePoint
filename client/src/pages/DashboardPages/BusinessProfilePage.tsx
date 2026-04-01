import { useState } from "react";
import { Link } from "react-router-dom";
import {
	FiMapPin,
	FiGlobe,
	FiPhone,
	FiMail,
	FiClock,
	FiEdit3,
	FiCheckCircle,
	FiStar,
	FiImage,
} from "react-icons/fi";

export default function BusinessProfilePage() {
	const [business, setBusiness] = useState({
		name: "BasePoint Salon",
		status: "Approved",
		owner: "Jane Doe",
		email: "jane@basepoint.com",
		phone: "(555) 123-4567",
		address: "123 Main St, New York, NY",
		website: "https://instagram.com/basepointsalon",
		hours: "Mon-Sat, 9:00 AM - 7:00 PM",
		rating: "4.9",
		reviews: "128",
		description:
			"A modern salon offering premium haircuts, styling, color, and beauty services for everyday clients and special events.",
		services: ["Haircuts", "Styling", "Color", "Bridal", "Treatments"],
	});

	return (
		<div className="min-h-screen bg-sky-50 px-4 py-10 text-slate-900 sm:px-6 lg:px-8">
			<div className="mx-auto max-w-7xl">
				<div className="mb-6 flex items-center justify-between">
					<Link
						to="/business/dashboard"
						className="text-sm font-semibold text-sky-700 hover:text-sky-800">
						← Back to dashboard
					</Link>
					<button className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800">
						<FiEdit3 className="h-4 w-4" />
						Edit business
					</button>
				</div>

				<div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
					<div className="space-y-8">
						<div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
							<div className="h-56 bg-[radial-gradient(circle_at_top,rgba(125,211,252,0.6),transparent_40%),linear-gradient(135deg,rgba(15,23,42,0.92),rgba(2,132,199,0.78))] p-6 sm:p-8">
								<div className="flex h-full flex-col justify-between">
									<div className="flex items-center gap-2">
										<span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white backdrop-blur">
											<FiCheckCircle className="h-4 w-4 text-emerald-300" />
											{business.status}
										</span>
									</div>

									<div className="max-w-2xl text-white">
										<h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
											{business.name}
										</h1>
										<p className="mt-3 text-sm leading-6 text-white/85 sm:text-base">
											{business.description}
										</p>
									</div>
								</div>
							</div>

							<div className="grid gap-4 p-6 sm:grid-cols-3">
								<div className="rounded-2xl bg-slate-50 p-4">
									<div className="flex items-center gap-2 text-slate-500">
										<FiStar className="h-4 w-4 text-amber-500" />
										<span className="text-xs font-medium uppercase tracking-wide">
											Rating
										</span>
									</div>
									<p className="mt-2 text-2xl font-bold text-slate-900">
										{business.rating}
									</p>
									<p className="text-sm text-slate-500">
										{business.reviews} reviews
									</p>
								</div>
								<div className="rounded-2xl bg-slate-50 p-4">
									<div className="flex items-center gap-2 text-slate-500">
										<FiClock className="h-4 w-4 text-sky-600" />
										<span className="text-xs font-medium uppercase tracking-wide">
											Hours
										</span>
									</div>
									<p className="mt-2 text-lg font-semibold text-slate-900">
										{business.hours}
									</p>
								</div>
								<div className="rounded-2xl bg-slate-50 p-4">
									<div className="flex items-center gap-2 text-slate-500">
										<FiMapPin className="h-4 w-4 text-sky-600" />
										<span className="text-xs font-medium uppercase tracking-wide">
											Location
										</span>
									</div>
									<p className="mt-2 text-lg font-semibold text-slate-900">
										New York
									</p>
									<p className="text-sm text-slate-500">Verified listing</p>
								</div>
							</div>
						</div>

						<div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
							<div className="flex items-center gap-3">
								<div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-100 text-sky-700">
									<FiImage className="h-5 w-5" />
								</div>
								<div>
									<h2 className="text-xl font-semibold text-slate-900">
										Gallery
									</h2>
									<p className="text-sm text-slate-500">
										Add business photos to showcase your space and services.
									</p>
								</div>
							</div>

							<div className="mt-6 grid gap-4 sm:grid-cols-3">
								{[1, 2, 3].map((item) => (
									<div
										key={item}
										className="flex h-40 items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 text-slate-400">
										Photo {item}
									</div>
								))}
							</div>
						</div>
					</div>

					<div className="space-y-6">
						<div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
							<h2 className="text-lg font-semibold text-slate-900">
								Business details
							</h2>
							<div className="mt-5 space-y-4 text-sm">
								<DetailRow
									icon={<FiMail className="h-4 w-4" />}
									label="Owner email"
									value={business.email}
								/>
								<DetailRow
									icon={<FiPhone className="h-4 w-4" />}
									label="Phone"
									value={business.phone}
								/>
								<DetailRow
									icon={<FiMapPin className="h-4 w-4" />}
									label="Address"
									value={business.address}
								/>
								<DetailRow
									icon={<FiGlobe className="h-4 w-4" />}
									label="Website / social"
									value={business.website}
								/>
							</div>
						</div>

						<div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
							<h2 className="text-lg font-semibold text-slate-900">Services</h2>
							<div className="mt-4 flex flex-wrap gap-2">
								{business.services.map((service) => (
									<span
										key={service}
										className="rounded-full bg-sky-100 px-3 py-1 text-sm font-medium text-sky-700">
										{service}
									</span>
								))}
							</div>
						</div>

						<div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
							<h2 className="text-lg font-semibold text-slate-900">
								Owner info
							</h2>
							<div className="mt-4 rounded-2xl bg-slate-50 p-4">
								<p className="font-semibold text-slate-900">{business.owner}</p>
								<p className="mt-1 text-sm text-slate-600">
									Primary account owner
								</p>
							</div>
						</div>

						<div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
							<h2 className="text-lg font-semibold text-slate-900">
								Quick actions
							</h2>
							<div className="mt-4 space-y-3">
								<button className="w-full rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
									Update business profile
								</button>
								<Link
									to="/business/dashboard/settings"
									className="block w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
									Go to settings
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

function DetailRow({
	icon,
	label,
	value,
}: {
	icon: React.ReactNode;
	label: string;
	value: string;
}) {
	return (
		<div className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4">
			<div className="mt-0.5 text-sky-600">{icon}</div>
			<div>
				<p className="font-medium text-slate-900">{label}</p>
				<p className="mt-1 text-slate-600">{value}</p>
			</div>
		</div>
	);
}

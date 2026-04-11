import { useState, useEffect } from "react";
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
	FiLink,
	FiUsers,
	FiShield,
	FiTag,
	FiMessageCircle,
	FiChevronDown,
	FiChevronUp,
} from "react-icons/fi";
import axios from "axios";
import { API_URL } from "../BusinessPages/BusinessAuthContext";

type FAQItem = {
	question: string;
	answer: string;
};

type Business = {
	businessName: string;
	tagline?: string;
	category?: string;
	ownerName: string;
	email: string;
	phone: string;
	businessAddress: string;
	serviceArea?: string;
	websiteOrSocial?: string;
	bookingLink?: string;
	instagram?: string;
	facebook?: string;
	tiktok?: string;
	description?: string;
	ratingAverage: number;
	reviewCount: number;
	attributes?: string[];
	services?: Array<{ name: string; price?: string; duration?: string }>;
	faq?: FAQItem[];
	galleryImages?: Array<{ url: string; alt?: string }>;
	hours?: Record<string, { open: string; close: string; isOpen: boolean }>;
	holidayHours?: string;
	preferences?: {
		bookingType: string;
		bufferTime: number;
		allowCancellations: boolean;
		cancellationFee: number;
		cancellationFeeType: string;
		cancellationWindow: number;
	};
	isOnBoarded: boolean;
	isPublished: boolean;
	isFeatured: boolean;
	isVerified: boolean;
};

export default function BusinessProfilePage() {
	const [business, setBusiness] = useState<Business | null>(null);
	const [loading, setLoading] = useState(true);
	const [openFaq, setOpenFaq] = useState<number | null>(0);

	useEffect(() => {
		const loadBusinessData = async () => {
			try {
				const token = localStorage.getItem("token");
				if (!token) {
					setLoading(false);
					return;
				}

				const { data } = await axios.get(`${API_URL}/api/business/me`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});

				if (data.business) {
					setBusiness(data.business);
				}
			} catch (err) {
				console.error("Failed to load business data", err);
			} finally {
				setLoading(false);
			}
		};

		loadBusinessData();
	}, []);

	const toggleFaq = (index: number) => {
		setOpenFaq(openFaq === index ? null : index);
	};

	// Format hours for display
	const formatHours = () => {
		if (!business?.hours) return "Not set";

		const days = Object.entries(business.hours);
		const openDays = days.filter(([_, hours]) => hours.isOpen);

		if (openDays.length === 0) return "Closed";

		// Simple format: "Mon-Fri, 9:00 AM - 5:00 PM"
		const firstDay = openDays[0][1];
		return `${openDays.map(([day]) => day.charAt(0).toUpperCase() + day.slice(1, 3)).join(", ")}, ${firstDay.open} - ${firstDay.close}`;
	};

	// Format policy text
	const formatPolicy = () => {
		if (!business?.preferences) return "No cancellation policy set";

		const {
			allowCancellations,
			cancellationWindow,
			cancellationFee,
			cancellationFeeType,
		} = business.preferences;

		if (!allowCancellations) return "Cancellations not allowed";

		let policy = `Cancellations must be made at least ${cancellationWindow} hours before the appointment.`;

		if (cancellationFee > 0) {
			const feeText =
				cancellationFeeType === "percent"
					? `${cancellationFee}%`
					: `$${cancellationFee}`;
			policy += ` Late cancellations may be charged a ${feeText} fee.`;
		}

		return policy;
	};

	if (loading) {
		return (
			<div className="flex min-h-screen items-center justify-center bg-sky-50">
				<div className="text-center">
					<div className="mb-4 inline-block h-12 w-12 animate-spin rounded-full border-4 border-sky-200 border-t-sky-600"></div>
					<p className="text-slate-600">Loading your business profile...</p>
				</div>
			</div>
		);
	}

	if (!business) {
		return (
			<div className="flex min-h-screen items-center justify-center bg-sky-50">
				<div className="text-center">
					<p className="text-slate-600">
						No business found. Please complete onboarding.
					</p>
					<Link
						to="/business/onboarding"
						className="mt-4 inline-block rounded-2xl bg-sky-600 px-6 py-3 font-semibold text-white hover:bg-sky-700">
						Start Onboarding
					</Link>
				</div>
			</div>
		);
	}

	const statusLabel = business.isOnBoarded ? "Approved" : "Pending";

	return (
		<div className="min-h-screen bg-sky-50 px-4 py-10 text-slate-900 sm:px-6 lg:px-8">
			<div className="mx-auto max-w-7xl">
				<div className="mb-6 flex items-center justify-between">
					<Link
						to="/business/dashboard"
						className="text-sm font-semibold text-sky-700 hover:text-sky-800">
						← Back to dashboard
					</Link>
					<Link
						to="/business/dashboard/profile/edit"
						className="inline-flex cursor-pointer items-center gap-2 rounded-2xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800">
						<FiEdit3 className="h-4 w-4" />
						Edit business
					</Link>
				</div>

				<div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
					<div className="space-y-8">
						<div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
							<div className="h-56 bg-[radial-gradient(circle_at_top,rgba(125,211,252,0.6),transparent_40%),linear-gradient(135deg,rgba(15,23,42,0.92),rgba(2,132,199,0.78))] p-6 sm:p-8">
								<div className="flex h-full flex-col justify-between">
									<div className="flex flex-wrap items-center gap-2">
										<span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white backdrop-blur">
											<FiCheckCircle className="h-4 w-4 text-emerald-300" />
											{statusLabel}
										</span>
										<span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white backdrop-blur">
											<FiStar className="h-4 w-4 text-amber-300" />
											{business.ratingAverage || "0.0"} rating
										</span>
										{business.category && (
											<span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white backdrop-blur">
												<FiTag className="h-4 w-4 text-sky-200" />
												{business.category}
											</span>
										)}
									</div>

									<div className="max-w-2xl text-white">
										<h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
											{business.businessName}
										</h1>
										{business.tagline && (
											<p className="mt-2 text-sm font-medium text-white/80">
												{business.tagline}
											</p>
										)}
										<p className="mt-3 text-sm leading-6 text-white/85 sm:text-base">
											{business.description || "No description provided"}
										</p>
									</div>
								</div>
							</div>

							<div className="grid gap-4 p-6 sm:grid-cols-2 xl:grid-cols-4">
								<StatCard
									label="Rating"
									value={business.ratingAverage?.toFixed(1) || "0.0"}
									subvalue={`${business.reviewCount || 0} reviews`}
									icon={<FiStar className="h-4 w-4 text-amber-500" />}
								/>
								<StatCard
									label="Hours"
									value={formatHours()}
									subvalue={business.holidayHours || "No holiday hours set"}
									icon={<FiClock className="h-4 w-4 text-sky-600" />}
								/>
								<StatCard
									label="Location"
									value={
										business.businessAddress.split(",")[1]?.trim() || "Location"
									}
									subvalue={
										business.isVerified ? "Verified listing" : "Unverified"
									}
									icon={<FiMapPin className="h-4 w-4 text-sky-600" />}
								/>
								<StatCard
									label="Service area"
									value={business.serviceArea || "Not set"}
									subvalue="Local coverage"
									icon={<FiUsers className="h-4 w-4 text-violet-600" />}
								/>
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
										{business.galleryImages && business.galleryImages.length > 0
											? `${business.galleryImages.length} photos`
											: "Add business photos so customers can preview your space."}
									</p>
								</div>
							</div>

							<div className="mt-6 grid gap-4 sm:grid-cols-3">
								{business.galleryImages && business.galleryImages.length > 0
									? business.galleryImages.slice(0, 3).map((image, idx) => (
											<div
												key={idx}
												className="h-40 overflow-hidden rounded-2xl bg-slate-100">
												<img
													src={image.url}
													alt={image.alt || `Gallery ${idx + 1}`}
													className="h-full w-full object-cover"
												/>
											</div>
										))
									: [1, 2, 3].map((item) => (
											<div
												key={item}
												className="flex h-40 items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 text-slate-400">
												Photo {item}
											</div>
										))}
							</div>
						</div>

						<div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
							<div className="flex items-center gap-3">
								<div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-100 text-violet-700">
									<FiMessageCircle className="h-5 w-5" />
								</div>
								<div>
									<h2 className="text-xl font-semibold text-slate-900">
										Reviews preview
									</h2>
									<p className="text-sm text-slate-500">
										Customer feedback will appear here once you receive reviews.
									</p>
								</div>
							</div>

							<div className="mt-6 grid gap-4 md:grid-cols-2">
								{business.reviewCount > 0 ? (
									<div className="rounded-2xl bg-slate-50 p-5">
										<p className="text-sm text-slate-600">
											You have {business.reviewCount} review
											{business.reviewCount !== 1 ? "s" : ""} with an average
											rating of {business.ratingAverage.toFixed(1)} stars.
										</p>
									</div>
								) : (
									<div className="col-span-2 rounded-2xl bg-slate-50 p-5 text-center">
										<p className="text-sm text-slate-600">
											No reviews yet. Share your booking link to start
											collecting feedback!
										</p>
									</div>
								)}
							</div>
						</div>

						{business.faq && business.faq.length > 0 && (
							<div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
								<div className="flex items-center gap-3">
									<div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
										<FiShield className="h-5 w-5" />
									</div>
									<div>
										<h2 className="text-xl font-semibold text-slate-900">
											FAQ
										</h2>
										<p className="text-sm text-slate-500">
											Common customer questions
										</p>
									</div>
								</div>

								<div className="mt-6 space-y-3">
									{business.faq.map((faq, index) => (
										<div
											key={index}
											className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
											<button
												type="button"
												onClick={() => toggleFaq(index)}
												className="flex w-full items-center justify-between px-5 py-4 text-left">
												<span className="text-sm font-semibold text-slate-900">
													{faq.question}
												</span>
												{openFaq === index ? (
													<FiChevronUp className="h-4 w-4 text-slate-500" />
												) : (
													<FiChevronDown className="h-4 w-4 text-slate-500" />
												)}
											</button>
											{openFaq === index && (
												<div className="px-5 pb-4">
													<p className="text-sm leading-6 text-slate-600">
														{faq.answer}
													</p>
												</div>
											)}
										</div>
									))}
								</div>
							</div>
						)}
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
									value={business.businessAddress}
								/>
								{(business.websiteOrSocial || business.instagram) && (
									<DetailRow
										icon={<FiGlobe className="h-4 w-4" />}
										label="Website / social"
										value={
											business.instagram ||
											business.websiteOrSocial ||
											"Not set"
										}
									/>
								)}
							</div>
						</div>

						{business.services && business.services.length > 0 && (
							<div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
								<h2 className="text-lg font-semibold text-slate-900">
									Services
								</h2>
								<div className="mt-4 flex flex-wrap gap-2">
									{business.services.map((service, idx) => (
										<span
											key={idx}
											className="rounded-full bg-sky-100 px-3 py-1 text-sm font-medium text-sky-700">
											{service.name}
											{service.price && ` - $${service.price}`}
										</span>
									))}
								</div>
							</div>
						)}

						<div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
							<h2 className="text-lg font-semibold text-slate-900">
								Owner info
							</h2>
							<div className="mt-4 rounded-2xl bg-slate-50 p-4">
								<p className="font-semibold text-slate-900">
									{business.ownerName}
								</p>
								<p className="mt-1 text-sm text-slate-600">
									Primary account owner
								</p>
							</div>
						</div>

						<div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
							<h2 className="text-lg font-semibold text-slate-900">
								Public page info
							</h2>
							<div className="mt-4 space-y-4 text-sm">
								{business.bookingLink && (
									<DetailRow
										icon={<FiLink className="h-4 w-4" />}
										label="Booking link"
										value={business.bookingLink}
									/>
								)}
								{business.holidayHours && (
									<DetailRow
										icon={<FiClock className="h-4 w-4" />}
										label="Holiday hours"
										value={business.holidayHours}
									/>
								)}
								<DetailRow
									icon={<FiShield className="h-4 w-4" />}
									label="Policy"
									value={formatPolicy()}
								/>
							</div>
						</div>

						{business.attributes && business.attributes.length > 0 && (
							<div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
								<h2 className="text-lg font-semibold text-slate-900">
									Attributes
								</h2>
								<div className="mt-4 flex flex-wrap gap-2">
									{business.attributes.map((item, idx) => (
										<span
											key={idx}
											className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm font-medium text-slate-700">
											{item}
										</span>
									))}
								</div>
							</div>
						)}

						<div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
							<h2 className="text-lg font-semibold text-slate-900">
								Quick actions
							</h2>
							<div className="mt-4 space-y-3">
								<button className="w-full rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
									Preview public page
								</button>
								<Link
									to="/business/dashboard/settings"
									className="block w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
									Edit settings
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

function StatCard({
	label,
	value,
	subvalue,
	icon,
}: {
	label: string;
	value: string;
	subvalue: string;
	icon: React.ReactNode;
}) {
	return (
		<div className="rounded-2xl bg-slate-50 p-4">
			<div className="flex items-center gap-2 text-slate-500">
				{icon}
				<span className="text-xs font-medium uppercase tracking-wide">
					{label}
				</span>
			</div>
			<p className="mt-2 text-lg font-semibold text-slate-900">{value}</p>
			<p className="text-sm text-slate-500">{subvalue}</p>
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
				<p className="mt-1 break-words text-slate-600">{value}</p>
			</div>
		</div>
	);
}

import { Link } from "react-router-dom";
import {
	HiStar,
	HiLocationMarker,
	HiClock,
	HiLightningBolt,
	HiSparkles,
	HiBadgeCheck,
} from "react-icons/hi";

interface Business {
	id: string;
	name: string;
	slug: string;
	category: string;
	rating: number;
	reviewCount: number;
	distance: number;
	priceRange: string;
	address: string;
	image: string;
	nextAvailable: string;
	services: string[];
	isFeatured?: boolean;
	isNew?: boolean;
	discount?: string | null;
}

interface BusinessCardProps {
	business: Business;
	featured?: boolean;
}

export default function BusinessCard({
	business,
	featured = false,
}: BusinessCardProps) {
	return (
		<Link
			to={`/${business.slug}`}
			className={`group relative overflow-hidden rounded-[1.75rem] border bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(15,23,42,0.12)] ${
				featured
					? "border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-teal-50"
					: "border-slate-200"
			}`}>
			{business.isFeatured && (
				<div className="absolute left-3 top-3 z-10 flex items-center gap-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-3 py-1 text-xs font-bold text-white shadow-lg">
					<HiLightningBolt className="h-3 w-3" />
					FEATURED
				</div>
			)}

			{business.isNew && (
				<div className="absolute left-3 top-3 z-10 flex items-center gap-1 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 px-3 py-1 text-xs font-bold text-white shadow-lg">
					<HiSparkles className="h-3 w-3" />
					NEW
				</div>
			)}

			{business.discount && (
				<div className="absolute left-3 top-14 z-10 rounded-full bg-rose-500 px-3 py-1 text-xs font-bold text-white shadow-lg">
					{business.discount}
				</div>
			)}

			<div className="relative h-52 overflow-hidden">
				<div className="absolute inset-0 z-10 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
				<img
					src={business.image}
					alt={business.name}
					className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
				/>
				<div className="absolute bottom-3 right-3 z-10 rounded-xl bg-white/90 px-3 py-1 text-sm font-bold text-slate-900 backdrop-blur">
					{business.priceRange}
				</div>
			</div>

			<div className="p-5">
				<div className="mb-3">
					<div className="mb-1 flex items-start justify-between gap-2">
						<h3 className="flex-1 text-lg font-bold text-slate-900 transition group-hover:text-emerald-700">
							{business.name}
						</h3>
						{business.rating >= 4.8 && (
							<HiBadgeCheck className="h-5 w-5 flex-shrink-0 text-emerald-600" />
						)}
					</div>
					<p className="text-sm text-slate-500">{business.category}</p>
				</div>

				<div className="mb-4 flex items-center gap-3 border-b border-slate-200 pb-4">
					<div className="flex items-center gap-1.5 rounded-xl bg-amber-50 px-2 py-1">
						<HiStar className="h-4 w-4 text-amber-500" />
						<span className="text-sm font-bold text-slate-900">
							{business.rating}
						</span>
					</div>
					<span className="text-sm text-slate-500">
						{business.reviewCount} reviews
					</span>
					<span className="text-xs text-slate-300">•</span>
					<span className="text-sm text-slate-500">{business.distance} mi</span>
				</div>

				<div className="mb-4 flex items-center gap-2 rounded-2xl border border-emerald-200 bg-gradient-to-r from-emerald-50 to-teal-50 p-3">
					<HiClock className="h-5 w-5 flex-shrink-0 text-emerald-600" />
					<div className="flex-1">
						<p className="text-xs text-slate-500">Next available</p>
						<p className="text-sm font-semibold text-emerald-700">
							{business.nextAvailable}
						</p>
					</div>
				</div>

				<div className="mb-4 flex flex-wrap gap-2">
					{business.services.slice(0, 3).map((service, idx) => (
						<span
							key={idx}
							className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs text-slate-600 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700">
							{service}
						</span>
					))}
					{business.services.length > 3 && (
						<span className="px-2.5 py-1 text-xs text-slate-400">
							+{business.services.length - 3} more
						</span>
					)}
				</div>

				<button className="w-full cursor-pointer rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3 font-semibold text-white transition hover:from-emerald-500 hover:to-teal-500">
					View & Book →
				</button>
			</div>
		</Link>
	);
}

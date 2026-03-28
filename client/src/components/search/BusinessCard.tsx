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
			className={`group relative rounded-2xl border overflow-hidden transition-all duration-300 ${
				featured
					? "border-basepoint-teal/50 bg-gradient-to-br from-basepoint-teal/10 to-purple-500/10 hover:border-basepoint-teal hover:shadow-xl hover:shadow-basepoint-teal/20"
					: "border-white/10 bg-white/5 hover:border-basepoint-teal/50 hover:bg-white/10 hover:shadow-lg"
			}`}>
			{/* Featured badge */}
			{business.isFeatured && (
				<div className="absolute top-3 left-3 z-10 px-3 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full text-xs font-bold text-white flex items-center gap-1 shadow-lg">
					<HiLightningBolt className="w-3 h-3" />
					FEATURED
				</div>
			)}

			{/* New badge */}
			{business.isNew && (
				<div className="absolute top-3 left-3 z-10 px-3 py-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full text-xs font-bold text-white flex items-center gap-1 shadow-lg">
					<HiSparkles className="w-3 h-3" />
					NEW
				</div>
			)}

			{/* Discount badge */}
			{business.discount && (
				<div className="absolute top-14 left-3 z-10 px-3 py-1 bg-red-500 rounded-full text-xs font-bold text-white shadow-lg">
					{business.discount}
				</div>
			)}

			{/* Image */}
			<div className="relative h-52 overflow-hidden">
				<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10"></div>
				<img
					src={business.image}
					alt={business.name}
					className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
				/>

				{/* Price range on image */}
				<div className="absolute bottom-3 right-3 z-10 px-3 py-1 bg-black/70 backdrop-blur-sm rounded-lg text-sm font-bold text-white">
					{business.priceRange}
				</div>
			</div>

			{/* Content */}
			<div className="p-5">
				{/* Name & category */}
				<div className="mb-3">
					<div className="flex items-start justify-between gap-2 mb-1">
						<h3 className="text-lg font-bold text-white group-hover:text-basepoint-teal transition flex-1">
							{business.name}
						</h3>
						{business.rating >= 4.8 && (
							<HiBadgeCheck className="w-5 h-5 text-basepoint-teal flex-shrink-0" />
						)}
					</div>
					<p className="text-sm text-gray-400">{business.category}</p>
				</div>

				{/* Rating & reviews */}
				<div className="flex items-center gap-3 mb-4 pb-4 border-b border-white/10">
					<div className="flex items-center gap-1.5 bg-yellow-500/10 px-2 py-1 rounded-lg">
						<HiStar className="w-4 h-4 text-yellow-400" />
						<span className="text-sm font-bold text-white">
							{business.rating}
						</span>
					</div>
					<span className="text-sm text-gray-400">
						{business.reviewCount} reviews
					</span>
					<span className="text-xs text-gray-500">•</span>
					<span className="text-sm text-gray-400">{business.distance} mi</span>
				</div>

				{/* Next available - prominent */}
				<div className="flex items-center gap-2 mb-4 p-3 bg-basepoint-teal/10 border border-basepoint-teal/20 rounded-lg">
					<HiClock className="w-5 h-5 text-basepoint-teal flex-shrink-0" />
					<div className="flex-1">
						<p className="text-xs text-gray-400">Next available</p>
						<p className="text-sm font-semibold text-basepoint-teal">
							{business.nextAvailable}
						</p>
					</div>
				</div>

				{/* Services */}
				<div className="flex flex-wrap gap-2">
					{business.services.slice(0, 3).map((service, idx) => (
						<span
							key={idx}
							className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-md text-xs text-gray-300 hover:border-basepoint-teal/50 hover:text-white transition">
							{service}
						</span>
					))}
					{business.services.length > 3 && (
						<span className="px-2.5 py-1 text-xs text-gray-500">
							+{business.services.length - 3} more
						</span>
					)}
				</div>

				{/* Book now CTA */}
				<button className="w-full mt-4 py-3 bg-basepoint-teal cursor-pointer hover:bg-teal-500 text-white font-semibold rounded-lg transition group-hover:shadow-lg group-hover:shadow-basepoint-teal/30">
					View & Book →
				</button>
			</div>
		</Link>
	);
}

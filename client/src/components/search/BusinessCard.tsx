import { Link } from "react-router-dom";
import { HiStar, HiLocationMarker, HiClock } from "react-icons/hi";

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
}

interface BusinessCardProps {
	business: Business;
}

export default function BusinessCard({ business }: BusinessCardProps) {
	return (
		<Link
			to={`/${business.slug}`}
			className="group rounded-xl border border-white/10 bg-white/5 overflow-hidden hover:border-basepoint-teal/50 hover:bg-white/10 transition-all">
			{/* Image */}
			<div className="relative h-48 overflow-hidden">
				<img
					src={business.image}
					alt={business.name}
					className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
				/>
				<div className="absolute top-3 right-3 px-2 py-1 bg-black/60 backdrop-blur-sm rounded-lg text-xs font-semibold text-white">
					{business.priceRange}
				</div>
			</div>

			{/* Content */}
			<div className="p-5">
				{/* Name & category */}
				<div className="mb-3">
					<h3 className="text-lg font-semibold text-white group-hover:text-basepoint-teal transition">
						{business.name}
					</h3>
					<p className="text-sm text-gray-400">{business.category}</p>
				</div>

				{/* Rating & reviews */}
				<div className="flex items-center gap-2 mb-3">
					<div className="flex items-center gap-1">
						<HiStar className="w-4 h-4 text-yellow-400" />
						<span className="text-sm font-semibold text-white">
							{business.rating}
						</span>
					</div>
					<span className="text-sm text-gray-400">
						({business.reviewCount} reviews)
					</span>
				</div>

				{/* Location & distance */}
				<div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
					<HiLocationMarker className="w-4 h-4 flex-shrink-0" />
					<span className="truncate">{business.distance} mi away</span>
				</div>

				{/* Next available */}
				<div className="flex items-center gap-2 text-sm mb-4">
					<HiClock className="w-4 h-4 text-basepoint-teal flex-shrink-0" />
					<span className="text-gray-300">
						Next available:{" "}
						<span className="text-basepoint-teal font-medium">
							{business.nextAvailable}
						</span>
					</span>
				</div>

				{/* Services */}
				<div className="flex flex-wrap gap-2">
					{business.services.slice(0, 3).map((service, idx) => (
						<span
							key={idx}
							className="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs text-gray-300">
							{service}
						</span>
					))}
				</div>
			</div>
		</Link>
	);
}

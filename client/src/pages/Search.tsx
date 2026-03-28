import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SearchBar from "../components/search/SearchBar";
import FilterSidebar from "../components/search/FilterSidebar";
import BusinessCard from "../components/search/BusinessCard";
import MapView from "../components/search/MapView";
import {
	HiViewGrid,
	HiMap,
	HiFire,
	HiStar,
	HiTrendingUp,
	HiLightningBolt,
} from "react-icons/hi";

// Mock data
const mockBusinesses = [
	{
		id: "1",
		name: "John's Barbershop",
		slug: "johns-barbershop",
		category: "Hair & Beauty",
		rating: 4.8,
		reviewCount: 127,
		distance: 0.3,
		priceRange: "$$",
		address: "123 Main St, Brooklyn, NY",
		image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800",
		nextAvailable: "Today 3pm",
		services: ["Haircut", "Beard Trim", "Hot Towel Shave"],
		coordinates: { lat: 40.7128, lng: -74.006 },
		isFeatured: true,
		isNew: false,
		discount: "20% off first visit",
	},
	{
		id: "2",
		name: "Brooklyn Cuts",
		slug: "brooklyn-cuts",
		category: "Hair & Beauty",
		rating: 4.6,
		reviewCount: 89,
		distance: 0.8,
		priceRange: "$$",
		address: "456 Bedford Ave, Brooklyn, NY",
		image: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800",
		nextAvailable: "Tomorrow 10am",
		services: ["Haircut", "Fade", "Lineup"],
		coordinates: { lat: 40.7168, lng: -73.9618 },
		isFeatured: false,
		isNew: true,
		discount: null,
	},
	{
		id: "3",
		name: "Zen Yoga Studio",
		slug: "zen-yoga",
		category: "Fitness & Wellness",
		rating: 4.9,
		reviewCount: 203,
		distance: 1.2,
		priceRange: "$",
		address: "789 Park Ave, Brooklyn, NY",
		image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800",
		nextAvailable: "Today 6pm",
		services: ["Vinyasa", "Hot Yoga", "Meditation"],
		coordinates: { lat: 40.7282, lng: -73.9942 },
		isFeatured: true,
		isNew: false,
		discount: "Free trial class",
	},
	{
		id: "4",
		name: "Elite Personal Training",
		slug: "elite-pt",
		category: "Fitness & Wellness",
		rating: 4.7,
		reviewCount: 156,
		distance: 0.5,
		priceRange: "$$$",
		address: "321 Atlantic Ave, Brooklyn, NY",
		image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800",
		nextAvailable: "Today 4pm",
		services: ["1-on-1 Training", "Group Sessions", "Nutrition Coaching"],
		coordinates: { lat: 40.6872, lng: -73.9864 },
		isFeatured: false,
		isNew: false,
		discount: null,
	},
	{
		id: "5",
		name: "The Grooming Lounge",
		slug: "grooming-lounge",
		category: "Hair & Beauty",
		rating: 4.5,
		reviewCount: 92,
		distance: 1.5,
		priceRange: "$$$",
		address: "555 Smith St, Brooklyn, NY",
		image: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=800",
		nextAvailable: "Tomorrow 2pm",
		services: ["Premium Haircut", "Beard Grooming", "Facial"],
		coordinates: { lat: 40.6763, lng: -73.9959 },
		isFeatured: false,
		isNew: true,
		discount: null,
	},
];

const trendingSearches = [
	"Barbershop",
	"Yoga classes",
	"Personal trainer",
	"Massage therapy",
];
const popularCategories = [
	{ name: "Hair & Beauty", icon: "💇", count: 124 },
	{ name: "Fitness & Wellness", icon: "💪", count: 89 },
	{ name: "Pet Services", icon: "🐾", count: 56 },
	{ name: "Home Services", icon: "🏠", count: 78 },
];

export default function Search() {
	const [view, setView] = useState<"grid" | "map">("grid");
	const [searchQuery, setSearchQuery] = useState("");
	const [sortBy, setSortBy] = useState("recommended");
	const [filters, setFilters] = useState({
		category: "",
		priceRange: "",
		rating: "",
		distance: 5,
		availability: "",
	});

	const filteredBusinesses = mockBusinesses.filter((business) => {
		if (
			searchQuery &&
			!business.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
			!business.category.toLowerCase().includes(searchQuery.toLowerCase())
		) {
			return false;
		}
		if (filters.category && business.category !== filters.category)
			return false;
		if (filters.priceRange && business.priceRange !== filters.priceRange)
			return false;
		if (filters.rating && business.rating < parseFloat(filters.rating))
			return false;
		if (business.distance > filters.distance) return false;
		return true;
	});

	// Sort businesses
	const sortedBusinesses = [...filteredBusinesses].sort((a, b) => {
		if (sortBy === "rating") return b.rating - a.rating;
		if (sortBy === "distance") return a.distance - b.distance;
		if (sortBy === "reviews") return b.reviewCount - a.reviewCount;
		// recommended (default) - featured first, then rating
		if (a.isFeatured && !b.isFeatured) return -1;
		if (!a.isFeatured && b.isFeatured) return 1;
		return b.rating - a.rating;
	});

	return (
		<div className="min-h-screen bg-[#050609] text-white">
			<Navbar />

			{/* Hero search section */}
			<div className="relative border-b border-white/5 overflow-hidden">
				{/* Animated background gradient */}
				<div className="absolute inset-0 bg-gradient-to-br from-basepoint-teal/10 via-transparent to-purple-500/10"></div>
				<div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(20,184,166,0.15),transparent_50%)]"></div>

				<div className="relative max-w-7xl mx-auto px-6 py-12">
					{/* Breadcrumb */}
					<div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
						<span>Home</span>
						<span>/</span>
						<span className="text-white">Search</span>
					</div>

					<div className="max-w-4xl">
						<h1 className="text-4xl lg:text-5xl font-bold mb-4">
							Discover local services
							<br />
							<span className="bg-gradient-to-r from-basepoint-teal via-emerald-400 to-cyan-400 bg-clip-text text-transparent">
								near you
							</span>
						</h1>
						<p className="text-lg text-gray-400 mb-8">
							Find trusted professionals for haircuts, fitness, tutoring, and
							more
						</p>

						<SearchBar value={searchQuery} onChange={setSearchQuery} />

						{/* Trending searches */}
						<div className="mt-6 flex flex-wrap items-center gap-3">
							<span className="text-sm text-gray-400 flex items-center gap-2">
								<HiFire className="w-4 h-4 text-orange-400" />
								Trending:
							</span>
							{trendingSearches.map((term) => (
								<button
									key={term}
									onClick={() => setSearchQuery(term)}
									className="px-3 py-1 cursor-pointer bg-white/5 hover:bg-white/10 border border-white/10 hover:border-basepoint-teal/50 rounded-full text-sm text-gray-300 hover:text-white transition">
									{term}
								</button>
							))}
						</div>
					</div>
				</div>
			</div>

			{/* Popular categories */}
			<div className="border-b border-white/5 bg-white/[0.02]">
				<div className="max-w-7xl mx-auto px-6 py-6">
					<div className="flex items-center gap-2 mb-4 text-sm text-gray-400">
						<HiTrendingUp className="w-4 h-4" />
						Popular categories
					</div>
					<div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
						{popularCategories.map((cat) => (
							<button
								key={cat.name}
								onClick={() => setFilters({ ...filters, category: cat.name })}
								className={`p-4 cursor-pointer rounded-xl border transition-all ${
									filters.category === cat.name
										? "border-basepoint-teal bg-basepoint-teal/10"
										: "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
								}`}>
								<div className="text-3xl mb-2">{cat.icon}</div>
								<div className="text-sm font-semibold text-white">
									{cat.name}
								</div>
								<div className="text-xs text-gray-400 mt-1">
									{cat.count} businesses
								</div>
							</button>
						))}
					</div>
				</div>
			</div>

			{/* Main content */}
			<div className="max-w-7xl mx-auto px-6 py-8">
				<div className="flex gap-8">
					<FilterSidebar filters={filters} onFilterChange={setFilters} />

					<div className="flex-1">
						{/* Results header with stats */}
						<div className="mb-6">
							<div className="flex items-center justify-between mb-4">
								<div>
									<h2 className="text-2xl font-bold text-white flex items-center gap-3">
										{sortedBusinesses.length} results
										{searchQuery && (
											<span className="text-lg font-normal text-gray-400">
												for "{searchQuery}"
											</span>
										)}
									</h2>
									<p className="text-sm text-gray-400 mt-1">
										Brooklyn, NY • Updated just now
									</p>
								</div>

								<div className="flex items-center gap-3">
									{/* Sort dropdown */}
									<select
										value={sortBy}
										onChange={(e) => setSortBy(e.target.value)}
										className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-basepoint-teal transition">
										<option value="recommended">Recommended</option>
										<option value="rating">Highest rated</option>
										<option value="distance">Nearest</option>
										<option value="reviews">Most reviewed</option>
									</select>

									{/* View toggle */}
									<div className="flex items-center gap-2 bg-white/5 p-1 rounded-lg border border-white/10">
										<button
											onClick={() => setView("grid")}
											className={`p-2 cursor-pointer rounded-lg transition ${
												view === "grid"
													? "bg-basepoint-teal text-white"
													: "text-gray-400 hover:text-white"
											}`}>
											<HiViewGrid className="w-5 h-5" />
										</button>
										<button
											onClick={() => setView("map")}
											className={`p-2 cursor-pointer rounded-lg transition ${
												view === "map"
													? "bg-basepoint-teal text-white"
													: "text-gray-400 hover:text-white"
											}`}>
											<HiMap className="w-5 h-5" />
										</button>
									</div>
								</div>
							</div>

							{/* Active filters */}
							{(filters.category || filters.priceRange || filters.rating) && (
								<div className="flex flex-wrap items-center gap-2">
									<span className="text-sm text-gray-400">Active filters:</span>
									{filters.category && (
										<span className="px-3 py-1 bg-basepoint-teal/20 border border-basepoint-teal/30 rounded-full text-sm text-basepoint-teal flex items-center gap-2">
											{filters.category}
											<button
												onClick={() => setFilters({ ...filters, category: "" })}
												className="cursor-pointer hover:text-white transition">
												×
											</button>
										</span>
									)}
									{filters.priceRange && (
										<span className="px-3 py-1 bg-basepoint-teal/20 border border-basepoint-teal/30 rounded-full text-sm text-basepoint-teal flex items-center gap-2">
											{filters.priceRange}
											<button
												onClick={() =>
													setFilters({ ...filters, priceRange: "" })
												}
												className="cursor-pointer hover:text-white transition">
												×
											</button>
										</span>
									)}
									{filters.rating && (
										<span className="px-3 py-1 bg-basepoint-teal/20 border border-basepoint-teal/30 rounded-full text-sm text-basepoint-teal flex items-center gap-2">
											{filters.rating}+ ⭐
											<button
												onClick={() => setFilters({ ...filters, rating: "" })}
												className="cursor-pointer hover:text-white transition">
												×
											</button>
										</span>
									)}
									<button
										onClick={() =>
											setFilters({
												category: "",
												priceRange: "",
												rating: "",
												distance: 5,
												availability: "",
											})
										}
										className="text-sm cursor-pointer text-gray-400 hover:text-basepoint-teal transition">
										Clear all
									</button>
								</div>
							)}
						</div>

						{/* Results */}
						{view === "grid" ? (
							<>
								{/* Featured section */}
								{sortedBusinesses.some((b) => b.isFeatured) && (
									<div className="mb-8">
										<div className="flex items-center gap-2 mb-4">
											<HiLightningBolt className="w-5 h-5 text-yellow-400" />
											<h3 className="text-lg font-semibold text-white">
												Featured
											</h3>
										</div>
										<div className="grid md:grid-cols-2 gap-6">
											{sortedBusinesses
												.filter((b) => b.isFeatured)
												.slice(0, 2)
												.map((business) => (
													<BusinessCard
														key={business.id}
														business={business}
														featured
													/>
												))}
										</div>
									</div>
								)}

								{/* All results */}
								<div className="mb-4">
									<h3 className="text-lg font-semibold text-white mb-4">
										All results
									</h3>
								</div>
								<div className="grid md:grid-cols-2 gap-6">
									{sortedBusinesses.length > 0 ? (
										sortedBusinesses.map((business) => (
											<BusinessCard key={business.id} business={business} />
										))
									) : (
										<div className="col-span-2 text-center py-16 bg-white/5 rounded-xl border border-white/10">
											<div className="text-4xl mb-4">🔍</div>
											<p className="text-lg text-gray-300 mb-2">
												No businesses found
											</p>
											<p className="text-sm text-gray-400 mb-6">
												Try adjusting your filters or search query
											</p>
											<button
												onClick={() => {
													setSearchQuery("");
													setFilters({
														category: "",
														priceRange: "",
														rating: "",
														distance: 5,
														availability: "",
													});
												}}
												className="px-6 py-3 cursor-pointer bg-basepoint-teal text-white rounded-lg font-semibold hover:bg-teal-500 transition">
												Clear all filters
											</button>
										</div>
									)}
								</div>
							</>
						) : (
							<MapView businesses={sortedBusinesses} />
						)}
					</div>
				</div>
			</div>

			<Footer />
		</div>
	);
}

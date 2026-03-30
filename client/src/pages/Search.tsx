import { useState } from "react";
import Footer from "../components/Footer";
import SearchBar from "../components/search/SearchBar";
import FilterSidebar from "../components/search/FilterSidebar";
import BusinessCard from "../components/search/BusinessCard";
import MapView from "../components/search/MapView";
import {
	HiViewGrid,
	HiMap,
	HiFire,
	HiTrendingUp,
	HiLightningBolt,
} from "react-icons/hi";

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

	const sortedBusinesses = [...filteredBusinesses].sort((a, b) => {
		if (sortBy === "rating") return b.rating - a.rating;
		if (sortBy === "distance") return a.distance - b.distance;
		if (sortBy === "reviews") return b.reviewCount - a.reviewCount;
		if (a.isFeatured && !b.isFeatured) return -1;
		if (!a.isFeatured && b.isFeatured) return 1;
		return b.rating - a.rating;
	});

	return (
		<div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(20,184,166,0.14),transparent_28%),linear-gradient(180deg,#f8fafc_0%,#ecfeff_45%,#ffffff_100%)] text-slate-900">
			<section className="relative overflow-hidden border-b border-slate-200/80 bg-white/80 backdrop-blur">
				<div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(20,184,166,0.08),transparent_35%,rgba(59,130,246,0.08))]" />
				<div className="mx-auto max-w-7xl px-6 py-14 relative">
					<div className="mb-6 flex items-center gap-2 text-sm text-slate-500">
						<span>Home</span>
						<span>/</span>
						<span className="text-slate-900">Search</span>
					</div>

					<div className="max-w-4xl">
						<div className="inline-flex items-center gap-2 px-3 py-1 text-sm font-semibold text-emerald-700">
							<HiFire className="h-4 w-4" />
							Search local services
						</div>

						<h1 className="mt-5 text-4xl font-semibold tracking-tight text-slate-900 lg:text-5xl">
							Discover local services
							<span className="block bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600 bg-clip-text text-transparent">
								near you
							</span>
						</h1>

						<p className="mt-4 max-w-2xl text-lg leading-7 text-slate-600">
							Find trusted professionals for haircuts, fitness, tutoring,
							massage therapy, and more.
						</p>

						<div className="mt-8 rounded-[1.75rem] border border-slate-200 bg-white p-4 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
							<SearchBar value={searchQuery} onChange={setSearchQuery} />
						</div>

						<div className="mt-6 flex flex-wrap items-center gap-3">
							<span className="flex items-center gap-2 text-sm font-medium text-slate-500">
								<HiFire className="h-4 w-4 text-orange-400" />
								Trending:
							</span>
							{trendingSearches.map((term) => (
								<button
									key={term}
									onClick={() => setSearchQuery(term)}
									className="cursor-pointer rounded-full border border-slate-200 bg-white px-3 py-1 text-sm text-slate-700 shadow-sm transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700">
									{term}
								</button>
							))}
						</div>
					</div>
				</div>
			</section>

			<section className="border-b border-slate-200 bg-white/70">
				<div className="mx-auto max-w-7xl px-6 py-6">
					<div className="mb-4 flex items-center gap-2 text-sm font-medium text-slate-500">
						<HiTrendingUp className="h-4 w-4" />
						Popular categories
					</div>

					<div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
						{popularCategories.map((cat) => (
							<button
								key={cat.name}
								onClick={() => setFilters({ ...filters, category: cat.name })}
								className={`cursor-pointer rounded-2xl border p-4 text-left shadow-sm transition ${
									filters.category === cat.name
										? "border-emerald-300 bg-gradient-to-br from-emerald-50 to-teal-50"
										: "border-slate-200 bg-white hover:border-emerald-200 hover:bg-emerald-50"
								}`}>
								<div className="text-3xl">{cat.icon}</div>
								<div className="mt-2 text-sm font-semibold text-slate-900">
									{cat.name}
								</div>
								<div className="mt-1 text-xs text-slate-500">
									{cat.count} businesses
								</div>
							</button>
						))}
					</div>
				</div>
			</section>

			<div className="mx-auto max-w-7xl px-6 py-8">
				<div className="flex flex-col gap-8 lg:flex-row">
					<FilterSidebar filters={filters} onFilterChange={setFilters} />

					<div className="flex-1">
						<div className="mb-6 rounded-[1.75rem] border border-slate-200 bg-white/90 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.06)] backdrop-blur">
							<div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
								<div>
									<h2 className="text-2xl font-semibold text-slate-900">
										{sortedBusinesses.length} results
										{searchQuery && (
											<span className="ml-2 text-lg font-normal text-slate-500">
												for "{searchQuery}"
											</span>
										)}
									</h2>
									<p className="mt-1 text-sm text-slate-500">
										Brooklyn, NY • Updated just now
									</p>
								</div>

								<div className="flex items-center gap-3">
									<select
										value={sortBy}
										onChange={(e) => setSortBy(e.target.value)}
										className="rounded-2xl border border-slate-300 bg-white px-4 py-2 text-sm text-slate-900 shadow-sm outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100">
										<option value="recommended">Recommended</option>
										<option value="rating">Highest rated</option>
										<option value="distance">Nearest</option>
										<option value="reviews">Most reviewed</option>
									</select>

									<div className="flex items-center rounded-2xl border border-slate-200 bg-gradient-to-r from-slate-50 to-white p-1 shadow-sm">
										<button
											onClick={() => setView("grid")}
											className={`cursor-pointer rounded-xl p-2 transition ${
												view === "grid"
													? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-sm"
													: "text-slate-500 hover:text-slate-900"
											}`}>
											<HiViewGrid className="h-5 w-5" />
										</button>
										<button
											onClick={() => setView("map")}
											className={`cursor-pointer rounded-xl p-2 transition ${
												view === "map"
													? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-sm"
													: "text-slate-500 hover:text-slate-900"
											}`}>
											<HiMap className="h-5 w-5" />
										</button>
									</div>
								</div>
							</div>

							{(filters.category || filters.priceRange || filters.rating) && (
								<div className="mt-4 flex flex-wrap items-center gap-2">
									<span className="text-sm text-slate-500">
										Active filters:
									</span>
									{filters.category && (
										<span className="flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-sm text-emerald-700">
											{filters.category}
											<button
												onClick={() => setFilters({ ...filters, category: "" })}
												className="cursor-pointer hover:text-emerald-900">
												×
											</button>
										</span>
									)}
									{filters.priceRange && (
										<span className="flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-sm text-emerald-700">
											{filters.priceRange}
											<button
												onClick={() =>
													setFilters({ ...filters, priceRange: "" })
												}
												className="cursor-pointer hover:text-emerald-900">
												×
											</button>
										</span>
									)}
									{filters.rating && (
										<span className="flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-sm text-emerald-700">
											{filters.rating}+ ⭐
											<button
												onClick={() => setFilters({ ...filters, rating: "" })}
												className="cursor-pointer hover:text-emerald-900">
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
										className="cursor-pointer text-sm font-medium text-slate-500 hover:text-emerald-700">
										Clear all
									</button>
								</div>
							)}
						</div>

						{view === "grid" ? (
							<>
								{sortedBusinesses.some((b) => b.isFeatured) && (
									<div className="mb-8">
										<div className="mb-4 flex items-center gap-2">
											<HiLightningBolt className="h-5 w-5 text-amber-500" />
											<h3 className="text-lg font-semibold text-slate-900">
												Featured
											</h3>
										</div>
										<div className="grid gap-6 md:grid-cols-2">
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

								<div className="mb-4">
									<h3 className="text-lg font-semibold text-slate-900">
										All results
									</h3>
								</div>

								<div className="grid gap-6 md:grid-cols-2">
									{sortedBusinesses.length > 0 ? (
										sortedBusinesses.map((business) => (
											<BusinessCard key={business.id} business={business} />
										))
									) : (
										<div className="col-span-2 rounded-[1.75rem] border border-slate-200 bg-white py-16 text-center shadow-sm">
											<div className="mb-4 text-4xl">🔍</div>
											<p className="mb-2 text-lg font-medium text-slate-900">
												No businesses found
											</p>
											<p className="mb-6 text-sm text-slate-500">
												Try adjusting your filters or search query.
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
												className="cursor-pointer rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-3 font-semibold text-white shadow-sm transition hover:from-emerald-500 hover:to-teal-500">
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
		</div>
	);
}

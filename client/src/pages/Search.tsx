import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SearchBar from "../components/search/SearchBar";
import FilterSidebar from "../components/search/FilterSidebar";
import BusinessCard from "../components/search/BusinessCard";
import MapView from "../components/search/MapView";
import { HiViewGrid, HiMap } from "react-icons/hi";

// Mock data - we'll replace this with real API data later
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
		image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400",
		nextAvailable: "Today 3pm",
		services: ["Haircut", "Beard Trim", "Hot Towel Shave"],
		coordinates: { lat: 40.7128, lng: -74.006 },
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
		image: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=400",
		nextAvailable: "Tomorrow 10am",
		services: ["Haircut", "Fade", "Lineup"],
		coordinates: { lat: 40.7168, lng: -73.9618 },
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
		image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400",
		nextAvailable: "Today 6pm",
		services: ["Vinyasa", "Hot Yoga", "Meditation"],
		coordinates: { lat: 40.7282, lng: -73.9942 },
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
		image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400",
		nextAvailable: "Today 4pm",
		services: ["1-on-1 Training", "Group Sessions", "Nutrition Coaching"],
		coordinates: { lat: 40.6872, lng: -73.9864 },
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
		image: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=400",
		nextAvailable: "Tomorrow 2pm",
		services: ["Premium Haircut", "Beard Grooming", "Facial"],
		coordinates: { lat: 40.6763, lng: -73.9959 },
	},
];

export default function Search() {
	const [view, setView] = useState<"grid" | "map">("grid");
	const [searchQuery, setSearchQuery] = useState("");
	const [filters, setFilters] = useState({
		category: "",
		priceRange: "",
		rating: "",
		distance: 5,
		availability: "",
	});

	// Filter businesses based on search and filters
	const filteredBusinesses = mockBusinesses.filter((business) => {
		// Search query
		if (
			searchQuery &&
			!business.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
			!business.category.toLowerCase().includes(searchQuery.toLowerCase())
		) {
			return false;
		}

		// Category filter
		if (filters.category && business.category !== filters.category) {
			return false;
		}

		// Price range filter
		if (filters.priceRange && business.priceRange !== filters.priceRange) {
			return false;
		}

		// Rating filter
		if (filters.rating && business.rating < parseFloat(filters.rating)) {
			return false;
		}

		// Distance filter
		if (business.distance > filters.distance) {
			return false;
		}

		return true;
	});

	return (
		<div className="min-h-screen bg-[#050609] text-white">
			<Navbar />

			{/* Search header */}
			<div className="border-b border-white/5 bg-white/[0.02]">
				<div className="max-w-7xl mx-auto px-6 py-6">
					<SearchBar value={searchQuery} onChange={setSearchQuery} />
				</div>
			</div>

			{/* Main content */}
			<div className="max-w-7xl mx-auto px-6 py-8">
				<div className="flex gap-8">
					{/* Filters sidebar */}
					<FilterSidebar filters={filters} onFilterChange={setFilters} />

					{/* Results */}
					<div className="flex-1">
						{/* Results header */}
						<div className="flex items-center justify-between mb-6">
							<div>
								<h1 className="text-2xl font-bold text-white">
									{filteredBusinesses.length} businesses found
								</h1>
								<p className="text-sm text-gray-400 mt-1">
									{searchQuery
										? `Results for "${searchQuery}"`
										: "All services in Brooklyn, NY"}
								</p>
							</div>

							{/* View toggle */}
							<div className="flex items-center gap-2 bg-white/5 p-1 rounded-lg">
								<button
									onClick={() => setView("grid")}
									className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
										view === "grid"
											? "bg-basepoint-teal text-white"
											: "text-gray-400 hover:text-white"
									}`}>
									<HiViewGrid className="w-5 h-5" />
								</button>
								<button
									onClick={() => setView("map")}
									className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
										view === "map"
											? "bg-basepoint-teal text-white"
											: "text-gray-400 hover:text-white"
									}`}>
									<HiMap className="w-5 h-5" />
								</button>
							</div>
						</div>

						{/* Results grid or map */}
						{view === "grid" ? (
							<div className="grid md:grid-cols-2 gap-6">
								{filteredBusinesses.length > 0 ? (
									filteredBusinesses.map((business) => (
										<BusinessCard key={business.id} business={business} />
									))
								) : (
									<div className="col-span-2 text-center py-12">
										<p className="text-gray-400">
											No businesses found matching your criteria
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
											className="mt-4 text-basepoint-teal hover:text-teal-400 font-semibold">
											Clear all filters
										</button>
									</div>
								)}
							</div>
						) : (
							<MapView businesses={filteredBusinesses} />
						)}
					</div>
				</div>
			</div>

			<Footer />
		</div>
	);
}

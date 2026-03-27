import { HiAdjustments } from "react-icons/hi";

interface FilterSidebarProps {
	filters: {
		category: string;
		priceRange: string;
		rating: string;
		distance: number;
		availability: string;
	};
	onFilterChange: (filters: any) => void;
}

export default function FilterSidebar({
	filters,
	onFilterChange,
}: FilterSidebarProps) {
	const updateFilter = (key: string, value: any) => {
		onFilterChange({ ...filters, [key]: value });
	};

	const categories = [
		"Hair & Beauty",
		"Fitness & Wellness",
		"Education & Tutoring",
		"Pet Services",
		"Home Services",
	];

	return (
		<div className="w-64 flex-shrink-0">
			<div className="sticky top-8 space-y-6">
				{/* Header */}
				<div className="flex items-center gap-2 text-white font-semibold">
					<HiAdjustments className="w-5 h-5" />
					Filters
				</div>

				{/* Category */}
				<div>
					<label className="block text-sm font-medium text-gray-300 mb-3">
						Category
					</label>
					<div className="space-y-2">
						<label className="flex items-center gap-2 cursor-pointer">
							<input
								type="radio"
								name="category"
								checked={filters.category === ""}
								onChange={() => updateFilter("category", "")}
								className="w-4 h-4 text-basepoint-teal border-white/10 bg-white/5 focus:ring-basepoint-teal focus:ring-offset-0"
							/>
							<span className="text-sm text-gray-300">All</span>
						</label>
						{categories.map((cat) => (
							<label
								key={cat}
								className="flex items-center gap-2 cursor-pointer">
								<input
									type="radio"
									name="category"
									checked={filters.category === cat}
									onChange={() => updateFilter("category", cat)}
									className="w-4 h-4 text-basepoint-teal border-white/10 bg-white/5 focus:ring-basepoint-teal focus:ring-offset-0"
								/>
								<span className="text-sm text-gray-300">{cat}</span>
							</label>
						))}
					</div>
				</div>

				{/* Price Range */}
				<div>
					<label className="block text-sm font-medium text-gray-300 mb-3">
						Price Range
					</label>
					<div className="space-y-2">
						{["", "$", "$$", "$$$"].map((price) => (
							<label
								key={price || "all"}
								className="flex items-center gap-2 cursor-pointer">
								<input
									type="radio"
									name="price"
									checked={filters.priceRange === price}
									onChange={() => updateFilter("priceRange", price)}
									className="w-4 h-4 text-basepoint-teal border-white/10 bg-white/5 focus:ring-basepoint-teal focus:ring-offset-0"
								/>
								<span className="text-sm text-gray-300">{price || "All"}</span>
							</label>
						))}
					</div>
				</div>

				{/* Rating */}
				<div>
					<label className="block text-sm font-medium text-gray-300 mb-3">
						Minimum Rating
					</label>
					<div className="space-y-2">
						{["", "4.5", "4.0", "3.5"].map((rating) => (
							<label
								key={rating || "all"}
								className="flex items-center gap-2 cursor-pointer">
								<input
									type="radio"
									name="rating"
									checked={filters.rating === rating}
									onChange={() => updateFilter("rating", rating)}
									className="w-4 h-4 text-basepoint-teal border-white/10 bg-white/5 focus:ring-basepoint-teal focus:ring-offset-0"
								/>
								<span className="text-sm text-gray-300 flex items-center gap-1">
									{rating ? <>{rating}+ ⭐</> : "All"}
								</span>
							</label>
						))}
					</div>
				</div>

				{/* Distance */}
				<div>
					<label className="block text-sm font-medium text-gray-300 mb-3">
						Distance: {filters.distance} miles
					</label>
					<input
						type="range"
						min="1"
						max="25"
						value={filters.distance}
						onChange={(e) => updateFilter("distance", parseInt(e.target.value))}
						className="w-full accent-basepoint-teal"
					/>
					<div className="flex justify-between text-xs text-gray-500 mt-1">
						<span>1 mi</span>
						<span>25 mi</span>
					</div>
				</div>

				{/* Availability */}
				<div>
					<label className="block text-sm font-medium text-gray-300 mb-3">
						Availability
					</label>
					<div className="space-y-2">
						{["", "today", "this-week", "this-weekend"].map((avail) => (
							<label
								key={avail || "all"}
								className="flex items-center gap-2 cursor-pointer">
								<input
									type="radio"
									name="availability"
									checked={filters.availability === avail}
									onChange={() => updateFilter("availability", avail)}
									className="w-4 h-4 text-basepoint-teal border-white/10 bg-white/5 focus:ring-basepoint-teal focus:ring-offset-0"
								/>
								<span className="text-sm text-gray-300 capitalize">
									{avail.replace("-", " ") || "Any time"}
								</span>
							</label>
						))}
					</div>
				</div>

				{/* Clear filters */}
				<button
					onClick={() =>
						onFilterChange({
							category: "",
							priceRange: "",
							rating: "",
							distance: 5,
							availability: "",
						})
					}
					className="w-full px-4 py-2 bg-white/5 text-white rounded-lg hover:bg-white/10 transition text-sm font-medium">
					Clear all filters
				</button>
			</div>
		</div>
	);
}

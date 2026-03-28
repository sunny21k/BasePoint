import { HiAdjustments, HiX, HiChevronDown, HiChevronUp } from "react-icons/hi";
import { useState } from "react";

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
	const [expandedSections, setExpandedSections] = useState({
		category: true,
		price: true,
		rating: true,
		distance: true,
		availability: true,
	});

	const updateFilter = (key: string, value: any) => {
		onFilterChange({ ...filters, [key]: value });
	};

	const toggleSection = (section: keyof typeof expandedSections) => {
		setExpandedSections((prev) => ({
			...prev,
			[section]: !prev[section],
		}));
	};

	const categories = [
		{ id: "", name: "All Categories", icon: "🌟", count: 250 },
		{ id: "Hair & Beauty", name: "Hair & Beauty", icon: "💇", count: 124 },
		{
			id: "Fitness & Wellness",
			name: "Fitness & Wellness",
			icon: "💪",
			count: 89,
		},
		{ id: "Education & Tutoring", name: "Education", icon: "📚", count: 45 },
		{ id: "Pet Services", name: "Pet Services", icon: "🐾", count: 56 },
		{ id: "Home Services", name: "Home Services", icon: "🏠", count: 78 },
	];

	const priceRanges = [
		{ value: "", label: "Any price", desc: "All businesses" },
		{ value: "$", label: "$", desc: "Budget-friendly" },
		{ value: "$$", label: "$$", desc: "Moderate" },
		{ value: "$$$", label: "$$$", desc: "Premium" },
	];

	const ratings = [
		{ value: "", label: "Any rating", stars: 0 },
		{ value: "4.5", label: "4.5+", stars: 4.5 },
		{ value: "4.0", label: "4.0+", stars: 4 },
		{ value: "3.5", label: "3.5+", stars: 3.5 },
	];

	const availabilityOptions = [
		{ value: "", label: "Any time", icon: "🕐" },
		{ value: "today", label: "Available today", icon: "⚡" },
		{ value: "this-week", label: "This week", icon: "📅" },
		{ value: "this-weekend", label: "This weekend", icon: "🎉" },
	];

	const hasActiveFilters =
		filters.category ||
		filters.priceRange ||
		filters.rating ||
		filters.distance !== 5 ||
		filters.availability;

	return (
		<div className="w-80 flex-shrink-0">
			<div className="sticky top-8 space-y-4">
				{/* Header */}
				<div className="flex items-center justify-between p-4 bg-gradient-to-r from-basepoint-teal/10 to-purple-500/10 border border-white/10 rounded-xl">
					<div className="flex items-center gap-3">
						<div className="w-10 h-10 bg-basepoint-teal/20 rounded-lg flex items-center justify-center">
							<HiAdjustments className="w-5 h-5 text-basepoint-teal" />
						</div>
						<div>
							<h3 className="text-white font-bold">Filters</h3>
							<p className="text-xs text-gray-400">Refine your search</p>
						</div>
					</div>
					{hasActiveFilters && (
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
							className="text-xs text-basepoint-teal hover:text-teal-400 font-semibold flex items-center gap-1 transition">
							<HiX className="w-3 h-3" />
							Clear
						</button>
					)}
				</div>

				{/* Category */}
				<div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
					<button
						onClick={() => toggleSection("category")}
						className="w-full px-4 py-3 flex items-center justify-between hover:bg-white/5 transition">
						<span className="text-sm font-semibold text-white">Category</span>
						{expandedSections.category ? (
							<HiChevronUp className="w-4 h-4 text-gray-400" />
						) : (
							<HiChevronDown className="w-4 h-4 text-gray-400" />
						)}
					</button>

					{expandedSections.category && (
						<div className="px-2 pb-3 space-y-1">
							{categories.map((cat) => (
								<button
									key={cat.id}
									onClick={() => updateFilter("category", cat.id)}
									className={`w-full px-3 py-2.5 rounded-lg text-left transition-all ${
										filters.category === cat.id
											? "bg-basepoint-teal/20 border border-basepoint-teal/30"
											: "hover:bg-white/5"
									}`}>
									<div className="flex items-center justify-between">
										<div className="flex items-center gap-2.5">
											<span className="text-lg">{cat.icon}</span>
											<span
												className={`text-sm font-medium ${
													filters.category === cat.id
														? "text-basepoint-teal"
														: "text-gray-300"
												}`}>
												{cat.name}
											</span>
										</div>
										<span className="text-xs text-gray-500">{cat.count}</span>
									</div>
								</button>
							))}
						</div>
					)}
				</div>

				{/* Price Range */}
				<div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
					<button
						onClick={() => toggleSection("price")}
						className="w-full px-4 py-3 flex items-center justify-between hover:bg-white/5 transition">
						<span className="text-sm font-semibold text-white">
							Price Range
						</span>
						{expandedSections.price ? (
							<HiChevronUp className="w-4 h-4 text-gray-400" />
						) : (
							<HiChevronDown className="w-4 h-4 text-gray-400" />
						)}
					</button>

					{expandedSections.price && (
						<div className="px-2 pb-3 grid grid-cols-2 gap-2">
							{priceRanges.map((price) => (
								<button
									key={price.value}
									onClick={() => updateFilter("priceRange", price.value)}
									className={`px-3 py-3 rounded-lg transition-all text-center ${
										filters.priceRange === price.value
											? "bg-basepoint-teal/20 border-2 border-basepoint-teal"
											: "bg-white/5 border-2 border-white/10 hover:border-white/20"
									}`}>
									<div
										className={`text-base font-bold mb-1 ${
											filters.priceRange === price.value
												? "text-basepoint-teal"
												: "text-white"
										}`}>
										{price.label}
									</div>
									<div className="text-xs text-gray-400">{price.desc}</div>
								</button>
							))}
						</div>
					)}
				</div>

				{/* Rating */}
				<div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
					<button
						onClick={() => toggleSection("rating")}
						className="w-full px-4 py-3 flex items-center justify-between hover:bg-white/5 transition">
						<span className="text-sm font-semibold text-white">
							Minimum Rating
						</span>
						{expandedSections.rating ? (
							<HiChevronUp className="w-4 h-4 text-gray-400" />
						) : (
							<HiChevronDown className="w-4 h-4 text-gray-400" />
						)}
					</button>

					{expandedSections.rating && (
						<div className="px-2 pb-3 space-y-2">
							{ratings.map((rating) => (
								<button
									key={rating.value}
									onClick={() => updateFilter("rating", rating.value)}
									className={`w-full px-3 py-2.5 rounded-lg transition-all ${
										filters.rating === rating.value
											? "bg-basepoint-teal/20 border border-basepoint-teal/30"
											: "bg-white/5 hover:bg-white/10"
									}`}>
									<div className="flex items-center justify-between">
										<span
											className={`text-sm font-medium ${
												filters.rating === rating.value
													? "text-basepoint-teal"
													: "text-gray-300"
											}`}>
											{rating.label}
										</span>
										<div className="flex items-center gap-0.5">
											{[...Array(5)].map((_, i) => (
												<span
													key={i}
													className={`text-xs ${
														i < Math.floor(rating.stars)
															? "text-yellow-400"
															: "text-gray-600"
													}`}>
													★
												</span>
											))}
										</div>
									</div>
								</button>
							))}
						</div>
					)}
				</div>

				{/* Distance */}
				<div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
					<button
						onClick={() => toggleSection("distance")}
						className="w-full px-4 py-3 flex items-center justify-between hover:bg-white/5 transition">
						<span className="text-sm font-semibold text-white">Distance</span>
						{expandedSections.distance ? (
							<HiChevronUp className="w-4 h-4 text-gray-400" />
						) : (
							<HiChevronDown className="w-4 h-4 text-gray-400" />
						)}
					</button>

					{expandedSections.distance && (
						<div className="px-4 pb-4">
							{/* Visual distance indicator */}
							<div className="mb-4 text-center">
								<div className="inline-flex items-center gap-2 px-4 py-2 bg-basepoint-teal/10 border border-basepoint-teal/30 rounded-full">
									<span className="text-2xl font-bold text-basepoint-teal">
										{filters.distance}
									</span>
									<span className="text-sm text-gray-300">miles</span>
								</div>
							</div>

							{/* Slider */}
							<input
								type="range"
								min="1"
								max="25"
								value={filters.distance}
								onChange={(e) =>
									updateFilter("distance", parseInt(e.target.value))
								}
								className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-basepoint-teal"
								style={{
									background: `linear-gradient(to right, rgb(20, 184, 166) 0%, rgb(20, 184, 166) ${
										((filters.distance - 1) / 24) * 100
									}%, rgba(255,255,255,0.1) ${((filters.distance - 1) / 24) * 100}%, rgba(255,255,255,0.1) 100%)`,
								}}
							/>
							<div className="flex justify-between text-xs text-gray-500 mt-2">
								<span>1 mi</span>
								<span>12 mi</span>
								<span>25 mi</span>
							</div>

							{/* Quick distance buttons */}
							<div className="grid grid-cols-3 gap-2 mt-3">
								{[2, 5, 10].map((dist) => (
									<button
										key={dist}
										onClick={() => updateFilter("distance", dist)}
										className={`px-2 py-1.5 rounded-lg text-xs font-medium transition ${
											filters.distance === dist
												? "bg-basepoint-teal text-white"
												: "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
										}`}>
										{dist} mi
									</button>
								))}
							</div>
						</div>
					)}
				</div>

				{/* Availability */}
				<div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
					<button
						onClick={() => toggleSection("availability")}
						className="w-full px-4 py-3 flex items-center justify-between hover:bg-white/5 transition">
						<span className="text-sm font-semibold text-white">
							Availability
						</span>
						{expandedSections.availability ? (
							<HiChevronUp className="w-4 h-4 text-gray-400" />
						) : (
							<HiChevronDown className="w-4 h-4 text-gray-400" />
						)}
					</button>

					{expandedSections.availability && (
						<div className="px-2 pb-3 space-y-1">
							{availabilityOptions.map((option) => (
								<button
									key={option.value}
									onClick={() => updateFilter("availability", option.value)}
									className={`w-full px-3 py-2.5 rounded-lg text-left transition-all ${
										filters.availability === option.value
											? "bg-basepoint-teal/20 border border-basepoint-teal/30"
											: "hover:bg-white/5"
									}`}>
									<div className="flex items-center gap-2.5">
										<span className="text-lg">{option.icon}</span>
										<span
											className={`text-sm font-medium ${
												filters.availability === option.value
													? "text-basepoint-teal"
													: "text-gray-300"
											}`}>
											{option.label}
										</span>
									</div>
								</button>
							))}
						</div>
					)}
				</div>

				{/* Reset button */}
				{hasActiveFilters && (
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
						className="w-full px-4 py-3 bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30 text-red-300 hover:text-red-200 rounded-xl font-semibold transition-all hover:shadow-lg hover:shadow-red-500/20 flex items-center justify-center gap-2">
						<HiX className="w-4 h-4" />
						Reset all filters
					</button>
				)}

				{/* Stats footer */}
				<div className="p-4 bg-white/5 border border-white/10 rounded-xl">
					<div className="flex items-center justify-between text-xs">
						<span className="text-gray-400">Active filters:</span>
						<span className="font-bold text-basepoint-teal">
							{
								[
									filters.category,
									filters.priceRange,
									filters.rating,
									filters.availability,
									filters.distance !== 5,
								].filter(Boolean).length
							}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}

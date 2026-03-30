import { useState } from "react";
import { HiAdjustments, HiX, HiChevronDown, HiChevronUp } from "react-icons/hi";

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
		<div className="w-full flex-shrink-0 lg:w-80">
			<div className="sticky top-8 space-y-4">
				<div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-3">
							<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white">
								<HiAdjustments className="h-5 w-5" />
							</div>
							<div>
								<h3 className="font-semibold text-slate-900">Filters</h3>
								<p className="text-xs text-slate-500">Refine your search</p>
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
								className="cursor-pointer text-xs font-semibold text-emerald-700 hover:text-emerald-900">
								Clear
							</button>
						)}
					</div>
				</div>

				<div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
					<button
						onClick={() => toggleSection("category")}
						className="flex w-full items-center justify-between px-4 py-3 hover:bg-slate-50">
						<span className="text-sm font-semibold text-slate-900">
							Category
						</span>
						{expandedSections.category ? (
							<HiChevronUp className="h-4 w-4 text-slate-400" />
						) : (
							<HiChevronDown className="h-4 w-4 text-slate-400" />
						)}
					</button>

					{expandedSections.category && (
						<div className="space-y-1 px-2 pb-3">
							{categories.map((cat) => (
								<button
									key={cat.id}
									onClick={() => updateFilter("category", cat.id)}
									className={`w-full cursor-pointer rounded-xl px-3 py-2.5 text-left transition ${
										filters.category === cat.id
											? "border border-emerald-200 bg-emerald-50"
											: "hover:bg-slate-50"
									}`}>
									<div className="flex items-center justify-between">
										<div className="flex items-center gap-2.5">
											<span className="text-lg">{cat.icon}</span>
											<span
												className={`text-sm font-medium ${
													filters.category === cat.id
														? "text-emerald-700"
														: "text-slate-700"
												}`}>
												{cat.name}
											</span>
										</div>
										<span className="text-xs text-slate-400">{cat.count}</span>
									</div>
								</button>
							))}
						</div>
					)}
				</div>

				<div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
					<button
						onClick={() => toggleSection("price")}
						className="flex w-full items-center justify-between px-4 py-3 hover:bg-slate-50">
						<span className="text-sm font-semibold text-slate-900">
							Price Range
						</span>
						{expandedSections.price ? (
							<HiChevronUp className="h-4 w-4 text-slate-400" />
						) : (
							<HiChevronDown className="h-4 w-4 text-slate-400" />
						)}
					</button>

					{expandedSections.price && (
						<div className="grid grid-cols-2 gap-2 px-3 pb-3">
							{priceRanges.map((price) => (
								<button
									key={price.value}
									onClick={() => updateFilter("priceRange", price.value)}
									className={`cursor-pointer rounded-xl border p-3 text-center transition ${
										filters.priceRange === price.value
											? "border-emerald-300 bg-emerald-50"
											: "border-slate-200 bg-white hover:bg-slate-50"
									}`}>
									<div
										className={`mb-1 text-base font-bold ${
											filters.priceRange === price.value
												? "text-emerald-700"
												: "text-slate-900"
										}`}>
										{price.label}
									</div>
									<div className="text-xs text-slate-500">{price.desc}</div>
								</button>
							))}
						</div>
					)}
				</div>

				<div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
					<button
						onClick={() => toggleSection("rating")}
						className="flex w-full items-center justify-between px-4 py-3 hover:bg-slate-50">
						<span className="text-sm font-semibold text-slate-900">
							Minimum Rating
						</span>
						{expandedSections.rating ? (
							<HiChevronUp className="h-4 w-4 text-slate-400" />
						) : (
							<HiChevronDown className="h-4 w-4 text-slate-400" />
						)}
					</button>

					{expandedSections.rating && (
						<div className="space-y-2 px-3 pb-3">
							{ratings.map((rating) => (
								<button
									key={rating.value}
									onClick={() => updateFilter("rating", rating.value)}
									className={`w-full cursor-pointer rounded-xl border px-3 py-2.5 text-left transition ${
										filters.rating === rating.value
											? "border-emerald-300 bg-emerald-50"
											: "border-slate-200 bg-white hover:bg-slate-50"
									}`}>
									<div className="flex items-center justify-between">
										<span
											className={`text-sm font-medium ${
												filters.rating === rating.value
													? "text-emerald-700"
													: "text-slate-700"
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
															: "text-slate-200"
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

				<div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
					<button
						onClick={() => toggleSection("distance")}
						className="flex w-full items-center justify-between px-4 py-3 hover:bg-slate-50">
						<span className="text-sm font-semibold text-slate-900">
							Distance
						</span>
						{expandedSections.distance ? (
							<HiChevronUp className="h-4 w-4 text-slate-400" />
						) : (
							<HiChevronDown className="h-4 w-4 text-slate-400" />
						)}
					</button>

					{expandedSections.distance && (
						<div className="px-4 pb-4">
							<div className="mb-4 text-center">
								<div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2">
									<span className="text-2xl font-bold text-emerald-700">
										{filters.distance}
									</span>
									<span className="text-sm text-slate-500">miles</span>
								</div>
							</div>

							<input
								type="range"
								min="1"
								max="25"
								value={filters.distance}
								onChange={(e) =>
									updateFilter("distance", parseInt(e.target.value))
								}
								className="h-2 w-full cursor-pointer appearance-none rounded-lg accent-emerald-600"
								style={{
									background: `linear-gradient(to right, rgb(16, 185, 129) 0%, rgb(16, 185, 129) ${
										((filters.distance - 1) / 24) * 100
									}%, rgb(226,232,240) ${((filters.distance - 1) / 24) * 100}%, rgb(226,232,240) 100%)`,
								}}
							/>

							<div className="mt-2 flex justify-between text-xs text-slate-400">
								<span>1 mi</span>
								<span>12 mi</span>
								<span>25 mi</span>
							</div>

							<div className="mt-3 grid grid-cols-3 gap-2">
								{[2, 5, 10].map((dist) => (
									<button
										key={dist}
										onClick={() => updateFilter("distance", dist)}
										className={`cursor-pointer rounded-xl px-2 py-1.5 text-xs font-medium transition ${
											filters.distance === dist
												? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white"
												: "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
										}`}>
										{dist} mi
									</button>
								))}
							</div>
						</div>
					)}
				</div>

				<div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
					<button
						onClick={() => toggleSection("availability")}
						className="flex w-full items-center justify-between px-4 py-3 hover:bg-slate-50">
						<span className="text-sm font-semibold text-slate-900">
							Availability
						</span>
						{expandedSections.availability ? (
							<HiChevronUp className="h-4 w-4 text-slate-400" />
						) : (
							<HiChevronDown className="h-4 w-4 text-slate-400" />
						)}
					</button>

					{expandedSections.availability && (
						<div className="space-y-1 px-2 pb-3">
							{availabilityOptions.map((option) => (
								<button
									key={option.value}
									onClick={() => updateFilter("availability", option.value)}
									className={`w-full cursor-pointer rounded-xl px-3 py-2.5 text-left transition ${
										filters.availability === option.value
											? "border border-emerald-200 bg-emerald-50"
											: "hover:bg-slate-50"
									}`}>
									<div className="flex items-center gap-2.5">
										<span className="text-lg">{option.icon}</span>
										<span
											className={`text-sm font-medium ${
												filters.availability === option.value
													? "text-emerald-700"
													: "text-slate-700"
											}`}>
											{option.label}
										</span>
									</div>
								</button>
							))}
						</div>
					)}
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
						className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl border border-red-200 bg-gradient-to-r from-red-50 to-orange-50 px-4 py-3 font-semibold text-red-600 transition hover:border-red-300 hover:text-red-700">
						<HiX className="h-4 w-4" />
						Reset all filters
					</button>
				)}

				<div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
					<div className="flex items-center justify-between text-xs">
						<span className="text-slate-500">Active filters:</span>
						<span className="font-bold text-emerald-700">
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

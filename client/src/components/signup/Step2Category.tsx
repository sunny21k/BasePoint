import { HiCheck } from "react-icons/hi";

interface Step2CategoryProps {
	data: { category: string };
	onUpdate: (field: string, value: string) => void;
	onNext: () => void;
	onBack: () => void;
}

export default function Step2Category({
	data,
	onUpdate,
	onNext,
	onBack,
}: Step2CategoryProps) {
	const categories = [
		{
			id: "hair-beauty",
			name: "Hair & Beauty",
			icon: "💇",
			description: "Barbershops, salons, spas",
		},
		{
			id: "fitness",
			name: "Fitness & Wellness",
			icon: "💪",
			description: "Gyms, trainers, yoga studios",
		},
		{
			id: "education",
			name: "Education & Tutoring",
			icon: "📚",
			description: "Tutors, music lessons, coaches",
		},
		{
			id: "pet-services",
			name: "Pet Services",
			icon: "🐾",
			description: "Groomers, trainers, vets",
		},
		{
			id: "home-services",
			name: "Home Services",
			icon: "🏠",
			description: "Cleaning, repairs, landscaping",
		},
		{
			id: "automotive",
			name: "Automotive",
			icon: "🚗",
			description: "Detailing, repairs, mechanics",
		},
		{
			id: "creative",
			name: "Creative & Arts",
			icon: "🎨",
			description: "Photography, art classes",
		},
		{
			id: "events",
			name: "Events & Entertainment",
			icon: "🎭",
			description: "DJs, photographers, planners",
		},
		{ id: "other", name: "Other", icon: "✨", description: "Something else" },
	];

	const handleSelect = (categoryId: string) => {
		onUpdate("category", categoryId);
		// Auto-advance after selection (optional)
		setTimeout(() => onNext(), 220);
	};

	const selected = data.category;

	return (
		<div className="max-w-4xl mx-auto px-4">
			<div className="text-center mb-8">
				<h2 className="text-2xl font-semibold text-white">
					What type of business?
				</h2>
				<p className="mt-1 text-sm text-gray-400">
					Pick the category that best matches what you do. You can fine‑tune
					services later.
				</p>
			</div>

			<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{categories.map((category) => {
					const isActive = selected === category.id;
					return (
						<button
							key={category.id}
							type="button"
							onClick={() => handleSelect(category.id)}
							className={`group relative cursor-pointer flex h-full flex-col rounded-2xl border px-4 py-4 text-left transition-all ${
								isActive
									? "border-basepoint-teal bg-basepoint-teal/10 shadow-[0_0_0_1px_rgba(45,212,191,0.2)]"
									: "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
							}`}>
							{/* Selected checkmark */}
							{isActive && (
								<div className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-basepoint-teal text-white shadow-sm">
									<HiCheck className="h-4 w-4" />
								</div>
							)}

							<div className="mb-3 text-3xl">{category.icon}</div>
							<h3 className="text-sm font-semibold text-white sm:text-base">
								{category.name}
							</h3>
							<p className="mt-1 text-xs text-gray-400 sm:text-sm">
								{category.description}
							</p>

							{/* Subtle underline accent on hover */}
							<span
								className={`mt-3 h-0.5 w-0 rounded-full bg-gradient-to-r from-basepoint-teal to-emerald-400 transition-all duration-300 group-hover:w-12 ${
									isActive ? "w-12" : ""
								}`}
							/>
						</button>
					);
				})}
			</div>

			{/* Navigation */}
			<div className="mt-8 flex items-center justify-between">
				<button
					type="button"
					onClick={onBack}
					className="rounded-xl cursor-pointer bg-white/5 px-5 py-3 text-sm font-medium text-gray-200 transition hover:bg-white/10">
					← Back
				</button>
				<button
					type="button"
					onClick={onNext}
					disabled={!selected}
					className={`rounded-xl cursor-pointer px-6 py-3 text-sm font-semibold transition ${
						selected
							? "bg-basepoint-teal text-white hover:bg-teal-500"
							: "cursor-not-allowed bg-white/5 text-gray-500"
					}`}>
					Continue →
				</button>
			</div>
		</div>
	);
}

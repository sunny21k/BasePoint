import {
	HiCheck,
	HiScissors,
	HiAcademicCap,
	HiSparkles,
	HiHome,
	HiPhotograph,
} from "react-icons/hi";
import { FaDumbbell, FaPaw, FaCarSide, FaTheaterMasks } from "react-icons/fa";

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
			icon: HiScissors,
			description: "Barbershops, salons, spas",
		},
		{
			id: "fitness",
			name: "Fitness & Wellness",
			icon: FaDumbbell,
			description: "Gyms, trainers, yoga studios",
		},
		{
			id: "education",
			name: "Education & Tutoring",
			icon: HiAcademicCap,
			description: "Tutors, music lessons, coaches",
		},
		{
			id: "pet-services",
			name: "Pet Services",
			icon: FaPaw,
			description: "Groomers, trainers, vets",
		},
		{
			id: "home-services",
			name: "Home Services",
			icon: HiHome,
			description: "Cleaning, repairs, landscaping",
		},
		{
			id: "automotive",
			name: "Automotive",
			icon: FaCarSide,
			description: "Detailing, repairs, mechanics",
		},
		{
			id: "creative",
			name: "Creative & Arts",
			icon: HiPhotograph,
			description: "Photography, art classes",
		},
		{
			id: "events",
			name: "Events & Entertainment",
			icon: FaTheaterMasks,
			description: "DJs, photographers, planners",
		},
		{
			id: "other",
			name: "Other",
			icon: HiSparkles,
			description: "Something else",
		},
	];

	const handleSelect = (categoryId: string) => {
		onUpdate("category", categoryId);
		setTimeout(() => onNext(), 220);
	};

	const selected = data.category;

	return (
		<div className="mx-auto w-full max-w-5xl px-4">
			<div className="rounded-[1.75rem] border border-slate-200 bg-white/90 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-sm lg:p-8">
				<div className="mb-10 text-center">
					<h2 className="text-2xl font-semibold tracking-tight text-slate-900">
						What type of business?
					</h2>
					<p className="mt-2 text-sm leading-6 text-slate-500">
						Pick the category that best matches what you do. You can fine-tune
						services later.
					</p>
					<p className="mt-2 text-xs leading-5 text-slate-400">
						You can change this later anytime.
					</p>
				</div>

				<div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
					{categories.map((category) => {
						const isActive = selected === category.id;
						const Icon = category.icon;

						return (
							<button
								key={category.id}
								type="button"
								onClick={() => handleSelect(category.id)}
								className={`group relative flex h-full cursor-pointer flex-col rounded-2xl border p-5 text-left transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md ${
									isActive
										? "border-emerald-300 bg-gradient-to-br from-emerald-50 via-white to-teal-50 shadow-[0_0_0_1px_rgba(16,185,129,0.12)]"
										: "border-slate-200 bg-white hover:border-emerald-200 hover:bg-emerald-50/60"
								}`}>
								{isActive && (
									<div className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-sm">
										<HiCheck className="h-4 w-4" />
									</div>
								)}

								<div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-100 to-white text-slate-700 shadow-sm">
									<Icon className="h-6 w-6" />
								</div>

								<h3
									className={`text-sm font-semibold sm:text-base ${
										isActive ? "text-emerald-700" : "text-slate-900"
									}`}>
									{category.name}
								</h3>

								<p className="mt-2 text-sm leading-6 text-slate-500">
									{category.description}
								</p>

								<span
									className={`mt-4 h-1 w-10 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 transition-all duration-300 ${
										isActive
											? "opacity-100"
											: "opacity-0 group-hover:opacity-100"
									}`}
								/>
							</button>
						);
					})}
				</div>

				<div className="mt-8 flex items-center justify-between">
					<button
						type="button"
						onClick={onBack}
						className="cursor-pointer rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 hover:text-slate-900">
						← Back
					</button>

					<button
						type="button"
						onClick={onNext}
						disabled={!selected}
						className={`rounded-2xl px-6 py-3 text-sm font-semibold transition ${
							selected
								? "cursor-pointer bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-sm hover:from-emerald-500 hover:to-teal-500"
								: "cursor-not-allowed bg-slate-100 text-slate-400"
						}`}>
						Continue →
					</button>
				</div>
			</div>
		</div>
	);
}

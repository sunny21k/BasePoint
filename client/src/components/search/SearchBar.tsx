import { HiSearch, HiLocationMarker } from "react-icons/hi";

interface SearchBarProps {
	value: string;
	onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
	return (
		<div className="flex flex-col gap-3 sm:flex-row">
			<div className="relative flex-1">
				<HiSearch className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
				<input
					type="text"
					value={value}
					onChange={(e) => onChange(e.target.value)}
					placeholder="Search for services, businesses, or categories..."
					className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-4 pl-12 text-slate-900 shadow-sm outline-none placeholder:text-slate-400 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
				/>
			</div>

			<div className="relative sm:w-64">
				<HiLocationMarker className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
				<input
					type="text"
					defaultValue="Brooklyn, NY"
					placeholder="Location"
					className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-4 pl-12 text-slate-900 shadow-sm outline-none placeholder:text-slate-400 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
				/>
			</div>

			<button className="cursor-pointer rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 px-8 py-4 font-semibold text-white shadow-sm transition hover:from-emerald-500 hover:to-teal-500">
				Search
			</button>
		</div>
	);
}

import { HiSearch, HiLocationMarker } from "react-icons/hi";

interface SearchBarProps {
	value: string;
	onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
	return (
		<div className="flex flex-col sm:flex-row gap-3">
			{/* Search input */}
			<div className="flex-1 relative">
				<HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
				<input
					type="text"
					value={value}
					onChange={(e) => onChange(e.target.value)}
					placeholder="Search for services, businesses, or categories..."
					className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-basepoint-teal transition"
				/>
			</div>

			{/* Location input */}
			<div className="sm:w-64 relative">
				<HiLocationMarker className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
				<input
					type="text"
					defaultValue="Brooklyn, NY"
					placeholder="Location"
					className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-basepoint-teal transition"
				/>
			</div>

			{/* Search button */}
			<button className="px-8 py-4 cursor-pointer bg-basepoint-teal text-white rounded-xl font-semibold hover:bg-teal-500 transition">
				Search
			</button>
		</div>
	);
}

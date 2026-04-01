interface Business {
	id: string;
	name: string;
	coordinates: { lat: number; lng: number };
}

interface MapViewProps {
	businesses: Business[];
}

export default function MapView({ businesses }: MapViewProps) {
	return (
		<div className="flex h-[600px] items-center justify-center rounded-[1.75rem] border border-slate-200 bg-white shadow-sm">
			<div className="rounded-3xl border border-dashed border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-teal-50 px-8 py-10 text-center">
				<p className="mb-2 text-lg font-semibold text-slate-900">
					Map view coming soon
				</p>
				<p className="text-sm text-slate-500">
					Showing {businesses.length} businesses on map
				</p>
				<p className="mt-4 text-xs text-slate-400">
					MAP VIEW INTEGRATION LATER!
				</p>
			</div>
		</div>
	);
}

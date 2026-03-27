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
		<div className="h-[600px] rounded-xl border border-white/10 bg-white/5 flex items-center justify-center">
			<div className="text-center">
				<p className="text-gray-400 mb-2">Map view coming soon</p>
				<p className="text-sm text-gray-500">
					Showing {businesses.length} businesses on map
				</p>
				<p className="text-xs text-gray-600 mt-4">
					(We'll integrate Google Maps or Mapbox here later)
				</p>
			</div>
		</div>
	);
}

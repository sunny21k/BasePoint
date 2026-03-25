import { Link } from "react-router-dom";

export default function FinalCTA() {
	return (
		<section className="py-16 lg:py-20">
			<div className="mx-auto max-w-4xl px-6 text-center">
				<h2 className="text-2xl font-semibold sm:text-3xl lg:text-4xl">
					Make booking feel easy for everyone.
				</h2>
				<p className="mt-3 text-sm text-gray-400 sm:text-base">
					Customers can find their next appointment. Businesses can stop
					juggling apps and let BasePoint handle the admin.
				</p>
				<div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:justify-center">
					<Link
						to="/search"
						className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-7 py-3 text-sm font-semibold text-gray-900 shadow-sm transition hover:bg-gray-100">
						I want to book services
					</Link>
					<Link
						to="/business/signup"
						className="inline-flex items-center justify-center gap-2 rounded-lg bg-basepoint-teal px-7 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-500">
						I want to manage my business
					</Link>
				</div>
			</div>
		</section>
	);
}

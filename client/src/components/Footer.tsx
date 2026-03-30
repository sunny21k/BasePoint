import { Link } from "react-router-dom";

export default function Footer() {
	return (
		<footer className="border-t border-slate-200 bg-white py-10">
			<div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
				<div className="flex items-center gap-3">
					<div className="flex h-8 w-8 items-center justify-center rounded-xl bg-sky-600 text-xs font-bold text-white shadow-sm">
						BP
					</div>
					<div>
						<p className="font-semibold text-slate-900">BasePoint</p>
						<p className="text-xs text-slate-500">
							Booking software for local service businesses
						</p>
					</div>
				</div>

				<div className="flex flex-wrap items-center gap-4">
					<span>© {new Date().getFullYear()} BasePoint Inc.</span>
					<Link to="/privacy" className="transition hover:text-slate-900">
						Privacy
					</Link>
					<Link to="/terms" className="transition hover:text-slate-900">
						Terms
					</Link>
					<Link to="/support" className="transition hover:text-slate-900">
						Support
					</Link>
				</div>
			</div>
		</footer>
	);
}

import { Link } from "react-router-dom";

export default function CustomerHome() {
	return (
		<div className="min-h-screen bg-green-50 text-slate-900">
			<div className="mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-6 py-12">
				<div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
					<div className="mb-6 flex items-center gap-3">
						<div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-600 text-lg font-bold text-white shadow-sm">
							BP
						</div>
						<div>
							<p className="text-sm font-semibold text-slate-900">BasePoint</p>
							<p className="text-xs text-slate-500">Customer home</p>
						</div>
					</div>

					<h1 className="text-3xl font-bold tracking-tight text-slate-900">
						Welcome to your customer dashboard
					</h1>
					<p className="mt-3 max-w-2xl text-slate-600">
						This is your starting point for browsing services, managing
						bookings, and checking your appointment history.
					</p>

					<div className="mt-8 flex flex-wrap gap-3">
						<Link
							to="/search"
							className="rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-500">
							Browse services
						</Link>
						<Link
							to="/customer/bookings"
							className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
							My bookings
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}

import { Link } from "react-router-dom";

export default function AccountMismatch() {
	return (
		<div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(219,234,254,0.95),transparent_35%),linear-gradient(135deg,rgba(239,246,255,1),rgba(255,255,255,1))] text-slate-900">
			<div className="flex min-h-screen items-center justify-center px-6 py-12">
				<div className="w-full max-w-lg rounded-3xl border border-blue-100 bg-white/90 p-8 shadow-xl backdrop-blur">
					<div className="mb-6 flex justify-center">
						<div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-blue-100 text-3xl shadow-sm">
							⚠️
						</div>
					</div>

					<div className="text-center">
						<p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">
							Account mismatch
						</p>
						<h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
							This is a business account
						</h1>
						<p className="mt-4 text-base leading-7 text-slate-600">
							The email and password you entered belong to a business owner
							account. Please use the business login page to continue.
						</p>
					</div>

					<div className="mt-8 space-y-3">
						<Link
							to="/business/login"
							className="inline-flex w-full items-center justify-center rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-500">
							Go to business login
						</Link>

						<Link
							to="/customer/login"
							className="inline-flex w-full items-center justify-center rounded-2xl border border-blue-100 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-blue-50">
							Go back to customer login
						</Link>
					</div>

					<p className="mt-6 text-center text-sm text-slate-500">
						If you meant to book as a customer, use the customer login page.
					</p>
				</div>
			</div>
		</div>
	);
}

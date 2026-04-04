import { Link } from "react-router-dom";

export default function AccountMismatch() {
	return (
		<div className="min-h-screen bg-green-50 text-slate-900">
			<div className="flex min-h-screen items-center justify-center px-6 py-12">
				<div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
					<div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-100 text-3xl">
						⚠️
					</div>

					<h1 className="text-2xl font-bold tracking-tight text-slate-900">
						Account type mismatch
					</h1>

					<p className="mt-3 text-sm leading-6 text-slate-600">
						This email and password belong to a business account. Please use the
						business login page to continue.
					</p>

					<div className="mt-8">
						<Link
							to="/business/login"
							className="inline-flex cursor-pointer w-full items-center justify-center rounded-2xl bg-blue-400 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-500">
							Go back to business login
						</Link>
					</div>

					<div className="mt-3">
						<Link
							to="/customer/login"
							className="inline-flex cursor-pointer w-full items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
							Go back to customer login
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}

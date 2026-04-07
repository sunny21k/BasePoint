import { Link } from "react-router-dom";

export default function RejectedPage() {
	return (
		<div className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
			<div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
				<div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-rose-100">
					<span className="text-3xl">⛔</span>
				</div>

				<h1 className="text-3xl font-bold tracking-tight text-slate-900">
					Account Rejected
				</h1>

				<p className="mt-3 text-sm leading-6 text-slate-600">
					Your business account was not approved at this time. Please review any
					instructions from the admin or contact support for more information.
				</p>

				<div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
					<Link
						to="/support"
						className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
						Contact Support
					</Link>
					<Link
						to="/business/login"
						className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100">
						Back to Login
					</Link>
				</div>
			</div>
		</div>
	);
}

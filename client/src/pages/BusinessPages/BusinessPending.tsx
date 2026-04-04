import { Link, useLocation, useNavigate } from "react-router-dom";
import { HiClock, HiCheckCircle, HiArrowRight } from "react-icons/hi2";

export default function BusinessPending() {
	const navigate = useNavigate();
	const location = useLocation();
	const businessName =
		(location.state as { businessName?: string } | null)?.businessName ||
		"your business";

	return (
		<div className="min-h-screen bg-sky-50 px-6 py-12 text-slate-900">
			<div className="mx-auto flex min-h-[80vh] w-full max-w-2xl items-center justify-center">
				<div className="w-full rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
					<div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-amber-100 text-amber-600">
						<HiClock className="h-8 w-8" />
					</div>

					<h1 className="mt-6 text-center text-3xl font-bold tracking-tight text-slate-900">
						Application received
					</h1>
					<p className="mt-3 text-center text-slate-600">
						Thanks for submitting {businessName}. We’re reviewing your business
						verification now.
					</p>

					<div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5">
						<div className="flex items-start gap-3">
							<HiCheckCircle className="mt-0.5 h-5 w-5 text-sky-600" />
							<div>
								<p className="font-medium text-slate-900">What happens next</p>
								<p className="mt-1 text-sm text-slate-600">
									Our team will review your application and approve the account
									if everything looks good.
								</p>
							</div>
						</div>
					</div>

					<div className="mt-8 flex flex-col gap-3 sm:flex-row">
						<button
							onClick={() => navigate("/business/login")}
							className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-50">
							Back to login
						</button>
						<Link
							to="/"
							className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-sky-600 px-5 py-3 font-semibold text-white transition hover:bg-sky-700">
							Go home
							<HiArrowRight className="h-5 w-5" />
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}

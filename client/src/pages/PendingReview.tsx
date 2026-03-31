import { Link } from "react-router-dom";
import { FiCheckCircle, FiClock, FiShield, FiMail } from "react-icons/fi";

export default function PendingReview() {
	return (
		<div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(20,184,166,0.10),transparent_28%),linear-gradient(180deg,#f8fafc_0%,#ecfeff_45%,#ffffff_100%)] px-4 py-10 text-slate-900 sm:px-6 lg:px-8">
			<div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-3xl items-center justify-center">
				<div className="w-full rounded-[2rem] border border-white/70 bg-white/85 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.10)] backdrop-blur-xl sm:p-8">
					<div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 ring-8 ring-emerald-100">
						<FiClock className="h-7 w-7 text-emerald-600" />
					</div>

					<div className="mt-6 text-center">
						<div className="inline-flex rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
							Account under review
						</div>

						<h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
							Almost there!
						</h1>

						<p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
							We’ll email you once review is complete.
						</p>
					</div>

					<div className="mt-8 grid gap-4 sm:grid-cols-3">
						<div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
							<FiShield className="h-5 w-5 text-emerald-600" />
							<h2 className="mt-3 text-sm font-semibold text-slate-900">
								Protect customers
							</h2>
							<p className="mt-1 text-sm leading-6 text-slate-500">
								We review businesses to reduce fake listings and keep the
								platform trustworthy.
							</p>
						</div>

						<div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
							<FiCheckCircle className="h-5 w-5 text-emerald-600" />
							<h2 className="mt-3 text-sm font-semibold text-slate-900">
								Maintain quality
							</h2>
							<p className="mt-1 text-sm leading-6 text-slate-500">
								Every approved business meets our basic verification standards.
							</p>
						</div>

						<div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
							<FiMail className="h-5 w-5 text-emerald-600" />
							<h2 className="mt-3 text-sm font-semibold text-slate-900">
								Email updates
							</h2>
							<p className="mt-1 text-sm leading-6 text-slate-500">
								We&apos;ll email you when your account is approved or if we need
								more information.
							</p>
						</div>
					</div>

					<div className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
						<h2 className="text-sm font-semibold text-slate-900">
							What happens next
						</h2>

						<ol className="mt-4 space-y-3 text-sm text-slate-600">
							<li className="flex gap-3">
								<span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-50 text-xs font-semibold text-emerald-700">
									1
								</span>
								<span>We review your business info.</span>
							</li>
							<li className="flex gap-3">
								<span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-50 text-xs font-semibold text-emerald-700">
									2
								</span>
								<span>You receive an approved or rejected email.</span>
							</li>
							<li className="flex gap-3">
								<span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-50 text-xs font-semibold text-emerald-700">
									3
								</span>
								<span>Once approved, your page goes live.</span>
							</li>
						</ol>
					</div>

					<div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
						<button
							type="button"
							className="cursor-pointer rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:from-emerald-500 hover:to-teal-500">
							Resend verification email
						</button>

						<Link
							to="/support"
							className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50">
							Contact support
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}

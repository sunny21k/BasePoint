import { Link } from "react-router-dom";

export default function FinalCTA() {
	return (
		<section className="border-t border-slate-200 bg-slate-50 py-16 lg:py-20">
			<div className="mx-auto max-w-4xl px-6">
				<div className="rounded-[2rem] border border-slate-200 bg-white px-6 py-12 text-center shadow-sm sm:px-10">
					<p className="text-sm font-medium text-sky-700">
						Ready to get started?
					</p>

					<h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
						Make booking easier for everyone.
					</h2>

					<p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
						Customers can find their next appointment. Businesses can stop
						juggling apps and let BasePoint handle the admin.
					</p>

					<div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
						<Link
							to="/search"
							className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800">
							I want to book services
						</Link>

						<Link
							to="/business/signup"
							className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50">
							I want to manage my business
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
}

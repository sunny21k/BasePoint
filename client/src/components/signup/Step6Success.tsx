import { Link } from "react-router-dom";
import { HiCheckCircle, HiClipboardCopy } from "react-icons/hi";
import { useState } from "react";

interface Step6SuccessProps {
	businessName: string;
}

export default function Step6Success({ businessName }: Step6SuccessProps) {
	const [copied, setCopied] = useState(false);
	const slug = businessName.toLowerCase().replace(/[^a-z0-9]+/g, "-");
	const bookingLink = `basepoint.io/${slug}`;

	const copyLink = () => {
		navigator.clipboard.writeText(`https://${bookingLink}`);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<div className="mx-auto w-full max-w-3xl px-4">
			<div className="rounded-[1.75rem] border border-slate-200 bg-white/90 p-6 text-center shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-sm lg:p-8">
				<div className="mb-6 flex justify-center">
					<div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-emerald-100 to-teal-100 shadow-sm">
						<HiCheckCircle className="h-12 w-12 text-emerald-600" />
					</div>
				</div>

				<h2 className="mb-3 text-4xl font-bold tracking-tight text-slate-900">
					You&apos;re all set!
				</h2>
				<p className="mb-8 text-lg text-slate-500">
					Your booking page is live and ready to accept appointments.
				</p>

				<div className="mb-6 rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-6 text-left shadow-sm">
					<p className="mb-3 text-sm font-medium text-slate-500">
						Your booking link:
					</p>

					<div className="flex flex-col gap-3 sm:flex-row sm:items-center">
						<div className="flex-1 rounded-2xl border border-slate-200 bg-white px-4 py-3 font-mono text-sm text-slate-900 shadow-sm">
							{bookingLink}
						</div>

						<button
							onClick={copyLink}
							className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:from-emerald-500 hover:to-teal-500">
							{copied ? (
								<>
									<HiCheckCircle className="h-5 w-5" />
									Copied!
								</>
							) : (
								<>
									<HiClipboardCopy className="h-5 w-5" />
									Copy
								</>
							)}
						</button>
					</div>
				</div>

				<div className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm">
					<h3 className="mb-4 text-base font-semibold text-slate-900">
						Quick next steps:
					</h3>
					<ul className="space-y-3 text-sm text-slate-600">
						<li className="flex items-start gap-3">
							<span className="mt-0.5 text-emerald-600">✓</span>
							<span>
								Share your link in your Instagram bio, website, and business
								cards.
							</span>
						</li>
						<li className="flex items-start gap-3">
							<span className="mt-0.5 text-emerald-600">✓</span>
							<span>Connect Stripe to accept online payments.</span>
						</li>
						<li className="flex items-start gap-3">
							<span className="mt-0.5 text-emerald-600">✓</span>
							<span>Customize your booking page with colors and photos.</span>
						</li>
					</ul>
				</div>

				<Link
					to="/business/dashboard"
					className="inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 px-8 py-4 font-semibold text-white shadow-sm transition hover:from-emerald-500 hover:to-teal-500 sm:w-auto">
					Go to Dashboard →
				</Link>

				<p className="mt-4 text-sm text-slate-500">
					You can always change these settings later.
				</p>
			</div>
		</div>
	);
}

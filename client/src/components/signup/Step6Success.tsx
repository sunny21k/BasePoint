import {
	useBusinessAuth,
	API_URL,
} from "../../pages/BusinessPages/BusinessAuthContext";
import { useNavigate } from "react-router-dom";
import {
	HiCheckCircle,
	HiClipboardCopy,
	HiOutlineInformationCircle,
	HiOutlineExternalLink,
} from "react-icons/hi";
import { useState } from "react";
import axios from "axios";

interface Step6SuccessProps {
	businessName: string;
}

export default function Step6Success({ businessName }: Step6SuccessProps) {
	const { refreshAuth } = useBusinessAuth();
	const navigate = useNavigate();
	const [copied, setCopied] = useState(false);

	const slug = businessName.toLowerCase().replace(/[^a-z0-9]+/g, "-");
	const bookingLink = `basepoint.io/${slug}`;

	const copyLink = () => {
		navigator.clipboard.writeText(`https://${bookingLink}`);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	const completeOnboarding = async () => {
		try {
			// Just refresh auth and navigate - data is already saved
			await refreshAuth();
			navigate("/business/dashboard", { replace: true });
		} catch (err) {
			console.error("Navigation failed:", err);
		}
	};

	return (
		<div className="mx-auto w-full max-w-3xl px-4">
			<div className="rounded-[1.75rem] border border-slate-200 bg-white/90 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-sm lg:p-8">
				<div className="mb-6 flex justify-center">
					<div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-emerald-100 to-teal-100 shadow-sm">
						<HiCheckCircle className="h-12 w-12 text-emerald-600" />
					</div>
				</div>

				<h2 className="mb-3 text-4xl font-bold tracking-tight text-slate-900">
					You&apos;re all set!
				</h2>
				<p className="mb-2 text-lg text-slate-500">
					Your booking page is live and ready to accept appointments.
				</p>

				<div className="mb-6 rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-6 text-left shadow-sm">
					<div className="mb-3 flex items-center gap-2">
						<HiOutlineInformationCircle className="h-5 w-5 text-emerald-600" />
						<p className="text-sm font-medium text-slate-700">
							Share your booking link anywhere customers can find you.
						</p>
					</div>

					<div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
						<div className="flex min-h-14 flex-1 items-center rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
							<span className="font-mono text-sm text-slate-900">
								{bookingLink}
							</span>
						</div>

						<button
							type="button"
							onClick={copyLink}
							className="inline-flex min-h-14 cursor-pointer items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:from-emerald-500 hover:to-teal-500 sm:min-w-32">
							{copied ? (
								<>
									<HiCheckCircle className="h-5 w-5" />
									Copied
								</>
							) : (
								<>
									<HiClipboardCopy className="h-5 w-5" />
									Copy
								</>
							)}
						</button>
					</div>

					<div className="mt-3 flex items-center gap-2 text-xs text-slate-400">
						<HiOutlineExternalLink className="h-4 w-4" />
						<span>https://{bookingLink}</span>
					</div>
				</div>

				<button
					onClick={completeOnboarding}
					className="inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 px-8 py-4 font-semibold text-white shadow-sm transition hover:from-emerald-500 hover:to-teal-500 sm:w-auto">
					Go to Dashboard →
				</button>
			</div>
		</div>
	);
}

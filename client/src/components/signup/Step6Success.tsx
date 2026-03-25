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
		<div className="max-w-2xl mx-auto text-center">
			{/* Success icon */}
			<div className="mb-6">
				<div className="w-20 h-20 bg-basepoint-teal/20 rounded-full flex items-center justify-center mx-auto">
					<HiCheckCircle className="w-12 h-12 text-basepoint-teal" />
				</div>
			</div>

			<h2 className="text-4xl font-bold text-white mb-3">You're all set!</h2>
			<p className="text-lg text-gray-400 mb-8">
				Your booking page is live and ready to accept appointments
			</p>

			{/* Booking link */}
			<div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-6">
				<p className="text-sm text-gray-400 mb-3">Your booking link:</p>
				<div className="flex items-center gap-3">
					<div className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-basepoint-teal font-mono text-sm">
						{bookingLink}
					</div>
					<button
						onClick={copyLink}
						className="px-4 py-3 bg-basepoint-teal text-white rounded-lg cursor-pointer hover:bg-teal-500 transition flex items-center gap-2">
						{copied ? (
							<>
								<HiCheckCircle className="w-5 h-5" />
								Copied!
							</>
						) : (
							<>
								<HiClipboardCopy className="w-5 h-5" />
								Copy
							</>
						)}
					</button>
				</div>
			</div>

			{/* Next steps */}
			<div className="text-left bg-white/5 border border-white/10 rounded-xl p-6 mb-8">
				<h3 className="font-semibold text-white mb-4">Quick next steps:</h3>
				<ul className="space-y-3 text-sm text-gray-300">
					<li className="flex items-start gap-3">
						<span className="text-basepoint-teal mt-1">✓</span>
						<span>
							Share your link in your Instagram bio, website, and business cards
						</span>
					</li>
					<li className="flex items-start gap-3">
						<span className="text-basepoint-teal mt-1">✓</span>
						<span>Connect Stripe to accept online payments</span>
					</li>
					<li className="flex items-start gap-3">
						<span className="text-basepoint-teal mt-1">✓</span>
						<span>Customize your booking page with colors and photos</span>
					</li>
				</ul>
			</div>

			{/* CTA */}
			<Link
				to="/dashboard"
				className="inline-block w-full sm:w-auto px-8 py-4 bg-basepoint-teal text-white rounded-lg font-semibold hover:bg-teal-500 transition">
				Go to Dashboard →
			</Link>

			<p className="mt-4 text-sm text-gray-500">
				You can always change these settings later
			</p>
		</div>
	);
}

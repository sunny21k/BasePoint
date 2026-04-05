import { Link } from "react-router-dom";

type Role = "business" | "customer";

interface AccountMismatchProps {
	role?: Role;
}

export default function AccountMismatch({
	role = "business",
}: AccountMismatchProps) {
	const isBusiness = role === "business";

	const theme = isBusiness
		? {
				bg: "bg-[radial-gradient(circle_at_top,rgba(219,234,254,0.95),transparent_35%),linear-gradient(135deg,rgba(239,246,255,1),rgba(255,255,255,1))]",
				accent: "bg-blue-100",
				accentText: "text-blue-600",
				badgeText: "text-blue-500",
				button: "bg-blue-600 hover:bg-blue-500",
				buttonBorder: "border-blue-100 hover:bg-blue-50",
				headline: "This is a business account",
				subtext:
					"The email and password you entered belong to a business owner account. Please use the business login page to continue.",
				primaryLink: "/business/login",
				primaryLabel: "Go to business login",
				secondaryLabel: "Go back to customer login",
			}
		: {
				bg: "bg-[radial-gradient(circle_at_top,rgba(254,215,170,0.95),transparent_35%),linear-gradient(135deg,rgba(255,247,237,1),rgba(255,255,255,1))]",
				accent: "bg-orange-100",
				accentText: "text-orange-600",
				badgeText: "text-orange-500",
				button: "bg-orange-600 hover:bg-orange-500",
				buttonBorder: "border-orange-100 hover:bg-orange-50",
				headline: "This is a customer account",
				subtext:
					"The email and password you entered belong to a customer account. Please use the customer login page to continue.",
				primaryLink: "/customer/login",
				primaryLabel: "Go to customer login",
				secondaryLabel: "Go back to business login",
			};

	return (
		<div className={`min-h-screen text-slate-900 ${theme.bg}`}>
			<div className="flex min-h-screen items-center justify-center px-6 py-12">
				<div className="w-full max-w-lg rounded-3xl border border-white/70 bg-white/90 p-8 shadow-xl backdrop-blur">
					<div className="mb-6 flex justify-center">
						<div
							className={`flex h-16 w-16 items-center justify-center rounded-3xl ${theme.accent} text-3xl shadow-sm`}>
							⚠️
						</div>
					</div>

					<div className="text-center">
						<p
							className={`text-sm font-semibold uppercase tracking-[0.2em] ${theme.badgeText}`}>
							Account mismatch
						</p>
						<h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
							{theme.headline}
						</h1>
						<p className="mt-4 text-base leading-7 text-slate-600">
							{theme.subtext}
						</p>
					</div>

					<div className="mt-8 space-y-3">
						<Link
							to={theme.primaryLink}
							className={`inline-flex w-full items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold text-white shadow-sm transition ${theme.button}`}>
							{theme.primaryLabel}
						</Link>

						<Link
							to={isBusiness ? "/customer/login" : "/business/login"}
							className={`inline-flex w-full items-center justify-center rounded-2xl border px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition ${theme.buttonBorder}`}>
							{theme.secondaryLabel}
						</Link>
					</div>

					<p className="mt-6 text-center text-sm text-slate-500">
						Please use the correct login page for the account type you created.
					</p>
				</div>
			</div>
		</div>
	);
}

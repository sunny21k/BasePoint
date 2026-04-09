import { useBusinessAuth } from "./BusinessAuthContext";
import { useLocation, useNavigate, Outlet } from "react-router-dom";
import { useEffect } from "react";

export default function BusinessStatusRoute() {
	const { accountStatus, verificationStatus, isOnBoarded, isLoading } =
		useBusinessAuth();
	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		if (isLoading) return;

		let redirectPath = "";

		if (verificationStatus === "not_submitted") {
			redirectPath = "/business/verification";
		} else if (
			verificationStatus === "submitted" &&
			accountStatus === "pending"
		) {
			redirectPath = "/business/pending";
		} else if (accountStatus === "rejected") {
			redirectPath = "/business/rejected";
		} else if (accountStatus === "approved" && !isOnBoarded) {
			redirectPath = "/business/onboarding";
		} else if (accountStatus === "approved" && isOnBoarded) {
			redirectPath = "/business/dashboard";
		}

		if (redirectPath && !location.pathname.startsWith(redirectPath)) {
			navigate(redirectPath, { replace: true });
		}
	}, [
		accountStatus,
		verificationStatus,
		isOnBoarded,
		isLoading,
		location.pathname,
		navigate,
	]);

	if (isLoading) {
		return (
			<div className="flex min-h-screen items-center justify-center bg-sky-50 text-slate-700">
				<div className="text-center">
					<div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-sky-600 border-t-transparent"></div>
					<p>Loading...</p>
				</div>
			</div>
		);
	}

	return <Outlet />;
}

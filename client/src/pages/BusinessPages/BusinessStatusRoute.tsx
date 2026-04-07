import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useBusinessAuth } from "./BusinessAuthContext";

export default function BusinessStatusRoute() {
	const { accountStatus, isOnBoarded, isLoading } = useBusinessAuth();
	const location = useLocation();

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

	if (
		accountStatus === "pending" &&
		location.pathname !== "/business/pending"
	) {
		return <Navigate to="/business/pending" replace />;
	}

	if (
		accountStatus === "rejected" &&
		location.pathname !== "/business/rejected"
	) {
		return <Navigate to="/business/rejected" replace />;
	}

	if (
		accountStatus === "approved" &&
		!isOnBoarded &&
		location.pathname !== "/business/onboarding"
	) {
		return <Navigate to="/business/onboarding" replace />;
	}

	if (
		accountStatus === "approved" &&
		isOnBoarded &&
		!location.pathname.startsWith("/business/dashboard")
	) {
		return <Navigate to="/business/dashboard" replace />;
	}

	return <Outlet />;
}

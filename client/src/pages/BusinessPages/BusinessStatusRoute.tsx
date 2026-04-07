import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useBusinessAuth } from "./BusinessAuthContext";

export default function BusinessStatusRoute() {
	const { accountStatus, isOnBoarded, isLoading } = useBusinessAuth();
	const location = useLocation();

	if (isLoading) {
		return <div>Loading...</div>;
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

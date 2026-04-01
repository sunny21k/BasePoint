import { Navigate, Outlet } from "react-router-dom";
import { useBusinessAuth } from "./BusinessAuthContext";

export default function BusinessProtectedRoute() {
	const { isAuthenticated, accountStatus, isLoading } = useBusinessAuth();

	if (isLoading) {
		return (
			<div className="flex min-h-screen items-center justify-center bg-sky-50 text-slate-700">
				Loading...
			</div>
		);
	}

	if (!isAuthenticated) {
		return <Navigate to="/business/login" replace />;
	}

	if (accountStatus === "pending") {
		return <Navigate to="/business/pending" replace />;
	}

	if (accountStatus === "rejected") {
		return <Navigate to="/business/signup" replace />;
	}

	return <Outlet />;
}

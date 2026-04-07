import { Navigate, Outlet } from "react-router-dom";
import { useBusinessAuth } from "./BusinessAuthContext";

export default function BusinessProtectedRoute() {
	const { isAuthenticated, isLoading } = useBusinessAuth();

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

	if (!isAuthenticated) {
		return <Navigate to="/business/login" replace />;
	}

	return <Outlet />;
}

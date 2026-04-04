import { Navigate, Outlet } from "react-router-dom";
import { useBusinessAuth } from "./BusinessAuthContext";

export default function BusinessProtectedRoute() {
	const { isAuthenticated, accountStatus, isLoading } = useBusinessAuth();

	console.log("Protected Route Check:", {
		isAuthenticated,
		accountStatus,
		isLoading,
	});

	if (isLoading) {
		return (
			<div className="flex min-h-screen items-center justify-center bg-sky-50 text-slate-700">
				<div className="text-center">
					<div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-sky-600 border-t-transparent mx-auto"></div>
					<p>Loading...</p>
				</div>
			</div>
		);
	}

	if (!isAuthenticated) {
		console.log("Not authenticated, redirecting to login");
		return <Navigate to="/business/login" replace />;
	}

	if (accountStatus === "pending") {
		console.log("Account pending, redirecting to pending page");
		return <Navigate to="/business/pending" replace />;
	}

	if (accountStatus === "rejected") {
		console.log("Account rejected, redirecting to signup");
		return <Navigate to="/business/signup" replace />;
	}

	console.log("Access granted to dashboard");
	return <Outlet />;
}

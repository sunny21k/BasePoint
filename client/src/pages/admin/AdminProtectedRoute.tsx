import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAdminAuth } from "./AdminAuthContext";

export default function AdminProtectedRoute() {
	const { admin, token, loading } = useAdminAuth();
	const location = useLocation();

	if (loading) return null;

	if (!token || !admin || admin.role !== "admin") {
		return <Navigate to="/admin/login" replace state={{ from: location }} />;
	}

	return <Outlet />;
}

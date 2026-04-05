import { Navigate, Outlet } from "react-router-dom";

type RoleRouteProps = {
	allowedRole: "business" | "customer" | "admin";
};

export default function RoleRoute({ allowedRole }: RoleRouteProps) {
	const token = localStorage.getItem("token");
	const role = localStorage.getItem("role");

	if (!token) {
		return <Navigate to="/" replace />;
	}

	if (role !== allowedRole) {
		return <Navigate to="/account-mismatch" replace state={{ role }} />;
	}

	return <Outlet />;
}

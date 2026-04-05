import { createContext, useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type AdminUser = {
	id: string;
	email: string;
	role: "admin";
};

type AdminLoginResponse = {
	token: string;
	user: AdminUser;
};

type AdminAuthContextType = {
	admin: AdminUser | null;
	token: string | null;
	loading: boolean;
	login: (email: string, password: string) => Promise<void>;
	logout: () => void;
};

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(
	undefined,
);

export const AdminAuthProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const navigate = useNavigate();
	const [admin, setAdmin] = useState<AdminUser | null>(null);
	const [token, setToken] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const storedToken = localStorage.getItem("adminToken");
		const storedAdmin = localStorage.getItem("adminUser");

		if (storedToken && storedAdmin) {
			setToken(storedToken);
			setAdmin(JSON.parse(storedAdmin));
		}

		setLoading(false);
	}, []);

	const login = async (email: string, password: string) => {
		const res = await axios.post<AdminLoginResponse>(
			"http://localhost:5000/api/admin/login",
			{ email, password },
		);

		if (res.data.user.role !== "admin") {
			throw new Error("Access denied");
		}

		localStorage.setItem("adminToken", res.data.token);
		localStorage.setItem("adminUser", JSON.stringify(res.data.user));
		setToken(res.data.token);
		setAdmin(res.data.user);

		navigate("/admin");
	};

	const logout = () => {
		localStorage.removeItem("adminToken");
		localStorage.removeItem("adminUser");
		setToken(null);
		setAdmin(null);
		navigate("/admin/login");
	};

	const value = useMemo(
		() => ({ admin, token, loading, login, logout }),
		[admin, token, loading],
	);

	return (
		<AdminAuthContext.Provider value={value}>
			{children}
		</AdminAuthContext.Provider>
	);
};

export const useAdminAuth = () => {
	const ctx = useContext(AdminAuthContext);
	if (!ctx)
		throw new Error("useAdminAuth must be used inside AdminAuthProvider");
	return ctx;
};

import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

type AccountStatus = "approved" | "pending" | "rejected" | "unknown";

type BusinessAuthContextType = {
	isAuthenticated: boolean;
	accountStatus: AccountStatus;
	isOnBoarded: boolean;
	isLoading: boolean;
	refreshAuth: () => Promise<void>;
	logout: () => void;
};

const BusinessAuthContext = createContext<BusinessAuthContextType | undefined>(
	undefined,
);

const API_URL = "http://localhost:3000";

export function BusinessAuthProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [accountStatus, setAccountStatus] = useState<AccountStatus>("unknown");
	const [isOnBoarded, setIsOnBoarded] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	const fetchAuth = async () => {
		setIsLoading(true);
		try {
			const token = localStorage.getItem("token");

			if (!token) {
				setIsAuthenticated(false);
				setAccountStatus("unknown");
				setIsOnBoarded(false);
				return;
			}

			const response = await axios.get(`${API_URL}/api/business/me`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			if (response.data.user) {
				setIsAuthenticated(true);
				setAccountStatus(response.data.user.accountStatus || "unknown");
				setIsOnBoarded(Boolean(response.data.business?.isOnBoarded));
			} else {
				setIsAuthenticated(false);
				setAccountStatus("unknown");
				setIsOnBoarded(false);
			}
		} catch (error) {
			console.error("Auth check failed:", error);
			setIsAuthenticated(false);
			setAccountStatus("unknown");
			setIsOnBoarded(false);
			localStorage.removeItem("token");
		} finally {
			setIsLoading(false);
		}
	};

	const logout = () => {
		localStorage.removeItem("token");
		setIsAuthenticated(false);
		setAccountStatus("unknown");
		setIsOnBoarded(false);
		setIsLoading(false);
	};

	useEffect(() => {
		fetchAuth();
	}, []);

	return (
		<BusinessAuthContext.Provider
			value={{
				isAuthenticated,
				accountStatus,
				isOnBoarded,
				isLoading,
				refreshAuth: fetchAuth,
				logout,
			}}>
			{children}
		</BusinessAuthContext.Provider>
	);
}

export function useBusinessAuth() {
	const context = useContext(BusinessAuthContext);
	if (!context) {
		throw new Error("useBusinessAuth must be used within BusinessAuthProvider");
	}
	return context;
}

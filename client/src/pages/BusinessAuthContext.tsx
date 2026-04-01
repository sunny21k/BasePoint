import { createContext, useContext, useEffect, useState } from "react";

type AccountStatus = "approved" | "pending" | "rejected" | "unknown";

type BusinessAuthContextType = {
	isAuthenticated: boolean;
	accountStatus: AccountStatus;
	isLoading: boolean;
	refreshAuth: () => void;
};

const BusinessAuthContext = createContext<BusinessAuthContextType | undefined>(
	undefined,
);

export function BusinessAuthProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [accountStatus, setAccountStatus] = useState<AccountStatus>("unknown");
	const [isLoading, setIsLoading] = useState(true);

	const fetchAuth = async () => {
		setIsLoading(true);
		try {
			const response = await fetch("/api/business/me", {
				credentials: "include",
			});

			if (!response.ok) {
				setIsAuthenticated(false);
				setAccountStatus("unknown");
				return;
			}

			const data = await response.json();
			setIsAuthenticated(Boolean(data.isAuthenticated));
			setAccountStatus(data.accountStatus ?? "unknown");
		} catch {
			setIsAuthenticated(false);
			setAccountStatus("unknown");
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchAuth();
	}, []);

	return (
		<BusinessAuthContext.Provider
			value={{
				isAuthenticated,
				accountStatus,
				isLoading,
				refreshAuth: fetchAuth,
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

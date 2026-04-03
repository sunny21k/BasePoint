import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import axios from "axios";

type User = {
	_id: string;
	email: string;
	role: string;
	accountStatus: string;
	businessName?: string;
};

type AuthContextType = {
	user: User | null;
	token: string | null;
	isAuthenticated: boolean;
	isLoading: boolean;
	login: (user: User, token: string) => void;
	logout: () => void;
	refreshAuth: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_URL = "http://localhost:3000";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<User | null>(null);
	const [token, setToken] = useState<string | null>(() =>
		localStorage.getItem("token"),
	);
	const [isLoading, setIsLoading] = useState(true);

	const isAuthenticated = !!user && !!token;

	const login = (newUser: User, newToken: string) => {
		setUser(newUser);
		setToken(newToken);
		localStorage.setItem("token", newToken);
	};

	const logout = () => {
		setUser(null);
		setToken(null);
		localStorage.removeItem("token");
	};

	const refreshAuth = async () => {
		const savedToken = localStorage.getItem("token");

		if (!savedToken) {
			setIsLoading(false);
			return;
		}

		try {
			const response = await axios.get(`${API_URL}/api/business/me`, {
				headers: {
					Authorization: `Bearer ${savedToken}`,
				},
			});

			setUser(response.data.user);
			setToken(savedToken);
		} catch (error) {
			logout();
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		refreshAuth();
	}, []);

	return (
		<AuthContext.Provider
			value={{
				user,
				token,
				isAuthenticated,
				isLoading,
				login,
				logout,
				refreshAuth,
			}}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);

	if (!context) {
		throw new Error("useAuth must be used inside AuthProvider");
	}

	return context;
};

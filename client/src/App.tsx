import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import "./index.css";
import BusinessSignup from "./pages/BusinessPages/BusinessSignup";
import DashboardOverviewPage from "./pages/Dashboard";
import DashboardCalenderPage from "./pages/DashboardPages/DashboardCalenderPage";
import ClientsPage from "./pages/DashboardPages/ClientsPage";
import Services from "./pages/DashboardPages/Services";
import DashboardPayment from "./pages/DashboardPages/DashboardPayment";
import DashboardSettings from "./pages/DashboardPages/DashboardSettings";
import Subscriptions from "./pages/DashboardPages/SubscriptionPage";
import Search from "./pages/Search";
import BusinessLogin from "./pages/BusinessPages/BusinessLogin";
import CustomerLogin from "./pages/CustomerPages/CustomerLogin";
import About from "./pages/About";
import PricePage from "./pages/PricePage";
import PendingReview from "./pages/PendingReview";
import BusinessOnboarding from "./pages/BusinessPages/BusinessOnboarding";
import Support from "./pages/Support";
import BusinessProfilePage from "./pages/DashboardPages/BusinessProfilePage";
import BusinessProtectedRoute from "./pages/BusinessPages/BusinessProtectedRoute";
import { BusinessAuthProvider } from "./pages/BusinessPages/BusinessAuthContext";
import CustomerHome from "./pages/CustomerPages/CustomerHome";
import CustomerSignup from "./pages/CustomerPages/CustomerSignUp";
import AccountMismatch from "./pages/AccountMismatch";
import BusinessCreateAccount from "./pages/BusinessPages/BusinessCreateAccount";

function App() {
	return (
		<BusinessAuthProvider>
			<BrowserRouter>
				<Routes>
					<Route element={<Layout />}>
						<Route path="/" element={<Home />} />
						<Route path="/search" element={<Search />} />
						<Route path="/about" element={<About />} />
						<Route path="/pricing" element={<PricePage />} />
					</Route>

					<Route path="/business/signup" element={<BusinessOnboarding />} />
					<Route path="/customer/signup" element={<CustomerSignup />} />
					<Route path="/business/pending" element={<PendingReview />} />
					<Route path="/business/login" element={<BusinessLogin />} />
					<Route path="/customer/login" element={<CustomerLogin />} />
					<Route path="/customer/home" element={<CustomerHome />} />
					<Route path="/account-mismatch" element={<AccountMismatch />} />
					<Route
						path="/business/create-account"
						element={<BusinessCreateAccount />}
					/>
					<Route path="/support" element={<Support />} />

					<Route element={<BusinessProtectedRoute />}>
						<Route
							path="/business/dashboard"
							element={<DashboardOverviewPage />}
						/>
						<Route
							path="/business/dashboard/profile"
							element={<BusinessProfilePage />}
						/>
						<Route
							path="/business/dashboard/calendar"
							element={<DashboardCalenderPage />}
						/>
						<Route
							path="/business/dashboard/clients"
							element={<ClientsPage />}
						/>
						<Route path="/business/dashboard/services" element={<Services />} />
						<Route
							path="/business/dashboard/subscriptions"
							element={<Subscriptions />}
						/>
						<Route
							path="/business/dashboard/payments"
							element={<DashboardPayment />}
						/>
						<Route
							path="/business/dashboard/settings"
							element={<DashboardSettings />}
						/>
					</Route>

					<Route
						path="/businessonboarding"
						element={<Navigate to="/business/signup" replace />}
					/>
					<Route
						path="/pendingreview"
						element={<Navigate to="/business/pending" replace />}
					/>
					<Route
						path="/business/signuponboarding"
						element={<Navigate to="/business/signup" replace />}
					/>
				</Routes>
			</BrowserRouter>
		</BusinessAuthProvider>
	);
}

export default App;

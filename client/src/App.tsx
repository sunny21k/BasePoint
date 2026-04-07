import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import "./index.css";

import BusinessOnboarding from "./pages/BusinessPages/BusinessOnboarding";
import BusinessLogin from "./pages/BusinessPages/BusinessLogin";
import BusinessCreateAccount from "./pages/BusinessPages/BusinessCreateAccount";
import BusinessVerification from "./pages/BusinessPages/BusinessVerification";
import PendingReview from "./pages/PendingReview";
import RejectedPage from "./pages/BusinessPages/RejectedPage";

import DashboardOverviewPage from "./pages/Dashboard";
import DashboardCalenderPage from "./pages/DashboardPages/DashboardCalenderPage";
import ClientsPage from "./pages/DashboardPages/ClientsPage";
import Services from "./pages/DashboardPages/Services";
import DashboardPayment from "./pages/DashboardPages/DashboardPayment";
import DashboardSettings from "./pages/DashboardPages/DashboardSettings";
import Subscriptions from "./pages/DashboardPages/SubscriptionPage";
import BusinessProfilePage from "./pages/DashboardPages/BusinessProfilePage";

import Search from "./pages/Search";
import CustomerLogin from "./pages/CustomerPages/CustomerLogin";
import CustomerSignup from "./pages/CustomerPages/CustomerSignUp";
import CustomerHome from "./pages/CustomerPages/CustomerHome";

import About from "./pages/About";
import PricePage from "./pages/PricePage";
import Support from "./pages/Support";
import AccountMismatch from "./pages/AccountMismatch";

import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";

import ProtectedRoute from "./routeprotection/ProtectedRoute";
import RoleRoute from "./routeprotection/RoleRoute";
import AdminProtectedRoute from "./pages/admin/AdminProtectedRoute";

import BusinessProtectedRoute from "./pages/BusinessPages/BusinessProtectedRoute";
import BusinessStatusRoute from "./pages/BusinessPages/BusinessStatusRoute";

import { BusinessAuthProvider } from "./pages/BusinessPages/BusinessAuthContext";
import { AdminAuthProvider } from "./pages/admin/AdminAuthContext";

function App() {
	return (
		<BusinessAuthProvider>
			<BrowserRouter>
				<AdminAuthProvider>
					<Routes>
						<Route element={<Layout />}>
							<Route path="/" element={<Home />} />
							<Route path="/search" element={<Search />} />
							<Route path="/about" element={<About />} />
							<Route path="/pricing" element={<PricePage />} />
							<Route path="/support" element={<Support />} />
						</Route>

						<Route path="/account-mismatch" element={<AccountMismatch />} />
						<Route path="/business/login" element={<BusinessLogin />} />
						<Route
							path="/business/create-account"
							element={<BusinessCreateAccount />}
						/>
						<Route path="/customer/signup" element={<CustomerSignup />} />
						<Route path="/customer/login" element={<CustomerLogin />} />
						<Route path="/admin/login" element={<AdminLogin />} />

						<Route element={<ProtectedRoute />}>
							<Route element={<RoleRoute allowedRole="business" />}>
								<Route
									path="/business/verification"
									element={<BusinessVerification />}
								/>
							</Route>

							<Route element={<RoleRoute allowedRole="customer" />}>
								<Route path="/customer/home" element={<CustomerHome />} />
							</Route>
						</Route>

						<Route element={<BusinessProtectedRoute />}>
							<Route element={<BusinessStatusRoute />}>
								<Route path="/business/pending" element={<PendingReview />} />
								<Route path="/business/rejected" element={<RejectedPage />} />
								<Route
									path="/business/onboarding"
									element={<BusinessOnboarding />}
								/>
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
								<Route
									path="/business/dashboard/services"
									element={<Services />}
								/>
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
						</Route>

						<Route element={<AdminProtectedRoute />}>
							<Route path="/admin" element={<AdminDashboard />} />
						</Route>

						<Route path="*" element={<Navigate to="/" replace />} />
					</Routes>
				</AdminAuthProvider>
			</BrowserRouter>
		</BusinessAuthProvider>
	);
}

export default App;

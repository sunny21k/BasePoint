import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import BusinessSignup from "./pages/BusinessSignup";
import DashboardOverviewPage from "./pages/Dashboard";
import DashboardCalenderPage from "./pages/DashboardPages/DashboardCalenderPage";
import ClientsPage from "./pages/DashboardPages/ClientsPage";
import Services from "./pages/DashboardPages/Services";
import DashboardPayment from "./pages/DashboardPages/DashboardPayment";
import DashboardSettings from "./pages/DashboardPages/DashboardSettings";
import Subscriptions from "./pages/DashboardPages/SubscriptionPage";
import Search from "./pages/Search";
import BusinessLogin from "./pages/BusinessLogin";
import CustomerLogin from "./pages/CustomerLogin";
import About from "./pages/About";
import PricePage from "./pages/PricePage";
import PendingReview from "./pages/PendingReview";
import BusinessOnboarding from "./pages/BusinessOnboarding";
import Support from "./pages/Support";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<Layout />}>
					<Route path="/" element={<Home />} />
					<Route path="/search" element={<Search />} />
					<Route path="/about" element={<About />} />
					<Route path="/pricing" element={<PricePage />} />
				</Route>

				<Route path="/business/signup" element={<BusinessOnboarding />} />
				<Route path="/business/pending" element={<PendingReview />} />
				<Route path="/business/login" element={<BusinessLogin />} />
				<Route path="/customer/login" element={<CustomerLogin />} />

				<Route path="/business/dashboard" element={<DashboardOverviewPage />} />
				<Route
					path="/business/dashboard/calendar"
					element={<DashboardCalenderPage />}
				/>
				<Route path="/business/dashboard/clients" element={<ClientsPage />} />
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

				<Route
					path="/businessonboarding"
					element={<Navigate to="/business/signup" replace />}
				/>
				<Route path="/support" element={<Support />} />
				<Route
					path="/pendingreview"
					element={<Navigate to="/business/pending" replace />}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;

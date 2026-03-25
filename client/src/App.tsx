import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BusinessSignup from "./pages/BusinessSignup";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/business/signup" element={<BusinessSignup />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;

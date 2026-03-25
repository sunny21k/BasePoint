import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import FeaturesSection from "../components/FeaturesSection";
import HowItWorksSection from "../components/HowItWorksSection";
import FinalCTA from "../components/FinalCTA";
import Footer from "../components/Footer";

export default function Home() {
	return (
		<div className="min-h-screen bg-[#050609] text-white">
			<Navbar />
			<HeroSection />
			<FeaturesSection />
			<HowItWorksSection />
			<FinalCTA />
			<Footer />
		</div>
	);
}

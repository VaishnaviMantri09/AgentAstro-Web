import { Header } from "@/sections/Header";
import { Hero } from "@/sections/Hero";
import Works from "@/sections/Works";
import { KeyBenefits } from "@/sections/KeyBenefits";
import Testimonials from "@/sections/Testimonials";
import WhosAgentastro from "@/sections/WhosAgentastro";
import Footer from "@/sections/Footer";
import { Navbar } from "@/sections/Navbar";

export default function Home() {
  return (
    <>
      <Header />
      <Navbar />
      <div className="min-h-screen relative"
        style={{
          background: `
            radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(16, 185, 129, 0.08) 0%, transparent 50%),
            linear-gradient(135deg, #1e3a8a 0%, #1e40af 20%, #2563eb 40%, #3b82f6 60%, #60a5fa 80%, #93c5fd 100%)`}}>
        <Hero />
        <WhosAgentastro />
        <Works />
        <KeyBenefits />
        <Testimonials />
      </div>
      <Footer />
    </>
  );
}

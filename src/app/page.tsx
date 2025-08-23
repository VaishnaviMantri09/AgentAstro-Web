import { Header } from "@/sections/Header";
import { Hero } from "@/sections/Hero";
import Works from "@/sections/Works";
import { KeyBenefits } from "@/sections/KeyBenefits";
import Testimonials from "@/sections/Testimonials";
import WhosAgentastro from "@/sections/WhosAgentastro";
import Footer from "@/sections/Footer";
import { Navbar } from "@/sections/Navbar";
import CookieConsentBottom from "@/sections/CookieConsentBottom";

export default function Home() {
  return (
    <>
      <Header />
      <Navbar />
      <div className="min-h-screen relative"
        style={{
          background: `linear-gradient(to right, white 0%, #60a5fa 50%, white 100%)`
        }}>
        <Hero />
        <WhosAgentastro />
        <Works />
        <KeyBenefits />
        <Testimonials />
      </div>
      <Footer />
      <CookieConsentBottom />
    </>
  );
}

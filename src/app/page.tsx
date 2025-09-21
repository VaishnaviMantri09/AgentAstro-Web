import { Header } from "@/sections/Header";
import { Hero } from "@/sections/Hero";
import Works from "@/sections/Works";
import KeyBenefits from "@/sections/KeyBenefits";
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
      <div
        className="min-h-screen relative"
        style={{
          background: `linear-gradient(to right, #EBEEF2 0%, #007EA6 50%, #061A40 100%)`
        }}
      >
        <Hero />
        <KeyBenefits />
        <WhosAgentastro />
        <Works />
        <Testimonials />
      </div>
      <Footer />
      <CookieConsentBottom />
    </>
  );
}

import HeroSection from "./components/HeroSection";
import KeyFeatures from "./components/KeyFeatures";
import TimelineSection from "./components/TimelineSection";
import StatsSection from "./components/StatsSection";
import FAQSection from "./components/FAQSection";
import CTASection from "./components/CTASection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <HeroSection />
      <KeyFeatures />
      <TimelineSection/>
      <StatsSection/>
      <FAQSection/>
      <CTASection/>
      <Footer/>
    </>
  );
}

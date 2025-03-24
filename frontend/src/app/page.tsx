import HeroSection from "./components/HeroSection";
import KeyFeatures from "./components/KeyFeatures";
// import CTASection from "./components/CTASection";
import TimelineSection from "./components/TimelineSection";
import StatsSection from "./components/StatsSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <KeyFeatures />
      {/* <CTASection /> */}
      <TimelineSection/>
      <StatsSection/>
    </>
  );
}

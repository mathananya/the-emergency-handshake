import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import ProblemSection from "@/components/home/ProblemSection";
import SolutionSection from "@/components/home/SolutionSection";
import BenefitsSection from "@/components/home/BenefitsSection";
import CTASection from "@/components/home/CTASection";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <BenefitsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

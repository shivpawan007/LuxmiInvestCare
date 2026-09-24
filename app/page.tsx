import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import WhyChoose from "@/components/home/WhyChoose";
import InvestorEducation from "@/components/home/InvestorEducation";
import Contact from "@/components/home/Contact";
import Services from "@/components/home/Services";
import CTA from "@/components/home/CTA";
import FAQ from "@/components/home/FAQ";
import FloatingWhatsApp from "@/components/common/FloatingWhatsApp";
import ScrollToTop from "@/components/common/ScrollToTop";
import MFDIdentity from "@/components/common/MFDIdentity";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <div className="container-custom py-5">
          <MFDIdentity />
        </div>
        <About />
        <WhyChoose />
        <InvestorEducation />
        <Services />
        <CTA />
        <FAQ />
        <Contact />
      </main>
      <FloatingWhatsApp />
      <ScrollToTop />
    </>
  );
}

import Testimonials from "@/components/home/Testimonials";
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


export default function Home() {
  console.log("HOME PAGE LOADED");

  return (
    <>

      <main>
        <Hero />
        <About />
        <WhyChoose />
        <InvestorEducation />
        <Services />
        <CTA />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>

      <FloatingWhatsApp />
      <ScrollToTop />

    </>

  )
};
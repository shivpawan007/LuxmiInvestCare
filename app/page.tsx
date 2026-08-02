import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import WhyChoose from "@/components/home/WhyChoose";
import InvestorEducation from "@/components/home/InvestorEducation";
import Services from "@/components/home/Services";
import CTA from "@/components/home/CTA";

export default function Home() {
  console.log("HOME PAGE LOADED");

  return (
    <>
      <Header />

      <main>
        <Hero />
        <About />
        <WhyChoose />
        <InvestorEducation />
        <Services />
        <CTA />
      </main>

      <Footer />
    </>

  )
};
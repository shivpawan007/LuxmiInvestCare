import Header from "@/components/layout/Header";
import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import Services from "@/components/home/Services";
import CTA from "@/components/home/CTA";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <Header />

      <main className="overflow-hidden">
        <Hero />
        <About />
        <Services />
        <CTA />
      </main>

      <Footer />
    </>
  );
}
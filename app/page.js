import Hero from "@/components/sections/Hero";
import Navbar from "@/components/Navbar";
import Projects from "@/components/sections/Projects";
import Services from "@/components/sections/Services";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4">
        <Hero />
        <Projects />
        <Services />
        <Contact />
      </div>
      <Footer />
    </main>
  );
}

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
      <Header />
      <main className="max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-8">About SpecFoundry</h1>
        
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            SpecFoundry is dedicated to providing professional-grade calculators and reference materials for machining, manufacturing, and precision applications. We provide accurate, verified data from industry standards to streamline workflows and enhance productivity.
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            Our platform combines intuitive tools with comprehensive references, helping users make informed decisions quickly and efficiently.
          </p>
        </section>
        
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">What We Offer</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-400">
            <li>Advanced calculators for threads, tolerances, and materials</li>
            <li>Comprehensive material database with properties and comparisons</li>
            <li>Reference guides for processes, standards, and tolerances</li>
            <li>Global search for quick access to information</li>
            <li>Regular updates to ensure compliance with latest standards</li>
          </ul>
        </section>
        
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Our Commitment</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            All data is sourced from official standards like ISO, ANSI, and ASME. We prioritize accuracy, usability, and accessibility in everything we build.
          </p>
        </section>
        
        <section>
          <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-2">
            Have questions, suggestions, or feedback? We&apos;d love to hear from you.
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            Email: contact@specfoundry.com
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}

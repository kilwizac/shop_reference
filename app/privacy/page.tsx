import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
      <Header />
      <main className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        
        <section className="mb-8">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            <strong>Last updated:</strong> {new Date().toLocaleDateString()}
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            This Privacy Policy describes how SpecFoundry ("we", "our", or "us") collects, uses, and protects your information when you use our website and services.
          </p>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Information We Collect</h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-400">
            <div>
              <h3 className="text-lg font-semibold mb-2">Information You Provide</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Contact information when you reach out to us</li>
                <li>Feedback and suggestions you submit</li>
                <li>Any data you input into our calculators and tools</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Information We Collect Automatically</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Usage data and analytics to improve our services</li>
                <li>Device and browser information for compatibility</li>
                <li>IP address and general location data</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </div>
          </div>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">How We Use Your Information</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-400">
            <li>To provide and improve our calculator and reference tools</li>
            <li>To respond to your inquiries and provide customer support</li>
            <li>To analyze usage patterns and optimize our website performance</li>
            <li>To ensure the security and integrity of our services</li>
            <li>To comply with legal obligations and protect our rights</li>
          </ul>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Information Sharing</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except in the following circumstances:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-400">
            <li>When required by law or to protect our legal rights</li>
            <li>With trusted service providers who assist in operating our website</li>
            <li>In connection with a business transfer or acquisition</li>
            <li>With your explicit consent</li>
          </ul>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Data Security</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
          </p>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Cookies and Tracking</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            We use cookies and similar technologies to enhance your experience, analyze usage, and improve our services. You can control cookie settings through your browser preferences.
          </p>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Third-Party Services</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Our website may use third-party services such as Google Analytics for website analytics. These services have their own privacy policies, and we encourage you to review them.
          </p>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Your Rights</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Depending on your location, you may have certain rights regarding your personal information, including:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-400">
            <li>The right to access your personal information</li>
            <li>The right to correct inaccurate information</li>
            <li>The right to delete your personal information</li>
            <li>The right to restrict or object to processing</li>
            <li>The right to data portability</li>
          </ul>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Children's Privacy</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Our services are not directed to children under 13. We do not knowingly collect personal information from children under 13. If you believe we have collected information from a child under 13, please contact us immediately.
          </p>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Changes to This Policy</h2>
          <p className="text-gray-600 dark:text-gray-400">
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
          </p>
        </section>
        
        <section>
          <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-2">
            If you have any questions about this Privacy Policy, please contact us:
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            Email: privacy@specfoundry.com
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}

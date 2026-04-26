export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-black text-gray-800 dark:text-gray-200 px-6 py-12">
      <div className="max-w-4xl mx-auto bg-white dark:bg-neutral-900 shadow-lg rounded-2xl p-8 md:p-12">
        
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Privacy Policy
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
          Last Updated: April 26, 2026
        </p>

        {/* Section */}
        <Section title="1. Information We Collect">
          <ul className="list-disc pl-6 space-y-2">
            <li>Name, email address, phone number</li>
            <li>Shipping and billing address</li>
            <li>Usage data like pages visited, device info, IP address</li>
            <li>Cookies and tracking technologies</li>
          </ul>
        </Section>

        <Section title="2. How We Use Your Information">
          <ul className="list-disc pl-6 space-y-2">
            <li>Process and manage orders</li>
            <li>Improve user experience</li>
            <li>Provide customer support</li>
            <li>Send updates and notifications</li>
            <li>Ensure security and prevent fraud</li>
          </ul>
        </Section>

        <Section title="3. Sharing Your Information">
          <p>
            We do not sell your personal data. We may share your data with:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>Payment processors</li>
            <li>Delivery partners</li>
            <li>Analytics providers</li>
          </ul>
        </Section>

        <Section title="4. Data Security">
          <p>
            We use industry-standard security measures to protect your data.
            However, no method of transmission over the internet is completely secure.
          </p>
        </Section>

        <Section title="5. Your Rights">
          <ul className="list-disc pl-6 space-y-2">
            <li>Access your personal data</li>
            <li>Request correction or deletion</li>
            <li>Withdraw consent</li>
            <li>Opt out of marketing communications</li>
          </ul>
        </Section>

        <Section title="6. Cookies Policy">
          <p>
            We use cookies to remember sessions, analyze traffic, and improve performance.
            You can disable cookies in your browser settings.
          </p>
        </Section>

        <Section title="7. Third-Party Links">
          <p>
            Our website may contain links to external sites. We are not responsible
            for their privacy practices.
          </p>
        </Section>

        <Section title="8. Children's Privacy">
          <p>
            Our services are not intended for users under 13. We do not knowingly
            collect data from children.
          </p>
        </Section>

        <Section title="9. Changes to This Policy">
          <p>
            We may update this Privacy Policy from time to time. Changes will be posted here.
          </p>
        </Section>

        <Section title="10. Contact Us">
          <p>Email: support@yourstore.com</p>
          <p>Address: Your Company Address</p>
        </Section>

        <div className="mt-10 text-sm text-gray-500 dark:text-gray-400">
          By using our website, you agree to this Privacy Policy.
        </div>
      </div>
    </main>
  );
}

/* Reusable Section Component */
function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-8">
      <h2 className="text-xl md:text-2xl font-semibold mb-3">
        {title}
      </h2>
      <div className="text-gray-700 dark:text-gray-300 leading-relaxed">
        {children}
      </div>
    </section>
  );
}
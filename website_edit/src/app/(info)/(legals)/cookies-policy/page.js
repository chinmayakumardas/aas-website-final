import PublicLayout from "@/layout/PublicLayout";

export default function Cookies() {
  return (
    <PublicLayout>
      <div className="bg-gray-50 py-16 px-8 min-h-screen">
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-xl">
          <h1 className="text-4xl font-semibold text-center text-[#AF9A57] mb-8">
            Cookies Policy
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed mb-6">
            Our website uses cookies to enhance your experience, analyze site usage, and assist in our marketing efforts. By using our services, you agree to the use of cookies as outlined in this policy.
          </p>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. What are Cookies?</h2>
              <p className="text-lg text-gray-700">
                Cookies are small files stored on your device that help us enhance your experience by remembering your preferences and improving functionality.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Types of Cookies We Use</h2>
              <p className="text-lg text-gray-700 mb-4">
                We use the following types of cookies on our website:
              </p>
              <ul className="list-disc pl-8 text-lg text-gray-700">
                <li><strong>Essential Cookies:</strong> Necessary for the functioning of the website and for logging in or completing transactions.</li>
                <li><strong>Performance Cookies:</strong> Help us analyze site traffic and improve performance.</li>
                <li><strong>Functional Cookies:</strong> Allow the site to remember your preferences and settings.</li>
                <li><strong>Targeting Cookies:</strong> Used to personalize advertisements based on your browsing behavior.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. How We Use Cookies</h2>
              <p className="text-lg text-gray-700">
                Cookies are used to provide a smoother, more personalized browsing experience. We use them to track user behavior, remember your login details, and provide content tailored to your needs.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Managing Cookies</h2>
              <p className="text-lg text-gray-700">
                You can manage cookies through your browser settings. You can disable cookies or choose to receive notifications whenever cookies are being set. Please note that disabling cookies may affect some features of the website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Changes to This Cookie Policy</h2>
              <p className="text-lg text-gray-700">
                We may update this Cookies Policy from time to time. Any changes will be posted on this page with an updated revision date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Contact Us</h2>
              <p className="text-lg text-gray-700">
                If you have any questions about our Cookies Policy, please feel free to reach out to us through our contact page.
              </p>
            </section>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}

'use client'; 
import PublicLayout from "@/layout/PublicLayout";

export default function Privacy() {
  return (
    <PublicLayout>
      <div className="bg-gray-50 py-16 px-8 min-h-screen">
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-xl">
          <h1 className="text-4xl font-semibold text-center text-[#AF9A57] mb-8">
            Privacy Policy
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed mb-6">
            At <strong className="text-[#AF9A57]">AAS Information Technology</strong>, we are committed to protecting your privacy. This Privacy Policy outlines how we collect, use, and safeguard your information when you use our services.
          </p>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Information Collection</h2>
              <p className="text-lg text-gray-700">
                We collect information to provide better services to all of our users. This includes both personal information you provide and non-personal information automatically gathered during the use of our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Use of Information</h2>
              <p className="text-lg text-gray-700">
                We use the information collected to improve the functionality and performance of our software, personalize your experience, and communicate with you about updates or new features.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Data Security</h2>
              <p className="text-lg text-gray-700">
                We implement various security measures to protect your personal data, ensuring that it is safe from unauthorized access, alteration, or destruction.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Sharing of Information</h2>
              <p className="text-lg text-gray-700">
                We do not sell, trade, or rent your personal information to third parties. However, we may share it with trusted partners who assist us in providing services or complying with legal obligations.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Cookies</h2>
              <p className="text-lg text-gray-700">
                Our website uses cookies to enhance user experience. By using our website, you consent to the use of cookies in accordance with our cookie policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Changes to the Privacy Policy</h2>
              <p className="text-lg text-gray-700">
                We may update this Privacy Policy from time to time. We encourage you to review this page periodically to stay informed about how we are protecting your information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Contact Us</h2>
              <p className="text-lg text-gray-700">
                If you have any questions regarding this Privacy Policy, please reach out to us through our official support channels.
              </p>
            </section>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}

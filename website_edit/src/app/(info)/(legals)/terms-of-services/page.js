import PublicLayout from "@/layout/PublicLayout";

export default function Terms() {
  return (
    <PublicLayout>
      <div className="bg-gray-50 py-16 px-8 min-h-screen">
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-xl">
          <h1 className="text-4xl font-semibold text-center text-[#AF9A57] mb-8">
            Terms of Services
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed mb-6">
            By using our software and services, you agree to the following terms and conditions. Please read them carefully.
          </p>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Introduction</h2>
              <p className="text-lg text-gray-700">
                These terms and conditions govern your use of our website and services. By accessing or using our products, you agree to be bound by these terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Intellectual Property</h2>
              <p className="text-lg text-gray-700">
                All content, designs, logos, and other intellectual property used on this site and software are owned by our company and protected by copyright law.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Software Usage</h2>
              <p className="text-lg text-gray-700">
                You are granted a non-exclusive, non-transferable license to use the software for personal or commercial purposes, in accordance with the terms provided.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Limitation of Liability</h2>
              <p className="text-lg text-gray-700">
                Our company is not liable for any damages or loss resulting from the use of our software, including but not limited to data loss or service interruptions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Privacy Policy</h2>
              <p className="text-lg text-gray-700">
                We are committed to protecting your privacy. Please refer to our Privacy Policy for details on how we handle your data.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Changes to Terms</h2>
              <p className="text-lg text-gray-700">
                We reserve the right to modify or update these terms at any time. Changes will be posted on this page, and your continued use of our services will signify your acceptance of the updated terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Contact Us</h2>
              <p className="text-lg text-gray-700">
                If you have any questions or concerns regarding these terms, please contact us through our official support channels.
              </p>
            </section>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}

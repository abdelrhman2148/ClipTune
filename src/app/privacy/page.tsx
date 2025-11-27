export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-slate-50 py-24">
            <div className="max-w-4xl mx-auto px-6">
                <h1 className="text-5xl font-extrabold mb-8">Privacy Policy</h1>
                <p className="text-slate-600 mb-12">Last updated: November 27, 2025</p>

                <div className="prose prose-slate max-w-none">
                    <h2 className="text-3xl font-bold mt-8 mb-4">1. Information We Collect</h2>

                    <h3 className="text-2xl font-semibold mt-6 mb-3">Information you provide:</h3>
                    <ul className="list-disc pl-6 text-slate-700 space-y-2 mb-6">
                        <li>Email address (for account creation and communication)</li>
                        <li>Payment information (processed securely through Stripe)</li>
                        <li>Video files you upload (stored temporarily for processing)</li>
                    </ul>

                    <h3 className="text-2xl font-semibold mt-6 mb-3">Information collected automatically:</h3>
                    <ul className="list-disc pl-6 text-slate-700 space-y-2 mb-6">
                        <li>Usage data (features used, pages visited)</li>
                        <li>Device information (browser type, operating system)</li>
                        <li>IP address and location data</li>
                    </ul>

                    <h2 className="text-3xl font-bold mt-8 mb-4">2. How We Use Your Information</h2>
                    <p className="text-slate-700 leading-relaxed mb-6">
                        We use the information we collect to:
                    </p>
                    <ul className="list-disc pl-6 text-slate-700 space-y-2 mb-6">
                        <li>Provide, maintain, and improve the Service</li>
                        <li>Process your video content and generate clips</li>
                        <li>Send you updates, security alerts, and support messages</li>
                        <li>Respond to your comments and questions</li>
                        <li>Monitor and analyze trends and usage</li>
                    </ul>

                    <h2 className="text-3xl font-bold mt-8 mb-4">3. Data Storage and Security</h2>
                    <p className="text-slate-700 leading-relaxed mb-6">
                        Your video files are stored temporarily on our secure servers (Supabase) for the duration of processing. Once your clips are generated and exported, the original files are deleted within 30 days. We use industry-standard encryption to protect your data.
                    </p>

                    <h2 className="text-3xl font-bold mt-8 mb-4">4. Third-Party Services</h2>
                    <p className="text-slate-700 leading-relaxed mb-6">
                        We use the following third-party services:
                    </p>
                    <ul className="list-disc pl-6 text-slate-700 space-y-2 mb-6">
                        <li><strong>Supabase:</strong> Database and file storage</li>
                        <li><strong>Stripe:</strong> Payment processing</li>
                        <li><strong>PostHog:</strong> Analytics (anonymized usage data)</li>
                        <li><strong>Vercel:</strong> Hosting infrastructure</li>
                    </ul>

                    <h2 className="text-3xl font-bold mt-8 mb-4">5. Data Retention</h2>
                    <p className="text-slate-700 leading-relaxed mb-6">
                        We retain your personal information only as long as necessary to provide the Service and fulfill the purposes outlined in this Privacy Policy. Video files are deleted after 30 days. Account and usage data is retained for as long as your account is active.
                    </p>

                    <h2 className="text-3xl font-bold mt-8 mb-4">6. Your Rights</h2>
                    <p className="text-slate-700 leading-relaxed mb-6">
                        You have the right to:
                    </p>
                    <ul className="list-disc pl-6 text-slate-700 space-y-2 mb-6">
                        <li>Access and download your data</li>
                        <li>Request deletion of your account and all associated data</li>
                        <li>Opt-out of marketing communications</li>
                        <li>Request corrections to your personal information</li>
                    </ul>

                    <h2 className="text-3xl font-bold mt-8 mb-4">7. Cookies</h2>
                    <p className="text-slate-700 leading-relaxed mb-6">
                        We use cookies and similar tracking technologies to track activity on our Service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
                    </p>

                    <h2 className="text-3xl font-bold mt-8 mb-4">8. Children's Privacy</h2>
                    <p className="text-slate-700 leading-relaxed mb-6">
                        Our Service is not intended for use by children under the age of 13. We do not knowingly collect personal information from children under 13.
                    </p>

                    <h2 className="text-3xl font-bold mt-8 mb-4">9. Changes to This Policy</h2>
                    <p className="text-slate-700 leading-relaxed mb-6">
                        We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
                    </p>

                    <h2 className="text-3xl font-bold mt-8 mb-4">10. Contact Us</h2>
                    <p className="text-slate-700 leading-relaxed mb-6">
                        If you have any questions about this Privacy Policy, please contact us at: privacy@cliptune.com
                    </p>
                </div>

                <div className="mt-12 pt-8 border-t border-slate-200">
                    <a href="/" className="text-indigo-600 hover:text-indigo-700 font-semibold">
                        ← Back to Home
                    </a>
                </div>
            </div>
        </div>
    );
}

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-slate-50 py-24">
            <div className="max-w-4xl mx-auto px-6">
                <h1 className="text-5xl font-extrabold mb-8">Terms of Service</h1>
                <p className="text-slate-600 mb-12">Last updated: November 27, 2025</p>

                <div className="prose prose-slate max-w-none">
                    <h2 className="text-3xl font-bold mt-8 mb-4">1. Acceptance of Terms</h2>
                    <p className="text-slate-700 leading-relaxed mb-6">
                        By accessing and using ClipTune ("Service"), you accept and agree to be bound by the terms and provision of this agreement.
                    </p>

                    <h2 className="text-3xl font-bold mt-8 mb-4">2. Use License</h2>
                    <p className="text-slate-700 leading-relaxed mb-6">
                        Permission is granted to temporarily use the Service for personal or commercial content creation. This is the grant of a license, not a transfer of title.
                    </p>

                    <h3 className="text-2xl font-semibold mt-6 mb-3">Under this license you may not:</h3>
                    <ul className="list-disc pl-6 text-slate-700 space-y-2 mb-6">
                        <li>Modify or copy the materials</li>
                        <li>Use the materials for any commercial purpose without a paid subscription</li>
                        <li>Attempt to decompile or reverse engineer any software contained on the Service</li>
                        <li>Remove any copyright or other proprietary notations from the materials</li>
                        <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
                    </ul>

                    <h2 className="text-3xl font-bold mt-8 mb-4">3. Disclaimer</h2>
                    <p className="text-slate-700 leading-relaxed mb-6">
                        The Service is provided "as is". ClipTune makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                    </p>

                    <h2 className="text-3xl font-bold mt-8 mb-4">4. Limitations</h2>
                    <p className="text-slate-700 leading-relaxed mb-6">
                        In no event shall ClipTune or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the Service.
                    </p>

                    <h2 className="text-3xl font-bold mt-8 mb-4">5. Subscription Terms</h2>
                    <p className="text-slate-700 leading-relaxed mb-6">
                        Subscription fees are billed in advance on a monthly basis. Subscriptions automatically renew unless canceled before the renewal date. You may cancel your subscription at any time from your account settings.
                    </p>

                    <h2 className="text-3xl font-bold mt-8 mb-4">6. Content Ownership</h2>
                    <p className="text-slate-700 leading-relaxed mb-6">
                        You retain all ownership rights to the content you upload and create using ClipTune. We do not claim any ownership over your content. However, by uploading content, you grant us a license to process and store your content for the purpose of providing the Service.
                    </p>

                    <h2 className="text-3xl font-bold mt-8 mb-4">7. Modifications</h2>
                    <p className="text-slate-700 leading-relaxed mb-6">
                        ClipTune may revise these terms of service at any time without notice. By using the Service, you agree to be bound by the current version of these terms.
                    </p>

                    <h2 className="text-3xl font-bold mt-8 mb-4">8. Contact</h2>
                    <p className="text-slate-700 leading-relaxed mb-6">
                        If you have any questions about these Terms, please contact us at: support@cliptune.com
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

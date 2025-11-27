export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-24 sm:py-32">
          <div className="text-center">
            <div className="inline-block px-4 py-2 mb-8 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-semibold backdrop-blur-sm">
              🚀 Now in Beta
            </div>
            <h1 className="text-5xl sm:text-7xl font-extrabold text-white mb-6 tracking-tight">
              The Speed of AI.<br />
              The Precision of a <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Pro.</span>
            </h1>
            <p className="text-xl sm:text-2xl text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed">
              Stop letting AI ruin your cuts. ClipTune gives you a timeline to adjust the AI's suggestions—so your clips actually make sense.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/editor" data-testid="try-editor-demo-btn" className="px-8 py-4 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-lg shadow-lg shadow-indigo-500/50 transition-all hover:scale-105">
                Try Editor Demo
              </a>
              <a href="/pricing" data-testid="view-pricing-btn" className="px-8 py-4 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold text-lg backdrop-blur-sm border border-white/20 transition-all">
                View Pricing
              </a>
            </div>
          </div>
        </div>

        {/* Gradient Orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/30 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/30 rounded-full blur-3xl opacity-20"></div>
      </div>

      {/* Demo Video Section */}
      <div className="bg-slate-900 py-12">
        <div className="max-w-5xl mx-auto px-6">
          <div className="aspect-video bg-slate-800 rounded-2xl border border-slate-700 shadow-2xl flex items-center justify-center relative overflow-hidden group cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform">
              <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-white border-b-[10px] border-b-transparent ml-1"></div>
            </div>
            <span className="absolute bottom-8 left-8 text-white font-bold text-xl">Watch the Workflow (2 min)</span>
          </div>
        </div>
      </div>

      {/* Problem Section */}
      <div className="bg-slate-900/50 backdrop-blur-sm py-24 border-y border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl sm:text-5xl font-bold text-white text-center mb-16">
            Tired of This?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { emoji: "😤", title: "AI Cuts Off the Punchline", desc: "Opus Clip and Descript always end the clip 2 seconds too early." },
              { emoji: "🤖", title: "Generic AI Feel", desc: "Every clip looks and sounds the same. No personality." },
              { emoji: "⏰", title: "Still Takes Forever", desc: "You still have to fix every clip manually in Premiere anyway." }
            ].map((item, i) => (
              <div key={i} className="p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-indigo-500/50 transition">
                <div className="text-5xl mb-4">{item.emoji}</div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Solution Section */}
      <div className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl sm:text-5xl font-bold text-white text-center mb-16">
            ClipTune Gets It Right
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { emoji: "🎛️", title: "Timeline Control", desc: "See AI suggestions on a timeline. Drag the start/end points with frame precision." },
              { emoji: "🎭", title: "Context Aware", desc: "Our AI understands setups and punchlines. It won't ruin the moment." },
              { emoji: "⚡", title: "Multi-Platform Export", desc: "One click to export for TikTok (9:16), LinkedIn (4:5), and YouTube (16:9)." }
            ].map((item, i) => (
              <div key={i} className="p-8 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-cyan-500/10 backdrop-blur-sm border border-indigo-500/20">
                <div className="text-5xl mb-4">{item.emoji}</div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-slate-300 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>


      {/* Testimonials Section */}
      <div className="bg-slate-800/30 py-24 border-y border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl sm:text-5xl font-bold text-white text-center mb-16">
            Loved by Creators
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Sarah J.", role: "YouTuber (150k subs)", quote: "Finally, an AI tool that doesn't make my clips look like spam. The timeline control is a game changer." },
              { name: "Mark D.", role: "Podcast Host", quote: "I used to spend 4 hours clipping my podcast. Now it takes 20 minutes and the quality is actually better." },
              { name: "AgencyFlow", role: "Marketing Agency", quote: "We manage 10 clients and ClipTune is the only way we can keep up with the volume without hiring more editors." }
            ].map((t, i) => (
              <div key={i} className="p-8 rounded-2xl bg-slate-900 border border-slate-800">
                <div className="flex gap-1 text-yellow-500 mb-4">★★★★★</div>
                <p className="text-slate-300 mb-6 italic">"{t.quote}"</p>
                <div>
                  <div className="font-bold text-white">{t.name}</div>
                  <div className="text-sm text-slate-500">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-24">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {[
              { q: "Does it work with any video?", a: "Yes! We support MP4, MOV, and AVI files up to 2GB. It works best with spoken content like podcasts, interviews, and commentary." },
              { q: "Can I edit the captions?", a: "Absolutely. You can edit text, change fonts, colors, and position directly in the editor." },
              { q: "Is there a watermark?", a: "The Free plan includes a small watermark. Upgrade to Pro to remove it and unlock 4K exports." },
              { q: "Can I cancel anytime?", a: "Yes, you can cancel your subscription at any time from your dashboard. No questions asked." }
            ].map((faq, i) => (
              <div key={i} className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
                <h3 className="font-bold text-white text-lg mb-2">{faq.q}</h3>
                <p className="text-slate-400">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Ready to Stop Fighting the AI?
          </h2>
          <p className="text-xl text-slate-300 mb-12">
            Join creators who've saved hundreds of hours with ClipTune.
          </p>
          <a href="/pricing" className="inline-block px-8 py-4 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-lg shadow-lg shadow-indigo-500/50 transition-all hover:scale-105">
            Start For Free
          </a>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-slate-400 text-sm">
            <div>&copy; 2025 ClipTune. All rights reserved.</div>
            <div className="flex gap-6">
              <a href="/terms" className="hover:text-white transition">Terms</a>
              <a href="/privacy" className="hover:text-white transition">Privacy</a>
              <a href="/pricing" className="hover:text-white transition">Pricing</a>
            </div>
          </div>
        </div>
      </footer>
    </div >
  );
}

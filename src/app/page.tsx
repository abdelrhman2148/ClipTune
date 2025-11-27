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
              <a href="/editor" className="px-8 py-4 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-lg shadow-lg shadow-indigo-500/50 transition-all hover:scale-105">
                Try Editor Demo
              </a>
              <a href="/pricing" className="px-8 py-4 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold text-lg backdrop-blur-sm border border-white/20 transition-all">
                View Pricing
              </a>
            </div>
          </div>
        </div>

        {/* Gradient Orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/30 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/30 rounded-full blur-3xl opacity-20"></div>
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
    </div>
  );
}

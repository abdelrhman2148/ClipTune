import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center px-6">
            <div className="text-center">
                <h1 className="text-9xl font-extrabold text-indigo-500 mb-4">404</h1>
                <h2 className="text-4xl font-bold text-white mb-6">Page Not Found</h2>
                <p className="text-xl text-slate-400 mb-8 max-w-md mx-auto">
                    Looks like this clip got lost in the timeline. Let's get you back on track.
                </p>
                <Link
                    href="/"
                    className="inline-block px-8 py-4 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition"
                >
                    Go Home
                </Link>
            </div>
        </div>
    )
}

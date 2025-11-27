'use client'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center px-6">
            <div className="text-center">
                <h1 className="text-9xl font-extrabold text-red-500 mb-4">500</h1>
                <h2 className="text-4xl font-bold text-white mb-6">Something Went Wrong</h2>
                <p className="text-xl text-slate-400 mb-8 max-w-md mx-auto">
                    The AI made an oopsie. Don't worry, we're on it.
                </p>
                <button
                    onClick={() => reset()}
                    className="inline-block px-8 py-4 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition"
                >
                    Try Again
                </button>
            </div>
        </div>
    )
}

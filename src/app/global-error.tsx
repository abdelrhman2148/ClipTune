'use client'

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return (
        <html lang="en">
            <body>
                <div style={{
                    minHeight: '100vh',
                    backgroundColor: '#0f172a',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '24px'
                }}>
                    <div style={{ textAlign: 'center' }}>
                        <h1 style={{ fontSize: '6rem', fontWeight: 800, color: '#ef4444', marginBottom: '16px' }}>500</h1>
                        <h2 style={{ fontSize: '2rem', fontWeight: 700, color: 'white', marginBottom: '24px' }}>Something Went Wrong</h2>
                        <p style={{ fontSize: '1.25rem', color: '#94a3b8', marginBottom: '32px' }}>
                            The AI made an oopsie. Don&apos;t worry, we&apos;re on it.
                        </p>
                        <button
                            onClick={() => reset()}
                            style={{
                                padding: '16px 32px',
                                borderRadius: '8px',
                                backgroundColor: '#4f46e5',
                                color: 'white',
                                fontWeight: 700,
                                border: 'none',
                                cursor: 'pointer'
                            }}
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            </body>
        </html>
    )
}


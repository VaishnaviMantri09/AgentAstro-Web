'use client';
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function SuccessInner() {
    const searchParams = useSearchParams();
    const sessionId = searchParams.get("session_id");
    const [loading, setLoading] = useState(true);
    const [session, setSession] = useState(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (sessionId) {
            fetch(`/api/checkout-session?session_id=${sessionId}`)
                .then(res => res.json())
                .then(data => {
                    if (data.error) {
                        setError(data.error);
                    } else {
                        setSession(data);
                    }
                    setLoading(false);
                })
                .catch(() => {
                    setError("Failed to load session info");
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, [sessionId]);

    return (
        <div
            className="min-h-screen flex items-center justify-center"
            style={{
                background: 'linear-gradient(to right, #EBEEF2 0%, #007EA6 50%, #061A40 100%)'
            }}
        >
            <div className="bg-white rounded-lg shadow-lg p-8 text-center max-w-xl w-full">
                <h1 className="font-gesta text-3xl font-bold mb-4 text-green-600">
                    Thank you for suscribing to our services!
                </h1>
                {loading ? (
                    <p className="font-gesta">Loading payment details...</p>
                ) : error ? (
                    <p className="text-red-500">{error}</p>
                ) : session ? (
                    <>
                        <p className="mb-4 font-gesta text-xl">You will receive account creation details on the email you shared during your payment.</p>
                    </>
                ) : (
                    <p className="font-gesta">No session information found.</p>
                )}
                <Link
                    href="/"
                    className="bg-blue-600 font-gesta text-white px-6 py-2 rounded-lg hover:bg-blue-700 mt-4 inline-block"
                >
                    Go Home
                </Link>
            </div>
        </div >
    );
}

export default function SuccessPage() {
    return (
        <Suspense>
            <SuccessInner />
        </Suspense>
    );
}

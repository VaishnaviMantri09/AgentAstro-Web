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
        <div className="min-h-screen flex flex-col items-center justify-center px-4"
            style={{
                background: 'linear-gradient(135deg, #bfdbfe 0%, #2563eb 50%, #1e3a8a 90%)'
            }}>
            <div className="bg-white rounded-lg shadow-lg p-8 text-center max-w-xl w-full">
                <h1 className="text-3xl font-bold mb-4 text-green-600">
                    Thank you for suscribing to our services!
                </h1>
                {loading ? (
                    <p>Loading payment details...</p>
                ) : error ? (
                    <p className="text-red-500">{error}</p>
                ) : session ? (
                    <>
                        <p className="mb-4">You will receive account creation details on the email you shared during your payment.</p>
                        <div className="text-left mb-4">
                            {/* <p><strong>Email:</strong> {session.customer_details?.email}</p>
                            <p>
                                <strong>Amount Paid:</strong>{" "}
                                ${(session.amount_total / 100).toFixed(2)}
                            </p>
                            <p><strong>Status:</strong> {session.payment_status}</p>
                            {session.line_items?.data?.length > 0 &&
                                <p>
                                    <strong>Plan:</strong> {session.line_items.data[0].description}
                                </p>
                            } */}
                        </div>
                    </>
                ) : (
                    <p>No session information found.</p>
                )}
                <Link
                    href="/"
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 mt-4 inline-block"
                >
                    Go Home
                </Link>
            </div>
        </div>
    );
}

export default function SuccessPage() {
    return (
        <Suspense>
            <SuccessInner />
        </Suspense>
    );
}

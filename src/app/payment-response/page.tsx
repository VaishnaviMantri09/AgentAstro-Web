'use client';
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Navbar } from '@/sections/Navbar';
import Footer from '@/sections/Footer';

function ResponseDetails() {
    const searchParams = useSearchParams();
    const sessionId = searchParams.get("session_id");
    const [loading, setLoading] = useState(true);
    const [session, setSession] = useState<any>(null);
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
                    Thank you for subscribing to our services!
                </h1>
                {loading ? (
                    <p className="font-gesta">Just a moment Processing...</p>
                ) : error ? (
                    <p className="text-red-500">{error}</p>
                ) : session ? (
                    <>
                        <p className="mb-6 font-gesta text-xl">
                            Thank you for your payment of <span className="font-bold">${(session.amount_total / 100).toFixed(2)}</span>!
                        </p>

                        {session.line_items?.data && session.line_items.data.length > 0 && (
                            <p className="mb-6 font-gesta text-lg">
                                You have subscribed to the <span className="font-bold text-blue-600">
                                    {session.line_items.data[0].description}
                                </span> .
                            </p>
                        )}

                        <p className="mb-2 font-gesta text-lg">
                            You will receive further details about your account on the below email  :
                        </p>

                        <p className="font-gesta text-xl font-semibold text-gray-800 mb-4">
                            {session.customer_details?.email}
                        </p>
                    </>
                ) : (
                    <p className="font-gesta">No session information found.</p>
                )}
            </div>
        </div>
    );
}

export default function PaymentResponsePage() {
    return (
        <Suspense>
            <Navbar />
            <ResponseDetails />
            <Footer />
        </Suspense>
    );
}
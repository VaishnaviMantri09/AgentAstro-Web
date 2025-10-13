import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY_V2!, {
    apiVersion: "2025-08-27.basil",
});

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get("session_id");

    if (!sessionId) {
        return NextResponse.json({ error: "Missing session_id" }, { status: 400 });
    }

    try {
        const session = await stripe.checkout.sessions.retrieve(sessionId, {
            expand: ["line_items"],
        });

        return NextResponse.json(session);
    } catch (err: any) {
        console.error("Error retrieving checkout session:", err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
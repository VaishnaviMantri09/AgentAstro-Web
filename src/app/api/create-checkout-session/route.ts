import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2025-07-30.basil' });


export async function POST(request: NextRequest) {
    try {
        const { priceId, planName, isYearly } = await request.json();

        if (!priceId) {
            return NextResponse.json({ error: "Price ID is required" }, { status: 400 });
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "subscription",
            line_items: [{ price: priceId, quantity: 1 }],
            success_url: `${request.nextUrl.origin}/`,
            cancel_url: `${request.nextUrl.origin}/pricing`,
            metadata: { planName, isYearly: isYearly ? "true" : "false" },
        });

        return NextResponse.json({ sessionId: session.id });
    } catch (err: any) {
        return NextResponse.json({ error: err.message || "Internal Server Error" }, { status: 500 });
    }
}

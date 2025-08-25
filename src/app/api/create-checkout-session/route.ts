import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2025-07-30.basil",
});

export async function POST(request: NextRequest) {
    try {
        let data;
        try {
            data = await request.json();
        } catch (err) {
            console.error("Failed to parse JSON body:", err);
            return NextResponse.json({ error: "Invalid or missing JSON body" }, { status: 400 });
        }

        if (!data || Object.keys(data).length === 0) {
            return NextResponse.json({ error: "Empty request body" }, { status: 400 });
        }

        const { priceId, planName, isYearly } = data;

        if (!priceId) {
            return NextResponse.json({ error: "Price ID is required" }, { status: 400 });
        }

        console.log("Creating Stripe Checkout Session:", {
            priceId,
            planName,
            isYearly,
        });

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "subscription",
            line_items: [{ price: priceId, quantity: 1 }],
            success_url: `${request.nextUrl.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${request.nextUrl.origin}/pricing`,
            metadata: {
                planName: planName || "",
                isYearly: isYearly ? "true" : "false",
                signupInitiated: "true",
            },
        });

        return NextResponse.json({ sessionId: session.id });
    } catch (err: any) {
        console.error("Stripe Session Creation Error:", err);
        return NextResponse.json(
            { error: err.message || "Internal Server Error" },
            { status: 500 }
        );
    }
}

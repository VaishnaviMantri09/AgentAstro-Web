import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY_V2!, {
    apiVersion: "2025-08-27.basil",
});

export async function POST(request: NextRequest) {
    try {
        const text = await request.text();
        if (!text) {
            return NextResponse.json({ error: "Empty request body" }, { status: 400 });
        }

        let data;
        try {
            data = JSON.parse(text);
        } catch (err) {
            console.error("Invalid JSON body:", err);
            return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
        }

        const { priceId, planName, isYearly, address } = data;

        if (!priceId) {
            return NextResponse.json({ error: "Price ID is required" }, { status: 400 });
        }

        console.log("Creating Stripe Checkout Session:", {
            priceId,
            planName,
            isYearly,
            address,
        });
        let customerId: string | undefined;
        if (address?.line1) {
            const customer = await stripe.customers.create({
                address: {
                    line1: address.line1,
                    line2: address.line2 || undefined,
                    city: address.city,
                    state: address.state,
                    postal_code: address.zip,
                    country: address.country || "US",
                },
            });
            customerId = customer.id;
        }

        const session = await stripe.checkout.sessions.create({
            mode: "subscription",
            payment_method_types: ["card"],
            line_items: [{ price: priceId, quantity: 1 }],
            allow_promotion_codes: true,
            billing_address_collection: "required",
            phone_number_collection: { enabled: true },
            automatic_tax: { enabled: true },
            ...(customerId && { customer: customerId }),

            subscription_data: {
                metadata: {
                    planName: planName || "",
                    isYearly: isYearly ? "true" : "false",
                    ...address,
                },

            },
            consent_collection: {
                terms_of_service: "required",
            },
            custom_text: {
                terms_of_service_acceptance: {
                    message: "I Agree to the AgentAstro.ai [Terms of Service](https://agentastro.ai/terms)",
                },
            },

            success_url: `${request.nextUrl.origin}/payment-response?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${request.nextUrl.origin}/pricing`,
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
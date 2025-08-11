import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import nodemailer from "nodemailer";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2025-07-30.basil",
});

export async function POST(request: NextRequest) {
    const sig = request.headers.get("stripe-signature");

    if (!sig) {
        return NextResponse.json({ error: "Missing Stripe signature" }, { status: 400 });
    }

    let event: Stripe.Event;

    try {
        const rawBody = await request.text();
        event = stripe.webhooks.constructEvent(
            rawBody,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (err: any) {
        console.error("Webhook signature verification failed:", err.message);
        return NextResponse.json({ error: "Webhook Error" }, { status: 400 });
    }

    if (event.type === "checkout.session.completed") {
        const session = event.data.object as Stripe.Checkout.Session;
        const customerEmail = session.customer_details?.email;

        if (customerEmail) {
            try {
                const token = encodeURIComponent(Buffer.from(`${customerEmail}:${Date.now()}`).toString("base64"));

                const link = `${process.env.NEXT_PUBLIC_APP_URL}/create-account?token=${token}`;

                await sendAccountEmail(customerEmail, link);
                console.log("✅ Email sent to", customerEmail);
            } catch (error) {
                console.error("❌ Failed to send email:", error);
            }
        }
    }

    return NextResponse.json({ received: true });
}

async function sendAccountEmail(to: string, link: string) {

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST!,
        port: Number(process.env.SMTP_PORT!),
        secure: false,
        auth: {
            user: process.env.SMTP_USER!,
            pass: process.env.SMTP_PASS!,
        },
    });

    await transporter.sendMail({
        from: `"Your Company" <${process.env.SMTP_USER!}>`,
        to,
        subject: "Complete Your Account Setup",
        html: `
      <h2>Welcome!</h2>
      <p>Thanks for your purchase. Please complete your account setup by clicking the link below:</p>
      <p><a href="${link}">Create Your Account</a></p>
      <p>If you did not make this purchase, please ignore this email.</p>
    `,
    });
}


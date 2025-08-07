// src/app/api/stripe-webhook/route.ts
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-08-01",
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  const buf = await request.arrayBuffer();
  const body = Buffer.from(buf);
  const signature = request.headers.get("stripe-signature") || "";

  let event: Stripe.Event;

  try {
    // Verify webhook signature and parse the event
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: any) {
    console.error("⚠️ Webhook signature verification failed.", err.message);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  // Handle the checkout.session.completed event
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    // Get customer email from the session
    const email = session.customer_details?.email;

    if (email) {
      try {
        // TODO: Generate a unique invite or admin account creation link
        const inviteLink = await createAdminInviteLink(email);

        // TODO: Send a custom email with the invite link
        await emailService.send({
          to: email,
          subject: "Create Your Admin Account",
          html: `<p>Thank you for your purchase!</p><p><a href="${inviteLink}">Click here to set up your admin account</a></p>`,
        });

        console.log(`✅ Invite email sent to ${email}`);
      } catch (error) {
        console.error("Failed to generate invite link or send email:", error);
        // You may want to handle this error (e.g., retry or log further)
      }
    } else {
      console.warn("⚠️ No customer email found in the session.");
    }
  }

  return NextResponse.json({ received: true }, { status: 200 });
}

// Placeholder function: implement your real invite link generation here
async function createAdminInviteLink(email: string): Promise<string> {
  // This could be a signed JWT link or a link to your app with a token query param
  // Example:
  return `https://your-app-domain.com/admin-invite?email=${encodeURIComponent(email)}&token=unique-token`;
}

// Placeholder email service: replace with your actual email sending logic (SendGrid, Nodemailer, etc.)
const emailService = {
  send: async ({ to, subject, html }: { to: string; subject: string; html: string }) => {
    // Implement your email provider's send logic here
    // For example, using SendGrid or Nodemailer
    console.log(`Sending email to: ${to}, subject: ${subject}`);
    console.log(`Email content: ${html}`);
    // Simulate async sending delay
    await new Promise((resolve) => setTimeout(resolve, 500));
  },
};

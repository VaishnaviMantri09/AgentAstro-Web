import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
    try {
        const { email } = await req.json();

        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return NextResponse.json({ error: "Invalid email" }, { status: 400 });
        }

        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: process.env.SMTP_SECURE === "true",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });
        await transporter.sendMail({
            from: `Agent Astro Newsletter`,
            to: process.env.TO_EMAIL,
            subject: "A New Newsletter Subscription",
            text: `New subscriber: ${email}`,
            html: `
            <div style="padding: 24px; color: #333333;">
            <p style="margin: 0 0 16px 0;">Hi there, I hope you are doing well.</p>
            <p style="margin: 0 0 16px 0;">
            <p>A new user has subscribed to your newsletter:</p>
                <p><strong>Email:</strong> ${email}</p>
                <p style="margin-top: 20px;">Best regards,<br/>Your Website Newsletter</p>
            </div>
            <div style="background: #f3f4f6; color: #777; font-size: 12px; text-align: center; padding: 12px;">
                <p style="margin: 0;">
                This message was sent from your website newsletter subscription form.
                </p>
                </div>
                `,
        });


        return NextResponse.json({ success: true });
    } catch (err: any) {
        console.error("Email send error:", err);
        return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }
}


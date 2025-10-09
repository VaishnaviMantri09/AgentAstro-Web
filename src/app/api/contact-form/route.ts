import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

function escapeHtml(unsafe: string) {
    return unsafe
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, subject, message } = body ?? {};

        if (!name || !email || !subject || !message)
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });

        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST ?? "smtp.gmail.com",
            port: Number(process.env.SMTP_PORT ?? 465),
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: `"Website Contact" <${process.env.EMAIL_USER}>`,
            to: process.env.TO_EMAIL ?? process.env.EMAIL_USER,
            replyTo: email,
            subject: `[Website Contact] ${subject}`,
            headers: {
                "X-Mailer": "Website Contact Form",
                "X-Priority": "3",
            },
            html: `
                <div style="font-family: Arial, sans-serif; background-color: #f9fafb; padding: 20px;">
                <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 6px rgba(0,0,0,0.1);">
                <div style="background: #0d6efd; color: #ffffff; padding: 16px 24px;">
                    <h2 style="margin: 0; font-size: 20px;">New Contact Form Submission</h2>
                </div>
                <div style="padding: 24px; color: #333333;">
                    <p style="margin: 0 0 16px 0;">Hi there, I hope you are doing well.</p>
                    <p style="margin: 0 0 16px 0;">
                    You’ve received a new message from your website contact form. Here are the details:
                    </p>
                    <p style="margin: 0 0 10px 0;"><strong>Name:</strong> ${escapeHtml(name)}</p>
                    <p style="margin: 0 0 10px 0;"><strong>Email:</strong> ${escapeHtml(email)}</p>
                    <p style="margin: 0 0 10px 0;"><strong>Subject:</strong> ${escapeHtml(subject)}</p>
                    <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
                    <p style="margin-bottom: 8px;"><strong>Message:</strong></p>
                    <p style="white-space: pre-line; line-height: 1.6; margin-top: 0;">
                    ${escapeHtml(message)}
                    </p>
                    <p style="margin-top: 20px;">Best regards,<br/>Your Website Contact Form</p>
                </div>
                
                <div style="background: #f3f4f6; color: #777; font-size: 12px; text-align: center; padding: 12px;">
                    <p style="margin: 0;">
                    This message was sent from 
                    <a href="https://www.agentastro.ai/" style="color: #0d6efd; text-decoration: none;">AgentAstro.ai</a>.
                    </p>
                </div>
                </div>
            </div>
`
        };

        await transporter.sendMail(mailOptions);
        return NextResponse.json({ success: true });
    } catch (err) {
        console.error("Contact API error:", err);
        return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }
}

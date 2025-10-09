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

        if (!name?.toString().trim() || !email?.toString().trim() || !subject?.toString().trim() || !message?.toString().trim()) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(String(email))) {
            return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
        }

        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST ?? "smtp.gmail.com",
            port: Number(process.env.SMTP_PORT ?? 465),
            secure: (process.env.SMTP_SECURE ?? "true") === "true",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const toAddress = process.env.TO_EMAIL ?? process.env.EMAIL_USER ?? "no-reply@example.com";

        const mailOptions = {
            from: `"${String(name).trim()}" <${process.env.EMAIL_USER}>`,
            to: toAddress,
            replyTo: String(email).trim(),
            subject: `[Website Contact] ${String(subject).trim()}`,
            text: `You have a new message from your website contact form.\n\nName: ${String(name).trim()}\nEmail: ${String(email).trim()}\nSubject: ${String(subject).trim()}\n\nMessage:\n${String(message).trim()}`,
            html: `
        <h3>New contact form submission</h3>
        <p><strong>Name:</strong> ${escapeHtml(String(name).trim())}</p>
        <p><strong>Email:</strong> ${escapeHtml(String(email).trim())}</p>
        <p><strong>Subject:</strong> ${escapeHtml(String(subject).trim())}</p>
        <hr />
        <p>${escapeHtml(String(message).trim()).replace(/\n/g, "<br/>")}</p>
      `,
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error("Contact API error:", err);
        return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }
}

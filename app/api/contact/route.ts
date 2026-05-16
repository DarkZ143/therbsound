// app/api/contact/route.ts
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    // 1. Configure the Nodemailer transporter securely for Gmail
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true for port 465 (SSL)
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      // This prevents connections from hanging or dropping silently
      connectionTimeout: 10000,
    });

    // 2. Email sent to YOU (Collaboration Request)
    const mailToOwner = {
      from: `"${name}" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email, // This allows you to just hit reply to email the user directly
      subject: `🎵 New Collaboration Request from ${name}`,
      html: `
                <div style="font-family: sans-serif; padding: 20px; color: #333;">
                    <h2>New Collaboration Request</h2>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
                    <p><strong>Message:</strong></p>
                    <div style="background: #f5f5f5; padding: 15px; border-radius: 8px;">
                        ${message}
                    </div>
                </div>
            `,
    };

    // 3. Auto-reply email sent to the USER
    const mailToSender = {
      from: `theRBsound <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Thank you for reaching out, ${name}!`,
      html: `
                <div style="font-family: sans-serif; padding: 20px; color: #333;">
                    <p>Hi ${name},</p>
                    <p>Thank you for reaching out! I've received your message.</p>
                    <p><strong>Your message:</strong></p>
                    <div style="background: #f5f5f5; padding: 15px; border-radius: 8px; font-style: italic;">
                        "${message}"
                    </div>
                    <p>I will review your request and get back to you as soon as possible.</p>
                    <br />
                    <p>Best regards,</p>
                    <p><strong>theRBsound</strong></p>
                </div>
            `,
    };

    // 4. Send the emails concurrently
    await Promise.all([
      transporter.sendMail(mailToOwner),
      transporter.sendMail(mailToSender),
    ]);

    return NextResponse.json({
      success: true,
      message: "Emails sent successfully!",
    });
  } catch (error) {
    // This will print the exact internal error message to your terminal console
    console.error("❌ NODEMAILER ERROR DETAILS:", error);
    return NextResponse.json(
      { success: false, message: "Failed to send message." },
      { status: 500 },
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const { email, name, message } = await req.json() as {
      email: string;
      name: string;
      message: string;
    };

    if (!email || !name || !message) {
      return NextResponse.json({ error: "Faltan campos" }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"Portfolio" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      replyTo: email,
      subject: `Portfolio — Mensaje de ${name}`,
      text: `De: ${name} <${email}>\n\n${message}`,
      html: `
        <h3 style="font-family:sans-serif">Nuevo mensaje desde el portfolio</h3>
        <p style="font-family:sans-serif"><b>Nombre:</b> ${name}</p>
        <p style="font-family:sans-serif"><b>Email:</b> <a href="mailto:${email}">${email}</a></p>
        <p style="font-family:sans-serif"><b>Mensaje:</b></p>
        <p style="font-family:sans-serif;white-space:pre-wrap">${message}</p>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] Error sending email:", err);
    return NextResponse.json({ error: "Error al enviar" }, { status: 500 });
  }
}

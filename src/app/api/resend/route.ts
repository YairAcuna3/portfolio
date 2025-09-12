import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;
    const subj = subject || `Mensaje de ${name}!!`;

    const data = await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: "yairacuna30@gmail.com",
      subject: subj,
      replyTo: email,
      text: message,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ success: false, error });
  }
}

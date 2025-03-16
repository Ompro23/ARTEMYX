import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    const { email, orderDetails } = await req.json();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Order Confirmation',
      html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Thank you for your order!</h2>
        <p>Dear Customer,</p>
        <p>Your purchase was successful. Here are your order details:</p>
        <div style="border: 1px solid #ddd; padding: 10px;">
          <pre>${JSON.stringify(orderDetails, null, 2)}</pre>
        </div>
        <p>We will email you the tracking ID once your product is dispatched.</p>
        <p>If you have any questions, please reply to this email.</p>
        <p>Sincerely,<br/>The Artemyx Team</p>
      </div>
    `,
    };

    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: 'Error sending email' }, { status: 500 });
  }
}

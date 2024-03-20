// We have to install the nodemailer package first `npm install nodemailer`
import nodemailer from "nodemailer";

export default defineEventHandler(async (event) => {
  // Verify API Key
  const apiKey = getRequestHeader(event, "authorization");
  const apiKeyConfig = useRuntimeConfig().auth.email.provider.authorization;
  if (apiKey !== apiKeyConfig) {
    throw createError({ statusCode: 401, message: "unauthorized" });
  }

  // Read the request body
  const body = await readBody<{
    to: string;
    from: string;
    subject: string;
    html: string;
  }>(event);

  // Create transporter with SMTP settings
  // A test account can be created at https://ethereal.email/ for development
  const transporter = nodemailer.createTransport({
    host: process.env.NUXT_SMTP_HOST,
    port: Number(process.env.NUXT_SMTP_PORT),
    secure: Number(process.env.NUXT_SMTP_PORT) === 465,
    auth: {
      user: process.env.NUXT_SMTP_USER,
      pass: process.env.NUXT_SMTP_PASS,
    },
  });

  // Send mail
  await transporter.sendMail({
    from: process.env.NUXT_SMTP_FROM,
    to: body.to,
    subject: body.subject,
    html: body.html,
  });

  // Return a success message
  // If you return nothing, nuxt may throw an error or just hang
  return "Email sent successfully!";
});

// await emailSender.sendMail(email, 'Email Verification', { otp: verificationCode, name: user.name }, 'verification-code');
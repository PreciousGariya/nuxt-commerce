// We have to install the nodemailer package first `npm install nodemailer`
import nodemailer from "nodemailer";
import {PrismaClient} from "@prisma/client";
import EmailSender from '../../../utils/mailer';
const emailSender = new EmailSender();
import crypto from "crypto";

export default defineEventHandler(async (event) => {
  // Verify API Key
  const apiKey = getRequestHeader(event, "authorization");
  const apiKeyConfig = useRuntimeConfig().auth.email.provider.authorization;
  if (apiKey !== apiKeyConfig) {
    throw createError({ statusCode: 401, message: "unauthorized" });
  }
  const prisma= new PrismaClient();
  // Read the request body
  const body = await readBody<{
    to: string;
    from: string;
    subject: string;
    html: string;
  }>(event);

//check user exist
const user =await  prisma.user.findUnique({
  where: {
    email: body.to
  }
});

if (!user) {
  throw createError({
    statusCode: 404,
    statusMessage: "User not found",
  });
}

//

const uniqueCode = crypto.randomBytes(10).toString("hex");

await prisma.passwordReset.create({
  data: {
    email: body.to,
    token: uniqueCode
  }
})

const link = `${process.env.NUXT_APP_URL}/auth/verify-email?token=${uniqueCode}`
await emailSender.sendMail(body.to, 'Email Verification', { link: link, name: user.name, }, 'verification-email');


  // // Create transporter with SMTP settings
  // // A test account can be created at https://ethereal.email/ for development
  // const transporter = nodemailer.createTransport({
  //   host: process.env.NUXT_SMTP_HOST,
  //   port: Number(process.env.NUXT_SMTP_PORT),
  //   secure: Number(process.env.NUXT_SMTP_PORT) === 465,
  //   auth: {
  //     user: process.env.NUXT_SMTP_USER,
  //     pass: process.env.NUXT_SMTP_PASS,
  //   },
  // });

  // // Send mail
  // await transporter.sendMail({
  //   from: process.env.NUXT_SMTP_FROM,
  //   to: body.to,
  //   subject: body.subject,
  //   html: body.html,
  // });

  // Return a success message
  // If you return nothing, nuxt may throw an error or just hang
  return "Email sent successfully!";
});

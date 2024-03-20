import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import handlebars from 'handlebars';

class EmailSender {
    private transporter: nodemailer.Transporter;
    private currentDir: string;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.NUXT_SMTP_HOST,
            port: Number(process.env.NUXT_SMTP_PORT),
            // secure: Number(process.env.NUXT_SMTP_PORT) === 465,
            auth: {
                user: process.env.NUXT_SMTP_USER,
                pass: process.env.NUXT_SMTP_PASS,
            },
        });

        // Get the current directory
        this.currentDir = path.dirname(new URL(import.meta.url).pathname);
    }

    private async sendHtmlEmail(to: string, subject: string, htmlContent: string): Promise<boolean> {
        try {
            const info = await this.transporter.sendMail({
                from: 'no-reply@nuxt-commerce.io',
                to,
                subject,
                html: htmlContent,
            });

            console.log('HTML email sent: ', info.messageId);
            return true;
        } catch (error) {
            console.error('Error sending HTML email: ', error);
            return false;
        }
    }

    public async sendMail(to: string, subject: string, data: object, template: string): Promise<boolean> {
        try {
            // console.log('this.currentDir',this.currentDir)
            const templatePath = path.join(this.currentDir, '../../', 'emails', `${template}.hbs`);
            // console.log('templatePath',templatePath)
            const templateContent = fs.readFileSync(templatePath, 'utf-8');
            // Compile the handlebars template
            const compiledTemplate = handlebars.compile(templateContent);
            // Use the compiled template to render dynamic content
            const htmlContent = compiledTemplate(data);
            
            // Send HTML email with dynamic data
            await this.sendHtmlEmail(to, subject, htmlContent);
            return true;
        } catch (error) {
            console.error('Error sending verification code: ', error);
            return false;
        }
    }
}

export default EmailSender;

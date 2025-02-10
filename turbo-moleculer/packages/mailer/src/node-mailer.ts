import { config } from 'dotenv';
import { Errors } from 'moleculer';
import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { ZodError } from 'zod';
import { EmailPayload, EmailPayloadSchema, MailOptions } from '@repo/common-types';
const { MoleculerError } = Errors;

config();
function getMailOptions(email: string, subject: string, body: string): MailOptions{
    const mailOptions = {
        from: process.env.SMTP_USER,
        to: email,
        subject,
        text: body,
    };
    return mailOptions;
}

const smtpOptions: SMTPTransport.Options = {
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT as string),
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
    },
};

function createTransporter(){
    const transporter = nodemailer.createTransport(smtpOptions);
    return transporter;
}

export default async function sendEmail(emailPayload: EmailPayload): Promise<{message: string}>{
    try {
        const { email, subject, body } = EmailPayloadSchema.parse(emailPayload);
        const transporter = createTransporter();
        const mailOptions = getMailOptions(email, subject, body);
        await transporter.sendMail(mailOptions);
        return { message: "Email sent successfully" };
    } catch (err: any) {
        if (err instanceof ZodError) {
            throw new MoleculerError(err.issues?.[0]?.message || 'Zod Validation Error', 400, 'BAD_REQUEST');
        }else{
            throw new MoleculerError(err, 400, 'BAD_REQUEST');
        }
    }
}
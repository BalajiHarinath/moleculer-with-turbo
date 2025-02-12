import { EmailPayload, EmailPayloadSchema, MailOptions } from '@repo/common-types';
import { config } from 'dotenv';
import { Errors } from 'moleculer';
import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
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

export default async function sendEmailSmtp(emailPayload: EmailPayload): Promise<{message: string}>{    
    try {
        const { email, subject, body } = EmailPayloadSchema.parse(emailPayload);
        const transporter = createTransporter();
        const mailOptions = getMailOptions(email, subject, body);
        await transporter.sendMail(mailOptions);
        return { message: 'Email sent successfully' };
    } catch (err: any) {
        throw new MoleculerError(err, 400, 'BAD_REQUEST');
    }
}
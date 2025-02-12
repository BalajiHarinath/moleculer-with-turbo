import { EmailPayload, EmailPayloadSchema, EmailProvider } from '@repo/common-types';
import sgMail from '@sendgrid/mail';
import { config } from 'dotenv';
import { Errors } from 'moleculer';
import { ZodError } from 'zod';
import sendEmailSmtp from './providers/node-mailer';
import sendEmailSendGrid from './providers/sendgrid';
const { MoleculerError } = Errors;

config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

export async function sendEmail(emailPayload: EmailPayload): Promise<{message: string}> {
    try{        
        const { email, subject, body, provider } = EmailPayloadSchema.parse(emailPayload);
        const emailProvider = provider || EmailProvider.SMTP;
        switch(emailProvider){
            case EmailProvider.SMTP:
                return await sendEmailSmtp(emailPayload);
            case EmailProvider.SENDGRID:
                return await sendEmailSendGrid(emailPayload);
            default:
                throw new MoleculerError('Invalid email provider', 400, 'BAD_REQUEST');
        }
    }catch(err: any){
        if (err instanceof ZodError) {
            throw new MoleculerError(err.issues?.[0]?.message || 'Zod Validation Error', 400, 'BAD_REQUEST');
        }else{
            throw new MoleculerError(err, 400, 'BAD_REQUEST');
        }
    }
}
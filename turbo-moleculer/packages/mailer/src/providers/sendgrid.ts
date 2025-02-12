import { EmailPayload, SendgridPayload } from '@repo/common-types';
import sgMail from '@sendgrid/mail';
import { config } from 'dotenv';
import { Errors } from 'moleculer';
const { MoleculerError } = Errors;

config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

export default async function sendEmailSendGrid(emailPayload: EmailPayload): Promise<{message: string}>{
    try{
        const msg: SendgridPayload = {
            to: emailPayload.email,
            from: process.env.SENDGRID_FROM_EMAIL as string,
            subject: emailPayload.subject,
            text: emailPayload.body
        }
        await sgMail.send(msg);
        return { message: 'Email sent successfully' };
    }catch(err: any){        
        throw new MoleculerError(err, 400, 'BAD_REQUEST');
    }
}
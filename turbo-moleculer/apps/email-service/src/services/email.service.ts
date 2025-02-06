import { ErrorResponse, UserData } from '@repo/common-types';
import { getGreetingEmailBody, getGreetingEmailSubject } from '@repo/email-helper';
import { Errors } from 'moleculer';
import sendEmail from '../utils/node-mailer';
import { errorHandler } from '@repo/error-handler';
const { MoleculerError } = Errors;

export const EmailService = {
    async sendGreetingEmail(input: UserData): Promise<{ success: boolean; message: string } | ErrorResponse> {
        try {
            const subject = getGreetingEmailSubject();
            const body = getGreetingEmailBody(input);
    
            await sendEmail({ email: input.email, subject, body }, MoleculerError);

            return { success: true, message: 'Email sent successfully' };
        } catch (err: any) {
            return errorHandler(err);
        }
    }
}

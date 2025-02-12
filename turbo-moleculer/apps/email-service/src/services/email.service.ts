import { ErrorResponse, SuccessResponse, UserData, EmailProvider } from '@repo/common-types';
import { getGreetingEmailBody, getGreetingEmailSubject } from '@repo/email-helper';
import { sendEmail } from '@repo/mailer';
import { ZodError } from 'zod';

export const EmailService = {
    async sendGreetingEmail(input: UserData): Promise<SuccessResponse | ErrorResponse> {
        try {
            const subject = getGreetingEmailSubject();
            const body = getGreetingEmailBody(input);
    
            await sendEmail({ email: input.email, subject, body, provider: EmailProvider.SMTP });

            return { success: true, message: 'Email sent successfully' };
        } catch (err: any) {
            if (err instanceof ZodError) throw err;
            else throw new Error(err);
        }
    }
}

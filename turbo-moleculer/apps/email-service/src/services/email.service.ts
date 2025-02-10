import { ErrorResponse, SuccessResponse, UserData } from '@repo/common-types';
import { getGreetingEmailBody, getGreetingEmailSubject } from '@repo/email-helper';
import { sendEmail } from '@repo/mailer';
import { errorHandler } from '@repo/error-handler';

export const EmailService = {
    async sendGreetingEmail(input: UserData): Promise<SuccessResponse | ErrorResponse> {
        try {
            const subject = getGreetingEmailSubject();
            const body = getGreetingEmailBody(input);
    
            await sendEmail({ email: input.email, subject, body });

            return { success: true, message: 'Email sent successfully' };
        } catch (err: any) {
            return errorHandler(err);
        }
    }
}

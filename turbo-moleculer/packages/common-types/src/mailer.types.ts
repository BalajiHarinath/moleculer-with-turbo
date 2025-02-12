import { z } from 'zod';

export const EmailPayloadSchema = z.object({
    email: z.string().email('Invalid email format.'),
    subject: z.string().min(1, 'Email subject is required.'),
    body: z.string().min(1, 'Email body is required.'),
    provider: z.string().optional(),
});

export type EmailPayload = z.infer<typeof EmailPayloadSchema>;

export interface MailOptions {
    from: string|undefined;
    to: string;
    subject: string;
    text: string;
}

export interface SendgridPayload {
    to: string;
    from: string;
    subject: string;
    text: string;
}

export enum EmailProvider {
    SMTP = 'smtp',
    SENDGRID = 'sendgrid'
}
import { UserData } from '@repo/common-types';
import { errorHandler } from "@repo/error-handler";
import { Context } from 'moleculer';
import { EmailService } from '../../services/email.service';

export default async function handler(ctx: Context<UserData>) {
    try {
        return await EmailService.sendGreetingEmail(ctx.params);
    } catch (err) {
        return errorHandler(err);
    }
}

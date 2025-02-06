import { UserData } from '@repo/common-types';
import { errorHandler } from "@repo/error-handler";
import { Context } from 'moleculer';
import { EmailService } from '../../services/email.service';
import { Errors } from 'moleculer';
const { MoleculerError } = Errors;

export default async function handler(ctx: Context<UserData>) {
    try {
        return await EmailService.sendGreetingEmail(ctx.params, MoleculerError);
    } catch (err) {
        return errorHandler(err);
    }
}

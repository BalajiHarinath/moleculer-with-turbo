import { ErrorResponse } from '@repo/common-types';
import { errorHandler } from "@repo/error-handler";
import { Context, Errors } from 'moleculer';
import { getGreetingEmailBody, getGreetingEmailSubject } from '../../helpers/email-helper';
import { UserData } from '../../types/user.types';
import sendEmail from '../../utils/node-mailer';

const { MoleculerError } = Errors;

export default async function handler(ctx: Context<UserData>)
    : Promise<ErrorResponse | {success: boolean, message: string}>{
    try{
        const input = ctx.params;
        const subject = getGreetingEmailSubject();
        const body = getGreetingEmailBody(input);
        await sendEmail({email: input.email, subject, body}, MoleculerError);
        return {success: true, message: 'Email sent successfully'};
    }catch(err){
        return errorHandler(err);
    }
}
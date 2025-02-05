import { UserData } from '@repo/common-types';
import { errorHandler } from "@repo/error-handler";
import { Context } from 'moleculer';

export default async function handler(ctx: Context<UserData>){
    try{
        const result = await ctx.call('email.sendGreetingEmail', ctx.params);
        return result;
    }catch(err){
        return errorHandler(err);
    }
}
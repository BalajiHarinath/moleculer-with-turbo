import { UserData } from '@repo/common-types';
import { Context } from 'moleculer';
import { ZodError } from 'zod';

export default async function handler(ctx: Context<UserData>){
    try{
        const result = await ctx.call('email.sendGreetingEmail', ctx.params);
        return result;
    }catch(err: any){
        if (err instanceof ZodError) throw err;
        else throw new Error(err);
    }
}
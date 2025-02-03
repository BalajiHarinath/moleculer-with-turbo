import { errorHandler } from "@repo/error-handler";
import { Context } from 'moleculer';
import { UserInput, UserInputSchema } from '../../types/user.types';

export default {
    async handler(ctx: Context<UserInput>){
        try{
            const input = UserInputSchema.parse(ctx.params);
            await ctx.emit('user.created', input);
            return {success: true, message: 'User created successfully', status: 200};
        }catch(err: any){
            return errorHandler(err);
        }
    }
}

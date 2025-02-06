import { Context } from 'moleculer';
import { UserInput, UserInputSchema } from '../types/user.types';
import { errorHandler } from '@repo/error-handler';
import { ErrorResponse } from '@repo/common-types';

export const UserService = {
    async addUser(ctx: Context<UserInput>): Promise<{ success: boolean; message: string; status: number } | ErrorResponse>{
        try{
            const input = UserInputSchema.parse(ctx.params);
            /* Some DB operations to add the user */
            await ctx.emit('user.created', input);
            return {success: true, message: 'User created successfully', status: 200};
        }catch(err: any){
            return errorHandler(err);
        }
    }
}

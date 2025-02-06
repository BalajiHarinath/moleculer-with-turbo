import { errorHandler } from "@repo/error-handler";
import { Context } from 'moleculer';
import { UserService } from "../../services/user.service";
import { UserInput } from '../../types/user.types';

export default {
    async handler(ctx: Context<UserInput>){
        try{
            const response = await UserService.addUser(ctx.params);
            await ctx.emit('user.created', ctx.params);
            return response;
        }catch(err: any){
            return errorHandler(err);
        }
    }
}

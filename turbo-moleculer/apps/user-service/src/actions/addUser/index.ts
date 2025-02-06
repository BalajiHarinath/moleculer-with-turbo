import { errorHandler } from "@repo/error-handler";
import { Context } from 'moleculer';
import { UserService } from "../../services/user.service";
import { UserInput } from '../../types/user.types';

export default {
    async handler(ctx: Context<UserInput>){
        try{
            return UserService.addUser(ctx);
        }catch(err: any){
            return errorHandler(err);
        }
    }
}

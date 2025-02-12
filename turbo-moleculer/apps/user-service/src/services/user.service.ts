import { ErrorResponse, SuccessResponse } from '@repo/common-types';
import { ZodError } from 'zod';
import { UserInput, UserInputSchema } from '../types/user.types';

export const UserService = {
    async addUser(input: UserInput): Promise<SuccessResponse | ErrorResponse>{
        try{
            UserInputSchema.parse(input);
            /* Some DB operations to add the user */
            return {success: true, message: 'User created successfully', status: 200};
        }catch(err: any){
            if (err instanceof ZodError) throw err;
            else throw new Error(err);
        }
    }
}

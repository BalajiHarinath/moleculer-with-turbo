import { z } from 'zod';

export const UserInputSchema = z.object({
    firstName: z.string().min(2, 'First name is required'),
    lastName: z.string().min(2, 'Last name is required'),
    email: z.string().email('Invaild email format'),
});

export type UserInput = z.infer<typeof UserInputSchema>;
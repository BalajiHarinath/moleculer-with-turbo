import { UserData } from "@repo/common-types";

export function getGreetingEmailSubject(): string{
    return 'Welcome to Our Platform';
};
    
export function getGreetingEmailBody(input: UserData): string{
    return `Hello ${input.firstName},\n\nWelcome to our platform!\n\nBest Regards,\nTeam`;
};
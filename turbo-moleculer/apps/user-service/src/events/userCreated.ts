import { UserInput } from "../types/user.types";

export default function handler(payload: UserInput): void{
    console.log(`Event triggered: User ${payload.firstName} created`);
}
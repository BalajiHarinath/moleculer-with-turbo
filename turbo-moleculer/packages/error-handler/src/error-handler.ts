import { ErrorResponse } from "@repo/common-types";
import { ZodError } from 'zod';

export default function errorHandler(err: any): ErrorResponse{
    if (err instanceof ZodError) {
        return {
            success: false,
            error: {
                message: err.issues?.[0]?.message || 'Zod Validation Error',
                code: 400,
                type: 'INVALID_INPUT'
            },
            statusCode: 400,
        }
    }
    return{
        success: false,
        error: {
            message: err.message || 'An unexpected error occurred',
            code: err.code,
            type: err.type || 'INTERNAL_ERROR'
        },
        statusCode: err.code || 500,
    }
}
export interface ErrorResponse {
    success: boolean;
    error: {
        message: string;
        code?: number;
        type: string;
    };
    statusCode: number;
}

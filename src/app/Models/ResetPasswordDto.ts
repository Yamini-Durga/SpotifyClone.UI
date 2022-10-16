export interface ResetPasswordDto {
    Email: string;
    Token: string;
    Password: string;
    ConfirmPassword: string;
}
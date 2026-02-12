import { IsEmail, IsNotEmpty } from "class-validator";

export class LoginDto {
    @IsNotEmpty({ message: 'O e-mail é obrigatório' })
    @IsEmail({}, { message: 'E-mail inválido' })
    email: string;

    @IsNotEmpty({ message: 'A senha é obrigatória' })
    password: string;
}
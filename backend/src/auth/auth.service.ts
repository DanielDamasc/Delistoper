import { ConflictException, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private userService: UserService) {}

    async register(registerDto: RegisterDto) {

        // Validação para se o e-mail já existe.
        const userExists = await this.userService.findByEmail(registerDto.email);
        if (userExists) {
            throw new ConflictException('Este e-mail já foi cadastrado.');
        }

        // Cria uma senha criptografada.
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(registerDto.password, salt);

        // Cria usuário no banco.
        const newUser = await this.userService.create({
            ...registerDto, // Spread do objeto.
            password: hashedPassword, // Sobrescreve a senha com a hashed.
        })

        // Retorna o usuário.
        // Desestruturação de Objeto: retira a senha do objeto e guarda todo o resto em um novo objeto 'result'.
        const { password, ...result } = newUser;
        return result;
    }
}

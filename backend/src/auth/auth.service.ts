import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) {}

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

    async login(loginDto: LoginDto) {

        // Busca o usuário pelo e-mail.
        const findUser = await this.userService.findByEmail(loginDto.email);

        // Se não encontrar, envia exception.
        if (!findUser) {
            throw new UnauthorizedException('E-mail ou senha incorretos.');
        }

        // Compara a senha do banco com a senha enviada.
        const isPasswordValid = await bcrypt.compare(loginDto.password, findUser.password);

        // Se a senha não corresponder, envia exception.
        if (!isPasswordValid) {
            throw new UnauthorizedException('E-mail ou senha incorretos.');
        }

        // Payload para identificar o proprietário do token.
        const payload = { sub: findUser.id, email: findUser.email, name:findUser.name };

        // Retorna o token e dados do usuário.
        return {
            access_token: await this.jwtService.signAsync(payload),
            user: {
                id: findUser.id,
                name: findUser.name,
                email: findUser.email
            }
        };
    }
}

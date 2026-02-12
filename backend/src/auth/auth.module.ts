import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        UserModule,

        // Configuração do JWT (bearer token)
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '1d' }, // Token expira em 1 dia
        }),
    ],
    controllers: [
        AuthController
    ],
    providers: [
        AuthService
    ],
    exports: [
        
    ],
})
export class AuthModule {}

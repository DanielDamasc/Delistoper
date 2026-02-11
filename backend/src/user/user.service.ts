import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
    constructor(private prismaService: PrismaService) {}

    async findByEmail(email: string) {
        return this.prismaService.user.findUnique({
            where: { email },
        });
    }

    async create(data: CreateUserDto) {
        return this.prismaService.user.create({
            data
        });
    }
}

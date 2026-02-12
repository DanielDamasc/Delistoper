import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
    constructor(private prismaService: PrismaService) {}

    async findByEmail(email: string) {
        return this.prismaService.prismaClient.user.findUnique({
            where: { email },
        });
    }

    async create(data: CreateUserDto) {
        return this.prismaService.prismaClient.user.create({
            data
        });
    }
}

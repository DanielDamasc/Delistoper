import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProjectService {
    constructor(private prismaService: PrismaService) {}

    async create(data: CreateProjectDto, userId: number) {
        this.prismaService.prismaClient.project.create({
            data: { ...data, userId }
        });
    }
}

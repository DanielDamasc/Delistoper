import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProjectService {
    constructor(private prismaService: PrismaService) {}

    async create(data: CreateProjectDto, userId: number) {
        return this.prismaService.prismaClient.project.create({
            data: { 
                ...data, // Nome e descrição
                user: {
                    connect: { id: userId } // Conecta usando a relation
                }
            }
        });
    }

    async findAll(userId: number) {
        return this.prismaService.prismaClient.project.findMany({
            where: {
                userId: userId,
            },
        });
    }

    async findOne(userId: number, projectId: number) {
        return this.prismaService.prismaClient.project.findFirst({
           where: {
                id: projectId,
                userId: userId
           },
        // Trás as tasks do banco na mesma requisição.    
           include: {
                tasks: true
           }
        });
    }

    async delete(projectId: number) {
        return this.prismaService.prismaClient.project.delete({
            where: {
                id: projectId
            }
        });
    }
}

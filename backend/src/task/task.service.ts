import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TaskService {
    constructor(private prismaService: PrismaService) {}

    async create(data: CreateTaskDto, projectId: number) {

        // Pega a última tarefa TODO para saber a posição dela.
        const lastTask = await this.prismaService.prismaClient.task.findFirst({
            where: {
                projectId: projectId,
                status: 'TODO'
            },
            orderBy: {
                order: 'desc'
            }
        });

        // Se tiver tarefa, será a próxima, caso contrário, será a primeira (0).
        const newOrder = lastTask ? lastTask.order + 1 : 0;

        // Separa a data do restante dos dados.
        const { dueDate, ...taskData } = data;

        // Criação do registro.
        return this.prismaService.prismaClient.task.create({
            data: {
                // Dados do form.
                ...taskData,

                // Converte a data para o tipo Date caso ela exista.
                dueDate: dueDate ? new Date(dueDate) : null,

                // Outros campos.
                status: 'TODO',
                order: newOrder,
                project: {
                    connect: { id: projectId }
                }
            }
        });
    }
}

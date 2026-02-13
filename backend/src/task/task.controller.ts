import { Body, Controller, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Request, UseGuards } from '@nestjs/common';
import { TaskService } from './task.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('task')
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @UseGuards(AuthGuard)
    @Post(':id')
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createTaskDto: CreateTaskDto, 
        @Param('id', ParseIntPipe) id: number,) 
    {
        return this.taskService.create(createTaskDto, id);
    }
}

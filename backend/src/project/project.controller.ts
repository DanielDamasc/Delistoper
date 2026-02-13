import { Body, Controller, HttpCode, HttpStatus, Post, Request } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { ProjectService } from './project.service';

@Controller('project')
export class ProjectController {

    constructor(private readonly projectService: ProjectService) {}

    @Post('create')
    @HttpCode(HttpStatus.CREATED)
    async createProject(@Body() createProjectDto: CreateProjectDto, @Request() req) {
        return this.projectService.create(createProjectDto, req.user.id);
    }
}

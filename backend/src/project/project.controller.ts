import { Body, Controller, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { ProjectService } from './project.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('project')
export class ProjectController {

    constructor(private readonly projectService: ProjectService) {}

    @UseGuards(AuthGuard)
    @Post('create')
    @HttpCode(HttpStatus.CREATED)
    async createProject(@Body() createProjectDto: CreateProjectDto, @Request() req) {
        return this.projectService.create(createProjectDto, req.user.sub);
    }
}

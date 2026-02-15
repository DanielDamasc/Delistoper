import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Request, UseGuards } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { ProjectService } from './project.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('project')
export class ProjectController {

    constructor(private readonly projectService: ProjectService) {}

    @UseGuards(AuthGuard)
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createProjectDto: CreateProjectDto, @Request() req) {
        return this.projectService.create(createProjectDto, req.user.sub);
    }

    @UseGuards(AuthGuard)
    @Get()
    async findAll(@Request() req) {
        return this.projectService.findAll(req.user.sub);
    }

    @UseGuards(AuthGuard)
    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number, @Request() req) {
        return this.projectService.findOne(req.user.sub, id);
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return this.projectService.delete(id);
    }
}

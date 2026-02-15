import { IsDateString, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { TaskPriority } from "generated/prisma/enums";

export class CreateTaskDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsOptional()
    @IsString()
    description?: string

    @IsEnum(TaskPriority)
    priority: TaskPriority;

    @IsOptional()
    @IsDateString({}, { message: "A data deve estar no formato AAAA-MM-DD" })
    dueDate?: string;
}
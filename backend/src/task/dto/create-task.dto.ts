import { IsDateString, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";

export enum TaskPriority {
    LOW = 'LOW',
    MEDIUM = 'MEDIUM',
    HIGH = 'HIGH',
}

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
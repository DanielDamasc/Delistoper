import { IsEnum } from "class-validator";
import { TaskStatus } from "generated/prisma/enums";

export class MoveTaskDto {
    @IsEnum(TaskStatus)
    status: TaskStatus;
}
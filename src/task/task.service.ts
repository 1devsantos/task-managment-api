import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TaskService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createTaskDto: CreateTaskDto, userId: string) {
    const task = await this.prismaService.task.create({
      data: {
        title: createTaskDto.title,
        description: createTaskDto.description,
        userId,
      },
    });
    return task;
  }

  async findAll(userId: string) {
    return await this.prismaService.task.findMany({
      where: {
        userId,
      },
    });
  }

  async findOne(id: string, userId: string) {
    const task = await this.prismaService.task.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!task) {
      throw new NotFoundException('A tarefa não encontrada!');
    }

    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto, userId: string) {
    const taskUpdated = await this.prismaService.task.update({
      where: {
        id,
        userId,
      },
      data: {
        ...updateTaskDto,
      },
    });

    if (!taskUpdated) {
      throw new NotFoundException('A tarefa não foi encontrada!');
    }

    return taskUpdated;
  }

  async remove(id: string, userId: string) {
    try {
      await this.prismaService.task.delete({
        where: {
          id,
          userId,
        },
      });
    } catch {
      throw new NotFoundException('A tarefa não foi encontrada!');
    }
  }
}

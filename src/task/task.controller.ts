import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { IGetUserAuthInfoRequest } from 'src/types/get-user-in-request.type';

@UseGuards(AuthGuard)
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async create(
    @Request() request: IGetUserAuthInfoRequest,
    @Body() createTaskDto: CreateTaskDto,
  ) {
    const userId = request.user.sub;
    console.log(userId);

    return await this.taskService.create(createTaskDto, userId);
  }

  @Get()
  async findAll(@Request() request: IGetUserAuthInfoRequest) {
    const userId = request.user.sub;
    return await this.taskService.findAll(userId);
  }

  @Get(':id')
  async findOne(
    @Request() request: IGetUserAuthInfoRequest,
    @Param('id') id: string,
  ) {
    const userId = request.user.sub;
    return await this.taskService.findOne(id, userId);
  }

  @Patch(':id')
  async update(
    @Request() request: IGetUserAuthInfoRequest,
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    const userId = request.user.sub;
    return await this.taskService.update(id, updateTaskDto, userId);
  }

  @Delete(':id')
  async remove(
    @Request() request: IGetUserAuthInfoRequest,
    @Param('id') id: string,
  ) {
    const userId = request.user.sub;
    return await this.taskService.remove(id, userId);
  }
}

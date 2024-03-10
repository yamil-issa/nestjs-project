import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from './task.model';

@Injectable()
export class TaskService {
  constructor(@InjectModel('Task') private readonly taskModel: Model<Task>) {}

  async findAll(): Promise<Task[]> {
    return await this.taskModel.find().exec();
  }

  async findById(id: string): Promise<Task> {
    return await this.taskModel.findById(id).exec();
  }

  async create(task: Task): Promise<Task> {
    const newTask = new this.taskModel(task);
    return await newTask.save();
  }

  async update(id: string, task: Task): Promise<Task> {
    return await this.taskModel.findByIdAndUpdate(id, task, { new: true }).exec();
  }

  async delete(id: string): Promise<Task> {
    return await this.taskModel.findByIdAndDelete(id).exec();
  }
}

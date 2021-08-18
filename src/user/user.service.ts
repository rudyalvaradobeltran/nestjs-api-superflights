import { HttpStatus, Injectable } from '@nestjs/common';
import { UserInterface } from 'src/common/interfaces/user.interface';
import { UserDTO } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../common/models/models';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly model: Model<UserInterface>,
  ) {}

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  async create(userDto: UserDTO): Promise<UserInterface> {
    const hash = await this.hashPassword(userDto.password);
    const newUser = new this.model({ ...userDto, password: hash });
    return await newUser.save();
  }

  async findAll(): Promise<UserInterface[]> {
    return await this.model.find();
  }

  async findById(id: string): Promise<UserInterface> {
    return await this.model.findById(id);
  }

  async update(id: string, userDto: UserDTO): Promise<UserInterface> {
    const hash = await this.hashPassword(userDto.password);
    const user = { ...userDto, password: hash };
    return await this.model.findByIdAndUpdate(id, user, { new: true });
  }

  async delete(id: string) {
    await this.model.findByIdAndDelete(id);
    return { status: HttpStatus.OK, message: 'User deleted' };
  }
}

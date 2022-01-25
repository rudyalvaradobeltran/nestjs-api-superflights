import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PassengerInterface } from 'src/common/interfaces/passenger.interface';
import { Passenger } from 'src/common/models/models';
import { PassengerDTO } from './dto/passenger.dto';

@Injectable()
export class PassengerService {
  constructor(
    @InjectModel(Passenger.name)
    private readonly model: Model<PassengerInterface>,
  ) {}

  async create(passengerDTO: PassengerDTO): Promise<PassengerInterface> {
    const newPassenger = new this.model(passengerDTO);
    return await newPassenger.save();
  }

  async findAll(): Promise<PassengerInterface[]> {
    return await this.model.find();
  }

  async findOne(id: string): Promise<PassengerInterface> {
    return await this.model.findById(id);
  }

  async update(
    id: string,
    passengerDTO: PassengerDTO,
  ): Promise<PassengerInterface> {
    return await this.model.findByIdAndUpdate(id, passengerDTO, {
      new: true,
    });
  }

  async delete(id: string) {
    await this.model.findByIdAndDelete(id);
    return { status: HttpStatus.OK, message: 'Deleted' };
  }
}

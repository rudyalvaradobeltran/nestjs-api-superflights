import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FlightInterface } from 'src/common/interfaces/flight.interface';
import { Flight } from 'src/common/models/models';
import { FlightDTO } from './dto/flight.dto';

@Injectable()
export class FlightService {
  constructor(
    @InjectModel(Flight.name)
    private readonly model: Model<FlightInterface>,
  ) {}

  async create(flightDTO: FlightDTO): Promise<FlightInterface> {
    const newFlight = new this.model(flightDTO);
    return await newFlight.save();
  }

  async findAll(): Promise<FlightInterface[]> {
    return await this.model.find().populate('passengers');
  }

  async findOne(id: string): Promise<FlightInterface> {
    return await this.model.findById(id).populate('passengers');;
  }

  async update(id: string, flightDTO: FlightDTO): Promise<FlightInterface> {
    return await this.model.findByIdAndUpdate(id, flightDTO, { new: true });
  }

  async delete(id: string) {
    await this.model.findByIdAndDelete(id);
    return { status: HttpStatus.OK, message: 'Deleted' };
  }

  async addPassenger(flightId: string, passengerId: string): Promise<FlightInterface> {
    return await this.model.findByIdAndUpdate(flightId, {
      $addToSet: { passengers: passengerId},
    },
    { new: true }
    ).populate('passengers');
  }
}

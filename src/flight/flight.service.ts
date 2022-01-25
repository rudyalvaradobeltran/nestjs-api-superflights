import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FlightInterface } from 'src/common/interfaces/flight.interface';
import { Flight } from 'src/common/models/models';
import { FlightDTO } from './dto/flight.dto';
import axios from 'axios';
import * as moment from 'moment';
import { LocationInterface } from 'src/common/interfaces/location.interface';
import { WeatherInterface } from 'src/common/interfaces/wheater.location';

@Injectable()
export class FlightService {
  constructor(
    @InjectModel(Flight.name)
    private readonly model: Model<FlightInterface>,
  ) {}

  async getWeather(
    woeid: number,
    flightDate: Date,
  ): Promise<WeatherInterface[]> {
    const dateFormat = moment.utc(flightDate).format();
    const year = dateFormat.substring(0, 4);
    const month = dateFormat.substring(5, 7);
    const day = dateFormat.substring(8, 10);
    const { data } = await axios.get(
      `https://www.metaweather.com/api/location/${woeid}/${year}/${month}/${day}`,
    );
    return data;
  }

  assign({
    _id,
    pilot,
    airplane,
    destinationCity,
    flightDate,
    passengers,
  }: FlightInterface, weather: WeatherInterface[]): FlightInterface {
    return Object.assign({
      _id,
      pilot,
      airplane,
      destinationCity,
      flightDate,
      passengers
    })
  }

  async getLocation(destinationCity: string): Promise<LocationInterface> {
    const { data } = await axios.get(
      `https://www.metaweather.com/api/location/search/?query=${destinationCity}`,
    );
    return data[0];
  }

  async create(flightDTO: FlightDTO): Promise<FlightInterface> {
    const newFlight = new this.model(flightDTO);
    return await newFlight.save();
  }

  async findAll(): Promise<FlightInterface[]> {
    return await this.model.find().populate('passengers');
  }

  async findOne(id: string): Promise<FlightInterface> {
    const flight = await this.model.findById(id).populate('passengers');
    const location: LocationInterface = await this.getLocation(
      flight.destinationCity,
    );
    const weather: WeatherInterface[] = await this.getWeather(
      location.woeid,
      flight.flightDate,
    );
    return this.assign(flight, weather);
  }

  async update(id: string, flightDTO: FlightDTO): Promise<FlightInterface> {
    return await this.model.findByIdAndUpdate(id, flightDTO, { new: true });
  }

  async delete(id: string) {
    await this.model.findByIdAndDelete(id);
    return { status: HttpStatus.OK, message: 'Deleted' };
  }

  async addPassenger(
    flightId: string,
    passengerId: string,
  ): Promise<FlightInterface> {
    return await this.model
      .findByIdAndUpdate(
        flightId,
        {
          $addToSet: { passengers: passengerId },
        },
        { new: true },
      )
      .populate('passengers');
  }
}

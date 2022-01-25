import { PassengerInterface } from './passenger.interface';
import { WeatherInterface } from './wheater.location';

export interface FlightInterface extends Document {
  pilot: string;
  airplane: string;
  destinationCity: string;
  flightData: Date;
  passengers: PassengerInterface[];
  weather: WeatherInterface[];
}

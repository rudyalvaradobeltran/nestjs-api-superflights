import { PassengerInterface } from "./passenger.interface";

export interface FlightInterface extends Document {
    pilot: string;
    airplane: string;
    destinationCity: string;
    flightData: Date;
    passengers: PassengerInterface[];
}
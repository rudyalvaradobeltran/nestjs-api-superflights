import { Body, Controller, Post } from '@nestjs/common';
import { PassengerDTO } from './dto/passenger.dto';
import { PassengerService } from './passenger.service';

@Controller('api/v1/passenger')
export class PassengerController {
    constructor(private readonly passengerService:PassengerService){}

    @Post()
    create(@Body() passengerDTO:PassengerDTO) {
        return this.passengerService.create(passengerDTO);
    }
}

import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Put,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { PassengerService } from 'src/passenger/passenger.service';
import { FlightDTO } from './dto/flight.dto';
import { FlightService } from './flight.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('flights')
@Controller('flight')
export class FlightController {
  constructor(
    private readonly flightService: FlightService,
    private readonly passengerService: PassengerService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create flight' })
  create(@Body() flightDTO: FlightDTO) {
    return this.flightService.create(flightDTO);
  }

  @Get()
  @ApiOperation({ summary: 'Find all flights' })
  findAll() {
    return this.flightService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get flight by id' })
  findOne(@Param('id') id: string) {
    return this.flightService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update flight by id' })
  update(@Param('id') id: string, @Body() flightDTO: FlightDTO) {
    return this.flightService.update(id, flightDTO);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete flight by id' })
  delete(@Param('id') id: string) {
    return this.flightService.delete(id);
  }

  @Post(':flightId/passenger/:passengerId')
  @ApiOperation({ summary: 'Add passenger to flight' })
  async addPassenger(
    @Param('flightId') flightId: string,
    @Param('passengerId') passengerId: string,
  ) {
    const passenger = await this.passengerService.findOne(passengerId);
    if (!passenger) {
      throw new HttpException('Passenger not found', HttpStatus.NOT_FOUND);
    }
    return this.flightService.addPassenger(flightId, passengerId);
  }
}

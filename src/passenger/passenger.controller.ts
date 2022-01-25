import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { PassengerDTO } from './dto/passenger.dto';
import { PassengerService } from './passenger.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('passengers')
@Controller('api/v1/passenger')
export class PassengerController {
  constructor(private readonly passengerService: PassengerService) {}

  @Post()
  @ApiOperation({ summary: 'Create passenger' })
  create(@Body() passengerDTO: PassengerDTO) {
    return this.passengerService.create(passengerDTO);
  }

  @Get()
  @ApiOperation({ summary: 'Find all passengers' })
  findAll() {
    return this.passengerService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get passenger by id' })
  findOne(@Param('id') id: string) {
    return this.passengerService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update passenger by id' })
  update(@Param('id') id: string, @Body() passengerDTO: PassengerDTO) {
    return this.passengerService.update(id, passengerDTO);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete passenger by id' })
  delete(@Param('id') id: string) {
    return this.passengerService.delete(id);
  }
}

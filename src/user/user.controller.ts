import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { UserDTO } from './dto/user.dto';
import { UserService } from './user.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('users')
@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create user' })
  create(@Body() userDto: UserDTO) {
    return this.userService.create(userDto);
  }

  @Get()
  @ApiOperation({ summary: 'Find all users' })
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by id' })
  findById(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update user by id' })
  update(@Param('id') id: string, @Body() userDto: UserDTO) {
    return this.userService.update(id, userDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user by id' })
  delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}

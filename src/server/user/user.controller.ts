import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO, EditUserDTO } from './user.dto';
import { User } from './user.interface';

interface UserResponse<T = unknown> {
  code: number;
  data?: T;
  message: string;
}

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // GET /user/users
  @Get('users')
  async findAll(): Promise<UserResponse<User[]>> {
    return {
      code: 200,
      data: await this.userService.findAll(),
      message: 'Success',
    };
  }

  // GET /user/:id
  @Get(':id')
  async findOne(@Param('id') _id: string): Promise<UserResponse<User>> {
    return {
      code: 200,
      data: await this.userService.findOne(_id),
      message: 'Success',
    };
  }

  @Post()
  async addOne(@Body() body: CreateUserDTO): Promise<UserResponse<User>> {
    await this.userService.addOne(body);
    return {
      code: 200,
      message: 'Success',
    };
  }

  @Put(':id')
  async editOne(
    @Param('_id') _id: string,
    @Body() body: EditUserDTO,
  ): Promise<UserResponse<User>> {
    await this.userService.editOne(_id, body);
    return {
      code: 200,
      message: 'Success',
    };
  }

  // DELETE /user/:id
  @Delete(':id')
  async deleteOne(@Param('id') _id: string): Promise<UserResponse<User>> {
    await this.userService.deleteOne(_id);
    return {
      code: 200,
      message: 'Success',
    };
  }
}

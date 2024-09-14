import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { IsObjectIdPipe } from 'nestjs-object-id';
import { AuthGuard } from 'src/auth/guards/auth/auth.guard';
import { CreateUserRequest } from 'src/users/models/requests/create-user.request/create-user.request';
import { UpdateUserRequest } from 'src/users/models/requests/update-user.request/update-user.request';
import { UserResponse } from 'src/users/models/responses/user.response/user.response';
import { UserService } from 'src/users/services/user/user.service';

@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
  constructor(private userService: UserService) {}

  @Post()
  async createUser(@Body() createUserRequest: CreateUserRequest) {
    return await this.userService.createUser(createUserRequest);
  }

  @Get()
  async getAll(): Promise<UserResponse[]> {
    return await this.userService.getAllUsers();
  }

  @Get(':id')
  async getUserById(
    @Param('id', IsObjectIdPipe) id: string,
  ): Promise<UserResponse> {
    return await this.userService.getUserById(id);
  }

  @Put(':id')
  async updateUser(
    @Param('id', IsObjectIdPipe) id: string,
    @Body() updateUser: UpdateUserRequest,
  ) {
    return await this.userService.updateUser(id, updateUser);
  }

  @Delete(':id')
  async deleteUser(@Param('id', IsObjectIdPipe) id: string) {
    return await this.userService.deleteUser(id);
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { EmailInUseException } from 'src/users/exceptions/email-in-use-exception/email-in-use-exception';
import { CreateUserRequest } from 'src/users/models/requests/create-user.request/create-user.request';
import { UserRepository } from 'src/users/repositories/user.repository.ts/user.repository';
import * as bcrypt from 'bcrypt';
import { UserConstants } from 'src/users/constants/user.constants';
import { UserResponse } from 'src/users/models/responses/user.response/user.response';
import { UpdateUserRequest } from 'src/users/models/requests/update-user.request/update-user.request';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async createUser(
    createUserRequest: CreateUserRequest,
  ): Promise<{ id: string }> {
    // Check for duplicate mail
    const emailExist = await this.userRepository.existEmail(
      createUserRequest.email,
    );

    if (emailExist) {
      throw new EmailInUseException(createUserRequest.email);
    }

    // Hash password
    const password = await bcrypt.hash(
      createUserRequest.password,
      UserConstants.passwordSaltRounds,
    );

    createUserRequest.password = password;

    const result = await this.userRepository.create(createUserRequest);

    return {
      id: result.id,
    };
  }

  async getAllUsers(): Promise<UserResponse[]> {
    const users = await this.userRepository.findAll();

    return users.map((u) => UserResponse.fromEntity(u));
  }

  async getUserById(id: string): Promise<UserResponse> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new NotFoundException(`El usuario ${id} no existe`);
    }

    return UserResponse.fromEntity(user);
  }

  async updateUser(id: string, updateUser: UpdateUserRequest) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new NotFoundException(`El usuario ${id} no existe`);
    }

    // Update password if present
    if (updateUser.password && updateUser.password != '') {
      const password = await bcrypt.hash(
        updateUser.password,
        UserConstants.passwordSaltRounds,
      );

      updateUser.password = password;
    } else {
      // Delete property to prevent updating
      delete updateUser.password;
    }

    await this.userRepository.updateOne({ _id: user._id }, updateUser);
  }

  async deleteUser(id: string) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new NotFoundException(`El usuario ${id} no existe`);
    }

    await this.userRepository.remove({ _id: id });
  }

  async getCurrentUser(userId: string): Promise<UserResponse> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new NotFoundException(`El usuario ${userId} no existe`);
    }

    return UserResponse.fromEntity(user);
  }
}

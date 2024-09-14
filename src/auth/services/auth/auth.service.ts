import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { IncorrectLoginException } from 'src/auth/exceptions/incorrect-login-exception/incorrect-login-exception';
import { LoginRequest } from 'src/auth/models/requests/login.request/login.request';
import { generateNewConnetionLog } from 'src/users/models/entities/connection-log/connection-log.entity';
import { ConnectionLogRepository } from 'src/users/repositories/connection-log.repository/connection-log.repository';
import { UserRepository } from 'src/users/repositories/user.repository.ts/user.repository';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private connectionRepository: ConnectionLogRepository,
    private jwtService: JwtService,
  ) {}

  async loginUser(loginRequest: LoginRequest) {
    const users = await this.userRepository.find(
      { email: loginRequest.email },
      { limit: 1 },
    );

    if (!users || users.length == 0) {
      throw new IncorrectLoginException();
    }

    const user = users[0];

    // Check user active
    if (!user.active) {
      throw new BadRequestException('El usuario está inactivo');
    }

    // Check password
    const isPasswordCorrect = await bcrypt.compare(
      loginRequest.password,
      user.password,
    );

    if (!isPasswordCorrect) {
      throw new IncorrectLoginException();
    }

    // Save login to database
    this.connectionRepository.create(generateNewConnetionLog(user, 'login'));

    // Generate JWT token
    const payload = { sub: user._id, email: user.email, name: user.name };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async logoutUser(userId: string) {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new NotFoundException(`El usuario ${userId} no existe`);
    }

    // Save logout to database
    this.connectionRepository.create(generateNewConnetionLog(user, 'logout'));
  }
}

import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth/auth.controller';
import { AuthService } from './services/auth/auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { UserRepository } from 'src/users/repositories/user.repository.ts/user.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/models/entities/user/user.entity';
import { ConnectionLogRepository } from 'src/users/repositories/connection-log.repository/connection-log.repository';
import {
  ConnectionLog,
  ConnectionLogSchema,
} from 'src/users/models/entities/connection-log/connection-log.entity';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1day' },
    }),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: ConnectionLog.name, schema: ConnectionLogSchema },
    ]),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, UserRepository, ConnectionLogRepository],
})
export class AuthModule {}

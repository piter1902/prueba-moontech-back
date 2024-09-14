import { Module } from '@nestjs/common';
import { UsersController } from './controllers/user/users.controller';
import { UserService } from './services/user/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './models/entities/user/user.entity';
import { UserRepository } from './repositories/user.repository.ts/user.repository';
import { ConnectionLogRepository } from './repositories/connection-log.repository/connection-log.repository';
import {
  ConnectionLog,
  ConnectionLogSchema,
} from './models/entities/connection-log/connection-log.entity';
import { ConnectionsController } from './controllers/connections/connections.controller';
import { ConnectionLogService } from './services/connection/connection-log.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: ConnectionLog.name, schema: ConnectionLogSchema },
    ]),
  ],
  controllers: [UsersController, ConnectionsController],
  providers: [UserService, UserRepository, ConnectionLogRepository, ConnectionLogService],
})
export class UsersModule {}

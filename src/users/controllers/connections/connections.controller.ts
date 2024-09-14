import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guards/auth/auth.guard';
import { ConnectionLogResponse } from 'src/users/models/responses/connection-log.response/connection-log.response';
import { ConnectionLogService } from 'src/users/services/connection/connection-log.service';

@UseGuards(AuthGuard)
@Controller('connections')
export class ConnectionsController {
  constructor(private connectionLogService: ConnectionLogService) {}

  @Get()
  async getAllConnections(): Promise<ConnectionLogResponse[]> {
    return await this.connectionLogService.getAllConnections();
  }
}

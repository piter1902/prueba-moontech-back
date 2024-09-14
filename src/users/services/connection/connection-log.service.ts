import { Injectable } from '@nestjs/common';
import { ConnectionLogResponse } from 'src/users/models/responses/connection-log.response/connection-log.response';
import { ConnectionLogRepository } from 'src/users/repositories/connection-log.repository/connection-log.repository';

@Injectable()
export class ConnectionLogService {
  constructor(private connectionLogRepository: ConnectionLogRepository) {}

  async getAllConnections(): Promise<ConnectionLogResponse[]> {
    const conn = await this.connectionLogRepository.findAll();

    return conn.map((c) => ConnectionLogResponse.fromEntity(c));
  }
}

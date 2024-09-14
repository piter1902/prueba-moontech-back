import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseRepository } from 'src/common/repositories/base.repository/base.repository';
import {
  ConnectionLog,
  ConnectionLogDocument,
} from 'src/users/models/entities/connection-log/connection-log.entity';

@Injectable()
export class ConnectionLogRepository extends BaseRepository<ConnectionLogDocument> {
  constructor(
    @InjectModel(ConnectionLog.name)
    private connectionModel: Model<ConnectionLogDocument>,
  ) {
    super(connectionModel);
  }

  override async findAll(): Promise<ConnectionLogDocument[]> {
    return await this.connectionModel.find().populate('user').exec();
  }
}

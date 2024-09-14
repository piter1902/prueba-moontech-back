import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseRepository } from 'src/common/repositories/base.repository/base.repository';
import { User, UserDocument } from 'src/users/models/entities/user/user.entity';

@Injectable()
export class UserRepository extends BaseRepository<UserDocument> {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
    super(userModel);
  }

  async existEmail(email: string): Promise<boolean> {
    const exists = await this.userModel.exists({ email: email }).exec();

    return exists != null;
  }
}

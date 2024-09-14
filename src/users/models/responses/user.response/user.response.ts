import { UserDocument } from '../../entities/user/user.entity';

export class UserResponse {
  id: string;
  name: string;
  email: string;
  active: boolean;

  static fromEntity(user: UserDocument): UserResponse {
    const ret = new UserResponse();

    ret.id = user._id.toString();
    ret.name = user.name;
    ret.email = user.email;
    ret.active = user.active;

    return ret;
  }
}

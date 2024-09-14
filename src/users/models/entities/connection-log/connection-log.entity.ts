import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from '../user/user.entity';

export type ConnectionLogDocument = HydratedDocument<ConnectionLog>;

@Schema({
  autoCreate: true,
})
export class ConnectionLog {
  @Prop({ required: true, default: Date.now() })
  date: Date;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ required: true })
  isLogin: boolean;
}

export const ConnectionLogSchema = SchemaFactory.createForClass(ConnectionLog);

export const generateNewConnetionLog = (
  user: User,
  action: 'login' | 'logout',
) => {
  const conn = new ConnectionLog();

  conn.user = user;
  conn.isLogin = action == 'login';

  return conn;
};

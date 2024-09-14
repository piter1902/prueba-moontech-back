import { ConnectionLog } from '../../entities/connection-log/connection-log.entity';

export class ConnectionLogResponse {
  date: Date;
  user: { name: string; email: string };
  isLogin: boolean;

  static fromEntity(connection: ConnectionLog) {
    const conn = new ConnectionLogResponse();

    conn.date = connection.date;
    conn.user = {
      name: connection.user.name,
      email: connection.user.email,
    };
    conn.isLogin = connection.isLogin;

    return conn;
  }
}

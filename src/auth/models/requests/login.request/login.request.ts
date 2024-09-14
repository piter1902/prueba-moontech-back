import { IsBase64, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginRequest {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsBase64()
  password: string;
}

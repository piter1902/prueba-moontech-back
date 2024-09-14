import {
  IsBase64,
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsString,
  ValidateIf,
} from 'class-validator';

export class UpdateUserRequest {
  @IsString()
  @IsNotEmpty()
  name: string;

  @ValidateIf((o) => o.password)
  @IsString()
  @IsBase64()
  password?: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsBoolean()
  @IsNotEmpty()
  active: boolean;
}

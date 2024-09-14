import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/guards/auth/auth.guard';
import { LoginRequest } from 'src/auth/models/requests/login.request/login.request';
import { AuthService } from 'src/auth/services/auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async loginUser(@Body() loginRequest: LoginRequest) {
    const token = await this.authService.loginUser(loginRequest);

    return token;
  }

  @UseGuards(AuthGuard)
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logoutUser(@Req() req) {
    // Retrieve current user id
    const userId = req.user.sub;

    await this.authService.logoutUser(userId);
  }
}

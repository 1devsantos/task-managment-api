import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dtos/register-user.dto';
import { LoginUserDto } from './dtos/login-user-dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signUp')
  async signUp(@Body() userDto: RegisterUserDto): Promise<void> {
    await this.authService.register(userDto);
  }

  @Post('signIn')
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() userDto: LoginUserDto) {
    return await this.authService.login(userDto);
  }
}

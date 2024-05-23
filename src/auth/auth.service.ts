import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterUserDto } from './dtos/register-user.dto';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dtos/login-user-dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private jwtExpirationTimeInSeconds: number;

  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.jwtExpirationTimeInSeconds = +configService.get<number>(
      'JWT_EXPIRATION_TIME',
    );
  }

  async register(userDto: RegisterUserDto) {
    const userExists = await this.prismaService.user.findFirst({
      where: {
        email: userDto.email,
      },
    });

    if (userExists) {
      throw new ConflictException('Email já cadastrado!');
    }
    const encryptedPassword = await bcrypt.hash(userDto.password, 10);

    await this.prismaService.user.create({
      data: {
        fullName: userDto.fullName,
        email: userDto.email,
        password: encryptedPassword,
      },
    });
  }

  async login(userDto: LoginUserDto) {
    const user = await this.prismaService.user
      .findUniqueOrThrow({
        where: {
          email: userDto.email,
        },
      })
      .catch(() => {
        throw new UnauthorizedException('Acesso não autorizado!');
      });

    if (!(await bcrypt.compare(userDto.password, user.password))) {
      throw new UnauthorizedException('Acesso não autorizado!');
    }

    const payload = {
      sub: user.id,
      username: user.email,
    };

    const token = this.jwtService.sign(payload);

    return {
      token,
      expiresIn: this.jwtExpirationTimeInSeconds,
    };
  }
}

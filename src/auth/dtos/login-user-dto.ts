import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  @IsEmail({}, { message: 'O email não é válido!' })
  email: string;

  @IsNotEmpty({ message: 'A senha não pode estar vázia!' })
  password: string;
}

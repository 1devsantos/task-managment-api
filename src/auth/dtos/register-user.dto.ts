import { IsEmail, IsNotEmpty } from 'class-validator';

export class RegisterUserDto {
  @IsNotEmpty({ message: 'O nome não pode estar vázio!' })
  fullName: string;
  @IsEmail({}, { message: 'O email não está válido!' })
  email: string;
  @IsNotEmpty({ message: 'A senha não pode estar vázia!' })
  password: string;
}

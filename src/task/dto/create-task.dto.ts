import { IsNotEmpty } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty({ message: 'O título é obrigátorio!' })
  title: string;
  description?: string;
}

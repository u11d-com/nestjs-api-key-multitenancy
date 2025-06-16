import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class NameDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(127)
  name: string;
}

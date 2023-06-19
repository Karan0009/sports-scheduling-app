import { IsString, IsNotEmpty, IsInt } from 'class-validator';

export class GenerateTokenDto {
  @IsNotEmpty()
  payload: any;

  @IsNotEmpty()
  @IsString()
  expiresIn: string;
}

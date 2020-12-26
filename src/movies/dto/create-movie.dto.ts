import { IsString, IsNumber } from 'class-validator';

// DTO: Data Transfer Object
export class CreateMovieDto {

  @IsString()
  readonly title: string;

  @IsString()
  readonly author: string;

  @IsNumber()
  readonly year: number;

  @IsNumber()
  readonly rating: number;

  @IsString({ each: true })
  readonly genre: string[];
}

import { IsString, IsNumber, IsOptional } from 'class-validator';

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

  @IsOptional()
  @IsString({ each: true })
  readonly genre: string[];

}

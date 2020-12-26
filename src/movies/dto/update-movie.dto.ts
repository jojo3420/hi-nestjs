import { IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdateMovieDto {

  @IsString()
  title?: string;

  @IsString()
  author?: string;

  @IsNumber()
  year?: number;

  @IsNumber()
  rating?: number;

  @IsOptional()
  @IsString({ each: true })
  genre?: string[];

}

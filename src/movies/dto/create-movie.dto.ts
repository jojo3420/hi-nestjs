import { IsString, IsNumber } from 'class-validator';


export class CreateMovieDto {

  @IsString()
  title: string;

  @IsString()
  author: string;

  @IsString()
  year: string;

  @IsNumber()
  rating: number;

  @IsString({ each: true })
  genre: string[];
}

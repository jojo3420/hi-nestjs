import { IsString, IsNumber } from 'class-validator';


export class createMovieDto {

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

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

  constructor(title: string, author: string, year: number, rating: number, genre: string[]) {
    this.title = title
    this.author = author
    this.year = year;
    this.rating = rating
    if (Array.isArray(genre)) {
      this.genre = genre;
      return;
    }
    this.genre = [];
  }

}

import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [
    new Movie(1, '해리포터1', '조앤아줌마'),
    new Movie(2, '반지의 제왕', '드래곤', 4, 2010, ['SF', '모험']),

  ];

  getAll(): Movie[] {
    return this.movies;
  }

  getOne(id: number): Movie {
    const movie = this.movies.find(movie => movie.id === id);
    if (!movie) throw new NotFoundException(`movie can\'t find this ${id}`);

    return movie;
  }

  search(id?: number, title?: string): Movie [] {
    if (id > 0) {
      return this.movies.filter(movie => movie.id === id);
    }
    return this.movies.filter(movie => movie.title === title);
  }

  createMovie(movieDto: CreateMovieDto): object {
    const id = this.movies.length + 1;
    const { title, author, rating, year, genre } = movieDto;
    const movie = new Movie(id, title, author, rating, year, genre);
    this.movies.push(movie);
    return {
      movie,
      created: true,
    };
  }

  removeMovie(id: number): number {
    const index = this.movies.findIndex(movie => movie.id === id);
    if (index >= 0) {
      this.movies.splice(index, 1);
      return 1;
    }

    return 0;
  }

  modifyMovie(id: number, movieDto: CreateMovieDto): Movie {
    const index = this.movies.findIndex(m => m.id === id);
    if (index >= 0) {
      this.movies[index] = { ...this.movies[index], ...movieDto };
      return this.movies[index];
    }

    return null;
  }

}

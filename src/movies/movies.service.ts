import { Injectable } from '@nestjs/common';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [
    new Movie(1, '해리포터1', '조앤아줌마'),
    new Movie(2, '반지의 제왕', '드래곤', 4, '2010', 'SF'),

  ]

  getAll(): Movie[] {
    return this.movies
  }
  getOne(id: number): Movie {
    return this.movies.find(movie => movie.id === id)
  }
  search(id?: number, title?: string): Movie []{
    if (id > 0) {
      return this.movies.filter(movie => movie.id === id)
    }
    return this.movies.filter(movie => movie.title === title)
  }

  createMovie(movieData: Movie): object {
    const id: number = this.movies.length + 1;
    this.movies.push({id, ...movieData})
    return {
     id,
      ...movieData,
      created: true
    }
  }

  removeMovie(id: number): number {
    const index = this.movies.findIndex(movie => movie.id === id)
    if (index >= 0) {
      this.movies.splice(index, 1)
      return 1
    }

    return 0
  }

  modifyMovie(movie: Movie): Movie {
    console.log({ movie });
    const index = this.movies.findIndex(m => m.id === movie.id)
    if (index >= 0) {
      this.movies[index] = { ...this.movies[index], ...movie }
      return this.movies[index]
    }

    return null
  }

}

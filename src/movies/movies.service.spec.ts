import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { NotFoundException } from '@nestjs/common';

describe('MoviesService', () => {
  let service: MoviesService;


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });
  // nestjs 에서 제공하는 테스트 hook 들도 있으니 추후에 참조.
  // afterAll()
  // afterEach()
  // beforeAll()


  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Create', () => {
    it('Before Create', () => {
      const allMovies: Movie[] = service.getAll();
      expect(allMovies.length).toBe(2);
    });

    it('Create Movie', () => {
      const allMovies: Movie[] = service.getAll();
      const newMovie: CreateMovieDto = { title: '끝까지 간다', author: '김감독', rating: 5, year: 2012, genre: ['Action'] };
      const result = service.createMovie(newMovie);
      // @ts-ignore
      const { movie, created } = result;
      expect(movie).toBeDefined();
      expect(created).toBe(true);
      expect(allMovies.length).toBe(3);
    });
  });


  describe('Read', () => {
    it('Read All', () => {
      const movies: Movie[] = service.getAll();
      expect(movies).toBeInstanceOf(Array);
    });

    it('Read Movie by ID', () => {
      const movie: Movie = service.getOne(1);
      expect(movie).toBeDefined();
      expect(movie).toBeInstanceOf(Movie);
      expect(movie.title).toEqual('해리포터1');
    });

    it('throw 404 exception', () => {
      try {
        service.getOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('Update', () => {
    it('Update Movie by ID', () => {
      const movie: UpdateMovieDto = {title: 'Harry porter', author: '조앨_줌마', year: 1800 }
      service.modifyMovie(1, movie);
      const target: Movie = service.getOne(1);
      expect(target.title).toEqual(movie.title);
      expect(target.author).toEqual(movie.author);
      expect(target.year).toEqual(movie.year);
    });

    it('throw Notfound Exception', () => {
      try {
        service.modifyMovie(9999, new UpdateMovieDto());
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });

  });

  describe('Delete', () => {
    it('Delete Movie By ID', () => {
      const allMovies: Movie[] = service.getAll();
      expect(allMovies.length).toBe(2);
      const cnt: number = service.removeMovie(1);
      expect(cnt).toBe(1);
      expect(allMovies.length).toBe(1);
    });

    it('Throw Notfound Exception', () => {
      try {
        service.removeMovie(9999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });


  });


});

import { Controller, Delete, Get, Param, Post, Patch, Query, Body } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';

@Controller('movies')
export class MoviesController {
  constructor(private readonly service: MoviesService) {
  }

  @Get()
  getAll(): Movie [] {
    return this.service.getAll();
  }
  @Get('/search')
  search(@Query('id') id?: string, @Query('title') title?: string) {
    return this.service.search(parseInt(id, 10), title);
  }

  @Get('/:id')
  getOne(@Param('id') id: string): Movie {
    return this.service.getOne(parseInt(id, 10))
  }

  @Post()
  createMovie(@Body() movieData: Movie): object {
    return this.service.createMovie(movieData)
  }

  @Delete('/:id')
  removeMovie(@Param('id') id: string): object {
    const count: number = this.service.removeMovie(parseInt(id, 10));
    return {
      count,
      removed: count >= 1 ? true : false,
    }
  }

  @Patch()
  modifyMovie(@Body() movieData): Movie {
    return this.service.modifyMovie(movieData)
  }

}

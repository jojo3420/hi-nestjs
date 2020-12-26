import { Controller, Delete, Get, Param, Post, Patch, Query, Body } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly service: MoviesService) {
  }

  @Get()
  getAll(): Movie [] {
    return this.service.getAll();
  }
  @Get('/search')
  search(@Query('id') id?: number, @Query('title') title?: string) {
    return this.service.search(id, title);
  }

  @Get('/:id')
  getOne(@Param('id') id: number): Movie {
    return this.service.getOne(id)
  }

  @Post()
  createMovie(@Body() movieDto: CreateMovieDto): object {
    return this.service.createMovie(movieDto)
  }

  @Delete('/:id')
  removeMovie(@Param('id') id: number): object {
    const count: number = this.service.removeMovie(id);
    return {
      count,
      removed: count >= 1 ? true : false,
    }
  }

  @Patch("/:id")
  modifyMovie(@Param('id') id: number, @Body() movieDto: UpdateMovieDto): Movie {
    return this.service.modifyMovie(id, movieDto)
  }

}

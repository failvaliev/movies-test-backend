import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './movie.schema';
import { RateMovieDto } from './dto/rate-movie-dto';
import { JwtAuthGuard } from '../auth/jwt-auth-guard';

@ApiTags('movies')
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) { }

  @ApiOperation({ summary: 'Создание фильма' })
  @ApiResponse({ status: 200, type: Movie })
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.moviesService.create(createMovieDto);
  }

  @ApiOperation({ summary: 'Получить все фильмы' })
  @ApiResponse({ status: 200, type: [Movie] })
  @ApiQuery({ name: 'rating', required: false, example: 'ASC | DESC' })
  @Get()
  findAll(@Query('rating') rating: string) {
    return this.moviesService.findAll(rating);
  }

  @ApiOperation({ summary: 'Получить один фильм' })
  @ApiParam({ required: true, name: 'id' })
  @ApiResponse({ status: 200, type: Movie })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.moviesService.findOne(id);
  }

  @ApiOperation({ summary: 'Обновить один фильм' })
  @ApiParam({ required: true, name: 'id' })
  @ApiResponse({ status: 200, type: Movie })
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
    return this.moviesService.update(id, updateMovieDto);
  }

  @ApiOperation({ summary: 'Удалить один фильм' })
  @ApiParam({ required: true, name: 'id' })
  @ApiResponse({ status: 200, type: Boolean })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.moviesService.remove(id);
  }

  @ApiOperation({ summary: 'Указать рейтинг фильму' })
  @ApiParam({ required: true, name: 'id' })
  @ApiResponse({ status: 200, type: Movie })
  @UseGuards(JwtAuthGuard)
  @Post(':id/rate')
  rate(@Param('id') id: string, @Body() rateDto: RateMovieDto) {
    return this.moviesService.rate(id, rateDto);
  }
}

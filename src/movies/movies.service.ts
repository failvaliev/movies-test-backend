import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie, MovieDocument } from './movie.schema';
import { RateMovieDto } from './dto/rate-movie-dto';

@Injectable()
export class MoviesService {
  constructor(@InjectModel(Movie.name) private model: Model<MovieDocument>) { }

  async create(createMovieDto: CreateMovieDto): Promise<MovieDocument> {
    const newItem = new this.model(createMovieDto);
    return newItem.save();
  }

  async findAll(rating?: string): Promise<MovieDocument[]> {
    if (!rating) {
      return this.model.find();
    }

    const sortRating = rating.toUpperCase() === 'ASC' ? -1 : 1;

    return this.model.find().sort({
      rating: sortRating
    });
  }

  async findOne(id: string): Promise<MovieDocument> {
    if (!isValidObjectId(id)) {
      throw new HttpException('Не валидный id', HttpStatus.BAD_REQUEST);
    }

    const candidate = await this.model.findById(id);

    if (!candidate) {
      throw new NotFoundException('Фильма не существует');
    }

    return candidate;
  }

  async update(id: string, updateMovieDto: UpdateMovieDto): Promise<MovieDocument> {
    if (!isValidObjectId(id)) {
      throw new HttpException('Не валидный id', HttpStatus.BAD_REQUEST);
    }

    const candidate = await this.model.findById(id);

    if (!candidate) {
      throw new NotFoundException('Фильма не существует');
    }

    await candidate.updateOne({ $set: updateMovieDto });

    return this.findOne(id);
  }

  async remove(id: string): Promise<boolean> {
    if (!isValidObjectId(id)) {
      throw new HttpException('Не валидный id', HttpStatus.BAD_REQUEST);
    }

    const candidate = await this.model.findById(id);

    if (!candidate) {
      throw new NotFoundException('Фильма не существует');
    }

    const result = await this.model.deleteOne({ _id: id });
    return result.deletedCount === 1;
  }

  async rate(id: string, rateMovieDto: RateMovieDto): Promise<MovieDocument> {
    if (!isValidObjectId(id)) {
      throw new HttpException('Не валидный id', HttpStatus.BAD_REQUEST);
    }

    const candidate = await this.model.findById(id);

    if (!candidate) {
      throw new NotFoundException('Фильма не существует');
    }

    await candidate.updateOne({ $set: rateMovieDto });

    return this.findOne(id);
  }
}

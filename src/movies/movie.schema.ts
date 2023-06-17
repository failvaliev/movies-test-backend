import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IMovieWithoutId } from './types/movie';

export type MovieDocument = HydratedDocument<Movie> & IMovieWithoutId;

@Schema({ timestamps: true })
export class Movie {
  @ApiProperty({ example: 'Криминальное чтиво', description: 'Название' })
  @Prop({ required: true })
  title: string;

  @ApiProperty({
    example: 'Несколько связанных историй из жизни бандитов. Шедевр Квентина Тарантино, который изменил мировое кино',
    description: 'Описание',
  })
  @Prop({ default: '' })
  description: string;

  @ApiProperty({ example: 8.6, description: 'Рейтинг' })
  @Prop({ default: 0 })
  rating: number;

  @ApiProperty({
    example: ['https://avatars.mds.yandex.net/get-kinopoisk-image/6201401/97ed7256-db80-4532-ab6b-6688d2eab4b2/1920x'],
    description: 'Фотографий список',
  })
  @Prop({ type: [String], default: [] })
  photos: string[];

  @ApiProperty({ example: 'Квентин Тарантино', description: 'Режиссер' })
  @Prop({ default: '' })
  director: string;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);

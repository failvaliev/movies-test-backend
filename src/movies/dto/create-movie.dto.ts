import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsArray } from 'class-validator';
import { IMovieWithoutId } from "../types/movie";

export class CreateMovieDto implements IMovieWithoutId {
  @ApiProperty({ example: 'Криминальное чтиво', description: 'Название' })
  @IsNotEmpty({ message: 'Должен быть заполнен: title' })
  @IsString({ message: 'Должен быть строкой: title' })
  title: string;

  @ApiProperty({
    example: 'Несколько связанных историй из жизни бандитов. Шедевр Квентина Тарантино, который изменил мировое кино',
    description: 'Описание',
  })
  @IsString({ message: 'Должен быть строкой: description' })
  description: string;

  @ApiProperty({ example: 8.6, description: 'Рейтинг' })
  @IsNumber()
  rating: number;

  @ApiProperty({
    example: ['https://avatars.mds.yandex.net/get-kinopoisk-image/6201401/97ed7256-db80-4532-ab6b-6688d2eab4b2/1920x'],
    description: 'Фотографий список',
  })
  @IsArray({ message: 'Должен быть массивом строк: photos' })
  photos: string[];

  @ApiProperty({ example: 'Квентин Тарантино', description: 'Режиссер' })
  @IsString({ message: 'Должен быть строкой: director' })
  director: string;
}

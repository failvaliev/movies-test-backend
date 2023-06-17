import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Min, Max } from 'class-validator';

export class RateMovieDto {
  @ApiProperty({ example: 8.6, description: 'Рейтинг' })
  @IsNumber()
  @Min(0)
  @Max(10)
  rating: number;
}
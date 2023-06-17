import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { Movie, MovieSchema } from './movie.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [MoviesController],
  imports: [
    MongooseModule.forFeature([
      {
        name: Movie.name,
        schema: MovieSchema,
      },
    ]),
    forwardRef(() => AuthModule),
  ],
  providers: [MoviesService]
})
export class MoviesModule { }

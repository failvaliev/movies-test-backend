
export interface IMovie {
  _id: string;
  title: string;
  description: string;
  rating: number;
  photos: string[];
  director: string;
}

export type IMovieWithoutId = Omit<IMovie, '_id'>;
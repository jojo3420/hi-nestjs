export class Movie {
  public id: number;
  public title: string;
  public author: string;
  public rating: number;
  public year: string;
  public genre: string [] = [];


  constructor(id: number,
              title: string,
              author: string,
              rating?: number,
              year?: string,
              genre?: string) {
    this.id = id
    this.title = title
    this.author = author
    this.rating = rating
    this.year = year
    genre && this.genre.push(genre)
  }

}




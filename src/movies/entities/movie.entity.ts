export class Movie {
  public id: number;
  public title: string;
  public author: string;
  public rating: number;
  public year: number;
  public genre: string [];


  constructor(id: number,
              title: string,
              author: string,
              rating?: number,
              year?: number,
              genre?: string[]) {
    this.id = id
    this.title = title
    this.author = author
    this.rating = rating
    this.year = year
    if (Array.isArray(genre)) {
    this.genre = genre
    }  else {
      this.genre = []
    }
  }

}




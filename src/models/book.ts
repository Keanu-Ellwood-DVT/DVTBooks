import { Tag } from './tag';
import { AuthorMin } from './author';

export class Book {
  isbN10: string;
  isbN13: string;
  title: string;
  about: string;
  abstract: string;
  author: AuthorMin;
  publisher: string;
  datePublished: string;
  image: string;
  tags: Tag[];
  version: string;
}


export class BookMin {
  href: string;
  id: string;
  isbN10: string;
  isbN13: string;
  title: string
}

import { Tag } from './tag';
import { AuthorRef } from './author';

export class Book {
  isbN10: string | null;
  isbN13: string;
  title: string;
  about: string | null;
  abstract: string | null;
  author: AuthorRef;
  publisher: string;
  date_published: string;
  image: string | null;
  tags: Tag[];
  version: string | null;
}

export class BookRef {
  href: string;
  id: string;
  isbN10: string;
  isbN13: string;
  title: string;
}

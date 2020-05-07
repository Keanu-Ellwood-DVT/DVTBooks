import { Tag } from './tag';
import { AuthorRef } from './author';

export class Book {
  isbn10?: string;
  isbn13: string;
  title: string;
  about?: string;
  abstract?: string;
  author: AuthorRef;
  publisher: string;
  date_published: string;
  image?: string;
  tags: Tag[];
  version?: string;
}

export class BookRef {
  href: string;
  id: string;
  isbn10: string;
  isbn13: string;
  title: string;
}

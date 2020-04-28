import { BookMin } from './book';

export class Author {
  href: string;
  id: string;
  firstName: string;
  middleNames: string;
  lastName: string;
  name: string;
  about: string;
  version: string;
  books: BookMin[];
}


export class AuthorMin {
  href: string;
  id: string;
  name: string;
}

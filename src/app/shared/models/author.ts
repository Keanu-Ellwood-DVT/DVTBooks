import { BookRef } from './book';

export class Author {
  href?: string;
  id?: string;
  first_name: string;
  middle_names?: string;
  last_name: string;
  name?: string;
  about?: string;
  version?: string;
  books?: BookRef[];
}


export class AuthorRef {
  href: string;
  id: string;
  name: string;
}

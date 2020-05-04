import { Component, OnInit } from '@angular/core';
import { AuthorService } from 'src/app/services/author.service';
import { Author } from 'src/models/author';

@Component({
  selector: 'app-new-author',
  templateUrl: './new-author.component.html',
  styleUrls: ['./new-author.component.css']
})
export class NewAuthorComponent implements OnInit {

  newAuthor: Author = {
  href: null,
  id: null,
  first_name: '',
  middle_names: null,
  last_name: '',
  name: null,
  about: '',
  version: null,
  books: null
};

  constructor(
    private authorService: AuthorService,
  ) {}

  ngOnInit(): void {

    this.newAuthor.href = null;
    this.newAuthor.id = null;
    this.newAuthor.name = null;
    this.newAuthor.version = null;
    this.newAuthor.books = null;

  }

  addAuthor(){
    this.authorService.putAuthor(this.newAuthor);
    this.newAuthor.first_name = '';
    this.newAuthor.middle_names = null;
    this.newAuthor.last_name = '';
    this.newAuthor.about = '';
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { AuthorService } from 'src/app/services/author.service';
import { Author } from 'src/models/author';

@Component({
  selector: 'app-new-author',
  templateUrl: './new-author.component.html',
  styleUrls: ['./new-author.component.css']
})
export class NewAuthorComponent implements OnInit {

  @Input()
  state: string;

  @Input()
  currentAuth?: Author;

  newAuthor: Author;

  constructor(
    private authorService: AuthorService,
  ) {}

  ngOnInit(): void {

if (this.state === 'Update' && this.currentAuth) {
      this.authorService.getAuthor(this.currentAuth.id).subscribe(x => {
        this.newAuthor = x;
      });
    } else {
      this.newAuthor  = {
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
    }
  }

  addAuthor() {
    if (this.state !== 'Update'){
      this.authorService.putAuthor(this.newAuthor);
      this.newAuthor.first_name = '';
      this.newAuthor.middle_names = null;
      this.newAuthor.last_name = '';
      this.newAuthor.about = '';
    }else {
      this.authorService.putAuthor(this.newAuthor, this.newAuthor.id);
    }

  }

}

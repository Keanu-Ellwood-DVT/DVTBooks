import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Author } from 'src/app/shared/models/author';
import { BookRef } from 'src/app/shared/models/book';
import { AuthService } from '../../../shared/services/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthorService } from '../../../shared/services/author.service';

@Component({
  selector: 'app-author-info',
  templateUrl: './author-info.component.html',
  styleUrls: ['./author-info.component.css']
})
export class AuthorInfoComponent implements OnInit {
  pageLoading$ = new BehaviorSubject<boolean>(true);
  id: string;
  author: Author;
  authBooks: BookRef[];
  state = 'Update';
  message: boolean;

  closeModal($event) {
    const close = document.getElementById('closeModalBtn') as HTMLElement;
    setTimeout( () =>  close.click() , 5000 );
  }

  constructor(
    private authorService: AuthorService,
    public auth: AuthService,
    private route: ActivatedRoute,
    private modalService: NgbModal
  ) {
    this.route.params.subscribe(params => this.id = params.id);
  }

  ngOnInit(): void {
    this.authorService.getAuthor(this.id).subscribe(x => {
      this.author = x,
        this.authBooks = this.author.books,
        this.pageLoading$.next(false);
    });
  }

  openModal(content) {
    this.modalService.open(content, { backdropClass: 'light-blue-backdrop', centered: true });
  }

}

import { catchError } from 'rxjs/operators';
import { Component, OnInit, Input, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { AuthorService } from 'src/app/shared/services/author.service';
import { Author } from 'src/app/shared/models/author';
import { FormGroup, FormControl, AbstractControl, Validators } from '@angular/forms';
import { throwError } from 'rxjs';

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

  @Output() modalEvent ? = new EventEmitter<null>();

  form: FormGroup;
  newAuthor: Author = {} as Author;
  staticAlertClosed = true;
  toastMessage = '';
  error = false;

  constructor(
    private authorService: AuthorService,
    private cd: ChangeDetectorRef
  ) {
    this.form = new FormGroup({
      firstName: new FormControl('', { validators: [Validators.required] }),
      middleName: new FormControl(''),
      lastName: new FormControl('', { validators: [Validators.required] }),
      about: new FormControl(''),
    });
  }

  get firstName(): AbstractControl { return this.form.get('firstName'); }
  get middleName(): AbstractControl { return this.form.get('middleName'); }
  get lastName(): AbstractControl { return this.form.get('lastName'); }
  get about(): AbstractControl { return this.form.get('about'); }

  ngOnInit(): void {
    if (this.state === 'Update' && !!this.currentAuth) {
      this.authorService.getAuthor(this.currentAuth.id).subscribe(x => {
        this.newAuthor = x;
      });
    } else {
      this.newAuthor = {
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
      this.cd.detectChanges();
    }
  }

  addAuthor() {
    if (this.state !== 'Update') {
      this.authorService.putAuthor(this.newAuthor).pipe(
        catchError(err => {
          this.staticAlertClosed = false;
          this.error = true;
          this.toastMessage = 'Request failed';
          return throwError(err);
        })
      )
        .subscribe(
          () => {
            this.staticAlertClosed = false;
            this.error = false;
            this.toastMessage = 'Request successful';
            this.newAuthor.first_name = '';
            this.newAuthor.middle_names = null;
            this.newAuthor.last_name = '';
            this.newAuthor.about = '';
            this.cd.detectChanges();
          }
        );
    } else {
      this.authorService.putAuthor(this.newAuthor, this.newAuthor.id).pipe(
        catchError(err => {
          this.staticAlertClosed = false;
          this.error = true;
          this.toastMessage = 'Request failed';
          return throwError(err);
        })
      )
        .subscribe(
          () => {
            this.staticAlertClosed = false;
            this.error = false;
            this.toastMessage = 'Request successful';
            this.modalEvent.emit();
          }
        );
    }
  }
}

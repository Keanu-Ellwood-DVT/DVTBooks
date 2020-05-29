import { Subject } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { BookService } from './book.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Book } from 'src/models/book';
import { readFileSync } from 'fs';

describe('BookService', () => {
  let service: BookService;
  let httpTestingController: HttpTestingController;

  const mockBook: Book = {
    isbn10: null,
    isbn13: '9781119038634',
    title: 'Web Design with HTML, CSS, JavaScript and jQuery Set',
    about: null,
    abstract: null,
    author: {
      href: 'http://localhost:4201/Authors/3cc636ea-1e66-4064-bf03-4f4f70982d1a',
      id: '3cc636ea-1e66-4064-bf03-4f4f70982d1a',
      name: 'Jon  Duckett'
    },
    publisher: 'Wiley',
    date_published: null,
    image: null,
    tags: [
      {
        id: 'HTML',
        href: 'http://localhost:4201/Tags/HTML',
        description: 'HTML'
      }
    ],
    version: null
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BookService]
    });
    service = TestBed.inject(BookService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getBook', () => {

    it('should call get with the correct url', () => {

      service.getBook('9781119038634').subscribe();

      const req = httpTestingController.expectOne('http://localhost:4201/Books/9781119038634');

      req.flush({
        isbn13: '9781119038634',
        title: 'Web Design with HTML, CSS, JavaScript and jQuery Set',
        author: {
          href: 'http://localhost:4201/Authors/3cc636ea-1e66-4064-bf03-4f4f70982d1a',
          id: '3cc636ea-1e66-4064-bf03-4f4f70982d1a',
          name: 'Jon  Duckett'
        },
        publisher: 'Wiley',
        tags: [
          {
            id: 'HTML',
            href: 'http://localhost:4201/Tags/HTML',
            description: 'HTML'
          }
        ]
      });

      httpTestingController.verify();
      expect(httpTestingController).toBeTruthy();
    });
  });

  describe('getBooks', () => {

    it('should call get with the correct url', () => {

      service.getBooks().subscribe();

      const req = httpTestingController.expectOne('http://localhost:4201/Books?');

      req.flush([
        {
          isbn10: '0133966151',
          isbn13: '9780133966153',
          title: `The Non-Designer's Design Book (4th Edition)`,
          author: {
            href: 'http://localhost:4201/Authors/d32490d9-ff78-4e08-b04c-cdeabe9de34c',
            id: 'd32490d9-ff78-4e08-b04c-cdeabe9de34c',
            name: 'Robin Patricia Williams'
          },
          publisher: 'Peachpit Press',
          tags: []
        },
        {
          isbn13: '9781119038634',
          title: 'Web Design with HTML, CSS, JavaScript and jQuery Set',
          author: {
            href: 'http://localhost:4201/Authors/3cc636ea-1e66-4064-bf03-4f4f70982d1a',
            id: '3cc636ea-1e66-4064-bf03-4f4f70982d1a',
            name: 'Jon  Duckett'
          },
          publisher: 'Wiley',
          tags: [
            {
              id: 'HTML',
              href: 'http://localhost:4201/Tags/HTML',
              description: 'HTML'
            }
          ]
        }
      ]);

      httpTestingController.verify();
      expect(httpTestingController).toBeTruthy();
    });

    it('should call get with the correct url', () => {

      service.getBooks('Design', 1, 1).subscribe();

      const req = httpTestingController.expectOne('http://localhost:4201/Books?query=Design&skip=1&top=1');

      req.flush([
        {
          isbn10: '0133966151',
          isbn13: '9780133966153',
          title: `The Non-Designer's Design Book (4th Edition)`,
          author: {
            href: 'http://localhost:4201/Authors/d32490d9-ff78-4e08-b04c-cdeabe9de34c',
            id: 'd32490d9-ff78-4e08-b04c-cdeabe9de34c',
            name: 'Robin Patricia Williams'
          },
          publisher: 'Peachpit Press',
          tags: []
        }
      ]);

      httpTestingController.verify();
      expect(httpTestingController).toBeTruthy();
    });
  });

  it('putBook should call put with the correct url', () => {

    service.putBook(mockBook, '0201633612');
    const req = httpTestingController.expectOne('http://localhost:4201/Books/0201633612');

    httpTestingController.verify();

    expect(httpTestingController).toBeTruthy();
    expect(req.request.method).toEqual('PUT');
  });

  it('updateBook should call put with the correct url', () => {

    service.updateBook(mockBook, '0201633612');
    const req = httpTestingController.expectOne('http://localhost:4201/Books/0201633612');

    httpTestingController.verify();

    expect(httpTestingController).toBeTruthy();
    expect(req.request.method).toEqual('PUT');
  });

  it('refreshNeeded$ property getter should return value set by refreshRequired', () => {
    const result = new Subject<void>();

    const spy = spyOnProperty(service, 'refreshNeeded$').and.callThrough();

    expect(service.refreshNeeded$).toEqual(result);
    expect(spy).toHaveBeenCalled();
  });

});

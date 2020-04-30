import { TestBed } from '@angular/core/testing';
import { BookService } from './book.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('BookService', () => {
  let service: BookService;
  let httpTestingController: HttpTestingController;

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
    });
  });

  describe('getBooks', () => {

    it('should call get with the correct url', () => {

      service.getBooks().subscribe();

      const req = httpTestingController.expectOne('http://localhost:4201/Books');

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
    });
  });
});

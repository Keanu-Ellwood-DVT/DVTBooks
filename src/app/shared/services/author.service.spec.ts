import { Subject } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthorService } from './author.service';
import { Author } from 'src/app/shared/models/author';

describe('AuthorService', () => {
  let service: AuthorService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthorService]
    });
    service = TestBed.inject(AuthorService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAuthor', () => {

    it('should call get with the correct url', () => {

      service.getAuthor('3cc636ea-1e66-4064-bf03-4f4f70982d1a').subscribe();

      const req = httpTestingController.expectOne('http://localhost:4201/Authors/3cc636ea-1e66-4064-bf03-4f4f70982d1a');

      req.flush({
        href: 'http://localhost:4201/Authors/3cc636ea-1e66-4064-bf03-4f4f70982d1a',
        id: '3cc636ea-1e66-4064-bf03-4f4f70982d1a',
        first_name: 'Jon',
        last_name: 'Duckett',
        name: 'Jon  Duckett',
        about: `Jon Duckett has been helping companies create innovative digital solutions for over 15 years,
        designing and delivering web and mobile projects for small businesses and tech startups through to global
        brands like Diesel, Philips, Nike, Wrangler, and Xerox.During this time, he has has written and co-authored
        over a dozen books on web design and programming.`,
        version: 'AAAAAAAAB9M=',
        books: [
          {
            href: 'http://localhost:4201/Books/$9781119038634',
            id: '9781119038634',
            isbn13: '9781119038634'
          }
        ]
      });

      httpTestingController.verify();
      expect(httpTestingController).toBeTruthy();
    });
  });

  describe('getAuthors', () => {

    it('should call get with the correct url', () => {

      service.getAuthors().subscribe();

      const req = httpTestingController.expectOne('http://localhost:4201/Authors?');

      req.flush([
        {
          href: 'http://localhost:4201/Authors/3cc636ea-1e66-4064-bf03-4f4f70982d1a',
          id: '3cc636ea-1e66-4064-bf03-4f4f70982d1a',
          first_name: 'Jon',
          last_name: 'Duckett',
          name: 'Jon  Duckett',
          about: `Jon Duckett has been helping companies create innovative digital solutions for over 15 years,
        designing and delivering web and mobile projects for small businesses and tech startups through to global
        brands like Diesel, Philips, Nike, Wrangler, and Xerox.During this time, he has has written and co-authored
        over a dozen books on web design and programming.`,
        version: 'AAAAAAAAB9M=',
          books: [
            {
              href: 'http://localhost:4201/Books/$9781119038634',
              id: '9781119038634',
              isbn13: '9781119038634'
            }
          ]
        },
        {
          href: 'http://localhost:4201/Authors/d32490d9-ff78-4e08-b04c-cdeabe9de34c',
          id: 'd32490d9-ff78-4e08-b04c-cdeabe9de34c',
          first_name: 'Robin',
          middle_names: 'Patricia',
          last_name: 'Williams',
          name: 'Robin Patricia Williams',
          about: `Robin Patricia Williams is an American educator who has authored many popular computer-related
          books, as well as the book Sweet Swan of Avon: Did a Woman Write Shakespeare?.`,
          version: 'AAAAAAAAB9Q=',
          books: [
            {
              href: 'http://localhost:4201/Books/$9780133966153',
              id: '9780133966153',
              isbn10: '0133966151',
              isbn13: '9780133966153'
            }
          ]
        }
      ]);

      httpTestingController.verify();
      expect(httpTestingController).toBeTruthy();
    });

    it('should call get with the correct url', () => {

      service.getAuthors('Jon', 1, 1).subscribe();

      const req = httpTestingController.expectOne('http://localhost:4201/Authors?query=Jon&skip=1&top=1');

      req.flush([
        {
          href: 'http://localhost:4201/Authors/3cc636ea-1e66-4064-bf03-4f4f70982d1a',
          id: '3cc636ea-1e66-4064-bf03-4f4f70982d1a',
          first_name: 'Jon',
          last_name: 'Duckett',
          name: 'Jon  Duckett',
          about: `Jon Duckett has been helping companies create innovative digital solutions for over 15 years,
        designing and delivering web and mobile projects for small businesses and tech startups through to global
        brands like Diesel, Philips, Nike, Wrangler, and Xerox.During this time, he has has written and co-authored
        over a dozen books on web design and programming.`,
        version: 'AAAAAAAAB9M=',
          books: [
            {
              href: 'http://localhost:4201/Books/$9781119038634',
              id: '9781119038634',
              isbn13: '9781119038634'
            }
          ]
        },
      ]);

      httpTestingController.verify();
      expect(httpTestingController).toBeTruthy();
    });
  });

  describe('putAuthor', () => {

    it('should call put with the correct url', () => {

      const mockAuthor: Author = {
        href: 'http://localhost:4201/Authors/d32490d9-ff78-4e08-b04c-cdeabe9de34c',
        id: 'd32490d9-ff78-4e08-b04c-cdeabe9de34c',
        first_name: 'Robin',
        middle_names: 'Patricia',
        last_name: 'Williams',
        name: 'Robin Patricia Williams',
        about: `Robin Patricia Williams is an American educator who has authored many popular computer-related
        books, as well as the book Sweet Swan of Avon: Did a Woman Write Shakespeare?.`,
        version: 'AAAAAAAAB9Q=',
        books: [
          {
            title: '',
            href: 'http://localhost:4201/Books/$9780133966153',
            id: '9780133966153',
            isbn10: '0133966151',
            isbn13: '9780133966153'
          }
        ]
      };

      service.putAuthor(mockAuthor, 'd32490d9-ff78-4e08-b04c-cdeabe9de34c').subscribe();
      const req = httpTestingController.expectOne('http://localhost:4201/Authors/d32490d9-ff78-4e08-b04c-cdeabe9de34c');

      httpTestingController.verify();

      expect(httpTestingController).toBeTruthy();
      expect(req.request.method).toEqual('PUT');
    });

    it('should call put with the correct url', () => {

      const mockAuthor: Author = {
        href: 'http://localhost:4201/Authors/d32490d9-ff78-4e08-b04c-cdeabe9de34c',
        id: 'd32490d9-ff78-4e08-b04c-cdeabe9de34c',
        first_name: 'Robin',
        middle_names: 'Patricia',
        last_name: 'Williams',
        name: 'Robin Patricia Williams',
        about: `Robin Patricia Williams is an American educator who has authored many popular computer-related
        books, as well as the book Sweet Swan of Avon: Did a Woman Write Shakespeare?.`,
        version: 'AAAAAAAAB9Q=',
        books: [
          {
            title: '',
            href: 'http://localhost:4201/Books/$9780133966153',
            id: '9780133966153',
            isbn10: '0133966151',
            isbn13: '9780133966153'
          }
        ]
      };

      service.putAuthor(mockAuthor).subscribe();
      const req = httpTestingController.expectOne('http://localhost:4201/Authors/');

      httpTestingController.verify();

      expect(httpTestingController).toBeTruthy();
      expect(req.request.method).toEqual('PUT');
    });

  });

  it('refreshNeeded$ property getter should return value set by refreshRequired', () => {
    const result = new Subject<void>();

    const spy = spyOnProperty(service, 'refreshNeeded$').and.callThrough();

    expect(service.refreshNeeded$).toEqual(result);
    expect(spy).toHaveBeenCalled();
  });

});

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TagsService } from './tags.service';

describe('TagsService', () => {
  let service: TagsService;
  let httpTestingController : HttpTestingController;

  const testTags = [
    {
      id: "Redux",
      href: "/Tags/Redux",
      description: "Redux"
    },
    {
      id: "UI/UX",
      href: "/Tags/UI/UX",
      description: "UI/UX"
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TagsService]
    });
    service = TestBed.inject(TagsService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  describe('getTag', () => {

    it('should call get with the correct url', () => {

      service.getTag('HTML').subscribe(tag => {
        expect(tag).toBe(testTags[0])
      });

      const req = httpTestingController.expectOne('http://localhost:4201/Tags/HTML');

      req.flush(testTags[0]);

      httpTestingController.verify();
    })
  })

  describe('getTags', () => {

    it('should call get with the correct url', () => {

      service.getTags().subscribe(tags => {
        expect(tags).toBe(testTags)
      });

      const req = httpTestingController.expectOne('http://localhost:4201/Tags');

      req.flush(testTags);

      httpTestingController.verify();

    })
  })



});

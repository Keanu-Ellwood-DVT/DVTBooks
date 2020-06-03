import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  pageLoading$ = new BehaviorSubject<boolean>(true);
  state = 'Add';

  constructor() {}

  ngOnInit(): void {
    this.pageLoading$.next(false);
  }

}

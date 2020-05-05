import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  query: string = '';

  constructor(public auth: AuthService,
    private router: Router) { }

  ngOnInit() {
  }

  navigateToAdmin() {
    const authCheck = document.getElementById('AuthorCheck') as HTMLInputElement;
    const bookCheck = document.getElementById('BookCheck') as HTMLInputElement;
    //console.log(authCheck.checked + ' ' + bookCheck.checked + ' ' + this.query)
    if (authCheck.checked) {
      if (this.query) {
        this.router.navigate([`/results`, { q: this.query, cat: authCheck.value }]);
      } else {
        this.router.navigate([`/results`, { cat: authCheck.value }]);
      }
    } else if (bookCheck.checked) {
      if (this.query) {
        this.router.navigate([`/results`, { q: this.query, cat: bookCheck.value }]);
      } else {
        this.router.navigate([`/results`, { cat: bookCheck.value }]);
      }
    } else {
      if (this.query) {
        this.router.navigate([`/results`, { q: this.query, cat: "All" }]);
      }else {
        this.router.navigate([`/results`, { cat: "All" }]);
      }
    }
  }

}

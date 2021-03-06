import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  query = '';
  htmlStr = '<span class="label-icon">Categories</span> <span class="caret">&nbsp;</span>';

  constructor(public auth: AuthService, private router: Router) { }

  ngOnInit() {
  }
  onCheckboxChange(e) {
    this.htmlStr = `<span class="label-icon">${e.target.value}</span> <span class="caret">&nbsp;</span>`;
  }

  navigateToResults() {
    const authCheck = document.getElementById('AuthorCheck') as HTMLInputElement;
    const bookCheck = document.getElementById('BookCheck') as HTMLInputElement;
    if (authCheck.checked) {
      if (!!this.query) {
        this.router.navigate([`/results`], { queryParams: { q: this.query, cat: authCheck.value } });
      } else {
        this.router.navigate([`/results`], { queryParams: { cat: authCheck.value } });
      }
    } else if (bookCheck.checked) {
      if (!!this.query) {
        this.router.navigate([`/results`], { queryParams: { q: this.query, cat: bookCheck.value } });
      } else {
        this.router.navigate([`/results`], { queryParams: { cat: bookCheck.value } });
      }
    } else {
      if (!!this.query) {
        this.router.navigate([`/results`], { queryParams: { q: this.query, cat: 'All' } });
      } else {
        this.router.navigate([`/results`], { queryParams: { cat: 'All' } });
      }
    }
  }

}

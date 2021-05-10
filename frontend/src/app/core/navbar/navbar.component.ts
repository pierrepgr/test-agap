import { Component, OnInit } from '@angular/core';
import { LogoutService } from 'src/app/security/logout.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    private logoutService: LogoutService
  ) { }

  ngOnInit(): void {
  }

  logout() {
    this.logoutService.logout();
  }
}

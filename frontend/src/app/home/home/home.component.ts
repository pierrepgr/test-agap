import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/security/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  nameUser: string;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.nameUser = this.authService.jwtPayload?.full_name;
  }

}

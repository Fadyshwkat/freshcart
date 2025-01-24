import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css'
})
export class NotFoundComponent {

  constructor(private router: Router) {}

  goHome():void {
    if(sessionStorage.getItem('token')){this.router.navigate(['/main/home']);}
    else{this.router.navigate(['/auth/login']);}
  }
}

import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './core/services/auth.service'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [AuthService]
})
export class AppComponent implements OnInit{

  private authService = inject(AuthService);

  constructor(

  ) {
    this.authService.getData().subscribe((result) => {

      console.log(result, 'seraaa')
    })
  }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    this.authService.getData()
  }

}

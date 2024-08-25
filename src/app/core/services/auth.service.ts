import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment'
import { HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);


  getData() {
    return this.http.get('https://fakestoreapi.com/products')
    // return this.http.get(`${environment.apiUrl}/`)
  }
}

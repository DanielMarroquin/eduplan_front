import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment'
import { HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl



  signIn(username: string, password: string) {
    const url = `${this.apiUrl}/auth/sign-in`
    const body = { username, password }
    return this.http.post(url, body)
  }


}

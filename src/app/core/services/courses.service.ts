import { inject, Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment";


@Injectable({
  providedIn: 'root'
})

export class CoursesService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl

  findAllCourses() {
    const url = `${this.apiUrl}/courses/list-all`
    return this.http.get(url)
  }

  delete(id: any) {
    const url = `${this.apiUrl}/courses/delete/${id}`
    return this.http.delete(url, {
      responseType: "arraybuffer",
      body: null,
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }


  update(model: any, id: any) {
    const url = `${this.apiUrl}/courses/update/${id}`
    const body = { model }
    return this.http.put(url, body, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
  }

  create(model: any) {
    const url = `${this.apiUrl}/courses/create`
    const body = { model }
    return this.http.post(url, body)
  }

}
